import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
      <img
        src={room.roomImages?.[0] || "/placeholder.jpg"}
        alt={room.roomNumber}
        className="w-full !h-52 object-cover"
      />

      <div className="!p-5">
        <h2 className="text-xl font-bold">Room {room.roomNumber}</h2>

        <p className="!mt-2">Room Type : {room.roomType}</p>

        <p>Sharing : {room.sharingType}</p>

        <p>₹{room.pricePerDay}/day</p>

        <span
          className={`inline-block !mt-3 !px-3 !py-1 rounded-full text-sm
          ${
            room.isAvailable
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {room.isAvailable ? "Available" : "Occupied"}
        </span>
        <Link
          to={`/rooms/${room._id}`}
          className="mt-5 inline-block w-full bg-[#D4AF37] text-white text-center py-3 rounded-xl hover:bg-yellow-600 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;
