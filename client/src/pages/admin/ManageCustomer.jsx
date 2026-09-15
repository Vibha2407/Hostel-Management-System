import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  Users,
  UserCheck,
  UserX,
  Sparkles,
  RefreshCw,
  Eye,
  Mail,
  Phone,
  Calendar,
  BedDouble,
  ShieldCheck,
  ShieldAlert,
  ChevronDown,
  X,
  Loader2,
  AlertCircle,
  Filter,
  CreditCard,
  History,
} from "lucide-react";

import {
  getAllCustomers,
  toggleCustomerStatus,
} from "../../services/customerService";

const ManageCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllCustomers();

      // Step 1: Safe Array Parsing
      let customerList = [];
      if (Array.isArray(response)) {
        customerList = response;
      } else if (response && Array.isArray(response.customers)) {
        customerList = response.customers;
      } else if (response && Array.isArray(response.users)) {
        customerList = response.users;
      } else if (response && Array.isArray(response.data)) {
        customerList = response.data;
      }

      setCustomers(customerList);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to sync customer records from server.",
      );
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleStatusToggle = async (userId, currentStatus) => {
    try {
      setActionLoading(true);
      await toggleCustomerStatus(userId, !currentStatus);
      if (selectedCustomer && selectedCustomer._id === userId) {
        setSelectedCustomer((prev) => ({ ...prev, isActive: !currentStatus }));
      }
      await fetchCustomers();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update user status.");
    } finally {
      setActionLoading(false);
    }
  };

  // Step 2: Defensive Filter Check
  const filteredCustomers = useMemo(() => {
    if (!Array.isArray(customers)) return [];

    return customers.filter((customer) => {
      const searchValue = search.toLowerCase();
      const name = customer.fullName || customer.name || "";
      const email = customer.email || "";
      const phone = customer.phone || customer.contactNumber || "";
      const roomNum = customer.assignedRoom?.roomNumber
        ? String(customer.assignedRoom.roomNumber)
        : "";

      const matchesSearch =
        name.toLowerCase().includes(searchValue) ||
        email.toLowerCase().includes(searchValue) ||
        phone.toLowerCase().includes(searchValue) ||
        roomNum.toLowerCase().includes(searchValue);

      const matchesRole =
        roleFilter === "All" ||
        (roleFilter === "Customer" && customer.role === "customer");

      const customerIsActive = customer.isActive !== false;
      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Active" && customerIsActive) ||
        (statusFilter === "Inactive" && !customerIsActive);

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [customers, search, roleFilter, statusFilter]);

  const stats = useMemo(() => {
    const safeList = Array.isArray(customers) ? customers : [];
    const total = safeList.length;
    const active = safeList.filter((c) => c.isActive !== false).length;
    const blocked = total - active;
    const currentlyHoused = safeList.filter(
      (customer) => customer.currentBooking?.bookingStatus === "Checked-In",
    ).length;

    return [
      {
        title: "Total Registered",
        value: total,
        icon: Users,
        description: "Cumulative user records",
        accent: "from-[#D4AF37]/20 via-[#D4AF37]/5 to-transparent",
        iconColor: "!text-[#D4AF37]",
      },
      {
        title: "Active Residents",
        value: active,
        icon: UserCheck,
        description: "Verified active profiles",
        accent: "from-emerald-500/20 via-emerald-500/5 to-transparent",
        iconColor: "!text-emerald-500",
      },
      {
        title: "In-House Guests",
        value: currentlyHoused,
        icon: BedDouble,
        description: "Assigned active room stays",
        accent: "from-blue-500/20 via-blue-500/5 to-transparent",
        iconColor: "!text-blue-500",
      },
      {
        title: "Restricted Accounts",
        value: blocked,
        icon: UserX,
        description: "Deactivated user accounts",
        accent: "from-rose-500/20 via-rose-500/5 to-transparent",
        iconColor: "!text-rose-500",
      },
    ];
  }, [customers]);

  return (
    <div className="!min-h-screen !bg-[#FAF8F4] dark:!bg-[#080808] !text-[#2B1720] dark:!text-white !p-4 sm:!p-6 lg:!p-8 !transition-colors !duration-300">
      <div className="!mx-auto !max-w-[1600px]">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="!mb-8 !flex !flex-col lg:!flex-row lg:!items-center lg:!justify-between !gap-5"
        >
          <div>
            <div className="!mb-2 !inline-flex !items-center !gap-2 !rounded-full !border !border-[#D4AF37]/30 !bg-[#D4AF37]/10 !px-3 !py-1 !backdrop-blur-md">
              <Sparkles size={14} className="!text-[#D4AF37] !animate-pulse" />
              <span className="!text-[11px] !font-bold !uppercase !tracking-[0.2em] !text-[#D4AF37]">
                Directory Console
              </span>
            </div>

            <h1 className="!text-3xl sm:!text-4xl !font-extrabold !tracking-tight">
              Manage Customers
            </h1>

            <p className="!mt-1 !text-sm sm:!text-base !text-[#74656A] dark:!text-[#777777]">
              Inspect guest profiles, monitor active room allocations, and
              manage user access.
            </p>
          </div>

          <motion.button
            whileHover={{
              scale: 1.03,
              boxShadow: "0 0 20px rgba(212,175,55,0.2)",
            }}
            whileTap={{ scale: 0.97 }}
            onClick={fetchCustomers}
            className="!inline-flex !items-center !justify-center !gap-2.5 !rounded-xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-white dark:!bg-[#111111] !px-5 !py-3 !text-sm !font-semibold !shadow-sm hover:!border-[#D4AF37] dark:hover:!border-[#D4AF37] !transition-all"
          >
            <RefreshCw
              size={16}
              className={
                loading ? "!animate-spin !text-[#D4AF37]" : "!text-[#D4AF37]"
              }
            />
            Sync Records
          </motion.button>
        </motion.div>

        {/* Dynamic Metric Cards */}
        <div className="!grid !grid-cols-1 sm:!grid-cols-2 xl:!grid-cols-4 !gap-5 !mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="!relative !overflow-hidden !rounded-2xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-white dark:!bg-[#111111] !p-6 !shadow-[0_4px_24px_rgba(0,0,0,0.04)] dark:!shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
              >
                <div
                  className={`!absolute !inset-0 !bg-gradient-to-br ${stat.accent} !pointer-events-none`}
                />

                <div className="!relative !z-10 !flex !items-start !justify-between">
                  <div>
                    <span className="!text-xs !font-semibold !uppercase !tracking-wider !text-[#74656A] dark:!text-[#777777]">
                      {stat.title}
                    </span>

                    <h3 className="!mt-2 !text-3xl !font-black !tracking-tight">
                      {stat.value}
                    </h3>

                    <p className="!mt-1 !text-xs !text-[#74656A] dark:!text-[#555555]">
                      {stat.description}
                    </p>
                  </div>

                  <div
                    className={`!flex !h-12 !w-12 !items-center !justify-center !rounded-xl !bg-[#FAF8F4] dark:!bg-[#171717] !border !border-[#E8DED2] dark:!border-[#292929] ${stat.iconColor}`}
                  >
                    <Icon size={22} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Main Interface Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="!rounded-2xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-white dark:!bg-[#111111] !shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:!shadow-[0_4px_24px_rgba(0,0,0,0.3)] !overflow-hidden"
        >
          {/* Controls Bar */}
          <div className="!border-b !border-[#E8DED2] dark:!border-[#292929] !p-5 !bg-[#FAF8F4]/50 dark:!bg-[#171717]/30">
            <div className="!flex !flex-col xl:!flex-row !gap-4 xl:!items-center xl:!justify-between">
              {/* Search Bar */}
              <div className="!relative !w-full xl:!max-w-md">
                <Search
                  size={18}
                  className="!absolute !left-4 !top-1/2 !-translate-y-1/2 !text-[#74656A] dark:!text-[#555555]"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by Name, Email, Phone, or Room..."
                  className="!w-full !rounded-xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-white dark:!bg-[#080808] !py-3 !pl-11 !pr-4 !text-sm !outline-none focus:!border-[#D4AF37] dark:focus:!border-[#D4AF37] focus:!ring-1 focus:!ring-[#D4AF37] !transition-all"
                />
              </div>

              {/* Action Filters */}
              <div className="!flex !flex-wrap !items-center !gap-3">
                <button
                  type="button"
                  onClick={() => setShowFilters((prev) => !prev)}
                  className={`!flex !items-center !gap-2 !rounded-xl !border !px-4 !py-3 !text-sm !font-semibold !transition-all ${
                    showFilters || roleFilter !== "All"
                      ? "!border-[#D4AF37] !bg-[#D4AF37]/10 !text-[#D4AF37]"
                      : "!border-[#E8DED2] dark:!border-[#292929] !bg-white dark:!bg-[#080808] hover:!border-[#D4AF37]"
                  }`}
                >
                  <SlidersHorizontal size={16} />
                  <span>Filters</span>
                  <ChevronDown
                    size={14}
                    className={`!transition-transform !duration-300 ${
                      showFilters ? "!rotate-180" : ""
                    }`}
                  />
                </button>

                <div className="!relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="!appearance-none !rounded-xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-white dark:!bg-[#080808] !px-4 !py-3 !pr-10 !text-sm !font-medium !outline-none focus:!border-[#D4AF37]"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Active">Active Accounts</option>
                    <option value="Inactive">Restricted/Inactive</option>
                  </select>
                  <ChevronDown
                    size={14}
                    className="!pointer-events-none !absolute !right-3.5 !top-1/2 !-translate-y-1/2 !text-[#74656A] dark:!text-[#555555]"
                  />
                </div>
              </div>
            </div>

            {/* Expanded Filters Drawer */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="!overflow-hidden"
                >
                  <div className="!mt-4 !flex !flex-wrap !items-center !gap-3 !rounded-xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-white dark:!bg-[#080808] !p-4">
                    <span className="!text-xs !font-bold !uppercase !tracking-wider !text-[#74656A] dark:!text-[#555555] !mr-2">
                      User Role:
                    </span>

                    {["All", "Customer"].map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setRoleFilter(role)}
                        className={`!rounded-lg !px-3.5 !py-1.5 !text-xs !font-bold !transition-all ${
                          roleFilter === role
                            ? "!bg-[#D4AF37] !text-black !shadow-[0_0_12px_rgba(212,175,55,0.3)]"
                            : "!bg-[#FAF8F4] dark:!bg-[#171717] !text-[#74656A] dark:!text-[#777777] hover:!text-[#D4AF37]"
                        }`}
                      >
                        {role}
                      </button>
                    ))}

                    {(roleFilter !== "All" ||
                      statusFilter !== "All" ||
                      search) && (
                      <button
                        type="button"
                        onClick={() => {
                          setSearch("");
                          setRoleFilter("All");
                          setStatusFilter("All");
                        }}
                        className="!ml-auto !flex !items-center !gap-1 !text-xs !font-bold !text-rose-500 hover:!underline"
                      >
                        <X size={14} />
                        Reset All
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Content Views */}
          {loading ? (
            <div className="!flex !flex-col !items-center !justify-center !py-24">
              <Loader2
                size={36}
                className="!animate-spin !text-[#D4AF37] !mb-3"
              />
              <p className="!text-sm !font-semibold !text-[#74656A] dark:!text-[#777777]">
                Fetching live customer entries...
              </p>
            </div>
          ) : error ? (
            <div className="!flex !flex-col !items-center !justify-center !py-20 !text-rose-500">
              <AlertCircle size={36} className="!mb-3" />
              <p className="!text-sm !font-bold">{error}</p>
              <button
                onClick={fetchCustomers}
                className="!mt-4 !rounded-xl !bg-rose-500/10 !px-5 !py-2.5 !text-xs !font-bold !text-rose-500 hover:!bg-rose-500/20 !transition-colors"
              >
                Retry Request
              </button>
            </div>
          ) : filteredCustomers.length === 0 ? (
            <div className="!px-6 !py-20 !text-center">
              <div className="!mx-auto !mb-4 !flex !h-16 !w-16 !items-center !justify-center !rounded-2xl !bg-[#D4AF37]/10 !text-[#D4AF37]">
                <Filter size={28} />
              </div>
              <h3 className="!text-lg !font-bold">No Customer Records Found</h3>
              <p className="!mt-1 !text-sm !text-[#74656A] dark:!text-[#777777]">
                Try adjusting your search terms or applied filters.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="!hidden lg:!block !overflow-x-auto">
                <table className="!w-full !text-left">
                  <thead>
                    <tr className="!border-b !border-[#E8DED2] dark:!border-[#292929] !bg-[#FAF8F4]/80 dark:!bg-[#171717]/50 !text-[11px] !font-bold !uppercase !tracking-wider !text-[#74656A] dark:!text-[#777777]">
                      <th className="!px-6 !py-4">Customer</th>
                      <th className="!px-6 !py-4">Contact Info</th>
                      <th className="!px-6 !py-4">Assigned Room</th>
                      <th className="!px-6 !py-4">Member Since</th>
                      <th className="!px-6 !py-4">Account Status</th>
                      <th className="!px-6 !py-4 !text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="!divide-y !divide-[#E8DED2] dark:!divide-[#292929]">
                    {filteredCustomers.map((customer, index) => (
                      <CustomerTableRow
                        key={customer._id || index}
                        customer={customer}
                        index={index}
                        onView={setSelectedCustomer}
                      />
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile / Tablet Responsive Cards */}
              <div className="lg:!hidden !divide-y !divide-[#E8DED2] dark:!divide-[#292929]">
                {filteredCustomers.map((customer, index) => (
                  <CustomerCard
                    key={customer._id || index}
                    customer={customer}
                    index={index}
                    onView={setSelectedCustomer}
                  />
                ))}
              </div>

              {/* Table Footer */}
              <div className="!flex !items-center !justify-between !border-t !border-[#E8DED2] dark:!border-[#292929] !px-6 !py-4 !bg-[#FAF8F4]/30 dark:!bg-[#171717]/20 !text-xs !text-[#74656A] dark:!text-[#777777]">
                <span>
                  Showing <b>{filteredCustomers.length}</b> of{" "}
                  <b>{customers.length}</b> users
                </span>
                <span className="!font-semibold !text-[#D4AF37]">
                  HMS Customer Management
                </span>
              </div>
            </>
          )}
        </motion.div>
      </div>

      {/* Customer Drawer / Details Modal */}
      <AnimatePresence>
        {selectedCustomer && (
          <CustomerDetailsModal
            customer={selectedCustomer}
            onClose={() => setSelectedCustomer(null)}
            onToggleStatus={handleStatusToggle}
            actionLoading={actionLoading}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

/* Table Row Component */
const CustomerTableRow = ({ customer, index, onView }) => {
  const name = customer.fullName || customer.name || "Guest User";
  const email = customer.email || "N/A";
  const phone = customer.phone || customer.contactNumber || "N/A";
  const roomNumber =
    customer.assignedRoom?.roomNumber || customer.roomNumber || "Unassigned";
  const isActive = customer.isActive !== false;
  const joinedDate = customer.createdAt
    ? new Date(customer.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "N/A";

  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="hover:!bg-[#FAF8F4] dark:hover:!bg-[#171717]/40 !transition-colors group"
    >
      <td className="!px-6 !py-4">
        <div className="!flex !items-center !gap-3">
          <div className="!flex !h-10 !w-10 !shrink-0 !items-center !justify-center !rounded-full !bg-[#D4AF37]/10 !text-[#D4AF37] !font-bold !text-xs !border !border-[#D4AF37]/20">
            {initials}
          </div>
          <div>
            <p className="!text-sm !font-bold !text-black dark:!text-white group-hover:!text-[#D4AF37] !transition-colors">
              {name}
            </p>
            <span className="!text-[10px] !font-bold !uppercase !tracking-wider !text-[#74656A] dark:!text-[#555555]">
              {customer.role === "customer" ? "Customer" : customer.role}
            </span>
          </div>
        </div>
      </td>

      <td className="!px-6 !py-4">
        <p className="!text-xs !font-medium !text-black dark:!text-white">
          {email}
        </p>
        <p className="!text-xs !text-[#74656A] dark:!text-[#555555]">{phone}</p>
      </td>

      <td className="!px-6 !py-4">
        {roomNumber !== "Unassigned" ? (
          <span className="!inline-flex !items-center !gap-1.5 !rounded-lg !bg-[#D4AF37]/10 !px-2.5 !py-1 !text-xs !font-bold !text-[#D4AF37] !border !border-[#D4AF37]/20">
            <BedDouble size={12} /> Room {roomNumber}
          </span>
        ) : (
          <span className="!text-xs !text-[#74656A] dark:!text-[#555555]">
            No Active Stay
          </span>
        )}
      </td>

      <td className="!px-6 !py-4">
        <p className="!text-xs !font-semibold">{joinedDate}</p>
      </td>

      <td className="!px-6 !py-4">
        {isActive ? (
          <span className="!inline-flex !items-center !gap-1.5 !rounded-full !bg-emerald-500/10 !px-3 !py-1 !text-xs !font-bold !text-emerald-600 dark:!text-emerald-400 !border !border-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
            <ShieldCheck size={12} /> Active
          </span>
        ) : (
          <span className="!inline-flex !items-center !gap-1.5 !rounded-full !bg-rose-500/10 !px-3 !py-1 !text-xs !font-bold !text-rose-600 dark:!text-rose-400 !border !border-rose-500/20 shadow-[0_0_12px_rgba(244,63,94,0.15)]">
            <ShieldAlert size={12} /> Restricted
          </span>
        )}
      </td>

      <td className="!px-6 !py-4 !text-right">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={() => onView(customer)}
          className="!inline-flex !items-center !gap-1.5 !rounded-xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-white dark:!bg-[#080808] !px-3.5 !py-2 !text-xs !font-bold hover:!border-[#D4AF37] hover:!text-[#D4AF37] !transition-all"
        >
          <Eye size={14} />
          Inspect
        </motion.button>
      </td>
    </motion.tr>
  );
};

/* Mobile Card View Component */
const CustomerCard = ({ customer, index, onView }) => {
  const name = customer.fullName || customer.name || "Guest User";
  const isActive = customer.isActive !== false;
  const roomNumber =
    customer.assignedRoom?.roomNumber || customer.roomNumber || "Unassigned";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="!p-5"
    >
      <div className="!flex !items-center !justify-between">
        <div className="!flex !items-center !gap-3">
          <div className="!flex !h-10 !w-10 !items-center !justify-center !rounded-xl !bg-[#D4AF37]/10 !text-[#D4AF37] !border !border-[#D4AF37]/20 !font-bold !text-xs">
            {name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <span className="!font-bold !text-sm !text-black dark:!text-white">
              {name}
            </span>
            <p className="!text-xs !text-[#74656A] dark:!text-[#555555]">
              {customer.role === "customer" ? "Customer" : customer.role}
            </p>
          </div>
        </div>

        {isActive ? (
          <span className="!inline-flex !items-center !gap-1 !rounded-full !bg-emerald-500/10 !px-2.5 !py-1 !text-[10px] !font-bold !text-emerald-500 !border !border-emerald-500/20">
            <ShieldCheck size={10} /> Active
          </span>
        ) : (
          <span className="!inline-flex !items-center !gap-1 !rounded-full !bg-rose-500/10 !px-2.5 !py-1 !text-[10px] !font-bold !text-rose-500 !border !border-rose-500/20">
            <ShieldAlert size={10} /> Restricted
          </span>
        )}
      </div>

      <div className="!mt-4 !grid !grid-cols-2 !gap-3 !rounded-xl !bg-[#FAF8F4] dark:!bg-[#171717]/50 !p-3.5 !border !border-[#E8DED2]/50 dark:!border-[#292929]/50">
        <div>
          <span className="!text-[10px] !font-bold !uppercase !text-[#74656A] dark:!text-[#555555]">
            Email
          </span>
          <p className="!text-xs !font-bold !truncate">
            {customer.email || "N/A"}
          </p>
        </div>

        <div>
          <span className="!text-[10px] !font-bold !uppercase !text-[#74656A] dark:!text-[#555555]">
            Phone
          </span>
          <p className="!text-xs !font-bold">{customer.phone || "N/A"}</p>
        </div>

        <div>
          <span className="!text-[10px] !font-bold !uppercase !text-[#74656A] dark:!text-[#555555]">
            Allocated Stay
          </span>
          <p className="!text-xs !font-bold !text-[#D4AF37]">
            {roomNumber !== "Unassigned" ? `Room ${roomNumber}` : "None"}
          </p>
        </div>

        <div>
          <span className="!text-[10px] !font-bold !uppercase !text-[#74656A] dark:!text-[#555555]">
            Registered
          </span>
          <p className="!text-xs !font-medium">
            {customer.createdAt
              ? new Date(customer.createdAt).toLocaleDateString("en-IN")
              : "N/A"}
          </p>
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.98 }}
        type="button"
        onClick={() => onView(customer)}
        className="!mt-4 !w-full !flex !items-center !justify-center !gap-2 !rounded-xl !bg-[#D4AF37] !py-2.5 !text-xs !font-bold !text-black !shadow-[0_0_12px_rgba(212,175,55,0.2)] hover:!bg-[#E7C95C] !transition-colors"
      >
        <Eye size={14} />
        Inspect Profile
      </motion.button>
    </motion.div>
  );
};

/* Customer Profile Modal */
const CustomerDetailsModal = ({
  customer,
  onClose,
  onToggleStatus,
  actionLoading,
}) => {
  const name = customer.fullName || customer.name || "Guest User";
  const isActive = customer.isActive !== false;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="!fixed !inset-0 !z-50 !flex !items-center !justify-center !p-4 !bg-black/80 !backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="!w-full !max-w-xl !max-h-[90vh] !overflow-y-auto !rounded-2xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-white dark:!bg-[#111111] !shadow-2xl"
      >
        <div className="!flex !items-center !justify-between !border-b !border-[#E8DED2] dark:!border-[#292929] !p-6">
          <div>
            <div className="!flex !items-center !gap-2">
              <span className="!text-xs !font-bold !uppercase !tracking-wider !text-[#D4AF37]">
                Customer Dossier
              </span>
              {isActive ? (
                <span className="!rounded-full !bg-emerald-500/10 !border !border-emerald-500/20 !px-2 !py-0.5 !text-[10px] !font-bold !text-emerald-500">
                  Active User
                </span>
              ) : (
                <span className="!rounded-full !bg-rose-500/10 !border !border-rose-500/20 !px-2 !py-0.5 !text-[10px] !font-bold !text-rose-500">
                  Account Blocked
                </span>
              )}
            </div>
            <h2 className="!mt-1 !text-2xl !font-extrabold">{name}</h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="!flex !h-9 !w-9 !items-center !justify-center !rounded-xl !bg-[#FAF8F4] dark:!bg-[#171717] hover:!bg-[#D4AF37]/10 !transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="!p-6 !space-y-5">
          {/* Main Info Card */}
          <div className="!rounded-xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-[#FAF8F4]/50 dark:!bg-[#171717]/30 !p-4">
            <span className="!text-[11px] !font-bold !uppercase !tracking-wider !text-[#74656A] dark:!text-[#555555]">
              Contact Details
            </span>
            <div className="!mt-3 !grid !grid-cols-1 sm:!grid-cols-2 !gap-3">
              <div className="!flex !items-center !gap-2.5 !text-xs">
                <Mail size={16} className="!text-[#D4AF37]" />
                <span className="!font-medium">{customer.email || "N/A"}</span>
              </div>
              <div className="!flex !items-center !gap-2.5 !text-xs">
                <Phone size={16} className="!text-[#D4AF37]" />
                <span className="!font-medium">
                  {customer.phone || customer.contactNumber || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Allocation Matrix */}
          <div className="!grid !grid-cols-2 !gap-3">
            <DetailTile
              icon={BedDouble}
              label="Assigned Room"
              value={
                customer.assignedRoom?.roomNumber
                  ? `Room ${customer.assignedRoom.roomNumber}`
                  : "No Active Stay"
              }
              subValue={customer.assignedRoom?.roomType || "Standard Wing"}
            />
            <DetailTile
              icon={Calendar}
              label="Joined Date"
              value={
                customer.createdAt
                  ? new Date(customer.createdAt).toLocaleDateString("en-IN")
                  : "N/A"
              }
            />
            <DetailTile
              icon={CreditCard}
              label="Payment Status"
              value={customer.paymentStatus || "Up to Date"}
            />
            <DetailTile
              icon={History}
              label="Total Bookings"
              value={`${customer.totalBookings ?? customer.bookingHistory?.length ?? 0} Record(s)`}
            />
          </div>

          {/* Emergency / Additional Notes */}
          {customer.emergencyContact && (
            <div className="!rounded-xl !border !border-[#E8DED2] dark:!border-[#292929] !p-4">
              <span className="!text-[10px] !font-bold !uppercase !text-[#74656A] dark:!text-[#555555]">
                Emergency Contact
              </span>
              <p className="!mt-1 !text-xs !font-bold">
                {customer.emergencyContact}
              </p>
            </div>
          )}

          {/* Account Status Toggle Trigger */}
          <div className="!pt-4 !flex !items-center !justify-end !gap-3">
            {actionLoading ? (
              <div className="!flex !items-center !gap-2 !text-xs !font-bold !text-[#D4AF37]">
                <Loader2 size={16} className="!animate-spin" />
                Updating Status...
              </div>
            ) : (
              <button
                type="button"
                onClick={() => onToggleStatus(customer._id, isActive)}
                className={`!rounded-xl !px-5 !py-3 !text-xs !font-bold !transition-all ${
                  isActive
                    ? "!bg-rose-500/10 !text-rose-500 hover:!bg-rose-500/20 !border !border-rose-500/20"
                    : "!bg-emerald-500/10 !text-emerald-500 hover:!bg-emerald-500/20 !border !border-emerald-500/20"
                }`}
              >
                {isActive ? "Restrict User Account" : "Reactivate User Account"}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const DetailTile = ({ icon: Icon, label, value, subValue }) => (
  <div className="!rounded-xl !border !border-[#E8DED2] dark:!border-[#292929] !p-3.5">
    <div className="!flex !items-center !gap-1.5 !text-[#74656A] dark:!text-[#555555] !mb-1">
      <Icon size={14} />
      <span className="!text-[10px] !font-bold !uppercase">{label}</span>
    </div>
    <p className="!text-xs !font-bold !text-black dark:!text-white">{value}</p>
    {subValue && (
      <p className="!text-[10px] !text-[#74656A] dark:!text-[#555555]">
        {subValue}
      </p>
    )}
  </div>
);

export default ManageCustomers;
