import React from 'react'
import styled from 'styled-components'
import ElasticField from './ElasticField'

export const ActionBubble = styled.div`
  padding: 5px 13px;
  border-radius: 15px;
  border: 1px solid #006bfa;
  color: #006bfa;

  transition: box-shadow 0.15s ease-in-out;
  :focus-within {
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`

export const Wrapper = styled.div`
  display: inline-block;
  margin: 0 0 4px 4px;
`

type Props = {
  value?: string
  setValue: (v: string) => void
  onSubmit: (v: string) => void
  onClear: () => void
  renderMenu?: (wrapperRef: React.RefObject<HTMLDivElement>) => React.ReactNode
  renderNavId?: () => React.ReactNode
  autoFocus?: boolean
  className?: string
}

const ResponseOption: React.FunctionComponent<Props> = ({
  onSubmit,
  onClear,
  renderMenu,
  renderNavId,
  value,
  setValue,
  autoFocus,
  className
}) => {
  const wrapperRef: React.RefObject<HTMLDivElement> = React.createRef()

  return (
    <Wrapper ref={wrapperRef} className={className}>
      {renderMenu && renderMenu(wrapperRef)}
      <ActionBubble className="bubble">
        <ElasticField
          value={value}
          setValue={setValue}
          onSubmit={onSubmit}
          onClear={onClear}
          autoFocus={autoFocus}
        />
        {renderNavId && renderNavId()}
      </ActionBubble>
    </Wrapper>
  )
}

export default ResponseOption
