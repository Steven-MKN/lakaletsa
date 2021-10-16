import React from 'react'
import { Card, Grid } from '@material-ui/core'
import placeholderImg from '../../../150.png'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'
import useGlobalStyles from '../../../useGlobalStyles'
import { useHistory } from 'react-router'

function ItemCard({
   id,
   title,
   dateAdded,
   platformFound,
   urlToItem,
   cost,
   currency,
}) {
   const globalStyles = useGlobalStyles()
   const styles = useStyles()
   const history = useHistory()

   const onItemClick = (id) => {
      history.push('/dashboard/view?id=' + id)
   }

   return (
      <Grid
         item
         xs={12}
         sm={12}
         md={8}
         lg={8}
         xl={6}
         className={styles.cardContainer}
      >
         <Card className={styles.card}>
            <Grid
               container
               direction="row"
               justifyContent="flex-start"
               className={styles.cardContentContainer}
            >
               <Grid item xs={4} className={styles.cardImageContainer}>
                  <img
                     src={placeholderImg}
                     className={styles.image}
                     onClick={() => onItemClick(id)}
                  />
               </Grid>

               <Grid item xs={8} className={styles.cardOthersContainer}>
                  <h3
                     className={globalStyles.heading}
                     onClick={() => onItemClick(id)}
                  >
                     {title}
                  </h3>
                  <p className={globalStyles.paragraph + ' ' + styles.cardText}>
                     Added {moment(dateAdded).fromNow()}
                  </p>
                  <p className={globalStyles.paragraph + ' ' + styles.cardText}>
                     Available on {platformFound}
                  </p>

                  <Grid
                     container
                     direction="row"
                     justifyContent="space-between"
                  >
                     <Grid item xs={4}>
                        <p className={globalStyles.paragraph}>
                           {currency}
                           {cost}
                        </p>
                     </Grid>
                     <Grid item xs={8} className={globalStyles.contentRight}>
                        <p
                           className={
                              globalStyles.paragraph + ' ' + styles.cardText
                           }
                        >
                           Buy
                        </p>
                     </Grid>
                  </Grid>
               </Grid>
            </Grid>
         </Card>
      </Grid>
   )
}

const useStyles = makeStyles({
   contentContainer: {
      width: '100%',
      padding: 0,
   },
   cardContentContainer: {
      padding: 10,
      margin: 0,
      flexWrap: 'nowrap',
   },
   cardImageContainer: {
      overflow: 'hidden',
      maxHeight: 100,
   },
   card: {
      width: '100%',
   },
   cardContainer: {
      width: '100%',
      padding: 0,
      marginBottom: 5,
   },
   image: {
      objectFit: 'contain',
   },
   cardText: {
      color: '#5c5c5c',
   },
   cardOthersContainer: {
      margin: 0,
      padding: 0,
      paddingLeft: 5,
      marginTop: -7,
   },
})

export default ItemCard
