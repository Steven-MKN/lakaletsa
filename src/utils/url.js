export function isValidHttpUrl(s) {
   try {
      const url = new URL(s)
      return url.protocol === 'https:' || url.protocol === 'http:'
   } catch (error) {
      return false
   }
}

export function getPlatform(s) {
   try {
      const url = new URL(s)
      return url.hostname.replace('www.', '').split('.')[0]
   } catch (error) {
      return null
   }
}
