import React, { useEffect, useRef } from 'react';
import useMap from '../hooks/useMap';
import POSITIONS from '../constant/mockingPositions';
import useCurrentPosition from '../hooks/useCurruntPosition';
import { generateMarker } from '../utils/mapUtils';
import SearchContainer from '../components/SearchInput';

function Home() {
  const { currentPosition } = useCurrentPosition();
  const mapRef = useRef(null);
  const { map } = useMap(mapRef, currentPosition?.coords.latitude, currentPosition?.coords.longitude);

  useEffect(() => {
    if (!currentPosition) return;

    // 현재 위치 마커 생성 및 추가
    const currentPositionMarker = generateMarker(
      currentPosition.coords.latitude,
      currentPosition.coords.longitude
    );
    currentPositionMarker.setMap(map);

    // 위험 시설 마커 생성 및 추가
    for (let i = 0; i < POSITIONS.length; i++) {
      const marker = generateMarker(
        POSITIONS[i].lat,
        POSITIONS[i].lng,
        POSITIONS[i].title
      );
      marker.setMap(map);
    }
  }, [map]);

  return (
    <>
      <SearchContainer />
      <div id="map" style={{ width: '500px', height: '500px' }} ref={mapRef} />
    </>
  );
}

export default Home;
