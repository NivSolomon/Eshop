import { useRef } from 'react'
import { Button, Container, Form, axios } from '../import'
import Title from '../Components/Shared/Title'
import { useNavigate, useParams } from 'react-router-dom'
import {toast} from 'react-toastify';
import { getError } from "../utils.js";
const ResetPasswordPage = () => {


  const {id, token} = useParams();
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    try{
      if(passwordRef.current.value === confirmPasswordRef.current.value) {
      await axios.post(`/api/v1/password-reset/${id}/${token}`, {password: passwordRef.current.value})
      .then(navigate("/signin"));
       toast.success(`Password reset successfully`);
    }
    } catch(error){
      toast.error(getError(error))
    }
  }

  return (
    <Container className='small-container'>
      <Title title="Reset password page"/>
      <h1 className='my-3'>Lets reset your password!</h1>
      <Form onSubmit={submitHandler}>
      <Form.Group className='mb-3'>
           <Form.Label>Password</Form.Label>
           <Form.Control required type='password' ref={passwordRef} placeholder="Enter your password"></Form.Control>
      </Form.Group>
      <Form.Group className='mb-3'>
           <Form.Label>Confirm Password</Form.Label>
           <Form.Control required type='password' ref={confirmPasswordRef} placeholder="Verify your password"></Form.Control>
      </Form.Group>
         <div className="mb-3">
            <Button type="submit" className="mb-3">Reset Password</Button>
         </div>
      </Form>
    </Container>
  )
}

export default ResetPasswordPage
