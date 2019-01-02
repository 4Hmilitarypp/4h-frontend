import * as React from 'react'

const useTrimDescription = (descRef: React.RefObject<HTMLElement>, str: string) => {
  const [trimDescription, setTrimDescription] = React.useState(false)
  const [showExpand, setShowExpand] = React.useState(false)

  React.useEffect(() => {
    const descNode = descRef.current
    if (descNode) {
      // des.length > 2000 is for jest to be able to test
      if (descNode.clientHeight > 160 || str.length > 2000) {
        setTrimDescription(true)
        setShowExpand(true)
      } else {
        setTrimDescription(false)
      }
    }
  }, [])

  return { trimDescription, showExpand, setTrimDescription }
}

export default useTrimDescription
