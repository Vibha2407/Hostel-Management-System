const BookingForm = ({ bookingData, setBookingData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg !p-6">
      <h2 className="text-2xl font-bold !mb-6">Booking Details</h2>

      <div className="!space-y-5">
        {/* Check In */}

        <div>
          <label className="block !mb-2 font-semibold">Check In</label>

          <input
            type="date"
            name="checkInDate"
            value={bookingData.checkInDate}
            onChange={handleChange}
            className="w-full border rounded-lg !p-3"
          />
        </div>

        {/* Check Out */}

        <div>
          <label className="block !mb-2 font-semibold">Check Out</label>

          <input
            type="date"
            name="checkOutDate"
            value={bookingData.checkOutDate}
            onChange={handleChange}
            className="w-full border rounded-lg !p-3"
          />
        </div>

        {/* Guests */}

        <div>
          <label className="block !mb-2 font-semibold">Number of Guests</label>

          <input
            type="number"
            min="1"
            name="numberOfGuests"
            value={bookingData.numberOfGuests}
            onChange={handleChange}
            className="w-full border rounded-lg !p-3"
          />
        </div>

        {/* Booking Type */}

        <div>
          <label className="block !mb-2 font-semibold">Booking Type</label>

          <select
            name="bookingType"
            value={bookingData.bookingType}
            onChange={handleChange}
            className="w-full border rounded-lg !p-3"
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>

        {/* Special Request */}

        <div>
          <label className="block !mb-2 font-semibold">Special Request</label>

          <textarea
            rows="4"
            name="specialRequest"
            value={bookingData.specialRequest}
            onChange={handleChange}
            placeholder="Any special request..."
            className="w-full border rounded-lg !p-3"
          />
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
