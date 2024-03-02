import * as React from 'react';
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
import { Grid, styled } from '@mui/joy';
import { useSelector } from 'react-redux';
import { UpdateUser } from '../../services/auth.service';
import { NavLink, Route, Routes } from "react-router-dom";
import OrderList from "../Order/OrderList";
import UserSetting from "./UserSetting";
import MyBilling from "./MyBilling";
import { SnackbarProvider, SnackbarOrigin } from 'notistack';

interface RootState {
  auth: {
    isAuthenticated: boolean;
    user: any;
  };
}
const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export default function MyProfile() {
  const user = useSelector((state: RootState) => state?.auth?.user);
  const isAuthenticated = useSelector((state: RootState) => state?.auth?.isAuthenticated);
  const [selectedImage, setSelectedImage] = React.useState<any>(null);
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState({
    firstname: user?.firstname || '',
    lastname: user?.lastname || '',
    email: user?.email || '',
    phone: user?.phone || '',
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
      })
      if (user?.profilePicture) {
        setSelectedImage(user?.profilePicture)
      }
    }
    setIsLoaded(true);
  }, [user, isAuthenticated === true])
  type AnchorOrigin = SnackbarOrigin;
  const customAnchorOrigin: AnchorOrigin = {
    vertical: 'bottom',
    horizontal: 'right',
  };
  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={customAnchorOrigin}>
      <Grid container>
        <Grid xs={12}>
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
                    My profile
                  </Typography>
                </Breadcrumbs>
                <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
                  My profile
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
                  <NavLink to="/me/my-profile/" style={{ textDecoration: 'none' }}>
                    <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={0}>
                      Settings
                    </Tab>
                  </NavLink>
                  <NavLink to="/me/my-profile/billing" style={{ textDecoration: 'none' }}>
                    <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={3}>
                      Billing
                    </Tab>
                  </NavLink>
                </TabList>
              </Tabs>
            </Box>
          </Box>
          <Routes>
            <Route>
              <Route path="/" element={<UserSetting />} />
              <Route path="/billing" element={<MyBilling />} />
            </Route>
          </Routes>
        </Grid>
      </Grid>
    </SnackbarProvider>
  );
}
