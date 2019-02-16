import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Splash from './pages/Splash'
import Store from './pages/Store'
import Settings from './pages/Settings'
import NewStore from './pages/NewStore';
import ManageMenu from './pages/ManageMenu';

// icons

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCashRegister } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faCashRegister)

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Route path='/settings' component={Settings} />
            <Route path='/store/new' exact={true} component={NewStore} />
            <Route path='/store' exact={true} component={Store} />
            <Route path='/menu/manage' exact={true} component={ManageMenu} />
            <Route path='/' exact={true} component={Splash} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
