import React, { Component } from 'react';
import './App.css';
import LineChart from './components/linechart/LineChart';
import ToolTip from './components/tooltip/ToolTip';
import { line, curveMonotoneX } from 'd3-shape';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePoint: null,
      toolTipTrigger: null,
      fetchingData: true,
      data: null
    }
  }

  handlePointHover = (point, trigger) => {
    this.setState({
      activePoint: point,
      toolTipTrigger: trigger
    })
  }

  componentWillMount(){

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
 
    let data = [...new Set(dataArray.map(item=> item.category))].map(userCategory => {

      const numItems = dataArray.filter(user => user.category=== userCategory) 
      return { x :userCategory , y : numItems.length * 100 / dataArray.length }

    }).sort((a, b) =>a.x - b.x);
  
    this.setState({
      data,
      fetchingData: false
    });
  }

  render() {
   
    return (
      <div className="App">

        { this.state.toolTipTrigger
          ? (
            <ToolTip trigger={ this.state.toolTipTrigger }>
              <div>y : { this.state.activePoint.y }</div>
              <div>x : { this.state.activePoint.x }</div>
            </ToolTip>
          )
          : null
        }
        
        {
          !this.state.fetchingData ?
          <LineChart data={this.state.data} onPointHover={ this.handlePointHover } /> :
          null
        }
        </div>
    );
  }
}

export default App;
