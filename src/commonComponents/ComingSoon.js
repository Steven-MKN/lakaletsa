import { makeStyles } from '@material-ui/core'
import React from 'react'

function ComingSoon() {
   const styles = useStyles()

   return (
      <div className={styles.div}>
         <h3 className={styles.text}>Feature is coming soon</h3>
      </div>
   )
}

const useStyles = makeStyles({
   div: {
      position: 'absolute',
      width: '100%',
      top: '40%',
      left: '50%',
      transform: 'translate(-50%)',
      textAlign: 'center',
   },
   text: {},
})

export default ComingSoon
