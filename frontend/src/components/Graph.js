import React from 'react';
import { ResponsiveLine,Line } from '@nivo/line'



function Graph ({ data }) {
    const lowestYValue = Math.min(...data.flatMap(series => series.data.map(point => point.y)));
    return(
    <Line
        data={data}
        height={500}
        width={1250}
        margin={{ top: 50, right: 110, bottom: 50, left: 80 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}

        yFormat=" >-.2f"    
        enableGridX={false}
        enableGridY={false}
        axisTop={null}
        axisRight={null}
        axisBottom={
               {tickValues:['11:00','02:00'],
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,

                legendOffset: 36,
                legendPosition: 'middle'}
        }
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        areaBaselineValue = {lowestYValue}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        enableSlices={false}
        enableArea = {true}

        enablePoints = {false}
        animate = {false}
        crosshairType="x" // Show only x-axis slices
        tooltip={({ point }) => (
          <div style={{ background: 'white', padding: '10px', border: '1px solid #ccc' }}>
            <div><strong>X Value:</strong> {point.data.xFormatted}</div>
            <div><strong>Y Value:</strong> {point.data.yFormatted}</div>
          </div>
        )}

    />
    )
    }


    export default Graph