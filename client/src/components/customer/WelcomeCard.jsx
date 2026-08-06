import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CalendarDays } from "lucide-react";

const WelcomeCard = () => {
  const { user } = useContext(AuthContext);

  const today = new Date();

  const greeting =
    today.getHours() < 12
      ? "Good Morning"
      : today.getHours() < 17
        ? "Good Afternoon"
        : "Good Evening";

  return (
    <div className="bg-gradient-to-r from-[#D4AF37] to-yellow-500 rounded-3xl text-white !p-8 shadow-lg">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">
            👋 {greeting}, {user?.fullName}
          </h1>

          <p className="!mt-3 text-yellow-100">
            Welcome back to HostelHub. Manage your bookings and stay from one
            place.
          </p>
        </div>

        <div className="text-right">
          <div className="flex items-center justify-end !gap-2">
            <CalendarDays size={20} />
            <span>
              {today.toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;
