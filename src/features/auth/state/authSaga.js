import { takeLeading, takeLatest, put, call } from 'redux-saga/effects'
import {
   deleteUser,
   getCurrentUser,
   loginUser,
   sendPasswordReset,
   sendVerificationEmail,
   signupUser,
   updateUserDetails,
   registerAuthStateChangeListenerApi,
} from '../api/authApi'
import {
   makeError,
   makeMessage,
   updateLoading,
} from '../../../rootState/appSlice'
import { logout, updateUser } from './authSlice'

function* signupSaga(action) {
   try {
      const user = yield call(
         signupUser,
         action.payload.email,
         action.payload.password
      )
      yield put(
         updateUser({
            email: user.email,
            displayName: user.displayName,
            isEmailVerified: user.isEmailVerified,
            photoUrl: user.photoUrl,
            uid: user.uid,
            message: 'Signup successful',
         })
      )
   } catch (error) {
      console.log(error)
      yield put(makeError(error.message))
   } finally {
      yield put(updateLoading(false))
   }
}

function* loginSaga(action) {
   try {
      const user = yield call(
         loginUser,
         action.payload.email,
         action.payload.password
      )
      yield put(
         updateUser({
            email: user.email,
            displayName: user.displayName,
            isEmailVerified: user.isEmailVerified,
            photoUrl: user.photoUrl,
            uid: user.uid,
            message: 'Login successful',
         })
      )
   } catch (error) {
      console.log(error)
      yield put(makeError(error.message))
   } finally {
      yield put(updateLoading(false))
   }
}

function* logoutSaga(action) {
   try {
      yield call(logout)
      yield put(logout())
   } catch (error) {
      console.log(error)
      yield put(makeError(error.message))
   } finally {
      yield put(updateLoading(false))
   }
}

function* updateProfileSaga(action) {
   try {
      const user = yield call(updateUserDetails, action.payload)
      yield put(
         updateUser({
            email: user.email,
            displayName: user.displayName,
            isEmailVerified: user.isEmailVerified,
            photoUrl: user.photoUrl,
            uid: user.uid,
            message: 'Profile successfully updated',
         })
      )
   } catch (error) {
      console.log(error)
      yield put(makeError(error.message))
   } finally {
      yield put(updateLoading(false))
   }
}

function* verifyEmail(action) {
   try {
      yield call(sendVerificationEmail)
      yield put(
         makeMessage(
            'A verificaion email has been sent, please check your email inbox'
         )
      )
   } catch (error) {
      console.log(error)
      yield put(makeError(error.message))
   } finally {
      yield put(updateLoading(false))
   }
}

function* resetPassword(action) {
   try {
      yield call(sendPasswordReset, action.payload)
      yield put(
         makeMessage(
            'An email with the password reset link has been sent. please check your inbox'
         )
      )
   } catch (error) {
      console.log(error)
      yield put(makeError(error.message))
   } finally {
      yield put(updateLoading(false))
   }
}

function* deleteAccount(action) {
   try {
      yield call(deleteUser)
      yield put(
         makeMessage(
            'Sorry to see you leave. Your account has been successfully deleted.'
         )
      )
   } catch (error) {
      console.log(error)
      yield put(makeError(error.message))
   } finally {
      yield put(updateLoading(false))
   }
}

function* getUser(action) {
   try {
      const user = yield call(getCurrentUser)
      console.log(user)
      yield put(
         updateUser({
            email: user?.email || null,
            displayName: user?.displayName || null,
            isEmailVerified: user?.isEmailVerified || null,
            photoUrl: user?.photoUrl || null,
            uid: user?.uid || null,
            message: 'Session found',
         })
      )
   } catch (error) {
      console.log(error)
      yield put(makeError(error.message))
   } finally {
      yield put(updateLoading(false))
   }
}

function* registerAuthStateChangeListener(action) {
   try {
      console.log(action)
      yield call(registerAuthStateChangeListenerApi, action.payload)
   } catch (error) {
      console.log(error)
   } finally {
      yield put(updateLoading(false))
   }
}

function* authSaga() {
   yield takeLatest(SAGA_SIGNUP_ACTION, signupSaga)
   yield takeLatest(SAGA_LOGIN_ACTION, loginSaga)
   yield takeLatest(SAGA_LOGOUT_ACTION, logoutSaga)
   yield takeLatest(SAGA_UPDATE_PROFILE_ACTION, updateProfileSaga)
   yield takeLatest(SAGA_VERIFY_EMAIL_ACTION, verifyEmail)
   yield takeLatest(SAGA_RESET_PASSWORD_ACTION, resetPassword)
   yield takeLatest(SAGA_DELETE_PROFILE_ACTION, deleteAccount)
   yield takeLatest(SAGA_GET_USER_ACTION, getUser)
   yield takeLatest(
      SAGA_REGISTER_AUTH_STATE_CHANGE_LISTENER,
      registerAuthStateChangeListener
   )
}

export default authSaga

export const SAGA_SIGNUP_ACTION = 'SAGA_SIGNUP_ACTION'
export const SAGA_LOGIN_ACTION = 'SAGA_LOGIN_ACTION'
export const SAGA_LOGOUT_ACTION = 'SAGA_LOGOUT_ACTION'
export const SAGA_UPDATE_PROFILE_ACTION = 'SAGA_UPDATE_PROFILE_ACTION'
export const SAGA_VERIFY_EMAIL_ACTION = 'SAGA_VERIFY_EMAIL_ACTION'
export const SAGA_RESET_PASSWORD_ACTION = 'SAGA_RESET_PASSWORD_ACTION'
export const SAGA_DELETE_PROFILE_ACTION = 'SAGA_DELETE_PROFILE_ACTION'
export const SAGA_GET_USER_ACTION = 'SAGA_GET_USER_ACTION'
export const SAGA_REGISTER_AUTH_STATE_CHANGE_LISTENER =
   'SAGA_REGISTER_AUTH_STATE_CHANGE_LISTENER'
