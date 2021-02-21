import React from "react"
import gql from "graphql-tag"
import {Query} from "react-apollo"


let query = gql`
query Members{
    members{
    username
}
}`


const LoginHeader = () =>{



    return(
        <div className="loginHeader">
            <h1 className="loginHeaderh1">ENVYME</h1>
            {/* <h1 className="loginHeaderh1two">2</h1> */}
            <p className="loginHeader-p">A place for likes, laughs...and maybe even luv.But mostly fun! 😈</p>
            {/* <Query query={query}>
                {({loading,error,data})=>{
                    if(loading)return "Loading..."
                    if(error) return "Error..."
                    if(data){
                        console.log(data)
                        return(
                           <h5 className="loginHeaderh5">{data.members.length} members! </h5>
                                )
                    }
                }}
            </Query> */}
        </div>

    )
}



export default LoginHeader;