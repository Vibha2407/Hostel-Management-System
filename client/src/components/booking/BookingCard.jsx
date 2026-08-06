import { useEffect, useState } from "react";
import { getMyBookings } from "../../services/bookingService";
import BookingCard from "../../components/customer/BookingCard";

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
    <section className="!max-w-7xl !mx-auto !px-6 !py-10">
      <h1 className="text-4xl font-bold !mb-10">My Bookings</h1>

      <div className="space-y-8">
        {bookings.length === 0 ? (
          <div className="text-center !py-20 text-gray-500">
            No bookings available.
          </div>
        ) : (
          bookings.map((booking) => (
            <BookingCard key={booking._id} booking={booking} />
          ))
        )}
      </div>
    </section>
  );
};

export default MyBookings;
