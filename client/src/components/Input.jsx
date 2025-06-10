import React from "react";

function Input({ label, type, value, onChange, required, name }) {
  return (
    <div className="flex flex-col mb-3">
      <label className="font-medium text-[#ffffff80]">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        name={name}
        className="border-1 border-[#ffffff75] rounded p-[0.25em_0.5em] bg-transparent text-white"
      />
    </div>
  );
}

export default Input;
