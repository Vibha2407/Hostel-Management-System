import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRoomById } from "../services/roomService";
import { useNavigate } from "react-router-dom";

import RoomBookingInfo from "../components/booking/RoomBookingInfo";
import BookingForm from "../components/booking/BookingForm";
import BookingSummary from "../components/booking/BookingSummary";

const Booking = () => {
  const { id } = useParams();

  const [room, setRoom] = useState(null);
  const navigate = useNavigate();

  const [bookingData, setBookingData] = useState({
    checkInDate: "",
    checkOutDate: "",
    bookingType: "Daily",
    numberOfGuests: 1,
    specialRequest: "",
  });

  useEffect(() => {
    const fetchRoom = async () => {
      const data = await getRoomById(id);
      setRoom(data.room);
    };

    fetchRoom();
  }, [id]);

  if (!room) return <h2>Loading...</h2>;

  return (
    <section className="!max-w-7xl !mx-auto !py-12 !px-6">
      <h1 className="text-4xl font-bold !mb-10">Book Your Room</h1>

      <div className="grid lg:grid-cols-3 !gap-8">
        <RoomBookingInfo room={room} />

        <BookingForm
          bookingData={bookingData}
          setBookingData={setBookingData}
        />

        <BookingSummary
          room={room}
          bookingData={bookingData}
          onProceed={(amount) => {
            navigate("/payment", {
              state: {
                room,
                bookingData,
                totalAmount: amount,
              },
            });
          }}
        />
      </div>
    </section>
  );
};

export default Booking;
