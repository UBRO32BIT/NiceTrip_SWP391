import React, { useState } from "react";
import styles from "./styles.module.css"; // Import CSS file
import { DeleteTimeshareByOwner } from '../services/booking.service'
import { useSnackbar } from 'notistack';
import { NavLink, useNavigate } from 'react-router-dom';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import Button from '@mui/joy/Button';
import EditIcon from '@mui/icons-material/Edit';
import CardContent from '@mui/joy/CardContent';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import { Link } from 'react-router-dom';
import Card from '@mui/joy/Card';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import { Grid, FormControl, FormLabel, Select, Option, Chip, Stack, Divider } from '@mui/joy'; // Nhóm lại các import từ MUI
import { GetPostBelongToOwner } from '../services/post.service';
import { useSelector } from 'react-redux';
import Switch from "@mui/joy/Switch";
import calculateAvgRating from '../utils/avgRating';
import { CardBody } from "reactstrap";
import stringToArray from '../utils/stringToArray';
import { convertDate } from '../utils/date';
import { useEffect } from 'react';
import './tour-card.css';
import { checkNewDate } from '../utils/date';

function Table({ myPosts}) {
  const navigate = useNavigate();
  // Sử dụng React Hooks trong function component
  const [isLoading, setIsLoading] = useState(false);
  const [tableVisible, setTableVisible] = useState(true); // State để xác định bảng có hiển thị hay không
  const { enqueueSnackbar } = useSnackbar();
useEffect(() => {
    console.log(myPosts);
}, [])
const post = {
    id: myPosts._id,
    title: myPosts.resortId,
    location: myPosts.resortId,
    image: myPosts.images,
    price: myPosts.price,
    pricePerNight: myPosts.pricePerNight,
    numberOfNights: myPosts.numberOfNights,

    type: myPosts.type,
    reviews: [3, 4, 5],
};
    console.log('alo ' + myPosts?.data?.data)


  function formatDate(dateString) {
    if (!dateString) return "";
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }
  return (
    <Grid container spacing={2} minWidth={'25%'} className="all__card">
    {myPosts.length > 0 ? (
      myPosts.map((post) => {
        const { totalRating, avgRating } = calculateAvgRating(post.reviews);
        if (!post?.deleted) {
          return (
            <Grid xs={12} md={6} lg={3} key={post.id}>
              <Link
                key={post.id}
                to={`/timeshare-details/${post?._id}`}
                style={{ textDecoration: "none" }}
              >
                <Card >
                  <div className="tour__img">
                    <AspectRatio minHeight="150px" maxHeight="250px">
                      <img src={post?.images[0]} />
                    </AspectRatio>
                    {checkNewDate(post.timestamp) && (
                       <span className="top"><b>New</b></span>
                    )}

                    <span className="bottom"><b>{post?.type}</b></span>
                  </div>
                  <CardBody>
                    <div className='card__top d-flex align-items-center justify-content-between'>
                      <span className='tour__location d-flex align-items-center gap-1'>
                        <i class="ri-map-pin-line"></i> {post?.resortId?.location}
                      </span>

                    </div>
                    <h5 className='tour__title'>{post?.resortId?.name}</h5>
                    <Stack >
                      <Box sx={{ width: 1, display: 'flex', justifyContent: 'space-between' }}>
                          <Typography fontWeight={500} fontSize={14}>
                              Unit:
                          </Typography>
                          <Typography fontWeight={400} fontSize={14}>
                              {post.unitId.name}
                          </Typography>
                      </Box>
                      <Box sx={{ width: 1, display: 'flex', justifyContent: 'space-between' }}>
                        <Typography fontWeight={500} fontSize={14}>
                          Stay:
                        </Typography>
                        <Typography fontWeight={400} fontSize={14}>
                          {post?.numberOfNights} night
                        </Typography>
                      </Box>
                      <Box sx={{ width: 1, display: 'flex', justifyContent: 'space-between', }}>
                        <Typography fontWeight={500} fontSize={14}>
                          Check-in:
                        </Typography>
                        <Typography fontWeight={400} fontSize={14}>
                          {formatDate(post?.start_date)}
                        </Typography>
                      </Box>
                      <Box sx={{ width: 1, display: 'flex', justifyContent: 'space-between' }}>
                        <Typography fontWeight={500} fontSize={14}>
                          Check-out:
                        </Typography>
                        <Typography fontWeight={400} fontSize={14}>
                          {formatDate(post?.end_date)}
                        </Typography>
                      </Box>
                      <Divider sx={{ mt: 1, mb: 1 }} />
                      <Box sx={{ width: 1, display: 'flex', justifyContent: 'space-between' }}>
                        <Typography fontWeight={500} fontSize={18}>
                          Price/night:
                        </Typography>
                        <Typography fontWeight={400} fontSize={18}>
                          {post?.pricePerNight}$
                        </Typography>
                      </Box>
                      <Box sx={{ width: 1, display: 'flex', justifyContent: 'space-between' }}>
                        <Typography fontWeight={500} fontSize={18}>
                          Total:
                        </Typography>
                        <Typography fontWeight={600} fontSize={18}>
                          {post.price}$
                        </Typography>
                      </Box>
                    </Stack>
                  </CardBody>
                </Card>
              </Link>
            </Grid>
          );
        }
        return null;
      })
            ) : (
            <Typography variant="body1" className="no-timeshare-found" sx={{marginLeft:'10px'}}>
                Timeshare not found
            </Typography>
            )}
        </Grid>
        );
    }

export default Table;