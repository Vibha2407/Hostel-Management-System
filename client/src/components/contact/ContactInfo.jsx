import { MapPin, Phone, Mail, Clock } from "lucide-react";

const ContactInfo = () => {
  return (
    <div className="bg-white shadow-lg rounded-2xl !p-8">
      <h2 className="text-3xl font-bold !mb-8">Contact Information</h2>

      <div className="space-y-8">
        <div className="flex !gap-4">
          <MapPin className="text-[#D4AF37]" />
          <div>
            <h3 className="font-semibold">Address</h3>
            <p className="text-gray-600">
              123 Hostel Street, Green City, India
            </p>
          </div>
        </div>

        <div className="flex !gap-4">
          <Phone className="text-[#D4AF37]" />
          <div>
            <h3 className="font-semibold">Phone</h3>
            <p className="text-gray-600">+91 98765 43210</p>
          </div>
        </div>

        <div className="flex !gap-4">
          <Mail className="text-[#D4AF37]" />
          <div>
            <h3 className="font-semibold">Email</h3>
            <p className="text-gray-600">info@hostelhub.com</p>
          </div>
        </div>

        <div className="flex !gap-4">
          <Clock className="text-[#D4AF37]" />
          <div>
            <h3 className="font-semibold">Working Hours</h3>

            <p className="text-gray-600">Monday - Sunday</p>

            <p className="text-gray-600">8:00 AM - 10:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
