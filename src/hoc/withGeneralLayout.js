import { makeStyles } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import {
   setAddButton,
   setBackButton,
   setMenuButton,
} from '../rootState/appSlice'

function withGeneralLayout(Component, hasBackButton, hasAddButton) {
   return (props) => {
      const styles = useGeneralStyles()
      const dispatch = useDispatch()

      dispatch(
         setBackButton(
            typeof hasBackButton === 'undefined' ? true : hasBackButton
         )
      )

      dispatch(
         setAddButton(typeof hasAddButton === 'undefined' ? true : hasAddButton)
      )

      return (
         <div className={styles.generalLayout}>
            <Component {...props} />
         </div>
      )
   }
}

const useGeneralStyles = makeStyles({
   generalLayout: {
      paddingTop: 60,
      paddingBottom: 120,
   },
})

export default withGeneralLayout
