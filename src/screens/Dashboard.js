import BottomNavigation from '@material-ui/core/BottomNavigation'
import { BottomNavigationAction, Fab } from '@material-ui/core'
import {
   AddOutlined,
   GroupRounded,
   HomeRounded,
   SettingsRounded,
} from '@material-ui/icons'
import React, { useState } from 'react'
import useGlobalStyles from '../useGlobalStyles'
import { Route, Switch, useHistory } from 'react-router'
import Home from './Home'
import Navbar from '../commonComponents/Navbar'
import ComingSoon from '../commonComponents/ComingSoon'
import AddItem from './AddItem'
import { useSelector } from 'react-redux'
import ItemView from './ItemView'
import FriendsView from './FriendsView'

function Dashboard() {
   const globalStyles = useGlobalStyles()
   const [openTabValue, setOpenTabValue] = useState('home')
   const history = useHistory()
   const appState = useSelector((state) => state.app)

   return (
      <div className="Dashboard">
         <Navbar />

         <Switch>
            <Route exact path="/dashboard">
               <Home />
            </Route>
            <Route path="/dashboard/home">
               <Home />
            </Route>
            <Route path="/dashboard/modify">
               <AddItem />
            </Route>
            <Route path="/dashboard/view">
               <ItemView />
            </Route>
            <Route path="/dashboard/friends">
               <FriendsView />
            </Route>
            <Route path="/dashboard/profile">
               <ComingSoon />
            </Route>
         </Switch>

         {/* show depending on app rootState */}
         {appState?.hasAddButton && (
            <Fab
               color="primary"
               aria-label="add"
               className={globalStyles.addFab}
               onClick={() => {
                  history.push('/dashboard/modify')
               }}
            >
               <AddOutlined />
            </Fab>
         )}

         <BottomNavigation
            value={openTabValue}
            onChange={(event, newValue) => {
               setOpenTabValue(newValue)
               history.replace('/dashboard/' + newValue)
            }}
            showLabels
            className={globalStyles.bottomTabs}
         >
            <BottomNavigationAction
               label="Home"
               value="home"
               icon={<HomeRounded />}
            />
            <BottomNavigationAction
               label="Friends"
               value="friends"
               icon={<GroupRounded />}
            />
            <BottomNavigationAction
               label="Profile"
               value="profile"
               icon={<SettingsRounded />}
            />
         </BottomNavigation>
      </div>
   )
}

export default Dashboard
