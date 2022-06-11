import { signInWithGooglePopup, createUserDocFromAuth } from '../../utils/firebase/firebase.utils'


const signIn = () =>{
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        console.log(user);
        const userDocRef = createUserDocFromAuth(user);
    }
    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>with google</button>
        </div>
    )
}

export default signIn;
