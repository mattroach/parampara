// const pad = (num: number, size: number): string => {
//   let s = String(num)
//   while (s.length < size) s = '0' + s
//   return s
// }

// const fractionToSubtime = (fraction: number): string => {
//   return pad(Math.round(fraction * 60), 2)
// }

// 2:32 style rounding. Only uses precision for numbers < 10
// const customRounding = (n: number): string => {
//   if (n % 1 === 0) {
//     return String(n)
//   }

//   if (n < 10) {
//     return `${Math.floor(n)}:${fractionToSubtime(n % 1)}`
//   }

//   return String(Math.round(n))
// }

const round = (value: number, precision: number): number => {
  const multiplier = Math.pow(10, precision || 0)
  return Math.round(value * multiplier) / multiplier
}

// 2.3 style rounding. Only uses precision for numbers < 10
const smallRounding = (n: number): string => {
  if (n % 1 === 0) {
    return String(n)
  }

  if (n < 10) {
    return String(round(n, 1))
  }

  return String(Math.round(n))
}

const durationFormatter = (durationSec: number): string => {
  if (durationSec < 60) {
    return `${durationSec} sec`
  }

  if (durationSec < 60 * 60) {
    return `${smallRounding(durationSec / 60)} min`
  }

  return `${smallRounding(durationSec / 3_600)} hrs`
}

export default durationFormatter
