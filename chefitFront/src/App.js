import React from 'react';
import './components/css/App.css';
import Nav from './components/Nav';
import Home from './components/Home';
import SignUp from './components/SignUp'
import Login from './components/login'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
function App(){
  return(
    <Router>
    <div className="App">
      <Nav/>  
      <Switch>
      <Route exact path="/"  render={(props)=><Home {...props} />} />
      <Route path="/SignUp" component={SignUp}/>
      <Route path="/Login" component={Login}/>
      </Switch>
    </div>
    </Router>

  )
}
export default App;
