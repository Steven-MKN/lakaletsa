import { call, put, takeLatest } from 'redux-saga/effects'
import {
   apiAddItem,
   apiDeleteItem,
   apiGetItems,
   apiUpdateItem,
} from '../api/itemsApi'
import { mapApiItemToStateItem } from '../../../utils/converter'
import {
   makeError,
   makeMessage,
   updateLoading,
} from '../../../rootState/appSlice'
import { resetItems } from './itemSlice'

function* addItem(action) {
   try {
      yield call(apiAddItem, action.payload.userId, action.payload.item)
      yield put(makeMessage('Successfully added item to yout list'))
   } catch (error) {
      console.log(error)
      yield put(makeError(error.message))
   } finally {
      yield put(updateLoading(false))
   }
}

function* updateItem(action) {
   try {
      yield call(
         apiUpdateItem,
         action.payload.userId,
         action.payload.itemId,
         action.payload.item
      )
      yield put(makeMessage('Successfully updated!'))
   } catch (error) {
      console.log(error)
      yield put(makeError(error.message))
   } finally {
      yield put(updateLoading(false))
   }
}

function* deleteItem(action) {
   try {
      yield call(apiDeleteItem, action.payload.userId, action.payload.itemId)
      yield put(makeMessage('Deleted!'))
   } catch (error) {
      console.log(error)
      yield put(makeError(error.message))
   } finally {
      yield put(updateLoading(false))
   }
}

function* getItems(action) {
   try {
      const items = yield call(apiGetItems, action.payload)
      yield put(resetItems(mapApiItemToStateItem(items)))
   } catch (error) {
      console.log(error)
      yield put(makeError(error.message))
   } finally {
      yield put(updateLoading(false))
   }
}

function* itemSaga() {
   yield takeLatest(SAGA_ADD_ITEM, addItem)
   yield takeLatest(SAGA_UPDATE_ITEM, updateItem)
   yield takeLatest(SAGA_DELETE_ITEM, deleteItem)
   yield takeLatest(SAGA_GET_ITEMS, getItems)
}

export default itemSaga

export const SAGA_ADD_ITEM = 'SAGA_ADD_ITEM'
export const SAGA_UPDATE_ITEM = 'SAGA_UPDATE_ITEM'
export const SAGA_DELETE_ITEM = 'SAGA_DELETE_ITEM'
export const SAGA_GET_ITEMS = 'SAGA_GET_ITEMS'
