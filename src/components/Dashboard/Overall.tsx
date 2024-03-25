import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import { useSelector } from 'react-redux';
import { UpdateUser } from '../../services/auth.service';
import { NavLink, Route, Routes } from "react-router-dom";
import OrderList from "../Order/RentalOrders";
import { Grid, Stack, Typography } from '@mui/joy';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import PaidIcon from '@mui/icons-material/Paid';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import ReceiveTransactionList from './ReceiveTransactionList';
import { GetFinancialSummary, GetTransactionHistory } from '../../services/dashboard.service';
import { useSnackbar } from 'notistack';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import Avatar from '@mui/joy/Avatar';
import { convertDate } from '../../utils/date';

interface RootState {
    auth: {
        isAuthenticated: boolean;
        user: any;
    };
}

export default function Overall() {
    const user = useSelector((state: RootState) => state?.auth?.user);
    const isAuthenticated = useSelector((state: RootState) => state?.auth?.isAuthenticated);
    const [financialSummary, setFinancialSummary] = React.useState<any>({});
    const [transactionHistory, setTransactionHistory] = React.useState<any>([]);
    const { enqueueSnackbar } = useSnackbar();
    const [isLoading, setIsLoading] = React.useState(false);
    const navigate = useNavigate();
    const [isLoadingFinancialSummary, LoadingListFinancialSummary] = React.useTransition();
    const [isLoadingTransactionHistory, LoadingTransactionHistory] = React.useTransition();
    async function Load() {
        try {
            // Fetch rent requests based on timeshareId
            const fsummary = await GetFinancialSummary(user?._id);
            const thistory = await GetTransactionHistory(user?._id);
            if (fsummary) {
                LoadingListFinancialSummary(() => {
                    setFinancialSummary(fsummary);
                })
            }
            if (thistory) {
                LoadingTransactionHistory(() => {
                    setTransactionHistory(thistory);
                })
            }

        } catch (error: any) {
            console.error('Error fetching rent requests:', error.message);
        }
    }
    console.log(transactionHistory)
    React.useEffect(() => {
        Load()
    }, [user?._id]);
    return (
        <Grid container spacing={2} sx={{ flexGrow: 1, mx: { xs: 1, md: 5 }, mt: 2 }}>
            {/* Left Column */}
            <Grid xs={12} md={8}>
                {/* Income, Outcome, Total View, Deposit */}
                <Grid container md={12}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                    gap={2}
                    flexWrap={'nowrap'}
                    sx={{ flexGrow: 1 }}>
                    <Grid xs={12} md={4} sx={{
                        boxShadow: 'md', display: 'flex', justifyContent: 'center', gap: 1, '&:hover': {
                            cursor: 'pointer',
                            boxShadow: 'lg',
                            opacity: 0.8,
                            "& $addIcon": {
                                color: "purple"
                            }
                        }
                    }}>
                        <AddBusinessIcon color="primary" sx={{ fontSize: 54 }} />
                        <Stack sx={{ display: 'flex', textAlign: 'left' }}>
                            <Typography fontSize={24} sx={{ textAlign: 'left' }}>
                                <b>${financialSummary?.totalReceiveAmount}</b>
                            </Typography>
                            <Typography sx={{ color: '#424242' }}>
                                <p>Total income</p>
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid xs={12} md={4} sx={{
                        boxShadow: 'md', display: 'flex', justifyContent: 'center', gap: 1, '&:hover': {
                            cursor: 'pointer',
                            boxShadow: 'lg',
                            opacity: 0.8,
                            "& $addIcon": {
                                color: "purple"
                            }
                        }
                    }}>
                        <PaidIcon color="warning" sx={{ fontSize: 54 }} />
                        <Stack sx={{ display: 'flex', textAlign: 'left' }}>
                            <Typography fontSize={24} sx={{ textAlign: 'left' }}>
                                <b>${financialSummary?.totalSpendAmount}</b>
                            </Typography>
                            <Typography sx={{ color: '#424242' }}>
                                <p>Total spend</p>
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid xs={12} md={4} sx={{
                        boxShadow: 'md', display: 'flex', justifyContent: 'center', gap: 1, '&:hover': {
                            cursor: 'pointer',
                            boxShadow: 'lg',
                            opacity: 0.8,
                            "& $addIcon": {
                                color: "purple"
                            }
                        }
                    }}>
                        <LocalAtmIcon color="success" sx={{ fontSize: 54 }} />
                        <Stack sx={{ display: 'flex', textAlign: 'left' }}>
                            <Typography fontSize={24} sx={{ textAlign: 'left' }}>
                                <b>${financialSummary?.availableForWidthdrawAmount}</b>
                            </Typography>
                            <Typography sx={{ color: '#424242' }}>
                                <p>Available for widthdraw</p>
                            </Typography>
                        </Stack>
                    </Grid>

                </Grid>
                <Grid container md={12}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                    gap={2}
                    flexWrap={'nowrap'}
                    sx={{ flexGrow: 1, mt: 2 }}>
                    <b>Received transaction list</b>
                </Grid>
                <ReceiveTransactionList />
                {/* List of Transactions */}
                {/* <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                    List transactions
                </Grid> */}
            </Grid>

            {/* Right Column */}
            <Grid xs={12} md={4}>
                {/* Balance */}
                <Grid xs={12} sx={{ boxShadow: 'sm' }}>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        <Avatar size="lg"
                            src={user?.profilePicture}>{user?.firstname?.charAt(0)}</Avatar>
                        <div>
                            <Typography
                                level="body-lg">Balance: ${financialSummary?.availableForWidthdrawAmount}</Typography>
                        </div>
                    </Box>
                </Grid>
                {/* Transaction History */}
                <Grid xs={12} sx={{ mt: 5 }}>
                    Transaction history
                    <Stack sx={{ mt: 1, pt: 1, pb: 1, gap: 2 }}>
                        {transactionHistory.map((transaction: any, index: number) => (
                            <Box key={index} sx={{
                                display: 'flex', gap: 5, boxShadow: 'sm', borderRadius: '5px',
                                p: '5px',
                                backgroundColor: transaction?.type === 'withdraw' ? '#edfff5' : '#FDDCE1',
                            }}>
                                <div>
                                    <Typography level="body-lg">Date: {convertDate(transaction.date)}</Typography>
                                    <Typography level="body-lg">{transaction?.type === 'deposit' ? 'Deposit' : 'Withdraw'}</Typography>
                                </div>
                                <Typography level="body-lg">{transaction?.type === 'withdraw' ? '+' : '-'}{Math.abs(transaction?.amount)}$</Typography>
                            </Box>
                        ))}
                    </Stack>
                </Grid>
            </Grid>
        </Grid>

    );
}
