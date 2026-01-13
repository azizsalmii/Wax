import React, { useEffect, useRef, useState } from "react";
import "./MasonryGallery.css";

export default function MasonryGallery() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  const photos = [
    { id: 1, img: "/assets/gallery1.jpg", tag: "Get inspired" },
    { id: 2, img: "/assets/gallery2.jpg", tag: "New drop" },
    { id: 3, img: "/assets/gallery3.jpg", tag: "Wax vibe" },
    { id: 4, img: "/assets/gallery4.jpg", tag: "Elegant" },
    { id: 5, img: "/assets/gallery5.jpg", tag: "Collection" },
    { id: 6, img: "/assets/gallery6.jpg", tag: "Modern heritage" },
    { id: 7, img: "/assets/gallery7.jpg", tag: "Limited" },
    { id: 8, img: "/assets/gallery8.jpg", tag: "Lookbook" },
  ];

  // reveal fade-in
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`masonry-section ${inView ? "in-view" : ""}`}>
      <div className="masonry-inner">

        {/* header */}
        <div className="masonry-header">
          <span className="masonry-kicker">GALLERY</span>
          <h2>WAX LOOKBOOK</h2>
          <p>A curated selection of snapshots to immerse you in the WAX universe.</p>
        </div>

        {/* masonry grid */}
        <div className="masonry-grid">
          {photos.map((ph, i) => (
            <article
              key={ph.id}
              className="masonry-card"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <div
                className="masonry-img"
                style={{ backgroundImage: `url(${ph.img})` }}
              />
              <div className="masonry-overlay" />
              <div className="masonry-text">
                <span>{ph.tag}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
