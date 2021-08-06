import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
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
