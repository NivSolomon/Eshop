import React, { useState } from 'react'
import { Button, Container, Form } from '../import'
import Title from '../Components/Shared/Title'
import  axios  from 'axios';
import { toast } from 'react-toastify';
import { getError } from '../utils';

const ForgotPasswordPage = () => {

    const [email, setEmail] = useState("");


    const submitHandler = async(e) => {
        e.preventDefault();

        try {
          const {data} = await axios.post('/api/v1/password-reset', { email: email});
          toast.success(`Link sent to ${email}`);
        } catch(error) {
          toast.error(getError(error))
        }
    }

  return (
    <Container className='small-container'>
        <Title>Forgot Password Page</Title>
        <h1>Did you forget your password??</h1>
        <h5>Don't worry! we will sent you an email to reset the password.</h5>
        <Form onSubmit={submitHandler}>
           <Form.Group className="mb-3">
              <Form.Label>Email:</Form.Label>
              <Form.Control required onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email"></Form.Control>
           </Form.Group>
           <div className="mb-3">
            <Button type="submit" className="mb-3">Send Email</Button>
          </div>
           </Form>
    </Container>
  )
}

export default ForgotPasswordPage
