import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import { login, signUp } from '../../store/session';
import styles from '../../css-modules/LoginForm.module.css';

export default function LoginForm() {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  if (user) return <Redirect to='/'/>

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(username, password));
    if (data) {
      setErrors(data);
    } else {
      history.push('/');
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    const username = 'demo';
    const password = 'password';
    dispatch(login(username, password));
  }

  return (
    <div className={styles.loginForm}>
      <form onSubmit={onLogin}>
        <div className={styles.loginForm__errors}>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <input
            name='username'
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.buttons}>
          <button type='submit'>Log in</button>
          <button type='button'
            className={styles.cancelButton} 
            onClick={() => {
              setUsername('')
              setPassword('')
              setErrors([]);
            }}
          >Cancel</button>
          <button type='button' onClick={demoLogin}>Demo</button>
        </div>
        <div className={styles.signupButton}>
          <h5>Don't have an account?</h5>
          <button type='button' onClick={() => history.push('/signup')}>Sign up</button>
        </div>
      </form>
    </div>
  );
};


export function SignupForm() {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSignUp = async (e) => {
    e.preventDefault();
    setErrors([]);

    let errors = [];
    if (username.length < 4) errors.push('username : must be at least 4 characters in length');
    if (username.length > 40) errors.push('username : cannot be more than 40 characters in length');
    if (password.length < 6) errors.push('password : must be at least 6 characters in length');
    if (password !== repeatPassword) errors.push('passwords : do not match');

    if (!errors.length) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(errors);
    };

    // if (password === repeatPassword) {
    //   const data = await dispatch(signUp(username, email, password));
    //   if (data) {
    //     setErrors(data)
    //   }
    // }
    
  };

  if (user) return <Redirect to='/' />;

  return (
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
        <div className={styles.buttons}>
          <button type='submit'>Sign up</button>
          <button type='button'
            className={styles.cancelButton} 
            onClick={() => {
              setUsername('')
              setEmail('')
              setPassword('')
              setRepeatPassword('')
              setErrors([]);
            }}
          >Cancel</button>
        </div>
        <div className={styles.loginButton}>
          <h5>Already have an account?</h5>
          <button type='button' onClick={() => history.push('/login')}>Log in</button>
        </div>
      </form>
    </div>
  );
};