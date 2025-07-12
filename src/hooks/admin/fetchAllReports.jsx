import { toast } from 'sonner'
import axios from '../../api/axios' 
import {setReports} from '../../redux/reducers/report.reducer'

export const fetchAllReports = async (dispatch, setLoading) => {
    try {
      setLoading(true)
      const res = await axios.get("/reports", {
        headers:{
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      })

      dispatch(setReports(res.data.data))
    } catch (err) {
      if(err.status != 429){
      dispatch(setReports(null))}
      toast.error(err.response?.data?.error || err.response?.data || err.message)
    }finally{
      setLoading(false)
    }

  }
