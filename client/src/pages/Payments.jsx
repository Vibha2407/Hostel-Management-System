import { useLocation } from "react-router-dom";
import { createBooking } from "../services/bookingService";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      console.log("Payment Button Clicked");

      const booking = {
        room: room._id,
        checkInDate: bookingData.checkInDate,
        checkOutDate: bookingData.checkOutDate,
        bookingType: bookingData.bookingType,
        numberOfGuests: bookingData.numberOfGuests,
        specialRequest: bookingData.specialRequest,
      };

      console.log("Sending Booking:", booking);

      const response = await createBooking(booking);

      console.log("Booking Response:", response);

      alert("Payment Successful!");

      navigate("/customer/receipt", {
        state: {
          booking: response.booking,
        },
      });
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Something went wrong.");
    }
  };

  if (!state) {
    return (
      <div className="text-center !py-20 text-xl">Invalid Payment Request</div>
    );
  }

  const { room, bookingData, totalAmount } = state;

  return (
    <div className="!max-w-6xl !mx-auto !py-10 !px-6">
      <h1 className="text-4xl font-bold !mb-10">Complete Your Payment</h1>

      <div className="grid !md:grid-cols-2 !gap-10">
        {/* Booking Summary */}

        <div className="bg-white shadow rounded-xl !p-6">
          <h2 className="text-2xl font-bold !mb-5">Booking Summary</h2>

          <div className="!space-y-4">
            <div className="flex justify-between">
              <span>Room</span>
              <span>{room.roomNumber}</span>
            </div>

            <div className="flex justify-between">
              <span>Guests</span>
              <span>{bookingData.numberOfGuests}</span>
            </div>

            <div className="flex justify-between">
              <span>Booking Type</span>
              <span>{bookingData.bookingType}</span>
            </div>

            <div className="flex justify-between">
              <span>Check-In</span>
              <span>{bookingData.checkInDate}</span>
            </div>

            <div className="flex justify-between">
              <span>Check-Out</span>
              <span>{bookingData.checkOutDate}</span>
            </div>

            <hr />

            <div className="flex justify-between text-2xl font-bold text-[#D4AF37]">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Payment */}

        <div className="bg-white shadow rounded-xl !p-6">
          <h2 className="text-2xl font-bold !mb-6">Select Payment Method</h2>

          <div className="!space-y-4">
            <label className="flex items-center !gap-3">
              <input type="radio" name="payment" defaultChecked />
              UPI
            </label>

            <label className="flex items-center !gap-3">
              <input type="radio" name="payment" />
              Debit Card
            </label>

            <label className="flex items-center !gap-3">
              <input type="radio" name="payment" />
              Credit Card
            </label>

            <label className="flex items-center !gap-3">
              <input type="radio" name="payment" />
              Net Banking
            </label>
          </div>

          <button
            onClick={handlePayment}
            className="w-full !mt-10 !py-4 bg-[#D4AF37] text-white rounded-xl"
          >
            Pay ₹{totalAmount}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
