import React, { useEffect, useState } from "react";
import TitleOwner from "../../components/owner/TitleOwner";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";

const ManageBooking = () => {
  const { axios, isOwner, navigate, currency } = useAppContext();

  const [bookings, setBookings] = useState([]);

  // Fetch bookings for this owner
  const fetchOwnerBookings = async () => {
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

  // Change status handler
  const changeBookingStatus = async (bookingId, status) => {
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

  // Convenience handlers
  const handleSetPending = (bookingId) => {
    changeBookingStatus(bookingId, "pending");
  };

  const handleSetConfirmed = (bookingId) => {
    changeBookingStatus(bookingId, "confirmed");
  };

  const handleSetCancelled = (bookingId) => {
    changeBookingStatus(bookingId, "cancelled");
  };

  useEffect(() => {
    fetchOwnerBookings();
  }, []);

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
                  <div>
                    {booking.car.brand} . {booking.car.model}
                  </div>
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
                          : booking.status === "pending"
                          ? "bg-yellow-100 text-yellow-500"
                          : "bg-gray-100 text-gray-500"
                      }
                    `}
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </td>

                <td className="p-3 flex gap-2 items-center">
                  {booking.cancelled ? (
                    <span className="block text-xs px-3 py-1 rounded-md bg-gray-100 text-gray-500">
                      Cancelled
                    </span>
                  ) : booking.status === "pending" ? (
                    <select
                      value="pending"
                      onChange={(e) => {
                        const selected = e.target.value;
                        if (selected === "confirmed") handleSetConfirmed(booking._id);
                        if (selected === "cancelled") handleSetCancelled(booking._id);
                      }}
                      className="border border-borderColor px-2 py-1 rounded text-xs bg-white text-gray-700"
                    >
                      <option value="pending" disabled>
                        Pending
                      </option>
                      <option value="confirmed">Confirm</option>
                      <option value="cancelled">Cancel</option>
                    </select>
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
