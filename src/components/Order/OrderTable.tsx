/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import {ColorPaletteProp} from '@mui/joy/styles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Checkbox from '@mui/joy/Checkbox';
import IconButton, {iconButtonClasses} from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
import {CreateConversation} from '../../services/chat.service'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import {DenyReservationByOwner, GetRentRequestOfTimeshare} from "../../services/booking.service";
import {Transition} from 'react-transition-group';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import {AcceptReservationByOwner} from "../../services/booking.service";
import {useSnackbar} from 'notistack';
import {useSelector} from "react-redux";
import { NavLink, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
type Order = 'asc' | 'desc';

function formatDate(dateString?: string): string {
    if (!dateString) return '';
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

interface RootState {
    auth: {
        isAuthenticated: boolean;
        user: any;
    };
}

export default function OrderTable(props: any) {
    const user = useSelector((state: RootState) => state?.auth?.user);
    const orderList = props?.orderList;
    const {enqueueSnackbar} = useSnackbar();
    const navigate = useNavigate()
    return (
        <Sheet
            className="OrderTableContainer"
            // variant="outlined"
            sx={{
                display: {xs: 'none', sm: 'initial'},
                width: '100%',
                px: 1,
                borderRadius: 'sm',
                flexShrink: 1,
                overflow: 'auto',
                minHeight: 3,
            }}
        >
            <Table
                aria-labelledby="tableTitle"
                stickyHeader
                hoverRow
                sx={{

                    
                }}
            >
                <thead>
                <tr>
                    <th style={{width: 140, padding: '12px 6px'}}>No</th>
                    <th style={{width: 140, padding: '12px 6px'}}>Reservation date</th>
                    <th style={{width: 140, padding: '12px 6px'}}>Resort</th>
                    <th style={{width: 140, padding: '12px 6px'}}>Unit</th>
                    <th style={{width: 140, padding: '12px 6px'}}>Price</th>
                    <th style={{width: 140, padding: '12px 6px'}}>Paid</th>
                    <th style={{width: 140, padding: '12px 6px'}}>Status</th>
                    <th style={{width: 100, padding: '12px 6px'}}>Action</th>
                </tr>
                </thead>
                <tbody>
                {orderList?.map((row: any, index: any) => {
                    return (
                        <tr key={row._id} style={{
                            
                        }}>
                            <td>
                                <Typography level="body-xs">{index + 1}</Typography>
                            </td>
                            <td>
                                <Typography level="body-xs">{formatDate(row?.createdAt)}</Typography>
                            </td>
                            <td>
                            <Typography level="body-xs">{row?.timeshareId?.resortId?.name}</Typography>
                                {/* Display status or Chip based on your logic */}
                               
                            </td>
                            <td>
                            <Typography level="body-xs">{row?.timeshareId?.unitId?.name}</Typography>
                            </td>
                            <td>
                            <Typography level="body-xs">${row?.timeshareId?.price}</Typography>
                            </td>
                            <td>
                            {row?.isPaid ? (
                                    <Chip variant="soft" size="sm" startDecorator={<CheckRoundedIcon/>}
                                          color="success">
                                        Paid
                                    </Chip>
                                ) : (
                                    <Chip variant="soft" size="sm" color="danger">
                                        Not paid
                                    </Chip>
                                )}
                            </td>
                            <td>
                                <Typography level="body-xs">{row?.status}</Typography>
                            </td>
                            <td>
                                <Box sx={{display: 'flex', gap: 2, alignItems: 'center'}}>
                                    <Link level="body-xs" component="button"
                                    onClick={()=>{
                                        CreateConversation(user?._id, row?._id)
                                        navigate('/me/my-messages')
                                    }}>
                                        Contact
                                    </Link>
        
                                </Box>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </Table>
        </Sheet>
    );
}