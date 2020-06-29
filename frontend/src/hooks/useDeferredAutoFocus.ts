import { useEffect, MutableRefObject } from 'react'

export function useDeferredAutoFocus(
  ref: MutableRefObject<HTMLElement | undefined>,
  autoFocus?: boolean
) {
  useEffect(() => {
    if (autoFocus) {
      setTimeout(() => {
        ref.current!.focus()
      }, 1)
    }
  }, [ref, autoFocus])
}
