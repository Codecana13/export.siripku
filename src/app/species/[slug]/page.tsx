import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { CheckCircle2, MessageCircle, Shield, Truck, Award, ChevronDown } from 'lucide-react';

const fishData: Record<string, { name: string; title: string; description: string; metaDesc: string; features: string[]; faqs: { q: string; a: string }[] }> = {
  'guppy-exporter': { name: 'Guppy', title: 'Premium Guppy Fish Exporter from Indonesia', description: 'Siripku Export is Indonesia\'s leading guppy fish exporter. We supply premium show-quality guppies to importers worldwide.', metaDesc: 'Premium guppy fish exporter from Indonesia. Show-quality guppies including Halfmoon, Dumbo Ear, Mosaic & 20+ strains. Worldwide shipping.', features: ['20+ premium strains', 'Show-grade quality', 'Minimum 500 pairs', '98% survival guarantee'], faqs: [{ q: 'What guppy strains do you export?', a: 'We export Halfmoon, Dumbo Ear, Mosaic, Full Red, Blue Moscow, Platinum, Cobra, and 15+ more premium varieties.' }, { q: 'What is the MOQ for guppies?', a: 'Minimum order is 500 pairs for standard strains, 200 pairs for premium/rare strains.' }, { q: 'How are guppies packed for shipping?', a: 'Double-sealed bags with pure oxygen, insulated boxes. 72+ hour survival rate guaranteed.' }] },
  'discus-exporter': { name: 'Discus', title: 'Premium Discus Fish Exporter from Indonesia', description: 'Export-quality discus fish from certified Indonesian farms. Vibrant colors, healthy stock, worldwide delivery.', metaDesc: 'Premium discus fish exporter from Indonesia. Pigeon Blood, Blue Diamond, Red Melon & more. Certified quality, worldwide shipping.', features: ['Farm-raised quality', 'Vivid coloration', 'Size 3-6 inches', 'Health guaranteed'], faqs: [{ q: 'What discus varieties do you export?', a: 'Pigeon Blood, Blue Diamond, Red Melon, Leopard, Turquoise, and seasonal varieties.' }, { q: 'What size discus do you export?', a: 'We typically export 3-6 inch specimens, with jumbo sizes available on request.' }, { q: 'Do you provide health certificates?', a: 'Yes, all shipments include BKIPM health certificates and quarantine clearance.' }] },
  'betta-exporter': { name: 'Betta', title: 'Premium Betta Fish Exporter from Indonesia', description: 'Indonesia\'s finest betta fish for international markets. Halfmoon, Plakat, Crown Tail and rare varieties.', metaDesc: 'Premium betta fish exporter from Indonesia. Halfmoon, Plakat, Crown Tail & rare varieties. Individual packing, worldwide shipping.', features: ['Individual packing', 'Competition grade', '50+ color variants', 'Photo selection available'], faqs: [{ q: 'What betta types do you export?', a: 'Halfmoon, Giant, Plakat, Crown Tail, Double Tail, and rare wild types.' }, { q: 'Can I select individual fish?', a: 'Yes, we offer photo selection service for premium orders.' }, { q: 'How are bettas packed?', a: 'Each betta is individually packed in separate containers with pure oxygen.' }] },
  'corydoras-exporter': { name: 'Corydoras', title: 'Premium Corydoras Exporter from Indonesia', description: 'Healthy corydoras catfish from Indonesian farms. Multiple species available for wholesale export.', metaDesc: 'Corydoras catfish exporter from Indonesia. Sterbai, Panda, Pygmaeus & more species. Wholesale quantities, worldwide delivery.', features: ['10+ species', 'Farm-raised', 'Wholesale quantities', 'Stress-free packing'], faqs: [{ q: 'What corydoras species do you export?', a: 'Sterbai, Panda, Pygmaeus, Aeneus, Paleatus, Julii, and seasonal wild-caught species.' }, { q: 'What is the MOQ?', a: 'Minimum 200 pieces per species, mixed orders welcome.' }, { q: 'Are they farm-raised or wild-caught?', a: 'We offer both farm-raised and sustainably wild-caught corydoras.' }] },
  'pleco-exporter': { name: 'Pleco', title: 'Premium Pleco Fish Exporter from Indonesia', description: 'Exotic plecostomus species from Indonesia. L-number plecos and common varieties for international trade.', metaDesc: 'Pleco fish exporter from Indonesia. L-number plecos, Bristlenose, Common & exotic species. Export quality, worldwide shipping.', features: ['L-number varieties', 'Rare species', 'Size verified', 'CITES compliant'], faqs: [{ q: 'What pleco species do you export?', a: 'Bristlenose, Common, L-number varieties, and seasonal exotic species.' }, { q: 'Do rare L-numbers need CITES?', a: 'Some species require CITES permits. We handle all documentation.' }, { q: 'What sizes are available?', a: 'From juvenile (2 inch) to adult sizes depending on species.' }] },
  'tetra-exporter': { name: 'Tetra', title: 'Premium Tetra Fish Exporter from Indonesia', description: 'Vibrant tetra species from Indonesian aquaculture. Neon, Cardinal, Rummy Nose and more for wholesale buyers.', metaDesc: 'Tetra fish exporter from Indonesia. Neon, Cardinal, Rummy Nose & more species. Bulk quantities, competitive pricing, worldwide shipping.', features: ['Bulk quantities', 'Bright coloration', 'School-ready packing', 'Competitive pricing'], faqs: [{ q: 'What tetra species do you export?', a: 'Neon, Cardinal, Rummy Nose, Black Phantom, Serpae, Ember, and 10+ more species.' }, { q: 'MOQ for tetras?', a: 'Minimum 500 pieces per species for standard varieties.' }, { q: 'How do you ensure color quality?', a: 'Our fish are raised in optimal conditions to develop full natural coloration.' }] },
};

