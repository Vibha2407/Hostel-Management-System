const RoomBookingInfo = ({ room }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Room Image */}
      <div className="!h-60 bg-gray-100">
        <img
          src={
            room.roomImages?.length > 0
              ? room.roomImages[0]
              : "/placeholder.jpg"
          }
          alt={room.roomNumber}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="!p-6">
        <h2 className="text-3xl font-bold !mb-2">Room {room.roomNumber}</h2>

        <p className="text-[#D4AF37] text-2xl font-bold !mb-5">
          ₹{room.pricePerDay} / Day
        </p>

        {/* Room Info */}

        <div className="space-y-3 text-gray-700">
          <div className="flex justify-between">
            <span>Room Type</span>
            <span className="font-semibold">{room.roomType}</span>
          </div>

          <div className="flex justify-between">
            <span>Sharing</span>
            <span className="font-semibold">{room.sharingType}</span>
          </div>

          <div className="flex justify-between">
            <span>Total Beds</span>
            <span className="font-semibold">{room.totalBeds}</span>
          </div>

          <div className="flex justify-between">
            <span>Occupied</span>
            <span className="font-semibold">{room.occupiedBeds}</span>
          </div>

          <div className="flex justify-between">
            <span>Available Beds</span>
            <span className="font-semibold text-green-600">
              {room.availableBeds}
            </span>
          </div>
        </div>

        {/* Description */}

        <div className="!mt-8">
          <h3 className="font-bold text-lg !mb-2">Description</h3>

          <p className="text-gray-600">
            {room.description ||
              "Comfortable hostel room with modern facilities."}
          </p>
        </div>

        {/* Facilities */}

        <div className="!mt-8">
          <h3 className="font-bold text-lg !mb-4">Facilities</h3>

          <div className="grid grid-cols-2 !gap-3">
            {room.facilities &&
              Object.entries(room.facilities).map(
                ([key, value]) =>
                  value && (
                    <div
                      key={key}
                      className="bg-gray-100 rounded-lg !px-3 !py-2 text-sm"
                    >
                      ✅ {key}
                    </div>
                  ),
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomBookingInfo;
