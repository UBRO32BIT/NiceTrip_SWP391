import * as React from 'react';
import "../../styles/home.css";

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import {Container, Row, Col} from 'reactstrap';
import heroImg from '../../assets/images/hero-img01.jpg';
import heroImg02 from '../../assets/images/hero-img02.jpg';
import heroVideo from '../../assets/images/pexels-david-bartus-586687.jpg';
import Subtitle from '../../shared/Subtitle';
import worldImg from '../../assets/images/world.png';
import SearchBar from '../../shared/SearchBar';
import ServiceList from '../../components/services/ServiceList';
import FeaturedTourList from '../../components/Featured-tours/FeaturedTourList';
import experienceImg from '../../assets/images/experienceImg.png';
import Testimonial from '../../components/Testimonial/Testimonial';
import {GetPost} from '../../services/post.service';
import { Typography } from '@mui/joy';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from "axios";
import  { useState, useEffect } from 'react';
const Home = () => {
    const [posts, setPosts] = React.useState([]);
    const [countTimeshareSuccess, setCountTimeshareSuccess] = useState([]);
    const [countUser, setCountUser] = useState([]);
    const [countResort, setCountResort] = useState([]);

    React.useEffect(() => {
        GetPost()
            .then((data) => {
                console.log(data);
                setPosts(data);
            })
            .catch((err) => {
                if (err.response) {
                    console.log(err.response.status)
                } else console.error("Cannot get data from server!")
            });
    }, []);

    useEffect(() => {

    })
        
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://nice-trip.onrender.com/api/v2/timeshare/count-timeshare-success');
                const newCount = response.data; 
                setCountTimeshareSuccess(newCount);
            } catch (error) {
                console.error('Error fetching countTimeshare:', error);
            }
        };
        fetchData();

        const fetchDataUser = async () => {
            try {
                const response = await axios.get('https://nice-trip.onrender.com/api/v2/payment/count-users');
                const newCount = response.data; 
                setCountUser(newCount);
            } catch (error) {
                console.error('Error fetching countTimeshare:', error);
            }
        };
        fetchDataUser();

        const fetchDataResort = async () => {
            try {
                const response = await axios.get('https://nice-trip.onrender.com/api/v2/resort/count/all-resort');
                const newCount = response.data; 
                setCountResort(newCount);
            } catch (error) {
                console.error('Error fetching countTimeshare:', error);
            }
        };
        fetchDataResort();
    }, [])   
    
    return (
        <>
            <Header/>
            <section>
                <Container>
                    <Row>
                        <Col lg='6'>
                            <div className='hero__content'>
                                <div className='hero__subtitle d-flex align-items-center'>
                                    <Subtitle subtitle={'Know Before You Go'}/>
                                    <img src={worldImg} alt=""/>
                                </div>
                                <h1><span className="hightlight">No mater</span> where you’re going to, we’ll take you
                                    there </h1>
                                <p>NiceTrip's resort rental and exchange service is a great choice for travelers who
                                    want to experience diverse and exciting vacations</p>
                            </div>
                        </Col>
                        <Col lg='2'>
                            <div className='hero__img-box'>
                                <img src={heroImg} alt=""/>
                            </div>
                        </Col>
                        <Col lg='2'>
                            <div className='hero__img-box mt-4'>
                                <img src={heroVideo} alt="" controls/>
                            </div>
                        </Col>
                        <Col lg='2'>
                            <div className='hero__img-box mt-5'>
                                <img src={heroImg02} alt=""/>
                            </div>
                        </Col>
                        {/* <SearchBar/> */}
                    </Row>
                </Container>
            </section>
            {/*===============hero end ============*/}
            {/* <section>
                <Container>
                    <Row>
                        <Col lg='3'>
                            <h5 className='services__subtitle'> What we serve</h5>
                            <h2 className='services__title'>We offer our best services</h2>
                        </Col>
                        <ServiceList/>
                    </Row>
                </Container>
            </section> */}

            {/*===================== featured tour or timeshare start==============*/}
            <section>
                <Container>
                    <Row>
                        <Col lg='12' className='mb-5'>
                            <Subtitle subtitle={'Explore'}/>
                            <h2 className='featured__tour-title'> Our featured timeshares</h2>
                        </Col>
                        <Col lg='12'>
                            {<FeaturedTourList posts={posts}/>}
                        </Col>
                    </Row>
                    <div className="d-flex justify-content-center">
                        <Link to="/timeshare" className="btn btn-primary bg-white " style={{ color: 'orange', borderColor: 'orange', marginTop: ' 30px' }}>View more timeshares...</Link>
                    </div>
                </Container>
            </section>
            {/*===================== featured tour or timeshare end==============*/}
            {/*===================== experience section tour or timeshare start==============*/}
            <section>
                <Container>
                    <Row>
                        <Col lg='6'>
                            <div className="experience__content">
                                <Subtitle subtitle={'Experience'}/>
                                <h2>With our all experience <br/> we will serve you
                                </h2>
                                <p>
                                    We are always there to serve the needs of renting <br/> and exchanging timeshares
                                    with each other
                                </p>
                            </div>
                            <div className="counter__wrapper d-flex align-items-center gap-5">
                                <div className="counter__box">
                                    <span className="circle">{countTimeshareSuccess}</span>
                                    <h6>Successfull Timeshare</h6>
                                </div>
                                <div className="counter__box">
                                    <span className="circle">{countUser}</span>
                                    <h6>Users Active</h6>
                                </div>
                                <div className="counter__box">
                                    <span className="circle">{countResort}</span>
                                    <h6>Resort Partner</h6>
                                </div>
                            </div>
                        </Col>
                        <Col lg='6'>
                        <div className="d-flex justify-content-end">
                            <div className="experience__img">
                                <img style={{ width: '600px' }} src={experienceImg} alt="" />
                            </div>
                        </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            {/*===================== experience section tour or timeshare end==============*/}
            {/* <section>
                <Container>
                    <Row>
                        <Col lg='12'>
                            <Subtitle subtitle={'Fans Love'}/>
                            <h2 className="testimonial__title">
                                What our fans say about us
                            </h2>
                        </Col>
                        <Col lg='12'>
                            <Testimonial/>
                        </Col>
                    </Row>
                </Container>
            </section> */}

            <Footer/>
        </>
    )
}

export default Home
