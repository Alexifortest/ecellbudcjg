import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";

const galleryFiles = import.meta.glob(
  "/src/assets/gallery/*.{JPG,jpg,JPEG,jpeg,PNG,png}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

const galleryImages = Object.entries(galleryFiles)
  .sort(([a], [b]) =>
    a.localeCompare(b, undefined, { numeric: true })
  )
  .map(([, image]) => image as string);

// Divide images into 3 rows
const row1 = galleryImages.slice(0, 9);
const row2 = galleryImages.slice(9, 17);
const row3 = galleryImages.slice(17, 25);

const GalleryRow = ({
  images,
  direction,
}: {
  images: string[];
  direction: "left" | "right";
}) => {
  // Duplicate images to create a continuous scrolling effect
  const duplicatedImages = [...images, ...images];

  return (
    <div className="w-full overflow-hidden">
      <div
        className={`gallery-track flex w-max gap-4 ${
          direction === "left"
            ? "gallery-scroll-left"
            : "gallery-scroll-right"
        }`}
      >
        {duplicatedImages.map((image, index) => (
          <div
            key={`${image}-${index}`}
            className="h-[190px] w-[280px] flex-shrink-0 overflow-hidden rounded-2xl"
          >
            <img
              src={image}
              alt={`E-Cell RSCOE event ${index + 1}`}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const Gallery = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="overflow-hidden pt-32 pb-16">
        {/* Heading */}
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            WE DON'T JUST ORGANIZE EVENTS.
            <br />

            <span className="text-muted-foreground">
              WE CREATE EXPERIENCES.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
            Moments captured from our journey of innovation,
            entrepreneurship, collaboration, and unforgettable experiences.
          </p>
        </div>

        {/* Gallery */}
        <div className="mt-16 space-y-6">

          {/* ROW 1 → moves LEFT */}
          <GalleryRow
            images={row1}
            direction="left"
          />

          {/* ROW 2 → moves RIGHT */}
          <GalleryRow
            images={row2}
            direction="right"
          />

          {/* ROW 3 → moves LEFT */}
          <GalleryRow
            images={row3}
            direction="left"
          />

        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Gallery;