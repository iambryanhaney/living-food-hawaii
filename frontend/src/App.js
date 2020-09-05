import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, /*Redirect*/ } from 'react-router-dom'

import Container from 'react-bootstrap/Container'

import Navigation from './containers/Navigation'
import Home from './routes/Home'
import ExampleOfferings from './routes/ExampleOfferings'
import Services from './routes/Services'
import TestingUploads from './routes/TestingUploads'
import DishBuilder from './routes/DishBuilder'
import DishManager from './routes/DishManager'

function App() {
  return (
    <Router>
      <Navigation />
      <Container style={{ marginTop: '100px', border: '2px solid #000000' }} >
        <Route path='/' exact component={Home} />
        <Route path='/example-offerings' exact component={ExampleOfferings} />
        <Route path='/services' exact component={Services} />
        <Route path='/testing-uploads' exact component={TestingUploads} />
        <Route path='/dish-builder' exact component={DishBuilder} />
        <Route path='/dish-manager' exact component={DishManager} />
      </Container>
    </Router>
  );
}

export default App;
