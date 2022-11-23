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
      await getScriptPromisify('https://cdn.amcharts.com/lib/4/core.js');
      await getScriptPromisify('https://cdn.amcharts.com/lib/4/themes/animated.js');
      await getScriptPromisify('https://cdn.amcharts.com/lib/4/charts.js');

      // Themes begin
      am4core.useTheme(am4themes_animated);
      // Themes end

      // Create chart instance
      var chart = am4core.create(this._root, am4charts.XYChart);

      // Add data
      chart.data = [{
        "year": "2000",
        "europe": 2.5,
        "namerica": 2.5,
        "asia": 2.1,
        "lamerica": 1.2,
        "meast": 0.2,
        "africa": -0.2
      }, {
        "year": "2001",
        "europe": 2.5,
        "namerica": 0.5,
        "asia": 2.1,
        "lamerica": 1.2,
        "meast": 0.2,
        "africa": -0.15
      }, {
        "year": "2002",
        "europe": 2.8,
        "namerica": 2.9,
        "asia": -2.4,
        "lamerica": 1.4,
        "meast": -0.3,
        "africa": 0.3
      },
      {
        "year": "2003",
        "europe": 2.5,
        "namerica": -2.5,
        "asia": 2.1,
        "lamerica": 1.2,
        "meast": 0.2,
        "africa": -0.1
      }, {
        "year": "2004",
        "europe": 2.6,
        "namerica": 2.7,
        "asia": -2.2,
        "lamerica": 1.3,
        "meast": 0.3,
        "africa": 0.1
      }, {
        "year": "2005",
        "europe": 2.8,
        "namerica": 2.9,
        "asia": -2.4,
        "lamerica": 1.4,
        "meast": -0.3,
        "africa": 0.2
      }, {
        "year": "2006",
        "europe": 2.8,
        "namerica": 2.9,
        "asia": -2.4,
        "lamerica": 1.4,
        "meast": -0.3,
        "africa": 0.2
      }, {
        "year": "2007",
        "europe": 2.5,
        "namerica": 2.5,
        "asia": 2.1,
        "lamerica": 1.2,
        "meast": 0.2,
        "africa": -0.2
      }, {
        "year": "2008",
        "europe": 2.8,
        "namerica": 2.9,
        "asia": -2.4,
        "lamerica": 1.4,
        "meast": -0.3,
        "africa": 0.2
      }, {
        "year": "2009",
        "europe": 2.5,
        "namerica": 0.5,
        "asia": 2.1,
        "lamerica": 1.2,
        "meast": 0.2,
        "africa": -0.15
      }, {
        "year": "2010",
        "europe": 2.8,
        "namerica": 5,
        "asia": -2.4,
        "lamerica": 1.4,
        "meast": -0.3,
        "africa": 0.4
      }, {
        "year": "2011",
        "europe": 2.8,
        "namerica": 2.9,
        "asia": -2.4,
        "lamerica": 1.4,
        "meast": -0.3,
        "africa": 0.2
      }, {
        "year": "2012",
        "europe": 2.5,
        "namerica": 0.5,
        "asia": 2.1,
        "lamerica": 1.2,
        "meast": 0.2,
        "africa": -0.15
      }
      ];

      // Create axes
      var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "year";
      categoryAxis.title.text = "Profit & Loss Summary";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 20
      categoryAxis.renderer.cellStartLocation = 0.1;
      categoryAxis.renderer.cellEndLocation = 0.9;
      categoryAxis.renderer.grid.template.strokeWidth = 0.2;

      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.min = 0;
      valueAxis.title.text = "Sales, COGS";
      var valueAxis1 = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis1.renderer.opposite = true;
      valueAxis1.title.text = "Profit Loss";
      valueAxis1.renderer.grid.template.strokeWidth = 0;
      // Configure number formatter
      valueAxis.numberFormatter.numberFormat = '$#,###.#M';

      // Create series
      function createSeries(field, name, stacked, yaxis, color) {
        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = field;
        series.yAxis = yaxis;
        series.dataFields.categoryX = "year";
        series.name = name;
        series.columns.template.tooltipText = "{name}: [bold]{valueY}[/]";
        series.stacked = stacked;
        series.columns.template.width = am4core.percent(95);

        series.columns.template.adapter.add("fill", function (fill, target) {
          if (target.dataItem && (target.dataItem.valueY < 0)) {
            return am4core.color("#ff4a4a");
          } else {
            return am4core.color(color);
          }
        });
        series.columns.template.width = am4core.percent(100);
        /*  
         let bullet = series.bullets.push(new am4charts.LabelBullet);
         
                                          bullet.label.text = "{valueY}"; */
      }

      createSeries("europe", "COGS", false, valueAxis, "#204666");
      createSeries("namerica", "Sales", true, valueAxis, "#f3b026");
      createSeries("africa", "Profit", true, valueAxis1, "#02a264");

      // Add legend
      /* chart.legend = new am4charts.Legend(); */

    }
  }
  customElements.define('com-sap-sample-stackbar-prepared', SamplePrepared)
})()
