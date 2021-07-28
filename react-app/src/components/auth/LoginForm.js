import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import styles from '../../css-modules/LoginForm.module.css';

export default function LoginForm() {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  if (user) history.push('/');

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
    const data = await dispatch(login(username, password));
    if (data) {
      setErrors(data);
    } else {
      history.push('/');
    }
  }

  return (
    <div>
      <h1>put logo here</h1>
      <form onSubmit={onLogin}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label htmlFor='username'>USERNAME</label>
          <input
            name='username'
            type='text'
            placeholder='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='password'>PASSWORD</label>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type='submit'>LOG IN</button>
          <button type='button' onClick={demoLogin}>DEMO LOG IN</button>
        </div>
        <div>
          Don't have an account?
          <button type='button' onClick={() => history.push('/signup')}>SIGN UP</button>
        </div>
      </form>
    </div>
  );
};
