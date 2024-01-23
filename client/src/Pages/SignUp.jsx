import { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Container, Form} from '../import.js';
import Title from '../Components/Shared/Title';
import { Store } from '../store.jsx';
import { USER_SIGNIN } from '../actions.jsx';
import {toast} from 'react-toastify';
import { getError } from "../utils.js";
import axios from 'axios';



const SignUp = () => {

    const navigate = useNavigate();

    const nameRef = useRef("");
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const confirmPasswordRef = useRef("");

    const {dispatch: ctxDispatch} = useContext(Store);


    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            if (passwordRef.current.value == confirmPasswordRef.current.value) {
              const { data } = await axios.post('/api/v1/users/signup', {email: emailRef.current.value, password: passwordRef.current.value, name: nameRef.current.value});
              ctxDispatch({type:USER_SIGNIN, payload:data});
              localStorage.setItem('userInfo', JSON.stringify(data));
              navigate('/');
              toast.success(`Welcome ${data.name}!`);
            }
            toast.error("The passwords not same!")
        } catch (error) {
            toast.error(getError(error));
        }
      }

  return (
    <Container>
        <Title title="SignUp Page"/>
        <h1 className='my-3'>Sign Up</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group className='mb-3'>
                <Form.Label>Name</Form.Label>
                <Form.Control required ref={nameRef} placeholder="Enter your Name"></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>Email</Form.Label>
                <Form.Control required type='email' ref={emailRef} placeholder="Enter your Email"></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control required type='password' ref={passwordRef} placeholder="Enter your Password"></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control required type='password' ref={confirmPasswordRef} placeholder="Enter your Password"></Form.Control>
            </Form.Group>
            <div className="mb-3">
            <Button type="submit" className="mb-3">Sign Up</Button>
          </div>
        </Form>
    </Container>
  )
}

export default SignUp
