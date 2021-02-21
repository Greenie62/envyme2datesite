import React, {useState, useEffect, useCallback} from 'react'
import data from "../../../assets/testimonial.json";

 
const Testimonials = () => {
        const [counter,setCounter] = useState(0);
        const [running,setRunnning] = useState(false)

     


        const updateTestimonial=useCallback(()=>{
            console.log('updating testimonial',counter)
            // if(counter > data.length-1){
            //     setCounter(0)
            // }
            let temp = counter;
            temp++;
            console.log("Temp: " + temp)
            setCounter(temp);
        setTimeout(updateTestimonial,1000)

          
        },[])


    return (
        <div className="testimonialRow">
            <div className="testimonialCard">
                <h3 className="testimonialh3">
                    {data[Math.random() * data.length | 0].message}
                </h3>
                <h4 className="testimonialh4">
                    By:{data[Math.random() * data.length | 0].name}
                </h4>
            </div>
            
        </div>
    )
}

export default Testimonials
