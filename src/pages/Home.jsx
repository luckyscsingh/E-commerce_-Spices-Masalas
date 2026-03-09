import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import BestSellers from "../components/BestSellers";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
function Home() {
  return (
    <div className="bg-gray-50">
      <Navbar />
      <Hero />
      <Categories />
      <BestSellers />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default Home;