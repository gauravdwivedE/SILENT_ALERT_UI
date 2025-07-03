import React from "react"
import {  BellIcon, Menu } from "lucide-react"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../redux/reducers/auth.reducer"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

const Nav = () => {
  const {user} = useSelector((state) => state.loggedInUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  
  const handleLogout = () => {
        localStorage.clear()
        dispatch(setUser(null))
        toast.success("logout successful")
        navigate("/")
  }
    
  return (
    <header className="sticky top-0 z-50 text-gray-700 backdrop-blur-[8px]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-16">
        {/* Logo */}
        <NavLink to="/" className="text-xl font-bold text-primary">
          Silent alert
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-12 text-sm font-medium">
         <NavLink to="/" className="hover:text-primary">Home</NavLink>

         {(user?.role == 'user' || !user ) &&  <NavLink to="/reports/create" className="hover:text-primary">Report a Crime</NavLink>}
         
         {(user?.role == 'user' || !user) && <NavLink to="/reports" className="hover:text-primary">View Reports</NavLink>}
          
          {(user && user?.role != 'user') && (<>
          <NavLink to="/admin/reports" className="hover:text-primary">View Reports</NavLink>
          <NavLink to="/admin/supports" className="hover:text-primary"> Supports</NavLink></>)}

        </nav>

        {/* Right: Avatar */}
        <div className="flex items-center gap-7">
          <div>
            <BellIcon className="w-[22px]"/>
          </div>
         {
          user ?
         <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="w-10 h-10 cursor-pointer">
              {user && <img src={`${user?.image}`}  />}
              <AvatarFallback>{user && user?.name[0] }</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="p-4">
            <NavLink to ="/profile"><DropdownMenuItem>Profile</DropdownMenuItem></NavLink>
            {user && user.role == 'admin' && <NavLink to ="/admin/settings"> <DropdownMenuItem>Settings</DropdownMenuItem> </NavLink>}
            <DropdownMenuItem onClick = {handleLogout}>logout </DropdownMenuItem>
 
          </DropdownMenuContent>
        </DropdownMenu>
          :
          <NavLink to = "/login" className='px-6 py-2 bg-orange-200 rounded hover:bg-orange-300 transition-all active:scale-90'>Login</NavLink>
        }
          

          {/* Mobile Menu Trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <nav className="m-8 mt-16 flex flex-col gap-4 text-base font-medium">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/reports">Reports</NavLink>
                <NavLink to="/login">Login</NavLink>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  )
}

export default Nav
