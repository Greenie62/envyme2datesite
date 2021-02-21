import React, {useState} from 'react'
import LoginCard from "./LoginCard"
import LoginAd from "./LoginAd"
import CreateAccount from "./CreateAccount"

const LoginBody = (props) => {
    const [pages,setPages] = useState(0)

    switch(pages){


        case 0:
            return(
                <div className="loginBody">
                <LoginAd pages={pages} setPages={setPages}/>
                </div>
            )

        case 1:
            return(
                <div className="loginBody">
                <LoginCard authUser={props.authUser}
                           pages={pages} 
                           setPages={setPages}
                           {...props}/>
                </div>
                )
        case 2:
            return(
                <div className="loginBody">
                <CreateAccount authUser={props.authUser}
                pages={pages} 
                setPages={setPages}
                {...props}/>
                </div>
            )

        default:
            return "Error, unknown page"
            
    }
    // return (
    //     <div className="loginBody">
    //         <LoginCard authUser={props.authUser} {...props}/>
    //         <LoginAd/>
    //         <CreateAccount authUser={props.authUser} {...props}/>
    //     </div>
    // )
}

export default LoginBody
