import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Sort from "../../components/Sort";
import TableComponent from "../../components/Table"; // Import the new component
import { api } from "../../api";

function TimeshareList() {
  const [obj, setObj] = useState({});
  const [sort, setSort] = useState({ sort: "price", order: "desc" });
  const user = useSelector((state) => state?.auth?.user);
  const [myPosts, setMyPosts] = useState([]); // Initialize myPosts as an empty array
  const [loading, setLoading] = useState(true); // State to track loading state


  useEffect(() => {
    const getAllTimeshares = async () => {
      try {
        const url = `https://nice-trip.onrender.com/api/v2/timeshare/current-owner/${user?._id}?sort=${sort.sort},${sort.order}`;
        const { data } = await api.get(url);
        console.log("Data from API:", data); // Log the entire data object
        console.log(url); // Log the entire data object

        setObj(data.data);
        // Assuming the data structure is an array of posts
        setMyPosts(data.data || []); // Set myPosts to data.myPosts or an empty array if data.myPosts is undefined
        setLoading(false); // Set loading to false when data is fetched
      } catch (err) {
        console.log(err);
      }
    };

    getAllTimeshares();
  }, [user, sort]);

  return (
    <div className="wrapper">
      <div className="container">
        <div className="head"></div>
        <div className="body">
		<div className="filter_container">
            {/* Pass sort state and setSort function to Sort component */}
            <Sort sort={sort} setSort={(sort) => setSort(sort)} />
          </div>
          <div className="table_container">
            {loading ? (
              <p>Loading...</p>
            ) : myPosts.length === 0 ? (
              <p>No posts found</p>
            ) : (
              <TableComponent myPosts={myPosts} />
			  
            )}
			
          </div>

        </div>
      </div>
    </div>
  );
}

export default TimeshareList;
