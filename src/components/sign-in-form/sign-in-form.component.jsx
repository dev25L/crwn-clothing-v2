import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import {useState, useEffect} from 'react'
import {
    createUserDocFromAuth,
    signInAuthWithEmailAndPassword,
    signInWithGooglePopup,
    signInWithGoogleRedirect,
} from '../../utils/firebase/firebase.utils'

import './sign-in-form.styles.scss'

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const resetFormFields = () => {
        setEmail('');
        setPassword('');
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!email && !password) return;

        try {
            const response = await signInAuthWithEmailAndPassword(email, password);
            console.log("response: ", response);
            resetFormFields();
        } catch (e) {
            switch (e.code) {
                case 'auth/wrong-password':
                    alert("incorrect password for email");
                    break
                case 'auth/user-not-found':
                    alert("no user associated with this email");
                    break
                default:
                    console.log(e);
            }
            console.log('error: ', e.message);
        }

    }


    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        console.log(user);
        const userDocRef = createUserDocFromAuth(user);
    }


    return (
        <div className='sign-in-container'>
            <h1>I already have an account</h1>
            <label>Sign in with your email and password</label>
            <form onSubmit={handleSubmit}>
                <FormInput
                    type='email'
                    label='Email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    name='email'
                    required/>
                <FormInput
                    type='password'
                    label='Password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    name='password'
                    required/>
                <div className='buttons-container'>
                    <Button type='Submit' buttonType='inverted'>Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>SignIn With Google</Button>
                </div>

            </form>
        </div>
    )
}

export default SignInForm;
