const starterTemplate = [
  {
    type: 'Message',
    message: 'Hello!'
  },
  {
    type: 'Message',
    message: 'This is your new Parampara script!',
    action: {
      type: 'ChooseResponse',
      responses: [
        {
          message: 'So cool!!'
        }
      ]
    }
  },
  {
    type: 'Message',
    message: 'To get started, enter some bot messages below. You can also delete these example messages!'
  }
]

export default starterTemplate