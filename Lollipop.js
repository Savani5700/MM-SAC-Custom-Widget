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

            var data = [];
            var value = 120;

            var names = ["Raina",
                "Demarcus",
                "Carlo",
                "Jacinda",
                "Richie",
                "Antony",
                "Amada",
                "Idalia",
                "Janella",
                "Marla",
                "Curtis",
                "Shellie",
                "Meggan",
                "Nathanael",
                "Jannette",
                "Tyrell",
                "Sheena",
                "Maranda",
                "Briana",
                "Rosa",
                "Rosanne",
                "Herman",
                "Wayne",
                "Shamika",
                "Suk",
                "Clair",
                "Olivia",
                "Hans",
                "Glennie",
            ];

            for (var i = 0; i < names.length; i++) {
                value += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 5);
                data.push({ category: names[i], value: value });
            }

            chart.data = data;
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.dataFields.category = "category";
            categoryAxis.renderer.minGridDistance = 15;
            categoryAxis.renderer.grid.template.location = 0.5;
            categoryAxis.renderer.grid.template.strokeDasharray = "1,3";
            categoryAxis.renderer.labels.template.rotation = -90;
            categoryAxis.renderer.labels.template.horizontalCenter = "left";
            categoryAxis.renderer.labels.template.location = 0.5;

            categoryAxis.renderer.labels.template.adapter.add("dx", function (dx, target) {
                return -target.maxRight / 2;
            })

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.tooltip.disabled = true;
            valueAxis.renderer.ticks.template.disabled = true;
            valueAxis.renderer.axisFills.template.disabled = true;

            var series = chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.categoryX = "category";
            series.dataFields.valueY = "value";
            series.tooltipText = "{valueY.value}";
            series.sequencedInterpolation = true;
            series.fillOpacity = 0;
            series.strokeOpacity = 1;
            series.strokeDashArray = "1,3";
            series.columns.template.width = 0.01;
            series.tooltip.pointerOrientation = "horizontal";

            var bullet = series.bullets.create(am4charts.CircleBullet);

            chart.cursor = new am4charts.XYCursor();

            chart.scrollbarX = new am4core.Scrollbar();
            chart.scrollbarY = new am4core.Scrollbar();

        }
    }
    customElements.define('com-sap-sample-lollipop-prepared', SamplePrepared)
})()
