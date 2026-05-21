import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'CITES Compliance | Siripku Export',
  description: 'Information regarding our strict compliance with CITES regulations for protected ornamental fish species.',
};

export default function CITESCompliancePage() {
  return (
    <main className="min-h-screen bg-[#0b1120] text-white">
      <Navbar />
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto glass-card rounded-3xl p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-8">CITES Compliance</h1>
          <div className="prose prose-invert max-w-none text-slate-300">
            <p className="mb-6 text-lg">Siripku Export is fully committed to the conservation of endangered species and strict adherence to the Convention on International Trade in Endangered Species of Wild Fauna and Flora (CITES).</p>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">What is CITES?</h2>
            <p className="mb-6">CITES is an international agreement between governments aimed at ensuring that international trade in specimens of wild animals and plants does not threaten their survival. Several highly sought-after freshwater ornamental fish species fall under CITES protection.</p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Our Commitment</h2>
            <p className="mb-4">For any species listed under CITES Appendix I, II, or III, Siripku Export guarantees that:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>We only source specimens from officially registered captive-breeding facilities or sustainable, quota-managed collection programs authorized by the Indonesian government.</li>
              <li>We secure all mandatory CITES Export Permits from the Indonesian Management Authority prior to shipment.</li>
              <li>Every specimen is properly tagged, microchipped (e.g., Asian Arowana), or accompanied by exact corresponding documentation.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Common CITES Species We Export</h2>
            <p className="mb-4">Species that typically require CITES permits include, but are not limited to:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Asian Arowana (<em>Scleropages formosus</em>) - Appendix I</li>
              <li>Zebra Pleco (<em>Hypancistrus zebra</em>) - Appendix III</li>
              <li>Certain species of stingrays and other rare exotics</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Important Note for Importers</h2>
            <p className="mb-6">While Siripku Export provides the CITES Export Permit, the importer is often legally required to obtain a corresponding <strong>CITES Import Permit</strong> from their own country's Management Authority before the shipment takes place. We urge all buyers to check their local wildlife regulations thoroughly before placing an order for a CITES-listed species.</p>

            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-6 mt-8">
              <h3 className="text-xl font-bold text-white mb-2">Permit Processing Time</h3>
              <p className="mb-0">Please be aware that obtaining a CITES Export Permit involves government processing and can add 1 to 4 weeks to the standard export timeline. We appreciate your patience as we ensure all legal requirements are perfectly met.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
