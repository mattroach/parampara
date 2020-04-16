import React from 'react'

// This must be imported before other components which extend bootstrap styles.:
import 'bootstrap/dist/css/bootstrap.css'
import 'index.css'
import QuestionBreakdown from './index'

export default {
  title: 'QuestionBreakdown',
  component: QuestionBreakdown
}

const question = 'What is your very most favourite kind of fruit?'

const testData = [
  { answer: 'Apples', numUsers: 53 },
  { answer: 'Potatos', numUsers: 97 },
  { answer: 'Green Onions', numUsers: 132 }
]

export const Basic = () => <QuestionBreakdown question={question} data={testData} />

const testData2 = [
  { answer: 'Apples', numUsers: 53 },
  { answer: 'Potatos', numUsers: 97 },
  { answer: 'Green Onions', numUsers: 132 },
  { answer: 'Red Onions', numUsers: 5 },
  { answer: 'Purple Onions and a longer answer to test limits', numUsers: 55 }
]

export const ManyRows = () => <QuestionBreakdown question={question} data={testData2} />
