import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Nav from "../../components/Nav"
import Loader from '../../components/Loader';
import axios from "../../api/axios";
import { Edit2Icon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const Settings = () => {
  const [userId, setUserId] = useState("")
  const [userDetails, setUserDetails] = useState(null)
  const [loading, setLoading] = useState(false)
  const {handleSubmit, register, formState:{errors}} = useForm()

  const onSubmit = async () => {
    setLoading(true)
    
    try {
      if(userDetails && userId == userDetails._id) return
      
      const token = localStorage.getItem('authToken')
      const res = await axios.get(`users/${userId}`, {headers:{
        Authorization: `Bearer ${token}`
      }})
      console.log(res);
      setUserDetails(res.data.user)

    } catch (err) {
      console.log(err);
      setUserDetails(null)
    }
    finally{
      setLoading(false)
    }
    
  }

  const handleRoleChange = async (data) => {
    try {
     const res = await axios.patch(`users/${userDetails._id}/role`, data, {headers:{
      Authorization: `Bearer ${localStorage.getItem('authToken')}`
     }})
     if(res.status == 200){
      toast.success(res.data.message || "User role updated")
      setUserDetails(res.data.user)
     }
      
    }
     catch (err) {
      console.log(err);
      
    }
  }

  const handleUserBlock = async (status) => {
    try {
      const token = localStorage.getItem("authToken")
      const res = await axios.patch(`users/${userDetails._id}/status`, {status}, {
        headers: {
        Authorization: `Bearer ${token}`
      }})
  
      if(res.status == 200){
        setUserDetails(prev => ({...prev, isBlocked:status}))
        toast.success(res.data.message)
      }
      
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <Nav />
      <div className="min-h-screen flex flex-col items-center p-24 px-4 dark:bg-slate-900">
        {/* Form Card */}
        <div className="w-full mb-6 max-w-sm bg-white/30 dark:bg-slate-800/40 backdrop-blur-xl border border-white/10 dark:border-slate-700 rounded-2xl shadow-lg p-8 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Settings</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">Enter a user ID to fetch details</p>
          </div>

          <div className="space-y-4">
            <Input
              placeholder="Enter user ID"
              value={userId}
              className="h-11 text-base"
              onChange={(e) => setUserId(e.target.value)}
            />
            <Button className="w-full h-11 text-base font-medium" onClick={onSubmit}>
              Search
            </Button>
          </div>
        </div>

        {/* User Details Section */}
        {loading ? <Loader /> :
  userDetails && (
    <div className="mt-10 w-full max-w-3xl bg-white/40 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl shadow-2xl p-8 transition-all">
      {/* Profile Header */}
      <div className="flex  gap-4 mb-8 items-center ">
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white dark:border-slate-700 shadow-lg">
          <img 
            src={userDetails.image || "/default-avatar.png"} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
     
        </div>
         <div className="text-center sm:ml-36">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{userDetails.name}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{userDetails.role}</p>
          </div>  
      </div>

      {/* User Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-700 dark:text-gray-300">
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-medium">User ID</span>
          <span className="mt-1 text-base font-medium break-words">{userDetails._id}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-medium">Email</span>
          <span className="mt-1 text-base font-medium break-words">{userDetails.email}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-medium">Login Type</span>
          <span className="mt-1 text-base font-medium">{userDetails.type}</span>
        </div>
        
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-medium">Created At</span>
          <span className="mt-1 text-base font-medium">
            {new Date(userDetails.createdAt).toLocaleString()}
          </span>
        </div>
        <div className="flex gap-2 flex-col sm:flex-row">
        <span className={`flex px-4 py-1 gap-4 rounded w-fit items-center text-center text-white text-xs cursor-pointer
                ${userDetails.isBlocked ? "bg-green-500" : "bg-red-500" }`}
                onClick={() => handleUserBlock(!userDetails.isBlocked)}
                >
                {userDetails.isBlocked ? "Unblock this user" : "Block this user"} <Edit2Icon className="w-[15px]"/>
        </span>

        <Dialog>
                  <DialogTrigger className="w-fit"><Button variant="outline">Update Role</Button></DialogTrigger>
                  <DialogContent>
                  <DialogTitle>  Update user role </DialogTitle>
                    <DialogHeader>
                      <form onSubmit = {handleSubmit((handleRoleChange))} className="my-2 space-x-4">
                        <select
                         {...register('role',{required:"report status is required"})} defaultValue={userDetails?.role} className = {`w-fit px-5 py-2 border-2-gray border-black rounded outline-1 outline-gray-500 ${errors.status && 'outline-red-600'}`}>
                            <option value="">Select</option>
                            <option value="admin">Admin</option>
                            <option value="superAdmin">Super Admin</option>
                            <option value="inspector">Inspector</option>
                            <option value="user">user</option>
                        </select>
                        <Button>Update</Button>
                      </form>

                    </DialogHeader>
                  </DialogContent>
        </Dialog>
        </div> 
        </div> 
      </div>
    
  )
}

      </div>
    </>
  )
}

export default Settings
