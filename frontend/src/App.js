import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import Container from 'react-bootstrap/Container'

import Navigation from './containers/Navigation'
import Home from './containers/Home'
import ExampleOfferings from './containers/ExampleOfferings';



function App() {
  return (
    <Router>
      <Navigation />
      <Container style={{ marginTop: '100px', border: '2px solid #000000' }} >
        <Route path='/' exact component={Home} />
        <Route path='/example-offerings' exact component={ExampleOfferings} />
      </Container>
    </Router>
  );
}

export default App;
