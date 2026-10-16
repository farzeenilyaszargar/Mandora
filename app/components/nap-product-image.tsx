type Props = { eager?: boolean; sizes: string; alt: string };

// Build-time variants avoid a cold image-optimizer request on the first visit.
export default function NapProductImage({ eager = false, sizes, alt }: Props) {
  return (
    <picture>
      <source
        type="image/webp"
        srcSet="/nap-ui-480-eb1ddc82.webp 480w, /nap-ui-828-266c4627.webp 828w, /nap-ui-240fdfdf.webp 1380w"
        sizes={sizes}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/nap-ui-240fdfdf.webp"
        alt={alt}
        width={1380}
        height={872}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        decoding="async"
      />
    </picture>
  );
}
