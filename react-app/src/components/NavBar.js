import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Profile from './Profile';
import styles from '../css-modules/NavBar.module.css';

export default function NavBar() {
  const user = useSelector(state => state.session.user);

  return (
    <nav className={styles.navBar}>
        <div>
            <div>
              <NavLink to='/' exact={true} className={styles.navLink} activeClassName='active'>
                Home
              </NavLink>
            </div>
            {user && (
              <div>
                <NavLink to='/profile' exact={true} className={styles.navLink} activeClassName='active'>
                  Profile
                </NavLink>
              </div>
            )}
        </div>
    </nav>
  );
}
