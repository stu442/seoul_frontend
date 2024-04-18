import React, { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import filterState from '../../recoil/atoms';
import { FacilityButton, Wrapper } from './style';
import POSITION_TITLES from '../../constant/filterButtonTitle';
import throttle from '../../utils/commonUtils';

function FilterWrapper() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>();
  const [prevX, setPrevX] = useState<number>(0);
  const [diff, setDiff] = useState<number>(0);
  const [currentFilters, setCurrentFilters] = useRecoilState(filterState);

  const handleButtonClick = (title: string) => {
    if(diff === 0) {
      setCurrentFilters({
        ...currentFilters,
        [title]: !currentFilters[title],
      });
    }
  };

  const onDragStart = (e: React.MouseEvent) => {
    if(!scrollRef.current) return;

    setStartX(e.pageX + scrollRef.current.scrollLeft);
    setPrevX(e.pageX);
    setIsDrag(true);
  };

  const DragEnd = (e: React.MouseEvent) => {
    setIsDrag(false);
    setDiff(Math.abs(prevX - e.pageX));
  };

  const onDragMove = (e: React.MouseEvent):void => {
    if(!scrollRef.current || !startX ) return;
    if(isDrag) {
      const {scrollWidth, clientWidth, scrollLeft} = scrollRef.current;
      scrollRef.current.scrollLeft = startX - e.pageX;

      if(scrollLeft === 0) {
        setStartX(e.pageX);
      } else if (scrollWidth <= clientWidth + scrollLeft) {
        setStartX(e.pageX + scrollLeft);
      }
    }
  };

  const delay = 10;
  const onThrottledDragMove = throttle(onDragMove, delay);

  return (
    <Wrapper
      ref={scrollRef}
      onMouseDown={onDragStart}
      onMouseMove={isDrag ? onThrottledDragMove : undefined}
      onMouseUp={DragEnd}
      onMouseLeave={DragEnd}
    >
      {Object.entries(POSITION_TITLES).map(([position, label]) => (
        <FacilityButton
          key={position}
          $isClicked={currentFilters[position]}
          onMouseUp={() => handleButtonClick(position)}
          type="button"
        >
          {label}
        </FacilityButton>
      ))}
    </Wrapper >
  );
}

export default FilterWrapper;