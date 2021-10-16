import React, { useEffect } from 'react'
import Alert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core'
import { hideToast } from '../rootState/appSlice'
import { useDispatch, useSelector } from 'react-redux'

function Toast() {
   const styles = useStyles()
   const dispatch = useDispatch()
   let timeout = null
   const { toastMessage, toastSeverity } = useSelector((state) => state.app)

   return (
      <Alert variant="filled" severity={toastSeverity} className={styles.alert}>
         {toastMessage}
      </Alert>
   )
}

const useStyles = makeStyles({
   alert: {
      zIndex: 80,
      position: 'fixed',
      top: 10,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '80%',
   },
})

export default Toast
