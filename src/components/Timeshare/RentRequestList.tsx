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

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import {GetRentRequestOfTimeshare} from "../../services/booking.service";
import {Transition} from 'react-transition-group';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import {AcceptReservationByOwner} from "../../services/booking.service";
import {useSnackbar} from 'notistack';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
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

function RowMenu(props: any) {
    const reservationData = props.reservationData; // Assuming you pass the reservation data to the component
    const [open, setOpen] = React.useState<boolean>(false);

    return (
        <>
            <Dropdown>
                <MenuButton
                    slots={{root: IconButton}}
                    slotProps={{root: {variant: 'plain', color: 'neutral', size: 'sm'}}}
                >
                    <MoreHorizRoundedIcon/>
                </MenuButton>
                <Menu size="sm" sx={{minWidth: 140}}>
                    <MenuItem onClick={() => setOpen(true)}>View detail</MenuItem>
                    <MenuItem>Edit</MenuItem>
                    <Divider/>
                    <MenuItem color="danger">Delete</MenuItem>
                </Menu>
            </Dropdown>
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
                                        ? {opacity: 1, backdropFilter: 'blur(8px)'}
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
                                    ? {opacity: 1}
                                    : {}),
                            }}
                        >
                            <DialogTitle>Reservation Details</DialogTitle>
                            <Box sx={{display: 'flex', gap: 2, alignItems: 'center'}}>
                                <Avatar size="sm"
                                        src={reservationData?.userId?.profilePicture}>{reservationData?.userId?.firstname?.charAt(0)}</Avatar>
                                <div>
                                    <Typography
                                        level="body-xs">{reservationData?.userId?.firstname} {reservationData?.userId?.lastname}</Typography>
                                    <Typography level="body-xs">{reservationData?.userId?.email}</Typography>
                                </div>
                            </Box>
                            <DialogContent>
                                <div>
                                    <strong>Address:</strong> {reservationData?.address?.street},{' '}
                                    {reservationData?.address?.city}, {reservationData?.address?.province},{' '}
                                    {reservationData?.address?.zipCode}, {reservationData?.address?.country}
                                </div>
                                <div>
                                    <strong>Amount:</strong> ${reservationData?.amount}
                                </div>
                                <div>
                                    <strong>Email:</strong> {reservationData?.email}
                                </div>
                                <div>
                                    <strong>Full Name:</strong> {reservationData?.fullName}
                                </div>
                                <div>
                                    <strong>Phone:</strong> {reservationData?.phone}
                                </div>
                                <div>
                                    <strong>Reservation Date:</strong> {formatDate(reservationData?.reservationDate)}
                                </div>
                                <div>
                                    <strong>Status:</strong> {reservationData?.status}
                                </div>
                                {/* Add more details as needed */}
                            </DialogContent>
                        </ModalDialog>
                    </Modal>
                )}
            </Transition>
        </>
    );
}


