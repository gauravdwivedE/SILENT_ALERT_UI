import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'

const IsAdmins = ({children}) => {
    const { user } = useSelector((state) => state.loggedInUser)
    const allowedRoles = ['admin', 'superAdmin', 'inspector'];

    const navigate = useNavigate()
    
    useEffect(()=> {
         if(!allowedRoles.includes(user?.role)){
             navigate("/")
            toast.success("Invalid operation") 
         }
    },[])
  
  return (
    <>
     {children} 
    </>
  )
}

export default IsAdmins
