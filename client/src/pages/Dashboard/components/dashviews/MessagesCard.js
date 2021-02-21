import React from 'react'
import {FaArrowLeft} from "react-icons/fa"

const MessagesCard = ({pages,setPages}) => {
    return (
        <div className="messagesContainer">
            <h3>Here are your messages</h3>
            <FaArrowLeft onClick={()=>setPages(1)}/>
            <h5>From - Guest</h5>
        </div>
    )
}

export default MessagesCard
