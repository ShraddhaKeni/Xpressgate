import React from 'react'

export const SimpleInputComponent = ({ name, id, label, onChange, type = 'text' }) => {
    return (
        <div class="form-group row">
            <label class="col-lg-2 col-form-label float-left">
                {" "}
                {label}
            </label>
            <div class="col-lg-4">
                {type === 'text' && <input
                    type={type}
                    class="form-control input-lg"
                    name={name}
                    placeholder=""
                    onChange={onChange}
                    id={id}
                ></input>}
                {type === 'textarea' && <textarea
                    type={type}
                    class="form-control input-lg"
                    name={name}
                    placeholder=""
                    rows="4"
                    onChange={onChange}
                    id={id}
                ></textarea>}
            </div>
        </div>
    )
}

export const SimpleDropDownComponent = ({ name, id, label, onChange, items = [] }) => {
    return (
        <div class="form-group row">
            <label for="inputentryno" class="col-sm-2 col-md-2 col-lg-2 col-form-label">{label}</label>
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
