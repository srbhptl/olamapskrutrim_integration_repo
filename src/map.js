// src/Map.js

import React, { useState, useEffect } from 'react';
import maplibre from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const Map = () => {
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (!mapReady) return;

    const map = new maplibre.Map({
      container: 'map',
      style: 'https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json',
      center: [78.9629, 20.5937], // Center the map over India
      zoom: 3, // Adjust zoom level as needed
      transformRequest: (url, resourceType) => {
        if (!url.includes('?')) {
          url = url + '?api_key=L5SJns0ziY77pp4tpx1bHQsFtkhhN2Gb76reivs9x';
        } else {
          url = url + '&api_key=L5SJns0ziY77pp4tpx1bHQsFtkhhN2Gb76reivs9x';
        }
        return { url, resourceType };
      }
    });

    const nav = new maplibre.NavigationControl({
      visualizePitch: true
    });
    map.addControl(nav, 'top-right');

    // map.on('load', () => {
    //   map.addSource('planet-source', {
    //     type: 'vector',
    //     tiles: [
    //       'https://api.olamaps.io/tiles/vector/v1/data/planet/{0}/{0}/{0}.pbf?key=L5SJns0ziY77pp4tpx1bHQsFtkhhN2Gb76reivs9x'
    //     ],
    //     minzoom: 0,
    //     maxzoom: 10
    //   });

    //   map.addLayer({
    //     id: 'planet-layer',
    //     type: 'fill',
    //     source: 'planet-source',
    //     'source-layer': 'landuse',
    //     paint: {
    //       'fill-color': '#888888',
    //       'fill-opacity': 0.4
    //     }
    //   });
    // });

    return () => map.remove();
  }, [mapReady]);

  return (
    <div
      id="map"
      style={{ width: '100%', height: '100vh' }}
      ref={() => setMapReady(true)}
    />
  );
};

export default Map;
