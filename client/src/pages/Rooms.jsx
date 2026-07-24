import { useEffect, useState } from "react";
import RoomGrid from "../components/room/RoomGrid";
import { getAllRooms } from "../services/roomService";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getAllRooms();
        setRooms(data.rooms);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen !py-10">
      <RoomGrid rooms={rooms} />
    </div>
  );
};

export default Rooms;
