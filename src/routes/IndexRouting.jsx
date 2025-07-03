import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home';
import CreateReport from '../pages/CreateReport';
import UserReports from '../pages/UserReports';
import EditReport from '../pages/EditReport';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Report from '../pages/Report';
import AllReports from '../admin/Pages/AllReports'
import SingleReport from '../admin/Pages/SingleReport';
import ProtectedRoute from '../components/ProtectedRoute';
import Dashboard from '../admin/Pages/Dashboard';
import Profile from '../pages/Profile';
import Settings  from '../admin/Pages/Settings';
import Blocked from '../pages/Blocked';
import ContactSupport from '../pages/ContactSupport';
import UserSupport from '../admin/Pages/UserSupport';

const IndexRouting = () => {
  return (
    <Routes>
     <Route path = "/" element = {<Home />}/> 
     <Route path = "/blocked" element = {<Blocked />}/> 
     <Route path = "/support" element = {<ContactSupport />}/> 
     <Route path = "/reports" element = {<ProtectedRoute> <UserReports /> </ProtectedRoute>}/> 
     <Route path = "/reports/:id" element = {<ProtectedRoute> <Report /> </ProtectedRoute>}/> 
     <Route path = "/reports/edit/:id" element = {<ProtectedRoute> <EditReport /> </ProtectedRoute>}/> 
     <Route path = "/reports/create" element = {<ProtectedRoute> <CreateReport /> </ProtectedRoute>}/> 
     <Route path = "/reports/create/anonymous" element = { <CreateReport />}/> 
     <Route path = "/login" element = {<Login />}/> 
     <Route path = "/signup" element = {<Signup />}/> 
     <Route path = "/profile" element = {<Profile />}/> 
     <Route path = "/admin" element = {<Dashboard/>}/> 
     <Route path = "/admin/reports" element = {<AllReports/>}/> 
     <Route path = "/admin/reports/:id" element = {<SingleReport />}/> 
     <Route path = "/admin/settings" element = {<Settings />}/> 
     <Route path = "/admin/supports" element = {<UserSupport />}/> 
    </Routes>

    
  )
}

export default IndexRouting
