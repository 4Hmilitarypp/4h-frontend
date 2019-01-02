import * as React from 'react'

/**
 * Api
 */
export interface IApiError {
  response: { data: { message: string }; status: number; statusText: string }
}

export interface IHashProps {
  refToFocus: React.RefObject<HTMLElement>
  hash: string
  location: any
}

export interface IUser {
  email?: string
  name: string
  password: string
  token: string
  username: string
}

export interface ISignInForm {
  email: string
  password: string
}

export interface IBackgroundCoords {
  height: number
  left: number
  open: boolean
  top: number
  width: number
}

export interface IForm {
  currentTarget: {
    elements: {
      [key: string]: HTMLInputElement | HTMLTextAreaElement
    }
  }
}

export interface IContactUsEmail {
  email: string
  message: string
  name: string
}

/**
 * Types
 */

export type FormInputEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
