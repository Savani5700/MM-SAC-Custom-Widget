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

            am4core.useTheme(am4themes_animated);

            var chart = am4core.create(this._root, am4charts.XYChart);
            chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

            chart.data = [
              {
                country: "Lithuania",
                value: 260
              },
              {
                country: "Czechia",
                value: 230
              },
              {
                country: "Ireland",
                value: 200
              },
              {
                country: "Germany",
                value: 165
              },
              {
                country: "Australia",
                value: 139
              },
              {
                country: "Austria",
                value: 128
              }
            ];
            
            var series = chart.series.push(new am4charts.PieSeries());
            series.dataFields.value = "value";
            series.dataFields.radiusValue = "value";
            series.dataFields.category = "country";
            series.slices.template.cornerRadius = 6;
            series.colors.step = 3;
            
            series.hiddenState.properties.endAngle = -90;
            
            chart.legend = new am4charts.Legend();

        }
    }
    customElements.define('com-sap-sample-radiuspie-prepared', SamplePrepared)
})()
