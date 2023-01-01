import React, {useState,useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";

function Home() {

  const [inpValue, setInpValue] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });


  const[data,setData] = useState([]);     //data for local storage
  const isLoggedIn = JSON.parse(localStorage.getItem("userLoginData"))
  const navigate = useNavigate(); 
  useEffect(()=>{
    if(isLoggedIn){
      navigate('/welcome');
    }
  })

  let onChangeHandler = (e) => {
    e.preventDefault();

    const {value, name} = e.target;
    setInpValue(() => {
      return {
        ...inpValue,
        [name]: value,
      };
    });
  };

  const validateAndSetToLocalStorage = (e) => {
    e.preventDefault();
    document.querySelector("#form-refresh").reset();

    const {email, password, confirm_password} = inpValue;
    if (email === "") {
      alert("email is required");
    } else if (!email.includes("@")) {
      alert("enter valid email");
    } else if (password === "") {
      alert("password is required ");
    } else if (password.length < 5) {
      alert("password length should greater than 5");
    } else if (confirm_password === "") {
      alert("confirm password is required");
    } else if (confirm_password !== password) {
      alert("password doesn't match");
    } else {
      alert("signup succesfull");
       const previousUsers = JSON.parse(localStorage.getItem('userSignupData'));
       
       if(previousUsers){
        data.push(...previousUsers);
       }
      localStorage.setItem("userSignupData",JSON.stringify([...data,inpValue]))
    }
  };

  return (
    <div>
      <div className="form-main">
        <div className="form-box-shadow">
          <form id="form-refresh">
            <div className="form-heading">
              <p>SignUp</p>
            </div>
            <div className="input-block">
              <label>Email:</label>
              <input
                onChange={onChangeHandler}
                type="email"
                name="email"
                placeholder="enter email here"
              />
            </div>
            <div className="input-block">
              <label>Password:</label>
              <input
                onChange={onChangeHandler}
                type="password"
                name="password"
                placeholder="enter password here"
              />
            </div>
            <div className="input-block">
              <label>Confirm Password:</label>
              <input
                onChange={onChangeHandler}
                type="password"
                name="confirm_password"
                placeholder="confirm password here again"
              />
            </div>
            <div className="input-block-submit"> 
              <input
                onClick={validateAndSetToLocalStorage}
                type="submit"
                name="submit"
              />
            </div>
            <div>
              <p>Allready have an account? <Link to="/login">Login</Link> </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
