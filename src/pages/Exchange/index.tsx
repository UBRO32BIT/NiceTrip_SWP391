import * as React from 'react';
import {CssVarsProvider} from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import NavBar from '../../components/Rental/NavBar';
import {GetPostById} from '../../services/post.service';
import Grid from '@mui/joy/Grid';
import {Button, Typography} from '@mui/joy';
import {Routes, Route, useParams} from 'react-router-dom';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import {shadows} from '@mui/system';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import CountrySelector from '../../components/Profile/CountrySelector';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import {useSelector} from 'react-redux';
import {NavLink, useNavigate} from 'react-router-dom';
import {GetReservationById, MakeReservation} from '../../services/booking.service';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ImageGallery from "react-image-gallery";
import convertImageArray from "../../utils/convertImageArray";
import { MenuItem } from '@mui/joy';
import InputLabel from '@mui/material/InputLabel';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import RadioGroup from '@mui/joy/RadioGroup';
import Radio from '@mui/joy/Radio';
import {GetPostBelongToOwner} from '../../services/post.service'
import FormControlLabel from '@mui/material/FormControlLabel';
import Alert from '@mui/joy/Alert';
import {MakeExchange} from '../../services/booking.service'
import '../../styles/exchange.css';

interface RootState {
    auth: {
        isAuthenticated: boolean;
        user: any;
    };
}

interface Unit {
    _id: string;
    name: string;
    details: string;
}

interface Resort {
    _id: string;
    name: string;
    location: string;
    description: string;
    facilities: string[];
    nearby_attractions: string[];
    policies: string[];
    image_urls: string[];
    units: Unit[];
    start_date: Date;
    end_date: Date;
    numberOfNights: number;
    pricePerNight: string;
}

