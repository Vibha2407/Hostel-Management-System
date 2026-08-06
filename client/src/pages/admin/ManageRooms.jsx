import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllRooms, deleteRoom } from "../../services/roomService";

import toast from "react-hot-toast";

const ManageRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

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

  const handleDelete = (room) => {
    setSelectedRoom(room);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const data = await deleteRoom(selectedRoom._id);

      toast.success(data.message);

      fetchRooms();

      setShowDeleteModal(false);
      setSelectedRoom(null);
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Failed to delete room");
    }
  };

  return (
    <div className="!max-w-7xl !mx-auto !p-8">
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
            <th className="!p-3 border">Room</th>
            <th className="!p-3 border">Type</th>
            <th className="!p-3 border">Sharing</th>
            <th className="!p-3 border">Price</th>
            <th className="!p-3 border">Status</th>
            <th className="!p-3 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {rooms.map((room) => (
            <tr key={room._id}>
              <td className=" !p-3 border">{room.roomNumber}</td>

              <td className="border !p-3">{room.roomType}</td>

              <td className="border !p-3">{room.sharingType}</td>

              <td className="border !p-3">₹{room.pricePerMonth}</td>

              <td className="border !p-3">
                <span
                  className={`!px-3 !py-1 rounded-full text-sm font-medium ${
                    room.availableBeds > 0
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {room.availableBeds > 0 ? "Available" : "Occupied"}
                </span>
              </td>

              <td className="border !p-3">
                <div className="flex   !gap-3">
                  <Link
                    to={`/rooms/${room._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>

                  <Link
                    to={`/admin/rooms/edit/${room._id}`}
                    className="text-green-600  hover:underline"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(room)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center !z-50">
          <div className="bg-white rounded-xl shadow-xl w-[420px] !p-8">
            <h2 className="text-2xl font-bold !mb-3">Delete Room</h2>

            <p className="text-gray-600 !mb-8">
              Are you sure you want to delete Room{" "}
              <span className="font-semibold">{selectedRoom?.roomNumber}</span>?
            </p>

            <div className="flex justify-end !gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedRoom(null);
                }}
                className="border !px-5 !py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white !px-5 !py-2 rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageRooms;
