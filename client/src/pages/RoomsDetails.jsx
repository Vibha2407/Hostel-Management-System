import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRoomById } from "../services/roomService";
import BookingCard from "../components/booking/BookingCard";
import { useNavigate } from "react-router-dom";

const RoomDetails = () => {
  const { id } = useParams();

  const [room, setRoom] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const data = await getRoomById(id);
        setRoom(data.room);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRoom();
  }, [id]);

  if (!room) {
    return <div className="text-center !py-20 text-xl">Loading...</div>;
  }
  console.log(room);

  return (
    <section className="max-w-7xl !mx-auto !px-6 !py-12">
      <div className="grid lg:grid-cols-3 !gap-10">
        <div className="lg:col-span-2">
          {/* Image */}

          <div className="h-[450px] rounded-3xl overflow-hidden bg-gray-200 flex items-center justify-center">
            {room.roomImages?.length > 0 ? (
              <img
                src={room.roomImages[0]}
                alt={room.roomNumber}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-gray-500 text-xl">No Image Available</div>
            )}
          </div>

          {/* Details */}

          <div>
            <h1 className="text-4xl font-bold !mb-5">Room {room.roomNumber}</h1>

            <h2 className="text-2xl text-[#D4AF37] font-bold !mb-6">
              ₹{room.pricePerDay}/day
            </h2>

            <div className="flex !gap-3 !mb-6">
              <span className="bg-blue-100 text-blue-700 !px-4 !py-2 rounded-full">
                {room.roomType}
              </span>

              <span className="bg-purple-100 text-purple-700 !px-4 !py-2 rounded-full">
                {room.sharingType}
              </span>

              <span
                className={`!px-4 !py-2 rounded-full ${
                  room.availableBeds > 0
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {room.availableBeds > 0 ? "Available" : "Occupied"}
              </span>
            </div>

            <div className="!mb-8">
              <h3 className="text-2xl font-semibold !!mb-3">Description</h3>
              <p className="text-gray-600 leading-8">
                {room.description || "No description available."}
              </p>

              <div className="mb-8">
                <h3 className="text-2xl font-semibold !mb-4">Facilities</h3>

                <div className="grid grid-cols-2 !gap-4">
                  {Object.entries(room.facilities || {})
                    .filter(([_, value]) => value)
                    .map(([key]) => (
                      <div
                        key={key}
                        className="bg-gray-100 rounded-lg !px-4 !py-3"
                      >
                        ✅ {key}
                      </div>
                    ))}

                  {Object.values(room.facilities || {}).every((v) => !v) && (
                    <p>No facilities available.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => navigate(`/booking/${room._id}`)}
        className="bg-[#D4AF37] text-white !px-6 !py-3 rounded-lg"
      >
        Book Now
      </button>
    </section>
  );
};

export default RoomDetails;
