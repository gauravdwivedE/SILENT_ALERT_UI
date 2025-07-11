import { toast } from 'sonner'
import axios from '../../api/axios' 
import {setReports} from '../../redux/reducers/report.reducer'

export const fetchUserReports = async (dispatch, setLoading) => {
  setLoading &&  setLoading(true)
    try {
      const res = await axios.get("reports/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      })
      dispatch(setReports(res.data.data))
    } catch (err) {
      if(err.status != 429){
      dispatch(setReports(null))}
      toast.error(err?.response?.data?.error || err?.response?.data || err.message)
    }finally{
      setLoading &&  setLoading(false)
    }
  }
