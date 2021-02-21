import React, {useState, useContext} from "react"
import {GlobalContext} from "../../../context/GlobalState"

const LoginCard = (props) =>{
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [msg,setMsg] = useState("")
    const { setAddUser } = useContext(GlobalContext)


    const enterLogin=async()=>{
        

        let user={username,password};

       let response = await fetch('http://localhost:3002/login',{
            method:"POST",
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify(user)
        })
        
        console.log(response)
        if(response.status === 403){
            console.log("Thats not your password")
           flashMsg("Thats not your password!")
        }

        if(response.status === 401){
            flashMsg("No member of that username, try signing up!")
        }

        if(response.status === 200){
            response.json()
            .then(res=>{
                flashMsg(res.msg)
                setTimeout(()=>{
                    props.authUser()
                    props.history.push(`/dashboard?user=${username}`)
                },2500)
            })
        }

        setUsername("");
        setPassword("");


    }


    const flashMsg=(msg)=>{
        setMsg(msg);
        setTimeout(()=>{
            setMsg("")
        },2000)
    }



    return(
    <div className="loginCard">
           <h2 onClick={()=>props.setPages(props.pages-1)} className="closeIcon">X</h2>
           <h4 className="loginMsgh4">{msg}</h4>
           <h3 className="loginCardh3">Welcome Back🔥</h3>
           <p className="loginCard-p">Login with your account info and see if anyones missed you while you've been gone.</p>
           <p className="loginCard-ptwo">PS:<span className='fakeLink'>We have!</span>😍</p>
           <div className="formDiv">
               <h4 className="labelh4">
                   <label htmlFor="loginusername">Username:</label>
                </h4>
                <input type="text" name="username" id="loginusername" placeholder="username..." autoComplete="off" value={username} onChange={(e)=>setUsername(e.target.value)}/>
           </div>
           <div className="formDiv">
               <h4 className="labelh4">
                   <label htmlFor="loginpassword">Password:</label>
                </h4>
                <input type="text" name="password" id="loginpassword" placeholder="password..." autoComplete="off" value={password} onChange={(e)=>setPassword(e.target.value)}/>
           </div>
           <button onClick={()=>props.setPages(props.pages+1)} className="createActBtn">Create Account</button>

           <button className="loginBtn" onClick={enterLogin}>Login</button>
       </div>
    )
}


export default LoginCard