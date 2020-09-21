import React, { Component } from 'react';
import {connect} from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import Header from './Header';
import * as actions from '../actions';

class App extends Component {
  componentDidMount() {
      this.props.fetchUser();
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path='/' component={LandingPage} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
