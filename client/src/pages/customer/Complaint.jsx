import { useEffect, useState } from "react";
import api from "../../services/axios";

// Helper Inline Icons for zero-dependency modern UI
const ShieldAlertIcon = () => (
  <svg
    className="!h-5 !w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    />
  </svg>
);

const CheckCircleIcon = () => (
  <svg
    className="!h-4 !w-4 !mr-1.5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

const ClockIcon = () => (
  <svg
    className="!h-4 !w-4 !mr-1.5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const PlusIcon = () => (
  <svg
    className="!h-4 !w-4 !mr-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4v16m8-8H4"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    className="!h-4 !w-4 !mr-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const DoorIcon = () => (
  <svg
    className="!h-4 !w-4 !text-[#D4AF37]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
    />
  </svg>
);

const CategoryIcon = () => (
  <svg
    className="!h-4 !w-4 !text-[#D4AF37]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 7h.01M7 11h.01M7 15h.01M11 7h8M11 11h8M11 15h8"
    />
  </svg>
);

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [rooms, setRooms] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    room: "",
    subject: "",
    category: "",
    description: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/complaints/my");

      if (response.data.success) {
        setComplaints(response.data.complaints);
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Unable to load your complaints.",
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchMyRooms = async () => {
    try {
      const response = await api.get("/bookings/my-bookings");

      console.log("MY BOOKINGS RESPONSE:", response.data);

      if (response.data.success) {
        const activeBookings = response.data.bookings.filter(
          (booking) =>
            ["Confirmed", "Checked-In"].includes(booking.bookingStatus) &&
            booking.room,
        );

        console.log("ACTIVE BOOKINGS:", activeBookings);

        const activeRooms = activeBookings.map((booking) => booking.room);

        console.log("ACTIVE ROOMS:", activeRooms);

        setRooms(activeRooms);
      }
    } catch (error) {
      console.error("MY BOOKINGS ERROR:", error.response?.data || error);

      setRooms([]);
    }
  };

  useEffect(() => {
    fetchComplaints();
    fetchMyRooms();
  }, []);

  const handleSubmitComplaint = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setError("");
      setSuccess("");

      const response = await api.post("/complaints", formData);

      if (response.data.success) {
        setSuccess("Complaint submitted successfully.");

        setFormData({
          room: "",
          subject: "",
          category: "",
          description: "",
        });

        setShowForm(false);

        await fetchComplaints();
      }
    } catch (error) {
      setError(error.response?.data?.message || "Unable to submit complaint.");
    } finally {
      setSubmitting(false);
    }
  };

  // Modern Pulse Skeleton Loading
  if (loading) {
    return (
      <main className="!min-h-screen !bg-[var(--color-background)] !p-6 md:!p-10 !transition-colors !duration-300">
        <div className="!mx-auto !max-w-6xl">
          <div className="!h-9 !w-48 !animate-pulse !rounded-lg !bg-gray-300 dark:!bg-neutral-800" />
          <div className="!mt-2 !h-5 !w-72 !animate-pulse !rounded-lg !bg-gray-200 dark:!bg-neutral-800" />

          <div className="!mt-8 !space-y-4">
            {[1, 2].map((n) => (
              <div
                key={n}
                className="!h-40 !w-full !animate-pulse !rounded-2xl !border !border-[var(--color-border)] !bg-[var(--color-surface)] !shadow-sm"
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="!min-h-screen !bg-[var(--color-background)] !p-6 md:!p-10 !transition-colors !duration-300">
      <div className="!mx-auto !max-w-6xl">
        {/* Header Section */}
        <div className="!relative !mb-8 !overflow-hidden !rounded-2xl !border !border-[var(--color-border)] !bg-[var(--color-surface)] !p-6 !shadow-sm !transition-all md:!p-8">
          <div className="!absolute !-right-10 !-top-10 !h-40 !w-40 !rounded-full !bg-gradient-to-br !from-[#D4AF37]/20 !to-[#4A1D2F]/10 !blur-2xl" />

          <div className="!relative !z-10 !flex !flex-col !gap-4 sm:!flex-row sm:!items-center sm:!justify-between">
            <div>
              <div className="!flex !items-center !gap-3">
                <span className="!h-3 !w-3 !rounded-full !bg-[#D4AF37] !shadow-[0_0_10px_#D4AF37]" />
                <h1 className="!text-3xl !font-bold !tracking-tight !text-[var(--color-text-primary)] md:!text-4xl">
                  My Complaints
                </h1>
              </div>
              <p className="!mt-2 !text-sm !text-[var(--color-text-muted)] md:!text-base">
                Track your room-related complaints and administration responses.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                if (rooms.length === 0) {
                  setError(
                    "You need an active booking to raise a room-related complaint.",
                  );
                  setSuccess("");
                  setShowForm(false);
                  return;
                }

                setShowForm((prev) => !prev);
                setError("");
                setSuccess("");
              }}
              className="!rounded-xl !bg-[#4A1D2F] !px-5 !py-3 !font-semibold !text-white !transition hover:!opacity-90"
            >
              {showForm ? "Close" : "+ Raise Complaint"}
            </button>
          </div>
        </div>

        {/* Success Alert */}
        {success && (
          <div className="!mb-6 !flex !items-center !gap-3 !rounded-xl !border !border-emerald-500/30 !bg-emerald-500/10 !p-4 !text-sm !font-medium !text-[var(--color-success)] !backdrop-blur-sm">
            <CheckCircleIcon />
            <span>{success}</span>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="!mb-6 !flex !items-center !gap-3 !rounded-xl !border !border-red-500/30 !bg-red-500/10 !p-4 !text-sm !font-medium !text-[var(--color-danger)] !backdrop-blur-sm">
            <ShieldAlertIcon />
            <span>{error}</span>
          </div>
        )}

        {/* Animated Complaint Form Modal/Collapse */}
        {showForm && (
          <form
            onSubmit={handleSubmitComplaint}
            className="!mb-8 !relative !overflow-hidden !rounded-2xl !border !border-[var(--color-border)] !bg-[var(--color-surface)] !p-6 !shadow-[var(--shadow-card)] !transition-all md:!p-8"
          >
            <div className="!absolute !top-0 !left-0 !right-0 !h-1 !bg-gradient-to-r !from-[#4A1D2F] !via-[#D4AF37] !to-[#4A1D2F]" />

            <h2 className="!text-xl !font-bold !text-[var(--color-text-primary)]">
              Raise a New Complaint
            </h2>
            <p className="!mt-1 !text-xs !text-[var(--color-text-muted)]">
              Fill in details below. Our administrative team will review it
              shortly.
            </p>

            <div className="!mt-6 !grid !gap-5 sm:!grid-cols-2">
              {/* Room */}
              <div>
                <label className="!mb-2 !block !text-xs !font-semibold !uppercase !tracking-wider !text-[var(--color-text-muted)]">
                  Select Room
                </label>
                <select
                  value={formData.room}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      room: e.target.value,
                    })
                  }
                  required
                  className="booking-input"
                >
                  <option value="">Select your active room</option>
                  {rooms.map((room) => (
                    <option key={room._id} value={room._id}>
                      Room {room.roomNumber}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="!mb-2 !block !text-xs !font-semibold !uppercase !tracking-wider !text-[var(--color-text-muted)]">
                  Issue Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value,
                    })
                  }
                  required
                  className="booking-input"
                >
                  <option value="">Select category</option>
                  <option value="Room Maintenance">Room Maintenance</option>
                  <option value="Electricity">Electricity</option>
                  <option value="Water">Water</option>
                  <option value="Cleaning">Cleaning</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Internet">Internet</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Subject */}
              <div className="sm:!col-span-2">
                <label className="!mb-2 !block !text-xs !font-semibold !uppercase !tracking-wider !text-[var(--color-text-muted)]">
                  Subject Header
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      subject: e.target.value,
                    })
                  }
                  placeholder="e.g. Bathroom tap is leaking"
                  required
                  className="booking-input"
                />
              </div>

              {/* Description */}
              <div className="sm:!col-span-2">
                <label className="!mb-2 !block !text-xs !font-semibold !uppercase !tracking-wider !text-[var(--color-text-muted)]">
                  Detailed Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  placeholder="Please elaborate on your issue..."
                  rows={4}
                  required
                  className="booking-input !resize-none"
                />
              </div>
            </div>

            <div className="!mt-6 !flex !justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="!relative !inline-flex !items-center !justify-center !overflow-hidden !rounded-xl !bg-gradient-to-r !from-[#4A1D2F] !to-[#6B2944] !px-8 !py-3.5 !text-sm !font-semibold !text-[#D4AF37] !shadow-lg !transition-all !duration-300 hover:!shadow-xl hover:!brightness-110 disabled:!cursor-not-allowed disabled:!opacity-50"
              >
                {submitting ? (
                  <span className="!flex !items-center !gap-2">
                    <svg
                      className="!h-4 !w-4 !animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="!opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="!opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Submit Complaint"
                )}
              </button>
            </div>
          </form>
        )}

        {/* Empty State */}
        {complaints.length === 0 ? (
          <div className="!flex !min-h-[350px] !flex-col !items-center !justify-center !rounded-3xl !border !border-[var(--color-border)] !bg-[var(--color-surface)] !p-10 !text-center !shadow-[var(--shadow-card)] !transition-all">
            <div className="!mb-4 !flex !h-16 !w-16 !items-center !justify-center !rounded-full !bg-emerald-500/10 !text-[var(--color-success)]">
              <CheckCircleIcon />
            </div>
            <h2 className="!text-2xl !font-bold !text-[var(--color-text-primary)]">
              No Complaints Yet
            </h2>
            <p className="!mt-2 !max-w-md !text-sm !text-[var(--color-text-muted)]">
              You haven't submitted any room-related complaints. If you face any
              issues, tap "+ Raise Complaint" above.
            </p>
          </div>
        ) : (
          /* Complaints List */
          <div className="!space-y-6">
            {complaints.map((complaint) => {
              const isResolved = complaint.status === "Resolved";
              const isInProgress = complaint.status === "In Progress";

              return (
                <div
                  key={complaint._id}
                  className="!group !relative !overflow-hidden !rounded-2xl !border !border-[var(--color-border)] !bg-[var(--color-surface)] !p-6 !shadow-[var(--shadow-card)] !transition-all !duration-300 hover:!border-[#D4AF37]/40 md:!p-8"
                >
                  {/* Status Side Ribbon */}
                  <div
                    className={`!absolute !left-0 !top-0 !bottom-0 !w-1.5 ${
                      isResolved
                        ? "!bg-[var(--color-success)]"
                        : isInProgress
                          ? "!bg-blue-500"
                          : "!bg-[#D4AF37]"
                    }`}
                  />

                  {/* Header & Status Badge */}
                  <div className="!flex !flex-col !gap-3 sm:!flex-row sm:!items-center sm:!justify-between">
                    <div>
                      <h2 className="!text-xl !font-bold !text-[var(--color-text-primary)]">
                        {complaint.subject}
                      </h2>
                    </div>

                    <span
                      className={`!inline-flex !items-center !rounded-full !px-3.5 !py-1.5 !text-xs !font-semibold !transition-all ${
                        isResolved
                          ? "!bg-emerald-500/15 !text-[var(--color-success)] !border !border-emerald-500/20"
                          : isInProgress
                            ? "!bg-blue-500/15 !text-blue-500 !border !border-blue-500/20"
                            : "!bg-amber-500/15 !text-amber-600 dark:!text-amber-400 !border !border-amber-500/20"
                      }`}
                    >
                      {isResolved ? <CheckCircleIcon /> : <ClockIcon />}
                      {complaint.status}
                    </span>
                  </div>

                  {/* Room & Category Meta */}
                  <div className="!mt-4 !flex !flex-wrap !items-center !gap-6 !border-y !border-[var(--color-border)] !py-3 !text-sm">
                    <div className="!flex !items-center !gap-2">
                      <DoorIcon />
                      <span className="!text-[var(--color-text-muted)]">
                        Room:
                      </span>
                      <strong className="!font-medium !text-[var(--color-text-primary)]">
                        {complaint.room?.roomNumber || "N/A"}
                      </strong>
                    </div>

                    <div className="!flex !items-center !gap-2">
                      <CategoryIcon />
                      <span className="!text-[var(--color-text-muted)]">
                        Category:
                      </span>
                      <span className="!rounded-md !bg-gradient-to-r !from-[#4A1D2F] !to-[#6B2944] !px-2.5 !py-0.5 !text-[11px] !font-bold !uppercase !tracking-wider !text-[#D4AF37]">
                        {complaint.category || "General"}
                      </span>
                    </div>
                  </div>

                  {/* Complaint Description */}
                  <div className="!mt-5">
                    <p className="!text-xs !font-semibold !uppercase !tracking-wider !text-[var(--color-text-muted)]">
                      Your Complaint
                    </p>
                    <p className="!mt-2 !text-sm !leading-relaxed !text-[var(--color-text-primary)]/90">
                      {complaint.description}
                    </p>
                  </div>

                  {/* Admin Response Box */}
                  {/* Management / Resolution Information */}
                  {(complaint.adminResponse ||
                    complaint.assignedTo ||
                    complaint.expectedResolutionDate) && (
                    <div className="!mt-6 !rounded-xl !border !border-[#D4AF37]/20 !bg-[var(--color-surface-secondary)] !p-5">
                      <p className="!text-xs !font-semibold !uppercase !tracking-wider !text-[#D4AF37]">
                        Management Update
                      </p>

                      {/* Assigned Solver */}
                      {complaint.assignedTo && (
                        <div className="!mt-4">
                          <p className="!text-xs !font-semibold !text-[var(--color-text-muted)]">
                            Assigned Staff
                          </p>

                          <p className="!mt-1 !text-sm !font-semibold !text-[var(--color-text-primary)]">
                            {complaint.assignedTo.fullName || "Issue Solver"}
                          </p>
                        </div>
                      )}

                      {/* Expected Resolution */}
                      {complaint.expectedResolutionDate && (
                        <div className="!mt-4">
                          <p className="!text-xs !font-semibold !text-[var(--color-text-muted)]">
                            Expected Resolution
                          </p>

                          <p className="!mt-1 !text-sm !font-semibold !text-[var(--color-text-primary)]">
                            {new Date(
                              complaint.expectedResolutionDate,
                            ).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      )}

                      {/* Admin Message */}
                      {complaint.adminResponse && (
                        <div className="!mt-4">
                          <p className="!text-xs !font-semibold !text-[var(--color-text-muted)]">
                            Message from Management
                          </p>

                          <p className="!mt-1 !text-sm !leading-relaxed !text-[var(--color-text-primary)]">
                            {complaint.adminResponse}
                          </p>
                        </div>
                      )}

                      {/* Resolved Date */}
                      {complaint.resolvedAt && (
                        <div className="!mt-4 !flex !items-center !gap-1.5 !text-xs !text-[var(--color-text-muted)]">
                          <CheckCircleIcon />

                          <span>
                            Resolved on{" "}
                            {new Date(complaint.resolvedAt).toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
};

export default Complaints;
