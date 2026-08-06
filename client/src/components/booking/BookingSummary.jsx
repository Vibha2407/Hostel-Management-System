import { useMemo } from "react";

const BookingSummary = ({ room, bookingData, onProceed }) => {
  const totalAmount = useMemo(() => {
    if (!bookingData.checkInDate || !bookingData.checkOutDate) return 0;

    const checkIn = new Date(bookingData.checkInDate);
    const checkOut = new Date(bookingData.checkOutDate);

    const diff = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

    if (diff <= 0) return 0;

    switch (bookingData.bookingType) {
      case "Daily":
        return diff * room.pricePerDay;

      case "Weekly":
        return Math.ceil(diff / 7) * room.pricePerWeek;

      case "Monthly":
        return Math.ceil(diff / 30) * room.pricePerMonth;

      default:
        return 0;
    }
  }, [bookingData, room]);

  const totalDays =
    bookingData.checkInDate && bookingData.checkOutDate
      ? Math.ceil(
          (new Date(bookingData.checkOutDate) -
            new Date(bookingData.checkInDate)) /
            (1000 * 60 * 60 * 24),
        )
      : 0;

  return (
    <div className="bg-white shadow-lg rounded-2xl !p-6 sticky top-24">
      <h2 className="text-2xl font-bold !mb-6">Booking Summary</h2>

      <div className="!space-y-4">
        <div className="flex justify-between">
          <span>Room</span>
          <span>{room.roomNumber}</span>
        </div>

        <div className="flex justify-between">
          <span>Booking Type</span>
          <span>{bookingData.bookingType}</span>
        </div>

        <div className="flex justify-between">
          <span>Guests</span>
          <span>{bookingData.numberOfGuests}</span>
        </div>

        <div className="flex justify-between">
          <span>Total Days</span>
          <span>{totalDays}</span>
        </div>

        <hr />

        <div className="flex justify-between text-xl font-bold text-[#D4AF37]">
          <span>Total Amount</span>
          <span>₹{totalAmount}</span>
        </div>
      </div>

      <button
        onClick={() => onProceed(totalAmount)}
        disabled={totalAmount === 0}
        className="w-full !mt-8 bg-[#D4AF37] text-white !py-4 rounded-xl hover:bg-yellow-600 disabled:bg-gray-400"
      >
        Proceed To Payment
      </button>
    </div>
  );
};

export default BookingSummary;
