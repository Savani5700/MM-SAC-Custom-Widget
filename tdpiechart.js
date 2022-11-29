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

      // this.render(this._resultset)
    }

    // onCustomWidgetResize(width, height) {
    //   // this.render()
    // }

    async render(resultset1) {
      await getScriptPromisify('https://cdn.amcharts.com/lib/4/core.js');
      await getScriptPromisify('https://cdn.amcharts.com/lib/4/themes/animated.js');
      await getScriptPromisify('https://cdn.amcharts.com/lib/4/charts.js');

      // Themes begin
      am4core.useTheme(am4themes_animated);
      // Themes end

      var chart = am4core.create(this._root, am4charts.PieChart3D);
      chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

      var data = [];

      for(var i=0; i<resultset1.length;i++){
        var a ={
        category : resultset1[i]["Category"].description,
        salestarget : resultset1[i]["Account"].rawValue
        }
      }
      chart.data = data;
      // chart.data = [
      //   {
      //     country: "Lithuania",
      //     litres: 501.9
      //   },
      //   {
      //     country: "Czech Republic",
      //     litres: 301.9
      //   },
      //   {
      //     country: "Ireland",
      //     litres: 201.1
      //   },
      //   {
      //     country: "Germany",
      //     litres: 165.8
      //   },
      //   {
      //     country: "Australia",
      //     litres: 139.9
      //   },
      //   {
      //     country: "Austria",
      //     litres: 128.3
      //   }
      // ];

      chart.innerRadius = am4core.percent(40);
      chart.depth = 120;

      chart.legend = new am4charts.Legend();

      var series = chart.series.push(new am4charts.PieSeries3D());
      series.dataFields.value = "salestarget";
      series.dataFields.depthValue = "salestarget";
      series.dataFields.category = "Category";
      series.slices.template.cornerRadius = 5;
      series.colors.step = 3;

    }
  }
  customElements.define('com-sap-sample-tdpiechart-prepared', SamplePrepared)
})()

