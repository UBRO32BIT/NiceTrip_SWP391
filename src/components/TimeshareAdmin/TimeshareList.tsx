import * as React from 'react';
import { ColorPaletteProp } from '@mui/joy/styles';
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
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { DeleteTimeshare, GetAllAccount, GetAllTimeshare, VerifyTimeshare } from '../../services/admin.services';
import { useNavigate, useParams } from 'react-router-dom';
import { convertDate, convertDateTime } from '../../utils/date';
import { DialogActions, DialogContent, DialogTitle } from '@mui/joy';
import { useSnackbar } from 'notistack';

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

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
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

function RowMenu({timeshare, setTimeshareModal, setOpenVerify, setOpenDelete, navigate}: any) {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        {!timeshare.is_verified && (
          <MenuItem color='success' onClick={() => {
            setTimeshareModal(timeshare);
            setOpenVerify(true)
          }}>Verify</MenuItem>
        )}
        <MenuItem onClick={() => {
          navigate(`/admin/timeshare-list/${timeshare._id}`);
        }}>View Details</MenuItem>
        <MenuItem>Edit</MenuItem>
        <Divider />
        <MenuItem color="danger"  onClick={() => {
          setTimeshareModal(timeshare);
          setOpenDelete(true)
        }}>Delete</MenuItem>
      </Menu>
    </Dropdown>
  );
}

