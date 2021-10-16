import { makeStyles } from '@material-ui/core/styles'

const useGlobalStyles = makeStyles({
   app: {
      background: '#f5f5f5',
      margin: 0,
      padding: 30,
      minHeight: '100vh',
      fontFamily: 'Montserrat',
   },
   inputText: {
      color: '#2E303F',
      borderColor: '#63948C',
      zIndex: 10,
   },
   primaryButton: {
      background: '#63948C',
   },
   logo: {
      maxWidth: '80%',
      maxHeight: 150,
   },
   fullWidth: {
      width: '100%',
      left: 0,
      right: 0,
   },
   bottomTabs: {
      position: 'fixed',
      bottom: 0,
      width: '100%',
      margin: 0,
      left: 0,
      zIndex: 50,
   },
   addFab: {
      position: 'fixed',
      right: 20,
      bottom: 80,
   },
   heading: {
      padding: 0,
      maigin: 0,
      wordSpacing: 0,
      letterSpacing: 0,
      lineHeight: 0,
   },
   paragraph: {
      padding: 0,
      maigin: 0,
      wordSpacing: 0,
      letterSpacing: 0,
      lineHeight: 0,
   },
   contentRight: {
      display: 'grid',
      justifyContent: 'end',
   },
   loader: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'transalate(-50%)',
   },
})

export default useGlobalStyles
