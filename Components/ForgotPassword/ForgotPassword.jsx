import axios from 'axios';
import React, { useState } from 'react'
import { Button,Card,Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import forgot from './Forgot password-cuate-Photoroom.png-Photoroom.png'
import './forgotPassword.css'
import Logo from '../Home/Logo.png';

const ForgotPassword = () => {
  const navigate=useNavigate();

const [mobile,setMobile]=useState('');
const[formErrors,setFormErrors]=useState('');

const handleInputChange=(e)=>{
  setMobile(e.target.value);
  setFormErrors('');
}
const handleRequestOtp=async(e)=>{
  e.preventDefault();
  try{
     await axios.post('https://touchapp.in/auth/forgotPassword',{
      mobile:mobile,
    })
    navigate("/verifyOtp")
  }catch(error){
    setFormErrors('Failed to request OTP. Please try again')
  }
}

  return (

    <div className='container-fluid'>
      <div className='row'>
      <div className="col-md-6 ">
          <img
            src={forgot}
            alt="Registration"
            className="img-fluid registrations-images"
          />
        </div>
        <div className='col-md-6 scroll'>
          <Card className='contain'>
            <Card.Header >
            
            <h3
                className="text-center touch"
                id="header"
                style={{ color: "rgb(108, 106, 106)" }}
              >
                Touch UI
              </h3>
            </Card.Header>
            <Card.Title>
            <h2 className="text-center head">Forgot Password</h2>
            </Card.Title>
            <Card.Body>
            <div className="logo" id="logos">
                <img src={Logo} alt="logo"/>
              </div>
              <Form onSubmit={handleRequestOtp} id='form'>
                <Form.Group controlId='mobile'>
                <Form.Label>Enter Mobile Number</Form.Label>
                <Form.Control id='text-input' type='text' name='mobile' placeholder='Enter your mobile number' value={mobile} onChange={handleInputChange} style={{background:"black", color:'white'}}/>
                </Form.Group>
                {formErrors && <p className="text-danger">{formErrors}</p>}
                <Button id='submit' type="submit" variant="primary" >
                  Request OTP
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword;