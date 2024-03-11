import * as React from 'react';
import Box from '@mui/joy/Box';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Typography from '@mui/joy/Typography';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { styled, Grid, TabPanel } from '@mui/joy';
import { useSelector } from 'react-redux';
import { UpdateUser } from '../../services/auth.service';
import { Routes, Route, Navigate, useNavigate, NavLink } from "react-router-dom";
import AccountList from './account-list';
import BannedList from './banned-account-list'
import DeletedList from './deleted-account-list'

interface RootState {
    auth: {
        isAuthenticated: boolean;
        user: any;
    };
}
export default function RequestManagement() {
    // const [imageFiles, setImageFiles] = React.useState([]);
    // const [imagePreview, setImagePreview] = React.useState([]);
    const navigate = useNavigate();

    return (
        <Box sx={{ flex: 1, width: '100%' }}>
            <Box
                sx={{
                    position: 'sticky',
                    top: { sm: -100, md: -110 },
                    bgcolor: 'background.body',
                    // zIndex: 9995,
                }}
            >
                <Box sx={{ px: { xs: 2, md: 6 } }}>
                    <Breadcrumbs
                        size="sm"
                        aria-label="breadcrumbs"
                        separator={<ChevronRightRoundedIcon />}
                        sx={{ pl: 0 }}
                    >
                        <Link
                            underline="none"
                            color="neutral"
                            href="#some-link"
                            aria-label="Home"
                        >
                            <HomeRoundedIcon />
                        </Link>
                        <Link
                            underline="hover"
                            color="neutral"
                            href="#some-link"
                            fontSize={12}
                            fontWeight={500}
                        >
                            Users
                        </Link>
                        <Typography color="primary" fontWeight={500} fontSize={12}>
                            Account list
                        </Typography>
                    </Breadcrumbs>

                    <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
                        Account list
                    </Typography>
                </Box>
                <Tabs
                    defaultValue={0}
                    sx={{
                        bgcolor: 'transparent',
                    }}
                >
                    <TabList
                        tabFlex={1}
                        size="sm"
                        sx={{
                            pl: { xs: 0, md: 4 },
                            justifyContent: 'left',
                            [`&& .${tabClasses.root}`]: {
                                fontWeight: '600',
                                flex: 'initial',
                                color: 'text.tertiary',
                                [`&.${tabClasses.selected}`]: {
                                    bgcolor: 'transparent',
                                    color: 'text.primary',
                                    '&::after': {
                                        height: '2px',
                                        bgcolor: 'primary.500',
                                    },
                                },
                            },
                        }}
                    >
                        <Tab onClick={() => navigate('/')} >All account</Tab>
                        <Tab onClick={() => navigate('/banned-list')} >Banned accounts</Tab>
                        <Tab onClick={() => navigate('/deleted-list')} >Deleted accounts</Tab>
                        <br></br>
                        <TabPanel value={0}> All account </TabPanel>
                        <TabPanel value={1}> Banned accounts </TabPanel>
                        <TabPanel value={2}> Deleted accounts </TabPanel>
                    </TabList>
                </Tabs>
                <Routes>
                    <Route>
                        <Route path="/" element={<AccountList />} />
                        <Route path="/banned-list" element={<BannedList />} />
                        <Route path="/deleted-list" element={<DeletedList />} />
                    </Route>
                </Routes>
            </Box>
        </Box>
    );
}
