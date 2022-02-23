import React from 'react'
import { Card, Grid } from '@material-ui/core'
import placeholderImg from '../../../150.png'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'
import useGlobalStyles from '../../../useGlobalStyles'
import { useHistory } from 'react-router'
import { CardGiftcardOutlined, GifOutlined } from '@material-ui/icons'

function ItemCard({id, name, imageUrl, itemsCount}) {
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
               <Grid item  className={styles.cardImageContainer}>
                  <img
                     src={placeholderImg}
                     className={styles.image}
                     onClick={() => onItemClick(id)}
                  />
               </Grid>

               <Grid item direction="row" className={styles.cardOthersContainer}>
                  <h3
                     className={globalStyles.heading}
                     onClick={() => onItemClick(id)}
                  >
                     {name}
                  </h3>

                  <Grid
                     container
                     direction="row"
                     alignItems="center"
                  >
                     <span><CardGiftcardOutlined /></span>
                     <span >
                           {itemsCount}
                        </span>

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
      width: 70,
      height: 70,
      borderRadius: 35,
   },
   cardText: {
      color: '#5c5c5c',
   },
   cardOthersContainer: {
      margin: 0,
      padding: 0,
      paddingLeft: 5,
   },
})

export default ItemCard
