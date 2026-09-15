import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wifi,
  Car,
  Shirt,
  UtensilsCrossed,
  GlassWater,
  Bike,
  BatteryCharging,
  Droplets,
  Camera,
  Search,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Save,
  Settings2,
  Sparkles,
  ShieldCheck,
  X,
  Loader2,
  AlertCircle,
  ChevronRight,
  SlidersHorizontal,
  CircleCheck,
  CircleX,
  Zap,
} from "lucide-react";

import { getFacilities, updateFacility } from "../../services/facilityServices";

const FACILITY_META = [
  {
    key: "wifi",
    name: "Wi-Fi",
    description:
      "High-speed internet connectivity available throughout the hostel.",
    icon: Wifi,
    category: "Connectivity",
  },
  {
    key: "parking",
    name: "Car Parking",
    description:
      "Dedicated parking space available for residents and visitors.",
    icon: Car,
    category: "Parking",
  },
  {
    key: "laundry",
    name: "Laundry",
    description: "Laundry facility available for hostel residents.",
    icon: Shirt,
    category: "Services",
  },
  {
    key: "food",
    name: "Food",
    description: "Food and meal services available for hostel residents.",
    icon: UtensilsCrossed,
    category: "Dining",
  },
  {
    key: "juiceCorner",
    name: "Juice Corner",
    description: "Fresh juice and beverage corner available on the premises.",
    icon: GlassWater,
    category: "Dining",
  },
  {
    key: "bikeParking",
    name: "Bike Parking",
    description: "Dedicated parking space for motorcycles and bikes.",
    icon: Bike,
    category: "Parking",
  },
  {
    key: "scootyParking",
    name: "Scooty Parking",
    description: "Dedicated parking space for scooters and two-wheelers.",
    icon: Bike,
    category: "Parking",
  },
  {
    key: "powerBackup",
    name: "Power Backup",
    description: "Backup power system to maintain essential hostel services.",
    icon: BatteryCharging,
    category: "Utilities",
  },
  {
    key: "hotWater",
    name: "Hot Water",
    description: "Hot water facility available for residents.",
    icon: Droplets,
    category: "Utilities",
  },
  {
    key: "cctv",
    name: "CCTV Surveillance",
    description: "Security cameras monitor important areas of the hostel.",
    icon: Camera,
    category: "Security",
  },
];

const CATEGORIES = [
  "All",
  "Connectivity",
  "Parking",
  "Services",
  "Dining",
  "Utilities",
  "Security",
];

