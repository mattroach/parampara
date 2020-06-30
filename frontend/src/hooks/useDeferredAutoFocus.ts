import { useEffect, RefObject } from 'react'

export function useDeferredAutoFocus(ref: RefObject<HTMLElement>, autoFocus?: boolean) {
  useEffect(() => {
    if (autoFocus) {
      setTimeout(() => {
        ref.current!.focus()
      }, 1)
    }
  }, [ref, autoFocus])
}
