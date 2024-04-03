import { useState } from "react";
import { useEffect } from "react";
import { Row, Col, Container } from 'reactstrap'
import TourCard from "../shared/TourCard";
import { useLocation } from 'react-router-dom';
import { GetPost } from "../services/post.service";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Typography } from "@mui/joy";
import SearchBar from "../shared/SearchBar";
import axios from "axios";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination";
import { useSelector } from "react-redux";
import Search from "../components/Search";
import Type from "../components/Type";
import Grid from '@mui/joy/Grid';
import DateRangePicker from '../components/DateRangePicker';
import { Box } from '@mui/joy';

const TimeshareList = () => {
    const [obj, setObj] = useState({});
    const [sort, setSort] = useState({ sort: "price", order: "desc" });
    const user = useSelector((state) => state?.auth?.user);
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState("");
	const [filterType, setfilterType] = useState([]);
    const [myPosts, setMyPosts] = useState([]); // Initialize myPosts as an empty array
    const [loading, setLoading] = useState(true); // State to track loading state
    const [endDate, setEndDate] = useState(""); // State for end date filter
    const [startDate, setStartDate] = useState(""); // State for start date filter


    useEffect(() => {
        const fetchData = async () => {
            try {
				const url = `https://nice-trip.onrender.com/api/v2/timeshare/query?page=${page}&sort=${sort.sort},${
					sort.order
				}&type=${filterType}&search=${search}&start_date=${startDate}&end_date=${endDate}`;
                console.log(url);

                const { data } = await axios.get(url);
                setObj(data);
                setMyPosts(data.data || []); 
                setLoading(false); 
			} catch (err) {
				console.log(err);
			}
        }
        fetchData();
    }, [sort, filterType, page, search, , startDate, endDate]);
    return (
        <>
            <Header/>
            <Container mb={3}>
                <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                    <Grid xs={2}>
                        <Row className="text-center my-3">
                            <Sort sort={sort} setSort={(sort) => setSort(sort)} />
                            <Type 
                                types={["rental", "exchange"]} 
                                
                                filterType={filterType} 
                                setfilterType={setfilterType} 
                            />
                            <DateRangePicker
                                startDate={startDate}
                                endDate={endDate}
                                setStartDate={setStartDate}
                                setEndDate={setEndDate}
                            />
                            <Pagination
                                page={page}
                                limit={obj.limit ? obj.limit : 0}
                                total={obj.total ? obj.total : 0}
                                setPage={(page) => setPage(page)}
                            />

                        </Row>
                    </Grid>
                    <Grid xs={10}>
                        <div style={{marginBottom:'50px', marginTop:'25px'}}>
                            <Search setSearch={(search) => setSearch(search)} />
                        </div>
                        <Col >
                            <TourCard myPosts={myPosts} />
                        </Col>
                    </Grid>
                </Grid>
            </Container>
            <Footer/>
        </>
    );
}

export default TimeshareList;