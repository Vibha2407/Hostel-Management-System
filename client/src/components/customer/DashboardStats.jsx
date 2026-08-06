import { BedDouble, CalendarDays, CreditCard } from "lucide-react";

const DashboardStats = ({ bookings }) => {
  const stats = [
    {
      title: "Total Bookings",
      value: totalBookings,
      icon: <CalendarDays size={32} />,
    },
    {
      title: "Current Stay",
      value: currentStay,
      icon: <BedDouble size={32} />,
    },
    {
      title: "Pending Payment",
      value: pendingPayments,
      icon: <CreditCard size={32} />,
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 mb-10">
      {stats.map((item) => (
        <div key={item.title} className="bg-white rounded-2xl shadow-md p-6">
          <div className="text-[#D4AF37]">{item.icon}</div>

          <h3 className="mt-4 text-gray-500">{item.title}</h3>

          <h2 className="text-3xl font-bold !mt-2">{item.value}</h2>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
