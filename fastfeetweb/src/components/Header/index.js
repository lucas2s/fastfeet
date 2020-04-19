import React, { useState, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { IoMdMenu } from 'react-icons/io';

import { signOut } from '~/store/modules/auth/actions';
import { Container, Content } from './styles';
import logo from '../../assets/images/fastfeet-logo.png';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState('navbar');

  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  useLayoutEffect(() => {
    function menuSize() {
      if (window.innerWidth > 740) {
        setMenuOpen('navbar');
      }
    }
    window.addEventListener('resize', menuSize);
    menuSize();
  }, []);

  function handleMenu() {
    if (menuOpen === 'navbar') {
      setMenuOpen('navbar open');
    } else {
      setMenuOpen('navbar');
    }
  }

  function handleCloseMenu() {
    if (window.innerWidth < 740) {
      setMenuOpen('navbar');
    }
  }

  const { name } = useSelector(state =>
    state.user ? state.user.user : { name: '' }
  );

  return (
    <Container>
      <Content>
        <Link to="/">
          <img src={logo} alt="Fastfeet" />
        </Link>
        <button type="button" className="menu" onClick={() => handleMenu()}>
          <IoMdMenu size={20} color="#7d40e7" />
        </button>
        <div className={menuOpen}>
          <nav>
            <ul>
              <li>
                <NavLink
                  activeClassName="chosen"
                  to="/delivery/list"
                  isActive={(match, location) => {
                    if (location.pathname.indexOf('/delivery/') !== -1) {
                      return true;
                    }
                    return false;
                  }}
                  onClick={handleCloseMenu}
                >
                  ENCOMENDAS
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeClassName="chosen"
                  to="/deliveryman/list"
                  isActive={(match, location) => {
                    if (location.pathname.indexOf('/deliveryman/') !== -1) {
                      return true;
                    }
                    return false;
                  }}
                  onClick={handleCloseMenu}
                >
                  ENTREGADORES
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeClassName="chosen"
                  to="/recipient/list"
                  isActive={(match, location) => {
                    if (location.pathname.indexOf('/recipient/') !== -1) {
                      return true;
                    }
                    return false;
                  }}
                  onClick={handleCloseMenu}
                >
                  DESTINATÁRIOS
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeClassName="chosen"
                  to="/problems/list"
                  onClick={handleCloseMenu}
                >
                  PROBLEMAS
                </NavLink>
              </li>
            </ul>
          </nav>
          <aside>
            <strong>{name}</strong>
            <button type="button" onClick={handleSignOut}>
              sair do sistema
            </button>
          </aside>
        </div>
      </Content>
    </Container>
  );
}
