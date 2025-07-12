import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle } from "lucide-react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import Skeleton from 'react-loading-skeleton';

const ContactSupport = () => {
  const [support, setSupport] = useState(null);
  const [loading, setLoading] = useState(true)

  const location = useLocation()
  const userId = location.state;
  const navigate = useNavigate()

  useEffect(() => {
    if (!userId) {
      return navigate("/")
    }
    const getSupport = async () => {
      try {
        const res = await axios.get("/supports/users", {
          headers: {
            Authorization: `Beare ${localStorage.getItem("authToken")}`
          }
        })
        setSupport(res.data.support)
      }
      catch (err) {
        console.log(err);
      }
      finally {
        setLoading(false)
      }
    }
    getSupport()
  }, [])

  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/supports", data, {
        headers: {
          Authorization: `Beare ${localStorage.getItem("authToken")}`
        }
      })
      if (res.status == 201)
        setSupport(res.data.support)

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-lg  p-6 rounded-2xl shadow-md">
        <CardContent>
          <div className="space-y-6 text-gray-800 dark:text-white">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-3xl font-bold text-red-600">Contact Support</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                We're here to help with your Silent Alert account.
              </p>
            </div>

            {/* Submission Message */}
            {loading
             ?<div className='space-y-32'> <Skeleton width={70}/> <Skeleton height={100}/>  <Skeleton height={10} width={250} className='my-5'/> <Skeleton height={40}/> </div>
             : support ? (
              <div className="text-center space-y-2">
  {support.status === "pending" && (
    <>
      <p className="text-yellow-500 font-medium flex items-center justify-center gap-2">
        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
          />
        </svg>
        Request submitted and pending review.
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        You’ll receive a decision via email.
      </p>
    </>
  )}

  {support.status === "rejected" && (
    <>
      <p className="text-red-600 font-medium flex items-center justify-center gap-2">
        ❌ Your unblock request is rejected.
      </p>
      <p className="text-[12px] text-gray-500 dark:text-gray-400">
      If you believe this was a mistake, email us at support@silentalert.app
      </p>
    </>
  )}
</div>

            ) :  (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Message Field */}
                <div>
                  <label className="block text-sm font-medium mb-1">Message</label>
                  <div className="relative">
                    <MessageCircle className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                    <Textarea
                      placeholder="Describe your issue or question..."
                      className="pl-9 pt-3 min-h-[100px]"
                      {...register("message", { required: "Message is required" })}
                    />
                  </div>
                  {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
                </div>

                {/* Reference ID */}
                <p className="text-xs text-gray-400 mt-2">
                  Reference ID: <span className="font-medium">{userId}</span>
                </p>

                {/* Submit Button */}
                <Button type="submit" className="w-full mt-2">
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactSupport;
