import React, { useRef, useState } from 'react'
import '../styles/timeshare-details.css'
import { GetPostById } from '../services/post.service'
import { Container, Row, Col, Form, ListGroup } from 'reactstrap'
import { useParams, useNavigate } from 'react-router-dom'
import tourData from '../assets/data/tours'
import calculateAvgRating from '../utils/avgRating'
import { Money } from '@mui/icons-material'
import Button from '@mui/material/Button';
import avatar from '../assets/images/avatar.jpg'
import Renting from '../components/Renting/Renting'

import Header from '../components/Header';
import Footer from '../components/Footer';
import { convertDate } from '../utils/date'
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css"
import convertImageArray from '../utils/convertImageArray'
import { Box } from '@mui/material';
import { useSelector } from "react-redux";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const TimeShareDetails = () => {
    const user = useSelector((state) => state?.auth?.user);
    const { id } = useParams();
    const navigate = useNavigate();
    const reviewMsgRef = useRef('');
    const [tourRating, setTourRating] = useState(null);
    const [post, setPost] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    React.useEffect(() => {
        GetPostById(id)
            .then((data) => {
                console.log(data);
                setPost(data);
            })
            .catch((err) => {
                if (err.response) {
                    console.log(err.response.status)
                }
                else console.error("Cannot get data from server!")
            });
    }, []);
    React.useEffect(() => {
        // Check if user is logged in and show snackbar
        if (user) {
            setOpenSnackbar(true);
        }
    }, [user]);
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    //destructure properties from tour object
    //const { photo, title, desc, price, address, reviews, city, distance, maxGroupSize, time } = tour

    const { totalRating, avgRating } = calculateAvgRating([1, 2, 3]);

    //format date
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    //submit request to server
    const submitHandler = e => {
        e.preventDefault()
        const reviewText = reviewMsgRef.current.value;
        alert(`${reviewText}, ${tourRating}`);
        //later will call API
    }

    return <>
        <Header />
        <section>
            <Container>
                <Row>
                    {/* {(user?._id === post?.current_owner?._id) &&
                        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                            <MuiAlert onClose={handleCloseSnackbar} severity="error" sx={{ width: '60%' }}>
                                CAN'T RENT/EXCHANGE ON YOUR TIMESHARE
                            </MuiAlert>
                        </Snackbar>} */}
                    <Col lg='12'>
                        <div className="tour__content">
                            <Row>
                                <Col lg='6'>
                                    {post && <ImageGallery items={convertImageArray([...post.images, ...post.resortId.image_urls])} showPlayButton={false} />}
                                </Col>
                                <Col lg='6'>
                                    <div className='tour__info'>
                                        <Box sx={{ color: 'white', float: 'right', textAlign: 'center', backgroundColor: 'gray', paddingRight: '15px', paddingLeft: '15px', width: 'fit-content', borderRadius: '5px' }}>
                                            {(post?.is_bookable === false) ? 'SOLD' : ''}
                                        </Box>


                                        <h2>{post?.resortId.name}</h2>

                                        <div className='d-flex align-items-center gap-5'>
                                            <span className='d-flex align-items-center gap-1'>
                                                <span className='tour__rating d-flex align-items-center gap-1'>
                                                    <i class="ri-star-s-fill" style={{ 'color': "var(--secondary-color)" }}></i>
                                                    {avgRating === 0 ? null : avgRating}
                                                    {totalRating === 0 ? 'Not rated' : <span>({'reviews?.length'})</span>
                                                    }
                                                </span>
                                            </span>
                                            <span>
                                                <i class="ri-map-pin-line"></i> {post?.resortId.location}
                                            </span>
                                            <div>
                                                {/* <Renting tour={tour} avgRating={avgRating} /> */}
                                            </div>
                                        </div>
                                        <div className='tour__extra-details'>
                                            <span>
                                                <i class="ri-map-pin-range-line"></i>{post?.resortId.location}
                                            </span>
                                            <span>
                                                <i class="ri-money-dollar-circle-line"></i>{post?.price}
                                            </span>
                                            <span>
                                                <i class="ri-time-line"></i> {convertDate(post?.start_date)} - {convertDate(post?.end_date)}
                                            </span>
                                        </div>
                                        <div>
                                            <h5>Description</h5>
                                            <p>{post?.resortId.description}</p>
                                        </div>
                                        <>
                                            <div className="text-center" style={{ display: "flex", alignItems: "center", gap: '5px' }}>
                                                {user?._id === post?.current_owner?._id ? (
                                                    <>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            size="large"
                                                            onClick={() => navigate(`/me/my-timeshares/timeshares-list/${id}`)}
                                                        >
                                                            Manage
                                                        </Button>
                                                    </>
                                                ) : (
                                                    <>
                                                        {post?.is_bookable === true && post?.type === 'rental' && (
                                                            <Button
                                                                variant="contained"
                                                                color="success"
                                                                size="large"
                                                                onClick={() => { navigate(`/timeshare/${post?._id}/book`) }}
                                                            >
                                                                Rent Now
                                                            </Button>
                                                        )}
                                                        {post?.is_bookable === true && post?.type === 'exchange' && (
                                                            <Button
                                                                variant="contained"
                                                                color="error"
                                                                size="large"
                                                                onClick={() => { navigate(`/timeshare/${post?._id}/exchange`) }}
                                                            >
                                                                Request to exchange
                                                            </Button>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </>

                                    </div>
                                </Col>
                            </Row>
                            {/*===========tour review section first========== */}
                            <div className='tour__reviews mt-4'>
                                <h4>Reviews ({'reviews?.length'} reviews)</h4>
                                <Form onSubmit={submitHandler}>
                                    <div className='d-flex align-items-center gap-3 mb-4 rating__group'>
                                        <span onClick={() => setTourRating(1)}> 1<i class="ri-star-s-fill"></i></span>
                                        <span onClick={() => setTourRating(2)}> 2<i class="ri-star-s-fill"></i></span>
                                        <span onClick={() => setTourRating(3)}> 3<i class="ri-star-s-fill"></i></span>
                                        <span onClick={() => setTourRating(4)}> 4<i class="ri-star-s-fill"></i></span>
                                        <span onClick={() => setTourRating(5)}> 5<i class="ri-star-s-fill"></i></span>
                                    </div>
                                    <div className="review__input">
                                        <input
                                            type="text"
                                            ref={reviewMsgRef}
                                            placeholder='share your thoughts'
                                            required />
                                        <button className='btn primary__btn text-white'
                                            type='submit'>
                                            Submit
                                        </button>
                                    </div>
                                </Form>
                                <ListGroup className='user__reviews'>
                                    {
                                        // reviews?.map(review => (
                                        //     <div className="review__item">
                                        //         <img src={avatar} alt="" />

                                        //         <div className="w-100">
                                        //             <div className='d-flex align-items-center justify-content-between'>
                                        //                 <div>
                                        //                     <h5>Minh Duc</h5>
                                        //                     <p>{new Date("10/01/2024").toLocaleDateString("en-US", options)}</p>
                                        //                 </div>
                                        //                 <span className='d-flex align-items-center'>
                                        //                     5<i className='ri-star-s-fill'></i>
                                        //                 </span>
                                        //             </div>
                                        //             <h6>Wowww so sexy</h6>
                                        //         </div>
                                        //     </div>
                                        // ))
                                    }
                                </ListGroup>
                            </div>
                        </div>
                    </Col>
                    {/* <Col lg='4'>
                        <Renting tour={tour} avgRating={avgRating} />
                    </Col> */}
                </Row>
            </Container>
        </section>
        <Footer />
    </>
}

export default TimeShareDetails