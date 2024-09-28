import React from "react";
import Input from "@/components/form/Input";

const page = () => {
  return (
    <div className="justify-items-center h-screen w-screen bg-gray-200 py-20">
      <div className="container mx-auto bg-secondary w-2/4 h-64 rounded-xl">
        <div className="flex flex-col items-center w-3/4 mx-auto py-3">
          <h1 className="text-white text-2xl">Admin Login</h1>
          <div className="flex flex-col gap-y-2 py-2 w-full">
            <Input />
            <Input />
            <button className="menu_btn">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
