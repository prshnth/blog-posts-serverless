import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import styled from 'styled-components';
import LandingPage from './LandingPage';
import Header from './Header';
import PostDetail from './PostDetail';
import NewPostPage from './NewPostPage';
import { fetchCurrentUser } from '../actions';

const MainContainer = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  background-color: #2c3455;
  color: white;
`;

const MainContent = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
`;

class App extends Component {
  componentDidMount() {
    this.props.fetchCurrentUser();
  }
  render() {
    return (
      <MainContainer>
        <BrowserRouter>
          <div>
            <Header />
            <MainContent>
              <Route exact path='/' component={LandingPage} />
              <Route path='/new-post' component={NewPostPage} />
              <Route path='/post/:id' component={PostDetail} />
              <Route path='/user-posts' component={LandingPage} />
            </MainContent>
          </div>
        </BrowserRouter>
      </MainContainer>
    );
  }
}

export default connect(null, { fetchCurrentUser })(App);
