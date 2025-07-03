import { useEffect } from 'react';
import IndexRouting from './routes/IndexRouting';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

function App() {
  const {user} = useSelector((state) => state.loggedInUser)
  const navigate = useNavigate()
  const location = useLocation()
  
  useEffect(()=>{
    if(location.pathname == '/support') return
    if(user?.isBlocked){
      navigate("/blocked", {state:{userId: user?._id}})
    }
  },[user, location.pathname])
  
  return (
  <>
    <div className="min-h-screen w-full bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100">
      <IndexRouting/>
    </div>
</>
  )
}

export default App
