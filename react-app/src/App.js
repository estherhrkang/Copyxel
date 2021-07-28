import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Home from './components/Home';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import SampleDrawing from './components/SampleDrawing';
import Canvas from './components/Canvas';
import NavBar from './components/NavBar';
import Results from './components/Results';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/' exact={true} >
          <Home />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/signup' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/drawing' exact={true}>
          <SampleDrawing />
        </ProtectedRoute>
        <ProtectedRoute path='/drawing/new' exact={true}>
          <Canvas />
        </ProtectedRoute>
        <ProtectedRoute path='/drawing/results' exact={true}>
          <Results />
        </ProtectedRoute>

      </Switch>
    </BrowserRouter>
  );
}
