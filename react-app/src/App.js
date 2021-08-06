import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Home from './components/Home';
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import Profile from './components/Profile';
import SampleDrawing from './components/SampleDrawing';
import PageNotFound from './components/PageNotFound';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';

// \/
import { useSelector } from 'react-redux'
import { Redirect, useHistory, NavLink } from 'react-router-dom';
import { signUp } from '../src/store/session';
import styles from './App.module.css';
// /\

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  
  // \/
  const user = useSelector(state => state.session.user);
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };
  
  // /\
  
  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);
  
  // if (user) return <Redirect to='/' />

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
          <SignupForm />
          {/* \/ */}
          <div className={styles.signupForm}>
            <form onSubmit={onSignUp}>
              <div className={styles.signupForm__errors}>
                {errors.map((error, ind) => (
                  <div key={ind}>{error}</div>
                ))}
              </div>
              <div>
                <input
                  type='text'
                  name='username'
                  placeholder='Username'
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                ></input>
              </div>
              <div>
                <input
                  type='text'
                  name='email'
                  placeholder='Email'
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                ></input>
              </div>
              <div>
                <input
                  type='password'
                  name='password'
                  placeholder='Password'
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                ></input>
              </div>
              <div>
                <input
                  type='password'
                  name='repeat_password'
                  placeholder='Confirm password'
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  value={repeatPassword}
                  required={true}
                ></input>
              </div>
              <div className={styles.button}>
                <button type='submit'>Sign up</button>
              </div>
              <div className={styles.loginButtonContainer}>
                <h5>Already have an account?</h5>
                <div><NavLink className={styles.loginButton} to='/login'>Log in</NavLink></div>
                {/* <button type='button' onClick={() => history.push('/login')}>Log in</button> */}
              </div>
            </form>
          </div>
          {/* /\ */}
        </Route>
        <ProtectedRoute path='/profile' exact={true}>
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path='/drawing' exact={true}>
          <SampleDrawing />
        </ProtectedRoute>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}
