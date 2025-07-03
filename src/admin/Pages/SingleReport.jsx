import React, { useEffect, useState } from "react"
import Nav from "../../components/Nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import axios from "../../api/axios"
import { toast } from "sonner"
import localStorage from "redux-persist/es/storage"
import { Edit2Icon } from "lucide-react"
import ImageComponent from '../../components/ImageComponent';



const SingleReport = () => {

  const location = useLocation()
  const navigate = useNavigate()
  const [report, setReport] = useState({})

  useEffect(() => {
    if (!location.state?.report) {
      return navigate("/")
    }
    setReport(location.state?.report)
  }, [])

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      status: report?.status
    }
  })

  const handleStatusChange = async (data) => {
    try {
      const token = await localStorage.getItem("authToken")
      const res = await axios.patch(`reports/${report?._id}/status`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (res.status == 200) {
        toast.success(res.data.message || "Report status updated")
        setReport(prevReport => ({ ...prevReport, status: data.status }))
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleUserBlock = async (status, userId) => {
    try {
      const token = await localStorage.getItem("authToken")
      const res = await axios.patch(`users/${userId}/status`, { status }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (res.status == 200) {
        setReport(prevReport => ({
          ...prevReport,
          user: {
            ...prevReport.user,
            isBlocked: res.data.isBlocked
          }
        }))
        toast.success(res.data.message)
      }

    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>

      <Nav />
      <div className="min-h-[90vh] p-4 flex justify-center items-start">
        <div className="w-full max-w-3xl">
          <Card className="border border-white/20 backdrop-blur-xl bg-white/30 dark:bg-slate-800/30 rounded-2xl shadow-xl overflow-hidden">
            <CardContent className="p-6">
              <div className="w-full flex-col flex sm:flex-row">

                <div className="w-full sm:w-full space-y-4 border-gray-400 sm:border-r-1 ">
                  <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-4">
                    Report Details
                  </h2>

                  {/* Type */}
                  <div className="text-sm">
                    <span className="font-semibold">Type:</span> {report?.type}
                  </div>

                  {/* Description */}
                  <div className="text-sm">
                    <span className="font-semibold">Description:</span> {report?.description}
                  </div>

                  {/* Status */}
                  <div className="text-sm">
                    <span
                      className={`px-2 py-1 rounded w-24 capitalize block text-center text-white text-xs ${report.status === "pending"
                          ? "bg-yellow-500"
                          : report.status === "accepted"
                            ? "bg-green-500"
                            : report.status === "investigating"
                              ? "bg-blue-500"
                              : report.status === "resolved"
                                ? "bg-purple-500"
                                : report.status === "rejected"
                                  ? "bg-red-500"
                                  : "bg-gray-500"
                        }`}
                    >
                      {report.status}
                    </span>

                  </div>

                  {/* Created / Updated */}
                  <div className="text-sm">
                    <span className="font-semibold">Created At:</span>{" "}
                    {new Date(report?.createdAt).toLocaleString()}
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold">Updated At:</span>{" "}
                    {new Date(report?.updatedAt).toLocaleString()}
                  </div>
                </div>

                <div className="w-full sm:lex-1 mt-6 sm:pl-10">
                  <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-4">
                    Person Details
                  </h2>

                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-semibold">Name:</span> {report?.user?.name}
                    </div>

                    <div className="text-sm">
                      <span className="font-semibold">Phone:</span> {report?.user?.phone}
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold">Email:</span> {report?.user?.email}
                    </div>

                    {/* activity */}
                    <div className="text-sm">

                      <AlertDialog>
                        <AlertDialogTrigger asChild>

                          <span className={`flex px-4 py-1 gap-4 rounded w-fit items-center text-center text-white text-xs cursor-pointer
                            ${report?.user?.isBlocked ? "bg-green-500" : "bg-red-500"}`}
                          >
                            {report?.user?.isBlocked ? "Unblock this user" : "Block this user"} <Edit2Icon className="w-[15px]" />
                          </span>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Do you want to {report?.user?.isBlocked ? "Unblock" : "Block"} this user</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action will permanetly {report?.user?.isBlocked ? "Unblock" : "Block"} this user

                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className={`${report?.user?.isBlocked ? "bg-green-500 hover:bg-green-500" : "bg-red-500 hover:bg-red-500"}`} onClick={() => handleUserBlock(!report?.user?.isBlocked, report?.user?._id)} >Yes, {report?.user?.isBlocked ? "Unblock" : "Block"} </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                    </div>
                  </div>
                </div>
              </div>
              {/* Map Placeholder */}
              <div className="w-full h-48 mt-4 rounded-lg overflow-hidden">
                <a href="">
                  <img
                    src="https://imgs.search.brave.com/4c6r-6jxiDnGSpQv-zkvRYcaPr1bAT2kgDwLgqZ2GR8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvY2l0eS10b3At/dmlldy1hYnN0cmFj/dC1iYWNrZ3JvdW5k/LWZsYXQtc3R5bGUt/dmVjdG9yLWlsbHVz/dHJhdGlvbi1pc29s/YXRlZC1ncHMtbWFw/LW5hdmlnYXRpb24t/b3duXzc1Mzk0My00/NDkuanBnP3NlbXQ9/YWlzX2h5YnJpZCZ3/PTc0MA"
                    alt="Map preview"
                    className="w-full h-full object-cover cursor-pointer"
                  />
                </a>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between gap-3 mt-4 items-center">
                <div className="flex gap-7">
                  {location.state.report.media.length > 0&&
                    location.state.report.media?.map((item) => <ImageComponent url={item} />

                    )}
                </div>
                <div>
                  <Dialog>
                    <DialogTrigger><Button variant="outline">Update status</Button></DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Report status is {report?.status}</DialogTitle>
                        <form onSubmit={handleSubmit(handleStatusChange)} className="flex gap-10 justify-center my-2">
                          <select
                            defaultValue={report?.status}
                            {...register('status', { required: "report status is required" })} className={`w-fit px-5 border-2-gray border-black rounded outline-1 outline-gray-500 ${errors.status && 'outline-red-600'}`}>
                            <option value="">Select</option>
                            <option value="pending">Pending</option>
                            <option value="accepted">Accepted</option>
                            <option value="investigating">Investigating</option>
                            <option value="resolved">Resolved</option>
                            <option value="rejected">Rejected</option>
                          </select>
                          <Button>Update</Button>
                        </form>

                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

export default SingleReport
