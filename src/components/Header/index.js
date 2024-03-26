
import React from 'react';
import './header.css';
import { Container, Row, Button } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { removeSessionCookies } from '../../utils';
import Dropdown from '@mui/joy/Dropdown';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import MoreVert from '@mui/icons-material/MoreVert';
import { CssVarsProvider } from '@mui/joy';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import PersonIcon from '@mui/icons-material/Person';
import DeckIcon from '@mui/icons-material/Deck';
import LogoutIcon from '@mui/icons-material/Logout';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import Avatar from '@mui/joy/Avatar';
import Drawer from '@mui/joy/Drawer';
import { useState, useEffect } from 'react';
//import {GetAccessToken, GetRefreshToken, SetRefreshToken, SetAccessToken} from "../../utils/tokens";
import Box from '@mui/joy/Box';
import MenuIcon from '@mui/icons-material/Menu';
const nav_links = [
  {
    path: '/home',
    display: 'Home'
  },
  {
    path: '/about',
    display: 'About'
  },
  {
    path: '/me/my-timeshares/upload-new-timeshare',
    display: 'Post Timeshare'
  },
  {
    path: '/timeshare',
    display: 'Timeshare Rentals'
  },
]
const Header = () => {
  const userInfo = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  function logout() {
    removeSessionCookies();
    window.location.reload();
  }
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (inOpen) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(inOpen);
  };
  return (
    <CssVarsProvider defaultMode="light" disableTransitionOnChange>
      {screenWidth < 720 ? (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '10px'}}>
          <Box sx={{ display: 'flex' }}>
            <Button variant="outlined" color="neutral" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
              <Box
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                <div className="logo" style={{ textDecoration: 'none', marginBottom: '12px', marginTop: '12px' }}>
                  <Link to={`/home`} style={{ textDecoration: 'none', marginBottom: '12px', marginTop: '12px' }}>
                    <img src={logo} alt="" />
                  </Link>
                </div>
                <div className="navigation">
                  <ul className="menu d-flex flex-column align-items-start gap-5">
                    {nav_links.map((item, index) => (
                      <li className="nav__item" key={index}>
                        <NavLink to={item.path} className={navClass => navClass.isActive ? "active__link" : ""}>{item.display}</NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </Box>
            </Drawer>
          </Box>
          <div className="nav__right d-flex align-items-center gap-3">
            {
              userInfo ? <> <h5 className='mb-0'>{userInfo?.username}
              </h5>
                <Dropdown>
                  <MenuButton
                    slots={{ root: IconButton }}
                    slotProps={{ root: { variant: 'plain', color: 'neutral' } }}
                  >
                    <Avatar
                      variant="outlined"
                      size="sm"
                      src={userInfo?.profilePicture}
                    />
                  </MenuButton>
                  <Menu>
                    <MenuItem onClick={() => navigate('/me')}>
                      <ListItemDecorator>
                        <PersonIcon />
                      </ListItemDecorator>{' '}
                      Dashboard
                    </MenuItem>
                    <MenuItem onClick={() => navigate('/me/my-timeshares')}>
                      <ListItemDecorator>
                        <DeckIcon />
                      </ListItemDecorator>{' '}
                      My timeshare
                    </MenuItem>
                    <MenuItem onClick={() => navigate('/me/my-trips')}>
                      <ListItemDecorator>
                        <ConfirmationNumberIcon />
                      </ListItemDecorator>{' '}
                      My trips
                    </MenuItem>
                    <MenuItem onClick={logout}>
                      <ListItemDecorator>
                        <LogoutIcon />
                      </ListItemDecorator>{' '}
                      Logout
                    </MenuItem>
                  </Menu>
                </Dropdown>
              </> : <>
                <Button className='btn secondary__btn'><Link to='/login'>Login</Link></Button>
                <Button className='btn primary__btn'><Link to='/register'>Register</Link></Button>
              </>
            }
          </div>
        </Box>


      ) : (
        <header className='header'>
        <Container>
          <Row>

            <div className='nav__wrapper d-flex align-items-center justify-content-between'>
              {/* ========== logo ============ */}

              <div className="logo">
                <Link to={`/home`} style={{ textDecoration: 'none' }}>
                  <img src={logo} alt="" />
                </Link>
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

              <div className="nav__right d-flex align-items-center gap-3">
                {
                  userInfo ? <> <h5 className='mb-0'>{userInfo?.username}
                  </h5>
                    <Dropdown>
                      <MenuButton
                        slots={{ root: IconButton }}
                        slotProps={{ root: { variant: 'plain', color: 'neutral' } }}
                      >
                        <Avatar
                          variant="outlined"
                          size="sm"
                          src={userInfo?.profilePicture}
                        />
                      </MenuButton>
                      <Menu>
                        <MenuItem onClick={() => navigate('/me')}>
                          <ListItemDecorator>
                            <PersonIcon />
                          </ListItemDecorator>{' '}
                          Dashboard
                        </MenuItem>
                        <MenuItem onClick={() => navigate('/me/my-timeshares')}>
                          <ListItemDecorator>
                            <DeckIcon />
                          </ListItemDecorator>{' '}
                          My timeshare
                        </MenuItem>
                        <MenuItem onClick={() => navigate('/me/my-trips')}>
                          <ListItemDecorator>
                            <ConfirmationNumberIcon />
                          </ListItemDecorator>{' '}
                          My trips
                        </MenuItem>
                        <MenuItem onClick={logout}>
                          <ListItemDecorator>
                            <LogoutIcon />
                          </ListItemDecorator>{' '}
                          Logout
                        </MenuItem>
                      </Menu>
                    </Dropdown>
                  </> : <>
                    <Button className='btn secondary__btn'><Link to='/login'>Login</Link></Button>
                    <Button className='btn primary__btn'><Link to='/register'>Register</Link></Button>
                  </>
                }
              </div>
            </div>
          </Row>
        </Container>
      </header>
      )}

      
    </CssVarsProvider>
  )
}

export default Header;
