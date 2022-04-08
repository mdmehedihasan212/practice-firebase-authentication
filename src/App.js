import './App.css';
import { createUserWithEmailAndPassword, FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, sendEmailVerification, signInWithPopup } from 'firebase/auth';
import { Button, ButtonGroup, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsGoogle } from 'react-icons/bs';
import { BsFacebook } from 'react-icons/bs';
import { getAuth } from "firebase/auth";
import app from './firebase.init';
import { useState } from 'react';


const auth = getAuth(app);

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const handleToName = e => {
    setName(e.target.value)
  }
  const handleToEmail = e => {
    setEmail(e.target.value)
  }
  const handleToPassword = e => {
    setPassword(e.target.value)
  }

  const handleToSubmit = e => {
    e.preventDefault()

    if (!/^([a-z0-9]{6,})$/.test(password)) {
      setError('Password should contain at least six character')
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        setError('');
        sentVerifyEmail();
        console.log(result.user);
      })
      .catch(error => {
        setError(error.message)
        console.log(error);
      })
  }

  const sentVerifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        setSuccess('Verify your email account')
      })
  }

  const SingInGoogle = e => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        // console.log(result.user);
      })
      .catch(error => {
        // console.log(error);
      })
  }

  const SingInGithub = e => {
    signInWithPopup(auth, githubProvider)
      .then(result => {
        // console.log(result.user);
      })
      .catch(error => {
        // console.log(error);
      })
  }

  const SingInFacebook = e => {
    signInWithPopup(auth, facebookProvider)
      .then(result => {
        // console.log(result.user);
      })
      .catch(error => {
        // console.log(error);
      })
  }

  return (
    <div>
      <div className="w-50 mx-auto mt-5">
        <Form onSubmit={handleToSubmit}>
          <h1 className='text-primary'>Please Registration!!</h1>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Your Name</Form.Label>
            <Form.Control required onBlur={handleToName} type="text" placeholder="Enter your name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control required onBlur={handleToEmail} type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control required onBlur={handleToPassword} type="password" placeholder="Password" />
          </Form.Group>
          <Form.Text className="text-muted">
            We'll never share your email and password with anyone else.
          </Form.Text>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>

          <p className='text-danger'>{error}</p>
          <p className='text-success'>{success}</p>

          <Button variant="primary" type="submit">
            Registration
          </Button>
          <br />
          <br />
          <ButtonGroup>
            <Button onClick={SingInGoogle} className='me-3 text-primary' variant="light"> <BsGoogle></BsGoogle> Google Sing in</Button>
            <Button onClick={SingInGithub} className='me-3 text-primary' variant="light"> <BsGoogle></BsGoogle> Github Sing in</Button>
            <Button onClick={SingInFacebook} className='me-3 text-primary' variant="light"> <BsFacebook></BsFacebook> Facebook Sing in</Button>
          </ButtonGroup>
        </Form>
      </div>
    </div>
  );
}

export default App;
