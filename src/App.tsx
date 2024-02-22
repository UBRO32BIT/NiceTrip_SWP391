import React from 'react';
import logo from './logo.svg';
import './App.css';
import RentalDashboard from './pages/RentalDashboard';
import Router from './router/router';
import { LoginSuccess } from './features/auth/auth.slice';
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { api } from "./api";
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

  React.useEffect(() => {
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
    isAuth();
  }, []);

  React.useEffect(() => {
    if (isAuthenticated === true) {
      // navigate(-1)
    }
  }, [isAuthenticated]);
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
