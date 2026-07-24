import { useState } from "react";
import { Link } from "react-router-dom";

const BookingCard = ({ room }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const calculateDays = () => {
    if (!checkIn || !checkOut) return 0;

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    const diff = end - start;

    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const totalDays = calculateDays();

  const totalPrice = totalDays * room.pricePerDay;

  return (
    <div className="bg-white shadow-xl rounded-2xl !p-6 sticky top-24">
      <h2 className="text-2xl font-bold !mb-6">Book This Room</h2>
      <label className="block !mb-2 font-medium">Check In</label>
      <input
        type="date"
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
        className="w-full border rounded-lg !p-3 !mb-5"
      />
      <label className="block !mb-2 font-medium">Check Out</label>
      <input
        type="date"
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
        className="w-full border rounded-lg !p-3 !mb-5"
      />
      <hr className="!my-5" />
      <p className="!mb-3">
        Price Per Day:
        <strong> ₹{room.pricePerDay}</strong>
      </p>
      <p className="!mb-3">
        Total Days:
        <strong> {totalDays}</strong>
      </p>
      <p className="text-xl font-bold !mb-6">
        Total:
        <span className="text-[#D4AF37]"> ₹{totalPrice}</span>
      </p>
      <Link
        to={`/booking/${room._id}`}
        className="bg-[#D4AF37] text-white px-10 py-4 rounded-xl inline-block"
      >
        Book Now
      </Link>
    </div>
  );
};

export default BookingCard;