export async function generateStaticParams() {
  return Object.keys(fishData).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const fish = fishData[slug];
  if (!fish) return { title: 'Species Not Found' };
  return { title: fish.title, description: fish.metaDesc, alternates: { canonical: `https://export.siripku.id/species/${slug}` } };
}

export default async function SpeciesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const fish = fishData[slug];
  if (!fish) return <div>Species not found</div>;

  const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: fish.faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };

  return (
    <main className="min-h-screen bg-[#0b1120] text-white">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* Hero */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-6">
            {fish.name} Exporter
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent leading-tight">
            {fish.title}
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">{fish.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/6289652456206" target="_blank" rel="noopener noreferrer" className="btn-primary text-lg px-8 py-4">
              <MessageCircle className="w-5 h-5" /> Request Quote
            </a>
            <Link href="/blog" className="btn-secondary text-lg px-8 py-4">View Export Guides</Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {fish.features.map((feat, i) => (
            <div key={i} className="glass-card rounded-xl p-5 text-center">
              <CheckCircle2 className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
              <p className="text-sm font-medium">{feat}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 section-darker">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Why Choose Siripku Export for {fish.name}?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: 'Certified Quality', desc: 'All fish come with BKIPM health certificates and quarantine clearance.' },
              { icon: Truck, title: 'Worldwide Shipping', desc: 'We ship to 30+ countries via trusted airline cargo partners.' },
              { icon: Award, title: 'DOA Guarantee', desc: '98%+ survival rate with our proprietary packing system.' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="glass-card rounded-xl p-6">
                  <Icon className="w-8 h-8 text-cyan-400 mb-3" />
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {fish.faqs.map((faq, i) => (
              <details key={i} className="glass-card rounded-xl group">
                <summary className="p-5 cursor-pointer flex items-center justify-between font-medium list-none">
                  {faq.q}
                  <ChevronDown className="w-5 h-5 text-cyan-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-5 pb-5 text-sm text-slate-400">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 section-darker">
        <div className="max-w-3xl mx-auto text-center glass-card rounded-2xl p-10">
          <h2 className="text-2xl font-bold mb-4">Start Importing {fish.name} from Indonesia</h2>
          <p className="text-slate-400 mb-6">Contact our export team for pricing, availability, and custom orders.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://wa.me/6289652456206" target="_blank" rel="noopener noreferrer" className="btn-primary">
              <MessageCircle className="w-5 h-5" /> WhatsApp Inquiry
            </a>
            <Link href="/#inquiry" className="btn-secondary">Contact Form</Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
