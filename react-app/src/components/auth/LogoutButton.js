import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { logout } from '../../store/session';
// import styles from '../../css-modules/LogoutButton.module.css';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/');
  };

  return <button onClick={onLogout}>Log out</button>;
};

export default LogoutButton;
