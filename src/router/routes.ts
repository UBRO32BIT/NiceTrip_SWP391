import RentalDashboard from "../pages/RentalDashboard";
import UserDashboard from "../pages/UserDashboard";
import Login from "../pages/Login";
import PostDetail from "../pages/PostDetail";
import Booking from "../pages/Booking";
import ReviewOrder from "../pages/ReviewOrder";
import ThankYou from "../pages/ThankYou";

interface Route {
    path: string;
    page: React.ComponentType<any>;
}

const privateRoutes: Route[] = [
   
];

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
        path: '/post/:postId/book',
        page: Booking
    },
    {
        path: '/post/:postId/book/review-order/:reservationId',
        page: ReviewOrder
    },
    {
        path: '/thank-you',
        page: ThankYou
    }
];

export {
    privateRoutes,
    publicRoutes
};
