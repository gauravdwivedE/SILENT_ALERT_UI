import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'

const AuthorizationRoute = ({ children, allowedRoles }) => {
    const { user } = useSelector((state) => state.loggedInUser)
    const navigate = useNavigate()

    useEffect(()=> {
         if(!allowedRoles.includes(user?.role)){
             navigate("/")      
         }
    },[])
  
  return (
    <>
     {children} 
    </>
  )
}

export default AuthorizationRoute

