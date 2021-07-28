import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import styles from '../../css-modules/LogoutButton.module.css';

const LogoutButton = () => {
  const dispatch = useDispatch();

  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <button onClick={onLogout}>LOG OUT</button>;
};

export default LogoutButton;
