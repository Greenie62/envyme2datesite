import React, {useEffect, useState} from "react"
// import {GlobalContext} from "./context/GlobalState"
import {GlobalProvider} from "./context/GlobalState"
import {Login,Dashboard} from "./pages"
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom"
import {ApolloProvider} from "react-apollo"
import ApolloClient from "apollo-boost"

import "./App.css"


let client = new ApolloClient({
    uri:"http://localhost:3002/graphql"
})



const App = ()=>{
    const [isAuth,setIsAuth] = useState(false)
 

    useEffect(()=>{

        fetch("http://localhost:3002/test")
        .then(res=>res.json())
        .then(res=>{
            console.log(res)
        })
      
    },[])


    const authUser=()=>{
        setIsAuth(!isAuth)
    }


    return(
        <GlobalProvider>
         
        <ApolloProvider client={client}>
            <div className="app">
       
                <Router>
                    {!isAuth ? <Redirect to="/login"/> : <Redirect to="/dashboard"/>}
                    <Route exact path="/login" render={(props)=><Login {...props} authUser={authUser}/>}/>
                    <Route path="/dashboard" render={(props)=><Dashboard authUser={authUser} {...props}/>}/>
                </Router>
            </div>
        </ApolloProvider>
        </GlobalProvider>
    )
}



export default App;