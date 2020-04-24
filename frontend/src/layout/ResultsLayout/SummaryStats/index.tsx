import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import styled from 'styled-components'
import Statistic from './Statistic'
import api from 'api'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { ResponseStatistics } from 'api/types'
import durationFormatter from './durationFormatter'

const StyledContainer = styled(Container)`
  padding: 30px 20px;
`
type StatDefinition = {
  description: string
  key: keyof ResponseStatistics
  scale?: number
  statFormatter?: (stat: number) => string | number
}

const STATS: StatDefinition[] = [
  {
    key: 'numSessions',
    description: 'users interacted with your Parampara'
  },
  {
    key: 'numCompleted',
    description: 'made it to the end',
    scale: 93
  },
  {
    key: 'numComments',
    description: 'comments',
    scale: 86
  },
  {
    key: 'numQuestions',
    description: 'multi choice responses',
    scale: 88
  },
  {
    key: 'totalTimeSec',
    description: 'total time spent enjoying your content',
    scale: 83,
    statFormatter: durationFormatter
  }
]

const SummaryStats: React.FunctionComponent = () => {
  const scriptId = useSelector((state: RootState) => state.scriptStore.script!.id)
  const loginToken = useSelector(
    (state: RootState) => state.authenticationStore.loginToken
  )

  const [responseStats, setResponseStats] = useState<ResponseStatistics | undefined>(
    undefined
  )

  useEffect(() => {
    api.getResponseStats(scriptId, loginToken).then(data => setResponseStats(data))
  }, [scriptId, loginToken])

  return (
    <StyledContainer fluid>
      <Row>
        {STATS.map(s => {
          const format = s.statFormatter || ((n: number) => n)
          return (
            <Statistic
              key={s.key}
              imgKey={s.key}
              description={s.description}
              scale={s.scale}
              isLoading={!responseStats}
              stat={responseStats ? format(responseStats[s.key]) : undefined}
            />
          )
        })}
      </Row>
    </StyledContainer>
  )
}

export default SummaryStats
