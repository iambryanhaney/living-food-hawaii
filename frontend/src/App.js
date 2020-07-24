import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import Container from 'react-bootstrap/Container'

import Navigation from './containers/Navigation'
import Home from './routes/Home'
import ExampleOfferings from './routes/ExampleOfferings'
import Services from './routes/Services'

const border = false

function App() {
  return (
    <Router>
      <Navigation />
      <Container style={{ marginTop: '100px', border: border ? '2px solid #000000' : null }} >
        <Route path='/' exact component={Home} />
        <Route path='/example-offerings' exact component={ExampleOfferings} />
        <Route path='/services' exact component={Services} />
      </Container>
    </Router>
  );
}

export default App;
