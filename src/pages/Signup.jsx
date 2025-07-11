import React, {useState} from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Nav from '../components/Nav';
import axios from "../api/axios"
import { toast } from "sonner"
import { setUser } from "../redux/reducers/auth.reducer"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Loader2 } from 'lucide-react';

const Signup = () => {
  const { register, handleSubmit, formState: { errors },} = useForm()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async(data) => {
   try {
    setLoading(true)
    const res = await axios.post("/users" ,data)
    if(res.status == 201){
      toast.success("Signup successfull")
      localStorage.setItem('authToken', res.data.token)
      dispatch(setUser(res.data.user))
      navigate("/")
    }
   } catch (err) {
      dispatch(setUser(null))
      toast.error(err?.response?.data?.error || err?.response?.data || err?.message )
   }finally{
    setLoading(false)
   }
  }

  return (

    <>
    <Nav/>
    <div className="min-h-[90vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl border border-white/20 backdrop-blur-xl bg-white/30 dark:bg-slate-800/30 space-y-6">
        <h2 className="text-2xl font-semibold text-center text-slate-800 dark:text-white">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Your full name"
              {...register("name", {
                required: "Name is required",
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

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

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <Button type={`${loading ? "button" : "submit"}`} className="w-full" disabled = {loading}>
            {loading ? <span className="animate-spin"> <Loader2/></span> : 'Sign up'}
          </Button>
        </form>
      </div>
    </div>
    </>
  )
}

export default Signup
