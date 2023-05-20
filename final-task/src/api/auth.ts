import {  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../utils/FirebaseApp';

const SignUp = (email:string, password:string) => {
   return  createUserWithEmailAndPassword(auth, email, password)
}
const Login = (email:string, password:string) => {
   return signInWithEmailAndPassword(auth, email, password)
}
const Logout = () => {
   return signOut(auth)
}
export {SignUp, Login, Logout};