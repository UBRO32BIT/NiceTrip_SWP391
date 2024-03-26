import * as React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import  { tabClasses } from '@mui/joy/Tab';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { Routes, Route, Navigate, useNavigate, NavLink } from "react-router-dom";
import RentalList from './request-list';
import ExchangeList from './exchange-list';
import { convertDateTime } from '../../utils/date';
import { useEffect, useState } from "react";
import axios from "axios";
import Tab from '@mui/joy/Tab';

interface RootState {
    auth: {
        isAuthenticated: boolean;
        user: any;
    };
}
export default function TransactionManagement() {

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
                            Transaction
                        </Typography>
                    </Breadcrumbs>

                    <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
                    Transaction list
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
                marginBottom:'16px',
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
            <NavLink to="/admin/transaction-list" style={{ textDecoration: 'none' }}>
            <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={0}>
              Rental
            </Tab>
            </NavLink>
            <NavLink to="/admin/transaction-list/exchange" style={{ textDecoration: 'none' }}>
              <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={3}>
                Exchange
              </Tab>
            </NavLink>
          </TabList>
        </Tabs>

                <Routes>
                    <Route>
                    <Route path="/" element={<RentalList />} />
                    <Route path="/exchange" element={<ExchangeList />} />
                    </Route>
                </Routes>
            </Box>
        
        </Box>
        
    );
}
