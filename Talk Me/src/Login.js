import { Button } from '@material-ui/core';
import React from 'react';
import './Login.css';
import {auth,provider} from './firebase';
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';

function Login() {
    const [{},dispatch] = useStateValue();
    const signIn = () => {
        auth
            .signInWithPopup(provider)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })
            })
            .catch((error) => alert(error.message));
    }

    return (
        <div className="login">
           <div className="login_container">
               <img src="https://lh3.googleusercontent.com/UKm6XMzvarmuy2P3zWUJefwGa-GQYV7MxWw9eLyHJ5ssJ9RS6XogPysYWJul2iICfPC-JGjNNRDxSdJgrgN5T3QZHTexXUYJb_9m=w600" alt=""/> 
                <div className="login_text">
                    <h1>Sign in to TalkMe</h1>
                </div>
                <Button type="submit" onClick={signIn}>Sign in With Google</Button>
           </div>
        </div>
    );
}

export default Login
