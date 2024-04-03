import Card from "@mui/joy/Card"
import Avatar from '@mui/joy/Avatar';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { AspectRatio, Box, Button, CardActions, CardContent, CardOverflow, Chip, Divider, FormControl, Grid, IconButton, List, ListDivider, ListItem, Sheet, Table, Typography } from "@mui/joy";
import { DotsThreeVertical as DotsThreeVerticalIcon } from '@phosphor-icons/react/dist/ssr/DotsThreeVertical';
import React from "react";
import axios from "axios";
import { GetPost } from "../../services/post.service";
import { convertDateTime } from "../../utils/date";
import CircularProgress from '@mui/joy/CircularProgress';
import SvgIcon from '@mui/joy/SvgIcon';
import  { useState, useEffect } from 'react';
import LinearProgress from '@mui/joy/LinearProgress';

const LatestTimeshare = () => {
    const [posts, setPosts] = React.useState([]);
    React.useEffect(() => {
        const fetchData = async () => {
            try {
				const url = `https://nice-trip.onrender.com/api/v2/timeshare?page=1&sort=timestamp,desc`;
                const { data } = await axios.get(url);
                console.log(url)
                console.log("Data from API:", data); // Log the entire data object
                // Assuming the data structure is an array of posts
                setPosts(data.data || []); // Set myPosts to data.myPosts or an empty array if data.myPosts is undefined
                //setLoading(false); // Set loading to false when data is fetched
			} catch (err) {
				console.log(err);
			}
        }
        fetchData();


    }, [])
    return (
        <Card>
            <Typography level="title-lg" startDecorator={<LoyaltyIcon />}>
                Latest Timeshares
            </Typography>
            <Divider />
            <Sheet>
                <Table aria-label="striped table" stripe="even">
                    <thead>
                    <tr>
                        <th style={{ width: '40%' }}>Timeshare</th>
                        <th>User</th>
                        <th>Verified</th>
                        <th>Upload time</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {posts.map((post: any, index: number) => (
                        <tr key={post._id}>
                        <td>{post.resortId.name}</td>
                        <td>
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                <Avatar size="sm" src={post.current_owner.profilePicture} alt={post.current_owner.username} />
                                <div>
                                <Typography level="body-xs">{post.current_owner.username}</Typography>
                                <Typography level="body-xs">{post.current_owner.email}</Typography>
                                </div>
                            </Box>
                        </td>
                        <td>{post.is_verified ? (
                            <VerifiedOutlinedIcon color='success' />
                        ) : (
                            <HighlightOffIcon style={{ color: 'red' }} />
                        )}</td>
                        <td>{convertDateTime(post.timestamp)}</td>
                        <td>
                            {post.isDeleted ? (
                                <Chip
                                variant="soft"
                                size="sm"
                                startDecorator={<BlockIcon />}
                                color="danger"
                                >
                                Deleted
                                </Chip>
                            ) : (
                                <Chip
                                variant="soft"
                                size="sm"
                                startDecorator={<CheckRoundedIcon />}
                                color="success"
                                >
                                Active
                                </Chip>
                            )}
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                </Sheet>
            {/* <List>
                {posts.map((post: any, index: number) => (
                    <>
                        <ListItem key={post._id}>
                            <Box sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                                gap: 1,
                            }}>

                            </Box>
                            <Card
                                orientation="horizontal"
                                size="sm"
                                sx={{ bgcolor: 'background.surface', borderRadius: 0, mb: 1 }}
                            >
                                <CardOverflow>
                                    <AspectRatio
                                        ratio="1"
                                        sx={{ minWidth: 70, '& img[data-first-child]': { p: 1 } }}
                                    >
                                        <img
                                            src={post.images[0]}
                                            srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=70&dpr=2 2x"
                                            loading="lazy"
                                            alt=""
                                        />
                                    </AspectRatio>
                                </CardOverflow>
                                <CardContent>
                                    <Typography level="title-md">{post.resortId.name}</Typography>
                                    <Typography level="body-sm">{"post."}</Typography>
                                </CardContent>
                                <IconButton>
                                    <DotsThreeVerticalIcon weight="bold" />
                                </IconButton>
                            </Card>
                        </ListItem>
                        <ListDivider inset={"context"} />
                    </>
                ))}
            </List> */}
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button
                    variant="plain"
                    endDecorator={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
                    size="sm"
                >
                    View all
                </Button>
            </CardActions>
            

        </Card>
        
    )
    
}
export default function AdminOverview() {
    const [countTimeshare, setCountTimeshare] = useState(0);
    const [countAllTimeshare, setCountAllTimeshare] = useState(0);
    const [countServicePack, setCountServicePack] = useState(0);
    const [countAllPayment, setCountAllPayment] = useState(0);
    const [countUser, setCountUser] = useState(0);

    
    const rounredUser = Math.round((countServicePack/countUser)*100)
    const roundedCountTimeshare = Math.round(countTimeshare);
    const roundedComplement = Math.round(100 - countTimeshare);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://nice-trip.onrender.com/api/v2/timeshare/countTimeshare');
                const newCount = response.data; 
                setCountTimeshare(newCount);
            } catch (error) {
                console.error('Error fetching countTimeshare:', error);
            }
        };

        fetchData();

        const fetchDataTimeshare = async () => {
            try {
                const response = await axios.get('https://nice-trip.onrender.com/api/v2/timeshare/countAllTimeshare');
                const CountAll = response.data; 
                setCountAllTimeshare(CountAll);
            } catch (error) {
                console.error('Error fetching countTimeshare:', error);
            }
        };
        fetchDataTimeshare()

        const fetchDataPayment = async () => {
            try {
                const response = await axios.get('https://nice-trip.onrender.com/api/v2/payment/total-amount');
                const CountAll = response.data; 
                setCountAllPayment(CountAll);
            } catch (error) {
                console.error('Error fetching countTimeshare:', error);
            }
        };
        fetchDataPayment()

        const fetchDataServicePack = async () => {
            try {
                const response = await axios.get('https://nice-trip.onrender.com/api/v2/payment/total-servicePack');
                const CountAll = response.data; 
                setCountServicePack(CountAll);
            } catch (error) {
                console.error('Error fetching countTimeshare:', error);
            }
        };
        fetchDataServicePack()

        const fetchDataUser = async () => {
            try {
                const response = await axios.get('https://nice-trip.onrender.com/api/v2/payment/count-users');
                const CountAll = response.data; 
                setCountUser(CountAll);
            } catch (error) {
                console.error('Error fetching countTimeshare:', error);
            }
        };
        fetchDataUser()
        
    }, []);

    return (
        <Grid container spacing={2} mx={2}>
            <Grid>
            <LatestTimeshare />
            </Grid>
            <Card sx={{height: "fit-content", marginLeft:"8px", marginTop:"8px"}}>
            <Typography level="body-md" sx={{ textAlign:'center',  borderRadius:'5px', fontWeight:'bold'}}>Timeshare Type Analysis</Typography>
                <CardActions>

                <CircularProgress size="lg" determinate value={roundedComplement}>
                        {roundedComplement}%
                    </CircularProgress>
                <Typography level="body-md" sx={{ textAlign:'center',  borderRadius:'5px'}}>Exchange
                <p>{roundedComplement}%</p>
                </Typography>
                
                </CardActions>
                <CardActions>

                <Typography level="body-md" sx={{ textAlign:'center',  borderRadius:'5px'}}>Rental
                <p>{roundedCountTimeshare}%</p>
                    </Typography>
                <CircularProgress size="lg" determinate value={countTimeshare}>
                        {roundedCountTimeshare}%
                    </CircularProgress>

                </CardActions>
                <CardActions>

                <Typography level="body-md" sx={{ textAlign:'center',  borderRadius:'5px'}}>
                <h6>Total: {countAllTimeshare} timeshares</h6>
                </Typography>


                </CardActions>
            </Card>
            <Card sx={{height: "fit-content", marginLeft:"16px", marginTop:"8px"}}>
            <Typography level="body-md" sx={{ textAlign:'center',  borderRadius:'5px', fontWeight:'bold'}}>Upgrade Success</Typography>
                <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
                    <h2 style={{marginTop:'-15px', marginBottom:"-5px"}}>{countServicePack}</h2>
                </CardActions>
            <Typography level="body-md" >Customer: {countUser}</Typography>
            
                <LinearProgress determinate value={rounredUser} />
                <Typography >Member: {rounredUser}%</Typography>
                <CardActions>
                            <Typography level="body-md" sx={{ textAlign:'center',  borderRadius:'5px'}}><h6>Total: {countAllPayment} VND</h6></Typography>
                </CardActions>
            </Card>


            
        </Grid>
    );
};