import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Sidebar from '../../components/Profile/Sidebar';
import Header from '../../components/Profile/Header';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from '../../features/auth/auth.slice';
import AccountManagement from '../../components/Account';
import PostManagement from '../../components/Post';
import RequestManagement from '../../components/Request';
import ResortManagement from '../../components/Resort';

export default function JoyOrderDashboardTemplate() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  
  React.useEffect(() => {
    console.log(isAuthenticated)
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated]);
  return (
    <>
      {isAuthenticated &&
        <CssVarsProvider disableTransitionOnChange>
          <CssBaseline />
          <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
            <Sidebar />
            <Header />
            <Box
              component="main"
              className="MainContent"
              sx={{
                pt: { xs: 'calc(12px + var(--Header-height))', md: 3 },
                pb: { xs: 2, sm: 2, md: 3 },
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                minWidth: 0,
                height: '100dvh',
                gap: 1,
                overflow: 'auto',
              }}
            >
              <Routes>
                <Route>
                    <Route path="/account-list/*" element={<AccountManagement />} />
                    <Route path="/post-list/*" element={<PostManagement />} />
                    <Route path="/request-list/*" element={<RequestManagement />} />
                    <Route path="/resort-list/*" element={<ResortManagement />} />
                </Route>
              </Routes>
            </Box>
          </Box>
        </CssVarsProvider>}
    </>
  );
}
