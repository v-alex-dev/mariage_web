import type { Metadata } from 'next';
import { DETAILS } from '@/app/content/details';

export const metadata: Metadata = {
  title: DETAILS.seo.title,
  description: DETAILS.seo.description,
};

export default function DetailsPage() {
  const { hero, invitation, venuePhoto, practicalInfo, travelStay } = DETAILS;

  return (
    <main style={{ backgroundColor: 'var(--details-hero-bg)', width: '100%' }}>
      {/* ── HERO ── */}
      <section className="details__hero" aria-label="Hero">
        <div
          className="details__hero-bg"
          style={{ backgroundColor: hero.photo.bg }}
          role="img"
          aria-label={hero.photo.alt}
        />
        <div className="details__hero-overlay" aria-hidden="true" />
        <h1 className="details__hero-title">{hero.title}</h1>
      </section>

      {/* ── CARTE D'INVITATION ── */}
      <section className="details__invitation-section" aria-label="Invitation">
        <div className="details__invitation-card">
          <p className="details__invitation-text">{invitation.text}</p>
          <a href={invitation.cta.href} className="details__btn">
            {invitation.cta.label}
          </a>
        </div>
      </section>

      {/* ── PHOTO DU LIEU (pleine largeur) ── */}
      <section className="details__venue-photo-section" aria-label="Photo du lieu">
        <div
          className="details__venue-photo"
          style={{ backgroundColor: venuePhoto.bg }}
          role="img"
          aria-label={venuePhoto.alt}
        />
      </section>

      {/* ── INFOS PRATIQUES ── */}
      <section className="details__info-section" aria-label="Informations pratiques">
        <div className="details__info-grid">
          {practicalInfo.map(({ label, value }) => (
            <div key={label} className="details__info-item">
              <p className="details__info-label">{label}</p>
              <p className="details__info-value">{value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TRAVEL & STAY ── */}
      <section id="travel" className="details__travel-section" aria-label="Travel and Stay">
        <div className="details__travel-inner">
          <h2 className="details__travel-title">{travelStay.title}</h2>
          <p className="details__travel-text">{travelStay.text}</p>
          <div
            className="details__travel-photo"
            style={{ backgroundColor: travelStay.photo.bg }}
            role="img"
            aria-label={travelStay.photo.alt}
          />
        </div>
      </section>
    </main>
  );
}
