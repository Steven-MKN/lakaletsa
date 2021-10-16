import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useGlobalStyles from '../useGlobalStyles'
import withGeneralLayout from '../hoc/withGeneralLayout'
import ItemsList from '../features/items/views/ItemsList'
import { useDispatch, useSelector } from 'react-redux'
import { showToast } from '../rootState/appSlice'
import NoItems from '../commonComponents/NoItems'
import { SAGA_GET_ITEMS } from '../features/items/state/itemSaga'

function Home() {
   const globalStyles = useGlobalStyles()
   const styles = useStyles()
   const dispatch = useDispatch()
   const itemsState = useSelector((state) => state.item)
   const { uid } = useSelector((state) => state.auth)
   const items = itemsState.items || []

   useEffect(() => {
      dispatch({ type: SAGA_GET_ITEMS, payload: uid })
   }, [])

   return (
      <div>{items.length > 0 ? <ItemsList items={items} /> : <NoItems />}</div>
   )
}

const useStyles = makeStyles({})

export default withGeneralLayout(Home, false)