export default function Exchange() {
    const isAuthenticated = useSelector((state: RootState) => state?.auth?.isAuthenticated);
    const user = useSelector((state: RootState) => state?.auth?.user);
    const [post, setPost] = React.useState<any>([]);
    const [myPosts, setMyPosts] = React.useState<any>([]);
    const navigate = useNavigate();
    let {postId} = useParams();
    const [uploading, setUploading] = React.useState<boolean>(false);
    const [open, setOpen] = React.useState(false);


    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setUploading(true);
    
        const formData = new FormData(e.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
    
        const address = {
            fullName: formJson?.fullname,
            email: formJson?.email,
            phone: formJson?.phone,
            street: formJson?.street,
            city: formJson?.city,
            province: formJson?.province,
            postalCode: formJson?.zipCode,
            country: formJson?.country,                
        };
    
        try {
            const makeExchange = await MakeExchange(postId, formData);
            if (makeExchange) {
                navigate(`/timeshare/${postId}/reservation/${makeExchange._id}/confirm`);
            }
        } catch (error) {
            console.error("Error making exchange request:", error);
            // Handle error appropriately, e.g., show error message to the user
        } finally {
            setUploading(false);
        }
    }
    
    
    const handleButtonClick = () => {
        // Lấy tên của MyTimeshare từ dữ liệu đã có, ví dụ: post.resortId.name
        // const timeshareName = post?.resortId?.name || '';
        // Cập nhật state myTimeshareName với tên của MyTimeshare
        // setPost(timeshareName);
        setOpen(true)
    };
    const [selectedResortIndex, setSelectedResortIndex] = React.useState<any>([]);

    const handleResortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedResortIndex(Number(event.target.value));
    };
    const handleButtonSubmit = () => {
        if (myPosts && myPosts.length > 0) {
            const selectedResortId = myPosts[selectedResortIndex]?.resortId.name;
            if (selectedResortId) {
                console.log("Selected Resort ID:", selectedResortId);
                setOpen(false);
            } else {
                console.error("Resort ID chưa được chọn.");
            }
        } else {
            console.error("Không tìm thấy bài đăng.");
        }
    };
    

    async function GetMyPosts() {
        const postsData = await GetPostBelongToOwner(user._id);
        console.log(postsData)
        if (postsData && postsData.length > 0) {
            console.log(postsData);
            setMyPosts(postsData)
        }
    }

    React.useEffect(() => {
        if (!isAuthenticated) {
            
        }else {
            GetMyPosts();
            if (postId) {
                Load();
            }
        }
    }, [user, isAuthenticated, postId]);

    async function Load() {
        if (postId) {
            const postData = await GetPostById(postId);
            if (postData) {
                setPost(postData)
            }
        }
    }

    function formatDate(dateString?: string): string {
        if (!dateString) return '';
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    

    return (
        <>
            <Header/>
            <CssVarsProvider disableTransitionOnChange>
                <CssBaseline/>
                {/*<NavBar />*/}
                <Grid container spacing={0}
                    sx={{flexGrow: 1, width: 1, px: 10, mt: 2, gap: 1,}}>
                    <Grid container sx={{p: 1, height: 'fit-content'}}>
                        <Grid xs={12} md={4} lg={4}>
                            <Stack sx={{
                                borderRadius: '8px',
                                width: 1,
                                p: 1,
                                display: 'flex',
                                justifyContent: 'center',
                                boxShadow: '0 0 4px gray'
                            }} direction="column" spacing={0}
                                justifyContent="center">
                            <React.Fragment>
                            <Button variant="outlined" color="neutral" onClick={handleButtonClick}>
                            {myPosts[selectedResortIndex]?.resortId.name || 'Select Resort'}
                            </Button>
                
                <Modal open={open} onClose={() => setOpen(false)} >
                
                <ModalDialog
                    aria-labelledby="nested-modal-title"
                    aria-describedby="nested-modal-description"
                    sx={(theme) => ({
                        [theme.breakpoints.only('xs')]: {
                            top: 'unset',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            borderRadius: 0,
                            transform: 'none',
                            maxWidth: 'unset',
                        },
                    })}
                >
                    <Typography id="nested-modal-title" level="h2">
                        Are you absolutely sure?
                    </Typography>
                    <Typography id="nested-modal-description" textColor="text.tertiary">
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </Typography>
                    <FormControl>
                        <FormLabel>Sizes</FormLabel>

                        <RadioGroup
                        defaultValue=""
                        name="radio-buttons-group"
                        onChange={handleResortChange}
                    >
                        {myPosts.map((post: any, index: number) => (
                            
                            <>
                            <FormControlLabel
                                key={post.resortId.name}
                                value={String(index)}
                                control={<Radio size="sm" />}
                                label={post.resortId.name}
                            />
                            <Typography>Unit: {post.unitId.name}</Typography>
                            <Typography>Price: {post.price}</Typography>

                            </>
                        ))}
                    </RadioGroup>
                    </FormControl>
                    <Button variant="solid" color="primary" type='submit' onClick={handleButtonSubmit}>
                        Continue
                    </Button>
                </ModalDialog>
            </Modal>
        
            </React.Fragment>
                                {/*{post && <ImageGallery items={convertImageArray([...post?.images, ...post?.resortId?.image_urls])} showPlayButton={false} />}*/}
                                {/*<ImageGallery items={post?.resortId?.image_urls} />;*/}
                                
                                {
                        selectedResortIndex !== null && (
                            <>
                                <img src={myPosts[selectedResortIndex]?.resortId?.image_urls}/>
                                <Typography fontWeight={600} fontSize={28}>
                                    {myPosts[selectedResortIndex]?.resortId?.name}
                                </Typography>
                                
                                <Typography fontWeight={400} fontSize={18}>
                                    Owner: {myPosts[selectedResortIndex]?.current_owner?.username}
                                </Typography>
                                <Box sx={{width: 1, display: 'flex', justifyContent: 'space-between', mt: 2}}>
                                    <Typography fontWeight={500} fontSize={20}>
                                        Unit:
                                    </Typography>
                                    <Typography fontWeight={400} fontSize={20}>
                                        {myPosts[selectedResortIndex]?.unitId?.name}
                                    </Typography>
                                </Box>
                                <Box sx={{width: 1, display: 'flex', justifyContent: 'space-between'}}>
                                    <Typography fontWeight={500} fontSize={20}>
                                        Stay:
                                    </Typography>
                                    <Typography fontWeight={400} fontSize={20}>
                                        {myPosts[selectedResortIndex]?.numberOfNights} night
                                    </Typography>
                                </Box>
                                <Box sx={{width: 1, display: 'flex', justifyContent: 'space-between',}}>
                                    <Typography fontWeight={500} fontSize={20}>
                                        Check-in:
                                    </Typography>
                                    <Typography fontWeight={400} fontSize={20}>
                                        {formatDate(myPosts[selectedResortIndex]?.start_date)}
                                    </Typography>
                                </Box>
                                <Box sx={{width: 1, display: 'flex', justifyContent: 'space-between'}}>
                                    <Typography fontWeight={500} fontSize={20}>
                                        Check-out:
                                    </Typography>
                                    <Typography fontWeight={400} fontSize={20}>
                                        {formatDate(myPosts[selectedResortIndex]?.end_date)}
                                    </Typography>
                                </Box>
                                <Divider sx={{mt: 1, mb: 1}}/>
                                <Box sx={{width: 1, display: 'flex', justifyContent: 'space-between'}}>
                                    <Typography fontWeight={500} fontSize={20}>
                                        Price/night:
                                    </Typography>
                                    <Typography fontWeight={400} fontSize={20}>
                                        ${myPosts[selectedResortIndex]?.pricePerNight}
                                    </Typography>
                                </Box>
                                <Box sx={{width: 1, display: 'flex', justifyContent: 'space-between'}}>
                                    <Typography fontWeight={500} fontSize={20}>
                                        Total:
                                    </Typography>
                                    <Typography fontWeight={600} fontSize={20}>
                                        ${myPosts[selectedResortIndex]?.price}
                                    </Typography>
                                </Box>
                            </>
                        )
                    }

                            </Stack>
                        </Grid>
                        <Grid xs={12} md={4} lg={4} sx={{
                            width: 1,
                            p: 1,
                            fontSize: '100',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Stack sx={{
                                p: 1,
                                fontSize: 'large',
                                color: '#e87014',
                                textAlign: 'center',
                                display: 'flex',
                                justifyContent: 'center',
                                height: 'fit-content',
                                flexDirection: 'column'
                            }} direction="column">
                                <Typography fontSize={20} fontWeight={600}>
                                    Exchange
                                </Typography>
                                <SwapHorizIcon sx={{fontSize: 120, color: '#e87014'}}/>
                            </Stack>

                        </Grid>
                        <Grid xs={12} md={4} lg={4}>
                            <Stack sx={{
                                borderRadius: '8px',
                                width: 1,
                                p: 1,
                                display: 'flex',
                                justifyContent: 'center',
                                boxShadow: '0 0 4px gray'
                            }} direction="column" spacing={0}
                                justifyContent="center">
                                <Box sx={{ width: '100%' }}>
                                <Alert variant="outlined">{post?.resortId?.name}</Alert>
                                </Box>
                                <img src={post?.resortId?.image_urls}/>
                                <Typography fontWeight={600} fontSize={28}>
                                    {post?.resortId?.name}
                                </Typography>
                                <Typography fontWeight={400} fontSize={18}>
                                    Owner: {post?.current_owner?.username}
                                </Typography>
                                <Box sx={{width: 1, display: 'flex', justifyContent: 'space-between', mt: 2}}>
                                    <Typography fontWeight={500} fontSize={20}>
                                        Unit:
                                    </Typography>
                                    <Typography fontWeight={400} fontSize={20}>
                                        {post?.unitId?.name}
                                    </Typography>
                                </Box>
                                <Box sx={{width: 1, display: 'flex', justifyContent: 'space-between'}}>
                                    <Typography fontWeight={500} fontSize={20}>
                                        Stay:
                                    </Typography>
                                    <Typography fontWeight={400} fontSize={20}>
                                        {post?.numberOfNights} night
                                    </Typography>
                                </Box>
                                <Box sx={{width: 1, display: 'flex', justifyContent: 'space-between',}}>
                                    <Typography fontWeight={500} fontSize={20}>
                                        Check-in:
                                    </Typography>
                                    <Typography fontWeight={400} fontSize={20}>
                                        {formatDate(post?.start_date)}
                                    </Typography>
                                </Box>
                                <Box sx={{width: 1, display: 'flex', justifyContent: 'space-between'}}>
                                    <Typography fontWeight={500} fontSize={20}>
                                        Check-out:
                                    </Typography>
                                    <Typography fontWeight={400} fontSize={20}>
                                        {formatDate(post?.end_date)}
                                    </Typography>
                                </Box>
                                <Divider sx={{mt: 1, mb: 1}}/>
                                <Box sx={{width: 1, display: 'flex', justifyContent: 'space-between'}}>
                                    <Typography fontWeight={500} fontSize={20}>
                                        Price/night:
                                    </Typography>
                                    <Typography fontWeight={400} fontSize={20}>
                                        ${post?.pricePerNight}
                                    </Typography>
                                </Box>
                                <Box sx={{width: 1, display: 'flex', justifyContent: 'space-between'}}>
                                    <Typography fontWeight={500} fontSize={20}>
                                        Total:
                                    </Typography>
                                    <Typography fontWeight={600} fontSize={20}>
                                        ${post?.price}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Grid xs={12} md={8} sx={{p: 1, boxShadow: '0 0 0px gray'}}>
                        <Typography fontWeight={700} fontSize={26}>
                            Request to exchange
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Box sx={{
                                borderRadius: '8px',
                                width: 1,
                                display: 'flex',
                                justifyContent: 'space-between',
                                mt: 2,
                                p: 1,
                                boxShadow: '0 0 4px gray',
                            }}>
                                <Stack direction="column" spacing={4} sx={{width: 1, mt: 1}}>
                                    {/* <FormControl sx={{ display: 'inline', gap: 1, width: 0.15 }}>
                                    <FormLabel>Guest number</FormLabel>
                                    <Select defaultValue="1">
                                        <Option value="1">1</Option>
                                        <Option value="2">2</Option>
                                        <Option value="3">3</Option>
                                        <Option value="4">4</Option>
                                        <Option value="5">5</Option>
                                        <Option value="6">6</Option>
                                    </Select>
                                </FormControl> */}

                                    {/* ////////// */}
                                    <FormControl sx={{display: 'inline', gap: 1, width: 0.5}}>
                                        <FormLabel>Full name</FormLabel>
                                        <Input
                                            type="text"
                                            size="md"
                                            placeholder="Full name"
                                            name="fullName"
                                            sx={{}}
                                        />
                                        <FormLabel sx={{mt: 2}}>Email</FormLabel>
                                        <Input
                                            size="md"
                                            type="email"
                                            startDecorator={<EmailRoundedIcon/>}
                                            placeholder="email"
                                            name="email"
                                            sx={{flexGrow: 1}}
                                        />
                                        <FormLabel sx={{mt: 2}}>Phone</FormLabel>
                                        <Input
                                            size="md"
                                            placeholder="Phone"
                                            name="phone"
                                            sx={{flexGrow: 1}}
                                        />
                                        <FormLabel sx={{mt: 2}}>Country</FormLabel>
                                        <CountrySelector/>
                                    </FormControl>
                                    <FormControl sx={{display: 'inline', gap: 1, width: 1}}>
                                        <FormLabel sx={{}}>Street</FormLabel>
                                        <Input
                                            size="md"
                                            placeholder="Street"
                                            name="street"
                                            sx={{flexGrow: 1}}
                                        />
                                    </FormControl>
                                    <FormControl sx={{display: 'inline-flex', gap: 1, width: 1}}>
                                        <Grid container spacing={0} sx={{
                                            flexGrow: 1,
                                            width: 1,
                                            gap: 1,
                                            flexWrap: {xs: 'wrap', md: 'nowrap',}
                                        }}>
                                            <Grid xs={12} md={4}>
                                                <FormLabel sx={{}}>City</FormLabel>
                                                <Input
                                                    size="md"
                                                    placeholder="City"
                                                    name="city"
                                                    sx={{flexGrow: 1}}
                                                />
                                            </Grid>
                                            <Grid xs={12} md={4}>
                                                <FormLabel sx={{}}>Province</FormLabel>
                                                <Input
                                                    size="md"
                                                    placeholder="Province"
                                                    name="province"
                                                    sx={{flexGrow: 1}}
                                                />
                                            </Grid>
                                            <Grid xs={12} md={4}>
                                                <FormLabel sx={{}}>ZipCode</FormLabel>
                                                <Input
                                                    size="md"
                                                    placeholder="Zip code"
                                                    name="zipCode"
                                                    sx={{flexGrow: 1}}
                                                />
                                            </Grid>

                                        </Grid>

                                        <FormControl sx={{display: 'none'}}>
                                            <Input type="hidden" name="myTimeshareId" value={myPosts[selectedResortIndex]?._id}/>

                                            <Input type="hidden" name="amount" value={post?.price}/>
                                        </FormControl>
                                        <FormControl sx={{display: 'none'}}>
                                            <Input type="hidden" name="userId" value={user?._id}/>
                                        </FormControl>
                                        <FormControl sx={{display: 'none'}}>
                                            <Input type="hidden" name="postId" value={postId}/>
                                        </FormControl>
                                        <FormControl sx={{display: 'none'}}>
                                            <Input type="hidden" name="reservationDate"
                                                value={new Date().toLocaleString() + ""}/>
                                        </FormControl>
                                    </FormControl>

                                </Stack>
                            </Box>
                            <CardOverflow sx={{
                                borderTop: '1px solid',
                                borderColor: 'divider',
                                mt: 2,
                                width: 1,
                                display: 'flex',
                                justifyContent: 'flex-end'
                            }}>
                                <CardActions sx={{alignSelf: 'flex-end', pt: 2, gap: 2}}>
                                    <Button size="sm" variant="outlined" color="neutral">
                                        Cancel
                                    </Button>
                                    {uploading ? (<Button loading size="sm" variant="solid" type='submit'>
                                        Save
                                    </Button>) : <Button size="sm" variant="solid" type='submit'>
                                        Exchange request
                                    </Button>}
                                </CardActions>
                            </CardOverflow>
                        </form>
                    </Grid>

                </Grid>
            </CssVarsProvider>
            <Footer/>
        </>
    );

}