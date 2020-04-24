import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import api from 'api'
import { QuestionInsight } from 'api/types'
import { AppThunk } from 'store/store'
import { InsightFilter, InsightFilterKey, InsightFilterValue } from 'types/insightTypes'

export type ScriptsInsightsStore = {
  isLoadingData: boolean
  data?: QuestionInsight[]
  filter: Partial<InsightFilter>
  unfilteredData?: QuestionInsight[]
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
    updateData(state, action: PayloadAction<QuestionInsight[]>) {
      state.data = action.payload
      state.isLoadingData = false
    },
    updateUnfilteredData(state, action: PayloadAction<QuestionInsight[]>) {
      state.unfilteredData = action.payload
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
  updateData,
  updateUnfilteredData,
  setFilterKey,
  removeFilter,
  setFilterValue,
  removeFilterValue
} = scriptResultsSlice.actions
export { setFilterKey, removeFilter, setFilterValue, removeFilterValue }

export default scriptResultsSlice.reducer

export const loadScriptInsights = (
  filter: Partial<InsightFilter>
): AppThunk<Promise<void>> => async (dispatch, getState) => {
  dispatch(setLoadingData())

  const scriptId = getState().scriptStore.script!.id

  // only pass the filter if it's fully configured
  const filterParam = filter.value ? (filter as InsightFilter) : undefined

  const { loginToken } = getState().authenticationStore
  const data = await api.getScriptQuestionInsights(scriptId, loginToken, filterParam)

  //await new Promise(r => setTimeout(r, 1000)) //sleep for testing transitions

  if (!filterParam) {
    dispatch(updateUnfilteredData(data))
  }
  dispatch(updateData(data))
}
