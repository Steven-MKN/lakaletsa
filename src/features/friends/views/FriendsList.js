import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import useGlobalStyles from '../../../useGlobalStyles'
import FriendCard from './FriendCard'

function FriendsList({ friends }) {
   const globalStyles = useGlobalStyles()
   const styles = useStyles()

   const jsxItems = [
      <FriendCard
         {...{ id: '1', name: 'John Doe', imageUrl: '', itemsCount: 3 }}
      />,
   ] //friends.map((i) => <FriendCard {...i} key={i.id} />)

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

export default FriendsList
