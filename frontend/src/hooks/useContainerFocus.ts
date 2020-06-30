import { useEffect, MutableRefObject, useCallback, useState } from 'react'

export function useContainerFocus(
  containerRef: MutableRefObject<HTMLElement | null>
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
  const [isFocused, setFocus] = useState(false)

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        isFocused &&
        containerRef.current &&
        !containerRef.current.contains(event.target as any)
      ) {
        setFocus(false)
      }
    },
    [isFocused, containerRef]
  )

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)

    return () => document.removeEventListener('click', handleClickOutside)
  }, [handleClickOutside])

  return [isFocused, setFocus]
}
