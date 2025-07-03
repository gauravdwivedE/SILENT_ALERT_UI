import axios from '../../api/axios' 
import {setReports} from '../../redux/reducers/report.reducer'

export const fetchAllReports = async (dispatch) => {
    try {
      const res = await axios.get("/reports", {
        headers:{
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      })

      dispatch(setReports(res.data.data))
    } catch (err) {
      dispatch(setReports(null))
    }
  }
