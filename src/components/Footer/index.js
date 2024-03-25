import React from 'react'
import './footer.css'
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png';

const quick_link = [
  {
    path: '/home',
    display: 'Home'
  },
  {
    path: '/about',
    display: 'About us'
  },

];


const Footer = () => {

  const year = new Date().getFullYear()

  return <footer className='footer' >
    <Container>
      <Row>
        <Col lg='3' >
          <div className="logo">
            <img src={logo} alt="" />
            <p></p>
            <p>NiceTrip ASIA Luxury Resort</p>
            <div className='social__links d-flex align-items-center gap-4'>
              <span>
                <Link to='#'><i class="ri-youtube-line"></i></Link>
              </span>
              <span>
                <Link to='#'><i class="ri-facebook-fill"></i></Link>
              </span>
              <span>
                <Link to='#'><i class="ri-instagram-line"></i></Link>
              </span>
            </div>
          </div>
        </Col>
        <Col lg='3'>
          <h5 className='footer__link-title'>ABOUT</h5>
          <ListGroup className='footer__quick-links'>
            {
              quick_link.map((item, index) => (
                <ListGroupItem key={index} className='ps-0 border-0'>
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))
            }
          </ListGroup>
        </Col>
        
        <Col lg='3'>
          <h5 className='footer__link-title'>CONTACTS</h5>
          <ListGroup className='footer__quick-links'>
            <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>
                  <i class="ri-map-pin-line"></i>
                  <p className='mb-0'> Thu Duc, HCM City, VN </p>

            </ListGroupItem>
            <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>
                <span className='mb-0 d-flex align-items-center gap-2'>
                  <i class="ri-mail-line"></i>
                </span>
                <p className='mb-0'> nicetrip@gmail.com </p>
            </ListGroupItem>
            <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>
                <span className='mb-0 d-flex align-items-center gap-2'>
                  <i class="ri-phone-line"></i>
                </span>
                <p className='mb-0'> 0917497476 </p>
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col lg='3'>
          <h5 className='footer__link-title'>TIMESHARE RENTALS</h5>
          <ListGroup className='footer__quick-links'>
        <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>
            <a href='/timeshare' className='mb-0 d-flex align-items-center gap-2'>
                Find a Timeshare to Rental
            </a>
        </ListGroupItem>
        <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>
            <a href='/me/my-timeshares/upload-new-timeshare' className='mb-0 d-flex align-items-center gap-2'>
                Rent My Timeshare
            </a>
        </ListGroupItem>
        <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>
            <a href='/timeshare' className='mb-0 d-flex align-items-center gap-2'>
                Find Timeshares for Exchange
            </a>
        </ListGroupItem>
        <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>
            <a href='/me/my-timeshares/upload-new-timeshare' className='mb-0 d-flex align-items-center gap-2'>
                Exchange My Timeshare
            </a>
        </ListGroupItem>
    </ListGroup>

        </Col>
        <Col lg='12' className='text-center pt-5'>
          <p className='copyright'>Copyright By NiceTrip-{year}. All rights reserved</p>
        </Col>
      </Row>
    </Container>
  </footer>
}

export default Footer