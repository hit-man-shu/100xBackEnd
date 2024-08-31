import React from "react";

const Input = ({ label, id, ...props }) => {
  return (
    <>
      <div className="mb-4">
        <label
          className="mb-2 block text-lg font-bold text-[#ffc404]"
          htmlFor={id}
        >
          {label}
        </label>
        <input
          className="focus:shadow-outline w-80 appearance-none rounded border px-8 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          id={id}
          name={id}
          {...props}
          required
        />
      </div>
    </>
  );
};

export default Input;
