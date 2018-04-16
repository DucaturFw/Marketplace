import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import './styles/styles.css';

import Main from './components/elements/Main';
import Header from './components/header';
import Ledger from './components/ledger';
import Oracle from './components/oracle';
import Footer from './components/footer';
import Buy from './components/oracle/buy';

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Container>
            <Header />
            <Main>
              <Route exact path={'/'} component={Ledger} />
              <Switch>
                <Route path={'/patent/:id/buy'} component={Buy} />
                <Route path={'/patent/:id'} component={Oracle} />
              </Switch>
            </Main>
            <Footer />
          </Container>
        </Router>
      </ThemeProvider>
    );
  }
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
