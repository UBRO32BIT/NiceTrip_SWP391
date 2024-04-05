import { useState } from "react";
import { useEffect } from "react";
import { Row, Col, Container } from 'reactstrap'
import TourCard from "../../shared/TourCard";
import { useLocation } from 'react-router-dom';
import { GetPost } from "../../services/post.service";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Typography } from "@mui/joy";
import SearchBar from "../../shared/SearchBar";
import axios from "axios";
import Sort from "../../components/Sort";
import Pagination from "../../components/Pagination";
import { useSelector } from "react-redux";

const TimeshareList = () => {
    const [obj, setObj] = useState({});
    const [sort, setSort] = useState({ sort: "price", order: "desc" });
    const user = useSelector((state) => state?.auth?.user);
	const [page, setPage] = useState(1);

    const [myPosts, setMyPosts] = useState([]); // Initialize myPosts as an empty array
    const [loading, setLoading] = useState(true); // State to track loading state


    useEffect(() => {
        const fetchData = async () => {
            try {
				const url = `https://nice-trip.onrender.com/api/v2/timeshare?page=${page}&sort=${sort.sort},${
					sort.order
				}`;
                const { data } = await axios.get(url);
                console.log(url)
                console.log("Data from API:", data); // Log the entire data object
                setObj(data.data);
                // Assuming the data structure is an array of posts
                setMyPosts(data.data || []); // Set myPosts to data.myPosts or an empty array if data.myPosts is undefined
                setLoading(false); // Set loading to false when data is fetched
			} catch (err) {
				console.log(err);
			}
        }
        fetchData();
    }, [sort, page]);
    return <>
        <Container>
            <Row>
                <TourCard myPosts={myPosts} />
            </Row>
        </Container>
    </>
}

export default TimeshareList;