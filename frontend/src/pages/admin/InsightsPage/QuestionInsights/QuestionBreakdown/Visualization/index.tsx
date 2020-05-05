import React, { useRef, useEffect } from 'react'
import Chart, { ChartConfiguration } from 'chart.js'

type Props = {
  data: {
    answer: string
    numUsers: number
    color: string
  }[]
  onHover: (currentIndex: number | undefined) => void
}

const Visualization: React.FunctionComponent<Props> = ({ data, onHover }) => {
  const ref = useRef<HTMLCanvasElement>(null)
  const chart = useRef<Chart | undefined>(undefined)

  const currentHoveredIndex = useRef<number | undefined>(undefined)

  useEffect(() => {
    const labelCallback = ({ index }: { index?: number }) =>
      ` ${data[index!].answer}: ${data[index!].numUsers} users`

    const datasets = [
      {
        data: data.map(d => d.numUsers),
        backgroundColor: data.map(d => d.color)
      }
    ]

    if (chart.current) {
      chart.current.data.datasets = datasets
      chart.current.options.tooltips!.callbacks!.label = labelCallback
      chart.current.update()
      return
    }

    const onHoverHandler = (event: any, elements: any[]) => {
      const index: number | undefined = elements[0]?._index
      if (index !== currentHoveredIndex.current) {
        currentHoveredIndex.current = index
        onHover(index)
      }
    }

    const config: ChartConfiguration = {
      type: 'pie',
      data: {
        datasets: datasets
      },
      options: {
        legend: { display: false },
        aspectRatio: 1,
        tooltips: {
          callbacks: {
            label: labelCallback
          }
        },
        onHover: onHoverHandler
      }
    }

    const ctx = ref.current!.getContext('2d')!
    chart.current = new Chart(ctx, config)
  }, [data, onHover])

  return <canvas ref={ref} />
}

export default Visualization
