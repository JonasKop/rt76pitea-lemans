"use client";

import { useEffect, useRef } from "react";
import type { Map as LeafletMap } from "leaflet";

const piteHavsbad: [number, number] = [65.2385008, 21.5647778];

export function EventMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    let disposed = false;

    async function initMap() {
      const leaflet = await import("leaflet");

      if (!containerRef.current || disposed || mapRef.current) {
        return;
      }

      const map = leaflet.map(containerRef.current, {
        center: piteHavsbad,
        zoom: 13,
        scrollWheelZoom: false,
      });

      leaflet
        .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        })
        .addTo(map);

      leaflet
        .circleMarker(piteHavsbad, {
          color: "#d8ad62",
          fillColor: "#d8ad62",
          fillOpacity: 0.72,
          radius: 10,
          weight: 3,
        })
        .addTo(map)
        .bindPopup("Pite Havsbad");

      mapRef.current = map;
      window.setTimeout(() => map.invalidateSize(), 150);
    }

    void initMap();

    return () => {
      disposed = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-label="Karta över Pite Havsbad"
      className="h-80 w-full lg:h-[28rem]"
    />
  );
}
