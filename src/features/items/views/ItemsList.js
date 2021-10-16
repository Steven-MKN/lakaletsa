import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import useGlobalStyles from '../../../useGlobalStyles'
import ItemCard from './ItemCard'

function ItemsList({ items }) {
   const globalStyles = useGlobalStyles()
   const styles = useStyles()

   const jsxItems = items.map((i) => <ItemCard {...i} key={i.id} />)

   return (
      <Grid
         container
         justifyContent="center"
         alignItems="center"
         direction="column"
         className={styles.contentContainer}
      >
         {jsxItems}
      </Grid>
   )
}

const useStyles = makeStyles({
   contentContainer: {
      width: '100%',
      padding: 0,
   },
})

export default ItemsList
