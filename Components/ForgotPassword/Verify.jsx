import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Verify.css'
import verify from './Authentication-cuate-Photoroom.jpg'
import verification from '../Home/Logo.png'

const Verify = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [formErrors, setFormErrors] = useState("");

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://touchapp.in/auth/verifyOtp", {
        otp: otp.join(''), 
      });

      if (response.status === 200) {
        setFormErrors("");
        alert(
          "OTP verified successfully. Redirecting to create password page..."
        );

        setTimeout(() => {
          navigate("/createPassword");
        }, 1000);
      } else {
        setFormErrors("Invalid OTP. Please try again");
      }
    } catch (error) {
      setFormErrors("Failed to verify OTP. Please try again.");
    }
  };

  const handleInputChange = (index, value) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value === "") {
      if (index > 0) {
        document.getElementById(`otp-${index - 1}`).focus();
      }
    } else if (index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
      <div className="col-md-6 imageReg">
          <img
            src={verify}
            alt="Registration"
            className="img-fluid registrations-images"
          />
        </div>
        <div className='col-md-6 scroll'>
          <Card>
            <Card.Header>
            <h3
                className="text-center touch"
                id="header"
                style={{ color: "rgb(108, 106, 106)" }}
              >
                Touch UI
              </h3>
            </Card.Header>
            <Card.Title>
            <h3 className="text-center otp">Otp Verification</h3>
            </Card.Title>
            <Card.Body>
            <div className="logo" id="logoImgs">
              <img src={verification} alt="verification" />
              </div>
              <Form id="otpverify" onSubmit={handleVerifyOtp}>
                <Form.Group controlId="otp">
                  <Form.Label>Enter OTP</Form.Label>
                  <div className="otp-inputs">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        name={`otp-${index}`}
                        placeholder="0"
                        value={digit}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        maxLength={1}
                      />
                    ))}
                  </div>
                </Form.Group>
                {formErrors && <p className="text-danger">{formErrors}</p>}
                <Button  id="give" type="submit" variant="primary">
                  Verify OTP
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Verify;
