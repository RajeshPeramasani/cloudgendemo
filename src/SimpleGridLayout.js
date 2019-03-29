import GridLayout from 'react-grid-layout';
import React, {Component} from 'react';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import SimpleTable from "./SimpleTable";
import SimpleChart from "./SimpleChart";
import _ from 'underscore';

var jq = window.$;
const rowHeight = 50;

const layout = [
    {i: 'a', x: 0, y: 0, w: 5, h: 8, minW: 3, minH: 7},
    {i: 'b', x: 5, y: 0, w: 2, h: 5,},
    {i: 'c', x: 10, y: 1, w: 5, h: 8, minW: 2, minH: 2},
    {i: 'd', x: 1, y: 1, w: 1, h: 2},
    {i: 'e', x: 1, y: 1, w: 1, h: 2},
];

export default class SimpleGridLayout extends Component {

    state = {
        chartHeight: 0,
        chartWidth: 0,
        screenWidth: 0,
        chartCoordinates:{}
    };

    eventListener() {
        const that = this;
        window.addEventListener('resize', () => {
            that.setState({
                screenWidth: window.innerWidth
            })
            that.calWidthHeight(that.state.chartCoordinates);
        })
    }

    componentDidMount() {
        this.eventListener();
        this.setState({
            screenWidth: window.innerWidth
        });
        const chart = _.findWhere(layout, {i: 'c'});
        this.calWidthHeight(chart);
    }

    calWidthHeight(chart) {
        if (chart.i != 'c')
            return;

        var chartHeight = 0;
        var chartWidth = 0;

        var width = window.innerWidth;

        width = width / 12;

        if (chart) {
            chartHeight = chart.h * rowHeight;
            chartWidth = chart.w * width * 0.96;
        }

        this.setState({chartHeight, chartWidth, chartCoordinates: chart});
    }

    onResize(e) {
        this.calWidthHeight(e);
    };

    render() {
        const {chartHeight, chartWidth, screenWidth} = this.state;

        return (
            <GridLayout className="layout" layout={layout} cols={12} rowHeight={rowHeight}
                        width={screenWidth}
                        onResizeStop={(a, b, c) => {
                            this.onResize(c)
                        }}
            >
                <div key="a" style={{border: '1px solid black'}}><SimpleTable/></div>
                <div key="b" style={{border: '1px solid black'}}>b</div>
                <div id="chart" key="c" style={{border: '1px solid black'}}>
                    <SimpleChart {...{width: chartWidth, height: chartHeight}}/>
                </div>
                <div key="d" style={{border: '1px solid black'}}>d</div>
            </GridLayout>
        );
    }
}