import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

/**
 * schema.org description of the tool, so search engines can show it as a
 * free web application rather than an anonymous page. Static, built from
 * our own constants only, so inlining it as JSON is safe.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  inLanguage: "en-GB",
  offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
  author: {
    "@type": "Person",
    name: "Pooja Kannan",
    url: "https://github.com/poojakannanv",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Hero />
      <HowItWorks />
    </>
  );
}
