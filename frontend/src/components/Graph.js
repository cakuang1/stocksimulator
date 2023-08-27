import React from 'react';
import { ResponsiveLine,Line } from '@nivo/line'



function Graph ({ data }) {
      const input = [{ id: 'none',
      'color' : "hsl(135, 70%, 50%);",
      "data" : data.graph
    }]
    const lowestYValue = Math.min(...input.flatMap(series => series.data.map(point => point.y)));

    const color = data.top.change == true ? 'green' : 'red'
    return(
      <div className='h-2/3 w-full'>
    <ResponsiveLine
        data={input}
        margin={{ top: 20, bottom: 50, left: 80 }}
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
        colors={[color]}
        enablePoints = {false}
        animate = {false}
        crosshairType="x" // Show only x-axis slices
        tooltip={({ point }) => (
          <div style={{ background: 'white', padding: '10px', border: '1px solid #ccc' }}>
            <div><strong>Time:</strong> {point.data.xFormatted}</div>
            <div><strong>Price:</strong> {point.data.yFormatted}</div>
          </div>
        )}

    />
    </div>
    )
    }


    export default Graph