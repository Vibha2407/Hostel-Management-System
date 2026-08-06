import { useLocation, useNavigate } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReceiptPDF from "../../components/booking/ReceiptPDF";
const Receipt = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return <div className="text-center py-20">Invalid Receipt</div>;
  }

  const { booking } = state;

  return (
    <div className="!max-w-3xl !mx-auto !py-10 !px-6">
      <div id="receipt" className="bg-white shadow-xl rounded-xl !p-8 border">
        <h1 className="text-3xl font-bold text-center text-[#D4AF37]">
          HostelHub
        </h1>

        <p className="text-center text-gray-500 !mb-8">Booking Receipt</p>

        <hr className="!mb-6" />

        <div className="!space-y-3">
          <div className="flex justify-between">
            <span>Receipt No</span>
            <span>
              HH-
              {booking._id.slice(-6).toUpperCase()}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Customer Name </span>
            <span>{booking.user?.fullName || "NA"}</span>
          </div>
          <div className="flex justify-between">
            <span>Customer-ID </span>
            {/* <span>Customer-ID </span> */}
            <span>{booking.user?._id || "NA"}</span>
          </div>
          <div className="flex justify-between">
            <span>Phone No. </span>
            <span>{booking.user?.phone}</span>
          </div>

          <div className="flex justify-between">
            <span>Booking Date</span>
            <span>{new Date(booking.createdAt).toLocaleDateString()}</span>
          </div>

          <div className="flex justify-between">
            <span>Room Number</span>
            <span>{booking.room?.roomNumber || "NA"}</span>
          </div>

          <div className="flex justify-between">
            <span>Room Type</span>
            <span>{booking.room?.roomType || "NA"}</span>
          </div>

          <div className="flex justify-between">
            <span>Sharing</span>
            <span>{booking.room?.sharingType || "NA"}</span>
          </div>

          <div className="flex justify-between">
            <span>Check In</span>
            <span>{new Date(booking.checkInDate).toLocaleDateString()}</span>
          </div>

          <div className="flex justify-between">
            <span>Check Out</span>
            <span>{new Date(booking.checkOutDate).toLocaleDateString()}</span>
          </div>

          <div className="flex justify-between">
            <span>Guests</span>
            <span>{booking.numberOfGuests}</span>
          </div>

          <div className="flex justify-between">
            <span>Total Paid</span>
            <span className="font-bold text-[#D4AF37]">
              ₹{booking.totalAmount}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Payment Status</span>

            <span className="text-green-600 font-semibold">
              {booking.paymentStatus}
            </span>
          </div>

          <div className="flex justify-between">
            <span
              className={`font-semibold ${
                booking.bookingStatus === "Confirmed"
                  ? "text-green-600"
                  : booking.bookingStatus === "Cancelled"
                    ? "text-red-600"
                    : "text-yellow-600"
              }`}
            >
              {booking.bookingStatus}
            </span>

            <span className="text-green-600 font-semibold">
              {booking.bookingStatus}
            </span>
          </div>
        </div>

        <hr className="!my-8" />

        <p className="text-center text-gray-500">
          Thank you for choosing HostelHub ❤️
        </p>
      </div>

      <div className="flex justify-center !gap-5 !mt-8">
        <PDFDownloadLink
          document={<ReceiptPDF booking={booking} />}
          fileName={`HostelHub-Receipt-${booking.room?.roomNumber || "ROOM"}.pdf`}
        >
          {({ loading }) => (
            <button className="bg-[#D4AF37] text-white !px-8 !py-3 rounded-lg hover:bg-yellow-600 transition">
              {loading ? "Preparing PDF..." : "Download Receipt"}
            </button>
          )}
        </PDFDownloadLink>

        <button
          onClick={() => navigate("/customer/my-bookings")}
          className="border !px-8 !py-3 rounded-lg"
        >
          My Bookings
        </button>
      </div>
    </div>
  );
};

export default Receipt;
