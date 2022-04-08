import './App.css';
import { createUserWithEmailAndPassword, FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
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
  const [users, setUsers] = useState({})
  const [registered, setRegistered] = useState(false);

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const handleToName = e => {
    setName(e.target.value);
  }
  const handleToEmail = e => {
    setEmail(e.target.value);
  }
  const handleToPassword = e => {
    setPassword(e.target.value);
  }

  const handleToCheck = e => {
    setRegistered(e.target.checked)
    // console.log(e.target.checked);
  }

  const handleToSubmit = e => {
    e.preventDefault();

    if (!/^([a-z0-9]{6,})$/.test(password)) {
      setSuccess('');
      setError('Password should contain at least six character');
      return;
    }

    if (registered) {
      signInWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          setUsers(user)
          setEmail('');
          setPassword('');
          setError('');
          setSuccess('Successfully Log in');
          // console.log(result.user);
        })
        .catch(error => {
          setError(error.message);
          setSuccess('');
        })
    }
    else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          setUsers(user)
          setSuccess('Successfully Registered');
          setError('');
          sentVerifyEmail();
          setUpdateUser();
          // console.log(result.user);
        })
        .catch(error => {
          setError(error.message);
          setSuccess('');
          // console.log(error);
        })
    }

  }

  const resetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(result => {
        setError('');
        setSuccess('Sent Your Reset Password Email');
      })
  }

  const sentVerifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        setSuccess('Verify Your Email Account');
      })
  }

  const setUpdateUser = () => {
    updateProfile(auth.currentUser, {
      displayName: name
    })
      .then(() => {
        // Profile updated!
        // ...
      }).catch((error) => {
        // An error occurred
        // ...
      });
  }

  const SingInGoogle = e => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        setUsers(user)
        // console.log(result.user);
      })
      .catch(error => {
        // console.log(error);
      })
  }

  const SingInGithub = e => {
    signInWithPopup(auth, githubProvider)
      .then(result => {
        const user = result.user;
        setUsers(user)
        // console.log(result.user);
      })
      .catch(error => {
        // console.log(error);
      })
  }

  const SingInFacebook = e => {
    signInWithPopup(auth, facebookProvider)
      .then(result => {
        const user = result.user;
        setUsers(user)
        // console.log(result.user);
      })
      .catch(error => {
        // console.log(error);
      })
  }

  return (
    <div>
      <div className="registered w-50 mx-auto my-3">
        <Form onSubmit={handleToSubmit}>
          <h1 className='text-primary'>Please {registered ? 'Login' : 'Registration'}!!</h1>
          {!registered && <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Your Name</Form.Label>
            <Form.Control required onBlur={handleToName} type="text" placeholder="Enter your name" />
          </Form.Group>}

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
            <Form.Check onClick={handleToCheck} type="checkbox" label="Already Registered" />
          </Form.Group>

          <p className='text-danger'>{error}</p>
          <p className='text-success'>{success}</p>

          <Button variant="primary" type="submit">
            {registered ? 'Login' : 'Registration'}
          </Button>
          <div className="forget-button">
            {registered && <Button onClick={resetPassword} variant="primary" type="link" className='mt-3'>Forget Password
            </Button>}
          </div>
          <div className="user-information mb-4 d-flex justify-content-center align-items-center">
            <h5 className='me-5'>{users.displayName}</h5>
            <img src={users.photoURL} alt="" />
          </div>
          <ButtonGroup>
            <div className='button-container'>
              <Button onClick={SingInGoogle} className='me-3 btn btn-outline-primary' variant="light"> <BsGoogle></BsGoogle> Google Sing in</Button>
              <Button onClick={SingInGithub} className='me-3 btn btn-outline-primary' variant="light"> <BsGoogle></BsGoogle> Github Sing in</Button>
              <Button onClick={SingInFacebook} className='me-3 btn btn-outline-primary' variant="light"> <BsFacebook></BsFacebook> Facebook Sing in</Button>
            </div>
          </ButtonGroup>
        </Form>
      </div>
    </div>
  );
}

export default App;
