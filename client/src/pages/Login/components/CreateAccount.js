import React, {useState} from 'react'
import {GlobalContext} from "../../../context/GlobalState"



const CreateAccount = (props) => {
        const [username,setUsername] = useState("");
        const [password, setPassword] = useState("");
        const [confirmPW, setConfirmPW] = useState("");
        const [age, setAge] = useState("");
        const [email,setEmail] = useState("");
        const [interestedIn,setInterestedIn] = useState("");
        const [gender,setGender] = useState("");
        const [error, setError] = useState("")


        const [agesArr, setAgesArr] = useState(()=>{
            let ages = [];
            for(let i=16;i<95;i++){
                    ages.push(i)
                }
                // console.log(ages)
            return ages;
        })
 

        const registerUser=()=>{

            if(password !== confirmPW){
                setError("Passwords don't match!");
                setTimeout(()=>{
                    setError("")
                },2000)
            }

            const user={
                username,
                email,
                password,
                age:parseInt(age),
                gender,
                interestedIn,
            }
            console.log(user)
            userRegister(user)
            cleanState()
            
        }

        const userRegister=(user)=>{

            fetch(`http://localhost:3002/register`,{
                method:"POST",
                headers:{
                    'Content-Type':"application/json"
                },
                body:JSON.stringify(user)
            })
            .then(res=>{
          
                console.log(res)
                if(res.status === 200){
       
                props.authUser()
                }
            })
        }


        const cleanState=()=>{
            setUsername("")
            setPassword("")
            setEmail("")
            setAge("")
            setInterestedIn("")
            setGender("")
        }


    return (
           <div className="createAccountCard">
            <h4>Just a couple basic questions and then...</h4>
            <h5>🕺💃🏻😁</h5>
            <h3 onClick={()=>props.setPages(props.pages-1)} className="h3Click">Back</h3>
            <div className="formRow">
            <div className="formCol">
                <label htmlFor="username">Username:</label>
                <br/>
                <input className="loginInput" type="text" name="username" id="username" placeholder="username..." value={username} onChange={(e)=>setUsername(e.target.value)} autoComplete="off"/>
            </div>
            <div className="formCol">
                    <label htmlFor="email">Email:</label>
                        <input className="loginInput" type="text" name="email" id="email" placeholder="email..." value={email} onChange={(e)=>setEmail(e.target.value)} autoComplete="off"/>
                </div>
            </div>
            <div className="formRow">
                <div className="formCol">
                    <label htmlFor="password">Password:</label>
                        <input className="loginInput" type="text" name="password" id="password" placeholder="password..." value={password} onChange={(e)=>setPassword(e.target.value)} autoComplete="off"/>
                </div>
                <div className="formCol">
                    <label htmlFor="confirmPW">Confirm:</label>
                        <input className="loginInput" type="text" name="confirmPW" id="confirmPW" placeholder="confirm password..." value={confirmPW} onChange={(e)=>setConfirmPW(e.target.value)} autoComplete="off"/>
                </div>
            </div>
            <div className="formRow">
                <div className="formCol">
                    <label htmlFor="interestedIn">Interested In:</label>
                        <select name="interestedIn"
                                id="interestedIn"
                                className="loginInput" 
                                value={interestedIn} 
                                onChange={(e)=>setInterestedIn(e.target.value)}>
                       <option value="">What interests ya?</option>
                        <option key="men" value="men">Men</option>
                        <option key="women" value="women">Women</option>
                        <option key="both" value="both">Both</option>
                        </select>
                </div>
            <div className="formCol">
                <div className="selectCol">
                    <label htmlFor="gender">Gender:</label>
                        <select name="gender" 
                                id="gender" 
                                className="loginInput"
                                value={gender} 
                                onChange={(e)=>setGender(e.target.value)} 
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    </select>
                 </div>
                 <div className="selectCol">
                    <label htmlFor="age">Age:</label>
                    <br/>
                        <select name="age" 
                                id="age" 
                                className="loginInput"
                                value={age} 
                                onChange={(e)=>setAge(e.target.value)} 
                                >
                                    {agesArr.map(a=>(
                                        <option key={a} value={a}>{a}</option>
                                    ))}
                                    </select>
                 </div>
            </div>
            </div>
            <button onClick={registerUser} className="createActBtn">Create</button>
<h4 className="errorh4">{error} </h4>
            
        </div>
    )
}

export default CreateAccount
