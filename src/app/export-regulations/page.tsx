import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Export Regulations | Siripku Export',
  description: 'Understand the export regulations, documentation, and CITES compliance for importing ornamental fish from Indonesia.',
};

export default function ExportRegulationsPage() {
  return (
    <main className="min-h-screen bg-[#0b1120] text-white">
      <Navbar />
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto glass-card rounded-3xl p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-8">Export Regulations & Compliance</h1>
          <div className="prose prose-invert max-w-none text-slate-300">
            <p className="mb-6 text-lg">Siripku Export operates in strict compliance with Indonesian law and international trade regulations to ensure the legal, safe, and ethical trade of ornamental fish.</p>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. BKIPM Certification</h2>
            <p className="mb-4">All live fish exports from Indonesia must be inspected and certified by BKIPM (Fish Quarantine and Inspection Agency). Siripku Export ensures that every shipment is accompanied by:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>A valid Health Certificate issued by BKIPM</li>
              <li>Proof of passing the mandatory 14-day quarantine period</li>
              <li>Verification that the fish are free from specific pathogens</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. Required Export Documentation</h2>
            <p className="mb-4">With every international shipment, we provide comprehensive documentation to facilitate smooth customs clearance in your country:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Air Waybill (AWB)</li>
              <li>Commercial Invoice</li>
              <li>Detailed Packing List</li>
              <li>Certificate of Origin (COO) upon request</li>
              <li>Health Certificate</li>
            </ul>

            <h2 id="cites" className="text-2xl font-semibold text-white mt-8 mb-4">3. CITES Compliance</h2>
            <p className="mb-6">For species protected under the Convention on International Trade in Endangered Species of Wild Fauna and Flora (CITES), such as certain Asian Arowana or rare Plecostomus, we strictly adhere to CITES regulations. We only export captive-bred or legally permitted wild-caught CITES specimens, and we will arrange the necessary CITES Export Permits from the Indonesian Management Authority.</p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Buyer Responsibilities</h2>
            <p className="mb-6">While we handle all export regulations from Indonesia, it is the buyer's sole responsibility to ensure compliance with their local import regulations. Buyers must secure any necessary import permits from their local agricultural or wildlife departments before the shipment date.</p>

            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-6 mt-8">
              <h3 className="text-xl font-bold text-white mb-2">Need assistance with documentation?</h3>
              <p className="mb-0">Our export team is highly experienced with international documentation. If your country has specific import requirements, please notify us during the inquiry process.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
