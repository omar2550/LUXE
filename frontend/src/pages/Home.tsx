import Featured from "@/components/home/Featured";
import Hero from "@/components/home/Hero";
import Testimonials from "@/components/home/Testimonials";

const Home = () => {
  return (
    <div>
      {/* Hero Content */}
      <Hero />

      {/* Featured Content */}
      <Featured />

      {/* Testimonials Content */}
      <Testimonials />
    </div>
  );
};

export default Home;
