
import React from "react";
import { assets, dummyUserData } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const NavbarOwner = () => {
  const {user} = useAppContext();

  return (
    <div className="flex items-center justify-between px-6 md:px-10 py-4 text-gray-500 border-b border-borderColor">
      <Link to="/" className="flex items-center">
        <img src={assets.logo} alt="Logo" className="h-7" />
      </Link>
      <p className="text-sm md:text-base">Welcome, {user?.name || "Owner"}</p>
    </div>
  );
};

export default NavbarOwner;
