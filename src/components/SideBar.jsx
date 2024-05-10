import React from "react";
import { IconContext } from "react-icons";
import { CgProfile } from "react-icons/cg";
import { RxCalendar } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { RiLoginBoxLine } from "react-icons/ri";
import { RiLogoutBoxLine } from "react-icons/ri";

export default function SideBar({ done, setDone, status, handleLogout }) {
  return (
    <div className="bg-white text-original shadow-md">
      <h3 className="text-center font-bold font-sans text-lg pt-28 pb-10"></h3>
      <div className="flex justify-center text-lg font-sans font-bold">
        <div className="flex-col pt-20 px-1">
          <IconContext.Provider value={{ size: "23px" }}>
            <div
              className={`hover:bg-original hover:text-white py-5 flex justify-center px-5 rounded-md mb-1`}
            >
              <CgProfile className="self-center" />
              {/* <p className='self-center'>Account</p> */}
            </div>
            <div
              className={`${
                done && "bg-original text-white"
              } hover:bg-original hover:text-white py-5 flex justify-center rounded-md mb-1`}
              onClick={() => setDone(!done)}
            >
              <FaCheck className="self-center" />
              {/* <p className='self-center'>Done</p> */}
            </div>
            <div className="hover:bg-original hover:text-white  py-5 flex justify-center rounded-md mb-1">
              <FaRegTrashCan className="self-center" />
              {/* <p className='self-center'>Trash</p> */}
            </div>
            <div className="hover:bg-original hover:text-white  py-5 flex justify-center rounded-md mb-1">
              <RxCalendar className="self-center" />
              {/* <p className='self-center'>Calendar</p> */}
            </div>
            <div className="hover:bg-original hover:text-white py-5 flex justify-center rounded-md mb-1">
              <IoMdSettings className="self-center" />
              {/* <p className='self-center'>Setting</p> */}
            </div>
            <div
            onClick={handleLogout}
            className="hover:bg-original hover:text-white py-5 flex justify-center rounded-md mb-1">
              {status ? (
                <RiLogoutBoxLine className="self-center" />
              ) : (
                <RiLoginBoxLine className="self-center" />
              )}
              {/* <p className='self-center'>Setting</p> */}
            </div>
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
}
