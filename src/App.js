import React, { Component } from 'react';
import { scaleLinear, scaleBand } from 'd3-scale';
import XYAxis from './components/axis/xy-axis';
import LineChart from './components/linechart/lineChart';
import { line, curveMonotoneX } from 'd3-shape';
import { extent } from 'd3-array';
import { transition } from 'd3-transition';

class App extends Component {
  constructor() {
    super();

    const dataArray = [ 
      { "user": "Rm6vnmNPRvz", "value": 11, "category": 7 }, 
      { "user": "cB0hC", "value": 9, "category": 7 }, 
      { "user": "xFapEXx9", "value": 12, "category": 9 }, 
      { "user": "stHdo1TV", "value": 6, "category": 10 }, 
      { "user": "NlUafWkpjduC3", "value": 10, "category": 7 }, 
      { "user": "e7DwVrmJ", "value": 7, "category": 6 }, 
      { "user": "uEOJsO", "value": 6, "category": 14 }, 
      { "user": "zlTNlewuDKcRl", "value": 13, "category": 8 }, 
      { "user": "BQlhXiIHXUo42I", "value": 12, "category": 14 }, 
      { "user": "SO6lM", "value": 5, "category": 5 }, 
      { "user": "kn3LTrlFv6", "value": 5, "category": 11 }, 
      { "user": "rFKwr3vSxco3K7", "value": 7, "category": 9 },
      { "user": "1gzvu", "value": 11, "category": 14 }, 
      { "user": "BL ymOGU", "value": 13, "category": 10 }, 
      {"user": "vwEH33kh8 Bhny", "value": 6, "category": 5 } 
    ];
 
    let filteredData = [...new Set(dataArray.map(item=> item.category))].map(userCategory => {

      const numItems = dataArray.filter(user => user.category=== userCategory) 
      return { name :userCategory , value : numItems.length * 100 / dataArray.length }

    }).sort((a, b) =>a.name - b.name)
 
    this.state = {
      data: filteredData.map(data=>({ name: data.name, value: data.value })),  
    }
  }

  render() {
    const { data } = this.state;
    const parentWidth = 500;

    const margins = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 100,
    };

    const width = parentWidth - margins.left - margins.right;
    const height = 200 - margins.top - margins.bottom;

    const ticks = 5;
    const t = transition().duration(1000);

    const xScale = scaleBand()
      .domain(data.map(d => d.name))
      .rangeRound([0, width]).padding(0.1);

    const yScale = scaleLinear()
      .domain(extent(data, d => d.value))
      .range([height, 0])
      .nice();

    const lineGenerator = line()
      .x(d => xScale(d.name))
      .y(d => yScale(d.value))
      .curve(curveMonotoneX);

    return (
      <>
        <svg
          className="lineChartSvg"
          width={width + margins.left + margins.right}
          height={height + margins.top + margins.bottom}
        >
          <g transform={`translate(${margins.left}, ${margins.top})`}>
            <XYAxis {...{ xScale, yScale, height, ticks, t }} />
            <LineChart data={data} xScale={xScale} yScale={yScale} lineGenerator={lineGenerator} width={width} height={height} />
          </g>
        </svg>
      </>
    );
  }
}

export default App;
