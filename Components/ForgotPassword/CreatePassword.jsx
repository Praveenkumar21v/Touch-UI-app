import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import './CreatePassword.css';
import create from './Reset password-pana.png';
import logo from '../Home/Logo.png'

const CreatePassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState('');

  const handleCreatePassword = async (e) => {
    e.preventDefault();

    const confirmPwdCode = '0.6g75uceu2k7';

    try {
      const response = await axios.post('http://test.touchapp.in/auth/createPassword', {
        password: password,
        confirmPassword: confirmPassword,
        confirmPwdCode: confirmPwdCode,
      });

      if (response.data.success) {
        setFormErrors('');
        alert('Password created successfully. You can now log in.');
        navigate('/login');
      } else {
        setFormErrors('Failed to create password. Please try again.');
      }
    } catch (error) {
      setFormErrors('Failed to create password. Please try again.');
    }
  };

  const handleTogglePasswordVisibility = (passwordType) => {
    if (passwordType === 'password') {
      setShowPassword(!showPassword);
    } else if (passwordType === 'confirmPassword') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <div className='container-fluid containCard'>
      <div className='row'>
        <div className='col-md-6 '>
          <img src={create} alt='Registration' className='img-fluid password-image' />
        </div>
        <div className='col-md-6 scrolls' id='backdropone'>
          <Card>
            <Card.Header className='border-dark'>
              <h3 className='text-center' id='header'>
                TouchUi
              </h3>
            </Card.Header>
            <Card.Title>
              <h2 className='text-center' id='passkey'>
                Create Password
              </h2>
            </Card.Title>
            <Card.Body>
            <div className="logos" id='logo1'>
                <img src={logo} alt="logo"/>
              </div>
              <Form onSubmit={handleCreatePassword}>
                <Form.Group controlId='password'>
                  <Form.Label id='key'>Create Password</Form.Label>
                  <Form.Control
                    style={{
                      background: 'black',
                      outline: 'none',
                      boxShadow: 'none',
                      color: 'white',
                    }}
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    id='range'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div
                    className='password-toggle-icon-one'
                    onClick={() => handleTogglePasswordVisibility('password')}
                  >
                    {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                  </div>
                </Form.Group>
                <Form.Group controlId='confirmPassword'>
                  <Form.Label id='key1' style={{ color: 'white' }}>Confirm Password</Form.Label>
                  <Form.Control
                    style={{
                      background: 'black',
                      outline: 'none',
                      boxShadow: 'none',
                      color: 'white',
                    }}
                    type={showConfirmPassword ? 'text' : 'password'}
                    id='range1'
                    name='confirmPassword'
                    placeholder='Confirm password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <div
                    className='password-toggle-icon-one'
                    onClick={() => handleTogglePasswordVisibility('confirmPassword')}
                  >
                    {showConfirmPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                  </div>
                </Form.Group>
                {formErrors && <p className='text-danger'>{formErrors}</p>}
                <Button type='submit' variant='primary' id='createKey'>
                  Create Password
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreatePassword;
