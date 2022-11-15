var getScriptPromisify = (src) => {
    return new Promise(resolve => {
        $.getScript(src, resolve)
    })
}

(function () {

    //Chart Block in HTML
    const prepared = document.createElement('template')
    prepared.innerHTML = `
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

            this.addEventListener("click", event => {
                var event = new Event("onClick");
                this.dispatchEvent(event);

            });

            //_props object is used to hold properties information
            this._props = {}

            //Call render() method to plot chart
            //         this.render(this.resultSet, this.DimID, this.WF1, this.WF2)
        }

        onCustomWidgetAfterUpdate() {
            //         this.render(this.resultSet, this.DimID, this.WF1, this.WF2);
        }

        //render() method to plot chart - resultSet1 holds data from SAC table/chart.
        async render(resultSet1, DimID1, WF11, WF21) {




            await getScriptPromisify('https://cdn.plot.ly/plotly-2.3.0.min.js');

            var dim1 = [];
            var dimid = [];
            var measure1 = [];
            var valuetype = [];
            var w1 = 0;
            var w2 = 0;
            var m = 0;
            var name = '';
            var namelen = 0;
            var btm = 70;

            var total = 0;

            var recordCount = resultSet1.length;

            if (recordCount >= 6) {
                w1 = Math.round(resultSet1[recordCount - 3]["@MeasureDimension"].rawValue);
                measure1.push(w1);
                dim1.push(WF11);
                dimid.push(WF11);
                total = total + w1;

                w2 = Math.round(resultSet1[recordCount - 2]["@MeasureDimension"].rawValue);

                m = Math.round(resultSet1[2]["@MeasureDimension"].rawValue);
                measure1.push(m);
                total = total + m;

                name = resultSet1[2][DimID1].description;
                namelen = name.length;
                dim1.push(name);
                dimid.push(resultSet1[2][DimID1].id);
                valuetype.push("absolute");
                valuetype.push("relative");
            }

            if (recordCount >= 9) {
                m = Math.round(resultSet1[5]["@MeasureDimension"].rawValue);
                measure1.push(m);
                total = total + m;

                name = resultSet1[5][DimID1].description;
                if (namelen < name.length) {
                    namelen = name.length;
                }
                dim1.push(name);
                dimid.push(resultSet1[5][DimID1].id);
                valuetype.push("relative");
            }

            if (recordCount >= 12) {
                m = Math.round(resultSet1[8]["@MeasureDimension"].rawValue);
                measure1.push(m);
                total = total + m;

                name = resultSet1[8][DimID1].description;
                if (namelen < name.length) {
                    namelen = name.length;
                }
                dim1.push(name);
                dimid.push(resultSet1[8][DimID1].id);
                valuetype.push("relative");
            }

            if (recordCount >= 15) {
                m = Math.round(resultSet1[11]["@MeasureDimension"].rawValue);
                measure1.push(m);
                total = total + m;

                name = resultSet1[11][DimID1].description;
                if (namelen < name.length) {
                    namelen = name.length;
                }
                dim1.push(name);
                dimid.push(resultSet1[11][DimID1].id);
                valuetype.push("relative");
            }

            if (recordCount > 15) {
                total = w2 - total;
                measure1.push(total);
                dim1.push('Other');
                dimid.push('Other');
                valuetype.push("relative");
            }

            if (recordCount >= 6) {

                measure1.push(w2);
                dim1.push(WF21);
                dimid.push(WF21);
                valuetype.push("total");
            }

            console.log(resultSet1);
            console.log(measure1);
            console.log(dim1);
            console.log(namelen);

            if (namelen >= 20) {
                btm = 100;
            }

            Plotly.newPlot(this._root,
                [
                    {
                        name: "",
                        type: "waterfall",
                        orientation: "v",
                        measure: valuetype,
                        x: dimid,
                        textposition: "outside",
                        text: measure1,
                        y: measure1,
                        increasing: {
                            marker: {
                                color: "rgb(242,0,105)"
                            }
                        },
                        decreasing: {
                            marker: {
                                color: "rgb(119,211,111)"
                            }
                        },
                        totals: {
                            marker: {
                                color: "rgb(15,125,175)"
                            }
                        },
                        connector: {
                            line: {
                                color: "rgb(63, 63, 63)"
                            }
                        },
                    }
                ],
                {
                    title: {
                        text: ""
                    },
                    xaxis: {
                        type: "category",
                        fixedrange: true,
                        tickmode: 'array',
                        ticktext: dim1,
                        tickvals: dimid
                    },
                    yaxis: {
                        type: "linear",
                        showgrid: false,
                        fixedrange: true,
                        tickfont: {
                            color: 'white'
                        }
                    },
                    margin: {
                        l: 20,
                        r: 20,
                        t: 80,
                        b: btm
                    },
                },
                {
                    displayModeBar: false
                }
            );

        }
    }
    customElements.define('com-sap-sample-waterfallplotly-prepared', SamplePrepared)
})()
