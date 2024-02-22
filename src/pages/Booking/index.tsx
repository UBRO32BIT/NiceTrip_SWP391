import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import NavBar from '../../components/Rental/NavBar';
import { GetPostById } from '../../services/post.service';
import Grid from '@mui/joy/Grid';
import { Button, Typography } from '@mui/joy';
import { Routes, Route, useParams } from 'react-router-dom';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import { shadows } from '@mui/system';
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
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { MakeReservation } from '../../services/booking.service';

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

export default function Booking() {
    const user = useSelector((state: RootState) => state?.auth?.user);
    const [post, setPost] = React.useState<any>([]);
    const navigate = useNavigate()
    let { postId } = useParams();
    const [uploading, setUploading] = React.useState<boolean>(false);
    async function handleSubmit(e: any) {
        setUploading(true)
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const formJson = Object.fromEntries((formData as any).entries());
        const address = {
            street: formJson?.street,
            city: formJson?.city,
            province: formJson?.province,
            postalCode: formJson?.zipCode,
            country: formJson?.country,
        };
        const created = await MakeReservation(formData);
        if(created) {
            console.log(created);
            window.location.replace(created);
            setUploading(false)
        }
        console.log(formJson)
    }
    React.useEffect(() => {
        Load()
    }, [])
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
        <CssVarsProvider disableTransitionOnChange>
            <CssBaseline />
            <NavBar />
            <Grid container spacing={0} sx={{ flexGrow: 1, width: 1, pr: 4, pl: 4, mt: 2, gap: 1, flexWrap: { xs: 'wrap', md: 'nowrap', } }}>
                <Grid xs={12} md={8} sx={{ p: 1, boxShadow: '0 0 0px gray' }}>
                    <Typography fontWeight={700} fontSize={26}>
                        Booking request
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Box sx={{ width: 1, display: 'flex', justifyContent: 'space-between', mt: 2, p: 1, boxShadow: '0 0 4px gray', }}>
                            <Stack direction="column" spacing={4} sx={{ width: 1, mt: 1 }}>
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
                                <FormControl sx={{ display: 'inline', gap: 1, width: 0.5 }}>
                                    <FormLabel>Full name</FormLabel>
                                    <Input
                                        type="text"
                                        size="md"
                                        placeholder="Full name"
                                        name="fullName"
                                        sx={{}}
                                    />
                                    <FormLabel sx={{ mt: 2 }}>Email</FormLabel>
                                    <Input
                                        size="md"
                                        type="email"
                                        startDecorator={<EmailRoundedIcon />}
                                        placeholder="email"
                                        name="email"
                                        sx={{ flexGrow: 1 }}
                                    />
                                    <FormLabel sx={{ mt: 2 }}>Phone</FormLabel>
                                    <Input
                                        size="md"
                                        placeholder="Phone"
                                        name="phone"
                                        sx={{ flexGrow: 1 }}
                                    />
                                    <FormLabel sx={{ mt: 2 }}>Country</FormLabel>
                                    <CountrySelector />
                                </FormControl>
                                <FormControl sx={{ display: 'inline', gap: 1, width: 1 }}>
                                    <FormLabel sx={{}}>Street</FormLabel>
                                    <Input
                                        size="md"
                                        placeholder="Street"
                                        name="street"
                                        sx={{ flexGrow: 1 }}
                                    />
                                </FormControl>
                                <FormControl sx={{ display: 'inline-flex', gap: 1, width: 1 }}>
                                    <Grid container spacing={0} sx={{ flexGrow: 1, width: 1, gap: 1, flexWrap: { xs: 'wrap', md: 'nowrap', } }}>
                                        <Grid xs={12} md={4}>
                                            <FormLabel sx={{}}>City</FormLabel>
                                            <Input
                                                size="md"
                                                placeholder="Street"
                                                name="city"
                                                sx={{ flexGrow: 1 }}
                                            />
                                        </Grid>
                                        <Grid xs={12} md={4}>
                                            <FormLabel sx={{}}>Province</FormLabel>
                                            <Input
                                                size="md"
                                                placeholder="Street"
                                                name="province"
                                                sx={{ flexGrow: 1 }}
                                            />
                                        </Grid>
                                        <Grid xs={12} md={4}>
                                            <FormLabel sx={{}}>ZipCode</FormLabel>
                                            <Input
                                                size="md"
                                                placeholder="Street"
                                                name="zipCode"
                                                sx={{ flexGrow: 1 }}
                                            />
                                        </Grid>

                                    </Grid>

                                    <FormControl sx={{ display: 'none' }}>
                                    <Input type="hidden" name="amount" value={post?.price} />
                                </FormControl>
                                <FormControl sx={{ display: 'none' }}>
                                    <Input type="hidden" name="userId" value={user?._id} />
                                </FormControl>
                                <FormControl sx={{ display: 'none' }}>
                                    <Input type="hidden" name="postId" value={postId} />
                                </FormControl>
                                <FormControl sx={{ display: 'none' }}>
                                    <Input type="hidden" name="reservationDate" value={new Date().toLocaleString() + ""}/>
                                </FormControl>
                                </FormControl>

                            </Stack>
                        </Box>
                        <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider', mt: 2, width: 1, display: 'flex', justifyContent: 'flex-end' }}>
                            <CardActions sx={{ alignSelf: 'flex-end', pt: 2, gap: 2 }}>
                                <Button size="sm" variant="outlined" color="neutral">
                                    Cancel
                                </Button>
                                {uploading ? (<Button loading size="sm" variant="solid" type='submit'>
                                    Save
                                </Button>) : <Button size="sm" variant="solid" type='submit'>
                                    Booking request
                                </Button>}
                            </CardActions>
                        </CardOverflow>
                    </form>
                </Grid>
                <Grid xs={12} md={4} sx={{ p: 1, boxShadow: '0 0 4px gray', height: 'fit-content', }}>
                    <Stack sx={{ width: 1, display: 'flex', justifyContent: 'center' }} direction="column" spacing={0} justifyContent="center">
                        <img src={post?.resortId?.image_urls} />
                        <Typography fontWeight={600} fontSize={28}>
                            {post?.resortId?.name}
                        </Typography>
                        <Typography fontWeight={400} fontSize={18}>
                            Post: #{post?._id}
                        </Typography>
                        <Typography fontWeight={400} fontSize={18}>
                            Owner: {post?.current_owner?.username}
                        </Typography>
                        <Box sx={{ width: 1, display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                            <Typography fontWeight={500} fontSize={20}>
                                Unit:
                            </Typography>
                            <Typography fontWeight={400} fontSize={20}>
                                {post?.unitId?.name}
                            </Typography>
                        </Box>
                        <Box sx={{ width: 1, display: 'flex', justifyContent: 'space-between' }}>
                            <Typography fontWeight={500} fontSize={20}>
                                Stay:
                            </Typography>
                            <Typography fontWeight={400} fontSize={20}>
                                {post?.numberOfNights} night
                            </Typography>
                        </Box>
                        <Box sx={{ width: 1, display: 'flex', justifyContent: 'space-between', }}>
                            <Typography fontWeight={500} fontSize={20}>
                                Check-in:
                            </Typography>
                            <Typography fontWeight={400} fontSize={20}>
                                {formatDate(post?.start_date)}
                            </Typography>
                        </Box>
                        <Box sx={{ width: 1, display: 'flex', justifyContent: 'space-between' }}>
                            <Typography fontWeight={500} fontSize={20}>
                                Check-out:
                            </Typography>
                            <Typography fontWeight={400} fontSize={20}>
                                {formatDate(post?.end_date)}
                            </Typography>
                        </Box>
                        <Divider sx={{ mt: 1, mb: 1 }} />
                        <Box sx={{ width: 1, display: 'flex', justifyContent: 'space-between' }}>
                            <Typography fontWeight={500} fontSize={20}>
                                Price/night:
                            </Typography>
                            <Typography fontWeight={400} fontSize={20}>
                                ${post?.pricePerNight}
                            </Typography>
                        </Box>
                        <Box sx={{ width: 1, display: 'flex', justifyContent: 'space-between' }}>
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
        </CssVarsProvider>
    );
}