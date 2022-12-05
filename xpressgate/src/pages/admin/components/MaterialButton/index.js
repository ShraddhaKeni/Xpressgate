import { Button } from '@mui/material'
import React from 'react'

function MaterialButton({ text, onClick, rounded = false, disabled = false, width, size = 'large' }) {
    return <Button
        sx={{ width: width }}
        size={size}
        className={`px-16 ${rounded ? 'rounded-full' : ''}`}
        variant="contained"
        type='primary'
        onClick={onClick}
        disabled={disabled}
        disableElevation={true}>{text}</Button>

}

export { MaterialButton }
