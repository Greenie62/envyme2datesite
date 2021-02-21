import React, {useReducer, createContext} from "react"



export const initialState={
    user:{},
    isLoggedIn:false,
    // showLoginCard:false,
    // showRegisterCard:false,
    fakeUsers:[],
    ourLikes:[],
}


export const GlobalContext = createContext(initialState);


const reducer =(state,action)=>{
    console.log('reducer() fired!');

    switch(action.type){

        case "SET_USER":
            console.log(action.payload)
            return{
                ...state,
                user:action.payload
            }

        case "SET_LOGIN":
            console.log(action.payload)
            return{
                ...state,
                isLoggedIn:true
            }

        // case "TOGGLE_LOGIN":
        //     return{
        //         ...state,
        //         showLoginCard:action.payload
        //     }

        // case "SET_REGISTERCARD":
        //     return{
        //         ...state,
        //         showRegisterCard:action.payload
        //     }

        case "POPULATE_FAKEUSERS":
            let ourLikesArr=[];
            for(let i =0;i<action.payload.length;i++){
                if(ourLikesArr.length >= 10){
                    console.log("thats enough");
                    break;
                }
                if(Math.random() > .7){
                    ourLikesArr.push(action.payload[i]);
                }
                console.log(i)
            }

            console.log("OurLikes:",ourLikesArr)
            return{
                ...state,
                fakeUsers:action.payload,
                ourLikes:ourLikesArr
            }

        default:
            return state;
    }
}



export const GlobalProvider = ({children}) =>{

    const [state,dispatch] = useReducer(reducer,initialState);



    // const loginUser=(username,password)=>{
    //     let user = {username,password}
    //     console.log("reducerUser: "user)
    //     let response = await fetch('http://localhost:3002/login',{
    //         method:"POST",
    //         headers:{
    //             'Content-Type':"application/json"
    //         },
    //         body:JSON.stringify(user)
    //     })
        
    //     console.log(response)
    //     if(response.status === 403){
    //         console.log("Thats not your password")
    //        flashMsg("Thats not your password!")
    //     }

    //     if(response.status === 401){
    //         flashMsg("No member of that username, try signing up!")
    //     }

    //     if(response.status === 200){
    //         response.json()
    //         .then(res=>{
    //             flashMsg(res.msg)
    //             setAddUser(username)
    //             setTimeout(()=>{
    //                 props.authUser()
    //                 props.history.push("/dashboard")
    //             },2500)
    //         })
    //     }
    // }






    const setUser=(user)=>{
        console.log("setUserFromLogin: " + user);

        dispatch({
            type:"SET_USER",
            payload:user
        })
    }


    // const loginToggle=(status)=>{
    //     console.log("Status: " + status);

    //     dispatch({
    //         type:"TOGGLE_LOGIN",
    //         payload:status
    //     })
    // }


    // const toggleCreateCard=(status)=>{
    //     console.log("Status: " + status)
    //     dispatch({
    //         type:"SET_REGISTERCARD",
    //         payload:status
    //     })
    // }

    const userRegister=(user,authUser)=>{
        console.log(user);
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
   
            authUser()
            }
        })
    }



    const fetchFakeUsers=async(gender)=>{
                console.log("GENDER:",gender);

                
            let json = await fetch(`https://randomuser.me/api?gender=${gender}&results=45`)
            let data = await json.json();

                console.log(data.results)

            dispatch({
                type:"POPULATE_FAKEUSERS",
                payload:data.results
            })
    }



    return (<GlobalContext.Provider value = {{fetchFakeUsers,
                                              userRegister,
                                              setUser, 
                                              isLoggedIn:state.isLoggedIn, 
                                              fakeUsers:state.fakeUsers,
                                              user:state.user,
                                              ourLikes:state.ourLikes}}>
                    {children}
            </GlobalContext.Provider>
    )
        }