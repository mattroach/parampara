export type Theme = {
  placeholder: string
  borderColor?: string
  backgroundColor: string
  color: string
  emojiColor: string
  inputType: 'textarea' | 'input'
}

const bot: Theme = {
  placeholder: 'Add a message...',
  backgroundColor: 'rgb(239, 239, 239)',
  color: 'rgb(51, 51, 51)',
  emojiColor: 'rgba(51, 51, 51, 0.5)',
  inputType: 'textarea'
}

const response: Theme = {
  placeholder: 'Add a response...',
  backgroundColor: '#fff',
  borderColor: '#006bfa',
  color: '#006bfa',
  emojiColor: 'rgba(0, 107, 250, 0.7)',
  inputType: 'input'
}

export default { bot, response }
