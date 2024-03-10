import * as React from 'react';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { styled, Grid } from '@mui/joy';
import { useSelector } from 'react-redux';
import { UpdateUser } from '../../services/auth.service';
import { GetReservationOfUser, GetTripOfUser } from '../../services/booking.service';
import { Routes, Route, Navigate, useNavigate, NavLink, Link } from "react-router-dom";
import AspectRatio from '@mui/joy/AspectRatio';
import CardContent from '@mui/joy/CardContent';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Chip from '@mui/joy/Chip';
import JsBarcode from 'jsbarcode';
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { GetAllRequest } from '../../services/admin.services';
var { createCanvas } = require("canvas");

interface RootState {
    auth: {
        isAuthenticated: boolean;
        user: any;
    };
}

export default function RequestList() {
    const user = useSelector((state: RootState) => state?.auth?.user);
    const [requests, setRequests] = React.useState([]);
    const navigate = useNavigate();

    React.useEffect(() => {
        getAllRequest();
    }, []);

    async function getAllRequest() {
        const allRequests = await GetAllRequest();
        if (allRequests && allRequests.length > 0) {
            console.log("Log all requests:" + allRequests);
            setRequests(allRequests);
        }
    }

    return (
        <Grid container spacing={2} sx={{ flexGrow: 1, mx: { xs: 2, md: 5 }, mt: 2 }}>
            {requests.length > 0 && requests.map((request: any, index: number) => (
                <Grid key={index} xs={12} md={6} lg={4}>
                    <Card>
                        <CardContent>
                            <Typography component="div">
                                Owner: {request.userId}
                            </Typography>
                            <Typography >
                                Post: {request.postId}
                            </Typography>
                            <Typography>
                                Status: {request.status}
                            </Typography>
                            <Typography>
                                Type: {request.type}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button>Ban</Button>
                            <Button>Delete</Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}
