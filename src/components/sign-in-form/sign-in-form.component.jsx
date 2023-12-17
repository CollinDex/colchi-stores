import { useState } from "react";

import FormInput from "../form-input/form-input.component";


import { 
    signInWithGooglePopup,
    signInAuthUserWithEmaillAndPassword
} from "../../utils/firebase.utils";

import './sign-in-form.styles.scss'

import Button from "../button/button.component";


const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    //Track the change in input fields and store it into the formFields object
    const [ formFields, setFormFields ] = useState(defaultFormFields); 
    const { email, password } = formFields;
//    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
        //SignIn with Google Popup, if user closes the pop up display an alert
              try {
                await signInWithGooglePopup();      
              } catch (error) {
                  if(error.code === 'auth/popup-closed-by-user') {
                      alert('Cannot create user, popup-closed-by-user');
                  } else {
                      console.log('User creation encountered an error', error);
                  }
              }
          }

    const handleSubmit = async (event) =>{
        event.preventDefault();

        try {
            const {user} = await signInAuthUserWithEmaillAndPassword(email,password);
            resetFormFields();
        } catch (error) {
            if(error.code === 'auth/invalid-credential') {
                alert('Invalid Credentials, Cannot Log In');
            } else {
                console.log('User LogIn encountered an error\n', error);
            }
        }
    }; 

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={ handleSubmit }> 
                <FormInput 
                    label='Email'
                    required type= 'email'
                    onChange={handleChange}
                    name="email" value={email}
                />

                <FormInput 
                    label='Password'
                    required
                    type= 'password'
                    onChange={handleChange}
                    name="password"
                    value={password}
                />
                <div className="buttons-container">
                <Button type='submit'>Sign In</Button>
                <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google sign in</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;