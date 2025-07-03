import React, { useEffect, useState } from 'react';
import Nav from '../../components/Nav';
import {
  Users,
  Shield,
  Ban,
  FileWarning,
  FileCheck,
  FileClock,
  FileX,
  FilePlus,
  Eye
} from 'lucide-react';
import axios from '../../api/axios';
import Skeleton from 'react-loading-skeleton'



const Dashboard = () => {
  const [usersSummary, setUsersSummary] = useState(null)
  const [reportsSummary, setReportsSummary] = useState(null)
  
  console.log(usersSummary);
  
  const getReportsSummary = async() =>{
    try {
      const res = await axios.get("reports/summary", { headers:{
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }})
      setReportsSummary(res.data.summary)

    } catch (err) {
      console.log(err); 
    }
  }

  const getUsersSummary = async() =>{
    try {
      const res = await axios.get("users/summary", { headers:{
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }})
      setUsersSummary(res.data.summary)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(()=>{
    getReportsSummary()
    getUsersSummary()
  }, [])

  return (
    <>
      <Nav />
      <main className="p-8  min-h-screen">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-sm text-gray-500">Overview of system metrics</p>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        
        <div className="rounded-xl bg-white/30 shadow-sm hover:shadow-md transition-all py-7 px-5 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Reports</p>
            <h2 className="text-2xl font-semibold text-gray-900">{reportsSummary? reportsSummary?.totalReports : <Skeleton /> }</h2>
          </div>
          <div className="p-2 rounded-md bg-orange-100 text-orange-600 flex items-center justify-center">
            <FileWarning className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white/30 shadow-sm hover:shadow-md transition-all py-7 px-5 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Resolved Reports</p>
            <h2 className="text-2xl font-semibold text-gray-900">{reportsSummary? reportsSummary?.resolved : <Skeleton />}</h2>
          </div>
          <div className="p-2 rounded-md bg-green-100 text-green-600 flex items-center justify-center">
            <FileCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white/30 shadow-sm hover:shadow-md transition-all py-7 px-5 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Investigating Reports</p>
            <h2 className="text-2xl font-semibold text-gray-900">{reportsSummary? reportsSummary?.investigating: <Skeleton />}</h2>
          </div>
          <div className="p-2 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white/30 shadow-sm hover:shadow-md transition-all py-7 px-5 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Pending Reports</p>
            <h2 className="text-2xl font-semibold text-gray-900">{reportsSummary? reportsSummary?.pending: <Skeleton />}</h2>
          </div>
          <div className="p-2 rounded-md bg-yellow-100 text-yellow-600 flex items-center justify-center">
            <FileClock className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white/30 shadow-sm hover:shadow-md transition-all py-7 px-5 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Accepted Reports</p>
            <h2 className="text-2xl font-semibold text-gray-900">{reportsSummary? reportsSummary?.accepted: <Skeleton />}</h2>
          </div>
          <div className="p-2 rounded-md bg-teal-100 text-teal-600 flex items-center justify-center">
            <FilePlus className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white/30 shadow-sm hover:shadow-md transition-all py-7 px-5 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Rejected Reports</p>
            <h2 className="text-2xl font-semibold text-gray-900">{reportsSummary? reportsSummary?.rejected: <Skeleton />}</h2>
          </div>
          <div className="p-2 rounded-md bg-red-100 text-red-600 flex items-center justify-center">
            <FileX className="w-5 h-5" />
          </div>
        </div>
      </div>

      

      <div className="rounded-xl bg-white/30 shadow-sm hover:shadow-md transition-all py-7 px-5 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Users</p>
            <h2 className="text-2xl font-semibold text-gray-900">{usersSummary? usersSummary?.totalUsers: <Skeleton />}</h2>
          </div>
          <div className="p-2 rounded-md bg-indigo-100 text-indigo-600 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white/30 shadow-sm hover:shadow-md transition-all py-7 px-5 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Admins</p>
            <h2 className="text-2xl font-semibold text-gray-900">{usersSummary? usersSummary?.admin: <Skeleton />}</h2>
          </div>
          <div className="p-2 rounded-md bg-purple-100 text-purple-600 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
        </div>
      </div>


      <div className="rounded-xl bg-white/30 shadow-sm hover:shadow-md transition-all py-7 px-5 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Inspectors</p>
            <h2 className="text-2xl font-semibold text-gray-900">{usersSummary? usersSummary?.inspector : <Skeleton />}</h2>
          </div>
          <div className="p-2 rounded-md bg-gray-200 text-gray-600 flex items-center justify-center">
            <Eye className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white/30 shadow-sm hover:shadow-md transition-all py-7 px-5 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Blocked Users</p>
            <h2 className="text-2xl font-semibold text-gray-900">{usersSummary? usersSummary?.blockedUser: <Skeleton />}</h2>
          </div>
          <div className="p-2 rounded-md bg-rose-100 text-rose-600 flex items-center justify-center">
            <Ban className="w-5 h-5" />
          </div>
        </div>
      </div>

        </section>
      </main>
    </>
  );
};

export default Dashboard;
