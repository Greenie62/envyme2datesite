import React from 'react'
import {FaArrowLeft} from "react-icons/fa"

const UserProfile = ({pages,setPages}) => {
    return (
        <div className="userProfileContainer">
            <h3>Users Profile</h3>
            <FaArrowLeft onClick={()=>setPages(1)}/>
            <h5>Account active since:Jan. 12 2021</h5>
            <h5>Time LoggedOn:{Math.random() * 1000 | 0} hours.</h5>
            <div className="boostBoxDiv">
                <h3>Up your Chances...</h3>
                <h3>With some PowerUps</h3>
            </div>
        </div>
    )
}

export default UserProfile
