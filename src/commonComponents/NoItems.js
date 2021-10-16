import { makeStyles } from '@material-ui/core'
import React from 'react'
import useGlobalStyles from '../useGlobalStyles'

function NoItems() {
   const globalStyles = useGlobalStyles()
   const styles = useStyles()

   // have a gif here
   return <div>nothing to show here...</div>
}

const useStyles = makeStyles({})

export default NoItems
