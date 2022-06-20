import {
    signInWithGooglePopup,
    signInWithGoogleRedirect,
    createUserDocFromAuth,
    auth
} from '../../utils/firebase/firebase.utils'
import {getRedirectResult} from 'firebase/auth'
import {useEffect} from 'react'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component'

const SignIn = () => {
    useEffect( () => {
        const getRedirect = async () =>{

            let response = await getRedirectResult(auth);
            if(response) {
                let userDocRef = createUserDocFromAuth(response.user);
                console.log("result: ", userDocRef);
            }
        }
        getRedirect();
    },[])

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        console.log(user);
        const userDocRef = createUserDocFromAuth(user);
    }

    const logGoogleUseRedirect = async () => {
        const {user} = await signInWithGoogleRedirect();
        console.log(user);
        const userDocRef = createUserDocFromAuth(user);
    }
    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>with google popup</button>
            <button onClick={logGoogleUseRedirect}>with google redirect</button>
            <SignUpForm/>
        </div>
    )
}

export default SignIn;
