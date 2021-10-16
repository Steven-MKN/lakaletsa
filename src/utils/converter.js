export function canBeNum(s) {
   try {
      const num = Number.parseFloat(s)
      if (typeof num == 'number' && !isNaN(num)) return true
      else return false
   } catch (error) {
      return false
   }
}

export function mapApiItemToStateItem(apiItems) {
   let items = []
   try {
      for (const [key, value] of Object.entries(apiItems)) {
         items.push({
            ...value,
            id: key,
         })
      }
   } catch (error) {
      console.log(error)
   } finally {
      return items
   }
}

export function searchParamsToKeyValue(s) {
   const params = {}
   try {
      s = decodeURI(s).replace('?', '')
      s.split('&').forEach((item) => {
         const [key, value] = item.split('=')
         params[key] = value
      })
   } catch (error) {
      console.log(error)
   } finally {
      return params
   }
}
