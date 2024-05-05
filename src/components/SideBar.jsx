import React from "react";
import { IconContext } from "react-icons";
import { CgProfile } from "react-icons/cg";
import { RxCalendar } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";


export default function SideBar() {
  return (
    <div className="bg-white text-original shadow-md">
      <h3 className="text-center font-bold font-sans text-lg mt-28 mb-10"></h3>
      <div className="flex justify-center text-lg font-sans font-bold">
        <div className="flex-col ms-5 me-1 pt-20 mt-1">
          <IconContext.Provider value={{ size: "23px" }}>
            <div className="py-5 flex text-start me-3">
              <CgProfile className="self-center me-3" />
              {/* <p className='self-center'>Account</p> */}
            </div>
            <div className="py-5 flex text-start me-3">
              <FaCheck className="self-center me-3" />
              {/* <p className='self-center'>Done</p> */}
            </div>
            <div className="py-5 flex text-start me-3">
              <FaRegTrashCan className="self-center me-3" />
              {/* <p className='self-center'>Trash</p> */}
            </div>
            <div className="py-5 flex text-start me-3">
              <RxCalendar className="self-center me-3" />
              {/* <p className='self-center'>Calendar</p> */}
            </div>
            <div className="py-5 flex text-start me-3">
              <IoMdSettings className="self-center me-3" />
              {/* <p className='self-center'>Setting</p> */}
            </div>
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
}
