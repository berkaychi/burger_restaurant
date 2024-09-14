import React from "react";
import reactOutsideClickHandler from "react-outside-click-handler";
import OutsideClickHandler from "react-outside-click-handler/build/OutsideClickHandler";
import { MdOutlineCancel } from "react-icons/md";

const Search = ({ setisSearchClick }) => {
  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen z-50 after:content-[''] after:w-screen after:h-screen
     after:bg-white after:absolute after:top-0 after:left-0 after:opacity-60 grid place-content-center"
    >
      <OutsideClickHandler onOutsideClick={() => setisSearchClick(false)}>
        <div className="w-full h-full grid-place-content-center">
          <div className="relative z-50 w-[600px] h-[600px] bg-secondary border-2 p-5">
            <h1 className="title text-center">Search</h1>
            <input
              type="text"
              placeholder=""
              className="border w-full bg-secondary border-primary rounded-full text-center"
            />
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default Search;
