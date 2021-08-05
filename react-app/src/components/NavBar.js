import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import copyxellogo from '../assets/copyxel-logo.png';
import styles from '../css-modules/NavBar.module.css';

export default function NavBar() {
  const history = useHistory();
  const user = useSelector(state => state.session.user);

  return (
    <nav className={styles.navBar}>
        <div>
            <div>
              <img src={copyxellogo} alt='app logo' onClick={() => history.push('/')}/>
            </div>
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
