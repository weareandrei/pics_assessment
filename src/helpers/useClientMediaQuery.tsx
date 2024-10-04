import { useEffect, useState } from 'react'

export function useClientMediaQuery(query: any) {
  const [matches, setMatches] = useState<boolean>(false)

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query)

    const handleMatchChange = (e: any) => {
      setMatches(e.matches)
    }

    mediaQueryList.addEventListener('change', handleMatchChange)
    setMatches(mediaQueryList.matches)

    return () => {
      mediaQueryList.removeEventListener('change', handleMatchChange)
    }
  }, [query])

  return matches
}
