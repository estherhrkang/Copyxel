import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import Profile from './Profile';
import styles from '../css-modules/NavBar.module.css';

export default function NavBar() {
  const user = useSelector(state => state.session.user);

  return (
    <nav>
        <ul>
            <li>
              <NavLink to='/' exact={true} activeClassName='active'>
                Home
              </NavLink>
            </li>
            {user && (
              <>
                <li>
                  <NavLink to='/profile' exact={true} activeClassName='active'>
                    Profile
                  </NavLink>
                </li>
                <li>
                  <LogoutButton />
                </li>
              </>
            )}
        </ul>
    </nav>
  );
}
