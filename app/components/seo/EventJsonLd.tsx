import { SITE } from '@/app/content/site';

export default function EventJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: `Mariage de ${SITE.coupleNames.full}`,
    startDate: SITE.weddingDate.iso,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: SITE.venue.nameUnknown ? SITE.venue.city : SITE.venue.name,
      address: {
        '@type': 'PostalAddress',
        addressLocality: SITE.venue.city,
        addressCountry: SITE.venue.country,
      },
    },
    description: SITE.seo.description,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
