import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import Signin from "../../Containers/assets/Good team-cuate.svg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { login } from "../../Containers/LoginSlice";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";
import Logo from '../Home/Logo.png'

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loginloading , loginerror } = useSelector((state) => state.LoginReducer || {}, shallowEqual);


  const [credentials, setCredentials] = useState({
    mobile: "",
    password: "",
    udid: "uiqyiyuiyfgyyet",
    fcm_token: "786786786a7dasdasdsfgyyert",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };



  const handleLogin = async (e) => {
    e.preventDefault();
  
    const errors = {};
    if (!credentials.mobile.trim() || !credentials.password.trim()) {
      errors.general = "Enter correct username and password";
    } else {
      setFormErrors({});
      try {
        const storedRegistrationData = JSON.parse(localStorage.getItem('userData'));
        if (storedRegistrationData && credentials.mobile === storedRegistrationData.mobile && credentials.password === storedRegistrationData.password) {
          const loginCredentials = {
            mobile: credentials.mobile,
            password: credentials.password,
            udid: "uiqyiyuiyfgyyet",
            fcm_token: "786786786a7dasdasdsfgyyert",
          };
          
         const response= await dispatch(login(loginCredentials));
         
         if(response.meta.requestStatus==="fulfilled"){
          alert('Login Successful')
          console.log('Login successful');
          navigate('/getFeed');
         }else{
          console.error('error',errors.message)
         }

        } else {
          await dispatch(login(credentials));
          console.log('Login successful');
          navigate('/getFeed');
        }
      } catch (error) {
        console.error("Error logging in:", error);
      }
    }
  
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    }
  };
  
  return (
    <div className="container-fluid background">
      <div className="row">
        <div className="col-md-6 ">
          <img
            src={Signin}
            alt="Registration"
            className="img-fluid registrations-image"
          />
        </div>

        <div className="col-md-6 scrolls" id="backdrop">
          <Card >
            <Card.Header className="border-dark">
              <h3
                className="text-center  "
                id="header"
              >
                TouchUi  
              </h3>
            </Card.Header>
            <Card.Title>
              <h2 className="text-center text-white mt-3 ">Welcome Back!</h2>
            </Card.Title>

            <Card.Body>
              <div className="logos">
                <img src={Logo} alt="logo"/>
              </div>
              <Form onSubmit={handleLogin}>
                <Form.Group controlId="mobile">
                  <Form.Label>Enter Email/User Name.</Form.Label>
                  <div className="input-container">
                    <Form.Control
                      style={{
                        background: "black",
                        outline: "none",
                        boxShadow: "none",
                        color: "white",
                      }}
                      className="user_name"
                      type="text"
                      name="mobile"
                      placeholder="Enter username/email"
                      value={credentials.mobile}
                      onChange={handleInputChange}
                      autoComplete="username"
                    />
                  </div>
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <div className="password-input-container">
                    <Form.Control
                      style={{
                        background: "black",
                        outline: "none",
                        boxShadow: "none",
                        color: "white",
                      }}
                      className="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      name="password"
                      value={credentials.password}
                      onChange={handleInputChange}
                      autoComplete="current-password"
                    />

                    <div
                      className="password-toggle-icon"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <AiOutlineEye />
                      ) : (
                        <AiOutlineEyeInvisible />
                      )}
                    </div>
                  </div>

                  <div className="forgot-password">
                    <Link to="/forgot-password" className="text">
                      Forgot password?
                    </Link>
                  </div>

                  {formErrors.general && (
                    <p className="text-danger mt-2 ms-3">
                      {formErrors.general}
                    </p>
                  )}
                </Form.Group>

                <div className="create-account">
                  <Link to="/Registeration" className="textone">
                    <span id="creates">Don't have an account?</span>{" "}
                    <span className="accounts">Create account</span>
                  </Link>
                </div>

                <Button type="submit" className="mt-3" disabled={loginloading}>
                  {loginloading ? "Logging in..." : "Login"}
                </Button>
              </Form>
              {loginerror && <p style={{ color: "red" }}>{loginerror}</p>}
            </Card.Body>
            
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
