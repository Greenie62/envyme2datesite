import React, {useContext,useState,useEffect} from "react"
import {GlobalContext} from "../../context/GlobalState"
import {DashHeader, DashFooter, ImagePanel,UserProfile,MessagesCard,LikesPage} from "./components"
import {FaUser, FaComment, FaStumbleupon} from "react-icons/fa"
import "./Dashboard.css"

const Dashboard = (props) =>{
    const [pages, setPages] = useState(1)
    const [counter, setCounter] = useState(0)
    const {fetchFakeUsers,fakeUsers,setUser} = useContext(GlobalContext);
    
    let username = props.location.search || "brat"
        username = username[0].toUpperCase() + username.split("").splice(1,username.length-1).join("")
 

    


    useEffect(()=>{
        fetchFakeUsers('female')

        async function fetchOurData(){

            let data = await fetch(`http://localhost:3002/userinfo/${username}`)
            let dbuser = await data.json();

                console.log(dbuser);
                setUser(dbuser)
                let interestedIn = dbuser.interestedin === "men" ? "male" : "female"
                console.log("interestedIn: " + interestedIn)
                fetchFakeUsers(interestedIn)
                
        }

        fetchOurData()

    },[])


    const showLikeMenu = () =>{
        console.log('showLike menu fired')
    }



switch(pages){

    case 1:
    return(
        <div className="dashApp">
<DashHeader authUser={props.authUser}
            pages={pages}
            setPages={setPages}
            showLikeMenu={showLikeMenu}/>
<div className="mainDashboardArea">
    {fakeUsers.length ?  
    <div className="mainRow">
            <ImagePanel data={fakeUsers}
                        counter={counter}
                        setCounter={setCounter}/>
    </div>
                        : "Loading..."}

    <div className="actionRow">
        
       <h2 onClick={()=>setPages(2)} className='actionRowIcon actioniconone'><FaUser/></h2> 
       <h2 className='actionRowIcon actionicontwo'><FaStumbleupon/></h2> 
       <h2 onClick={()=>setPages(3)} className='actionRowIcon actioniconthree'><FaComment/></h2> 

    </div>
</div>
<DashFooter/>

        </div>
    )
    break;

    case 2:
        return(
        <UserProfile pages={pages}
                     setPages={setPages}/>
        )
    break;

    case 3:
        return(
        <MessagesCard pages={pages}
                      setPages={setPages}/>
        )
    break;

    case 4:
        return(
            <LikesPage pages={pages}
                       setPages={setPages}/>
        )
    break;
}

}



export default Dashboard;