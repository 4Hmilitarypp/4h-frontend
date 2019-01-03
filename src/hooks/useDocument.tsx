import * as React from 'react'

const useDocument = () => {
  const [documentOpen, setDocumentOpen] = React.useState(false)
  React.useEffect(
    () => {
      if (documentOpen) {
        window.addEventListener('keydown', handleKeydown)
      } else {
        window.removeEventListener('keydown', handleKeydown)
      }
    },
    [documentOpen]
  )
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setDocumentOpen(false)
    }
  }
  return { documentOpen, setDocumentOpen }
}

export default useDocument
