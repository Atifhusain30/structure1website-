'use client';
import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';

/**
 * A real map of the metroplex: OpenStreetMap tiles desaturated with CSS to sit in the site's gray palette, the ~50-mile
 * coverage ring around downtown Dallas, and a marker per city guide that links to its page (the basemap's own
 * labels name the cities; the marker tooltip appears on hover). Leaflet is loaded
 * on the client only. Scroll-wheel zoom stays off so the page keeps scrolling; drag is off on touch screens for
 * the same reason, with the zoom buttons left on for anyone who wants to look closer.
 */
export type MapCity = { slug: string; name: string; lat: number; lng: number; home?: boolean };

const DALLAS: [number, number] = [32.7767, -96.797];
const CENTER: [number, number] = [32.86, -96.95];
const RING_METERS = 50 * 1609.34;
const TILES = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

export default function ServiceAreaLeafletMap({ cities, className }: { cities: MapCity[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let map: import('leaflet').Map | undefined;
    let cancelled = false;

    import('leaflet').then((L) => {
      if (cancelled || !el) return;
      const touch = window.matchMedia('(pointer: coarse)').matches;
      const narrow = window.innerWidth < 640;
      map = L.map(el, {
        center: CENTER,
        zoom: narrow ? 8 : 9,
        scrollWheelZoom: false,
        dragging: !touch,
        touchZoom: false,
        attributionControl: true,
        zoomControl: true,
      });
      L.tileLayer(TILES, { attribution: ATTRIBUTION, maxZoom: 18, className: 'sa-tiles' }).addTo(map);

      L.circle(DALLAS, { radius: RING_METERS, color: '#0E0E0E', weight: 1.5, dashArray: '4 8', fillColor: '#0E0E0E', fillOpacity: 0.05, interactive: false }).addTo(map);

      cities.forEach((c) => {
        // A small pin drawn just below the point, so it sits under the basemap's own city name instead of on it.
        const size = c.home ? 18 : 14;
        const icon = L.divIcon({ className: c.home ? 'sa-pin sa-pin-home' : 'sa-pin', iconSize: [size, size], iconAnchor: [size / 2, -8] });
        const marker = L.marker([c.lat, c.lng], { icon, keyboard: true, title: `${c.name} guide` }).addTo(map!);
        marker.bindTooltip(`${c.name} guide`, { direction: 'bottom', offset: [0, 10], className: 'sa-label' });
        const go = () => {
          window.location.href = `/service-areas/${c.slug}`;
        };
        marker.on('click', go);
        marker.getElement()?.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            go();
          }
        });
      });
    });

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [cities]);

  return <div ref={ref} className={className} role="region" aria-label="Map of the Dallas–Fort Worth metroplex showing the Structure1 service area, about 50 miles around Dallas, with markers for each city guide" />;
}
