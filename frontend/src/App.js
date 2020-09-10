import React, { useState } from 'react';
import './css/App.css';
import { BrowserRouter as Router, Route, /*Redirect*/ } from 'react-router-dom'

import Container from 'react-bootstrap/Container'

import Navigation from './containers/Navigation'
import Home from './routes/Home'
import Gallery from './routes/Gallery'
import Services from './routes/Services'
import DishManager from './routes/DishManager'

function App() {
  const [user, setUser] = useState(null)

  return (
    <Router>
      <Navigation setUser={setUser} user={user}/>
      <Container style={{ marginTop: '100px', border: '2px solid #000000' }} >
        <Route path='/' exact component={Home} />
        <Route path='/services' exact component={Services} />
        <Route path='/gallery' exact component={Gallery} />
        <Route path='/dish-manager' exact component={DishManager} />
      </Container>
    </Router>
  );
}

export default App;
