import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllRooms, deleteRoom } from "../../services/roomService";

import toast from "react-hot-toast";
import {
  ArrowUpRight,
  BedDouble,
  Building2,
  CheckCircle2,
  Edit3,
  Eye,
  Plus,
  Trash2,
  X,
  AlertTriangle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ManageRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const data = await getAllRooms();
      setRooms(data.rooms);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (room) => {
    setSelectedRoom(room);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const data = await deleteRoom(selectedRoom._id);

      toast.success(data.message);

      fetchRooms();

      setShowDeleteModal(false);
      setSelectedRoom(null);
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Failed to delete room");
    }
  };

  return (
    <div className="!min-h-[calc(100vh-4rem)] !w-full !overflow-x-hidden !bg-[#FAF8F4] dark:!bg-[#080808]">
      <div className="!mx-auto !w-full !max-w-[1600px] !px-4 !py-5 sm:!px-6 sm:!py-6 lg:!px-8 lg:!py-8 xl:!px-10">
        {/* =====================================================
            PAGE HEADER
        ===================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="!mb-6"
        >
          <div className="!flex !flex-col !gap-5 sm:!flex-row sm:!items-end sm:!justify-between">
            {/* Title */}
            <div className="!min-w-0">
              <div className="!mb-2 !flex !items-center !gap-2">
                <span className="!flex !h-8 !w-8 !items-center !justify-center !rounded-lg !bg-[#D4AF37]/10 !text-[#D4AF37]">
                  <Building2 size={15} strokeWidth={2.2} />
                </span>

                <span className="!text-[10px] !font-black !uppercase !tracking-[0.18em] !text-[#D4AF37]">
                  Hostel Management
                </span>
              </div>

              <h1 className="!text-2xl !font-black !tracking-tight !text-[#2B1720] dark:!text-white sm:!text-3xl">
                Manage Rooms
              </h1>

              <p className="!mt-1.5 !text-sm !text-[#74656A] dark:!text-[#888888]">
                Manage room availability, pricing, sharing and occupancy.
              </p>
            </div>

            {/* Add Room */}
            <Link
              to="/admin/add-room"
              className="!group !inline-flex !w-full !items-center !justify-center !gap-2 !rounded-xl !bg-gradient-to-r !from-[#D4AF37] !via-[#C69A2B] !to-[#A77B18] !px-5 !py-3 !text-sm !font-black !text-[#2B1720] !shadow-lg !shadow-[#D4AF37]/20 !transition-all !duration-300 hover:!-translate-y-0.5 hover:!shadow-xl hover:!shadow-[#D4AF37]/25 sm:!w-auto"
            >
              <Plus size={17} strokeWidth={2.5} />

              <span>Add Room</span>

              <ArrowUpRight
                size={15}
                className="!transition-transform !duration-300 group-hover:!translate-x-0.5 group-hover:!-translate-y-0.5"
              />
            </Link>
          </div>
        </motion.div>

        {/* =====================================================
            SUMMARY CARD
        ===================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="!mb-5 !grid !grid-cols-1 !gap-3 sm:!grid-cols-3"
        >
          {/* Total */}
          <div className="!rounded-2xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-white dark:!bg-[#0D0D0D] !p-4 !shadow-sm">
            <div className="!flex !items-center !gap-3">
              <div className="!flex !h-10 !w-10 !shrink-0 !items-center !justify-center !rounded-xl !bg-[#D4AF37]/10 !text-[#D4AF37]">
                <BedDouble size={18} />
              </div>

              <div className="!min-w-0">
                <p className="!text-[10px] !font-bold !uppercase !tracking-wider !text-[#74656A] dark:!text-[#777777]">
                  Total Rooms
                </p>

                <p className="!mt-0.5 !text-xl !font-black !text-[#2B1720] dark:!text-white">
                  {rooms.length}
                </p>
              </div>
            </div>
          </div>

          {/* Available */}
          <div className="!rounded-2xl !border !border-emerald-500/15 !bg-white dark:!bg-[#0D0D0D] !p-4 !shadow-sm">
            <div className="!flex !items-center !gap-3">
              <div className="!flex !h-10 !w-10 !shrink-0 !items-center !justify-center !rounded-xl !bg-emerald-500/10 !text-emerald-500">
                <CheckCircle2 size={18} />
              </div>

              <div className="!min-w-0">
                <p className="!text-[10px] !font-bold !uppercase !tracking-wider !text-[#74656A] dark:!text-[#777777]">
                  Available
                </p>

                <p className="!mt-0.5 !text-xl !font-black !text-[#2B1720] dark:!text-white">
                  {rooms.filter((room) => room.availableBeds > 0).length}
                </p>
              </div>
            </div>
          </div>

          {/* Occupied */}
          <div className="!rounded-2xl !border !border-red-500/15 !bg-white dark:!bg-[#0D0D0D] !p-4 !shadow-sm">
            <div className="!flex !items-center !gap-3">
              <div className="!flex !h-10 !w-10 !shrink-0 !items-center !justify-center !rounded-xl !bg-red-500/10 !text-red-500">
                <BedDouble size={18} />
              </div>

              <div className="!min-w-0">
                <p className="!text-[10px] !font-bold !uppercase !tracking-wider !text-[#74656A] dark:!text-[#777777]">
                  Occupied
                </p>

                <p className="!mt-0.5 !text-xl !font-black !text-[#2B1720] dark:!text-white">
                  {rooms.filter((room) => room.availableBeds <= 0).length}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* =====================================================
            ROOMS TABLE
        ===================================================== */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="!overflow-hidden !rounded-2xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-white dark:!bg-[#0D0D0D] !shadow-[0_8px_30px_rgba(43,23,32,0.04)] dark:!shadow-[0_8px_30px_rgba(0,0,0,0.18)]"
        >
          {/* Table header */}
          <div className="!flex !flex-col !gap-2 !border-b !border-[#E8DED2] dark:!border-[#292929] !p-4 sm:!flex-row sm:!items-center sm:!justify-between sm:!px-5 sm:!py-4">
            <div>
              <h2 className="!text-base !font-black !text-[#2B1720] dark:!text-white sm:!text-lg">
                All Rooms
              </h2>

              <p className="!mt-0.5 !text-[10px] !text-[#74656A] dark:!text-[#777777]">
                {rooms.length} room{rooms.length !== 1 ? "s" : ""} in the system
              </p>
            </div>

            <div className="!flex !items-center !gap-2 !text-[10px] !font-bold !text-[#74656A] dark:!text-[#777777]">
              <span className="!h-2 !w-2 !rounded-full !bg-emerald-500" />
              Live room status
            </div>
          </div>

          {/* Responsive table wrapper */}
          <div className="!w-full !overflow-x-auto">
            <table className="!w-full !min-w-[850px] !border-collapse">
              <thead>
                <tr className="!border-b !border-[#E8DED2] dark:!border-[#292929] !bg-[#FAF8F4]/70 dark:!bg-[#111111]">
                  <th className="!whitespace-nowrap !px-5 !py-4 !text-left !text-[10px] !font-black !uppercase !tracking-wider !text-[#74656A] dark:!text-[#777777]">
                    Room
                  </th>

                  <th className="!whitespace-nowrap !px-5 !py-4 !text-left !text-[10px] !font-black !uppercase !tracking-wider !text-[#74656A] dark:!text-[#777777]">
                    Type
                  </th>

                  <th className="!whitespace-nowrap !px-5 !py-4 !text-left !text-[10px] !font-black !uppercase !tracking-wider !text-[#74656A] dark:!text-[#777777]">
                    Sharing
                  </th>

                  <th className="!whitespace-nowrap !px-5 !py-4 !text-left !text-[10px] !font-black !uppercase !tracking-wider !text-[#74656A] dark:!text-[#777777]">
                    Price / Month
                  </th>

                  <th className="!whitespace-nowrap !px-5 !py-4 !text-left !text-[10px] !font-black !uppercase !tracking-wider !text-[#74656A] dark:!text-[#777777]">
                    Status
                  </th>

                  <th className="!whitespace-nowrap !px-5 !py-4 !text-right !text-[10px] !font-black !uppercase !tracking-wider !text-[#74656A] dark:!text-[#777777]">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {rooms.length > 0 ? (
                  rooms.map((room, index) => (
                    <motion.tr
                      key={room._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.25,
                        delay: index * 0.03,
                      }}
                      className="!border-b !border-[#E8DED2]/70 dark:!border-[#292929] !transition-colors hover:!bg-[#FAF8F4]/60 dark:hover:!bg-[#111111]"
                    >
                      {/* Room */}
                      <td className="!px-5 !py-4">
                        <div className="!flex !items-center !gap-3">
                          <div className="!flex !h-9 !w-9 !shrink-0 !items-center !justify-center !rounded-lg !bg-[#4A1D2F]/10 !text-[#4A1D2F] dark:!bg-[#D4AF37]/10 dark:!text-[#D4AF37]">
                            <BedDouble size={17} />
                          </div>

                          <div className="!min-w-0">
                            <p className="!font-black !text-[#2B1720] dark:!text-white">
                              Room {room.roomNumber}
                            </p>

                            <p className="!mt-0.5 !text-[10px] !text-[#74656A] dark:!text-[#777777]">
                              Room ID: {room._id}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Type */}
                      <td className="!px-5 !py-4">
                        <span className="!rounded-lg !bg-[#FAF8F4] dark:!bg-[#171717] !px-3 !py-1.5 !text-xs !font-bold !text-[#4A1D2F] dark:!text-[#D4AF37]">
                          {room.roomType}
                        </span>
                      </td>

                      {/* Sharing */}
                      <td className="!px-5 !py-4">
                        <span className="!text-sm !font-semibold !text-[#2B1720] dark:!text-[#DDDDDD]">
                          {room.sharingType}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="!px-5 !py-4">
                        <span className="!text-sm !font-black !text-[#2B1720] dark:!text-white">
                          ₹{room.pricePerMonth}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="!px-5 !py-4">
                        <span
                          className={`!inline-flex !items-center !gap-1.5 !whitespace-nowrap !rounded-full !px-3 !py-1.5 !text-[10px] !font-black ${
                            room.availableBeds > 0
                              ? "!bg-emerald-500/10 !text-emerald-600 dark:!text-emerald-400"
                              : "!bg-red-500/10 !text-red-600 dark:!text-red-400"
                          }`}
                        >
                          <span
                            className={`!h-1.5 !w-1.5 !rounded-full ${
                              room.availableBeds > 0
                                ? "!bg-emerald-500"
                                : "!bg-red-500"
                            }`}
                          />

                          {room.availableBeds > 0 ? "Available" : "Occupied"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="!px-5 !py-4">
                        <div className="!flex !items-center !justify-end !gap-1.5">
                          <Link
                            to={`/rooms/${room._id}`}
                            title="View room"
                            className="!flex !h-9 !w-9 !items-center !justify-center !rounded-lg !border !border-[#E8DED2] dark:!border-[#292929] !text-[#74656A] dark:!text-[#888888] !transition-all hover:!border-[#D4AF37]/40 hover:!bg-[#D4AF37]/10 hover:!text-[#D4AF37]"
                          >
                            <Eye size={15} />
                          </Link>

                          <Link
                            to={`/admin/rooms/edit/${room._id}`}
                            title="Edit room"
                            className="!flex !h-9 !w-9 !items-center !justify-center !rounded-lg !border !border-[#E8DED2] dark:!border-[#292929] !text-[#74656A] dark:!text-[#888888] !transition-all hover:!border-emerald-500/30 hover:!bg-emerald-500/10 hover:!text-emerald-500"
                          >
                            <Edit3 size={15} />
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleDelete(room)}
                            title="Delete room"
                            className="!flex !h-9 !w-9 !items-center !justify-center !rounded-lg !border !border-[#E8DED2] dark:!border-[#292929] !text-[#74656A] dark:!text-[#888888] !transition-all hover:!border-red-500/30 hover:!bg-red-500/10 hover:!text-red-500"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="!px-5 !py-16 !text-center">
                      <div className="!mx-auto !flex !max-w-sm !flex-col !items-center">
                        <div className="!flex !h-14 !w-14 !items-center !justify-center !rounded-2xl !bg-[#D4AF37]/10 !text-[#D4AF37]">
                          <BedDouble size={25} />
                        </div>

                        <h3 className="!mt-4 !text-base !font-black !text-[#2B1720] dark:!text-white">
                          No rooms found
                        </h3>

                        <p className="!mt-1 !text-xs !leading-5 !text-[#74656A] dark:!text-[#777777]">
                          Add your first room to start managing your hostel
                          inventory.
                        </p>

                        <Link
                          to="/admin/add-room"
                          className="!mt-4 !inline-flex !items-center !gap-2 !rounded-xl !bg-[#D4AF37] !px-4 !py-2.5 !text-xs !font-black !text-[#2B1720]"
                        >
                          <Plus size={15} />
                          Add First Room
                        </Link>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile hint */}
          {rooms.length > 0 && (
            <div className="!border-t !border-[#E8DED2] dark:!border-[#292929] !px-4 !py-2.5 sm:!hidden">
              <p className="!text-center !text-[9px] !font-semibold !text-[#74656A] dark:!text-[#666666]">
                ← Swipe horizontally to view all room details →
              </p>
            </div>
          )}
        </motion.section>
      </div>

      {/* =========================================================
          DELETE MODAL
      ========================================================= */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="!fixed !inset-0 !z-[100] !flex !items-center !justify-center !bg-black/60 !p-4 !backdrop-blur-sm"
            onClick={() => {
              setShowDeleteModal(false);
              setSelectedRoom(null);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="!relative !w-full !max-w-md !overflow-hidden !rounded-2xl sm:!rounded-3xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-white dark:!bg-[#0D0D0D] !shadow-2xl"
            >
              {/* Close */}
              <button
                type="button"
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedRoom(null);
                }}
                className="!absolute !right-4 !top-4 !flex !h-8 !w-8 !items-center !justify-center !rounded-lg !text-[#74656A] !transition-colors hover:!bg-[#FAF8F4] dark:hover:!bg-[#171717] hover:!text-red-500"
              >
                <X size={17} />
              </button>

              <div className="!p-5 sm:!p-7">
                {/* Icon */}
                <div className="!flex !h-12 !w-12 !items-center !justify-center !rounded-xl !bg-red-500/10 !text-red-500">
                  <AlertTriangle size={23} />
                </div>

                <h2 className="!mt-5 !text-xl !font-black !text-[#2B1720] dark:!text-white">
                  Delete Room?
                </h2>

                <p className="!mt-2 !text-sm !leading-6 !text-[#74656A] dark:!text-[#888888]">
                  Are you sure you want to delete Room{" "}
                  <span className="!font-black !text-[#2B1720] dark:!text-white">
                    {selectedRoom?.roomNumber}
                  </span>
                  ? This action cannot be undone.
                </p>

                {/* Actions */}
                <div className="!mt-7 !grid !grid-cols-1 !gap-2.5 sm:!grid-cols-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowDeleteModal(false);
                      setSelectedRoom(null);
                    }}
                    className="!flex !items-center !justify-center !rounded-xl !border !border-[#E8DED2] dark:!border-[#292929] !px-4 !py-3 !text-sm !font-bold !text-[#74656A] dark:!text-[#AAAAAA] !transition-all hover:!bg-[#FAF8F4] dark:hover:!bg-[#171717]"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={confirmDelete}
                    className="!flex !items-center !justify-center !gap-2 !rounded-xl !bg-red-600 !px-4 !py-3 !text-sm !font-black !text-white !transition-all hover:!bg-red-700 hover:!shadow-lg hover:!shadow-red-500/20"
                  >
                    <Trash2 size={16} />
                    Delete Room
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageRooms;
