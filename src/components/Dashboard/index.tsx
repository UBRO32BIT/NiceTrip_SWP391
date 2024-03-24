import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { ChangeEvent } from 'react';
import { styled } from '@mui/joy';
import { useSelector } from 'react-redux';
import { UpdateUser } from '../../services/auth.service';
import {NavLink, Route, Routes} from "react-router-dom";
import OrderList from "../Order/RentalOrders";
import Overall from './Overall';

interface RootState {
  auth: {
    isAuthenticated: boolean;
    user: any;
  };
}
export default function Dashboard() {
  const user = useSelector((state: RootState) => state?.auth?.user);
  const isAuthenticated = useSelector((state: RootState) => state?.auth?.isAuthenticated);
  const [selectedImage, setSelectedImage] = React.useState<any>(null);
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState({
    firstname: user?.firstname || '',
    lastname: user?.lastname || '',
    email: user?.email || '',
    phone: user?.phone || '',
    servicePack: user?.servicePack || '',
  });

  const [uploading, setUploading] = React.useState<boolean>();
  React.useEffect(() => {
    setIsLoaded(false);
    if (user) {
      setFormData({
        firstname: user?.firstname,
        lastname: user?.lastname,
        email: user?.email,
        phone: user?.phone,
        servicePack: user?.servicePack
      })
      if (user?.profilePicture) {
        setSelectedImage(user?.profilePicture)
      }
    }
    setIsLoaded(true);
  }, [user, isAuthenticated === true])
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleUpdateUser = async (e: any) => {
    setUploading(true)
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    if (selectedImage instanceof File) {
      form.append('profilePicture', selectedImage);
    }
    const result = await UpdateUser(user._id, form)
    if (result) {
      setUploading(false)
    }
    window.location.reload();
  }
  return (
    <Box sx={{ flex: 1, width: '100%' }}>
      <Box
        sx={{
          position: 'sticky',
          top: { sm: -100, md: -110 },
          bgcolor: 'background.body',
          zIndex: 9995,
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
              My dashboard
            </Typography>
          </Breadcrumbs>
          <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
            My dashboard
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
            <NavLink to="/me/dashboard/" style={{ textDecoration: 'none' }}>
            <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={0}>
              Overall
            </Tab>
            </NavLink>
          
          </TabList>
        </Tabs>
      </Box>
      <Routes>
        <Route>
          <Route path="/" element={<Overall />} />
        </Route>
      </Routes>
    </Box>
  );
}
