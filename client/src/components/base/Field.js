import React from 'react';



export default function Field({setValues , className , value ,  name, label , placeholder , type , showError , errors  }) {
  function handleChange(event) {
    event.persist();
    setValues(prevValues => ({
      ...prevValues,
      [event.target.name]: event.target.value
    }));
  }
 
  return (
    <div className="label-input">
      <label>{label} : </label>
      <span className="errorText">
        {errors[name] && showError ? errors[name]: ""}
      </span>
      <input
        className={errors[name]&& showError ? "input-error" : ""}
        value={value[name]}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        className={className}
        
      />
    </div>
  );
}