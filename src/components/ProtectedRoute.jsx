import axios from '../api/axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { setUser } from '../redux/reducers/auth.reducer'
import { useDispatch, useSelector } from 'react-redux'

const ProtectedRoute = ({children}) => {
    const dispatch = useDispatch()
    
    const getLoggedInUser = async () => {
      try {
        const res = await axios.get("/users/login", {headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }})
        dispatch(setUser(res.data.user))
      } catch (err) {
        dispatch(setUser(null))
        navigate("/login")
      }
    }

    const navigate = useNavigate()
    
    useEffect(() => {
        const token = localStorage.getItem("authToken")
        if(!token){
          toast.error("login first")
          dispatch(setUser(null))
          navigate("/login")
        }else{
           getLoggedInUser()
        }

    },[])
  return (
    <>
    
     {children} 
    </>
  )
}

export default ProtectedRoute
