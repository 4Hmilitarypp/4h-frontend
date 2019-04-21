import * as React from 'react'
import FlashContext from '../contexts/FlashContext'
import { IApiError } from '../sharedTypes'

export const formatError = (err: IApiError) => {
  if (err.response) {
    if (err.response.data) {
      return { message: err.response.data.message, status: err.response.status }
    }
  }
  return { message: typeof err === 'object' ? JSON.stringify(err) : err, status: 500 }
}

const useErrorHandler = () => {
  const flashContext = React.useContext(FlashContext)

  const handleError = (dirtyError: IApiError) => {
    console.error(dirtyError)
    const error = formatError(dirtyError)

    flashContext.set({ message: error.message, isError: true })
  }

  return handleError
}

export default useErrorHandler
