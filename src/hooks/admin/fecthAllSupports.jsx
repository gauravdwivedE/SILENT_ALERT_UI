import axios from '../../api/axios' 
 import {setSupport} from '../../redux/reducers/support.reducer'

export const fetchAllSupports = async (dispatch) => {
    try {
      const res = await axios.get("/supports", {
        headers:{
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      })
      if(res.status == 200){}
        dispatch(setSupport(res.data.support))

    } catch (err) {
       dispatch(setSupport(null))
    }
  }
