import * as React from 'react';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import {styled, Grid, Button} from '@mui/joy';
import {useSelector} from 'react-redux';
import {UpdateUser} from '../../services/auth.service';
import {GetReservationOfUser} from '../../services/booking.service';
import {GetExchangeOfUser} from '../../services/booking.service';
import {DeleteExchange} from '../../services/booking.service';
import {Routes, Route, Navigate, useNavigate, NavLink, Link} from "react-router-dom";
import AspectRatio from '@mui/joy/AspectRatio';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import Chip from '@mui/joy/Chip';
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import {Transition} from "react-transition-group";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import Box from "@mui/joy/Box";
import Avatar from "@mui/joy/Avatar";
import DialogContent from "@mui/joy/DialogContent";
import MenuItem from "@mui/joy/MenuItem";
import Stack from "@mui/joy/Stack";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import BlockIcon from "@mui/icons-material/Block";
import PaymentIcon from '@mui/icons-material/Payment';
import ListItem from "@mui/joy/ListItem";
import Radio from "@mui/joy/Radio";
import ListDivider from "@mui/joy/ListDivider";
import Input from "@mui/joy/Input";
import {InfoOutlined} from "@mui/icons-material";
import Checkbox from "@mui/joy/Checkbox";
import OrderDetailModal from "./OrderDetailModal";
import {useSnackbar} from 'notistack';

interface RootState {
    auth: {
        isAuthenticated: boolean;
        user: any;
    };
}

function CreditCardIcon() {
    return null;
}



