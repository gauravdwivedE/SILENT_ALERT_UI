import React, { use, useState } from 'react';
import Nav from '../components/Nav';
import { LogOut, Mail, Phone, UserCircle, PencilLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSelector, useDispatch} from 'react-redux';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from 'react-hook-form';
import axios from '../api/axios';
import { setUser } from '../redux/reducers/auth.reducer';
import { toast } from 'sonner';

const Profile = () => {
  const [loading, setLoading] = useState(false)
  const {user} = useSelector((state) => state.loggedInUser)
  const {handleSubmit, register} = useForm()
  const dispatch = useDispatch()

  async function submit(data){
   
    try {
      const res = await axios.put("/users", data, {headers:{
        Authorization : `Bearer ${localStorage.getItem('authToken')}`
      }})

      if(res.status == 200){
        dispatch(setUser(res.data.user))
        toast.success("Profile updated")
 
      }
    } catch (err) {
      console.log(err);
      
    }
  }

  return (
    <>
      <Nav />
      <main className="min-h-screen py-20 px-6 ">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-10">Profile</h1>

          {/* Profile Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="bg-white/30 backdrop-blur-md border border-white/20 rounded-2xl p-6 flex flex-col items-center text-center shadow-xl">
              <img src={`${user.image}`} className='rounded-full my-2 object-cover w-28 h-28' />
              <h2 className="text-xl font-semibold ">{user.name}</h2>
              <p className='mb-6 text-gray-500 text-[13px]'>{user._id}</p>
              
            </div>

            {/* Details */}
            <div className="md:col-span-2 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Personal Information</h3>
                <button className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1" >
                <Dialog >
                      <DialogTrigger asChild>
                        <span className='flex gap-1 items-center'> <PencilLine className="w-4 h-4" /> Edit</span>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={handleSubmit(submit)}>
                        <DialogHeader>
                          <DialogTitle>Edit profile</DialogTitle>
                          <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re
                            done.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                          <div className="grid gap-3">
                            <Label htmlFor="name-1">Name</Label>
                            <Input id="name-1" {...register('name')} defaultValue={`${user?.name}`} required/>
                          </div>
                          <div className="grid gap-3">
                            <Label htmlFor="username-1">Phone</Label>
                            <Input id="username-1"  {...register('phone')} defaultValue={`${user?.phone ? user.phone :""}`} />
                          </div>
                        </div>
                        <DialogFooter className="mt-3">
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                      </DialogContent>
                </Dialog>
                 
                </button>
              </div>
 
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 /90 text-sm">
                <div>
                  <label className="block /50 mb-1">Full Name</label>
                  <div className="bg-white/30 px-4 py-3 rounded-lg">{user.name}</div>
                </div>
                <div>
                  <label className="block /50 mb-1">Email</label>
                  <div className="bg-white/30 px-4 py-3 rounded-lg flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {user.email}
                  </div>
                </div>
                <div>
                  <label className="block /50 mb-1">Phone</label>
                  <div className="bg-white/30 px-4 py-3 rounded-lg flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {user.phone ? user.phone :"____________" }
                  </div>
                </div>
                <div>
                  <label className="block /50 mb-1">Role</label>
                  <div className="bg-white/30 px-4 py-3 rounded-lg">{user.role}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
