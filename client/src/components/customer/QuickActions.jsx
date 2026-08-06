import { BedDouble, BookOpen, User, Receipt } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Browse Rooms",
      description: "Explore available hostel rooms",
      icon: <BedDouble size={32} />,
      path: "/rooms",
    },
    {
      title: "My Bookings",
      description: "View all your bookings",
      icon: <BookOpen size={32} />,
      path: "/customer/my-bookings",
    },
    {
      title: "My Profile",
      description: "Manage your personal details",
      icon: <User size={32} />,
      path: "/customer/profile",
    },
    {
      title: "Receipts",
      description: "Download payment receipts",
      icon: <Receipt size={32} />,
      path: "/customer/receipts",
    },
  ];

  return (
    <section className="!mt-10">
      <h2 className="text-3xl font-bold !mb-6">Quick Actions</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 !gap-6">
        {actions.map((action) => (
          <div
            key={action.title}
            onClick={() => navigate(action.path)}
            className="bg-white rounded-2xl shadow-md !p-6 cursor-pointer hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
          >
            <div className="text-[#D4AF37]">{action.icon}</div>

            <h3 className="text-xl font-bold !mt-5">{action.title}</h3>

            <p className="text-gray-500 !mt-2">{action.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QuickActions;
