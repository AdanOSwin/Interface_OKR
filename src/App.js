import React from 'react';
import logo from './logo.svg';
import firebase from 'firebase/app';
import Toggle from './Toggle';
import NavBar from './NavBar';
import Reportes from './Reportes';
import Areas from './Areas';
import Equipos from './Equipos';
import Usuarios from './Usuarios';
import Directorio from './Directorio';
import Okr from './Okr';
import Home from './Home';
import UserNav from './UserNav';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
//import Despliega from './Altas';
import './App.css';

function App() {
  return (
    <div>
    <Router>
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/directorio" component={Directorio} />
        <Route exact path="/okr" component={Okr} />
        <Route exact path="/areas" component={Areas} />
        <Route exact path="/equipos" component={Equipos} />
        <Route exact path="/reportes" component={Reportes} />
        <Route exact path="/usuarios" component={Usuarios} />
      </Switch>
    </div>
    </Router>
</div>
  );
}

export default App;
