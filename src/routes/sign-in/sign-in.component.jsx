import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";


const SignIn = () => {
    const logGoogleUser = async () => {
  //SignIn with Google Popup, if user closes the pop up display an alert
        try {
            const { user } = await signInWithGooglePopup();
            await createUserDocumentFromAuth(user);

        } catch (error) {
            if(error.code === 'auth/popup-closed-by-user') {
                alert('Cannot create user, popup-closed-by-user');
            } else {
                console.log('User creation encountered an error', error);
            }
        }
    }
    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>
                SignIn with Google Popup
            </button>
            <SignUpForm/>
        </div>
    )
}

export default SignIn;