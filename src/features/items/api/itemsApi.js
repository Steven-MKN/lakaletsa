import {
   getDatabase,
   ref,
   push,
   update,
   remove,
   get,
   child,
} from 'firebase/database'
import { app } from '../../../config/firebaseConfig'

export async function apiAddItem(userId, item) {
   try {
      const db = getDatabase(app)

      await push(ref(db, `users/${userId}/items`), item)
      return true
   } catch (error) {
      throw error
   }
}

export async function apiUpdateItem(userId, id, updates) {
   try {
      const db = getDatabase(app)

      await update(ref(db, `users/${userId}/items/${id}`), updates)
      return true
   } catch (error) {
      throw error
   }
}

export async function apiDeleteItem(userId, id) {
   try {
      const db = getDatabase(app)

      await remove(ref(db, `users/${userId}/items/${id}`))
      return true
   } catch (error) {
      throw error
   }
}

export async function apiGetItems(userId) {
   try {
      const db = getDatabase(app)
      const snapshot = await get(child(ref(db), `users/${userId}/items`))
      return snapshot.exists ? snapshot.val() : []
   } catch (error) {
      throw error
   }
}

/**
 * users
 *   {userId}
 *     items
 *     notifications
 *     comments
 *     friends
 *     profile
 *       address
 *       {other preferences}
 */
