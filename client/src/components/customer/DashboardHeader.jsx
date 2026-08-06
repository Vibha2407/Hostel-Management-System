import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { getMyBookings } from "../../services/bookingService";

const DashboardHeader = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useContext(AuthContext);

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

  const totalBookings = bookings.length;

  const currentStay = bookings.filter(
    (booking) =>
      booking.bookingStatus === "Confirmed" ||
      booking.bookingStatus === "Checked-In",
  ).length;

  const pendingPayment = bookings.filter(
    (booking) => booking.paymentStatus !== "Paid",
  ).length;

  const cancelledBookings = bookings.filter(
    (booking) => booking.bookingStatus === "Cancelled",
  ).length;

  return (
    <div className="bg-white rounded-3xl shadow-md !p-8 !mb-8">
      <h1 className="text-4xl font-bold">Welcome Back 👋</h1>

      <p className="text-gray-600 !mt-2">{user?.fullName}</p>

      <p className="text-gray-500 !mt-3">
        Manage your bookings, profile and payments from one place.
      </p>
    </div>
  );
};

export default DashboardHeader;
