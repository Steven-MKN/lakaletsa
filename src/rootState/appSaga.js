import { takeLatest } from 'redux-saga/effects'

function* something() {}

function* appSaga() {
   yield takeLatest(SAGA_SOMETHING, something)
}

export default appSaga

export const SAGA_SOMETHING = 'SAGA_SOMETHING'
