import * as React from 'react';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { styled, Grid } from '@mui/joy';
import { useSelector } from 'react-redux';
import { UpdateUser } from '../../services/auth.service';
import { GetReservationOfUser, GetTripOfUser } from '../../services/booking.service';
import { Routes, Route, Navigate, useNavigate, NavLink, Link, useHref } from "react-router-dom";
import AspectRatio from '@mui/joy/AspectRatio';
import CardContent from '@mui/joy/CardContent';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Chip from '@mui/joy/Chip';
import JsBarcode from 'jsbarcode';
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

import { RestoreAccount, DeleteAccount, GetAllDeletedAccount } from '../../services/admin.services';
var { createCanvas } = require("canvas");

interface RootState {
    auth: {
        isAuthenticated: boolean;
        user: any;
    };
}

export default function AccountList() {
    const user = useSelector((state: RootState) => state?.auth?.user);
    const [accounts, setAccounts] = React.useState([]);
    const navigate = useNavigate();

    React.useEffect(() => {
        getDeletedAccounts();
    }, []);

    async function getDeletedAccounts() {
        const deletedAccounts = await GetAllDeletedAccount();
        if (deletedAccounts && deletedAccounts.length > 0) {
            console.log("Log all account:" + deletedAccounts);
            setAccounts(deletedAccounts);
        }
    }

    async function handleRestore(id: string) {
        console.log("Unban account:", id);
        RestoreAccount(id);
        window.location.reload();
    }

    async function handleForceDelete(id: string) {
        console.log("Delete account:", id);
        DeleteAccount(id);
        window.location.reload();
    }

    return (
        <>
        <Grid container spacing={2} sx={{ flexGrow: 1, mx: { xs: 2, md: 5 }, mt: 2 }}>
            {accounts.length > 0 && accounts.map((account: any, index: number) => (
                <Grid key={index} xs={12} md={6} lg={4}>
                    <Card>
                        <CardContent>
                            <Typography component="div">
                                Username: {account.username}
                            </Typography>
                            <Typography >
                                Email: {account.email}
                            </Typography>
                            <Typography>
                                Role: {account.role}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            {
                                <Button onClick={() => handleRestore(account._id)}>Unban</Button>
                            }
                            {
                                <Button onClick={() => handleForceDelete(account._id)}>Delete</Button>
                            }
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
        </>
    );
}
