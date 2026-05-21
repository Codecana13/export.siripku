import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service | Siripku Export',
  description: 'Terms of Service for Siripku Export - Trading terms, DOA policies, and agreements.',
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-[#0b1120] text-white">
      <Navbar />
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto glass-card rounded-3xl p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <div className="prose prose-invert max-w-none text-slate-300">
            <p className="mb-6">Last updated: May 2026</p>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Agreement to Terms</h2>
            <p className="mb-6">By accessing our website and engaging in trade with Siripku Export, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service or purchase our products.</p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. Orders and Minimum Quantities</h2>
            <p className="mb-6">All orders are subject to availability and confirmation of the order price. Minimum Order Quantities (MOQ) apply based on the species and are generally set to ensure the viability of air freight logistics. A proforma invoice will be issued upon order confirmation.</p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. Payments</h2>
            <p className="mb-6">Payment terms are typically 100% T/T (Telegraphic Transfer) in advance prior to the commencement of the quarantine period, unless otherwise agreed upon in writing. We are not responsible for any bank fees incurred during international transfers.</p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Live Arrival Guarantee (DOA Policy)</h2>
            <p className="mb-4">We take pride in our 98%+ survival rate. Our Dead on Arrival (DOA) policy is as follows:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Claims must be made within 12 hours of flight arrival.</li>
              <li>Clear photographic or video evidence of dead fish in the original unopened bags must be provided.</li>
              <li>Compensations will be made as a credit note applied to your next order, or replacement fish sent with your next shipment.</li>
              <li>We are not responsible for DOA caused by flight delays, customs clearance delays, or improper acclimation by the buyer.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">5. Customs and Import Duties</h2>
            <p className="mb-6">The buyer is entirely responsible for knowing their country's import regulations, acquiring necessary import permits, and paying any customs duties or taxes. Siripku Export is only responsible for export clearance from Indonesia.</p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">6. Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. We will notify customers of any significant changes via email or our website.</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
