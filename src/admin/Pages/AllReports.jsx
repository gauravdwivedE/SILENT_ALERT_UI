import React, { useEffect, useState } from "react"
import Nav from "../../components/Nav"
import { Button } from "@/components/ui/button"
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllReports } from "../../hooks/admin/fetchAllReports";
import { EyeIcon } from "lucide-react";
import { TiLocation } from "react-icons/ti";
import Skeleton from "react-loading-skeleton";


const AllReports = () => {
  const { reports } = useSelector((state) => state.reports);
  const dispatch = useDispatch();

  const [nameSearch, setNameSearch] = useState("");
  const [dateSearch, setDateSearch] = useState("");
  const [reportType, setReportType] = useState("");
  const [reportStatus, setReportStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllReports(dispatch, setLoading);
  }, []);

  const filteredReports = reports?.filter((report) => {
    const nameMatch = report.user?.name?.toLowerCase().includes(nameSearch.toLowerCase());
    const dateMatch = dateSearch
      ? new Date(report.createdAt).toLocaleDateString() === new Date(dateSearch).toLocaleDateString()
      : true;
    const typeMatch = reportType ? report.type?.toLowerCase() === reportType.toLowerCase() : true;
    const statusMatch = reportStatus ? report.status?.toLowerCase() === reportStatus.toLowerCase() : true;

    return nameMatch && dateMatch && typeMatch && statusMatch;
  });


  return (
    <>
      <Nav />
      <div className="min-h-[90vh] px-4 py-10 flex justify-center items-start transition-all">
        <div className="w-full max-w-6xl bg-white/30 dark:bg-slate-800/30 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/20">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-white px-6 pt-6 pb-2">
            Crime Reports
          </h2>

          {/* Filter Inputs */}
          <div className="flex flex-col sm:flex-row gap-4 px-6 pb-4">
            <input
              type="text"
              placeholder="Search by user's name"
              value={nameSearch}
              onChange={(e) => setNameSearch(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
            <input
              type="date"
              value={dateSearch}
              onChange={(e) => setDateSearch(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="">All</option>
              <option value="murder">Murder</option>
              <option value="robbery">Robbery</option>
              <option value="assault">Assault</option>
              <option value="vandalism">Vandalism</option>
              <option value="theft">Theft</option>
              <option value="other">Other</option>
            </select>
            <select
              value={reportStatus}
              onChange={(e) => setReportStatus(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="investigating">Investigating</option>
              <option value="resolved">Resolved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-slate-700 dark:text-slate-200">
              <thead className="text-xs uppercase bg-white/20 dark:bg-slate-700/40">
                <tr>
                  <th className="px-6 py-3">User</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Description</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Created At</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ?
                 [1,2,3,4,5].map((idx)=> <tr key = {idx} >    
                 <td className="px-4 py-3"><Skeleton width={80}/></td>
                 <td className="px-5 py-3"><Skeleton /></td>
                 <td className="px-5 py-3"><Skeleton width={250}/></td>
                 <td className="px-5 py-3"><Skeleton width={80}/></td>
                 <td className="px-5 py-3"><Skeleton width={150}/></td>
                 <td className="px-5 py-3"><Skeleton width={100}/></td>
                </tr> )  
                : 
                filteredReports && filteredReports.length > 0 ? (
                  filteredReports.map((report, idx) => (
                    <tr
                      key={idx}
                      className={`${idx % 2 === 0 ? "bg-white/20 dark:bg-slate-800/20" : ""
                        } hover:bg-white/60 dark:hover:bg-slate-700/30 transition`}
                    >
                      <td className="px-6 py-4">{report.user?.name || "Unknown"}</td>
                      <td className="px-6 py-4 capitalize">{report.type}</td>
                      <td className="px-6 py-4 capitalize">{report.description}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded w-24 capitalize block text-center text-white text-xs ${report.status === "pending"
                              ? "bg-yellow-500"
                              : report.status === "accepted"
                                ? "bg-green-500"
                                : report.status === "investigating"
                                  ? "bg-blue-500"
                                  : report.status === "resolved"
                                    ? "bg-purple-500"
                                    : report.status === "rejected"
                                      ? "bg-red-500"
                                      : "bg-gray-500"
                            }`}
                        >
                          {report.status}
                        </span>

                      </td>
                      <td className="px-6 py-4">
                        {new Date(report.createdAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <Button variant="outline" size="sm">
                          <NavLink to={`/admin/reports/${report._id}`} state={{ report }}> <EyeIcon/></NavLink>
                        </Button>
                        { (report?.location?.latitude && report?.location?.latitude) ? 
                        <Button variant="outline" size="sm">
                          <a target='_black' href={`https://www.google.com/maps/place/@${report?.location?.latitude},${report?.location?.longitude},15z/data=!3m1!4b1!4m5!3m4!1s0x0:0x0!8m2!3d${report?.location?.latitude}!4d${report?.location?.longitude}`}>
                         <TiLocation /> </a>      
                        </Button>
                        :  
                        <Button size="sm" className="bg-gray-200 hover:bg-gray-200 cursor-not-allowed">  <TiLocation />  </Button>
                        } 
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-slate-500">
                      No reports found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default AllReports;
