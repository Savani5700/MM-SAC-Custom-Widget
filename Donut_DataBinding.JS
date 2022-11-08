var getScriptPromisify = (src) => {
  return new Promise(resolve => {
    $.getScript(src, resolve)
  })
  }
  
  (function () {
  
  //Chart Block in HTML Darshan Savani
  const prepared = document.createElement('template')
  prepared.innerHTML = `
  <style>
  </style>
  <div id="root" style="width: 100%; height: 100%;">
  </div>
    `
  //Main JS Class holds methods to be called
  class SamplePrepared extends HTMLElement {
    constructor() {
  
      //call SAC DOM Super method to get shadow DOM information
      super()
  
      //Get shadow DOM informations
      this._shadowRoot = this.attachShadow({ mode: 'open' })
      this._shadowRoot.appendChild(prepared.content.cloneNode(true))
  
      //Set HTML block in shadow DOM of SAC
      this._root = this._shadowRoot.getElementById('root')
  
      //_props object is used to hold properties infosrmation
      this._props = {}
  
      //Call render() method to plot chart
      this.render()
  
    }
  
    onCustomWidgetResize (width, height) {
      this.render()
    }
  
    //render() method to plot chart - resultSet1 holds data from SAC table/chart.
    set myDataSource (dataBinding) {
      this._myDataSource = dataBinding
      this.render()
    }
  
    async render() {
      await getScriptPromisify('https://fastly.jsdelivr.net/npm/echarts@5/dist/echarts.min.js');
  
      var dom = document.getElementById('chart-container');
      var myChart = echarts.init(dom, null, {
        renderer: 'canvas',
        useDirtyRect: false
      });
      var app = {};
      
      var option;
      
      option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      };
      
      if (option && typeof option === 'object') {
        myChart.setOption(option);
      }
      
      window.addEventListener('resize', myChart.resize);
  
    }
  }
  customElements.define('com-sap-sample-donut-prepared', SamplePrepared)
  })()
  
