import React, { useEffect, useState } from "react";
import TitleOwner from "../../components/owner/TitleOwner";
import { dummyCarData, dummyMyBookingsData } from "../../assets/assets";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";

const ManageBooking = () => {
  const { axios, isOwner, navigate, currency } = useAppContext();

  const [bookings, setBookings] = useState([]);

  const fetchOwnerBookings = async () => {
    // setBookings(dummyMyBookingsData);
    try {
      const { data } = await axios.get("/api/bookings/owner");
      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeBookingStatus = async (bookingId, status) => {
    // setBookings(dummyMyBookingsData);
    try {
      const { data } = await axios.post("/api/bookings/change-status", {
        bookingId,
        status,
      });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerBookings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOwnerBookings();
  }, []);

  // Handler to change booking status to "pending"
  const handleSetPending = (bookingId) => {
    changeBookingStatus(bookingId, "pending");
  };

  // Handler to change booking status to "confirmed"
  const handleSetConfirmed = (bookingId) => {
    changeBookingStatus(bookingId, "confirmed");
  };

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <TitleOwner
        title="Manage Bookings"
        subTitle="view all bookings and manage"
      />

      <div className="max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6">
        <table className="w-full border-collapse text-left text-sm text-gray-500">
          <thead className="text-gray-500">
            <tr>
              <th className="p-3 font-medium ">Car</th>
              <th className="p-3 font-medium max-md:hidden">Category</th>
              <th className="p-3 font-medium ">Price</th>
              <th className="p-3 font-medium max-md:hidden">Status</th>
              <th className="p-3 font-medium ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr
                key={index}
                className="border-t border-borderColor text-gray-500"
              >
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={booking.car.image}
                    alt=""
                    className="h-12 w-12 aspect-square rounded-md object-cover"
                  />
                  <td>
                    {booking.car.brand} . {booking.car.model}
                  </td>
                </td>

                <td className="p-3 max-md:hidden">
                  {booking.pickupDate.split("T")[0]} to{" "}
                  {booking.returnDate.split("T")[0]}
                </td>

                <td className="p-3">
                  {currency} {booking.price}
                </td>

                <td className="p-3 max-md:hidden">
                  <span
                    className={`px-3 py-1 rounded-full text-xs
      ${
        booking.status === "confirmed"
          ? "bg-green-100 text-green-500"
          : "bg-yellow-100 text-yellow-500"
      }
    `}
                  >
                    {booking.status === "confirmed" ? "Confirmed" : "Pending"}
                  </span>
                </td>
                <td className="p-3 flex gap-2">
                  {booking.cancelled ? (
                    <span className="block text-xs px-3 py-1 rounded-md bg-gray-100 text-gray-500">
                      Cancelled
                    </span>
                  ) : (
                    <>
                      {booking.status !== "pending" && (
                        <button
                          onClick={() => handleSetPending(booking._id)}
                          className="px-3 py-1 rounded-md bg-yellow-500 text-white text-xs hover:bg-yellow-600"
                        >
                          Set Pending
                        </button>
                      )}
                      {booking.status !== "confirmed" && (
                        <button
                          onClick={() => handleSetConfirmed(booking._id)}
                          className="px-3 py-1 rounded-md bg-green-500 text-white text-xs hover:bg-green-600"
                        >
                          Confirm
                        </button>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBooking;
