// ============================================================
//  components/sections/PolaroidPhoto.tsx
//  Composant photo style polaroïd réutilisable
// ============================================================

interface PolaroidPhotoProps {
  src: string;
  alt: string;
  date?: string;
  rotation?: number; // degrés, défaut léger aléatoire
  caption?: string;
  priority?: boolean;
  className?: string;
}

export default function PolaroidPhoto({
  src,
  alt,
  date,
  rotation = 0,
  caption,
  className = '',
}: PolaroidPhotoProps) {
  return (
    <figure
      className={`polaroid ${className}`}
      style={{ '--polaroid-rotation': `${rotation}deg` } as React.CSSProperties}
      aria-label={caption ?? alt}
    >
      <div className="polaroid__frame">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="polaroid__img" loading="lazy" decoding="async" />
      </div>
      {(date || caption) && (
        <figcaption className="polaroid__caption">
          {date && <span className="polaroid__date">{date}</span>}
          {caption && !date && <span className="polaroid__text">{caption}</span>}
        </figcaption>
      )}
    </figure>
  );
}
