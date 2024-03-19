import React, { useState } from "react";
import styles from "./styles.module.css"; // Import CSS file
import { DeleteTimeshareByOwner } from '../../services/booking.service'
import { useSnackbar } from 'notistack';
import { NavLink, useNavigate } from 'react-router-dom';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import Button from '@mui/joy/Button';
import EditIcon from '@mui/icons-material/Edit';
import CardContent from '@mui/joy/CardContent';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import { Grid, FormControl, FormLabel, Select, Option, Chip, Stack, Divider } from '@mui/joy'; // Nhóm lại các import từ MUI
import { GetPostBelongToOwner } from '../../services/post.service';
import { useSelector } from 'react-redux';
import Switch from "@mui/joy/Switch";

function Table({ myPosts, onDelete, onEdit, onManage }) {
  const navigate = useNavigate();
  // Sử dụng React Hooks trong function component
  const [isLoading, setIsLoading] = useState(false);
  const [tableVisible, setTableVisible] = useState(true); // State để xác định bảng có hiển thị hay không
  const { enqueueSnackbar } = useSnackbar();

  function formatDate(dateString) {
    if (!dateString) return "";
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }

  async function DeleteTimeshare(timeshareId) {
    try {
      setIsLoading(true);
      const confirmed = window.confirm("Are you sure you want to delete this timeshare?");
      const timeshare = await DeleteTimeshareByOwner(timeshareId);
      if (confirmed) {
        if (timeshare) {
          enqueueSnackbar("Delete successfully", { variant: "success" });
        } else {
          enqueueSnackbar("Delete failed", { variant: "error" });
        }
      }
    } catch (err) {
      enqueueSnackbar("Delete Failed", { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <div style={{ marginBottom: '10px' ,display:'flex' }}>
	  <Switch
            checked={tableVisible} 
            onChange={() => setTableVisible(!tableVisible)} 
          />
        <span>{tableVisible}</span>
      </div>
      {tableVisible ? (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Resort Name</th>
                <th>Verified</th>
                <th>Unit</th>
                <th>Stay</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myPosts.map((post) => (
                <tr key={post._id} className="post-item">
                  <td>{post?.resortId?.name}</td>
                  <td>
                    {post?.is_verified ? (
                      <VerifiedOutlinedIcon style={{ color: 'green' }} />
                    ) : (
                      <HighlightOffIcon style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>{post?.unitId?.name}</td>
                  <td>{post?.numberOfNights} night</td>
                  <td>{formatDate(post?.start_date)}</td>
                  <td>{formatDate(post?.end_date)}</td>
                  <td>${post?.price}</td>
                  <td>
                    <CardContent orientation="horizontal">
                      <Button color="success" variant='outlined' sx={{ width: '20px', marginRight: '5px' }}
                        onClick={() => {
                          navigate(`/me/my-timeshares/update/${post?._id}`)
                        }}>
                        <EditIcon />
                      </Button>
                      <Button color="danger" variant='outlined' sx={{ width: '20px', marginRight: '5px' }}
                        onClick={() => {
                          DeleteTimeshare(post?._id)
                        }} >

                        <DeleteOutlineIcon />
                      </Button>

                      <Button
                        sx={{ alignSelf: 'center' }}
                        onClick={() => {
                          navigate(`/me/my-timeshares/timeshares-list/${post?._id}`)
                        }}
                      >
                        Manage
                      </Button>
                    </CardContent>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (<Grid container spacing={2} >
	  <Grid container spacing={2} sx={{flexGrow: 1}}>
		  {myPosts.length > 0 && myPosts.map((post) => {
			  if (!post?.deleted) {
		  return (<Grid xs={12} md={6} lg={3} >
				  <Card sx={{}}>
				  <div>
					  <Typography level="title-lg" noWrap>{post?.resortId?.name}</Typography>
					  <Typography level="body-sm"
								  sx={{display: 'inline-flex', gap: 1}}>Verified {post?.is_verified ? (
									<VerifiedOutlinedIcon style={{ color: 'green' }} />
								  ) : (
									<HighlightOffIcon style={{ color: 'red' }} />
								  )}</Typography>
					  {/* <Typography level="body-sm">{formatDate(post?.start_date)}</Typography>
						  <Typography level="body-sm">{formatDate(post?.end_date)}</Typography> */}
					  <Stack sx={{width: 1, display: 'flex', justifyContent: 'center'}} direction="column"
							 spacing={0} justifyContent="center">
						  <Box sx={{width: 1, display: 'flex', justifyContent: 'space-between', mt: 2}}>
							  <Typography fontWeight={500} fontSize={14}>
								  Unit:
							  </Typography>
							  <Typography fontWeight={400} fontSize={14}>
								  {post?.unitId?.name}
							  </Typography>
						  </Box>
						  <Box sx={{width: 1, display: 'flex', justifyContent: 'space-between'}}>
							  <Typography fontWeight={500} fontSize={14}>
								  Stay:
							  </Typography>
							  <Typography fontWeight={400} fontSize={14}>
								  {post?.numberOfNights} night
							  </Typography>
						  </Box>
						  <Box sx={{width: 1, display: 'flex', justifyContent: 'space-between',}}>
							  <Typography fontWeight={500} fontSize={14}>
								  Check-in:
							  </Typography>
							  <Typography fontWeight={400} fontSize={14}>
								  {formatDate(post?.start_date)}
							  </Typography>
						  </Box>
						  <Box sx={{width: 1, display: 'flex', justifyContent: 'space-between'}}>
							  <Typography fontWeight={500} fontSize={14}>
								  Check-out:
							  </Typography>
							  <Typography fontWeight={400} fontSize={14}>
								  {formatDate(post?.end_date)}
							  </Typography>
						  </Box>
						  <Divider sx={{mt: 1, mb: 1}}/>
						  <Box sx={{width: 1, display: 'flex', justifyContent: 'space-between'}}>
							  <Typography fontWeight={500} fontSize={18}>
								  Price/night:
							  </Typography>
							  <Typography fontWeight={400} fontSize={18}>
								  ${post?.pricePerNight}
							  </Typography>
						  </Box>
						  <Box sx={{width: 1, display: 'flex', justifyContent: 'space-between'}}>
							  <Typography fontWeight={500} fontSize={18}>
								  Total:
							  </Typography>
							  <Typography fontWeight={600} fontSize={18}>
								  ${post?.price}
							  </Typography>
						  </Box>
					  </Stack>
					  <IconButton
						  aria-label="bookmark Bahamas Islands"
						  variant="plain"
						  color="neutral"
						  size="sm"
						  sx={{position: 'absolute', top: '0.875rem', right: '0.5rem'}}
					  >
						  <BookmarkAdd/>
					  </IconButton>
				  </div>
				  <AspectRatio minHeight="120px" maxHeight="250px">
					  <img src={post?.images[0]}/>
				  </AspectRatio>
				  <CardContent orientation="horizontal">
					  {/* <div>
							  <Typography level="body-xs">Total price:</Typography>
							  <Typography fontSize="lg" fontWeight="lg">
								  ${post?.price}
							  </Typography>
						  </div> */}
					  <Button color="success" variant='outlined' sx={{width: '20px'}}
							  onClick={() => {
								  navigate(`/me/my-timeshares/update/${post?._id}`)
							  }}>
						  <EditIcon/>
					  </Button>
					  <Button color="danger" variant='outlined' sx={{width: '20px'}}
					  onClick={() => {
						  DeleteTimeshare(post?._id)
					  }} >
					  
						  <DeleteOutlineIcon/>
					  </Button>
					  <IconButton
						  aria-label="bookmark Bahamas Islands"
						  variant="plain"
						  color="neutral"
						  size="sm"
						  sx={{position: 'absolute', top: '0.875rem', right: '0.5rem'}}
					  >
						  <BookmarkAdd/>
					  </IconButton>
					  {/* <Chip
							  size="sm"
							  variant="outlined"
							  color="danger"
						  >
							  Remove
						  </Chip> */}
					  <Button
						  variant="solid"
						  size="md"
						  color="primary"
						  aria-label="Explore Bahamas Islands"
						  sx={{ml: 'auto', alignSelf: 'center', fontWeight: 600}}
						  onClick={() => {
							  navigate(`/me/my-timeshares/timeshares-list/${post?._id}`)
						  }}
					  >
						  Manage
					  </Button>
				  </CardContent>
				  </Card>
				  </Grid>
				  );
			  }
			  return null; 
		  })}
	  </Grid>
  </Grid>
)}
    </div>
  );
}

export default Table;
