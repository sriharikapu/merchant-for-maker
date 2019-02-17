import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Splash from './pages/Splash'
import Store from './pages/Store'
import Settings from './pages/Settings'
import NewStore from './pages/NewStore';
import ManageMenu from './pages/ManageMenu';
import Register from './pages/Register';
import Orders from './pages/Orders'

// icons

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {
  faCashRegister, faCog, faTrash, faPlusSquare, faCheckCircle,
  faHistory, faQrcode, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faCashRegister, faCog, faTrash, faPlusSquare, faCheckCircle, faHistory, faQrcode, faExclamationCircle)

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
            <Route path='/register' exact={true} component={Register} />
            <Route path='/orders' exact={true} component={Orders} />
            <Route path='/' exact={true} component={Splash} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
