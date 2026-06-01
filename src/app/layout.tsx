import type { Metadata } from "next";
import { Archivo, JetBrains_Mono, Spectral } from "next/font/google";
import { profile, socials } from "@/lib/data";
import "./globals.css";

const display = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const serif = Spectral({
  variable: "--font-spectral",
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kabir-batra.com";
const siteName = `${profile.name} Portfolio`;
const description =
  "Senior Software Engineer with 4+ years building everything from full-stack SaaS/B2C products to large-scale e-commerce platforms.";
const socialPreviewImage = "/og-live-large.png?v=1";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name}, Senior Software Engineer`,
    template: `%s | ${siteName}`,
  },
  keywords: [
    "Kabir Batra",
    "Senior Software Engineer",
    "React.js",
    "Next.js",
    "TypeScript",
    "frontend system design",
    "microfrontend",
    "microservices",
    "product design",
    "game development",
    "3D animations",
    "graphic design",
    "AI/ML",
    "LLMs",
  ],
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName,
    title: `${profile.name}, Senior Software Engineer`,
    description,
    images: [
      {
        url: socialPreviewImage,
        width: 2400,
        height: 1260,
        alt: `${profile.name} portfolio website preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@KabirBatra_",
    creator: "@KabirBatra_",
    title: `${profile.name}, Senior Software Engineer`,
    description,
    images: [
      {
        url: socialPreviewImage,
        width: 2400,
        height: 1260,
        alt: `${profile.name} portfolio website preview`,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const themeInit = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t='light';}document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='light';}})();`;
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  address: {
    "@type": "PostalAddress",
    addressLocality: profile.location,
  },
  url: siteUrl,
  email: profile.email,
  sameAs: socials.map((social) => social.href).filter((href) => href.startsWith("https://")),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${mono.variable} ${serif.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
