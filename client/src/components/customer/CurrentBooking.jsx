const CurrentBooking = ({ bookings }) => {
  const currentBooking = bookings.find(
    (booking) =>
      booking.room &&
      (booking.bookingStatus === "Confirmed" ||
        booking.bookingStatus === "Checked-In"),
  );

  return (
    <div className="bg-white rounded-2xl shadow-md !p-8 !mt-10">
      <h2 className="text-2xl font-bold !mb-6">Current Booking</h2>

      {!currentBooking ? (
        <div className="text-center text-gray-500 !py-10">
          No active booking found.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 !gap-6">
          <div>
            <p className="text-gray-500">Room Number</p>
            <h3 className="text-xl font-semibold">
              {currentBooking.room?.roomNumber || "-"}
            </h3>
          </div>

          <div>
            <p className="text-gray-500">Room Type</p>
            <h3 className="text-xl font-semibold">
              {currentBooking.room?.roomType || "-"}
            </h3>
          </div>

          <div>
            <p className="text-gray-500">Sharing Type</p>
            <h3 className="text-xl font-semibold">
              {currentBooking.room?.sharingType || "-"}
            </h3>
          </div>

          <div>
            <p className="text-gray-500">Guests</p>
            <h3 className="text-xl font-semibold">
              {currentBooking.numberOfGuests}
            </h3>
          </div>

          <div>
            <p className="text-gray-500">Check In</p>
            <h3 className="text-xl font-semibold">
              {new Date(currentBooking.checkInDate).toLocaleDateString()}
            </h3>
          </div>

          <div>
            <p className="text-gray-500">Check Out</p>
            <h3 className="text-xl font-semibold">
              {new Date(currentBooking.checkOutDate).toLocaleDateString()}
            </h3>
          </div>

          <div>
            <p className="text-gray-500">Amount Paid</p>
            <h3 className="text-xl font-semibold text-[#D4AF37]">
              ₹{currentBooking.totalAmount}
            </h3>
          </div>

          <div>
            <p className="text-gray-500">Booking Status</p>

            <span className="inline-block !mt-2 !px-4 !py-2 rounded-full bg-green-100 text-green-700 font-medium">
              {currentBooking.bookingStatus}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentBooking;
