import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup } from "../../Containers/RegisterationSlice";
import { IoMdMale, IoMdFemale } from "react-icons/io";
import { IoMaleFemale } from "react-icons/io5";
import socialMedia from './Social media-cuate (1)-Photoroom.png-Photoroom.png'
import './registeration.css';
import Logo from '../Home/Logo.png';
import { Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.RegisterReducer||{});

  const [registrationData, setRegistrationData] = useState({
    full_name: "",
    mobile: "",
    password:"",
    user_name: "",
    gender: "",
    countryCode: "91",
    udid: "7567567567",
    fcm_token: "456456456456456",
    dob:'',
    image:null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [registrationError, setRegistrationError] = useState(null);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleGenderChange = (value) => {
    setRegistrationData({
      ...registrationData,
      gender: value,
    });
  };

  const handlePhotoUpload = (e) => {
    const photoFile = e.target.files[0];
    setRegistrationData((prevData) => ({
      ...prevData,
      image: photoFile,
    }));
  };

  const handleSuccessfulRegisteration=(userData)=>{
    localStorage.setItem('userData',JSON.stringify(userData));
    navigate('/login');
  }


  const handleRegistration = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!registrationData.full_name.trim()) {
      errors.full_name = "Full Name is required";
    }
      setFormErrors({});
      if (Object.keys(errors).length === 0) { 
      try {
       const userData= await dispatch(signup(registrationData));
        setFormErrors("");
        alert(
          "Registered successfully. Redirecting to Verification page..."
        );
      handleSuccessfulRegisteration(userData);
        }
          catch(error){
            console.error('Error Registeration Data', error)
            if (error.response && error.response.status === 409) {
              setRegistrationError("User with same details already exists. Please login instead.");
            } else {
              setRegistrationError("Registration failed. Please try again later.");
            }
          }
        }

      }
      
  return (
    <div className="container-fluid registration-background">
      <div className="row">
      <div className="col-md-6 ">
          <img
            src={socialMedia}
            alt="Registration"
            className="img-fluid registration-image"
          />
        </div>

        <div className="col-md-6 scroll">
          <Card id="move">
          <Card.Header className="border-dark">
            
              <h3
                className="text-center mt-4 touch"
                id="header"
                style={{ color: "rgb(108, 106, 106)" }}
              >
                Touch UI
              </h3>
            </Card.Header>
            <Card.Title>
              <h2 className="text-center text-white mt-3 ">Complete profile</h2>
              <p className="text-center text-secondary para">
                Just a few things to get started!
              </p>
            </Card.Title>

            <Card.Body>
            <div className="logo">
                <img src={Logo} alt="logo"/>
              </div>
              <Form onSubmit={handleRegistration}>
                <Form.Group controlId="full_name">
                <Form.Label>What's your name?</Form.Label>
                  <Form.Control
                  className="Text"
                    type="text"
                    name="full_name"
                    placeholder="Enter your full name"
                    value={registrationData.full_name}
                    onChange={handleInputChange}
                    style={{
                      background: "black",
                      outline: "none",
                      boxShadow: "none",
                      color: "white",
                    }}
                  />
                  {formErrors.full_name && (
                    <p className="text-danger">{formErrors.full_name}</p>
                  )}
                </Form.Group>

                
                <Form.Group controlId="mobile">
                  <Form.Label>What's your email</Form.Label>
                  <Form.Control
                  className="Text"
                    type="text"
                    name="mobile"
                    placeholder="@ enter your email"
                    value={registrationData.mobile}
                    onChange={handleInputChange}
                    style={{
                      background: "black",
                      outline: "none",
                      boxShadow: "none",
                      color: "white",
                    }}
                  />
                  {formErrors.mobile && (
                    <p className="text-danger">{formErrors.mobile}</p>
                  )}
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    className="Text"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={registrationData.password}
                    onChange={handleInputChange}
                    style={{
                      background: "black",
                      outline: "none",
                      boxShadow: "none",
                      color: "white",
                    }}
                  />
                   <div
                      className="password-toggle-icons"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <AiOutlineEye />
                      ) : (
                        <AiOutlineEyeInvisible />
                      )}
                    </div>

                  {formErrors.password && (
                    <p className="text-danger">{formErrors.password}</p>
                  )}
                </Form.Group>

                <Form.Group controlId="user_name">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control
                    className="Text"
                    type="text"
                    name="user_name"
                    placeholder="Enter your user name"
                    value={registrationData.user_name}
                    onChange={handleInputChange}
                    style={{
                      background: "black",
                      outline: "none",
                      boxShadow: "none",
                      color: "white",
                    }}
                  />
                  {formErrors.user_name && (
                    <p className="text-danger">{formErrors.user_name}</p>
                  )}
                </Form.Group>

                <Form.Group controlId="image">
                  <Form.Label>Photo (optional)</Form.Label>
                  <Form.Control
                    className="Text"
                    type="file"
                    name="image"
                    onChange={handlePhotoUpload}
                    style={{
                      background: "black",
                      outline: "none",
                      boxShadow: "none",
                      color: "white",
                    }}
                  />
                  {formErrors.photo && (
                    <p className="text-danger">{formErrors.photo}</p>
                  )}
                </Form.Group>

                <Form.Group controlId="dob">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    className="Text"
                    type="date"
                    name="dob"
                    value={registrationData.dob}
                    onChange={handleInputChange}
                    style={{
                      background: "black",
                      outline: "none",
                      boxShadow: "none",
                      color: "white",
                    }}
                  />
                  {formErrors.dob && (
                    <p className="text-danger">{formErrors.dob}</p>
                  )}
                </Form.Group>

                <Form.Group controlId="gender">
                  <Form.Label>What's your gender?</Form.Label>

                  <div className="gender">
                    <div
                      onClick={() => handleGenderChange("male")}
                      className="gender-icon"
                    >
                      <IoMdMale
                        id="male"
                        className={`icon ${
                          registrationData.gender === "male" ? "selected" : ""
                        }`}
                      />
                      <span className="label">Male</span>
                    </div>
                    <div
                      onClick={() => handleGenderChange("female")}
                      className="gender-icon"
                    >
                      <IoMdFemale
                        id="female"
                        className={`icon ${
                          registrationData.gender === "female" ? "selected" : ""
                        }`}
                      />
                      <span className="label">Female</span>
                    </div>
                    <div
                      onClick={() => handleGenderChange("other")}
                      className="gender-icon"
                    >
                      <IoMaleFemale
                        id="other"
                        className={`icon ${
                          registrationData.gender === "other" ? "selected" : ""
                        }`}
                      />
                      <span className="label">Other</span>
                    </div>
                  </div>
                  {formErrors.gender && (
                    <p className="text-danger">{formErrors.gender}</p>
                  )}
                </Form.Group>


                <Form.Group controlId="countryCode" >
                  <Form.Label>Country Code</Form.Label>
                  <Form.Control
                    className="Text"
                    type="text"
                    name="countryCode"
                    placeholder="Enter your country code"
                    value={registrationData.countryCode}
                    onChange={handleInputChange}
                    style={{
                      background: "black",
                      outline: "none",
                      boxShadow: "none",
                      color: "white",
                    }}
                    disabled
                  />
                  {formErrors.countryCode && (
                    <p className="text-danger">{formErrors.countryCode}</p>
                  )}
                </Form.Group>

                <Button  type="submit" id="buttons" variant="primary" disabled={loading}>
                  {loading ? "Registering..." : "Register"}
                </Button>
              </Form>
              {registrationError && <p style={{ color: "red" }}>{registrationError}</p>}
              {error && <p style={{ color: "red" }}>{error}</p>}
            </Card.Body>
          </Card>
          <div className="alreadyRegistered">
                  <Link to="/login" className="textone">
                    <span id="login">Already have an account?</span>{" "}
                    <span className="accounts"> Login</span>
                  </Link>
                </div>
                <br/>       
        </div>
      </div>
    </div>
  );
};

export default Registration;



