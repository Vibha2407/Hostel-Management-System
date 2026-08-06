import { Home, ShieldCheck, Wifi, UtensilsCrossed } from "lucide-react";

const features = [
  {
    icon: <Home size={24} />,
    title: "Comfortable Rooms",
    description: "Fully furnished AC & Non-AC rooms for every budget.",
  },
  {
    icon: <ShieldCheck size={24} />,
    title: "Safe Environment",
    description: "24×7 CCTV surveillance with secure entry system.",
  },
  {
    icon: <Wifi size={24} />,
    title: "High-Speed WiFi",
    description: "Unlimited internet for study, work and entertainment.",
  },
  {
    icon: <UtensilsCrossed size={24} />,
    title: "Healthy Food",
    description: "Fresh breakfast, lunch and dinner prepared daily.",
  },
];

const HostelStory = () => {
  return (
    <section className="!py-24 bg-white">
      <div className="max-w-7xl !mx-auto !px-6 grid lg:grid-cols-2 !gap-16 items-center">
        {/* Left Image */}

        <div>
          <img
            src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900"
            alt="Hostel Room"
            className="rounded-3xl shadow-xl h-[600px] w-full object-cover"
          />
        </div>

        {/* Right Content */}

        <div>
          <span className="text-[#D4AF37] uppercase tracking-[4px] font-semibold">
            Our Story
          </span>

          <h2 className="text-4xl font-bold !mt-4 text-gray-900">
            A Home Away From Home
          </h2>

          <p className="!mt-6 text-gray-600 leading-8">
            HostelHub was created with one simple vision — to provide students
            and working professionals with a safe, affordable, comfortable and
            modern place to live.
          </p>

          <p className="!mt-5 text-gray-600 leading-8">
            We believe accommodation should feel like home. That's why we focus
            on cleanliness, security, healthy food, premium facilities and a
            peaceful environment where residents can study, work and relax.
          </p>

          {/* Features */}

          <div className="grid sm:grid-cols-2 !gap-6 !mt-10">
            {features.map((item, index) => (
              <div
                key={index}
                className="flex !gap-4 !p-5 rounded-2xl shadow-md hover:shadow-xl transition"
              >
                <div className="text-[#D4AF37]">{item.icon}</div>

                <div>
                  <h3 className="font-semibold">{item.title}</h3>

                  <p className="text-sm text-gray-500 !mt-2">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HostelStory;
