import { call, put, takeLatest } from 'redux-saga/effects'
import {
   makeError,
   makeMessage,
   updateLoading,
} from '../../../rootState/appSlice'
import { resetItems } from './itemSlice'
import { updateFriends } from './friendSlice'

function* addFriend(action) {
   try {
      yield call(apiAddFriend, action.payload.userId, action.payload.friendUid)
      yield put(makeMessage('Friend added'))
   } catch (error) {
      console.log(error)
      yield put(makeError(error.message))
   } finally {
      yield put(updateLoading(false))
   }
}

function* removeFriend(action) {
   try {
      yield call(apiRemoveFriend, action.payload.userId, action.payload.friendUid)
      yield put(makeMessage('Removed!'))
   } catch (error) {
      console.log(error)
      yield put(makeError(error.message))
   } finally {
      yield put(updateLoading(false))
   }
}

function* getFriends(action) {
   try {
      const friends = yield call(apiGetFriends, action.payload)
      yield put(updateFriends(mapApiFriendsToStateFriends(friends)))
   } catch (error) {
      console.log(error)
      yield put(makeError(error.message))
   } finally {
      yield put(updateLoading(false))
   }
}

function* friendSaga() {
   yield takeLatest(SAGA_ADD_FRIEND, addFriend)
   yield takeLatest(SAGA_REMOVE_FRIEND, removeFriend)
   yield takeLatest(SAGA_GET_FRIENDS, getFriends)
}

export default friendSaga

export const SAGA_ADD_FRIEND = 'SAGA_ADD_FRIEND'
export const SAGA_REMOVE_FRIEND = 'SAGA_REMOVE_FRIEND'
export const SAGA_GET_FRIENDS = 'SAGA_GET_FRIENDS'
