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
import NotFound from '../components/NotFound';
import AuthorizationRoute from '../components/AuthorizationRoute';
import Logs from '../admin/Pages/logs';

const IndexRouting = () => {
  return (
    <Routes>
     <Route path = "/" element = {<Home />}/> 
     <Route path = "/blocked" element = {<ProtectedRoute><Blocked /></ProtectedRoute>}/> 
     <Route path = "/support" element = {<ProtectedRoute> <ContactSupport /> </ProtectedRoute>}/> 
     <Route path = "/reports" element = {<ProtectedRoute> <UserReports /> </ProtectedRoute>}/> 
     <Route path = "/reports/:id" element = {<ProtectedRoute> <Report /> </ProtectedRoute>}/> 
     <Route path = "/reports/edit/:id" element = {<ProtectedRoute> <EditReport /> </ProtectedRoute>}/> 
     <Route path = "/reports/create" element = {<ProtectedRoute> <CreateReport /> </ProtectedRoute>}/> 
     <Route path = "/login" element = {<Login />}/> 
     <Route path = "/signup" element = {<Signup />}/> 
     <Route path = "/profile" element = {<Profile />}/> 
     <Route path = "/admin" element = {<ProtectedRoute> <AuthorizationRoute allowedRoles={['admin', 'inspector', 'superAdmin']}> <Dashboard/> </AuthorizationRoute>  </ProtectedRoute>}/> 
     <Route path = "/admin/reports" element = {<ProtectedRoute> <AuthorizationRoute allowedRoles={['admin', 'inspector', 'superAdmin']}> <AllReports/> </AuthorizationRoute> </ProtectedRoute>}/> 
     <Route path = "/admin/reports/:id" element = {<ProtectedRoute> <AuthorizationRoute allowedRoles={['admin', 'inspector', 'superAdmin']}> <SingleReport /> </AuthorizationRoute>  </ProtectedRoute>}/> 
     <Route path = "/admin/settings" element = {<ProtectedRoute> <AuthorizationRoute allowedRoles={['superAdmin']}> <Settings /> </AuthorizationRoute> </ProtectedRoute>}/> 
     <Route path = "/admin/supports" element = {<ProtectedRoute> <AuthorizationRoute allowedRoles={['admin', 'superAdmin']}> <UserSupport /></AuthorizationRoute>  </ProtectedRoute>}/> 
     <Route path = "/admin/logs" element = {<ProtectedRoute> <AuthorizationRoute allowedRoles={['admin', 'superAdmin']}> <Logs /></AuthorizationRoute>  </ProtectedRoute>}/> 
     <Route path = "/*" element = {<NotFound />}/> 
    </Routes>

    
  )
}

export default IndexRouting
