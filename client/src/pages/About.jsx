import AboutHero from "../components/about/AboutHero";
import HostelStory from "../components/about/HostelStory";
import MissionVision from "../components/about/MissionVision";
import Statistics from "../components/about/Statistics";
import Facilities from "../components/about/Facilities";
import WhyChooseUs from "../components/about/WhyChooseUs";
import Team from "../components/about/Team";
import CTA from "../components/about/CTA";
// import Gallery from "../components/gallrary/";

const About = () => {
  return (
    <>
      <AboutHero />
      <HostelStory />
      {/* <Gallary /> */}
      <MissionVision />
      <Statistics />
      <Facilities />
      <WhyChooseUs />
      <Team />
      <CTA />
    </>
  );
};

export default About;
