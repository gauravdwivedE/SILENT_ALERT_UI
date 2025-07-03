import React, { useState } from 'react'
import Skeleton from 'react-loading-skeleton'

const ImageComponent = ({url}) => {
    const [loading, setLoading] = useState(true)    
  return (
    <>
     <a target='_blanck' className={`${loading ? "hidden" : "block"} transition-all`} href={`${url}`}><img className = {`transition-all w-18 h-20 object-cover rounded  ${loading ? "hidden" : "block"}`} src={`${url}`}
     onLoad={() => setLoading(false)}/>  </a>
     
     {loading && <div className='w-18 h-20'><Skeleton height={80}/></div>}
   </>
  )
}

export default ImageComponent
