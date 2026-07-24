import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqs = [
  {
    question: "How can I book a room?",
    answer:
      "Simply browse available rooms, select your preferred room, and click on Book Now.",
  },
  {
    question: "Are meals included in the hostel?",
    answer:
      "Yes, nutritious breakfast, lunch, and dinner are available for residents.",
  },
  {
    question: "Is WiFi available?",
    answer:
      "Yes, high-speed unlimited WiFi is available throughout the hostel.",
  },
  {
    question: "Is parking available?",
    answer: "Yes, separate parking is available for bikes and scooties.",
  },
  {
    question: "Can I cancel my booking?",
    answer:
      "Yes, bookings can be cancelled according to the hostel cancellation policy.",
  },
];

const FAQ = () => {
  return (
    <section className="bg-gray-50 !py-20">
      <div className="!max-w-5xl !mx-auto !px-6">
        <div className="text-center !mb-12">
          <h2 className="text-4xl font-bold text-[#2C2C2C]">
            Frequently Asked Questions
          </h2>

          <p className="text-gray-500 !mt-4">
            Find answers to the most common questions.
          </p>
        </div>

        {faqs.map((faq, index) => (
          <Accordion
            key={index}
            sx={{
              mb: 2,
              borderRadius: "12px",
              boxShadow: 2,
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <span className="font-semibold">{faq.question}</span>
            </AccordionSummary>

            <AccordionDetails>{faq.answer}</AccordionDetails>
          </Accordion>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
