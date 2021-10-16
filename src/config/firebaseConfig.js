import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

export let app = null
export let analytics = null

export function configFirebase() {
   const firebaseConfig = {
      apiKey: 'AIzaSyBb1lE4NAookWyqhuOCxlfNWXS4OkKCrAw',
      authDomain: 'lakaletsa-4bc2b.firebaseapp.com',
      databaseURL: 'https://lakaletsa-4bc2b-default-rtdb.firebaseio.com',
      projectId: 'lakaletsa-4bc2b',
      storageBucket: 'lakaletsa-4bc2b.appspot.com',
      messagingSenderId: '693984602510',
      appId: '1:693984602510:web:59bae7aa5f3b2594d4dcdf',
      measurementId: 'G-24ZGSYE4G1',
   }

   app = initializeApp(firebaseConfig)
   analytics = getAnalytics(app)
}
