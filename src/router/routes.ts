import RentalDashboard from "../pages/RentalDashboard";
import UserDashboard from "../pages/UserDashboard";
import Login from "../pages/Login";
import PostDetail from "../pages/PostDetail";
import Booking from "../pages/Booking";
import ReviewOrder from "../pages/ReviewOrder";
import ThankYou from "../pages/ThankYou";
import Home from "../pages/Home/Home";
import TimeShare from "../pages/TimeShare";
import TimeShareDetails from "../pages/TimeShareDetails";
import PostTimeshare from "../pages/PostTimeshare";
import About from "../pages/About";
import SignUp from "../pages/Signup";
import Exchange from "../pages/Exchange";
import ConfirmReservation from "../pages/ConfirmReservation";
import Messenger from "../pages/Messenger"
import Email from "../pages/Email";
import PaymentPage from "../pages/Payment";
interface Route {
    path: string;
    page: React.ComponentType<any>;
}

const privateRoutes: Route[] = [
   
];

const adminRoutes: Route[] = [

]
const publicRoutes: Route[] = [
    {
        path: '/rental',
        page: RentalDashboard
    },
    {
        path: '/me/*',
        page: UserDashboard
    },
    {
        path: '/login',
        page: Login
    },
    {
        path: '/post/:postId',
        page: PostDetail
    },
    {
        path: 'timeshare/:timeshareId/book',
        page: Booking
    },
    {
        path: '/timeshare/:postId/exchange',
        page: Exchange
    },
    {
        path: '/timeshare/:timeshareId/reservation/:reservationId/confirm',
        page: ConfirmReservation
    },
    {
        path: '/timeshare/:postId/book/review-order/:reservationId',
        page: ReviewOrder
    },
    {
        path: '/payment/:reservationId',
        page: PaymentPage
    },
    {
        path: '/thank-you',
        page: ThankYou
    },
    {
        path: '/home',
        page: Home,
    },
    {
        path: '/timeshare',
        page: TimeShare
    },
    {
        path: '/timeshare-details/:id',
        page: TimeShareDetails
    },
    {
        path: '/yourtimeshare',
        page: PostTimeshare
    },
    {
        path: '/about',
        page: About
    },
    {
        path: '/register',
        page: SignUp
    },
    {
        path: '/email/*',
        page: Email
    },
];

export {
    privateRoutes,
    publicRoutes
};
