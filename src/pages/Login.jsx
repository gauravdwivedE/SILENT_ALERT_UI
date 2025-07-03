import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FcGoogle } from "react-icons/fc"
import Nav from '../components/Nav';
import { useGoogleLogin } from "@react-oauth/google"
import axios from "../api/axios"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom"
import { setUser } from '../redux/reducers/auth.reducer'
import { useDispatch } from "react-redux"

const Login = () => {
  const {register, handleSubmit, formState: { errors }, reset} = useForm()
  const [loading, setLoading] = useState(false)
  const [googleloading, setGoogleLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const getLogin = (res) => {    
    toast.success(res?.data?.message || "Login successful")
    localStorage.setItem("authToken", res.data.token)
    dispatch(setUser(res.data.user))
    reset()
    navigate("/")
  }

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const res = await axios.post("users/login", data)
        getLogin(res)

    } catch (err) {
      toast.error(err?.response?.data || err?.message)
    }
    finally{
      setLoading(false)
    }
    
  }

  const result = async (data) => {
    setGoogleLoading(true)
    try {
      if(!data.access_token){
        return console.log("Error while singing")
      }
      const res = await axios.post('users/oauth', {accessToken: data.access_token})

      getLogin(res)

    } catch (err) {
      console.log(err);
    }
    finally{
      setGoogleLoading(false)
    }
    
  }

  const handleGoogleSignIn = useGoogleLogin({
    onSuccess: result,
    onError: result
  });

  return (
    <>
    <Nav/>
    
    <div className="min-h-[90vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl border border-white/20 backdrop-blur-xl bg-white/30 dark:bg-slate-800/30 space-y-6">
        <h2 className="text-2xl font-semibold text-center text-slate-800 dark:text-white">
          Sign in to Silent Alert
        </h2>

       
        
        {/* Email/Password Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Password must be at least 4 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full">
            {loading ? <span className="animate-spin"> <Loader2/></span> : 'Login'}
          </Button>
        </form>
        <div className="flex items-center gap-2 text-slate-500 text-sm justify-center">
          <div className="h-px w-16 bg-slate-300 dark:bg-slate-600"></div>
          or
          <div className="h-px w-16 bg-slate-300 dark:bg-slate-600"></div>
        </div>
          {/* Google Sign-In Button */}
        <Button
          onClick={handleGoogleSignIn}
          variant="outline"
          className="w-full flex items-center justify-center gap-2 bg-white/70 hover:bg-white dark:bg-slate-700 dark:hover:bg-slate-600"
        >
        <FcGoogle className="text-xl" />
        
        {googleloading ? <span className="animate-spin"> <Loader2/></span> : ' Sign in with Google'}
         
        </Button>
           <p className="text-center hover:text-gray-500"> <NavLink to="/signup">Create account</NavLink></p>
      </div>
    </div>
    </>
  )
}

export default Login
