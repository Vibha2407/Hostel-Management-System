import { CheckCircle, Receipt, XCircle, Clock } from "lucide-react";

const RecentActivity = ({ bookings }) => {
  const recentBookings = bookings.slice(0, 5);

  return (
    <section className="!mt-10">
      <div className="bg-white rounded-2xl shadow-md !p-8">
        <h2 className="text-2xl font-bold !mb-8">Recent Activity</h2>

        {recentBookings.length === 0 ? (
          <div className="text-center !py-10 text-gray-500">
            No recent activity available.
          </div>
        ) : (
          <div className="space-y-6">
            {recentBookings.map((booking) => (
              <div
                key={booking._id}
                className="flex items-center justify-between border-b !pb-5"
              >
                <div className="flex items-center !gap-4">
                  <div>
                    {booking.bookingStatus === "Confirmed" && (
                      <CheckCircle className="text-green-500" size={32} />
                    )}

                    {booking.bookingStatus === "Cancelled" && (
                      <XCircle className="text-red-500" size={32} />
                    )}

                    {booking.bookingStatus === "Checked-In" && (
                      <Clock className="text-blue-500" size={32} />
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Room {booking.room?.roomNumber || "N/A"}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      {booking.bookingStatus}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center !gap-2 justify-end">
                    <Receipt size={18} className="text-[#D4AF37]" />

                    <span className="font-semibold">
                      ₹{booking.totalAmount}
                    </span>
                  </div>

                  <p className="text-sm text-gray-400 !mt-1">
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentActivity;
