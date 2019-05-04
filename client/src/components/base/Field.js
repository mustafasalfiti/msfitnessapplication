import React from 'react';



export default function Field({ value  , onChange , name, label , placeholder , type , showError , errors  }) {
 
 
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
        onChange={onChange}
        
      />
    </div>
  );
}