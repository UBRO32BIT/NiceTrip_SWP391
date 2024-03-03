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
                {myReservations.length > 0 && myReservations.map((item: any) => {
                    return (<Grid xs={12} md={6} lg={4}>
                        <Card variant="outlined" sx={{}}>
                            <CardOverflow>
                                <AspectRatio ratio="2">
                                    <img
                                        src={item?.postId?.resortId?.image_urls}
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
                                    {item?.status === 'confirmed' ? <Chip
                                        variant="soft"
                                        color="success"
                                        size="sm"
                                    >
                                        Owner confirmed, wait for resort confirmation
                                    </Chip> : 
                                    <Chip
                                        variant="soft"
                                        color="danger"
                                        size="sm"

                                    >
                                        Wait for accept
                                    </Chip>}

                                </Typography>

                                <Typography level="title-md" noWrap >{item?.postId?.resortId?.name}</Typography>
                                <Typography level="body-sm">{item?.postId?.resortId?.location}</Typography>
                                <Link to={`/post/${item?.postId?._id}`} target="_blank" rel="noopener noreferrer">View original post</Link>

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
