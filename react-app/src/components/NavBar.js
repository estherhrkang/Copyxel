import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import copyxellogo from '../assets/copyxel-logo.png';
import styles from '../css-modules/NavBar.module.css';

export default function NavBar() {
  const user = useSelector(state => state.session.user);

  return (
    <nav className={styles.navBar}>
      <div>
        <NavLink to='/' exact={true} className={styles.navLink} activeClassName='active'>
          <img src={copyxellogo} alt='app logo'/>
        </NavLink>
      </div>
      {user && (
        <div>
          <NavLink to='/profile' exact={true} className={styles.navLink} activeClassName='active'>
            Profile
          </NavLink>
        </div>
      )}
    </nav>
  );
}
