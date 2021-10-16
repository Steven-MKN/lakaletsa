import { CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import useGlobalStyles from '../useGlobalStyles'

function Loader() {
   const globalStyles = useGlobalStyles()
   const styles = useStyles()

   return (
      <div className={styles.loaderContainer}>
         <CircularProgress />
      </div>
   )
}

const useStyles = makeStyles({
   loaderContainer: {
      width: '100%',
      height: '100%',
      background: 'transparent',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 999,
   },
})

export default Loader
