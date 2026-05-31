import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://export.siripku.id"),
  title: {
    default: "Siripku Export — Premium Freshwater Ornamental Fish Exporter from Indonesia",
    template: "%s | Siripku Export",
  },
  description:
    "Indonesia's leading freshwater ornamental fish exporter. Premium quality guppies, discus, bettas, tetras, corydoras & exotic tropical fish. Worldwide shipping with export-grade quality control.",
  keywords: [
    "freshwater ornamental fish exporter",
    "tropical fish exporter Indonesia",
    "guppy exporter",
    "discus exporter",
    "aquarium fish supplier",
    "ornamental fish wholesale",
    "live fish export Indonesia",
    "Indonesian tropical fish exporter",
    "betta exporter",
    "tetra exporter",
    "corydoras exporter",
    "pleco exporter",
    "aquarium fish wholesale",
    "ornamental fish Indonesia",
  ],
  authors: [{ name: "Siripku Export" }],
  creator: "Siripku Export",
  publisher: "Siripku Export",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://export.siripku.id",
    siteName: "Siripku Export",
    title: "Siripku Export — Premium Freshwater Ornamental Fish Exporter from Indonesia",
    description:
      "Indonesia's leading freshwater ornamental fish exporter. Premium quality tropical fish with worldwide shipping.",
    images: [
      {
        url: "/images/hero-fish.png",
        width: 1200,
        height: 630,
        alt: "Siripku Export - Premium Ornamental Fish from Indonesia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Siripku Export — Premium Freshwater Ornamental Fish Exporter",
    description:
      "Indonesia's leading freshwater ornamental fish exporter. Premium quality tropical fish with worldwide shipping.",
    images: ["/images/hero-fish.png"],
  },
  alternates: {
    canonical: "https://export.siripku.id",
  },
  verification: {
    google: "Hf-hqnHsGNTfTs-KmBGQfCMuHiFoKfZcLbU3DRdWWAw",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Siripku Export",
  url: "https://export.siripku.id",
  logo: "https://export.siripku.id/images/logo.png",
  description:
    "Indonesia's leading freshwater ornamental fish exporter supplying premium quality tropical aquarium fish worldwide.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "ID",
    addressRegion: "Indonesia",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    availableLanguage: ["English", "Indonesian"],
  },
  sameAs: [
    "https://instagram.com/siripkuexport",
    "https://facebook.com/siripkuexport",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" className={`${inter.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-full flex flex-col bg-[#0b1120] text-[#e2e8f0]">
        {children}
      </body>
    </html>
  );
}
