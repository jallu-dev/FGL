export const metadata = {
  title: "Verify Gem Certificate Online | Finest Gem Lab (FGL) Sri Lanka",
  description:
    "Verify Finest Gem Lab (FGL) gemstone certificates online. Enter your report ID or scan QR code to confirm Ceylon sapphire authenticity and lab details.",
  alternates: { canonical: "https://fgl.lk/verify" },
  openGraph: {
    title: "Verify Gem Certificate Online | Finest Gem Lab (FGL)",
    description:
      "Check authenticity of your Finest Gem Lab certificate online. Enter report ID for instant scientific verification.",
    url: "https://fgl.lk/verify",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Verify Finest Gem Lab Gemstone Certificate Sri Lanka",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Verify Gem Certificate Online | Finest Gem Lab",
    description:
      "Instant online verification of Finest Gem Lab gemstone reports issued in Sri Lanka.",
    images: ["/images/og-image.jpg"],
  },
};

export default function VerifyLayout({ children }) {
  return children;
}
