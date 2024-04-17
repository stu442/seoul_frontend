import React from 'react';
import { Coord } from '../../types/mapTypes';
import { Carousel, Info } from './style';
import danger from '../../assets/images/danger.svg';

interface RouteInfoProps {
  routeInfo: { time: string; distance: string };
  waypoints: Coord[];
}

function RouteCarousel({ routeInfo, waypoints }: RouteInfoProps) {
  const { time, distance } = routeInfo;
  return (
    <Carousel>
      <Info>
        <p className="time">{time}</p>
        <p className="distance">{distance}</p>
      </Info>
      <Info>
        <img className="icon" src={danger} alt="danger-spot" />
        <p className="spot">위험스팟 {waypoints.length}곳</p>
      </Info>
    </Carousel>
  );
}

export default RouteCarousel;
