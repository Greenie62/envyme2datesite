import React, {useContext} from 'react'
import {FaArrowLeft} from "react-icons/fa"
import {GlobalContext} from "../../../../context/GlobalState"

const LikesPage = ({pages,setPages}) => {
    const {ourLikes} = useContext(GlobalContext)
    return (
        <div>
            <h1>Likes Pages</h1>
            <FaArrowLeft onClick={()=>setPages(1)}/>
            <ul className='likesList'>
                {ourLikes.length ? ourLikes.map((person,idx)=>(
                    <li key={idx} className='likePersonItem'>
                        <div className="profileImageColumn">
                            <img src={person.picture.thumbnail} alt="image"/>
                        </div>
                        <div className="personInfoColumn">
                            <h5>{person.name.first} {person.name.last}</h5>
                            <h5>{person.dob.age}</h5>
                        </div>
                        <div className="personTrashColumn">
                            <div className="trashIcon">&times;</div>
                        </div>
                    </li>
                )) : "Loading da likes!"}
            </ul>
        </div>
    )
}

export default LikesPage
