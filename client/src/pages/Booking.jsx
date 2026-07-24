import { useParams } from "react-router-dom";
import { useState } from "react";
import { createBooking } from "../services/bookingService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Booking = () => {
  const { id } = useParams();
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  const [bookingType, setBookingType] = useState("Daily");

  const [numberOfGuests, setNumberOfGuests] = useState(1);

  const [specialRequest, setSpecialRequest] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const bookingData = {
        room: id,
        checkInDate,
        checkOutDate,
        bookingType,
        numberOfGuests,
        specialRequest,
      };

      const data = await createBooking(bookingData);

      toast.success(data.message);

      navigate("/customer/bookings");
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold mb-8">Book Your Room</h1>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 !gap-6">
        <input
          type="date"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
          className="border !p-3 rounded-lg"
        />
        <input
          type="date"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
          className="border !p-3 rounded-lg"
        />
        <select
          value={bookingType}
          onChange={(e) => setBookingType(e.target.value)}
          className="border !p-3 rounded-lg"
        >
          <option>Daily</option>
          <option>Weekly</option>
          <option>Monthly</option>
        </select>

        {/* <input placeholder="Full Name" className="border p-3 rounded-lg" />

        <input placeholder="Phone" className="border p-3 rounded-lg" />

        <input placeholder="Email" className="border p-3 rounded-lg" /> */}

        <input
          type="number"
          min="1"
          value={numberOfGuests}
          onChange={(e) => setNumberOfGuests(Number(e.target.value))}
          className="border !p-3 rounded-lg"
        />

        <textarea
          rows={5}
          value={specialRequest}
          onChange={(e) => setSpecialRequest(e.target.value)}
          className="border !p-3 rounded-lg md:col-span-2"
        />

        <button
          type="submit"
          className="bg-[#D4AF37] text-white !py-4 rounded-lg !md:col-span-2"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default Booking;
