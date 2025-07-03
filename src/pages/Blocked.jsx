import React, { useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useLocation, useNavigate, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/reducers/auth.reducer';

const Blocked = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const userId = location.state?.userId;

  const goToLogin = () => {
    localStorage.clear()
    dispatch(setUser(null))
    navigate("/login")
  }
  useEffect(() => {
    if(!userId){
      navigate("/")
    }
  },[])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="max-w-md w-full rounded-2xl shadow-md border border-red-200 dark:border-red-400">
        <CardContent>
          <div className="flex flex-col items-center gap-4 py-6 text-center">

            {/* App Name */}
            <div>
              <h1 className="text-3xl font-extrabold text-red-600">Silent Alert</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Safety. Silently.</p>
            </div>

            {/* Alert Icon */}
            <AlertTriangle className="w-10 h-10 text-red-500" />

            {/* Blocked Message */}
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">You’ve been blocked</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Your access to <span className="font-medium">Silent Alert</span> has been restricted due to a policy violation or miscellaneous activity.
            </p>

            {/* Block Details */}
            <div className="w-full text-left bg-gray-100 dark:bg-gray-800 p-3 rounded-md text-sm space-y-1">
              <p><span className="font-semibold text-gray-700 dark:text-gray-300">Reference ID:</span> {userId}</p>
            </div>

            {/* Support Button */}
            <NavLink to = "/support" state={userId} className="w-full mt-2">  <Button variant="destructive" className="w-full mt-2">
             Contact Support
            </Button> </NavLink>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              If you believe this was a mistake, email us at <span className="underline">support@silentalert.app</span>
            </p>
            <div className='flex justify-center'>
              <p className=' h-6 w-fit mt-2 text-[15px] cursor-pointer  hover:border-b-[1.5px] hover:border-gray-700' onClick={goToLogin}>Go to Login</p>

            </div>
          </div>

          <div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blocked;