export default function RentRequestList(props: any) {
    const timeshareId = props?.timeshareId;
    const [requestList, setRequestList] = React.useState([]);
    const {enqueueSnackbar} = useSnackbar();
    const [isLoading, setIsLoading] = React.useState(false);

    async function HandleAcceptReservation(reservationId: string) {
        try {
            setIsLoading(true);
            const data = await AcceptReservationByOwner(reservationId)
            if (data) {
                enqueueSnackbar("Accept successfully", {variant: "success"});
            }
        } catch (err: any) {
            enqueueSnackbar("Accept successfully", {variant: "error"});
        } finally {
            setIsLoading(false);
        }
    }

    async function Load() {
        try {
            // Fetch rent requests based on timeshareId
            const response = await GetRentRequestOfTimeshare(timeshareId);
            if (response) {
                console.log(response)
                setRequestList(response);
            }
        } catch (error: any) {
            console.error('Error fetching rent requests:', error.message);
        }
    }

    React.useEffect(() => {
        // Load rent requests when timeshareId changes
        Load();
    }, [timeshareId, isLoading]);

    const [order, setOrder] = React.useState<Order>('desc');
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [open, setOpen] = React.useState(false);
    return (
        <Sheet
            className="OrderTableContainer"
            // variant="outlined"
            sx={{
                display: {xs: 'none', sm: 'initial'},
                width: '100%',
                px: 2,
                borderRadius: 'sm',
                flexShrink: 1,
                overflow: 'auto',
                minHeight: 1,
            }}
        >
            <Table
                aria-labelledby="tableTitle"
                stickyHeader
                hoverRow
                sx={{

                    '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
                    '--Table-headerUnderlineThickness': '1px',
                    '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
                    '--TableCell-paddingY': '4px',
                    '--TableCell-paddingX': '8px',
                    tableLayout: 'auto',
                }}
            >
                <thead>
                <tr>
                    <th style={{width: 140, padding: '12px 6px'}}>Date</th>
                    <th style={{width: 140, padding: '12px 6px'}}>Paid</th>
                    <th style={{width: 240, padding: '12px 6px'}}>Customer</th>
                    <th style={{width: 240, padding: '12px 6px'}}>Accepted</th>
                    <th style={{width: 240, padding: '12px 6px'}}>Status</th>
                    <th style={{width: 100, padding: '12px 6px'}}></th>
                </tr>
                </thead>
                <tbody>
                {requestList?.map((row: any) => {
                    return (
                        <tr key={row._id}>
                            <td>
                                <Typography level="body-xs">{formatDate(row?.reservationDate)}</Typography>
                            </td>
                            <td>
                                {/* Display status or Chip based on your logic */}
                                {row?.isPaid ? (
                                    <Chip variant="soft" size="sm" startDecorator={<CheckRoundedIcon/>} color="success">
                                        Paid
                                    </Chip>
                                ) : (
                                    <Chip variant="soft" size="sm" color="danger">
                                        Not paid
                                    </Chip>
                                )}
                            </td>
                            <td>
                                <Box sx={{display: 'flex', gap: 2, alignItems: 'center'}}>
                                    <Avatar size="sm"
                                            src={row?.userId?.profilePicture}>{row?.userId?.firstname?.charAt(0)}</Avatar>
                                    <div>
                                        <Typography
                                            level="body-xs">{row?.userId?.firstname} {row?.userId?.lastname}</Typography>
                                        <Typography level="body-xs">{row?.userId?.email}</Typography>
                                    </div>
                                </Box>
                            </td>
                            <td>
                                <Typography level="body-xs">
                                    {row?.is_accepted_by_owner ? (
                                        <span>Accepted</span>
                                    ) : (
                                        <Button variant="soft" color={'success'}
                                                onClick={() => HandleAcceptReservation(row?._id)}>
                                            Accept
                                        </Button>
                                    )}
                                </Typography>
                            </td>
                            <td>
                                <Typography level="body-xs">{row?.status}</Typography>
                            </td>
                            <td>
                                <Box sx={{display: 'flex', gap: 2, alignItems: 'center'}}>
                                    <Link level="body-xs" component="button">
                                        Contact
                                    </Link>
                                    <RowMenu reservationData={row}/>
                                </Box>
                            </td>
                        </tr>
                    );
                })}

                {/*{stableSort(rows, getComparator(order, 'id')).map((row) => (*/}
                {/*    <tr key={row.id}>*/}
                {/*        <td style={{textAlign: 'center', width: 120}}>*/}
                {/*            <Checkbox*/}
                {/*                size="sm"*/}
                {/*                checked={selected.includes(row.id)}*/}
                {/*                color={selected.includes(row.id) ? 'primary' : undefined}*/}
                {/*                onChange={(event) => {*/}
                {/*                    setSelected((ids) =>*/}
                {/*                        event.target.checked*/}
                {/*                            ? ids.concat(row.id)*/}
                {/*                            : ids.filter((itemId) => itemId !== row.id),*/}
                {/*                    );*/}
                {/*                }}*/}
                {/*                slotProps={{checkbox: {sx: {textAlign: 'left'}}}}*/}
                {/*                sx={{verticalAlign: 'text-bottom'}}*/}
                {/*            />*/}
                {/*        </td>*/}
                {/*        <td>*/}
                {/*            <Typography level="body-xs">{row.id}</Typography>*/}
                {/*        </td>*/}
                {/*        <td>*/}
                {/*            <Typography level="body-xs">{row.date}</Typography>*/}
                {/*        </td>*/}
                {/*        <td>*/}
                {/*            <Chip*/}
                {/*                variant="soft"*/}
                {/*                size="sm"*/}
                {/*                startDecorator={*/}
                {/*                    {*/}
                {/*                        Paid: <CheckRoundedIcon/>,*/}
                {/*                        Refunded: <AutorenewRoundedIcon/>,*/}
                {/*                        Cancelled: <BlockIcon/>,*/}
                {/*                    }[row.status]*/}
                {/*                }*/}
                {/*                color={*/}
                {/*                    {*/}
                {/*                        Paid: 'success',*/}
                {/*                        Refunded: 'neutral',*/}
                {/*                        Cancelled: 'danger',*/}
                {/*                    }[row.status] as ColorPaletteProp*/}
                {/*                }*/}
                {/*            >*/}
                {/*                {row.status}*/}
                {/*            </Chip>*/}
                {/*        </td>*/}
                {/*        <td>*/}
                {/*            <Box sx={{display: 'flex', gap: 2, alignItems: 'center'}}>*/}
                {/*                <Avatar size="sm">{row.customer.initial}</Avatar>*/}
                {/*                <div>*/}
                {/*                    <Typography level="body-xs">{row.customer.name}</Typography>*/}
                {/*                    <Typography level="body-xs">{row.customer.email}</Typography>*/}
                {/*                </div>*/}
                {/*            </Box>*/}
                {/*        </td>*/}
                {/*        <td>*/}
                {/*            /!*{row?.amount}*!/*/}
                {/*        </td>*/}
                {/*        <td>*/}
                {/*            <Box sx={{display: 'flex', gap: 2, alignItems: 'center'}}>*/}
                {/*                <Link level="body-xs" component="button">*/}
                {/*                    Download*/}
                {/*                </Link>*/}
                {/*                <RowMenu/>*/}
                {/*            </Box>*/}
                {/*        </td>*/}
                {/*    </tr>*/}
                {/*))}*/}
                </tbody>
            </Table>
        </Sheet>
    );
}