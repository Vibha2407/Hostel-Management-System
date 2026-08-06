import { Wifi, Utensils, Wrench, Bell } from "lucide-react";

const NoticeBoard = () => {
  const notices = [
    {
      title: "Wi-Fi Maintenance",
      description:
        "Internet will be unavailable on Sunday from 10 AM to 12 PM.",
      icon: <Wifi size={24} />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Mess Timing Updated",
      description: "Dinner timing has been changed to 7:00 PM - 9:00 PM.",
      icon: <Utensils size={24} />,
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      title: "Maintenance Work",
      description: "Room cleaning and plumbing inspection on Saturday.",
      icon: <Wrench size={24} />,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Hostel Notice",
      description: "Monthly hostel meeting on Friday at 6 PM.",
      icon: <Bell size={24} />,
      color: "bg-purple-100 text-purple-700",
    },
  ];

  return (
    <section className="!mt-10">
      <div className="bg-white rounded-2xl shadow-md !p-8">
        <h2 className="text-2xl font-bold !mb-8">📢 Notice Board</h2>

        <div className="space-y-6">
          {notices.map((notice, index) => (
            <div
              key={index}
              className="flex !gap-5 items-start border-b !pb-5 last:border-none"
            >
              <div className={`!p-3 rounded-full ${notice.color}`}>
                {notice.icon}
              </div>

              <div>
                <h3 className="font-semibold text-lg">{notice.title}</h3>

                <p className="text-gray-500 !mt-1">{notice.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NoticeBoard;