const ManageFacilities = () => {
  const [facility, setFacility] = useState(null);
  const [originalFacility, setOriginalFacility] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [showSaveModal, setShowSaveModal] = useState(false);

  const fetchFacility = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getFacilities();

      const currentFacility = data?.facilities?.[0];

      if (!currentFacility) {
        setError("Facility configuration was not found.");
        setFacility(null);
        setOriginalFacility(null);
        setLoading(false);
        return;
      }

      setFacility(currentFacility);
      setOriginalFacility(currentFacility);
      setLoading(false);
    } catch (err) {
      setLoading(false);

      setError(
        err.response?.data?.message || "Failed to load facility configuration.",
      );
    }
  };

  useEffect(() => {
    fetchFacility();
  }, []);

  const handleToggle = (key) => {
    setFacility((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = async () => {
    if (!facility?._id) return;

    try {
      setSaving(true);
      setError("");

      const data = await updateFacility(facility._id, {
        wifi: facility.wifi,
        parking: facility.parking,
        laundry: facility.laundry,
        food: facility.food,
        juiceCorner: facility.juiceCorner,
        bikeParking: facility.bikeParking,
        scootyParking: facility.scootyParking,
        powerBackup: facility.powerBackup,
        hotWater: facility.hotWater,
        cctv: facility.cctv,
      });

      if (data?.facility) {
        setFacility(data.facility);
        setOriginalFacility(data.facility);
      }

      setShowSaveModal(false);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to update facility configuration.",
      );
    } finally {
      setSaving(false);
    }
  };

  const hasChanges = useMemo(() => {
    if (!facility || !originalFacility) return false;

    return FACILITY_META.some(
      (item) => facility[item.key] !== originalFacility[item.key],
    );
  }, [facility, originalFacility]);

  const enabledCount = useMemo(() => {
    if (!facility) return 0;

    return FACILITY_META.filter((item) => facility[item.key]).length;
  }, [facility]);

  const disabledCount = FACILITY_META.length - enabledCount;

  const filteredFacilities = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return FACILITY_META.filter((item) => {
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  if (loading) {
    return (
      <div className="!flex !min-h-screen !items-center !justify-center !bg-[#FAF8F4] dark:!bg-[#080808]">
        <div className="!flex !flex-col !items-center !gap-4">
          <div className="!flex !h-16 !w-16 !items-center !justify-center !rounded-2xl !border !border-[#D4AF37]/30 !bg-[#D4AF37]/10">
            <Loader2 size={30} className="!animate-spin !text-[#D4AF37]" />
          </div>

          <div className="!text-center">
            <p className="!text-sm !font-black !text-[#2B1720] dark:!text-white">
              Loading Facilities
            </p>

            <p className="!mt-1 !text-xs !text-[#74656A] dark:!text-[#777777]">
              Preparing your hostel configuration...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!facility) {
    return (
      <div className="!min-h-screen !bg-[#FAF8F4] dark:!bg-[#080808] !p-5 sm:!p-8">
        <div className="!mx-auto !flex !min-h-[70vh] !max-w-[650px] !items-center !justify-center">
          <div className="!w-full !rounded-3xl !border !border-rose-500/20 !bg-white dark:!bg-[#111111] !p-8 !text-center !shadow-xl">
            <div className="!mx-auto !mb-5 !flex !h-16 !w-16 !items-center !justify-center !rounded-2xl !bg-rose-500/10 !text-rose-500">
              <AlertCircle size={30} />
            </div>

            <h2 className="!text-xl !font-black !text-[#2B1720] dark:!text-white">
              Facility Configuration Unavailable
            </h2>

            <p className="!mx-auto !mt-2 !max-w-md !text-sm !leading-relaxed !text-[#74656A] dark:!text-[#777777]">
              {error || "No facility configuration was found."}
            </p>

            <button
              onClick={fetchFacility}
              className="!mt-6 !inline-flex !items-center !gap-2 !rounded-xl !bg-[#D4AF37] !px-5 !py-3 !text-sm !font-black !text-black !transition-all hover:!scale-[1.02]"
            >
              <RefreshCw size={16} />
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="!relative !min-h-screen !overflow-hidden !bg-[#FAF8F4] dark:!bg-[#080808] !text-[#2B1720] dark:!text-white !transition-colors !duration-300">
      {/* Ambient Background */}
      <div className="!pointer-events-none !absolute !-left-40 !-top-40 !h-[500px] !w-[500px] !rounded-full !bg-[#D4AF37]/10 !blur-[130px]" />

      <div className="!pointer-events-none !absolute !-bottom-40 !-right-40 !h-[500px] !w-[500px] !rounded-full !bg-[#4A1D2F]/10 !blur-[130px]" />

      <div className="!relative !z-10 !mx-auto !max-w-[1550px] !p-4 sm:!p-6 lg:!p-8">
        {/* =========================================================
            HEADER
        ========================================================== */}
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="!mb-7"
        >
          <div className="!flex !flex-col !gap-6 xl:!flex-row xl:!items-end xl:!justify-between">
            <div>
              <div className="!mb-4 !inline-flex !items-center !gap-2 !rounded-full !border !border-[#D4AF37]/30 !bg-[#D4AF37]/10 !px-3.5 !py-2">
                <Sparkles size={14} className="!text-[#D4AF37]" />

                <span className="!text-[10px] !font-black !uppercase !tracking-[0.22em] !text-[#D4AF37]">
                  Hostel Configuration
                </span>
              </div>

              <h1 className="!text-3xl !font-black !tracking-[-0.03em] sm:!text-4xl lg:!text-5xl">
                Manage Facilities
              </h1>

              <p className="!mt-3 !max-w-2xl !text-sm !leading-6 !text-[#74656A] dark:!text-[#777777] sm:!text-[15px]">
                Configure the amenities and essential services available to your
                hostel residents.
              </p>
            </div>

            <div className="!flex !w-full !flex-col !gap-3 sm:!w-auto sm:!flex-row">
              <button
                onClick={fetchFacility}
                disabled={saving}
                className="!inline-flex !items-center !justify-center !gap-2 !rounded-xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-white dark:!bg-[#111111] !px-4 !py-3 !text-sm !font-bold !text-[#2B1720] dark:!text-white !shadow-sm !transition-all hover:!border-[#D4AF37] hover:!shadow-md disabled:!cursor-not-allowed disabled:!opacity-50"
              >
                <RefreshCw
                  size={16}
                  className={loading ? "!animate-spin" : ""}
                />
                Refresh
              </button>

              <button
                onClick={() => setShowSaveModal(true)}
                disabled={!hasChanges || saving}
                className={`!inline-flex !items-center !justify-center !gap-2 !rounded-xl !px-5 !py-3 !text-sm !font-black !transition-all ${
                  hasChanges
                    ? "!bg-[#D4AF37] !text-black !shadow-lg !shadow-[#D4AF37]/20 hover:!scale-[1.02] hover:!bg-[#e2c45b]"
                    : "!bg-[#E8DED2] !text-[#8B7D82] dark:!bg-[#222222] dark:!text-[#666666]"
                } disabled:!cursor-not-allowed`}
              >
                <Save size={16} />

                {hasChanges ? "Save Changes" : "No Changes"}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Unsaved Changes Notice */}
        <AnimatePresence>
          {hasChanges && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              className="!mb-6 !overflow-hidden"
            >
              <div className="!flex !flex-col !gap-3 !rounded-2xl !border !border-[#D4AF37]/30 !bg-[#D4AF37]/10 !p-4 sm:!flex-row sm:!items-center sm:!justify-between">
                <div className="!flex !items-center !gap-3">
                  <div className="!flex !h-9 !w-9 !shrink-0 !items-center !justify-center !rounded-xl !bg-[#D4AF37] !text-black">
                    <Zap size={17} />
                  </div>

                  <div>
                    <p className="!text-sm !font-black">Unsaved changes</p>

                    <p className="!mt-0.5 !text-xs !text-[#74656A] dark:!text-[#888888]">
                      Review your facility availability before saving.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowSaveModal(true)}
                  className="!inline-flex !items-center !justify-center !gap-2 !rounded-lg !bg-[#D4AF37] !px-4 !py-2 !text-xs !font-black !text-black"
                >
                  Review & Save
                  <ChevronRight size={14} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="!mb-6 !flex !items-start !gap-3 !rounded-2xl !border !border-rose-500/20 !bg-rose-500/10 !p-4 !text-sm !text-rose-500"
            >
              <AlertCircle size={18} className="!mt-0.5 !shrink-0" />

              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =========================================================
            METRICS
        ========================================================== */}
        <div className="!mb-7 !grid !grid-cols-1 !gap-4 sm:!grid-cols-3">
          <MetricCard
            icon={Settings2}
            title="Total Amenities"
            value={FACILITY_META.length}
            description="Configured services"
            iconClass="!text-[#D4AF37]"
          />

          <MetricCard
            icon={CircleCheck}
            title="Currently Active"
            value={enabledCount}
            description="Available to residents"
            iconClass="!text-emerald-500"
          />

          <MetricCard
            icon={CircleX}
            title="Currently Disabled"
            value={disabledCount}
            description="Not currently available"
            iconClass="!text-rose-500"
          />
        </div>

        {/* =========================================================
            MAIN CONSOLE
        ========================================================== */}
        <div className="!overflow-hidden !rounded-3xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-white dark:!bg-[#111111] !shadow-[0_15px_60px_rgba(43,23,32,0.05)] dark:!shadow-none">
          {/* Toolbar */}
          <div className="!border-b !border-[#E8DED2] dark:!border-[#292929] !bg-[#FAF8F4]/70 dark:!bg-[#171717]/40 !p-4 sm:!p-5 lg:!p-6">
            <div className="!flex !flex-col !gap-5 xl:!flex-row xl:!items-center xl:!justify-between">
              {/* Search */}
              <div className="!relative !w-full xl:!max-w-md">
                <Search
                  size={17}
                  className="!absolute !left-4 !top-1/2 !-translate-y-1/2 !text-[#74656A] dark:!text-[#777777]"
                />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search facilities..."
                  className="!w-full !rounded-xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-white dark:!bg-[#080808] !py-3 !pl-11 !pr-10 !text-sm !font-medium !text-[#2B1720] dark:!text-white !outline-none !transition-all placeholder:!text-[#9B8D92] focus:!border-[#D4AF37] focus:!ring-4 focus:!ring-[#D4AF37]/10"
                />

                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="!absolute !right-3 !top-1/2 !-translate-y-1/2 !rounded-lg !p-1 !text-[#74656A] hover:!bg-[#FAF8F4] dark:hover:!bg-[#171717]"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              {/* Filter */}
              <div className="!flex !min-w-0 !items-center !gap-3">
                <div className="!hidden !h-9 !w-9 !shrink-0 !items-center !justify-center !rounded-lg !bg-[#D4AF37]/10 !text-[#D4AF37] sm:!flex">
                  <SlidersHorizontal size={16} />
                </div>

                <div className="!flex !w-full !gap-2 !overflow-x-auto !pb-1">
                  {CATEGORIES.map((category) => {
                    const active = selectedCategory === category;

                    return (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`!whitespace-nowrap !rounded-lg !px-3.5 !py-2.5 !text-xs !font-black !transition-all ${
                          active
                            ? "!bg-[#D4AF37] !text-black !shadow-sm"
                            : "!bg-[#FAF8F4] dark:!bg-[#171717] !text-[#74656A] dark:!text-[#888888] hover:!text-[#D4AF37]"
                        }`}
                      >
                        {category}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Result summary */}
            <div className="!mt-4 !flex !items-center !justify-between !text-xs">
              <p className="!font-semibold !text-[#74656A] dark:!text-[#777777]">
                Showing{" "}
                <span className="!font-black !text-[#2B1720] dark:!text-white">
                  {filteredFacilities.length}
                </span>{" "}
                of{" "}
                <span className="!font-black !text-[#2B1720] dark:!text-white">
                  {FACILITY_META.length}
                </span>{" "}
                amenities
              </p>

              {selectedCategory !== "All" && (
                <button
                  onClick={() => setSelectedCategory("All")}
                  className="!font-black !text-[#D4AF37] hover:!underline"
                >
                  Clear filter
                </button>
              )}
            </div>
          </div>

          {/* =====================================================
              FACILITY CARDS
          ====================================================== */}
          <div className="!grid !grid-cols-1 !gap-4 !p-4 sm:!grid-cols-2 sm:!p-5 lg:!grid-cols-3 lg:!gap-5 lg:!p-6">
            <AnimatePresence mode="popLayout">
              {filteredFacilities.map((item, index) => {
                const Icon = item.icon;
                const enabled = Boolean(facility[item.key]);

                return (
                  <motion.div
                    key={item.key}
                    layout
                    initial={{
                      opacity: 0,
                      y: 15,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.97,
                    }}
                    transition={{
                      duration: 0.25,
                      delay: index * 0.035,
                    }}
                    className={`!group !relative !overflow-hidden !rounded-2xl !border !p-5 !transition-all hover:!-translate-y-0.5 ${
                      enabled
                        ? "!border-[#D4AF37]/30 !bg-gradient-to-br !from-[#D4AF37]/[0.07] !to-transparent dark:!from-[#D4AF37]/[0.05]"
                        : "!border-[#E8DED2] dark:!border-[#292929] !bg-white dark:!bg-[#111111]"
                    }`}
                  >
                    {/* Active Glow */}
                    {enabled && (
                      <div className="!pointer-events-none !absolute !-right-10 !-top-10 !h-24 !w-24 !rounded-full !bg-[#D4AF37]/10 !blur-2xl" />
                    )}

                    <div className="!relative !z-10">
                      {/* Card Top */}
                      <div className="!flex !items-start !justify-between !gap-4">
                        <div className="!flex !min-w-0 !items-center !gap-3.5">
                          <div
                            className={`!flex !h-12 !w-12 !shrink-0 !items-center !justify-center !rounded-xl !border !transition-all ${
                              enabled
                                ? "!border-[#D4AF37]/30 !bg-[#D4AF37]/10 !text-[#D4AF37]"
                                : "!border-[#E8DED2] dark:!border-[#292929] !bg-[#FAF8F4] dark:!bg-[#171717] !text-[#74656A] dark:!text-[#777777]"
                            }`}
                          >
                            <Icon size={21} />
                          </div>

                          <div className="!min-w-0">
                            <h3 className="!truncate !text-sm !font-black">
                              {item.name}
                            </h3>

                            <div className="!mt-1.5 !flex !items-center !gap-1.5">
                              <span className="!h-1.5 !w-1.5 !rounded-full !bg-[#D4AF37]" />

                              <span className="!text-[9px] !font-black !uppercase !tracking-[0.12em] !text-[#74656A] dark:!text-[#777777]">
                                {item.category}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Toggle */}
                        <button
                          type="button"
                          onClick={() => handleToggle(item.key)}
                          aria-label={`Toggle ${item.name}`}
                          aria-pressed={enabled}
                          className={`!relative !h-7 !w-12 !shrink-0 !rounded-full !transition-all ${
                            enabled
                              ? "!bg-[#D4AF37] !shadow-md !shadow-[#D4AF37]/20"
                              : "!bg-[#D9D3CE] dark:!bg-[#333333]"
                          }`}
                        >
                          <motion.span
                            animate={{
                              x: enabled ? 20 : 0,
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 30,
                            }}
                            className="!absolute !left-1 !top-1 !h-5 !w-5 !rounded-full !bg-white !shadow-sm"
                          />
                        </button>
                      </div>

                      {/* Description */}
                      <p className="!mt-5 !min-h-[48px] !text-xs !leading-5 !text-[#74656A] dark:!text-[#777777]">
                        {item.description}
                      </p>

                      {/* Bottom */}
                      <div className="!mt-5 !flex !items-center !justify-between !border-t !border-[#E8DED2] dark:!border-[#292929] !pt-4">
                        <span className="!text-[9px] !font-black !uppercase !tracking-[0.15em] !text-[#9B8D92] dark:!text-[#666666]">
                          Availability
                        </span>

                        <span
                          className={`!inline-flex !items-center !gap-1.5 !rounded-full !px-2.5 !py-1 !text-[10px] !font-black ${
                            enabled
                              ? "!bg-emerald-500/10 !text-emerald-500"
                              : "!bg-rose-500/10 !text-rose-500"
                          }`}
                        >
                          {enabled ? (
                            <CheckCircle2 size={12} />
                          ) : (
                            <XCircle size={12} />
                          )}

                          {enabled ? "Available" : "Unavailable"}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Empty */}
          {filteredFacilities.length === 0 && (
            <div className="!px-6 !py-20 !text-center">
              <div className="!mx-auto !mb-4 !flex !h-14 !w-14 !items-center !justify-center !rounded-2xl !bg-[#D4AF37]/10 !text-[#D4AF37]">
                <Search size={25} />
              </div>

              <h3 className="!text-base !font-black">No Facilities Found</h3>

              <p className="!mx-auto !mt-2 !max-w-sm !text-xs !leading-5 !text-[#74656A] dark:!text-[#777777]">
                We couldn't find any facility matching your current search or
                category filter.
              </p>

              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="!mt-5 !rounded-xl !bg-[#D4AF37] !px-4 !py-2.5 !text-xs !font-black !text-black"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* =========================================================
            INFO FOOTER
        ========================================================== */}
        <div className="!mt-5 !rounded-2xl !border !border-[#D4AF37]/20 !bg-[#D4AF37]/5 !p-4 sm:!p-5">
          <div className="!flex !items-start !gap-3">
            <div className="!flex !h-9 !w-9 !shrink-0 !items-center !justify-center !rounded-xl !bg-[#D4AF37]/10 !text-[#D4AF37]">
              <ShieldCheck size={18} />
            </div>

            <div>
              <p className="!text-xs !font-black">
                Customer-facing availability
              </p>

              <p className="!mt-1 !text-xs !leading-5 !text-[#74656A] dark:!text-[#777777]">
                Facility availability is shared with the customer-facing
                experience. Changes become visible after you save the updated
                configuration.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          SAVE MODAL
      ========================================================== */}
      <AnimatePresence>
        {showSaveModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !saving && setShowSaveModal(false)}
            className="!fixed !inset-0 !z-[100] !flex !items-center !justify-center !bg-black/70 !p-4 !backdrop-blur-md"
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.94,
                y: 15,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.94,
                y: 15,
              }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 25,
              }}
              onClick={(e) => e.stopPropagation()}
              className="!w-full !max-w-md !overflow-hidden !rounded-3xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-white dark:!bg-[#111111] !shadow-2xl"
            >
              {/* Modal Header */}
              <div className="!border-b !border-[#E8DED2] dark:!border-[#292929] !p-6">
                <div className="!flex !items-start !justify-between !gap-4">
                  <div className="!flex !items-center !gap-4">
                    <div className="!flex !h-12 !w-12 !items-center !justify-center !rounded-2xl !bg-[#D4AF37]/10 !text-[#D4AF37]">
                      <Save size={21} />
                    </div>

                    <div>
                      <h2 className="!text-lg !font-black">Save Changes?</h2>

                      <p className="!mt-1 !text-xs !text-[#74656A] dark:!text-[#777777]">
                        Update hostel facility availability
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => !saving && setShowSaveModal(false)}
                    disabled={saving}
                    className="!rounded-xl !p-2 !text-[#74656A] !transition-colors hover:!bg-[#FAF8F4] dark:hover:!bg-[#171717] disabled:!opacity-40"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Summary */}
              <div className="!p-6">
                <div className="!rounded-2xl !border !border-[#D4AF37]/20 !bg-[#D4AF37]/5 !p-4">
                  <div className="!flex !items-center !justify-between">
                    <span className="!text-xs !font-bold !text-[#74656A] dark:!text-[#888888]">
                      Active Amenities
                    </span>

                    <span className="!text-lg !font-black !text-emerald-500">
                      {enabledCount}
                    </span>
                  </div>

                  <div className="!mt-3 !h-2 !overflow-hidden !rounded-full !bg-[#E8DED2] dark:!bg-[#292929]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${
                          (enabledCount / FACILITY_META.length) * 100
                        }%`,
                      }}
                      className="!h-full !rounded-full !bg-[#D4AF37]"
                    />
                  </div>

                  <p className="!mt-3 !text-xs !leading-5 !text-[#74656A] dark:!text-[#777777]">
                    These changes will update the facility availability shown to
                    customers.
                  </p>
                </div>

                <div className="!mt-6 !flex !flex-col-reverse !gap-3 sm:!flex-row sm:!justify-end">
                  <button
                    onClick={() => setShowSaveModal(false)}
                    disabled={saving}
                    className="!rounded-xl !border !border-[#E8DED2] dark:!border-[#292929] !px-5 !py-3 !text-xs !font-black !transition-all hover:!bg-[#FAF8F4] dark:hover:!bg-[#171717] disabled:!opacity-40"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="!inline-flex !items-center !justify-center !gap-2 !rounded-xl !bg-[#D4AF37] !px-5 !py-3 !text-xs !font-black !text-black !shadow-lg !shadow-[#D4AF37]/20 !transition-all hover:!bg-[#e2c45b] disabled:!cursor-not-allowed disabled:!opacity-50"
                  >
                    {saving ? (
                      <>
                        <Loader2 size={15} className="!animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={15} />
                        Confirm Save
                      </>
                    )}
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

/* ===============================================================
   METRIC CARD
================================================================ */

const MetricCard = ({ icon: Icon, title, value, description, iconClass }) => {
  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      transition={{
        duration: 0.2,
      }}
      className="!group !relative !overflow-hidden !rounded-2xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-white dark:!bg-[#111111] !p-5 !shadow-sm !transition-all hover:!shadow-md"
    >
      <div className="!flex !items-start !justify-between !gap-4">
        <div>
          <p className="!text-[10px] !font-black !uppercase !tracking-[0.15em] !text-[#74656A] dark:!text-[#777777]">
            {title}
          </p>

          <h3 className="!mt-2 !text-3xl !font-black !tracking-tight">
            {value}
          </h3>

          <p className="!mt-1 !text-xs !text-[#74656A] dark:!text-[#666666]">
            {description}
          </p>
        </div>

        <div
          className={`!flex !h-12 !w-12 !shrink-0 !items-center !justify-center !rounded-xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-[#FAF8F4] dark:!bg-[#171717] ${iconClass}`}
        >
          <Icon size={20} />
        </div>
      </div>

      <div className="!mt-5 !h-1 !w-12 !rounded-full !bg-[#D4AF37]/30 !transition-all group-hover:!w-20" />
    </motion.div>
  );
};

export default ManageFacilities;
