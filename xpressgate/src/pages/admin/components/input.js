import React from 'react'
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';


export const SimpleInputComponent = ({ name, id, label, onChange, type = 'text', text = '', required = false, placeholder = '', value = '' }) => {
    return (
        <div class="form-group row">
            <label class="col-lg-2 col-form-label float-left">
                {" "}
                {label}
            </label>
            <div class="col-lg-4">
                {(type == 'text' || type == 'number') && <TextField
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    onChange={onChange}
                    text
                    id={id}
                    size={'small'}
                    fullWidth
                    required={required}
                ></TextField>}
                {type === 'textarea' && <textarea
                    type={type}
                    class="form-control input-lg"
                    name={name}
                    placeholder={placeholder}
                    rows="4"
                    text
                    onChange={onChange}
                    id={id}
                    required={required}
                ></textarea>}
                {type === 'datepicker' &&
                    <TextField
                        type={'date'}
                        name={name}
                        placeholder={placeholder}
                        onChange={onChange}
                        text={value}
                        defaultValue={new Date().toISOString().slice(0, 10)}
                        id={id}
                        size={'small'}
                        fullWidth
                        required={required}
                        inputProps={{
                            min: new Date().toISOString().slice(0, 16),
                        }}
                    ></TextField>

                }
            </div>
        </div>
    )
}

export const SimpleDropDownComponent = ({ name, id, label, onChange, items = [] }) => {
    return (
        <div class="form-group row">
            <label for="inputentryno" class="col-sm-2 col-md-2 col-lg-2 col-form-label float-left">{label}</label>
            <div class="col-sm-4 col-md-4 col-lg-4">
                <select type="text" class="form-control input-lg" name={name} id={id} onChange={onChange}>
                    <option disabled selected value={null}>Select {label}</option>
                    {items.map((item) => {
                        return (
                            <option value={item._id}>{item.option}</option>
                        )
                    })}
                </select>
            </div>
        </div>
    )
}
