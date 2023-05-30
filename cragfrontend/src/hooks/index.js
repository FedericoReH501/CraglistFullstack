import { useState } from 'react'
import { useDispatch } from 'react-redux'
export const useTextInput = (type) => {
    const [value, setValue] = useState('')
    const input = {
        type: type,
        name: type,
        id: type,
        label: type,
    }
    const onChange = (e) => {
        setValue(e.target.value)
    }
    return { ...input, value, onChange }
}
