import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import Nav from "../components/Nav"
import { useNavigate, useLocation } from "react-router-dom"
import axios from "../api/axios"
import { toast } from "sonner"
import ImageComponent from '../components/ImageComponent';
import { CheckCircleIcon, XCircleIcon } from "lucide-react"
import { FetchLocation } from '../hooks/users/FetchLocation';

const EditReport = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [currLocation, setCurrLocaction] = useState()
    
  useEffect(() => {
    if (!location.state?._id && !location.state?.status) {
      navigate("/")
    }
  }, [])
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      type: location.state?.type,
      description: location.state?.description,
      latitude: currLocation ? currLocation.latitude : location.state?.location?.latitude,
      longitude: currLocation ? currLocation.longitude : location.state?.location?.longitude
    }
  })
  
  const onSubmit = async (data) => {
    const mediaFiles = [data.media1, data.media2, data.media3, data.media4].filter(Boolean);
    const formatted = {
      type: data.type,
      description: data.description,
      location: {
        latitude: parseFloat(data.latitude),
        longitude: parseFloat(data.longitude),
      },
      media: mediaFiles,
    }
    try {
      const res = await axios.put(`/reports/${location.state?._id}`, formatted, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
      })

      if (res.status == 200) {
        toast.success("successfully updated")
        navigate("/reports")
      }
    } catch (err) {
      console.log(err);

    }
  }

  const getLocation = async () => {
    const location =  FetchLocation()
    setCurrLocaction(location)
  }

  return (
    <>
      <Nav />
      <div className="min-h-[90vh] flex items-center justify-center px-4">
        <div className="w-full max-w-xl p-8 rounded-2xl shadow-xl border border-white/20 backdrop-blur-xl bg-white/30 dark:bg-slate-800/30 space-y-6">
          <h2 className="text-2xl font-semibold text-center text-slate-800 dark:text-white">
            Submit a Crime Report
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Type Select */}
            <div>
              <Label htmlFor="type">Type of Crime</Label>
              <select
                id="type"
                {...register("type", { required: "Crime type is required" })}
                className="w-full mt-1 p-2 rounded-md bg-white/60 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
              >
                <option value="">Select a type</option>
                <option value="murder">Murder</option>
                <option value="robbery">Robbery</option>
                <option value="assault">Assault</option>
                <option value="vandalism">Vandalism</option>
                <option value="theft">Theft</option>
                <option value="other">Other</option>
              </select>
              {errors.type && (
                <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="What happened?"
                rows={4}
                {...register("description", { required: "Description is required" })}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            {/* Latitude & Longitude */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="description" className="my-3">Location</Label>
                <div className="flex">
                  <Button variant="outline" type="button" onClick={getLocation}>Update to Current location</Button>
                  {currLocation ?
                  
                      <Button variant="outline"><CheckCircleIcon className="text-green-600" /></Button>
                      :
                      <Button type="button" variant="outline"><XCircleIcon className="text-red-600" /></Button>
                    
                  }

                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  id="latitude"
                  type="hidden"
                  step="any"
                  placeholder="e.g. 90.000"
                  {...register("latitude", {
                    valueAsNumber: true,
                  })}
                />
                {errors.latitude && (
                  <p className="text-red-500 text-sm mt-1">{errors.latitude.message}</p>
                )}
              </div>

              <div className="flex-1">

                <Input
                  id="longitude"
                  type="hidden"
                  step="any"
                  placeholder="e.g. 10.000"
                  {...register("longitude", {
                    valueAsNumber: true,
                  })}
                />
                {errors.longitude && (
                  <p className="text-red-500 text-sm mt-1">{errors.longitude.message}</p>
                )}
              </div>
            </div>

            {/* Media Upload (4 Optional Boxes) */}
            <div>
              <Label>Uploaded Media</Label>
              <div className="flex gap-7 mt-2">
                  {location.state?.media?.length > 0 ?
                    location.state.media?.map((item) => <ImageComponent url={item} />
                  )  : <p className="text-red-500 text-sm">No media uploaded</p>}
              </div>
            </div>
            <Button type="submit" className="w-full">
              Submit Report
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}

export default EditReport
