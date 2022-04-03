import * as Sentry from '@sentry/browser'
import * as React from 'react'
import FlashContext from '../contexts/FlashContext'
import { IApiError } from '../sharedTypes'

export const formatError = (err: IApiError | unknown) => {
  const apiError = err as IApiError 
  if (apiError.response) {
    if (apiError.response.status === 404) {
      Sentry.captureEvent({ message: `client-server-404:${(apiError as any).config.url}` })
    }
    if (apiError.response.data) {
      return { message: apiError.response.data.message, status: apiError.response.status }
    }
  }

  return { message: typeof err === 'object' ? JSON.stringify(err) : (err as any)?.message || (err as any).toString(), status: 500 }
}

const useErrorHandler = () => {
  const flashContext = React.useContext(FlashContext)

  const handleError = (dirtyError: IApiError | unknown) => {
    console.error(dirtyError)
    const error = formatError(dirtyError)

    flashContext.set({ message: error.message, isError: true })
  }

  return handleError
}

export default useErrorHandler
