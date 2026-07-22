import { useState } from "react";
import { getAllRooms } from "../../services/roomService";
import axios from "axios";
import RoomGrid from "../room/RoomGrid";
import api from "../../services/axios";

const QuickSearch = () => {
  const [roomType, setRoomType] = useState("");
  const [sharingType, setSharingType] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [rooms, setRooms] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/rooms");
      console.log(response.data);
      setRooms(response.data.rooms);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="max-w-7xl !mx-auto !mt-14 relative !z-20 !px-6">
      <div className="bg-white rounded-2xl shadow-xl !p-8">
        <h2 className="text-2xl font-bold !mb-8">Search Your Perfect Room</h2>

        <input
          type="date"
          value={checkIn}
          placeholder="CheckIn"
          onChange={(e) => setCheckIn(e.target.value)}
          className="w-full rounded-xl border border-gray-300 !px-4 !py-3 !m-2 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
        />

        <input
          type="date"
          value={checkOut}
          placeholder="CheckOut"
          onChange={(e) => setCheckOut(e.target.value)}
          className="w-full rounded-xl border border-gray-300 !px-4 !py-3 !m-2 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
        />

        <select
          className="border !p-3  !m-2 rounded-lg"
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
        >
          <option value="">Room Type</option>
          <option>AC</option>
          <option>Non AC</option>
        </select>

        <select
          className="border !m-3 !p-3 rounded-lg"
          value={sharingType}
          onChange={(e) => setSharingType(e.target.value)}
        >
          <option value="">Sharing</option>
          <option>1 Sharing</option>
          <option>2 Sharing</option>
          <option>3 Sharing</option>
          <option>4 Sharing</option>
        </select>

        <button
          onClick={handleSearch}
          className="bg-[#D4AF37] text-white  !p-3 rounded-lg"
        >
          Search
        </button>

        <div className="!mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 !gap-6">
          <RoomGrid rooms={rooms} />
        </div>
      </div>
    </section>
  );
};

export default QuickSearch;
