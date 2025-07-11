import axios from '../../api/axios' 
import { toast } from 'sonner';
import { fetchUserReports } from './fetchUserReports';

 export const deleteReport = async(id, navigate, setLoading, dispatch) => {
    try {
     setLoading(true)
      const res = await axios.delete(`/reports/${id}`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
      })
      if(res.status == 200){
        toast.success(res.data.message || " Report deleted")
        dispatch && fetchUserReports(dispatch)
        navigate("/reports")
      }
    } 
    catch (err) {
    toast.error(err?.response?.data || err.message)
    }finally{
      setLoading(false)
    }
  }
  