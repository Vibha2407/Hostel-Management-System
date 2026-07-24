import { useEffect, useState } from "react";
import { getMyBookings } from "../../services/bookingService";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getMyBookings();
        setBookings(data.bookings);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="!max-w-7xl !mx-auto !px-6 !py-10">
      <h1 className="text-4xl !font-bold !mb-8">My Bookings</h1>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="!space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-xl shadow-md !p-6"
            >
              <h2 className="!text-2xl !font-bold">
                Room {booking.room.roomNumber}
              </h2>

              <p>Booking Type: {booking.bookingType}</p>

              <p>
                Check In: {new Date(booking.checkInDate).toLocaleDateString()}
              </p>

              <p>
                Check Out: {new Date(booking.checkOutDate).toLocaleDateString()}
              </p>

              <p>Guests: {booking.numberOfGuests}</p>

              <p>Total Amount: ₹{booking.totalAmount}</p>

              <p>Status: {booking.bookingStatus}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
