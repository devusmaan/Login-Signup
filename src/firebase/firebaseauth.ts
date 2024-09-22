import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification, Auth, User, sendPasswordResetEmail } from "firebase/auth";
import { app } from '@/firebase/firebaseconfig';


export const auth = getAuth(app);

export function SignupForm(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

            // Signed up 
            const user = userCredential.user;
            sendEmailVerification(auth.currentUser as User);
            console.log(user, 'user created successfully.');

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorMessage, 'invild email or password.');
            // ..
        });
}



export function loginForm(email: string, password: string) {

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // sendEmailVerification(auth.currentUser as User);
            console.log(user);
            if (user.emailVerified) {
                console.log('Email is verified. User can log in.')
            } else {
                console.log('Email is not verified. Please verify your email.');
            }
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorMessage, 'already login your account.');
        });
}


export function emailVerification() {

    const auth = getAuth(app);
    sendEmailVerification(auth.currentUser as User)
        .then((success) => {
            // Email verification sent!
            console.log(success, "Email verifcation send successfully")
            // ...
        });
}



export function signOutUser(auth: Auth) {
    signOut(auth).then(() => {
        console.log("Sign-out successful.");
    }).catch((error) => {
        console.log(" An error happened");
    });
}


export async function resetPassword(email: string) {
    try {
        await sendPasswordResetEmail(auth, email);
        alert('Password reset email sent!');
    } catch (error) {
        console.error("Error sending password reset email:", error);
    }
};