import { DeepPartial } from '@reduxjs/toolkit'
import { Script, ScriptActionType } from 'types/scriptTypes'

export type PartialScript = DeepPartial<Script>

export enum ScriptVersionType {
  latest = 'latest',
  draft = 'draft'
}

export type Session = {
  id: string
  sessionUserId: string
  sessionUser: SessionUser
  created: string
  durationSec: number
  progress: number
  responses: SessionResponse[]
  referrerCode?: string
}

export type SessionResponse = {
  id: string
  created: string
  responseType: ScriptActionType
  message: string
  response: string
}

export type SessionUser = {
  email: string
  id: string
  created: string
}

export type QuestionInsight = {
  question: string
  data: {
    answer: string
    numUsers: number
  }[]
}

export type ResponseStatistics = {
  numSessions: number
  numComments: number
  numQuestions: number
  numCompleted: number
  totalTimeSec: number
}
