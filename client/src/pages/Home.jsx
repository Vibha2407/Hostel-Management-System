import Hero from "../components/home/Hero";
import QuickSearch from "../components/home/QuickSearch";
import AboutSection from "../components/home/AboutSection";
import Facilities from "../components/home/Facilities";
import PopularRooms from "../components/home/PopularRooms";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Gallary from "./Gallary";
import Testimonials from "../components/home/Testimonials";
import ContactSection from "../components/home/ContactSection";

const Home = () => {
  return (
    <>
      <Hero />
      <QuickSearch />
      <AboutSection />
      <Facilities />
      <PopularRooms />
      <WhyChooseUs />
      <Gallary />
      <Testimonials />
      <ContactSection />
    </>
  );
};

export default Home;
