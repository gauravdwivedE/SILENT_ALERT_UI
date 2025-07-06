import React, { useEffect } from "react"
import Nav from "../components/Nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLocation, useNavigate, NavLink } from "react-router-dom"
import { toast } from "sonner"
import { useDispatch } from "react-redux"
import { deleteReport } from "../hooks/users/deleteReport"
import Skeleton from 'react-loading-skeleton'

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
import ImageComponent from "../components/ImageComponent"
import { DeleteIcon, Edit2 } from "lucide-react"

const Report = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!location.state?._id) {
      navigate("/")
      toast.error("invalid operation")
    }

  }, [])

  return (
    <>
      <Nav />
      <div className="min-h-[90vh] p-4 flex justify-center items-start">
        <div className="w-full max-w-3xl">
          <Card className="border border-white/20 backdrop-blur-xl bg-white/30 dark:bg-slate-800/30 rounded-2xl shadow-xl overflow-hidden">
            <CardContent className="p-6">

              <div className="w-1/2 space-y-4 ">
                <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-4">
                  Report Details
                </h2>

                {/* Type */}
                <div className="text-sm">
                  <span className="font-semibold">Type:</span> {location.state?.type}
                </div>

                {/* Description */}
                <div className="text-sm">
                  <span className="font-semibold">Description:</span> {location.state?.description}
                </div>

                {/* Status */}
                <div className="text-sm">
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`px-2 py-1 rounded block w-24 text-center text-white text-xs ${location.state?.status === "pending"
                        ? "bg-yellow-500"
                        : location.state?.status === "accepted"
                          ? "bg-green-500"
                          : location.state?.status === "investigating"
                            ? "bg-blue-500"
                            : location.state?.status === "resolved"
                              ? "bg-purple-500"
                              : location.state?.status === "rejected"
                                ? "bg-red-500"
                                : "bg-gray-500"
                      }`}
                  >
                    {location.state?.status || "Unknown"}
                  </span>

                </div>

                {/* Created / Updated */}
                <div className="text-sm">
                  <span className="font-semibold">Created At:</span>{" "}
                  {new Date(location.state?.createdAt).toLocaleString()}
                </div>
                <div className="text-sm">
                  <span className="font-semibold">Updated At:</span>{" "}
                  {new Date(location.state?.updatedAt).toLocaleString()}
                </div>

              </div>
              {/* Map Placeholder */}
              <div className="w-full h-48 mt-4 rounded-lg overflow-hidden">
                <a target='_black' href={`https://www.google.com/maps/place/@${location.state?.location?.latitude},${location.state?.location?.longitude},15z/data=!3m1!4b1!4m5!3m4!1s0x0:0x0!8m2!3d${location.state?.location?.latitude}!4d${location.state?.location?.longitude}`}>
                  <img
                    src="https://imgs.search.brave.com/4c6r-6jxiDnGSpQv-zkvRYcaPr1bAT2kgDwLgqZ2GR8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvY2l0eS10b3At/dmlldy1hYnN0cmFj/dC1iYWNrZ3JvdW5k/LWZsYXQtc3R5bGUt/dmVjdG9yLWlsbHVz/dHJhdGlvbi1pc29s/YXRlZC1ncHMtbWFw/LW5hdmlnYXRpb24t/b3duXzc1Mzk0My00/NDkuanBnP3NlbXQ9/YWlzX2h5YnJpZCZ3/PTc0MA"
                    alt="Map preview"
                    className="w-full h-full object-cover cursor-pointer"
                  />
                </a>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between gap-3 mt-4 items-center">
                <div className="flex gap-7 ">
                  {location.state.media.length > 0 &&
                    location.state.media?.map((item) => <ImageComponent url={item} />
                  )}

                </div>

                <div className="space-x-3">
                  <Button variant="outline" size="lg">
                    <NavLink to={`/reports/edit/${location.state?._id}`} state={location.state}> <Edit2/> </NavLink>
                  </Button>
                  <AlertDialog >
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="lg">
                       <DeleteIcon/>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your report
                          and remove your report data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteReport(location.state?._id, dispatch, navigate)}>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>

              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

export default Report
