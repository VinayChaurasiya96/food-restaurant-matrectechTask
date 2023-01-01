import React, {useState,useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";

function Login() {

  const navigate = useNavigate();
  const [inpValue, setInpValue] = useState({
    email: "",
    password: "",
  });

  
  const isLoggedIn = JSON.parse(localStorage.getItem("userLoginData"))

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

    const {email, password} = inpValue;
    if (email === "") {
      alert("email is required");
    } else if (!email.includes("@")) {
      alert("enter valid email");
    } else if (password === "") {
      alert("password is required ");
    } else if (password.length < 5) {
      alert("password length should greater than 5");
    } else {
      const allUsers = JSON.parse(localStorage.getItem("userSignupData"));
      const currentUser = allUsers.find(
        (user) => user.email === inpValue.email
      );
      if (currentUser && currentUser.password === inpValue.password) {
        
        localStorage.setItem("userLoginData",JSON.stringify(inpValue))
        navigate("/welcome");

      } else {
        alert("wrong email or password");
      }
    }
  };

  return (
    <div>
      <div className="form-main">
        <div className="form-box-shadow">
          <form id="form-refresh">
            <div className="form-heading">
              <p>Login</p>
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

            <div className="input-block-submit">
              <input
                onClick={validateAndSetToLocalStorage}
                type="submit"
                name="Login"
                value="Login"
              />
            </div>
            <div className="align-right">
              <Link to="/">Create New Account</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
