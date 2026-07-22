import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllRooms } from "../../services/roomService";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const data = await getAllRooms();
      setRooms(data.rooms);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="!p-8">
      <div className="flex justify-between items-center !mb-8">
        <h1 className="text-3xl font-bold">Manage Rooms</h1>

        <Link
          to="/admin/add-room"
          className="bg-[#D4AF37] text-white !px-5 !py-3 rounded-lg"
        >
          + Add Room
        </Link>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="!p-3">Room</th>

            <th>Type</th>

            <th>Sharing</th>

            <th>Price</th>

            <th>Status</th>

            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {rooms.map((room) => (
            <tr key={room._id} className="border-t text-center">
              <td className="!p-4">{room.roomNumber}</td>

              <td>{room.roomType}</td>

              <td>{room.sharingType}</td>

              <td>₹{room.pricePerMonth}</td>

              <td>{room.status}</td>

              <td>
                <button className="text-blue-600 !mr-4">Edit</button>

                <button className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Rooms;