export default function TimeshareList() {
  const [page, setPage] = React.useState(1);
  const [role, setRole] = React.useState('');
  const [search, setSearch] = React.useState('');
  const [searchTemp, setSearchTemp] = React.useState('');
  const [totalPage, setTotalPage] = React.useState(1);
  const [timeshares, setTimeshares] = React.useState([]);
  const [order, setOrder] = React.useState<Order>('desc');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [open, setOpen] = React.useState(false);
  const [openVerify, setOpenVerify] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [timeshareModal, setTimeshareModal] = React.useState<any>(null);
  const { pageString } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  
  async function getAllTimeshares() {
    const data = await GetAllTimeshare(search, page, 'timestamp', order);
    console.log(data);
    if (data) {
        setTimeshares(data);
        console.log(timeshares)
        //if (data.totalPages > 0) {
        //  setTotalPage(data.totalPages);
        //}
    }
  }
  const handleSearch = (e: any) => {
    e.preventDefault()
    console.log(searchTemp);
    setSearch(searchTemp);
  }
  const deleteTimeshare = async (timeshareId: string) => {
    try {
      await DeleteTimeshare(timeshareId);
      enqueueSnackbar("Delete successully", { variant: "success" });
      setOpenDelete(false);
    }
    catch (error: any) {
      enqueueSnackbar(`Error: ${error?.message}`, { variant: "error" });
    }
  }
  const verifyTimeshare = async (timeshareId: string) => {
    try {
      await VerifyTimeshare(timeshareId);
      enqueueSnackbar("Verify successully", { variant: "success" });
      getAllTimeshares();
      setOpenVerify(false);
    }
    catch (error: any) {
      enqueueSnackbar(`Error: ${error?.message}`, { variant: "error" });
    }
  }
  React.useEffect(() => {
    getAllTimeshares();
    console.log("hello world")
  }, [page, role, search])
  React.useEffect(() => {
    if (pageString && parseInt(pageString) > 0) {
      setPage(parseInt(pageString));
    }
  }, []);
  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm">
        <FormLabel>Status</FormLabel>
        <Select
          size="sm"
          placeholder="Filter by status"
          slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
        >
          <Option value="paid">Active</Option>
          <Option value="pending">Banned</Option>
          <Option value="refunded">Deleted</Option>
        </Select>
      </FormControl>
      <FormControl size="sm">
        <FormLabel>Role</FormLabel>
        <Select size="sm" placeholder="All">
          <Option value="admin" onClick={() => setRole("admin")}>Admin</Option>
          <Option value="user" onClick={() => setRole("user")}>User</Option>
        </Select>
      </FormControl>
      <FormControl size="sm">
        <FormLabel>Sort by</FormLabel>
        <Select size="sm" placeholder="All">
          <Option value="all">Username</Option>
          <Option value="olivia">Date created</Option>
        </Select>
      </FormControl>
    </React.Fragment>
  );
  return (
    <React.Fragment>
      <Sheet
        className="SearchAndFilters-mobile"
        sx={{
          display: { xs: 'flex', sm: 'none' },
          my: 1,
          gap: 1,
        }}
      >
        <Input
          size="sm"
          placeholder="Search"
          startDecorator={<SearchIcon />}
          sx={{ flexGrow: 1 }}
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          <FilterAltIcon />
        </IconButton>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
            <ModalClose />
            <Typography id="filter-modal" level="h2">
              Filters
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Sheet sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {renderFilters()}
              <Button color="primary" onClick={() => setOpen(false)}>
                Submit
              </Button>
            </Sheet>
          </ModalDialog>
        </Modal>
      </Sheet>
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: 'sm',
          py: 2,
          display: { xs: 'none', sm: 'flex' },
          flexWrap: 'wrap',
          gap: 1.5,
          '& > *': {
            minWidth: { xs: '120px', md: '160px' },
          },
        }}
      >
        <form onSubmit={handleSearch}>
          <FormControl sx={{ flex: 1 }} size="sm">
            <FormLabel>Search for timeshare</FormLabel>
            <Input size="sm" 
            placeholder="Search" 
            startDecorator={<SearchIcon />} 
            value={searchTemp}
            onChange={(e) => {
              setSearchTemp(e.target.value)
            }}/>
          </FormControl>
        </form>
        {renderFilters()}
      </Box>
      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          display: { xs: 'none', sm: 'initial' },
          width: '100%',
          borderRadius: 'sm',
          flexShrink: 1,
          overflow: 'auto',
          minHeight: 0,
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
          }}
        >
          <thead>
            <tr>
              <th style={{ width: 220, padding: '12px 12px' }}>Timeshare</th>
              <th style={{ width: 70, padding: '12px 6px' }}>Type</th>
              <th style={{ width: 80, padding: '12px 6px' }}>Date</th>
              <th style={{ width: 70, padding: '12px 6px' }}>Price</th>
              <th style={{ width: 140, padding: '12px 6px' }}>Uploader</th>
              <th style={{ width: 100, padding: '12px 6px' }}>Verified</th>
              <th style={{ width: 100, padding: '12px 6px' }}>Status</th>
              <th style={{ width: 50}}></th>
            </tr>
          </thead>
          <tbody>
            {stableSort(timeshares, getComparator(order, '_id')).map((timeshare: any) => (
              <tr key={timeshare._id}>
                <td style={{ width: 120 }}>
                  <Box sx={{display: "flex", gap: 2, alignItems: "center"}}>
                    <img alt={timeshare.resortId.name} src={timeshare.images[0]} width={120}/>
                    <Box>
                      <Typography level="body-sm">{timeshare.resortId.name}</Typography>
                      <Typography level="body-xs">{timeshare.unitId.name}</Typography>
                    </Box>
                  </Box>
                </td>
                <td>
                  <Typography level="body-xs">{timeshare.type}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{`${convertDate(timeshare.start_date)} - ${convertDate(timeshare.end_date)}`}</Typography>
                </td>
                <td>{timeshare.price}</td>
                <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Avatar size="sm" src={timeshare.current_owner.profileImage} alt={timeshare.current_owner.username}/>
                    <div>
                      <Typography level="body-xs">{timeshare.current_owner.username}</Typography>
                      {/* <Typography level="body-xs">{timeshare.current_owner.email}</Typography> */}
                    </div>
                  </Box>
                </td>
                <td>
                {timeshare.is_verified ? (
                            <VerifiedOutlinedIcon color='success' />
                        ) : (
                            <HighlightOffIcon style={{ color: 'red' }} />
                        )}
                </td>
                <td>
                  {timeshare.isDeleted ? (
                    <Chip
                      variant="soft"
                      size="sm"
                      startDecorator={<BlockIcon />}
                      color="danger"
                    >
                      Deleted
                    </Chip>
                  ) : (
                    <Chip
                      variant="soft"
                      size="sm"
                      startDecorator={<CheckRoundedIcon />}
                      color="success"
                    >
                      Active
                    </Chip>
                  )}
                </td>
                <td>
                  <RowMenu
                  timeshare={timeshare}
                  setOpenVerify={setOpenVerify}
                  setOpenDelete={setOpenDelete}
                  setTimeshareModal={setTimeshareModal}
                  navigate={navigate}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal open={openVerify} onClose={() => setOpenVerify(false)}>
          <ModalDialog variant="outlined" role="alertdialog">
            <DialogTitle>
              <WarningRoundedIcon />
              Confirmation
            </DialogTitle>
            <Divider />
            <DialogContent>
              Are you sure you want to verify {timeshareModal?.resortId?.name}?
            </DialogContent>
            <DialogActions>
              <Button variant="solid" color="warning" onClick={() => verifyTimeshare(timeshareModal?._id)}>
                Yes
              </Button>
              <Button variant="plain" color="neutral" onClick={() => setOpenVerify(false)}>
                No
              </Button>
            </DialogActions>
          </ModalDialog>
        </Modal>
        <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
          <ModalDialog variant="outlined" role="alertdialog">
            <DialogTitle>
              <WarningRoundedIcon />
              Confirmation
            </DialogTitle>
            <Divider />
            <DialogContent>
              Are you sure you want to delete {timeshareModal?.resortId?.name}?
            </DialogContent>
            <DialogActions>
              <Button variant="solid" color="warning" onClick={() => deleteTimeshare(timeshareModal?._id)}>
                Yes
              </Button>
              <Button variant="plain" color="neutral" onClick={() => setOpenDelete(false)}>
                No
              </Button>
            </DialogActions>
          </ModalDialog>
        </Modal>
      </Sheet>
      <Box
        className="Pagination-laptopUp"
        sx={{
          pt: 2,
          gap: 1,
          [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
          display: {
            xs: 'none',
            md: 'flex',
          },
        }}
      >
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          disabled={page<=1}
          onClick={() => setPage(page-1)}
          startDecorator={<KeyboardArrowLeftIcon />}
        >
          Previous
        </Button>

        <Box sx={{ flex: 1 }} />
        <Typography>Page {page} of {totalPage}</Typography>
        <Box sx={{ flex: 1 }} />

        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          disabled={page>=totalPage}
          onClick={() => setPage(page+1)}
          endDecorator={<KeyboardArrowRightIcon />}
        >
          Next
        </Button>
      </Box>
    </React.Fragment>
  );
}