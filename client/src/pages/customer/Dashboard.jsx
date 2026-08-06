import { useEffect, useState } from "react";
import { getMyBookings } from "../../services/bookingService";

import WelcomeCard from "../../components/customer/WelcomeCard";
import QuickActions from "../../components/customer/QuickActions";
import RecentActivity from "../../components/customer/RecentActivity";
import BookingStats from "../../components/customer/BookingStats";
import NoticeBoard from "../../components/customer/NoticeBoard";
import CurrentBooking from "../../components/customer/CurrentBooking";
import BookingHistory from "../../components/customer/BookingHistory";
import ProfileSummary from "../../components/customer/ProfileSummary";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getMyBookings();
        setBookings(data.bookings);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="!max-w-7xl !mx-auto !px-6 !py-10">
        <WelcomeCard />

        <BookingStats bookings={bookings} />

        <CurrentBooking bookings={bookings} />
        <QuickActions />
        <RecentActivity bookings={bookings} />
        <NoticeBoard />

        {/* <BookingHistory bookings={bookings} /> */}

        {/* <ProfileSummary /> */}
      </div>
    </div>
  );
};

export default Dashboard;
