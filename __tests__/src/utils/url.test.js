import { isValidHttpUrl } from '../../../src/utils/url'

const aMock1 = 'https://takealot.com'
const aMock2 = 'takealot.co.za'
const aMock3 = 'takealot'
const aMock4 = 'https://takealot'

describe('Is valid http url test', () => {
   test(`is ${aMock1} a valid url`, () => {
      expect(isValidHttpUrl(aMock1)).toBe(true)
   })

   test(`is ${aMock2} a valid url`, () => {
      expect(isValidHttpUrl(aMock2)).toBe(true)
   })

   test(`is ${aMock3} not a valid url`, () => {
      expect(isValidHttpUrl(aMock3)).toBe(false)
   })

   test(`is ${aMock4} not a valid url`, () => {
      expect(isValidHttpUrl(aMock4)).toBe(false)
   })
})
