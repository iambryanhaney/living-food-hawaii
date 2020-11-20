import React, { useState } from 'react';
import './css/App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import NavBar from './containers/NavBar'
import Home from './routes/Home'
import DishManager from './routes/DishManager'

function App() {
    const [user, setUser] = useState(null)
    const [loginRedirected, setLoginRedirected] = useState(false)
    const [viewingGallery, setViewingGallery] = useState(false)

    return (
        <Router>
            <NavBar setUser={setUser} user={user} viewingGallery={viewingGallery} setLoginRedirected={setLoginRedirected} />
            
            <Switch>
                <Route path='/' exact>
                    { user?.is_admin && !loginRedirected ? <Redirect to="/dish-manager" /> : <Redirect to="/home" /> }
                </Route>
                <Route path='/home' exact>
                    { user?.is_admin && !loginRedirected ? <Redirect to="/dish-manager" /> : <Home /> }
                </Route>
                <Route path='/about' exact>
                    { user?.is_admin && !loginRedirected ? <Redirect to="/dish-manager" /> : <Home /> }
                </Route>
                <Route path='/services' exact>
                    { user?.is_admin && !loginRedirected ? <Redirect to="/dish-manager" /> : <Home /> }
                </Route>
                <Route path='/contact' exact>
                    { user?.is_admin && !loginRedirected ? <Redirect to="/dish-manager" /> : <Home /> }
                </Route>
                <Route path='/gallery' exact>
                    { user?.is_admin && !loginRedirected ? <Redirect to="/dish-manager" /> : <Home /> }
                </Route>
                <Route path='/dish-manager' exact>
                    { user?.is_admin ? <DishManager setViewingGallery={setViewingGallery} setLoginRedirected={setLoginRedirected} /> : <Redirect to="/home" /> } 
                </Route>/>
                <Route>
                    <Redirect to="/home" />
                </Route>
            </Switch>
      </Router>
    )
}

export default App
