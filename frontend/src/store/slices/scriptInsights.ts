import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import api from 'api'
import { QuestionInsight } from 'api/types'
import { AppThunk } from 'store/store'
import { InsightFilter, InsightFilterKey, InsightFilterValue } from 'types/insightTypes'

export type ScriptsInsightsStore = {
  isLoadingData: boolean
  questionData?: QuestionInsight[]
  filter: Partial<InsightFilter>
  unfilteredQuestionData?: QuestionInsight[]
}

const initialState: ScriptsInsightsStore = {
  isLoadingData: false,
  filter: {}
}

const scriptResultsSlice = createSlice({
  name: 'scriptInsights',
  initialState,
  reducers: {
    setLoadingData(state) {
      state.isLoadingData = true
    },
    updateQuestionData(state, action: PayloadAction<QuestionInsight[]>) {
      state.questionData = action.payload
      state.isLoadingData = false
    },
    updateUnfilteredQuestionData(state, action: PayloadAction<QuestionInsight[]>) {
      state.unfilteredQuestionData = action.payload
    },
    setFilterKey(state, action: PayloadAction<InsightFilterKey>) {
      state.filter.key = action.payload
      state.filter.value = undefined
    },
    removeFilter(state) {
      state.filter = {}
    },
    setFilterValue(state, action: PayloadAction<InsightFilterValue>) {
      state.filter.value = action.payload
    },
    removeFilterValue(state) {
      state.filter.value = undefined
    }
  }
})

const {
  setLoadingData,
  updateQuestionData,
  updateUnfilteredQuestionData,
  setFilterKey,
  removeFilter,
  setFilterValue,
  removeFilterValue
} = scriptResultsSlice.actions
export { setFilterKey, removeFilter, setFilterValue, removeFilterValue }

export default scriptResultsSlice.reducer

export const getQuestions = createSelector(
  (state: ScriptsInsightsStore) => state.unfilteredQuestionData,
  data => data?.map(i => i.question)
)

export const loadScriptQuestionInsights = (): AppThunk<Promise<void>> => async (
  dispatch,
  getState
) => {
  dispatch(setLoadingData())

  const scriptId = getState().scriptStore.script!.id

  // only pass the filter if it's fully configured
  const { filter } = getState().scriptInsightsStore
  const filterParam = filter.value ? (filter as InsightFilter) : undefined

  const { loginToken } = getState().authenticationStore
  const data = await api.getScriptQuestionInsights(scriptId, loginToken, filterParam)

  //await new Promise(r => setTimeout(r, 1000)) //sleep for testing transitions

  if (!filterParam) {
    dispatch(updateUnfilteredQuestionData(data))
  }
  dispatch(updateQuestionData(data))
}

export const loadScriptQuestionInsightUsers = (
  question: string,
  answer: string
): AppThunk<Promise<string[]>> => async (dispatch, getState) => {
  const scriptId = getState().scriptStore.script!.id

  // only pass the filter if it's fully configured
  const { filter } = getState().scriptInsightsStore
  const filterParam = filter.value ? (filter as InsightFilter) : undefined
  const { loginToken } = getState().authenticationStore
  return await api.getScriptQuestionInsightUsers(
    scriptId,
    question,
    answer,
    loginToken,
    filterParam
  )
}
