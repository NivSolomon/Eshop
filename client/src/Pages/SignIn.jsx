import { useContext, useState } from "react"
import axios from "axios";
import { Button, Container, Form, Link } from "../import.js"
import Title from "../Components/Shared/Title";
import {toast} from 'react-toastify';
import { getError } from "../utils.js";
import { useNavigate } from "react-router-dom";
import { Store } from "../store.jsx";
import  {USER_SIGNIN}  from "../actions.jsx";

function SignIn() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {dispatch: ctxDispatch} = useContext(Store);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
        const { data } = await axios.post('/api/v1/users/signin', {email: email, password: password});
        ctxDispatch({type:USER_SIGNIN, payload:data});
        localStorage.setItem('userInfo', JSON.stringify(data));
        navigate('/');
        toast.success(`Welcome ${data.name}!`);
    } catch (error) {
        toast.error(getError(error));
    }
  }

  return (
    <Container className="small-container">
       <Title title="SignIn Page"/>
        <h1 className="my-3">Sign In</h1>
        <Form onSubmit={submitHandler}>
           <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control required onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email"></Form.Control>
           </Form.Group>
           <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control required onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" type="password"></Form.Control>
           </Form.Group>
          <div className="mb-3">
            <Button type="submit" className="mb-3">Sign In</Button>
          </div>
          <div className="mb-3">
            New customer ? {" "}
            <Link to="/signup">Create your account</Link>
          </div>
          <div className="mb-3">
            Forgot your password ? {" "}
            <Link to="/reset">Reset your password</Link>
          </div>
        </Form>
    </Container>
          
  )
}

export default SignIn;