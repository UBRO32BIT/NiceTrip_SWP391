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
import { GetReservationOfUser } from '../../services/booking.service';
import { Routes, Route, Navigate, useNavigate, NavLink, Link } from "react-router-dom";
import AspectRatio from '@mui/joy/AspectRatio';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import Chip from '@mui/joy/Chip';
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

interface RootState {
    auth: {
        isAuthenticated: boolean;
        user: any;
    };
}
export default function OrderList() {
    const user = useSelector((state: RootState) => state?.auth?.user);
    const [myReservations, setMyReservations] = React.useState([]);
    const navigate = useNavigate()

    function formatDate(dateString?: string): string {
        if (!dateString) return '';
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }
    async function GetMyReservations(userId: string) {
        const ReservationsData = await GetReservationOfUser(userId);
        if (ReservationsData && ReservationsData.length > 0) {
            setMyReservations(ReservationsData)
        }
    }

    React.useEffect(() => {
        if (user?._id) {
            GetMyReservations(user?._id)
        }
    }, [user])
    return (
        <Grid container spacing={2} sx={{ flexGrow: 1, mx: { xs: 2, md: 5 }, mt: 2, }}>
            <Grid
                md={12} xs={12}
                sx={{
                    display: 'flex',
                    gap: 3,
                    // p: 0,
                    mb: 2
                }}>
                <FormControl size="sm">
                    <FormLabel>Status</FormLabel>
                    <Select
                        size="sm"
                        placeholder="Filter by status"
                        slotProps={{button: {sx: {whiteSpace: 'nowrap'}}}}
                    >
                        <Option value="paid">Paid</Option>
                        <Option value="pending">Pending</Option>
                        <Option value="refunded">Refunded</Option>
                        <Option value="cancelled">Cancelled</Option>
                    </Select>
                </FormControl>
                <FormControl size="sm">
                    <FormLabel>Type</FormLabel>
                    <Select size="sm" placeholder="All">
                        <Option value="all">Rent</Option>
                        <Option value="refund">Exchange</Option>
                    </Select>
                </FormControl>
                <FormControl size="sm">
                    <FormLabel>Customer</FormLabel>
                    <Select size="sm" placeholder="All">
                        <Option value="all">All</Option>
                        <Option value="olivia">Olivia Rhye</Option>
                    </Select>
                </FormControl>
            </Grid>
                {myReservations.length > 0 && myReservations.map((item: any) => {
                    return (<Grid xs={12} md={6} lg={4}>
                        <Card variant="outlined" sx={{}}>
                            <CardOverflow>
                                <AspectRatio ratio="2">
                                    <img
                                        src={item?.timeshareId?.resortId?.image_urls}
                                        // srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
                                        loading="lazy"
                                        alt=""
                                    />
                                </AspectRatio>
                            </CardOverflow>
                            <CardContent>
                                <Typography sx={{ display: 'inline-flex', gap: 1 }}>
                                    {item?.isPaid === true ? <Chip
                                            variant="soft"
                                            color="success"
                                            size="sm"
                                        >
                                            Is paid
                                        </Chip> :
                                        <Chip
                                            variant="soft"
                                            color="danger"
                                            size="sm"

                                        >
                                            Isn't paid
                                        </Chip>}
                                    {item?.is_accepted_by_owner ? <Chip
                                        variant="soft"
                                        color="success"
                                        size="sm"
                                    >
                                        Owner confirmed, go to payment
                                    </Chip> : 
                                    <Chip
                                        variant="soft"
                                        color="danger"
                                        size="sm"

                                    >
                                        Wait for accept
                                    </Chip>}

                                </Typography>

                                <Typography level="title-md" noWrap >{item?.timeshareId?.resortId?.name}</Typography>
                                <Typography level="body-sm">{item?.timeshareId?.resortId?.location}</Typography>
                                <Link to={`/timeshare-details/${item?.timeshareId?._id}`} target="_blank" rel="noopener noreferrer">View original post</Link>

                            </CardContent>
                            <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
                                <Divider inset="context" />
                                <CardContent orientation="horizontal">
                                    <Typography level="body-md" fontWeight="md" textColor="text.secondary">
                                        ${item?.amount}
                                    </Typography>
                                    <Divider orientation="vertical" />
                                    <Typography level="body-md" fontWeight="md" textColor="text.secondary">
                                        {formatDate(item?.reservationDate)}
                                    </Typography>
                                </CardContent>
                            </CardOverflow>
                        </Card>
                    </Grid>)
                })}

        </Grid>

    )
}
