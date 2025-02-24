import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Main from "./pages/Main/Main";
import UserManagement from "./pages/UserManagement/UserManagement";
import RoomManagement from "./pages/RoomManagement/RoomManagement";
import BookingManagement from "./pages/BookingManagement/BookingManagement";
import BookingManage from "./pages/BookingManage/BookingManage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Main />}>
          <Route path="user-management" element={<UserManagement />} />
          <Route path="room-management" element={<RoomManagement />} />
          <Route path="meeting-booking" element={<BookingManagement />} />
          <Route path="booking-manage" element={<BookingManage />} />
          <Route index element={<Navigate to="/user-management" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
