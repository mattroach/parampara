import mailchimp, { defaultList } from './mailchimp'
import crypto from 'crypto'

// Mail chimp recommends snake_case for the attributes. However in our code we prefer camelCase
// We use this to convert to the mail-chimp style
const strCamelToSnake = (str: string) =>
  str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
const camelToSnake = (obj: object): object => {
  const newObj: any = {}
  for (let [key, value] of Object.entries(obj)) {
    newObj[strCamelToSnake(key)] = value
  }
  return newObj
}

// The subscriber hash it he md5 of the lowercase version of the email
const getSubHash = (userEmail: string) =>
  crypto
    .createHash('md5')
    .update(userEmail.toLowerCase())
    .digest('hex')

export default async (userEmail: string, eventName: string, properties: object) => {
  const subHash = getSubHash(userEmail)
  const body = {
    name: eventName,
    properties: camelToSnake(properties)
  }

  const apiPath = `/lists/${defaultList}/members/${subHash}/events`

  if (process.env.NODE_ENV === 'development' && false) {
    console.log('Mailchimp event (not published in dev mode)', apiPath, body)
  } else {
    const response = await mailchimp.post(apiPath, body)
    console.log('Mailchimp event publish req/res', body, response.data)
  }
}
