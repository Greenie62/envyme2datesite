import React, {useContext} from 'react'
import {FaHeart,FaSignOutAlt} from "react-icons/fa"
import {GlobalContext} from "../../../context/GlobalState"

const DashHeader = ({authUser,showLikeMenu,pages,setPages}) => {

    const {user} = useContext(GlobalContext)
    return (
        <div className="dashHeader">
            <h3 onClick={()=>setPages(4)} className="headerh1iconone">
                <FaHeart/>
        <div className={user.likes !== 0 ? "likesAlertDiv" : ""}></div>
        </h3>
        
            <h1 className="dashHeaderh1">
                ENVYME
            </h1>

            <h3 onClick={authUser} className="headerh1icontwo"><FaSignOutAlt/></h3>

        </div>
    )
}

export default DashHeader
