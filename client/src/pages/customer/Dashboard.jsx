import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getMyBookings } from "../../services/bookingService";

import WelcomeCard from "../../components/customer/WelcomeCard";
import QuickActions from "../../components/customer/QuickActions";
import RecentActivity from "../../components/customer/RecentActivity";
import BookingStats from "../../components/customer/BookingStats";
import NoticeBoard from "../../components/customer/NoticeBoard";
import CurrentBooking from "../../components/customer/CurrentBooking";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const data = await getMyBookings();

      setBookings(data?.bookings || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <main className="!relative !min-h-screen !min-w-0 !w-full !overflow-x-hidden !bg-[var(--color-background)] !text-[var(--color-text-primary)]">
      {/* =====================================================
          BACKGROUND GLOW
      ====================================================== */}

      <div className="!pointer-events-none !fixed !inset-0 !overflow-hidden">
        <div className="!absolute !-right-40 !-top-40 !h-[500px] !w-[500px] !rounded-full !bg-[var(--color-primary)]/[0.07] !blur-[120px]" />

        <div className="!absolute !-left-40 !top-[45%] !h-[450px] !w-[450px] !rounded-full !bg-[var(--color-primary)]/[0.035] !blur-[120px]" />

        <div className="!absolute !bottom-0 !right-[20%] !h-[300px] !w-[300px] !rounded-full !bg-[var(--color-text-primary)]/[0.015] !blur-[100px]" />
      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="!relative !mx-auto !w-full !min-w-0 !max-w-[1500px] !overflow-x-hidden !px-4 !py-6 sm:!px-6 sm:!py-8 lg:!px-10 xl:!py-10">
        {/* HEADER / WELCOME */}

        <WelcomeCard />

        {/* STATS */}

        <motion.section
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.15,
              },
            },
          }}
          className="!mt-6 sm:!mt-8"
        >
          <BookingStats bookings={bookings} loading={loading} />
        </motion.section>

        {/* MAIN GRID */}

        <div className="!mt-6 !grid !grid-cols-1 !gap-6 xl:!grid-cols-[1.65fr_1fr]">
          {/* CURRENT BOOKING */}

          <CurrentBooking bookings={bookings} loading={loading} />

          {/* QUICK ACTIONS */}

          <QuickActions />
        </div>

        {/* ACTIVITY + NOTICE */}

        <div className="!mt-6 !grid !grid-cols-1 !gap-6 xl:!grid-cols-[1.65fr_1fr]">
          <RecentActivity bookings={bookings} />

          <NoticeBoard />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
