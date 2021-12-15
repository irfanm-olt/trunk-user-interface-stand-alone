import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';
import jwt_decode from "jwt-decode";
import store from "./store";
import PrivateRoute from "./components/private-route/PrivateRoute";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from './modules/auth/actions';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./public/auth/login'));
const Dashboard = React.lazy(() => import('./public/home/dashboard'));
//const Login = React.lazy(() => import('./screens/user/Login'));

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    //store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {

  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading}>
            <Route exact path="/login" name="login" component={Login} />
            <Switch>
              <PrivateRoute path="/" component={ TheLayout } />
              <PrivateRoute exact path="/dashboard" component={ Dashboard } />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
