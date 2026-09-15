import { useEffect, useState } from "react";
import api from "../../services/axios";

// SVG Icons as inline helpers for clean zero-dependency rendering
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

const UserIcon = () => (
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
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
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

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [resolvingId, setResolvingId] = useState(null);
  const [responseText, setResponseText] = useState({});

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/complaints/all");

      if (response.data.success) {
        setComplaints(response.data.complaints);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Unable to load complaints.");
    } finally {
      setLoading(false);
    }
  };

  const handleResolveComplaint = async (complaintId) => {
    const response = responseText[complaintId]?.trim();

    if (!response) {
      setError("Please enter a response before resolving the complaint.");
      return;
    }

    try {
      setResolvingId(complaintId);
      setError("");

      const result = await api.patch(`/complaints/${complaintId}/resolve`, {
        adminResponse: response,
      });

      if (result.data.success) {
        await fetchComplaints();

        setResponseText((prev) => ({
          ...prev,
          [complaintId]: "",
        }));
      }
    } catch (error) {
      setError(error.response?.data?.message || "Unable to resolve complaint.");
    } finally {
      setResolvingId(null);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Loading Skeleton View
  if (loading) {
    return (
      <main className="!min-h-screen !bg-[var(--color-background)] !p-6 md:!p-10 !transition-colors !duration-300">
        <div className="!mx-auto !max-w-7xl">
          <div className="!h-9 !w-48 !animate-pulse !rounded-lg !bg-gray-300 dark:!bg-neutral-800" />
          <div className="!mt-2 !h-5 !w-72 !animate-pulse !rounded-lg !bg-gray-200 dark:!bg-neutral-800" />

          <div className="!mt-8 !space-y-4">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="!h-48 !w-full !animate-pulse !rounded-2xl !border !border-[var(--color-border)] !bg-[var(--color-surface)] !shadow-sm"
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="!min-h-screen !bg-[var(--color-background)] !p-6 md:!p-10 !transition-colors !duration-300">
      <div className="!mx-auto !max-w-7xl">
        {/* Header Section */}
        <div className="!relative !mb-8 !overflow-hidden !rounded-2xl !border !border-[var(--color-border)] !bg-[var(--color-surface)] !p-6 !shadow-sm !transition-all md:!p-8">
          <div className="!absolute !-right-10 !-top-10 !h-40 !w-40 !rounded-full !bg-gradient-to-br !from-[#D4AF37]/20 !to-[#4A1D2F]/10 !blur-2xl" />

          <div className="!relative !z-10 !flex !flex-col !gap-2 md:!flex-row md:!items-center md:!justify-between">
            <div>
              <div className="!flex !items-center !gap-3">
                <span className="!h-3 !w-3 !rounded-full !bg-[#D4AF37] !shadow-[0_0_10px_#D4AF37]" />
                <h1 className="!text-3xl !font-bold !tracking-tight !text-[var(--color-text-primary)] md:!text-4xl">
                  Complaints Center
                </h1>
              </div>
              <p className="!mt-2 !text-sm !text-[var(--color-text-muted)] md:!text-base">
                Track, process, and resolve guest issues in real time.
              </p>
            </div>

            <div className="!mt-4 !flex !items-center !gap-3 md:!mt-0">
              <div className="!rounded-xl !border !border-[var(--color-border)] !bg-[var(--color-surface-secondary)] !px-4 !py-2.5 !text-center">
                <span className="!block !text-xs !font-medium !text-[var(--color-text-muted)]">
                  Total Issues
                </span>
                <span className="!text-lg !font-bold !text-[var(--color-text-primary)]">
                  {complaints.length}
                </span>
              </div>
              <div className="!rounded-xl !border !border-[var(--color-border)] !bg-[var(--color-surface-secondary)] !px-4 !py-2.5 !text-center">
                <span className="!block !text-xs !font-medium !text-[var(--color-text-muted)]">
                  Pending
                </span>
                <span className="!text-lg !font-bold !text-[#D4AF37]">
                  {complaints.filter((c) => c.status !== "Resolved").length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="!mb-6 !flex !items-center !gap-3 !rounded-xl !border !border-red-500/30 !bg-red-500/10 !p-4 !text-sm !font-medium !text-[var(--color-danger)] !backdrop-blur-sm">
            <ShieldAlertIcon />
            <span>{error}</span>
          </div>
        )}

        {/* Empty State */}
        {complaints.length === 0 ? (
          <div className="!flex !min-h-[350px] !flex-col !items-center !justify-center !rounded-3xl !border !border-[var(--color-border)] !bg-[var(--color-surface)] !p-10 !text-center !shadow-[var(--shadow-card)] !transition-all">
            <div className="!mb-4 !flex !h-16 !w-16 !items-center !justify-center !rounded-full !bg-emerald-500/10 !text-[var(--color-success)]">
              <CheckCircleIcon />
            </div>
            <h2 className=" !text-2xl !font-bold !text-[var(--color-text-primary)]">
              All Caught Up!
            </h2>
            <p className="!mt-2 !max-w-md !text-sm !text-[var(--color-text-muted)]">
              There are currently no customer complaints registered in the
              system.
            </p>
          </div>
        ) : (
          /* Complaints List */
          <div className="!space-y-6">
            {complaints.map((complaint) => {
              const isResolved = complaint.status === "Resolved";

              return (
                <div
                  key={complaint._id}
                  className="!group !relative !overflow-hidden !rounded-2xl !border !border-[var(--color-border)] !bg-[var(--color-surface)] !p-6 !shadow-[var(--shadow-card)] !transition-all !duration-300 hover:!border-[#D4AF37]/40 md:!p-8"
                >
                  {/* Status Indicator Stripe */}
                  <div
                    className={`!absolute !left-0 !top-0 !bottom-0 !w-1.5 ${
                      isResolved
                        ? "!bg-[var(--color-success)]"
                        : "!bg-[#D4AF37]"
                    }`}
                  />

                  {/* Top Bar: Subject & Status Badge */}
                  <div className="!flex !flex-col !gap-4 sm:!flex-row sm:!items-center sm:!justify-between">
                    <div>
                      <div className="!flex !items-center !gap-2.5">
                        <span className="!rounded-md !bg-gradient-to-r !from-[#4A1D2F] !to-[#6B2944] !px-2.5 !py-1 !text-[10px] !font-bold !uppercase !tracking-wider !text-[#D4AF37]">
                          {complaint.category || "General"}
                        </span>
                        <h2 className=" !text-xl !font-bold !text-[var(--color-text-primary)]">
                          {complaint.subject}
                        </h2>
                      </div>
                    </div>

                    <span
                      className={`!inline-flex !items-center !rounded-full !px-3.5 !py-1.5 !text-xs !font-semibold !transition-all ${
                        isResolved
                          ? "!bg-emerald-500/15 !text-[var(--color-success)] !border !border-emerald-500/20"
                          : "!bg-amber-500/15 !text-amber-600 dark:!text-amber-400 !border !border-amber-500/20"
                      }`}
                    >
                      {isResolved ? <CheckCircleIcon /> : <ClockIcon />}
                      {complaint.status}
                    </span>
                  </div>

                  {/* Customer Meta Row */}
                  <div className="!mt-4 !flex !flex-wrap !items-center !gap-6 !border-y !border-[var(--color-border)] !py-3 !text-sm">
                    <div className="!flex !items-center !gap-2">
                      <UserIcon />
                      <span className="!text-[var(--color-text-muted)]">
                        Customer:
                      </span>
                      <strong className="!font-medium !text-[var(--color-text-primary)]">
                        {complaint.customer?.fullName || "Unknown"}
                      </strong>
                    </div>

                    <div className="!flex !items-center !gap-2">
                      <DoorIcon />
                      <span className="!text-[var(--color-text-muted)]">
                        Room:
                      </span>
                      <strong className="!font-medium !text-[var(--color-text-primary)]">
                        {complaint.room?.roomNumber || "N/A"}
                      </strong>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="!mt-5">
                    <p className="!text-xs !font-semibold !uppercase !tracking-wider !text-[var(--color-text-muted)]">
                      Complaint Details
                    </p>
                    <p className="!mt-2 !text-sm !leading-relaxed !text-[var(--color-text-primary)]/90">
                      {complaint.description}
                    </p>
                  </div>

                  {/* Admin Existing Response View */}
                  {complaint.adminResponse && (
                    <div className="!mt-6 !rounded-xl !border !border-[#D4AF37]/20 !bg-[var(--color-surface-secondary)] !p-5 !backdrop-blur-sm">
                      <p className="!text-xs !font-semibold !uppercase !tracking-wider !text-[#D4AF37]">
                        Admin Response
                      </p>
                      <p className="!mt-2 !text-sm !leading-relaxed !text-[var(--color-text-primary)]">
                        {complaint.adminResponse}
                      </p>
                    </div>
                  )}

                  {/* Resolve Form Action (If Pending) */}
                  {!isResolved && (
                    <div className="!mt-6 !border-t !border-[var(--color-border)] !pt-6">
                      <label className="!mb-2 !block !text-xs !font-semibold !uppercase !tracking-wider !text-[var(--color-text-muted)]">
                        Write Resolution Response
                      </label>

                      <textarea
                        value={responseText[complaint._id] || ""}
                        onChange={(e) =>
                          setResponseText((prev) => ({
                            ...prev,
                            [complaint._id]: e.target.value,
                          }))
                        }
                        placeholder="Write an official response for the guest..."
                        rows={3}
                        className="booking-input !resize-none"
                      />

                      <div className="!mt-4 !flex !justify-end">
                        <button
                          type="button"
                          disabled={resolvingId === complaint._id}
                          onClick={() => handleResolveComplaint(complaint._id)}
                          className="!relative !inline-flex !items-center !justify-center !overflow-hidden !rounded-xl !bg-gradient-to-r !from-[#4A1D2F] !to-[#6B2944] !px-6 !py-3 !text-sm !font-semibold !text-[#D4AF37] !shadow-lg !transition-all !duration-300 hover:!shadow-xl hover:!brightness-110 disabled:!cursor-not-allowed disabled:!opacity-50"
                        >
                          {resolvingId === complaint._id ? (
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
                              Resolving...
                            </span>
                          ) : (
                            "Mark as Resolved"
                          )}
                        </button>
                      </div>
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
