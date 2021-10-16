import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import withGeneralLayout from '../hoc/withGeneralLayout'
import { searchParamsToKeyValue } from '../utils/converter'

function ItemView() {
   const history = useHistory()
   const params = searchParamsToKeyValue(history.location.search)
   const item = useSelector((state) =>
      state.item.items.find((i) => i.id == params.id)
   )
   const {
      id,
      title,
      dateAdded,
      platformFound,
      urlToItem,
      cost,
      currency,
      bought,
      comment,
   } = item
   return <div>{title} sdv</div>
}

export default withGeneralLayout(ItemView, true, false)
