import { useEffect, useState } from 'react'

export const useKeyPress = () => {
  const [keyPressed, setKeyPressed] = useState('')
  function downHandler({ key }) {
    setKeyPressed(key)
  }
  useEffect(() => {
    window.addEventListener('keydown', downHandler)
    return () => {
      window.removeEventListener('keydown', downHandler)
    }
  }, [])
  return keyPressed
}