export default function OrderList() {
    const user = useSelector((state: RootState) => state?.auth?.user);
    const [myReservations, setMyReservations] = React.useState([]);
    const [myExchanges, setMyExchanges] = React.useState([]);

    const navigate = useNavigate()
    const [open, setOpen] = React.useState<boolean>(false);
    const [paymentOpen, setPaymentOpen] = React.useState<boolean>(false);
    const [modalStates, setModalStates] = React.useState<boolean[]>([]);
    const {enqueueSnackbar} = useSnackbar();

async function handleDeleteExchange (exchangeId: string) {
    try {
        const success = await DeleteExchange(exchangeId);
        if (success) {
            enqueueSnackbar("Cancel success", { variant: "success" });
        } else {
            enqueueSnackbar("ERROR: Cancel failed", { variant: "error" });
        }
    } catch(error) {
        enqueueSnackbar("Error deleting exchange", { variant: "error" });
    }
};
    
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
    async function GetMyExchanges(userId: string) {
        const ExchangeData = await GetExchangeOfUser(userId);
        if (ExchangeData && ExchangeData.length > 0) {
            setMyExchanges(ExchangeData)
        }
    }

    const toggleModal = (index: number) => {
        const newModalStates = [...modalStates];
        newModalStates[index] = !newModalStates[index];
        setModalStates(newModalStates);
    };
    React.useEffect(() => {
        if (user?._id) {
            GetMyReservations(user?._id)
            GetMyExchanges(user?._id)
        }
    }, [user])
    return (
        <Grid container spacing={2} sx={{flexGrow: 1, mx: {xs: 2, md: 5}, mt: 2,}}>
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
            {myReservations.map((item: any, index: number) => {
                return (<>
                    <OrderDetailModal item={item} open={modalStates[index]} setOpen={() => toggleModal(index)}/>
                    <Grid xs={12} md={6} lg={4}>
                        <Card key={index} variant="outlined" sx={{}}>
                            <CardOverflow>
                                <AspectRatio ratio="2">
                                    <img
                                        src={item?.timeshareId?.resortId?.image_urls}
                                        // srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
                                        loading="lazy"
                                        alt=""
                                    />
                                    {/*{item?.status === "Canceled" && (*/}
                                    {/*    <h2 style={{opacity: 0.9, color: "#fff"}}>Expired</h2>)}*/}
                                </AspectRatio>
                            </CardOverflow>
                            <CardContent>
                                {item?.status === "Canceled" ? (<Typography sx={{display: 'inline-flex', gap: 1}}>
                                        <Chip
                                            variant="soft"
                                            color="danger"
                                            size="sm"
                                            startDecorator={<BlockIcon/>}
                                        >
                                            Canceled
                                        </Chip>
                                    </Typography>) :
                                    (<Typography sx={{display: 'inline-flex', gap: 1}}>
                                        {item?.isPaid === true ? <Chip
                                                variant="soft"
                                                color="success"
                                                size="sm"
                                                startDecorator={<CheckRoundedIcon/>}
                                            >
                                                Paid
                                            </Chip> :
                                            <Chip
                                                variant="soft"
                                                color="danger"
                                                size="sm"
                                                startDecorator={<BlockIcon/>}
                                            >
                                                Paid
                                            </Chip>}
                                        {item?.is_accepted_by_owner ? <Chip
                                                variant="soft"
                                                color="success"
                                                size="sm"
                                                startDecorator={<CheckRoundedIcon/>}
                                            >
                                                Owner confirmed, go to payment phase
                                            </Chip> :
                                            <Chip
                                                variant="soft"
                                                color="danger"
                                                size="sm"
                                                startDecorator={<BlockIcon/>}
                                            >
                                                Wait for accept
                                            </Chip>}
                                    </Typography>)}
                                <Typography level="title-md" noWrap>{item?.timeshareId?.resortId?.name}</Typography>
                                <Typography level="body-sm">{item?.timeshareId?.resortId?.location}</Typography>
                                {/*<Link to={`/timeshare-details/${item?.timeshareId?._id}`} target="_blank" rel="noopener noreferrer">View original post</Link>*/}
                                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                                    <Button variant="soft" color="primary"
                                            onClick={() => toggleModal(index)}>View</Button>
                                    {item?.status === "Canceled" ?
                                        (<Button variant="plain" color="danger">Remove</Button>) :
                                        (<Button variant="plain" color="danger"
                                                 onClick={() => setOpen(true)}>Cancel</Button>)}

                                </Box>

                            </CardContent>
                            <CardOverflow variant="soft" sx={{bgcolor: 'background.level1'}}>
                                <Divider inset="context"/>
                                <CardContent orientation="horizontal">
                                    <Typography level="body-md" fontWeight="md" textColor="text.secondary">
                                        ${item?.amount}
                                    </Typography>
                                    <Divider orientation="vertical"/>
                                    <Typography level="body-md" fontWeight="md" textColor="text.secondary">
                                        {formatDate(item?.createdAt)}
                                    </Typography>
                                </CardContent>
                            </CardOverflow>
                        </Card>
                    </Grid>
                </>)
            })}
            {myExchanges.map((item: any, index: number) => {
                return (<>
                    <OrderDetailModal item={item} open={modalStates[index]} setOpen={() => toggleModal(index)}/>
                    <Grid xs={12} md={6} lg={4}>
                        <Card key={index} variant="outlined" sx={{}}>
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
                                <Typography sx={{display: 'inline-flex', gap: 1}}>
                                    {item?.status === 'Completed' ? <Chip
                                            variant="soft"
                                            color="success"
                                            size="sm"
                                            startDecorator={<CheckRoundedIcon/>}
                                        >
                                            Owner confirmed, go to trip
                                        </Chip> :
                                        <Chip
                                            variant="soft"
                                            color="danger"
                                            size="sm"
                                            startDecorator={<BlockIcon/>}
                                        >
                                            {item?.status === 'Agreement phase' ? ('Wait for accept') : (
                                            <>
                                                {(item?.deleted === false ? (
                                                `Canceled by Owner`

                                                ) : ( 
                                                'You are canceled'
                                                ))}
                                            </>
                                                
                                                )}
                                        </Chip>}
                                </Typography>
                                <Typography level="title-md" noWrap>{item?.timeshareId?.resortId?.name}</Typography>
                                <Typography level="body-sm">{item?.timeshareId?.resortId?.location}</Typography>
                                {/*<Link to={`/timeshare-details/${item?.timeshareId?._id}`} target="_blank" rel="noopener noreferrer">View original post</Link>*/}
                                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                                    <Button variant="soft" color="primary"
                                            onClick={() => toggleModal(index)}>View</Button>
                                <Button variant="plain" color="danger" onClick={() => handleDeleteExchange(item?._id)}>Cancel</Button>
                                </Box>

                            </CardContent>
                            <CardOverflow variant="soft" sx={{bgcolor: 'background.level1'}}>
                                <Divider inset="context"/>
                                <CardContent orientation="horizontal">
                                    <Typography level="body-md" fontWeight="md" textColor="text.secondary">
                                        ${item?.amount}
                                    </Typography>
                                    <Divider orientation="vertical"/>
                                </CardContent>
                            </CardOverflow>
                        </Card>
                    </Grid>
                </>)
            })}
        </Grid>

    )
}
