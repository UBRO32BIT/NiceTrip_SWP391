import React from 'react';
import logo from './logo.svg';
import './App.css';
import RentalDashboard from './pages/RentalDashboard';
import Router from './router/router';
import {LoginSuccess} from './features/auth/auth.slice';
import {useSelector, useDispatch} from 'react-redux'
import {BrowserRouter, Routes, Route, Navigate, useNavigate} from "react-router-dom";
import {api} from "./api";
import {
    createSessionCookies,
    getRefreshToken,
    getToken,
    removeSessionCookies
} from './utils/tokenCookies'

interface RootState {
    auth: {
        isAuthenticated: boolean;
        user: any;
    };
}

function App() {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const [isLoading, setIsLoading] = React.useState<boolean | null>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuth = async () => {
        try {
            if (getToken()) {
                const response = await api.patch('/auth/isAuth');
                if (response.data) {
                    const loginData = response.data.data;
                    dispatch(LoginSuccess(loginData));
                } else {
                    navigate('/login');
                }
            } else {
                navigate('/login');
            }
        } catch (err) {
            // Handle errors
        }
    };

    React.useEffect(() => {
        isAuth();
    }, []);

    React.useEffect(() => {
        if (isAuthenticated === true) {
            // navigate(-1)
        }
    }, [isAuthenticated]);
    return (
        <div className="App">
            <Router/>
        </div>
    );
}

export default App;


// import {BrowserRouter, Routes, Route, Navigate, useNavigate} from "react-router-dom";
// import React, {useEffect, useState} from "react";
// import {publicRoutes, privateRoutes} from './router/routes';
// import './App.css';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(true);
//
//   return (
//     <div className="App">
//       <Routes>
//         <Route>
//           {privateRoutes.map((route, index) => {
//             const Page = route.page;
//             return (
//               <Route
//                 key={index}
//                 path={route.path}
//                 element={
//                   isAuthenticated ? (
//                     <Page/>
//                   ) : (
//                     <Navigate to="/login" />
//                   )
//                 }
//               />
//             )
//           })}
//           {publicRoutes.map((route, index) => {
//             const Page = route.page;
//             return (
//               <Route
//                 key={index}
//                 path={route.path}
//                 element={<Page />}
//               />
//             )
//           })}
//         </Route>
//       </Routes>
//     </div>
//
//   );
// }
//
// export default App;


