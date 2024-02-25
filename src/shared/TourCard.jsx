import React from 'react';
import { Card, CardBody } from "reactstrap";
import { Link } from 'react-router-dom';
import './tour-card.css'
import calculateAvgRating from '../utils/avgRating';
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/joy/Stack";

const TourCard = ({ tour }) => {

    const { id, title, city, photo, price, price2, time, newrental, reviews } = tour;

    const {totalRating, avgRating} = calculateAvgRating(reviews)

    return <div className='tour__card'>
        <Card>
            <div className="tour__img">
                <img src={photo} alt="tour-img" />
                <span>NewRental</span>
            </div>

            <CardBody>
                <div className='card__top d-flex align-items-center justify-content-between'>
                    <span className='tour__location d-flex align-items-center gap-1'>
                        <i class="ri-map-pin-line"></i> {city}
                    </span>
                    <span className='tour__rating d-flex align-items-center gap-1'>
                        <i class="ri-star-fill"></i> {avgRating === 0 ? null : avgRating}
                        {totalRating === 0 ? 'Not rated' : <span>({reviews.length})</span>
                    }
                    </span>
                </div>
                <h5 className='tour__title'><Link to={`/timesharedetails/${id}`}>{title}</Link></h5>
                <Stack sx={{ width: 1, display: 'flex', justifyContent: 'center' }} direction="column" spacing={0} justifyContent="center">
                    <Box sx={{ width: 1, display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Typography fontWeight={500} fontSize={14}>
                            Unit:
                        </Typography>
                        <Typography fontWeight={400} fontSize={14}>
                            {title}
                        </Typography>
                    </Box>
                    <Box sx={{ width: 1, display: 'flex', justifyContent: 'space-between' }}>
                        <Typography fontWeight={500} fontSize={14}>
                            Stay:
                        </Typography>
                        <Typography fontWeight={400} fontSize={14}>
                            {time} night
                        </Typography>
                    </Box>
                    <Box sx={{ width: 1, display: 'flex', justifyContent: 'space-between', }}>
                        <Typography fontWeight={500} fontSize={14}>
                            Check-in:
                        </Typography>
                        <Typography fontWeight={400} fontSize={14}>
                            23/34/23
                        </Typography>
                    </Box>
                    <Box sx={{ width: 1, display: 'flex', justifyContent: 'space-between' }}>
                        <Typography fontWeight={500} fontSize={14}>
                            Check-out:
                        </Typography>
                        <Typography fontWeight={400} fontSize={14}>
                            awdawd
                        </Typography>
                    </Box>
                    <Divider sx={{ mt: 1, mb: 1 }} />
                    <Box sx={{ width: 1, display: 'flex', justifyContent: 'space-between' }}>
                        <Typography fontWeight={500} fontSize={18}>
                            Price/night:
                        </Typography>
                        <Typography fontWeight={400} fontSize={18}>
                           200$
                        </Typography>
                    </Box>
                    <Box sx={{ width: 1, display: 'flex', justifyContent: 'space-between' }}>
                        <Typography fontWeight={500} fontSize={18}>
                            Total:
                        </Typography>
                        <Typography fontWeight={600} fontSize={18}>
                            2300$
                        </Typography>
                    </Box>
                </Stack>
                {/*<div className='card__bottom d-flex align-items-center justify-content-between mt-3'>*/}
                {/*    <h5>${price} (${price2}/night)</h5>*/}
                {/*    <button className='btn booking__btn'>*/}
                {/*        <Link to={`/timesharedetails/${id}`}>Rent/Exchange</Link>*/}
                {/*    </button>*/}
                {/*</div>*/}
                {/*<div className='tour__daydetails'>*/}
                {/*    <h5><span>{time}</span></h5>*/}
                {/*</div>*/}
            </CardBody>

        </Card>


    </div>;

}

export default TourCard