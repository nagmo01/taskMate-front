import React from "react";
import { IconContext } from "react-icons";
import { CgProfile } from "react-icons/cg";
import { RxCalendar } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { RiLoginBoxLine } from "react-icons/ri";
import { RiLogoutBoxLine } from "react-icons/ri";

export default function SideBar({ done, setDone, status, setStatus, handleAccount }) {

  const handleCompleteList = () => {
    if(localStorage.getItem('uid')){
      setDone(!done)
    }
  }
  return (
    <div className="bg-white text-original shadow-md">
      <h3 className="text-center font-bold font-sans text-lg pt-28 pb-10"></h3>
      <div className="flex justify-center text-lg font-sans font-bold">
        <div className="flex-col pt-20 px-1">
          <IconContext.Provider value={{ size: "23px" }}>
            <div
            onClick={handleAccount}
              className={`hover:bg-original hover:text-white py-5 flex justify-center px-5 rounded-md mb-1`}
            >
              <CgProfile
              className="self-center" />
              {/* <p className='self-center'>Account</p> */}
            </div>
            <div
              className={`${
                done && "bg-original text-white"
              } hover:bg-original hover:text-white py-5 flex justify-center rounded-md mb-1`}
              onClick={handleCompleteList}
            >
              <FaCheck className="self-center" />
              {/* <p className='self-center'>Done</p> */}
            </div>
            <div className="hover:bg-original hover:text-white  py-5 flex justify-center rounded-md mb-1">
              <FaRegTrashCan className="self-center" />
            </div>
            <div className="hover:bg-original hover:text-white  py-5 flex justify-center rounded-md mb-1">
              <RxCalendar className="self-center" />
            </div>
            <div
            onClick={() => setStatus("setting")}
            className="hover:bg-original hover:text-white py-5 flex justify-center rounded-md mb-1">
              <IoMdSettings className="self-center" />
              {/* <p className='self-center'>Setting</p> */}
            </div>
            {/* <div
            className="hover:bg-original hover:text-white py-5 flex justify-center rounded-md mb-1">
              {status === "logged_in" ? (
                <RiLogoutBoxLine className="self-center"
                onClick={handleLogout}
                />
              ) : (
                <RiLoginBoxLine className="self-center"
                onClick={() => setStatus("session")}
                />
              )}
            </div> */}
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
}
