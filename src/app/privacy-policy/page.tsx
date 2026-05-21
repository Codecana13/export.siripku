import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy | Siripku Export',
  description: 'Privacy Policy for Siripku Export - Learn how we collect, use, and protect your data.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#0b1120] text-white">
      <Navbar />
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto glass-card rounded-3xl p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <div className="prose prose-invert max-w-none text-slate-300">
            <p className="mb-6">Last updated: May 2026</p>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Information We Collect</h2>
            <p className="mb-4">At Siripku Export, we collect information that you provide directly to us when you fill out an inquiry form, request a quote, or communicate with us via email or WhatsApp. This includes:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Name and company name</li>
              <li>Contact information (email address, phone number)</li>
              <li>Shipping address and destination country</li>
              <li>Details of your inquiries regarding ornamental fish</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Process and fulfill your export orders</li>
              <li>Communicate with you regarding your inquiries, quotes, and shipments</li>
              <li>Provide customer support and logistics updates</li>
              <li>Comply with international export regulations and documentation requirements (such as BKIPM and CITES)</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. Data Security</h2>
            <p className="mb-6">We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, please note that no method of transmission over the Internet or electronic storage is 100% secure.</p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Sharing of Information</h2>
            <p className="mb-6">We do not sell your personal information. We only share your information with trusted third parties as necessary to fulfill your orders, such as airline cargo partners, customs brokers, and government quarantine agencies (BKIPM) as required by international law.</p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">5. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <p className="mt-2 text-cyan-400">export.siripku@gmail.com</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
