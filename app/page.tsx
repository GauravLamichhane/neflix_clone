import NewNavbar from "@/components/NewNavbar";
// import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
// import TrendingNow from "@/components/TrendingNow";
import TrendingNew from "@/components/TrendingNew";
import ReasonsSection from "@/components/ReasonsSection";
import FaqSection from "@/components/FaqSection";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="text-white">
      <NewNavbar />
      {/* <Navbar /> */}
      <Hero />
      <TrendingNew />
      <ReasonsSection />
      <FaqSection />
      <CtaBanner />
      <Footer />
    </main>
  );
}
