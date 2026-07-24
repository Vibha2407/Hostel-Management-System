import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllRooms } from "../../services/roomService";

const ManageRooms = () => {
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
    <div className="max-w-7xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Rooms</h1>

        <Link
          to="/admin/add-room"
          className="bg-[#D4AF37] text-white px-5 py-3 rounded-lg"
        >
          + Add Room
        </Link>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">Room</th>
            <th className="p-3 border">Type</th>
            <th className="p-3 border">Sharing</th>
            <th className="p-3 border">Price</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {rooms.map((room) => (
            <tr key={room._id}>
              <td className="border p-3">{room.roomNumber}</td>

              <td className="border p-3">{room.roomType}</td>

              <td className="border p-3">{room.sharingType}</td>

              <td className="border p-3">₹{room.pricePerMonth}</td>

              <td className="border p-3">{room.status}</td>

              <td className="border p-3 flex gap-3">
                <Link to={`/rooms/${room._id}`} className="text-blue-600">
                  View
                </Link>

                <Link
                  to={`/admin/rooms/edit/${room._id}`}
                  className="text-green-600"
                >
                  Edit
                </Link>

                <button className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageRooms;
