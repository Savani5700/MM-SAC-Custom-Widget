
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
            await getScriptPromisify('https://cdn.bootcdn.net/ajax/libs/echarts/5.0.0/echarts.min.js')

            const chart = echarts.init(this._root)
            var data = [];

            const option = {
                title: {
                  text: 'Accumulated Waterfall Chart'
                },
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                    type: 'shadow'
                  },
                  formatter: function (params) {
                    let tar;
                    if (params[1].value !== '-') {
                      tar = params[1];
                    } else {
                      tar = params[0];
                    }
                    return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
                  }
                },
                legend: {
                  data: ['Expenses', 'Income']
                },
                grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true
                },
                xAxis: {
                  type: 'category',
                  data: (function () {
                    let list = [];
                    for (let i = 1; i <= 11; i++) {
                      list.push('Nov ' + i);
                    }
                    return list;
                  })()
                },
                yAxis: {
                  type: 'value'
                },
                series: [
                  {
                    name: 'Placeholder',
                    type: 'bar',
                    stack: 'Total',
                    itemStyle: {
                      borderColor: 'transparent',
                      color: 'transparent'
                    },
                    emphasis: {
                      itemStyle: {
                        borderColor: 'transparent',
                        color: 'transparent'
                      }
                    },
                    data: [0, 900, 1245, 1530, 1376, 1376, 1511, 1689, 1856, 1495, 1292]
                  },
                  {
                    name: 'Income',
                    type: 'bar',
                    stack: 'Total',
                    label: {
                      show: true,
                      position: 'top'
                    },
                    data: [900, 345, 393, '-108', '-154', 135, 178, 286, '-119', '-361', '-203']
                  },
//                   {
//                     name: 'Expenses',
//                     type: 'bar',
//                     stack: 'Total',
//                     label: {
//                       show: true,
//                       position: 'bottom'
//                     },
//                     data: ['-', '-', '-', 108, 154, '-', '-', '-', 119, 361, 203]
//                   }
                ]
              };

            chart.setOption(option)

        }
    }
    customElements.define('com-sap-sample-waterfall-prepared', SamplePrepared)
})()


