import { Button, Grid } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router'
import withGeneralLayout from '../hoc/withGeneralLayout'
import logo from '../lakaletsa_logo_full.png'
import useGlobalStyles from '../useGlobalStyles'

function Onboarding() {
   const history = useHistory()
   const globalStyles = useGlobalStyles()

   return (
      <div>
         <div className="Signup">
            <Grid
               container
               spacing={3}
               justifyContent="center"
               alignItems="center"
               direction="column"
            >
               <Grid item xs={6}>
                  <img src={logo} className={globalStyles.logo} />
               </Grid>
            </Grid>
         </div>
         Onboarding screen
         <Button onClick={() => history.replace('/dashboard')}>Done</Button>
      </div>
   )
}

export default withGeneralLayout(Onboarding, false, false)
