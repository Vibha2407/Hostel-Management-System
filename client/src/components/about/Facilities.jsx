import {
  Wifi,
  ParkingCircle,
  Utensils,
  ShieldCheck,
  WashingMachine,
  Bike,
} from "lucide-react";

const facilities = [
  {
    icon: <Wifi size={35} />,
    title: "High Speed WiFi",
  },
  {
    icon: <Utensils size={35} />,
    title: "Healthy Food",
  },
  {
    icon: <Bike size={35} />,
    title: "Bike Parking",
  },
  {
    icon: <ParkingCircle size={35} />,
    title: "Parking",
  },
  {
    icon: <ShieldCheck size={35} />,
    title: "24x7 Security",
  },
  {
    icon: <WashingMachine size={35} />,
    title: "Laundry",
  },
];

const Facilities = () => {
  return (
    <section className="!py-20 bg-gray-50">
      <div className="!max-w-7xl !mx-auto !px-6">
        <h2 className="text-4xl font-bold text-center !mb-12">
          Facilities We Provide
        </h2>

        <div className="grid md:grid-cols-3 !gap-8 ">
          {facilities.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow hover:-translate-y-2 transition !p-3"
            >
              <div className="text-[#D4AF37] ">{item.icon}</div>

              <h3 className="text-xl font-semibold">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Facilities;
