import { CalendarDays, BedDouble, CreditCard } from "lucide-react";

const BookingStats = ({ bookings }) => {
  const totalBookings = bookings.length;

  const currentStay = bookings.filter(
    (booking) =>
      booking.bookingStatus === "Confirmed" ||
      booking.bookingStatus === "Checked-In",
  ).length;

  const pendingPayments = bookings.filter(
    (booking) => booking.paymentStatus !== "Paid",
  ).length;
  const cards = [
    {
      title: "Total Bookings",
      value: totalBookings,
      icon: <CalendarDays size={34} />,
    },
    {
      title: "Current Stay",
      value: currentStay,
      icon: <BedDouble size={34} />,
    },
    {
      title: "Pending Payment",
      value: pendingPayments,
      icon: <CreditCard size={34} />,
    },
  ];

  return (
    <div className="grid md:grid-cols-3 !gap-6 !mt-10">
      {cards.map((card) => (
        <div key={card.title} className="bg-white rounded-2xl shadow-md !p-6">
          <div className="text-[#D4AF37]">{card.icon}</div>

          <h3 className="!mt-5 text-gray-500">{card.title}</h3>

          <h1 className="text-3xl font-bold !mt-2">{card.value}</h1>
        </div>
      ))}
    </div>
  );
};

export default BookingStats;
