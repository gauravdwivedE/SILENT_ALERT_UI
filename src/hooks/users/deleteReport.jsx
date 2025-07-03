import axios from '../../api/axios' 
import { toast } from 'sonner';
import { fetchUserReports } from './fetchUserReports';

 export const deleteReport = async(id, dispatch, navigate) => {
    try {
      const res = await axios.delete(`/reports/${id}`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
      })
      if(res.status == 200){
        fetchUserReports(dispatch)
        toast.success(res.message || " Report deleted")
        navigate("/reports")
      }
    } 
    catch (err) {
      console.log(err);
    }
  }
  