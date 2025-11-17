import React from "react";
import { BrowserRouter as Router, Routes ,Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import VerifyUser from "../pages/VerifyUser";
import Dashboard from "../pages/Dashboard";
import CreateResume from "../pages/CreateResume";
import Home from "../pages/Home";





const AppRoutes = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/user/register" element={<Register/>}/>
                    <Route path="/user/login" element={<Login/>}/>
                    <Route path="/user/verifyUser" element={<VerifyUser/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/create-resume" element={<CreateResume/>}/>
                </Routes>
            </Router>
        </>
    )
}

export default AppRoutes
