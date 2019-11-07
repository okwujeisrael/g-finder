import React, {Fragment,Component} from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Search from './components/users/Search';
import Users from './components/users/Users';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';


class App extends Component {
  state = {
    users: [],
    loading: false
  }


  


  //Search github users
  searchUsers = async (text) => {

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&Client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ users: res.data.items, loading: false });

  };

  //Get Single github user
  getUser = async (username) => {
    this.setState({loading: true});

    const res = await axios.get(
      `https://api.github.com/users?q=${username}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&Client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ user: res.data, loading: false });

  }

  //Clear users from state
  clearUsers = () => this.setState({ users:[], loading: false });



  render(){

    const { users, loading } = this.state; 
    return (
      <Router>
      <div className = 'App'>
          <Navbar title='Github Finder' icon = 'fab fa-github' /> 
       
        <div className = "container">
          <Switch>
            <Route exact path = '/'render = {props =>(
              <Fragment>
                <Search 
                    searchUsers = {this.searchUsers} 
                    clearUsers = {this.clearUsers} 
                    showClear= {users.length > 0 ? true: false }
                    setAlert = {this.setAlert}
                />
              <Users loading={loading} users={users} />
              </Fragment>
            )}/>

            <Route exact path = '/about' component = {About} />
      
          </Switch>
          
        </div> 
      </div>
      </Router>
      
    );
  }

}

export default App;
