import React from "react";
import RoomCard from "./RoomCard";

const RoomGrid = ({ rooms }) => {
  return (
    <section className="max-w-7xl mx-auto !px-6 !py-14">
      <h2 className="text-3xl font-bold !Smb-10">Available Rooms</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 !gap-8">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </section>
  );
};

export default RoomGrid;
