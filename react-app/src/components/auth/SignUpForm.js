import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
import styles from '../../css-modules/SignupForm.module.css';

export default function SignupForm() {
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
    // setErrors([]);

    // let errors = [];
    // if (username.length < 4) errors.push('Username must be at least 4 characters in length');
    // if (username.length > 40) errors.push('Username cannot be more than 40 characters in length');
    // if (password.length < 6) errors.push('Password must be at least 6 characters in length');
    // if (password !== repeatPassword) errors.push('Passwords do not match');

    // if (!errors.length) {
    //   const data = await dispatch(signUp(username, email, password));
    //   if (data) {
    //     setErrors(data)
    //   }
    // } else {
    //   setErrors(errors);
    // };

    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
    
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
          <label>Username</label>
          <input
            type='text'
            name='username'
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          ></input>
        </div>
        <div>
          <label>Email</label>
          <input
            type='text'
            name='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type='password'
            name='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          ></input>
        </div>
        <div>
          <label>Confirm password</label>
          <input
            type='password'
            name='repeat_password'
            onChange={(e) => setRepeatPassword(e.target.value)}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <button type='submit'>Sign up</button>
      </form>
      <div>
        Already have an account?
        <button type='button' onClick={() => history.push('/login')}>Log in</button>
      </div>
    </div>
  );
};
