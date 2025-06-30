import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-60 text-sm text-gray-500">
      <div className="flex flex-wrap justify-between gap-12 md:gap-6">
        <div className="max-w-80">
          <img src={assets.logo} alt="logo" className="mb-4 h-8 md:h-9" />
          <p className="text-sm">Premium Car Rental Service</p>
          <div className="flex items-center gap-3 mt-6">

            <a href="#">
                <img src={assets.facebook_logo} alt="" className="w-5 h-5" />
            </a>
            {/* Instagram */}
               <a href="#">
                <img src={assets.instagram_logo} alt="" className="w-5 h-5" />
            </a>
            {/* Facebook */}   <a href="#">
                <img src={assets.twitter_logo} alt="" className="w-5 h-5" />
            </a>
            {/* Twitter */}   <a href="#">
                <img src={assets.gmail_logo} alt="" className="w-5 h-5" />
            </a>
       
          </div>
        </div>

        <div>
        <h2 className="text-base font-medium text-gray-800 uppercase">Quick Links</h2>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Browse Cars</a>
            </li>
            <li>
              <a href="#">List Your Cars</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
            
          </ul>
        </div>

        <div>
          <p className="text-lg text-gray-800">Contact </p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li>
              {/* <a href="#"></a> */}
              1234 Luxury Drive
            </li>
            <li>
              {/* <a href="#">Safety Information</a> */}
              Al Nahda, UAE
            </li>
            <li>
              {/* <a href="#">Cancellation Options</a> */}
              +9713 43443 4
            </li>
            <li>
              {/* <a href="#">Contact Us</a> */}
              thilshan.dev@gmail.com
            </li>
           
          </ul>
        </div>

        <div className="max-w-80">
          <p className="text-lg text-gray-800">STAY UPDATED</p>
          <p className="mt-3 text-sm">
            Subscribe to our newsletter for inspiration and special offers.
          </p>
          <div className="flex items-center mt-4">
            <input
              type="text"
              className="bg-white rounded-l border border-gray-300 h-9 px-3 outline-none"
              placeholder="Your email"
            />
            <button className="flex items-center justify-center bg-black h-9 w-9 aspect-square rounded-r">
              {/* Arrow icon */}
              <svg
                className="w-4 h-4 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 12H5m14 0-4 4m4-4-4-4"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <hr className="border-gray-300 mt-8" />
      <div className="flex flex-col md:flex-row gap-2 items-center justify-between py-5">
        <p>© {new Date().getFullYear()} Brand. All rights reserved.</p>
        <ul className="flex items-center gap-4">
          <li>
            <a href="#">Privacy</a>
          </li>
          <li>
            <a href="#">Terms</a>
          </li>
          <li>
            <a href="#">Sitemap</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
