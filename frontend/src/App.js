import React, { useState } from 'react';
import './css/App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import NavBar from './containers/NavBar'
import Home from './routes/Home'
import DishManager from './routes/DishManager'

function App() {
  const [user, setUser] = useState(null)
  const [viewingGallery, setViewingGallery] = useState(false)

  return (
    <Router>
      <NavBar setUser={setUser} user={user} viewingGallery={viewingGallery} />
      {/* <Route component={Home} /> */}
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/home' exact>
          <Home />
          {/* { user?.is_admin ? <Redirect to="/dish-manager"/> : <Home />} */}
        </Route>
        <Route path='/about' exact component={Home} />
        <Route path='/services' exact component={Home} />
        <Route path='/contact' exact component={Home} />
        <Route path='/gallery' exact component={Home} />
        {/* <Route path='/gallery' exact render={(props) => ( <Gallery {...props} viewingGallery={viewingGallery} setViewingGallery={setViewingGallery}/> )}  /> */}
        <Route path='/dish-manager' exact>
          {/* { !user?.is_admin ? <Redirect to="/home" /> : <DishManager viewingGallery={viewingGallery} setViewingGallery={setViewingGallery} /> }  */}
          <DishManager viewingGallery={viewingGallery} setViewingGallery={setViewingGallery} /> 
        </Route>/>
        <Route>
          <Redirect to="/home" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
