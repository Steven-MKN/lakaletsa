import { Button, Grid, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import Loader from '../commonComponents/Loader'
import withGeneralLayout from '../hoc/withGeneralLayout'
import {
   resetError,
   resetMessage,
   showToast,
   updateLoading,
} from '../rootState/appSlice'
import { SAGA_UPDATE_LOADING } from '../features/auth/state/authSaga'
import {
   SAGA_ADD_ITEM,
   SAGA_UPDATE_ITEM,
} from '../features/items/state/itemSaga'
import useGlobalStyles from '../useGlobalStyles'
import { canBeNum } from '../utils/converter'
import { getPlatform, isValidHttpUrl } from '../utils/url'

const mapStateToItem = (state, id) => {
   return {
      title: state.inputTitle,
      platformFound: getPlatform(state.inputUrl),
      urlToItem: state.inputUrl,
      cost: Number.parseFloat(state.inputCost) || 0,
      currency: state.inputCurrency,
      bought: false,
      comment: state.inputComment,
      dateAdded: new Date().getTime(),
   }
}

function AddItem({
   id,
   title,
   dateAdded,
   platformFound,
   urlToItem,
   cost,
   currency,
   bought,
   comment,
}) {
   const globalStyles = useGlobalStyles()
   const styles = useStyles()
   const dispatch = useDispatch()
   const { isLoading, message, error } = useSelector((state) => state.app)
   const { uid } = useSelector((state) => state.auth)
   const history = useHistory()

   const [addItemForm, setAddItemForm] = useState({
      inputTitle: title || '',
      dateAdded: dateAdded || null,
      platformFound: platformFound || '',
      inputUrl: urlToItem || '',
      inputCost: cost || 0,
      inputCurrency: currency || 'R',
      bought: bought || false,
      inputComment: comment || '',

      inputTitleError: null,
      inputUrlError: null,
      inputCostError: null,
      inputCurrencyError: null,
      inputCommentError: null,
   })

   const onTextInputChange = (e) => {
      setAddItemForm({
         ...addItemForm,
         [e.target.id]: e.target.value,
      })
   }

   const onAddorUpdateClick = () => {
      let valid = true
      let titleError = null
      let urlError = null
      let costError = null
      let currencyError = null
      let commentError = null

      if (
         addItemForm.inputUrl.length > 0 &&
         !isValidHttpUrl(addItemForm.inputUrl)
      ) {
         urlError = 'please provide a valid url or leave blank'
         valid = false
      } else if (addItemForm.inputTitle.length <= 0) {
         titleError = 'please provide a name for this item'
         valid = false
      } else if (addItemForm.inputCurrency.length <= 0) {
         currencyError = 'what currency is this item being sold in?'
         valid = false
      } else if (!canBeNum(addItemForm.inputCost)) {
      }

      if (valid) {
         dispatch(updateLoading(true))
         if (id) {
            dispatch({
               type: SAGA_UPDATE_ITEM,
               payload: {
                  item: mapStateToItem(addItemForm),
                  userId: uid,
                  itemId: id,
               },
            })
         } else {
            dispatch({
               type: SAGA_ADD_ITEM,
               payload: {
                  item: mapStateToItem(addItemForm),
                  userId: uid,
               },
            })
         }
      }

      setAddItemForm({
         ...addItemForm,
         inputTitleError: titleError,
         inputUrlError: urlError,
         inputCostError: costError,
         inputCurrencyError: currencyError,
         inputCommentError: commentError,
      })
   }

   useEffect(() => {
      if (error || message) {
         dispatch(
            showToast({
               message: message || error,
               type: message ? 'success' : 'error',
            })
         )
         dispatch(resetMessage())
         dispatch(resetError())
         history.goBack()
      }
   }, [error, message])

   return (
      <>
         {isLoading && <Loader />}
         <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="center"
            direction="column"
         >
            <Grid item xs={6}>
               <h1>{id ? 'Add Item to your list' : 'Edit item'}</h1>
            </Grid>

            <Grid item xs={10}>
               <TextField
                  tabIndex={0}
                  id="inputUrl"
                  label="URL"
                  variant="outlined"
                  className={globalStyles.inputText}
                  onChange={onTextInputChange}
                  error={addItemForm.inputUrlError ? true : undefined}
                  helperText={
                     addItemForm.inputUrlError
                        ? addItemForm.inputUrlError
                        : undefined
                  }
                  value={addItemForm.inputUrl}
               />
            </Grid>

            <Grid item xs={10}>
               <TextField
                  tabIndex={1}
                  id="inputTitle"
                  label="Name"
                  variant="outlined"
                  className={globalStyles.inputText}
                  onChange={onTextInputChange}
                  error={addItemForm.inputTitleError ? true : undefined}
                  helperText={
                     addItemForm.inputTitleError
                        ? addItemForm.inputTitleError
                        : undefined
                  }
                  value={addItemForm.inputTitle}
               />
            </Grid>

            <Grid item xs={10}>
               <TextField
                  tabIndex={2}
                  id="inputCurrency"
                  label="Currency (e.g R)"
                  variant="outlined"
                  className={globalStyles.inputText}
                  onChange={onTextInputChange}
                  error={addItemForm.inputCurrencyError ? true : undefined}
                  helperText={
                     addItemForm.inputCurrencyError
                        ? addItemForm.inputCurrencyError
                        : undefined
                  }
                  value={addItemForm.inputCurrency}
               />
            </Grid>

            <Grid item xs={10}>
               <TextField
                  tabIndex={3}
                  id="inputCost"
                  label="Price"
                  variant="outlined"
                  type="number"
                  className={globalStyles.inputText}
                  onChange={onTextInputChange}
                  error={addItemForm.inputCostError ? true : undefined}
                  helperText={
                     addItemForm.inputCostError
                        ? addItemForm.inputCostError
                        : undefined
                  }
                  value={addItemForm.inputCost}
               />
            </Grid>

            <Grid item xs={10}>
               <TextField
                  tabIndex={4}
                  id="inputComment"
                  label="Comment?"
                  variant="outlined"
                  className={globalStyles.inputText}
                  onChange={onTextInputChange}
                  error={addItemForm.inputCommentError ? true : undefined}
                  helperText={
                     addItemForm.inputCommentError
                        ? addItemForm.inputCommentError
                        : 'Let your friends and family know where to find this item if it is not available online'
                  }
                  value={addItemForm.inputComment}
               />
            </Grid>

            <Grid item xs={10}>
               <Button
                  tabIndex={5}
                  variant="contained"
                  color="primary"
                  className={globalStyles.primaryButton}
                  onClick={onAddorUpdateClick}
               >
                  {id ? 'Update' : 'Add'}
               </Button>
            </Grid>
         </Grid>
      </>
   )
}

const useStyles = makeStyles({})

export default withGeneralLayout(AddItem, true, false)
