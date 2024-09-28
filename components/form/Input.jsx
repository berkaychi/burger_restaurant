import React from "react";

const Input = () => {
  return (
    <div className="w-full">
      <label className="relative block cursor-text">
        <input
          type="text"
          className="h-14 w-full border border-primary outline-none px-4 peer rounded-xl"
          require
        />
        <span className="absolute top-0 left-0 px-4 text-sm flex h-full peer-focus:placeholder:hidden"></span>
      </label>
    </div>
  );
};

export default Input;
