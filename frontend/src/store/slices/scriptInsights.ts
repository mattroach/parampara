import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import api from 'api'
import { QuestionInsight, CommentInsight } from 'api/types'
import { AppThunk } from 'store/store'
import { InsightFilter, InsightFilterKey, InsightFilterValue } from 'types/insightTypes'

export type ScriptsInsightsStore = {
  questionData?: QuestionInsight[]
  commentData?: CommentInsight[]
  filter: Partial<InsightFilter>
  unfilteredQuestionData?: QuestionInsight[]
}

const initialState: ScriptsInsightsStore = {
  filter: {}
}

const scriptResultsSlice = createSlice({
  name: 'scriptInsights',
  initialState,
  reducers: {
    updateCommentData(state, action: PayloadAction<CommentInsight[]>) {
      state.commentData = action.payload
    },
    updateQuestionData(state, action: PayloadAction<QuestionInsight[]>) {
      state.questionData = action.payload
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
  updateCommentData,
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

// only fetch the filter if it's a complete filter (not partially configured)
const getCompleteFilter = (state: ScriptsInsightsStore) =>
  state.filter.value ? (state.filter as InsightFilter) : undefined

export const loadScriptCommentInsights = (): AppThunk<Promise<void>> => async (
  dispatch,
  getState
) => {
  const scriptId = getState().scriptStore.script!.id

  const filterParam = getCompleteFilter(getState().scriptInsightsStore)

  const data = await api.getScriptCommentInsights(scriptId, filterParam)

  dispatch(updateCommentData(data))
}

export const loadScriptQuestionInsights = (): AppThunk<Promise<void>> => async (
  dispatch,
  getState
) => {
  const scriptId = getState().scriptStore.script!.id

  const filterParam = getCompleteFilter(getState().scriptInsightsStore)

  const data = await api.getScriptQuestionInsights(scriptId, filterParam)

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

  const filterParam = getCompleteFilter(getState().scriptInsightsStore)
  return await api.getScriptQuestionInsightUsers(scriptId, question, answer, filterParam)
}
