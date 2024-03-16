import React from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Store";
import Home from "./Components/Home/Home ";
import Registeration from "./Components/Registeration/Registeration";
import { createRoot } from "react-dom/client";
import Login from "./Components/Login/Login";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import Verify from "./Components/ForgotPassword/Verify";
import CreatePassword from "./Components/ForgotPassword/CreatePassword";
import GetFeeds from "./Components/getFeeds/GetFeeds";
import LoginHome from "./Components/LoginHome/LoginHome";
import Profile from './Components/Profile/Profile'

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Registeration" element={<Registeration />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path="/verifyOtp" element={<Verify/>}/>
        <Route path="/createPassword" element={<CreatePassword/>}/>
        <Route path="/getFeed" element={<GetFeeds/>}/>
        <Route path="/login-home" element={<LoginHome/>}/>
        <Route path="/profile" element={<Profile/>}/>

      </Routes>
    </BrowserRouter>

  </Provider>
);
