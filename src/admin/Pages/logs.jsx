import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "../../api/axios";
import { toast } from "sonner";
import Skeleton from "react-loading-skeleton";

const LogPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get("/logs", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        setLogs(res.data.logs);
      } catch (error) {
        console.error("Failed to fetch logs:", error);
        toast.error("Failed to load logs");
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return (
    <>
      <Nav />
      <div className="px-4 py-10 max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">Activity Logs</h1>

         
          <div className="overflow-x-auto border rounded-lg shadow-sm">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">User ID</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Details</th>
                  <th className="px-4 py-3">Timestamp</th>
                 
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {loading ? 
               [1,2,3,4,5].map((idx)=> <tr key = {idx} >    
               <td className="px-3 py-3"><Skeleton width={80}/></td>
               <td className="px-3 py-3"><Skeleton /></td>
               <td className="px-3 py-3"><Skeleton width={80}/></td>
               <td className="px-3 py-3"><Skeleton width={120}/></td>
               <td className="px-3 py-3"><Skeleton width={130}/></td>
              </tr> )
              : logs?.length > 0 ? 
                logs.map((log) => (
                  <tr key={log._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-4 py-2">{log?.user?._id}</td>
                    <td className="px-4 py-2">{log?.user?.email}</td>
                    <td className="px-4 py-2">{log?.user?.name}</td>

                   <td className="px-4 py-2">
                        <div className="overflow-scroll text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                          {log.description}
                        </div>
                     </td>
                     <td className="px-4 py-2">{new Date(log?.createdAt).toLocaleString()}</td>
                    
                  </tr>
                )): <p className="text-center py-6 flex justify-center">No logs found</p>}
              </tbody>
            </table>
          </div>
       
      </div>
    </>
  );
};

export default LogPage;
