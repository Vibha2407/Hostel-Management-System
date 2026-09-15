import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  CreditCard,
  CheckCircle2,
  Clock,
  XCircle,
  RefreshCw,
  Eye,
  Download,
  DollarSign,
  Receipt,
  User,
  BedDouble,
  ChevronDown,
  X,
  Loader2,
  AlertCircle,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";

import {
  getAllPayments,
  updatePaymentStatus,
} from "../../services/paymentService";

const ManagePayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [methodFilter, setMethodFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllPayments();
      setPayments(Array.isArray(data.payments) ? data.payments : []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch payment records.",
      );
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      setActionLoading(true);
      await updatePaymentStatus(id, newStatus);
      if (selectedPayment && selectedPayment._id === id) {
        setSelectedPayment((prev) => ({ ...prev, paymentStatus: newStatus }));
      }
      await fetchPayments();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status.");
    } finally {
      setActionLoading(false);
    }
  };

  const filteredPayments = useMemo(() => {
    if (!Array.isArray(payments)) return [];
    return payments.filter((item) => {
      const query = search.toLowerCase();
      const userName = item.user?.fullName || "";
      const email = item.user?.email || "";
      const receipt = item.receiptNumber || "";
      const txnId = item.transactionId || "";

      const matchesSearch =
        userName.toLowerCase().includes(query) ||
        email.toLowerCase().includes(query) ||
        receipt.toLowerCase().includes(query) ||
        txnId.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || item.paymentStatus === statusFilter;
      const matchesMethod =
        methodFilter === "All" || item.paymentMethod === methodFilter;

      return matchesSearch && matchesStatus && matchesMethod;
    });
  }, [payments, search, statusFilter, methodFilter]);

  const stats = useMemo(() => {
    const safe = Array.isArray(payments) ? payments : [];
    const totalRev = safe
      .filter((p) => p.paymentStatus === "Success")
      .reduce((acc, curr) => acc + (curr.amount || 0), 0);
    const successCount = safe.filter(
      (p) => p.paymentStatus === "Success",
    ).length;
    const pendingCount = safe.filter(
      (p) => p.paymentStatus === "Pending",
    ).length;
    const failedCount = safe.filter((p) => p.paymentStatus === "Failed").length;

    return [
      {
        title: "Total Revenue",
        value: `₹${totalRev.toLocaleString("en-IN")}`,
        icon: TrendingUp,
        desc: "Cleared transactions",
        accent: "from-emerald-500/20 via-emerald-500/5 to-transparent",
        color: "!text-emerald-500",
      },
      {
        title: "Successful Payments",
        value: successCount,
        icon: CheckCircle2,
        desc: "Verified receipts",
        accent: "from-blue-500/20 via-blue-500/5 to-transparent",
        color: "!text-blue-500",
      },
      {
        title: "Pending Clearance",
        value: pendingCount,
        icon: Clock,
        desc: "Awaiting confirmation",
        accent: "from-[#D4AF37]/20 via-[#D4AF37]/5 to-transparent",
        color: "!text-[#D4AF37]",
      },
      {
        title: "Failed / Refunded",
        value: failedCount,
        icon: XCircle,
        desc: "Declined transactions",
        accent: "from-rose-500/20 via-rose-500/5 to-transparent",
        color: "!text-rose-500",
      },
    ];
  }, [payments]);

  return (
    <div className="!min-h-screen !bg-[#FAF8F4] dark:!bg-[#080808] !text-[#2B1720] dark:!text-white !p-4 sm:!p-6 lg:!p-8 !transition-colors !duration-300">
      <div className="!mx-auto !max-w-[1600px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="!mb-8 !flex !flex-col lg:!flex-row lg:!items-center lg:!justify-between !gap-5"
        >
          <div>
            <div className="!mb-2 !inline-flex !items-center !gap-2 !rounded-full !border !border-[#D4AF37]/30 !bg-[#D4AF37]/10 !px-3 !py-1">
              <Sparkles size={14} className="!text-[#D4AF37] !animate-pulse" />
              <span className="!text-[11px] !font-bold !uppercase !tracking-[0.2em] !text-[#D4AF37]">
                Financial Ledger
              </span>
            </div>
            <h1 className="!text-3xl sm:!text-4xl !font-extrabold !tracking-tight">
              Manage Payments
            </h1>
            <p className="!mt-1 !text-sm !text-[#74656A] dark:!text-[#777777]">
              Monitor revenue streams, review receipts, and handle transaction
              settlements.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={fetchPayments}
            className="!inline-flex !items-center !justify-center !gap-2.5 !rounded-xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-white dark:!bg-[#111111] !px-5 !py-3 !text-sm !font-semibold !shadow-sm hover:!border-[#D4AF37]"
          >
            <RefreshCw
              size={16}
              className={
                loading ? "!animate-spin !text-[#D4AF37]" : "!text-[#D4AF37]"
              }
            />
            Refresh Payments
          </motion.button>
        </motion.div>

        {/* Metrics Grid */}
        <div className="!grid !grid-cols-1 sm:!grid-cols-2 xl:!grid-cols-4 !gap-5 !mb-8">
          {stats.map((st, i) => {
            const Icon = st.icon;
            return (
              <motion.div
                key={st.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="!relative !overflow-hidden !rounded-2xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-white dark:!bg-[#111111] !p-6 !shadow-sm"
              >
                <div
                  className={`!absolute !inset-0 !bg-gradient-to-br ${st.accent} !pointer-events-none`}
                />
                <div className="!relative !z-10 !flex !items-start !justify-between">
                  <div>
                    <span className="!text-xs !font-semibold !uppercase !text-[#74656A] dark:!text-[#777777]">
                      {st.title}
                    </span>
                    <h3 className="!mt-2 !text-3xl !font-black !tracking-tight">
                      {st.value}
                    </h3>
                    <p className="!mt-1 !text-xs !text-[#74656A] dark:!text-[#555555]">
                      {st.desc}
                    </p>
                  </div>
                  <div
                    className={`!flex !h-12 !w-12 !items-center !justify-center !rounded-xl !bg-[#FAF8F4] dark:!bg-[#171717] !border !border-[#E8DED2] dark:!border-[#292929] ${st.color}`}
                  >
                    <Icon size={22} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Main Console Box */}
        <div className="!rounded-2xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-white dark:!bg-[#111111] !shadow-sm !overflow-hidden">
          {/* Controls Bar */}
          <div className="!border-b !border-[#E8DED2] dark:!border-[#292929] !p-5 !bg-[#FAF8F4]/50 dark:!bg-[#171717]/30">
            <div className="!flex !flex-col xl:!flex-row !gap-4 xl:!items-center xl:!justify-between">
              <div className="!relative !w-full xl:!max-w-md">
                <Search
                  size={18}
                  className="!absolute !left-4 !top-1/2 !-translate-y-1/2 !text-[#74656A]"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by User, Email, Txn ID or Receipt..."
                  className="!w-full !rounded-xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-white dark:!bg-[#080808] !py-3 !pl-11 !pr-4 !text-sm !outline-none focus:!border-[#D4AF37]"
                />
              </div>

              <div className="!flex !flex-wrap !items-center !gap-3">
                <button
                  onClick={() => setShowFilters((p) => !p)}
                  className={`!flex !items-center !gap-2 !rounded-xl !border !px-4 !py-3 !text-sm !font-semibold ${
                    showFilters
                      ? "!border-[#D4AF37] !bg-[#D4AF37]/10 !text-[#D4AF37]"
                      : "!border-[#E8DED2] dark:!border-[#292929]"
                  }`}
                >
                  <SlidersHorizontal size={16} /> Filters
                </button>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="!rounded-xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-white dark:!bg-[#080808] !px-4 !py-3 !text-sm !font-semibold !outline-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="Success">Success</option>
                  <option value="Pending">Pending</option>
                  <option value="Failed">Failed</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </div>
            </div>

            {/* Expanded Method Drawer */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="!overflow-hidden"
                >
                  <div className="!mt-4 !flex !flex-wrap !items-center !gap-2 !rounded-xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-white dark:!bg-[#080808] !p-4">
                    <span className="!text-xs !font-bold !uppercase !text-[#74656A]">
                      Method:
                    </span>
                    {[
                      "All",
                      "Cash",
                      "UPI",
                      "Credit Card",
                      "Debit Card",
                      "Net Banking",
                    ].map((m) => (
                      <button
                        key={m}
                        onClick={() => setMethodFilter(m)}
                        className={`!rounded-lg !px-3 !py-1.5 !text-xs !font-bold ${
                          methodFilter === m
                            ? "!bg-[#D4AF37] !text-black"
                            : "!bg-[#FAF8F4] dark:!bg-[#171717]"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Table Area */}
          {loading ? (
            <div className="!flex !flex-col !items-center !justify-center !py-24">
              <Loader2
                size={36}
                className="!animate-spin !text-[#D4AF37] !mb-2"
              />
              <p className="!text-sm !font-semibold">
                Loading ledger records...
              </p>
            </div>
          ) : filteredPayments.length === 0 ? (
            <div className="!py-20 !text-center">
              <Receipt size={32} className="!mx-auto !text-[#D4AF37] !mb-2" />
              <p className="!text-base !font-bold">No Payments Found</p>
            </div>
          ) : (
            <div className="!overflow-x-auto">
              <table className="!w-full !text-left">
                <thead>
                  <tr className="!border-b !border-[#E8DED2] dark:!border-[#292929] !bg-[#FAF8F4]/80 dark:!bg-[#171717]/50 !text-[11px] !font-bold !uppercase !tracking-wider !text-[#74656A]">
                    <th className="!px-6 !py-4">Receipt / Txn</th>
                    <th className="!px-6 !py-4">User</th>
                    <th className="!px-6 !py-4">Method</th>
                    <th className="!px-6 !py-4">Amount</th>
                    <th className="!px-6 !py-4">Status</th>
                    <th className="!px-6 !py-4 !text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="!divide-y !divide-[#E8DED2] dark:!divide-[#292929]">
                  {filteredPayments.map((p, idx) => (
                    <tr
                      key={p._id || idx}
                      className="hover:!bg-[#FAF8F4] dark:hover:!bg-[#171717]/40 !transition-colors"
                    >
                      <td className="!px-6 !py-4">
                        <p className="!text-xs !font-bold !text-[#D4AF37]">
                          {p.receiptNumber}
                        </p>
                        <p className="!text-[11px] !text-[#74656A]">
                          {p.transactionId || "No TXN ID"}
                        </p>
                      </td>
                      <td className="!px-6 !py-4">
                        <p className="!text-xs !font-bold">
                          {p.user?.fullName || "Guest User"}
                        </p>
                        <p className="!text-[11px] !text-[#74656A]">
                          {p.user?.email || "N/A"}
                        </p>
                      </td>
                      <td className="!px-6 !py-4">
                        <span className="!inline-flex !items-center !gap-1.5 !rounded-lg !bg-[#FAF8F4] dark:!bg-[#171717] !px-2.5 !py-1 !text-xs !font-bold !border !border-[#E8DED2] dark:!border-[#292929]">
                          <CreditCard size={12} className="!text-[#D4AF37]" />
                          {p.paymentMethod}
                        </span>
                      </td>
                      <td className="!px-6 !py-4">
                        <p className="!text-sm !font-black">
                          ₹{p.amount?.toLocaleString("en-IN")}
                        </p>
                      </td>
                      <td className="!px-6 !py-4">
                        <StatusBadge status={p.paymentStatus} />
                      </td>
                      <td className="!px-6 !py-4 !text-right">
                        <button
                          onClick={() => setSelectedPayment(p)}
                          className="!inline-flex !items-center !gap-1 !rounded-xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-white dark:!bg-[#080808] !px-3 !py-1.5 !text-xs !font-bold hover:!border-[#D4AF37] hover:!text-[#D4AF37]"
                        >
                          <Eye size={14} /> Receipt
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal Inspector */}
      <AnimatePresence>
        {selectedPayment && (
          <ReceiptModal
            payment={selectedPayment}
            onClose={() => setSelectedPayment(null)}
            onStatusChange={handleStatusChange}
            actionLoading={actionLoading}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const map = {
    Success: "!bg-emerald-500/10 !text-emerald-500 !border-emerald-500/20",
    Pending: "!bg-[#D4AF37]/10 !text-[#D4AF37] !border-[#D4AF37]/20",
    Failed: "!bg-rose-500/10 !text-rose-500 !border-rose-500/20",
    Refunded: "!bg-purple-500/10 !text-purple-500 !border-purple-500/20",
  };
  return (
    <span
      className={`!inline-flex !items-center !rounded-full !border !px-2.5 !py-0.5 !text-[11px] !font-bold ${map[status] || map.Pending}`}
    >
      {status}
    </span>
  );
};

const ReceiptModal = ({ payment, onClose, onStatusChange, actionLoading }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="!fixed !inset-0 !z-50 !flex !items-center !justify-center !p-4 !bg-black/80 !backdrop-blur-md"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.95 }}
      onClick={(e) => e.stopPropagation()}
      className="!w-full !max-w-lg !rounded-2xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-white dark:!bg-[#111111] !p-6 !shadow-2xl"
    >
      <div className="!flex !items-center !justify-between !border-b !border-[#E8DED2] dark:!border-[#292929] !pb-4">
        <div>
          <span className="!text-xs !font-bold !uppercase !text-[#D4AF37]">
            Payment Details
          </span>
          <h2 className="!text-xl !font-black">{payment.receiptNumber}</h2>
        </div>
        <button
          onClick={onClose}
          className="!rounded-xl !p-2 hover:!bg-[#FAF8F4] dark:hover:!bg-[#171717]"
        >
          <X size={18} />
        </button>
      </div>

      <div className="!mt-5 !space-y-4">
        <div className="!grid !grid-cols-2 !gap-3">
          <div className="!rounded-xl !bg-[#FAF8F4] dark:!bg-[#171717] !p-3">
            <span className="!text-[10px] !font-bold !uppercase !text-[#74656A]">
              Payer
            </span>
            <p className="!text-xs !font-bold">
              {payment.user?.fullName || "Guest User"}
            </p>
          </div>
          <div className="!rounded-xl !bg-[#FAF8F4] dark:!bg-[#171717] !p-3">
            <span className="!text-[10px] !font-bold !uppercase !text-[#74656A]">
              Amount
            </span>
            <p className="!text-xs !font-black !text-[#D4AF37]">
              ₹{payment.amount}
            </p>
          </div>
        </div>

        <div className="!rounded-xl !border !border-[#E8DED2] dark:!border-[#292929] !p-4 !space-y-2 !text-xs">
          <div className="!flex !justify-between">
            <span className="!text-[#74656A]">Method:</span>
            <span className="!font-bold">{payment.paymentMethod}</span>
          </div>
          <div className="!flex !justify-between">
            <span className="!text-[#74656A]">Transaction Ref:</span>
            <span className="!font-bold">{payment.transactionId || "N/A"}</span>
          </div>
          <div className="!flex !justify-between">
            <span className="!text-[#74656A]">Date:</span>
            <span className="!font-bold">
              {new Date(
                payment.paymentDate || payment.createdAt,
              ).toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        <div className="!pt-3 !border-t !border-[#E8DED2] dark:!border-[#292929] !flex !items-center !justify-between">
          <span className="!text-xs !font-bold">Update Status:</span>
          {actionLoading ? (
            <Loader2 size={18} className="!animate-spin !text-[#D4AF37]" />
          ) : (
            <select
              value={payment.paymentStatus}
              onChange={(e) => onStatusChange(payment._id, e.target.value)}
              className="!rounded-xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-white dark:!bg-[#080808] !px-3 !py-1.5 !text-xs !font-bold"
            >
              <option value="Pending">Pending</option>
              <option value="Success">Success</option>
              <option value="Failed">Failed</option>
              <option value="Refunded">Refunded</option>
            </select>
          )}
        </div>
      </div>
    </motion.div>
  </motion.div>
);

export default ManagePayments;
