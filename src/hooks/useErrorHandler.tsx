import * as React from 'react'
import FlashContext from '../contexts/FlashContext'
import { IApiError } from '../sharedTypes'

export const formatError = (err: IApiError) => ({ message: err.response.data.message, status: err.response.status })

const useErrorHandler = () => {
  const flashContext = React.useContext(FlashContext)

  const handleError = (dirtyError: IApiError) => {
    const error = formatError(dirtyError)

    flashContext.set({ message: error.message, isError: true })
  }

  return handleError
}

export default useErrorHandler
