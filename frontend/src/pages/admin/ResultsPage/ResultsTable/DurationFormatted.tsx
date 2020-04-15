import React from 'react'

type Props = {
  durationSec: number
}

const DurationFormatted: React.FunctionComponent<Props> = ({ durationSec }) => {
  if (durationSec < 60) return <>{durationSec} seconds</>

  if (durationSec < 3600) {
    const minutes = Math.floor(durationSec / 60.0)
    const sec = durationSec - minutes * 60
    return (
      <>
        {minutes}:{pad(sec)} minutes
      </>
    )
  }

  const hours = Math.floor(durationSec / 3600.0)
  const minutes = Math.floor((durationSec - hours * 3600) / 60.0)
  const sec = durationSec - hours * 3600 - minutes * 60
  return (
    <>
      {hours}:{pad(minutes)}:{pad(sec)} hours
    </>
  )
}

export default DurationFormatted

function pad(n: number) {
  const width = 2
  const nStr = n + ''
  return nStr.length >= width ? nStr : new Array(width - nStr.length + 1).join('0') + nStr
}
