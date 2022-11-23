var getScriptPromisify = (src) => {
return new Promise(resolve => {
$.getScript(src, resolve)
})
}

(function () {
const prepared = document.createElement('template')
prepared.innerHTML = `
<style>
</style>
<div id="root" style="width: 100%; height: 100%;">
</div>
`
class SamplePrepared extends HTMLElement {
constructor() {
super()

this._shadowRoot = this.attachShadow({ mode: 'open' })
this._shadowRoot.appendChild(prepared.content.cloneNode(true))

this._root = this._shadowRoot.getElementById('root')

this._props = {}

this.render()
}

onCustomWidgetResize(width, height) {
this.render()
}

async render() {
await getScriptPromisify('hhttps://www.amcharts.com/lib/4/charts.js')
await getScriptPromisify('https://www.amcharts.com/lib/4/core.js')

/* am4core.useTheme(am4themes_animated); */

// Create chart instance
var chart = am4core.create("chartdiv", am4charts.XYChart);

// Add data
chart.data = [{
  "date": new Date(2018, 3, 20),
  "v1":50,
  "rf":70
}, {
  "date": new Date(2018, 3, 21),
  "v1":35,
  "rf":70
}, {
  "date": new Date(2018, 3, 22),
  "value": 100,
  "value1": 88,
  "v1":15,
  "rf":70
}, {
  "date": new Date(2018, 3, 23), 
  "v1":70,
  "rf":70
}, {
  "date": new Date(2018, 3, 24),
  "v1":60,
  "rf":70
}, {
  "date": new Date(2018, 3, 25),
  "v1":55,
  "rf":70
}, {
  "date": new Date(2018, 3, 26),
  "value": 100,
  "value1": 88,
  "v1":55,
  "rf":70
}, {
  "date": new Date(2018, 3, 27),
  "v1":55,
  "rf":70
}, {
  "date": new Date(2018, 3, 28),
  "value": 100,
  "value1": 88,
  "v1":55,
  "rf":70
}, {
  "date": new Date(2018, 3, 29),
  "v1":55,
  "rf":70
}, {
  "date": new Date(2018, 3, 30),
  "v1":55,
  "rf":70
}];

// Create axes
var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
/* dateAxis.startLocation = 1;
dateAxis.endLocation = 0; */
dateAxis.renderer.minGridDistance = 1;

// Create value axis
var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.max=100;

var ranges1 = dateAxis.axisRanges.create();
ranges1.date = new Date(2018, 3, 21);
ranges1.grid.stroke = am4core.color("red");
ranges1.grid.strokeWidth = 4;
ranges1.opacity = 1;
ranges1.label.text = "[bold]|"+"[normal] Gx Entry-Date : "+"[bold]{date}";
ranges1.label.dy = -355.5;
ranges1.label.dx = 88 ;
ranges1.label.fill = "#616161";

var seriesA = chart.series.push(new am4charts.LineSeries());
seriesA.dataFields.valueY = "v1";
seriesA.dataFields.dateX = "date";
seriesA.tooltipText = "{dateX} : {valueY}";

var seriesRF = chart.series.push(new am4charts.LineSeries());
seriesRF.dataFields.valueY = "rf";
seriesRF.dataFields.dateX = "date";
seriesRF.strokeDasharray = "3,3"
seriesRF.tooltipText = "{dateX} : {valueY}";

var ranges1 = dateAxis.axisRanges.create();
ranges1.date = new Date(2018, 3, 25);
ranges1.endDate = new Date(2018, 3, 30);
ranges1.axisFill.fill = am4core.color("#FF0000");
ranges1.grid.disabled = true;
ranges1.axisFill.fillOpacity = 0.1;
ranges1.label.inside = true;
ranges1.label.text = "[bold]|"+"[normal] Gx Entry-Date : "+"[bold]{date}";
ranges1.label.dy = -314.86;
ranges1.label.dx = 88 ;
ranges1.label.fill = "#FF0000";

var ranges1 = dateAxis.axisRanges.create();
ranges1.date = new Date(2018, 3, 22);
console.log(ranges1.date);
ranges1.endDate = new Date(2018, 3, 27);
ranges1.axisFill.fill = am4core.color("#0000FF");
ranges1.grid.disabled = true;
ranges1.axisFill.fillOpacity = 0.1;
ranges1.label.inside = true;
ranges1.label.text = "[bold]|"+"[normal] Gx Entry-Date : "+"[bold]{date}";
ranges1.label.dy = -295.5;
ranges1.label.dx = 89 ;
ranges1.label.fill = "#0000FF";

/* ranges1.label.inside = true; */
var ranges1 = dateAxis.axisRanges.create();
ranges1.date = new Date(2018, 3, 29);
ranges1.grid.stroke = am4core.color("green");
ranges1.grid.strokeWidth = 4;
ranges1.grid.strokeDasharray = "3,3";
dateAxis.cursorTooltipEnabled = false;
valueAxis.cursorTooltipEnabled = false;

chart.cursor = new am4charts.XYCursor();
chart.dateFormatter.dateFormat = "MMM-yyyy";

chart.scrollbarX = new am4core.Scrollbar();
chart.scrollbarX.parent = chart.bottomAxesContainer;
chart.scrollbarX.endGrip.icon.disabled = true; 
chart.scrollbarX.startGrip.icon.disabled = true;
/* chart.scrollbarX.grip.icon.disabled = true; */ 

chart.scrollbarX.minHeight = 5;

chart.cursor.behavior = "none";

}
}
customElements.define('com-sap-sample-stackbar-prepared', SamplePrepared)
})()
