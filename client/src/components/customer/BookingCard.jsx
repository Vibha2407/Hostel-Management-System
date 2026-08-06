import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { cancelBooking } from "../../services/bookingService";

const BookingCard = ({ booking, fetchBookings }) => {
  const navigate = useNavigate();
  const handleCancelBooking = async (id) => {
    try {
      const confirmCancel = window.confirm(
        "Are you sure you want to cancel this booking?",
      );

      if (!confirmCancel) return;

      const response = await cancelBooking(id);

      alert(response.message);

      fetchBookings();
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md !p-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">
            Room {booking.room?.roomNumber || "Deleted"}
          </h2>

          <p className="text-gray-500 !mt-2">
            {booking.room?.roomType || "-"} • {booking.room?.sharingType || "-"}
          </p>
        </div>

        <span
          className={`!px-4 !py-2 rounded-full font-semibold
${
  booking.bookingStatus === "Confirmed"
    ? "bg-green-100 text-green-700"
    : booking.bookingStatus === "Cancelled"
      ? "bg-red-100 text-red-700"
      : booking.bookingStatus === "Checked-In"
        ? "bg-blue-100 text-blue-700"
        : "bg-yellow-100 text-yellow-700"
}`}
        >
          {booking.bookingStatus}
        </span>
      </div>

      <div className="grid md:grid-cols-2 !gap-6 !mt-8">
        <div>
          <p>
            <strong>Check In:</strong>{" "}
            {new Date(booking.checkInDate).toLocaleDateString()}
          </p>

          <p className="!mt-3">
            <strong>Check Out:</strong>{" "}
            {new Date(booking.checkOutDate).toLocaleDateString()}
          </p>
        </div>

        <div>
          <p>
            <strong>Guests:</strong> {booking.numberOfGuests}
          </p>

          <p className="!mt-3">
            <strong>Total:</strong> ₹{booking.totalAmount}
          </p>
        </div>
      </div>

      <div className="flex !gap-4 !mt-8">
        <button
          onClick={() =>
            navigate("/customer/receipt", {
              state: {
                booking,
              },
            })
          }
          className="border border-gray-300 !px-5 !py-2 rounded-lg hover:bg-gray-100 transition"
        >
          View Details
        </button>

        {booking.room && booking.bookingStatus !== "Cancelled" && (
          <button
            onClick={() => handleCancelBooking(booking._id)}
            className="bg-red-500 text-white !px-5 !py-2 rounded-lg"
          >
            Cancel Booking
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingCard;
