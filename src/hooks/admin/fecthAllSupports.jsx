import { toast } from 'sonner'
import axios from '../../api/axios' 
 import {setSupport} from '../../redux/reducers/support.reducer'

export const fetchAllSupports = async (dispatch, setLoading) => {
    try {
      setLoading(true)
      const res = await axios.get("/supports", {
        headers:{
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      })
      if(res.status == 200){}
        dispatch(setSupport(res.data.support))

    } catch (err) {
       dispatch(setSupport(null))
       toast.error(err.response?.data?.error || err.response?.data || err.message)
    }finally{
      setLoading(false)
    }
  }
