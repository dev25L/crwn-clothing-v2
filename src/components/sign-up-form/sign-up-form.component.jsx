import {useState} from 'react'
import './sign-up-form.styles.scss'
import {
    createAuthUserWithEmailAndPassword,
    createUserDocFromAuth
} from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'



const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}



const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const {displayName, email, password, confirmPassword} = formFields

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        if (event.password !== event.confirmPassword) {
            alert("password doesn't match!")
            return
        }
        try {
            let {user} = await createAuthUserWithEmailAndPassword(email, password);
            console.log("response.user: ", user);
            let response2 = await createUserDocFromAuth(user, {displayName})
            console.log("response2: ", response2);
            resetFormFields();
        } catch (e) {
            if (e.code === "auth/email-already-in-use") {
                alert("Cannot creat user, email already in use!");
            } else {
                console.log("error message: ", e.message);
            }

        }
    }

    console.log("formFields: ", formFields)
    const handlerChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span className='sign-up-'>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    type="text"
                    required
                    onChange={handlerChange}
                    name="displayName"
                    value={displayName}
                />
                <FormInput
                    label="Email"
                    type="email"
                    required
                    onChange={handlerChange}
                    name="email"
                    value={email}
                />
                <FormInput
                    label="Password"
                    type="password"
                    required
                    onChange={handlerChange}
                    name="password"
                    value={password}
                />
                <FormInput
                    label="Confirm Password"
                    type="password"
                    required
                    onChange={handlerChange}
                    name="confirmPassword"
                    value={confirmPassword}
                />
                <Button buttonType='inverted' type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;
