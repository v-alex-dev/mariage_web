import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Notre Histoire',
  description:
    'Comment Sophie & Nathan se sont rencontrés et ont construit leur vie ensemble, entre aventures et bonheur partagé.',
};

// ── Données narratives ────────────────────────────────────────
// À remplacer par le vrai texte du couple

const STORY_PARAGRAPHS = [
  `Tout a commencé lors d'une randonnée en forêt, quelque part en Belgique. On s'est perdus  pas dans les bois, mais dans la conversation. On avait les mêmes silences confortables, le même besoin de marcher pour réfléchir, la même façon de regarder les choses. Ce jour-là, on ne savait pas encore ce que ça voulait dire. On s'en doutait un peu.`,
  `On a construit notre vie ensemble doucement, à notre rythme. Des week-ends dans les Ardennes, des matins café trop long, des plans qu'on change au dernier moment parce qu'il fait beau. On aime les aventures ordinaires. Celles qui, mises bout à bout, forment quelque chose d'extraordinaire.`,
];

const CLOSING_TEXT = `Il nous semble juste de célébrer ça entourés des gens qui nous ressemblent.\nOn est heureux de commencer ce nouveau chapitre avec vous.\n\nEn avant, et vers le haut !`;

// ── Placeholders photos (à remplacer par de vraies images) ───
const PHOTOS = [
  {
    id: 'main',
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600'%3E%3Crect width='600' height='600' fill='%23b8bfb0'/%3E%3Ctext x='50%25' y='50%25' font-family='serif' font-size='18' fill='%23fff' opacity='.6' text-anchor='middle' dy='.3em'%3EPhoto principale%3C/text%3E%3C/svg%3E",
    alt: 'Sophie et Nathan',
    date: '06/10/19',
    rotation: -2,
  },
  {
    id: 'second',
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500'%3E%3Crect width='500' height='500' fill='%238b8468'/%3E%3Ctext x='50%25' y='50%25' font-family='serif' font-size='18' fill='%23fff' opacity='.6' text-anchor='middle' dy='.3em'%3EPhoto 2%3C/text%3E%3C/svg%3E",
    alt: 'Sophie et Nathan — moment partagé',
    date: undefined,
    rotation: 1.5,
  },
  {
    id: 'third',
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500'%3E%3Crect width='500' height='500' fill='%236b7c6b'/%3E%3Ctext x='50%25' y='50%25' font-family='serif' font-size='18' fill='%23fff' opacity='.6' text-anchor='middle' dy='.3em'%3EPhoto 3%3C/text%3E%3C/svg%3E",
    alt: 'Sophie et Nathan — aventure',
    date: undefined,
    rotation: -1,
  },
];

// ── Page ─────────────────────────────────────────────────────

export default function OurStoryPage() {
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
          style={{ '--polaroid-rotation': `${PHOTOS[0].rotation}deg` } as React.CSSProperties}
        >
          <div className="polaroid__frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PHOTOS[0].src}
              alt={PHOTOS[0].alt}
              className="polaroid__img"
              loading="eager"
              decoding="async"
            />
          </div>
          <figcaption className="polaroid__caption">
            <span className="polaroid__date">{PHOTOS[0].date}</span>
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

        <h1 className="our-story__heading">Là où les choses folles ont commencé</h1>

        <div className="our-story__ornament" aria-hidden="true">
          <div className="our-story__line" />
          <span className="our-story__diamond">✦</span>
          <div className="our-story__line" />
        </div>
      </section>

      {/* ── TEXTE NARRATIF ── */}
      <section className="our-story__narrative" aria-label="Notre histoire">
        <div className="our-story__text-container">
          {STORY_PARAGRAPHS.map((paragraph, i) => (
            <p key={i} className="our-story__paragraph">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* ── GALERIE POLAROÏDS ── */}
      <section className="our-story__gallery" aria-label="Photos du couple">
        <div className="our-story__gallery-grid">
          {PHOTOS.slice(1).map((photo) => (
            <figure
              key={photo.id}
              className="polaroid polaroid--gallery"
              style={{ '--polaroid-rotation': `${photo.rotation}deg` } as React.CSSProperties}
            >
              <div className="polaroid__frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="polaroid__img"
                  loading="lazy"
                  decoding="async"
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
            {CLOSING_TEXT.split('\n').map((line, i) =>
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
            <Link href="/details" className="our-story__btn our-story__btn--primary">
              Voir les détails
            </Link>
            <Link href="/music" className="our-story__btn our-story__btn--ghost">
              Suggérer une chanson
            </Link>
          </div>

          {/* Monogramme footer */}
          <div className="our-story__monogram" aria-hidden="true">
            <span className="our-story__monogram-text">S&amp;N</span>
            <p className="our-story__monogram-date">Un jour en mai · Belgique</p>
          </div>
        </div>
      </section>
    </main>
  );
}
