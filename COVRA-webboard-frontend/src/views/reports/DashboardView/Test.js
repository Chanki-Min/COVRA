import React from "react";
import * as d3 from 'd3';
import {Card, CardContent, Divider} from "@material-ui/core";
import aapl_csv from "./data/aapl.csv"
import CardHeader from "@material-ui/core/CardHeader";
import Box from "@material-ui/core/Box";


export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      d3React: new d3React()
    };
  }

   getd3ReactState = async () => {
    const parseDate = d3.timeParse("%Y-%m-%d");
    let metaData = await (await fetch(aapl_csv)).text();
    metaData = d3.csvParse(metaData).map((row) => ({date: parseDate(row.date), close: parseFloat(row.close)}) );

    const d3DivBoundingBox = this._d3Div.getBoundingClientRect();   //d3 엘레먼트의 bounding box 크기를 가져온다
    return ({
      data: {
        width: d3DivBoundingBox.width,
        height: d3DivBoundingBox.height,
        metaData: metaData,
        margin: ({top: 10, right: 10, bottom: 10, left: 10})
      }
    });
  }

  async componentDidMount() {
    const state = await this.getd3ReactState();
    this.state.d3React.create(this._d3Div, state);
    window.addEventListener('resize', () => {
      this.getd3ReactState()
        .then( (newState) => {
              this.state.d3React.update(this._d3Div, newState)
          }
        )
    })
  }

  componentDidUpdate(prevProps, prevState, snapShot) {
    const state = this.getd3ReactState();
    this.state.d3React.update(this._d3Div, state);
  }

  render() {
    return (
      <Card>
        <CardHeader title="Apple stock"/>
        <Divider/>
        <CardContent>
          <Box
            height={400}
            position="relative"
          >
            <div style={d3DivStyle} className="d3Component" ref={(component) => { this._d3Div = component; } } />
          </Box>
        </CardContent>
      </Card>
    );
  }
}

const d3DivStyle = {
  height: "100%",
  width: "100%",
}

class d3React {
  constructor() {
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this._drawComponent = this._drawComponent.bind(this);
  }

  create(element, state) {
    console.log('d3React create');

    d3.select(element).append('svg')
      .attr('width', state.data.width)
      .attr('height', state.data.height);

    this._drawComponent(element, state.data);
  }

  update(element, state) {
    console.log('d3React update');
    d3.select(element).select('svg').remove();
    this.create(element, state);
  }

  _drawComponent(element, data) {
    const svg = d3.select(element).select('svg')

    const x = d3.scaleTime()
      .rangeRound([0 + data.margin.left, data.width - data.margin.right])
      .domain(d3.extent(data.metaData, d => d.date));
    const y = d3.scaleLinear()
      .rangeRound([data.height - data.margin.top, 0 + data.margin.bottom])
      .domain(d3.extent(data.metaData, d => d.close));

    const line = d3.line()
      .x(d => x(d.date))
      .y(d => y(d.close))

    svg.append("path")
      .datum(data.metaData)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line(data.metaData));
  }
}
