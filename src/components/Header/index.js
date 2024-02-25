
import React from 'react';
import './header.css';
import {Container, Row, Button} from  'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';


const nav_links = [
    {
      path: '/home',
      display:'Home'
    },
    {
      path: '/about',
      display:'About'
    },
    {
      path: '/yourtimeshare',
      display: 'Post Timeshare'
    },
    {
      path: '/timeshare',
      display:'Timeshare Rentals'
    },
  ]
const Header = () =>{
    return (
        <header className='header'>
          <Container>
            <Row>
              <div className='nav__wrapper d-flex align-items-center justify-content-between'>
                {/* ========== logo ============ */}
                <div className="logo">
                  <img src={logo} alt="" />
                </div>
                {/* ========== logo end ============ */}
      
                {/* ========== menu start ============ */}
                <div className="navigation">
                  <ul className="menu d-flex align-items-center gap-4">
                    {nav_links.map((item, index) => (
                        <li className="nav__item" key={index}>
                          <NavLink to={item.path} className={navClass => navClass.isActive ? "active__link" : ""}>{item.display}</NavLink>
                        </li>
                      ))}
                  </ul>
                </div>
                {/* ========== menu end ============ */}
                  <div className="nav__right d-flex align-items-center gap-3">
                    <div className="nav__btns d-flex align-items-center gap-3">
                      <Button className='btn secondary__btn'><Link to='/login'>Login</Link></Button>
                      <Button className='btn primary__btn'><Link to='/signup'>Register</Link></Button>
                    </div>
                    <span className="mobile_menu">
                    <i class="ri-menu-line"></i>
                    </span>
                  </div>
                {/* ========== logo end ============ */}
              </div>
            </Row>
          </Container>
          </header>
          )
}

export default Header;
