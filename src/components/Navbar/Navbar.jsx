import React, { useEffect, useRef, useState } from 'react';
import './Navbar.css';
import { NavLink, Link } from 'react-router-dom';
import { RANKING, LOGIN, DISHES } from '../../routes';
import { useAuth } from '../utils/loginAuth';

export default function Navbar() {
  const [showLogout, setShowLogout] = useState(false);
  const auth = useAuth();
  const logoutDropDown = useRef();

  useEffect(() => {
    if (showLogout && auth.user) logoutDropDown.current.style.display = 'flex';
    else if(!showLogout && auth.user) logoutDropDown.current.style.display = 'none';
  }, [showLogout]);
  return (
    <div className='navbar'>

      <Link to={DISHES}>
        <div className='logo'>
          <span className='bold'>Dish</span>
          <span className='thin'>Poll</span>
        </div>
      </Link>

      <ul className='nav-list'>

        <li>
          <NavLink
            className={({ isActive }) => isActive ? 'list active' : 'list'}
            to={RANKING}
          >
            Ranking
          </NavLink>
        </li>

        {
          !auth.user &&
          <li>
            <NavLink
              className={({ isActive }) => isActive ? 'list active' : 'list'}
              to={LOGIN}
            >
              Login
            </NavLink>
          </li>
        }


        {
          auth.user &&
          <li>
            <div className='profile-container' 
            onClick={() => setShowLogout(show => !show)}
            >
              <div className='profile-image'>{auth.user && auth.user.substring(0, 2).toUpperCase()}</div>
              <p className='profile-name hide-mobile'>{auth.user && auth.user.toUpperCase()}</p>
              <div className='logout-container' ref={logoutDropDown}>
                <p onClick={auth.logout}>Logout</p>
              </div>
            </div>
          </li>
        }


      </ul>
    </div>
  )
}
