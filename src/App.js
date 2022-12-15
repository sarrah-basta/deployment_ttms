import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import timeTable from './components/TimeTable/time'
import Graph from './components/Graph';
import './App.css';

function App() {

  const checkToken = () => {
    const role = localStorage.getItem('role');
    if (localStorage.getItem('userName')) {
      return role;
    }else {
      return false;
    }
  }

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      checkToken() === 'Admin' ? <Component {...props} /> : checkToken() === 'Faculty' ? <Redirect to='/timetable' /> : checkToken() === 'Student' ? <Redirect to='/timetable' /> : <Redirect to='/' />
    )} />
  )
  
  return (
    <div className="App">
    <div className="credentials">
      <Route exact path="/" component={Login} />
      <Route path="/register" component={Register} />
    </div>
    <div className="mainP">
      <PrivateRoute path='/home' component={Home} />
      <Route path = '/timetable' component={timeTable} />
      <Route path = '/chart' component={Graph} />
    </div>
    </div>
  );
}

export default App;
