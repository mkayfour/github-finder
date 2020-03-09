import React, { useState, useEffect, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import axios from "axios";
import GithubState from "./context/github/GithubState";

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      )
      .then(setLoading(false))
      .then(res => setUsers(res.data));
  }, []);

  // search github users
  const searchUsers = async text => {
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setUsers(res.data.items);
    setLoading(false);
  };

  // get single github user
  const getUser = async username => {
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setLoading(false);
    setUser(res.data);
  };

  // get user repos
  const getUserRepos = async username => {
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setLoading(false);

    setRepos(res.data);
  };

  // clear  github users
  const clearUsers = async () => {
    const res = await axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setLoading(false);

    setUsers(res.data.items);
  };

  // set alert
  const showAlert = (msg, type) => {
    setAlert({ alert: { msg, type } });
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Fragment>
                    <Search
                      searchUsers={searchUsers}
                      clearUsers={clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={showAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:login"
                render={props => (
                  <User
                    {...props}
                    getUser={getUser}
                    getUserRepos={getUserRepos}
                    repos={repos}
                    user={user}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
