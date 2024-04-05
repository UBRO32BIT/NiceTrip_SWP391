import * as React from 'react';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import Button from '@mui/joy/Button';
import Grid from '@mui/joy/Grid';
import { useSelector } from 'react-redux';
import { GetAllRequest, AcceptRequest, CancelRequest } from '../../services/admin.services';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import { convertDateTime } from '../../utils/date';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

interface RootState {
    auth: {
        isAuthenticated: boolean;
        user: any;
    };
}

export default function RequestList() {
    const [transactions, setTransactions] = React.useState([]);
    const [loading, setLoading] = useState(true); // State to track loading state
    const [obj, setObj] = useState({});
  
    useEffect(() => {
      const getAllTransactions = async () => {
        try {
          const url = `https://nice-trip.onrender.com/api/v2/reservation/get-all/reservation`;
          const { data } = await axios.get(url);
          console.log("Data from API:", data);
          console.log(url); 
  
          setObj(data.data);
          setTransactions(data.data || []); 
          setLoading(false);
        } catch (err) {
          console.log(err);
        }
      };
  
      getAllTransactions();
    }, []);
    return (
<div className="table-container" style={{width:'98%', display:'flex', margin:'auto'}}>
          <table>
            <thead>
              <tr>
              <th style={{ width: 50 }}>No.</th>
              <th style={{ width: 100 }}>Order Id</th>
              <th style={{ width: 100}}>User</th>
              <th style={{ width: 100}}>Timeshare ID</th>
              <th style={{ width: 100}}>Type</th>
              <th style={{ width: 100}}>Status</th>
              <th style={{ width: 100}}>Price</th>
              <th style={{ width: 140}}>Create At</th>
              <th style={{ width: 140}}>Owner Accepted At</th>

              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction : any, index) => (
                <tr key={transaction._id} className="post-item">
                  <td>{index + 1}</td>
                  <td>{transaction?._id}</td>
                  <td>{transaction?.userId?.username}</td>
                  <td>{transaction?.timeshareId?._id}</td>
                  <td>{transaction?.type}</td>
                  <td>{transaction?.status}</td>
                  <td><AttachMoneyIcon sx={{height:'20px', width:'20px', marginRight:'-5px', marginBottom:"2px"}}/> {transaction?.amount}</td>
                  <td>{convertDateTime(transaction?.createdAt)}</td>
                  <td>{convertDateTime(transaction?.owner_accepted_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    );
}
