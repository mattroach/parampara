import React from 'react'
import styled from 'styled-components'

const Stripe = styled.div`
  left: 0;
  right: 0;
  margin-top: 40px;
  position: absolute;
  z-index: 5;
  background: rgba(200, 200, 200, 0.8);
  padding: 9px 0;
  text-align: center;
  font-weight: 500;
`

const Cover = styled.div`
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: absolute;
  z-index: 4;
  background: rgba(235, 235, 235, 0.5);
`

const Banner: React.FunctionComponent = () => {
  return (
    <>
      <Cover />
      <Stripe>
        <a
          href="https://getparampara.com/pricing.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Upgrade to pro
        </a>{' '}
        to unlock insights
      </Stripe>
    </>
  )
}

export default Banner
