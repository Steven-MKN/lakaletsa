import { makeStyles } from '@material-ui/core'
import {
   InfoOutlined,
   KeyboardArrowLeftSharp,
   MenuOutlined,
   MoreHorizOutlined,
   NotificationsActiveOutlined,
   NotificationsOutlined,
} from '@material-ui/icons'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import logo from '../lakaletsa_logo_full.png'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'

function Navbar() {
   const styles = useStyles()
   const { hasBackButton, notificationsCount } = useSelector(
      (state) => state.app
   )
   const history = useHistory()

   return (
      <div className={styles.navbar}>
         {hasBackButton && (
            <div
               className={styles.backContainer}
               onClick={() => {
                  history.goBack()
               }}
            >
               <KeyboardArrowLeftSharp />
            </div>
         )}

         <div className={styles.logoContainer}>
            <img src={logo} className={styles.logo} />
         </div>

         <div className={styles.toolbarButtons}>
            <span className={styles.toolbarButton}>
               {notificationsCount > 0 ? (
                  <NotificationsActiveOutlined />
               ) : (
                  <NotificationsOutlined />
               )}
            </span>
            <span className={styles.toolbarButton}>
               <PopupState variant="popover" popupId="demo-popup-menu">
                  {(popupState) => (
                     <React.Fragment>
                        <MoreHorizOutlined {...bindTrigger(popupState)} />
                        <Menu {...bindMenu(popupState)}>
                           <MenuItem onClick={popupState.close}>info</MenuItem>
                           <MenuItem onClick={popupState.close}>
                              logout
                           </MenuItem>
                        </Menu>
                     </React.Fragment>
                  )}
               </PopupState>
            </span>
         </div>
      </div>
   )
}

const useStyles = makeStyles({
   navbar: {
      position: 'fixed',
      width: '100%',
      height: 60,
      background: 'white',
      left: 0,
      top: 0,
      display: 'flex',
      alignItems: 'center',
      zIndex: 60,
   },
   logoContainer: {
      maxHeight: 40,
      overflow: 'hidden',
      width: 'min-content',
      marginLeft: '50%',
      transform: 'translateX(-50%)',
   },
   logo: {
      maxHeight: 40,
   },
   backContainer: {
      position: 'absolute',
      left: 0,
      paddingLeft: 10,
   },
   toolbarButtons: {
      position: 'absolute',
      right: 0,
      paddingRight: 10,
      cursor: 'pointer',
   },
   toolbarButton: {
      paddingLeft: 10,
   },
})

export default Navbar
