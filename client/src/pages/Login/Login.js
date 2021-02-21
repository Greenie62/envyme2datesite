import React from "react"
import { LoginHeader,LoginBody,LoginFooter } from "./components"
import "./Login.css"



const Login = (props) =>{



    return(
        <div className="loginPage">
            <LoginHeader/>

            <LoginBody authUser={props.authUser} {...props}/>
            <LoginFooter/>
        </div>
    )
}


export default Login;