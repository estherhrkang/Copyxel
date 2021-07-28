import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import styles from '../css-modules/NavBar.module.css';

export default function NavBar() {
  const user = useSelector(state => state.session.user);

  return (
    <nav>
        <ul>
            <li>
              <NavLink to='/' exact={true} activeClassName='active'>
                HOME
              </NavLink>
            </li>
            {user && (
              <li>
                <LogoutButton />
              </li>
            )}
        </ul>
    </nav>
  );
}
