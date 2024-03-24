import * as React from 'react';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { styled, Grid, Button } from '@mui/joy';
import { useSelector } from 'react-redux';
import { UpdateUser } from '../../services/auth.service';
import { GetReservationOfUser } from '../../services/booking.service';
import { Routes, Route, Navigate, useNavigate, NavLink, Link } from "react-router-dom";
import AspectRatio from '@mui/joy/AspectRatio';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import Chip from '@mui/joy/Chip';
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { Transition } from "react-transition-group";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import Box from "@mui/joy/Box";
import Avatar from "@mui/joy/Avatar";
import DialogContent from "@mui/joy/DialogContent";
import Checkbox from "@mui/joy/Checkbox";
import { PayoutThroughPayPal } from "../../services/dashboard.service";
import Input from '@mui/joy/Input';


export default function WithdrawModal(props: any) {
    const data = props?.item;
    const open = props.open;
    const setOpen = props.setOpen; // Ensure you pass setOpen as a prop
    const [paypalAddress, setPaypalAddress] = React.useState('');
    const [isPayout, setIsPayout] = React.useState(false);
    async function HandlePayout() {
        try{
            setIsPayout(true)
           const result = await PayoutThroughPayPal({rental_transaction_id: data._id, receiver: paypalAddress, amount: data.amount});
           if(result){
            console.log(result);
            window.location.reload();
           }
        }catch(err: any){
            console.log(err)
        }finally{
            setIsPayout(false)
        }
        // Call the payout function with the PayPal address
      
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
        <>
            <Transition in={open} timeout={400}>
                {(state: string) => (
                    <Modal
                        keepMounted
                        open={!['exited', 'exiting'].includes(state)}
                        onClose={() => setOpen(false)}
                        slotProps={{
                            backdrop: {
                                sx: {
                                    opacity: 0,
                                    backdropFilter: 'none',
                                    transition: `opacity 400ms, backdrop-filter 400ms`,
                                    ...(state === 'entering' || state === 'entered'
                                        ? { opacity: 1, backdropFilter: 'blur(1px)' }
                                        : {}),
                                },
                            },
                        }}
                        sx={{
                            visibility: state === 'exited' ? 'hidden' : 'visible',
                        }}
                    >
                        <ModalDialog
                            sx={{
                                opacity: 0,
                                transition: `opacity 300ms`,
                                ...(state === 'entering' || state === 'entered'
                                    ? { opacity: 1 }
                                    : {}),
                            }}
                        >
                            <DialogContent>
                                <h2>Payout Info</h2>
                            </DialogContent>
                            Your paypal address
                            <form>

                                <Input placeholder="Type in here…" variant="outlined" onChange={(event) => {
                                    setPaypalAddress(event.target.value)
                                }} />
                                <Button sx={{ mt: 2 }} loading={isPayout} onClick={HandlePayout}>Payout</Button>

                            </form>



                        </ModalDialog>

                    </Modal>
                )}
            </Transition>

        </>
    )

}