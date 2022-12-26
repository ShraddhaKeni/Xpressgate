import React, { useState } from 'react'
//import { DatePicker } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';

export const SimpleInputComponent = ({ name, id, label, onChange, type = 'text', text = '', required = false, placeholder = '', value = '', defaultValue = '' }) => {
    const [t, setValue] = useState(text);
    return (
        <div class="form-group row align-items-center">
            <label class="col-lg-2 col-form-label float-left GForm_label">
                 {" "}
                {label}
            </label>
            <div class="col-lg-8">
                {(type == 'text' || type == 'number') && <TextField
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    onChange={(e) => { onChange(e); setValue(e.target.value) }}
                    sx={{ background: 'white', "& .MuiOutlinedInput-root": { "& > fieldset": { border: '2px solid #14335D', borderRadius: '8px', } } }}
                    value={t || text}
                    id={id}
                    fullWidth
                    disableUnderline
                    required={required}
                    InputProps={{ style: { fontSize: '1.5rem' } }}
                ></TextField>}
                {type === 'textarea' && <textarea
                    type={type}
                    class="form-control input-lg form-input-bg"
                    name={name}
                    placeholder={placeholder}
                    rows="6"
                    text={text}
                    onChange={onChange}
                    id={id}
                    required={required}
                ></textarea>}
                {type === 'datepicker' &&
                    <TextField
                        type={'date'}
                        name={name}
                        placeholder={placeholder}
                        sx={{ background: 'white', "& .MuiOutlinedInput-root": { "& > fieldset": { border: '2px solid #14335D', borderRadius: '8px', } } }}
                        onChange={onChange}
                        text={value}
                        defaultValue={new Date().toISOString().slice(0, 10)}
                        id={id}
                        size={'medium'}
                        fullWidth
                        required={required}
                        inputProps={{
                            style: { fontSize: '1.5rem' },
                            min: new Date().toISOString().slice(0, 16),
                        }}
                    ></TextField>

                }
            </div>
        </div >
    )
}

export const SimpleDropDownComponent = ({ name, id, label, onChange, items = [], selected = '' }) => {
    return (
        <div class="form-group row">
            <label for="inputentryno" class="col-sm-2 col-md-2 col-lg-2 col-form-label float-left GForm_label" >{label}</label>
            <div class="col-sm-4 col-md-4 col-lg-8">
                <select type="text" class="form-control form-input-bg" name={name} id={id} onChange={onChange}>
                    <option disabled selected value={null}>Select {label}</option>
                    {items.map((item) => {
                        if (selected == item.id) {
                            return <option value={item["id"]} key={item["id"]} selected>{item.option}</option>
                        }
                        return <option value={item["id"]} key={item["id"]}>{item.option}</option>
                    })}
                </select>
            </div>
        </div>
    )
}
