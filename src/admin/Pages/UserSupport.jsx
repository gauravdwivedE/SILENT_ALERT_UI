import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSupports } from "../../hooks/admin/fecthAllSupports";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import axios from "../../api/axios";
import { toast } from "sonner";


const UserSupport = () => {
  const dispatch = useDispatch();
  const {supports} = useSelector((state) => state.supports)

  useEffect(() => {
    fetchAllSupports(dispatch);
  }, [dispatch])

  const handleStatusChange = async (status, supportId) => {
    try {
      const res = await axios.patch(`/supports/${supportId}/status`, {status}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
      })
      if(res.status == 200)
          toast.success(res.data.message)
      
    } catch (err) {
      console.log(err);

    }
  }
  return (
    <>
      <Nav />
      <div className="px-4 py-10 max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">User Support Requests</h1>

        {/* {loading && <p>Loading support requests...</p>} */}
        {/* {error && <p className="text-red-600">Error: {error}</p>} */}

        {/* {!loading && supports?.length === 0 && (
          <p className="text-gray-500">No support requests found.</p>
        )} */}

        {supports?.length > 0 && (
          <div className="overflow-x-auto border rounded-lg shadow-sm">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">User ID</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Message</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {supports.map((support) => (
                  <tr key={support._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-4 py-2">{support?.user._id}</td>
                    <td className="px-4 py-2">{support?.user.email}</td>
                    <Popover>
                      <PopoverTrigger asChild>
                        <td className="px-2 cursor-pointer text-blue-500 hover:underline">Read</td>
                      </PopoverTrigger>

                      <PopoverContent
                        className="w-[90vw]  sm:w-[40vw] max-h-[60vh] overflow-y-auto text-sm "
                        align="start"
                        side="right">
                        <p className="font-semibold">User ID {support?.user._id}</p>
                        <div className="p-2 text-gray-800 dark:text-gray-200">
                          {support.message}
                        </div>
                      </PopoverContent>
                    </Popover>


                    <td>
                      <select className={`border-none outline-none`}
                        defaultValue={`${support?.status}`}
                        onChange={(e) => handleStatusChange(e.target.value, support._id)}>
                        <option value="pending">Pending</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default UserSupport;
