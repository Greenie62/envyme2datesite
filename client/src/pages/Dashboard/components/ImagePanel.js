import React, {useState} from 'react'
import {FaArrowLeft, FaArrowRight} from "react-icons/fa"
import InfoCard from "./InfoCard"


const ImagePanel = ({data,counter,setCounter}) => {
    const [message,setMessage] = useState("");


    const nextPic=()=>{

        if(counter < data.length){
            toggleClass()
            setCounter(counter+1)
        }
        else{
            toggleMsg("Sorry, thats all the matches we have for you at this time! :(")
        }
    }


    const prevPic=()=>{

        if(counter > 0){
            toggleClass()
            setCounter(counter-1)
        }
        else{
            toggleMsg("Sorry, thats all the matches we have for you at this time! :(")
        }
    }


    const toggleClass=()=>{

        let img = document.querySelector(".userPic");

        img.classList.add('flash');
        setTimeout(()=>{
            img.classList.remove("flash")
        },2000)
    }


    const toggleMsg=(msg)=>{
        setMessage(msg);

        setTimeout(()=>{
            setMessage("")
        },2000)
    }

    
    return (
        <div className="imagePanelCol">
            <div className="imagePanelCard">
           
            <img src={data[counter].picture.large} alt="img" className="userPic"/>
            <InfoCard profile={data[counter]}/>
            
            <div className="leftArrowBtn">
                <h1 onClick={prevPic}><FaArrowLeft/></h1>
            </div>
             <div className="rightArrowBtn">
                <h1 onClick={nextPic}><FaArrowRight/></h1>
            </div>
            <div className="messageDiv">
            <h4 className='h4message'>{message}</h4> 
            </div>
            </div>
        </div>
    )
}

export default ImagePanel
