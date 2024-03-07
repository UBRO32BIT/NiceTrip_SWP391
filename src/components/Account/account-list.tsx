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
import { Routes, Route, Navigate, useNavigate, NavLink, Link } from "react-router-dom";
import AspectRatio from '@mui/joy/AspectRatio';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import Chip from '@mui/joy/Chip';
import JsBarcode from 'jsbarcode';
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { GetAllAccount } from '../../services/admin.services';
var { createCanvas } = require("canvas");
// import Canvas
interface RootState {
    auth: {
        isAuthenticated: boolean;
        user: any;
    };
}

export default function AccountList() {
    const user = useSelector((state: RootState) => state?.auth?.user);
    const [accounts, setAccounts] = React.useState([]);
    const navigate = useNavigate()

    function formatDate(dateString?: string): string {
        if (!dateString) return '';
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }
    async function GetAllAccounts(){
        const allAccounts = await GetAllAccount();
        if(allAccounts && allAccounts.length > 0){
            console.log("Log all account:" + allAccounts);
            setAccounts(allAccounts);
        }
    }

    var canvas = createCanvas(40, 40, 'svg');

    console.log(JsBarcode(canvas, "Hello"));
    React.useEffect(() => {
        
    }, [user])
    return (
        <Grid container spacing={2} sx={{ flexGrow: 1, mx: { xs: 2, md: 5 }, mt: 2, }}>
            <Grid
                md={12} xs={12}
                sx={{
                    display: 'flex',
                    gap: 3,
                    // p: 0,
                    mb: 2
                }}>
            </Grid>
                {accounts.length > 0 && accounts.map((item: any) => {
                    return (<Grid xs={12} md={6} lg={4} >
                        {item?.username}
                    </Grid>)
                })}
        </Grid>

    )
}
