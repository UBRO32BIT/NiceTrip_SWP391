import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import NavBar from '../../components/Rental/NavBar';
import Grid from '@mui/joy/Grid';
import { Button, Typography } from '@mui/joy';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface Unit {
    _id: string;
    name: string;
    details: string;
}

export default function VNPay() {
    const { postId, reservationId } = useParams();
    const queryParams = new URLSearchParams(window.location.search);
    const vnp_Amount = queryParams.get('vnp_Amount');
    const vnp_OrderInfo = queryParams.get('vnp_OrderInfo');
    const vnp_ResponseCode = queryParams.get('vnp_ResponseCode');

    return (
        <CssVarsProvider disableTransitionOnChange>
            <CssBaseline />
            <NavBar />
            <Grid container spacing={0} sx={{ flexGrow: 1, width: 1, pr: 4, pl: 4, mt: 2, gap: 1, flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
                <Box sx={{ width: 0.5, display: 'flex', justifyContent: 'space-between', mt: 2, p: 1, boxShadow: '0 0 4px gray' }}>
                    <Stack sx={{ width: 1, display: 'flex', justifyContent: 'center' }} direction="column" spacing={0} justifyContent="center">
                        {vnp_ResponseCode === '00' ? (
                            <Typography fontWeight={400} color={'success'} fontSize={30}>
                                Payment Success
                            </Typography>
                        ) : (
                            <Typography fontWeight={400} color={'danger'} fontSize={30}>
                                Payment Failed
                            </Typography>
                        )}
                        <Typography fontWeight={400} fontSize={18}>
                            Order Info: {vnp_OrderInfo}
                        </Typography>
                        <Typography fontWeight={400} fontSize={18}>
                            Amount: {vnp_Amount} VND
                        </Typography>
                        {vnp_ResponseCode === '00' ? (
                            <Typography fontWeight={400} color={'primary'} fontSize={18}>
                                Congratulations, you have become NiceTrip Basic Member
                            </Typography>
                        ) : (
                            <Typography fontWeight={400} color={'danger'} fontSize={18}>
                                Pay now to become a member
                            </Typography>
                        )}
                        {vnp_ResponseCode !== '00' && (
                            <Link to="/me/my-profile/billing" style={{ textDecoration: 'none' }}>
                                <Button color="primary">
                                    Pay Now
                                </Button>
                            </Link>
                        )}
                        {vnp_ResponseCode === '00' && (
                            <Link to="/me/my-posting/upload-new-post" style={{ textDecoration: 'none' }}>
                                <Button color="primary">
                                    Upload New Post
                                </Button>
                            </Link>
                        )}
                    </Stack>
                </Box>
            </Grid>
        </CssVarsProvider>
    );
}
