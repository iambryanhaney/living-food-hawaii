import React, { useState } from 'react';
import './css/App.css';
import { BrowserRouter as Router, Route, /*Redirect*/ } from 'react-router-dom'
import NavBar from './containers/NavBar'
import Home from './routes/Home'
import Gallery from './routes/Gallery'
import DishManager from './routes/DishManager'

function App() {
  const [user, setUser] = useState(null)
  const [viewingGallery, setViewingGallery] = useState(false)

  return (
    <Router>
      <NavBar setUser={setUser} user={user} viewingGallery={viewingGallery} />
      <Route path='/home' exact component={Home} />
      <Route path='/services' exact component={Home} />
      {/* <Route path='/gallery' exact render={(props) => ( <Gallery {...props} viewingGallery={viewingGallery} setViewingGallery={setViewingGallery}/> )}  /> */}
      <Route path='/dish-manager' exact render={(props) => ( <DishManager {...props} viewingGallery={viewingGallery} setViewingGallery={setViewingGallery}/> )} />
    </Router>
  );
}

export default App;
