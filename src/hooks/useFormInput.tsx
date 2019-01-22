import * as React from 'react'
import { FormInputEvent } from '../clientTypes'

interface IUseFormInputReturn {
  value: string
  onChange: (e: FormInputEvent) => void
}

const useFormInput = (initialValue: string): IUseFormInputReturn => {
  const [value, setValue] = React.useState<string>(initialValue)
  const handleChange = (e: FormInputEvent) => setValue(e.target.value)
  return { value, onChange: handleChange }
}

export default useFormInput
