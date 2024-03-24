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

const TimeshareList = () => {
    const [obj, setObj] = useState({});
    const [sort, setSort] = useState({ sort: "price", order: "desc" });
    const user = useSelector((state) => state?.auth?.user);
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState("");
	const [filterType, setfilterType] = useState([]);
    const [myPosts, setMyPosts] = useState([]); // Initialize myPosts as an empty array
    const [loading, setLoading] = useState(true); // State to track loading state


    useEffect(() => {
        const fetchData = async () => {
            try {
				const url = `http://localhost:8080/api/v2/timeshare?page=${page}&sort=${sort.sort},${
					sort.order
				}&type=${filterType}&search=${search}`;
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
    }, [sort, filterType, page, search]);
    return <>
        <Header/>
        <Container>
            <Row className="d-flex align-items-center justify-content-center">
            </Row>
            
            <Row className="text-center my-3">
			<div style={{ display: 'flex', alignItems: 'center' }}>
                <Search setSearch={(search) => setSearch(search)} />
                <Sort sort={sort} setSort={(sort) => setSort(sort)} />
            </div>
            <Pagination
							page={page}
							limit={obj.limit ? obj.limit : 0}
							total={obj.total ? obj.total : 0}
							setPage={(page) => setPage(page)}
						/>
            </Row>
            <Row>
                    <Col lg='3' md='6' className='mb-4 position-relative'>
						<TourCard myPosts={myPosts} />

                    </Col>
            </Row>
            
        </Container>
        <Footer/>
    </>
}

export default TimeshareList;