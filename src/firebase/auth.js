import {auth} from './firebase';

//Registrar
export const doCreateUserWithEmailAndPassword = (email, pass1) =>
auth.createUserWithEmailAndPassword(email, pass1);

//Iniciar sesion
export const doSignInWithEmailAndPassword = (email, password) =>
auth.signInWithEmailAndPassword(email, password);

//cerrar sesion
export const doSignOut = () =>
auth.signOut();

//Recuperar contraseña
export const doPasswordReset = (email) =>
auth.sendPasswordResetEmail(email);

//Cambiar contraseña
export const doPasswordUpdate = (password) =>
auth.currentUser.updatePassword(password);