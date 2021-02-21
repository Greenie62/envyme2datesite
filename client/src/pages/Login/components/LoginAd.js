import React from 'react'
import Testimonials from "./Testimonials"


const LoginAd = ({pages,setPages}) => {
    return (
        <div className="loginAdCard" onClick={()=>setPages(pages+1)}>
            <h1>Welcome to the hottest site on the net</h1>
                <Testimonials/>
            <h5 className="h5Click">Click-to-Enter</h5>
        </div>
    )
}

export default LoginAd
