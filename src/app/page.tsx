import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import FishCollection from "@/components/FishCollection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ExportProcess from "@/components/ExportProcess";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import TrustBuilder from "@/components/TrustBuilder";
import InquiryForm from "@/components/InquiryForm";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import LocationMap from "@/components/LocationMap";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b1120] text-white">
      <Navbar />
      <Hero />
      <About />
      <FishCollection />
      <WhyChooseUs />
      <ExportProcess />
      <Gallery />
      <Testimonials />
      <TrustBuilder />
      <FAQ />
      <LocationMap />
      <InquiryForm />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
