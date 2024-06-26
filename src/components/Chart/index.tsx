import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';
import {
  transformData,
  isWaypointInfo,
  isWaypointMean,
  // isWaypointMean,
} from '../../utils/mapUtils';
import { WaypointInfo, WaypointMean } from '../../types/mapTypes';
import { ChartWrapper, Content, DangerList, Facility } from './style';

interface ChartProps {
  data: WaypointInfo | WaypointMean | undefined;
  type: 'info' | 'mean';
}

function Chart({ data, type }: ChartProps) {
  const riskData = transformData(data, type);

  return (
    <ChartWrapper>
      <RadarChart width={160} height={120} data={riskData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="risk" tick={{ fontSize: 8 }} />
        <PolarRadiusAxis tick={{ fontSize: 5 }} />
        <Radar
          name="risk-scores"
          dataKey="A"
          stroke="#ff7757"
          fill="#ff7757"
          fillOpacity={0.6}
        />
      </RadarChart>
      <Content>
        {riskData && riskData.length > 0 && (
          <>
            <p>
              위험도 :&nbsp;
              {type === 'info' && isWaypointInfo(data)
                ? Math.round(data.rank_score)
                : type === 'mean' &&
                  isWaypointMean(data) &&
                  Math.round(data.rank_score_mean)}
              점
            </p>
            <DangerList>
              {riskData
                .filter((item) => item.risk)
                .sort((a, b) => b.A - a.A)
                .slice(0, 2)
                .map((item) => (
                  <span key={`${item.risk}`}>
                    🚨 주변에 <Facility>{item.risk}</Facility> 이(가) 없습니다!!
                  </span>
                ))}
            </DangerList>
          </>
        )}
      </Content>
    </ChartWrapper>
  );
}

export default Chart;
