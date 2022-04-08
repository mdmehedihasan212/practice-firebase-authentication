import './App.css';
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Button, ButtonGroup, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsGoogle } from 'react-icons/bs';
import { BsFacebook } from 'react-icons/bs';
import { BsTwitter } from 'react-icons/bs';
import { getAuth } from "firebase/auth";
import app from './firebase.init';


const auth = getAuth(app);

function App() {

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

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

  return (
    <div>
      <div className="w-50 mx-auto mt-5">
        <Form>
          <h1 className='text-primary'>Please Registration!!</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Registration
          </Button>
          <br />
          <br />
          <ButtonGroup>
            <Button onClick={SingInGoogle} className='me-3 text-primary' variant="light"> <BsGoogle></BsGoogle> Google Sing in</Button>
            <Button onClick={SingInGithub} className='me-3 text-primary' variant="light"> <BsGoogle></BsGoogle> Github Sing in</Button>
            <Button className='me-3 text-primary' variant="light"> <BsFacebook></BsFacebook> Facebook Sing in</Button>
            <Button className='me-3 text-primary' variant="light"> <BsTwitter></BsTwitter> Twitter Sing in</Button>
          </ButtonGroup>
        </Form>
      </div>
    </div>
  );
}

export default App;
