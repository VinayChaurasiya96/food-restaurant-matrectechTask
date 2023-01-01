
import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'


function Welcome() {
  //  const logedInUser =  JSON.parse(localStorage.getItem("userLoginData"))

  const isLoggedIn = JSON.parse(localStorage.getItem("userLoginData"))
  const navigate = useNavigate(); 
  useEffect(()=>{
    if(!isLoggedIn){
      navigate('/');
    }
  })
  const gotToMenuPage = ()=>{
    navigate('/fooditems')
  }
  return (
    <div className='menu-container'>
        <div className='go-to-menu-main'>
           <p>Welcome to Food's Kitchen</p>
            <button onClick={gotToMenuPage}>Go To Menu</button>
        </div>
    </div>
  )
}

export default Welcome