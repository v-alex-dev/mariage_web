import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { OUR_STORY } from '@/app/content/ourStory';
import { SITE } from '@/app/content/site';

export const metadata: Metadata = {
  title: OUR_STORY.seo.title,
  description: OUR_STORY.seo.description,
};

// ── Page ─────────────────────────────────────────────────────

export default function OurStoryPage() {
  const { heroPhoto, paragraphs, galleryPhotos, closingLines, cta, heading } = OUR_STORY;

  return (
    <main
      className="our-story"
      style={{
        backgroundColor: 'var(--our-story-bg)',
        color: 'var(--text-primary)',
        width: '100%',
      }}
    >
      {/* ── HERO : Photo polaroïd principale ── */}
      <section className="our-story__hero" aria-label="Photo principale">
        <figure
          className="polaroid polaroid--hero"
          style={{ '--polaroid-rotation': `${heroPhoto.rotation}deg` } as React.CSSProperties}
        >
          <div className="polaroid__frame">
            {/*
              Placeholder SVG en data URI → `unoptimized` requis.
              Dès qu'une vraie photo est renseignée dans ourStory.ts,
              retirer `unoptimized` pour profiter de l'optimisation next/image.
            */}
            <Image
              src={heroPhoto.src}
              alt={heroPhoto.alt}
              fill
              unoptimized
              priority
              sizes="(max-width: 799px) 72vw, 320px"
              className="polaroid__img"
            />
          </div>
          <figcaption className="polaroid__caption">
            <span className="polaroid__date">{heroPhoto.date}</span>
          </figcaption>
        </figure>
      </section>

      {/* ── TITRE ── */}
      <section className="our-story__title-section" aria-label="Titre">
        <div className="our-story__ornament" aria-hidden="true">
          <div className="our-story__line" />
          <span className="our-story__diamond">✦</span>
          <div className="our-story__line" />
        </div>

        <h1 className="our-story__heading">{heading}</h1>

        <div className="our-story__ornament" aria-hidden="true">
          <div className="our-story__line" />
          <span className="our-story__diamond">✦</span>
          <div className="our-story__line" />
        </div>
      </section>

      {/* ── TEXTE NARRATIF ── */}
      <section className="our-story__narrative" aria-label="Notre histoire">
        <div className="our-story__text-container">
          {paragraphs.map((paragraph, i) => (
            <p key={i} className="our-story__paragraph">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* ── GALERIE POLAROÏDS ── */}
      <section className="our-story__gallery" aria-label="Photos du couple">
        <div className="our-story__gallery-grid">
          {galleryPhotos.map((photo) => (
            <figure
              key={photo.id}
              className="polaroid polaroid--gallery"
              style={{ '--polaroid-rotation': `${photo.rotation}deg` } as React.CSSProperties}
            >
              <div className="polaroid__frame">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  unoptimized
                  sizes="(max-width: 799px) 65vw, 280px"
                  className="polaroid__img"
                />
              </div>
              {photo.date && (
                <figcaption className="polaroid__caption">
                  <span className="polaroid__date">{photo.date}</span>
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </section>

      {/* ── CITATION FINALE ── */}
      <section className="our-story__closing" aria-label="Message de clôture">
        <div className="our-story__closing-inner">
          <div className="our-story__ornament our-story__ornament--closing" aria-hidden="true">
            <div className="our-story__line" />
            <span className="our-story__diamond">✦</span>
            <div className="our-story__line" />
          </div>

          <div className="our-story__closing-text">
            {closingLines.map((line, i) =>
              line === '' ? (
                <br key={i} />
              ) : (
                <p key={i} className="our-story__closing-paragraph">
                  {line}
                </p>
              )
            )}
          </div>

          {/* CTA */}
          <div className="our-story__cta-group">
            <Link href={cta.detailsHref} className="our-story__btn our-story__btn--primary">
              {cta.detailsLabel}
            </Link>
            <Link href={cta.musicHref} className="our-story__btn our-story__btn--ghost">
              {cta.musicLabel}
            </Link>
          </div>

          {/* Monogramme footer */}
          <div className="our-story__monogram" aria-hidden="true">
            <span className="our-story__monogram-text">{SITE.coupleNames.monogram}</span>
            <p className="our-story__monogram-date">
              {SITE.weddingDate.display} · {SITE.venue.city}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
