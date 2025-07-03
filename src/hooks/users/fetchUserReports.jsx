import axios from '../../api/axios' 
import {setReports} from '../../redux/reducers/report.reducer'

export const fetchUserReports = async (dispatch) => {
    try {
      const res = await axios.get("reports/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      })
      dispatch(setReports(res.data.data))
    } catch (err) {
      console.log(err)
      dispatch(setReports(null))
    }
  }
