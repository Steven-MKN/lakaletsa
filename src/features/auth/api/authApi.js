import {
   getAuth,
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   signOut,
   updateCurrentUser,
   sendEmailVerification,
   sendPasswordResetEmail,
} from 'firebase/auth'
import { app } from '../../../config/firebaseConfig'

export async function signupUser(email, password) {
   try {
      const auth = getAuth(app)
      const credentials = await createUserWithEmailAndPassword(
         auth,
         email,
         password
      )

      return credentials.user
   } catch (error) {
      throw error
   }
}

export async function loginUser(email, password) {
   try {
      const auth = getAuth(app)
      const credentials = await signInWithEmailAndPassword(
         auth,
         email,
         password
      )

      return credentials.user
   } catch (error) {
      throw error
   }
}

export async function logout() {
   try {
      const auth = getAuth(app)
      await signOut(auth)
      console.log('signed out!')

      return true
   } catch (error) {
      throw error
   }
}

export async function getCurrentUser() {
   try {
      const auth = getAuth(app)
      return auth.currentUser
   } catch (error) {
      throw error
   }
}

export async function updateUserDetails(details) {
   try {
      const auth = getAuth(app)
      await updateCurrentUser(auth, details)
      console.log('update profile sucessful!')
      return true
   } catch (error) {
      throw error
   }
}

export async function deleteUser() {
   try {
      const auth = getAuth(app)
      await auth.currentUser.delete()
      console.log('delete account sucessful!')
      return true
   } catch (error) {
      throw error
   }
}

export async function registerAuthStateChangeListenerApi(onLoginStateChange) {
   try {
      const auth = getAuth(app)
      auth.onAuthStateChanged(
         (user) => {
            console.log('onAuthStateChanged...')
            console.log(user)
            onLoginStateChange({ ...user })
         },
         (error) => {
            console.log('onAuthStateChanged...')
            console.log(error)
         },
         (completed) => {
            console.log('onAuthStateChanged...')
            console.log(completed)
         }
      )
   } catch (error) {
      throw error
   }
}

export async function sendVerificationEmail() {
   try {
      const auth = getAuth(app)
      const settings = {
         url: '',
      }
      await sendEmailVerification(auth.currentUser)
      console.log('verification email sent')
      return true
   } catch (error) {
      throw error
   }
}

export async function sendPasswordReset(email) {
   try {
      const auth = getAuth(app)
      await sendPasswordResetEmail(auth, email)
      console.log('reset password email sent')
      return true
   } catch (error) {
      throw error
   }
}
