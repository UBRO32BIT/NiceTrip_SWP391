import * as React from 'react';
import { convertDateTime } from '../../utils/date';
import { useEffect, useState } from "react";
import axios from "axios";

export default function PaymentList() {
  const [payments, setPayments] = React.useState([]);
  const [loading, setLoading] = useState(true); // State to track loading state
  const [obj, setObj] = useState({});

  useEffect(() => {
    const getAllPayments = async () => {
      try {
        const url = `https://nice-trip.onrender.com/api/v2/payment/all-payment-upgrade`;
        const { data } = await axios.get(url);
        console.log("Data from API:", data); // Log the entire data object
        console.log(url); // Log the entire data object

        setObj(data.data);
        setPayments(data.data || []); 
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    getAllPayments();
  }, []);
  return (
    <div className="table-container">
          <table>
            <thead>
              <tr>
              <th style={{ width: 50 }}>No.</th>
              <th style={{ width: 100 }}>Order Id</th>
              <th style={{ width: 100}}>User</th>
              <th style={{ width: 240}}>Order infomation</th>
              <th style={{ width: 100}}>Price</th>
              <th style={{ width: 100}}>Status</th>
              <th style={{ width: 140}}>Date</th>
              <th style={{ width: 140}}>Payment Method</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment : any, index) => (
                <tr key={payment._id} className="post-item">
                  <td>{index + 1}</td>
                  <td>{payment?.orderId}</td>
                  <td>{payment?.userId?.username}</td>
                  <td>{payment?.vnp_OrderInfo}</td>
                  <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(payment?.amount)}</td>
                  <td>{payment?.status}</td>
                  <td>{convertDateTime(payment?.timestamp)}</td>
                  <td><img style={{height:'50px'}} src={payment?.method?.logoImg} alt="Payment Method Logo" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  );
}