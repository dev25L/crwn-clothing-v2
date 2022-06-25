import {
    signInWithGooglePopup,
    signInWithGoogleRedirect,
    createUserDocFromAuth,
    auth
} from '../../utils/firebase/firebase.utils'
import {getRedirectResult} from 'firebase/auth'
import {useEffect} from 'react'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component'
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import './authentication.styles.scss'
const Authentication = () => {
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

    return (
        <div className='authentication-container'>
            <SignInForm/>
            <SignUpForm/>
        </div>
    )
}

export default Authentication;
