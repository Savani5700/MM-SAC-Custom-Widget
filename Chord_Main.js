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

            var time = Date.now();
            am4core.useTheme(am4themes_animated);
            var chart = am4core.create(this._root, am4charts.ChordDiagram);

            // colors of main characters
            chart.colors.saturation = 0.45;
            chart.colors.step = 3;
            var colors = {
                Rachel: chart.colors.next(),
                Monica: chart.colors.next(),
                Phoebe: chart.colors.next(),
                Ross: chart.colors.next(),
                Joey: chart.colors.next(),
                Chandler: chart.colors.next()
            }

            // data was provided by: https://www.reddit.com/user/notrudedude

            chart.data = [
                // node property fields take data from data items where they are first mentioned, that's 
                // why we add empty data items at the beginning and set colors here
                { "from": "Monica", "color": colors.Monica },
                { "from": "Rachel", "color": colors.Rachel },
                { "from": "Chandler", "color": colors.Chandler },
                { "from": "Ross", "color": colors.Ross },
                { "from": "Joey", "image": "joey.png", },
                { "from": "Phoebe", "image": "phoebe.png", "color": colors.Phoebe },

                // real data
                { "from": "Monica", "to": "Rachel", "value": 4 },
                { "from": "Monica", "to": "Chandler", "value": 113 },
                { "from": "Monica", "to": "Ross", "value": 16 },
                { "from": "Monica", "to": "Joey", "value": 9 },
                { "from": "Monica", "to": "Phoebe", "value": 3 },
                { "from": "Monica", "to": "Paul the wine guy", "value": 1 },
                { "from": "Monica", "to": "Mr Geller", "value": 6 },
                { "from": "Monica", "to": "Mrs Geller", "value": 5 },
                { "from": "Monica", "to": "Aunt Lilian", "value": 1 },
                { "from": "Monica", "to": "Nana", "value": 1 },
                { "from": "Rachel", "to": "Chandler", "value": 7 },
                { "from": "Rachel", "to": "Ross", "value": 80 },
                { "from": "Rachel", "to": "Joey", "value": 30 },
                { "from": "Rachel", "to": "Gavin", "value": 2 },
                { "from": "Chandler", "to": "Joey", "value": 1 },
                { "from": "Chandler", "to": "Phoebe", "value": 7 },
                { "from": "Chandler", "to": "Aurora", "value": 2 },
                { "from": "Chandler", "to": "Jill Goodacre", "value": 1 },
                { "from": "Chandler", "to": "Janice", "value": 11 },
                { "from": "Chandler", "to": "Mrs Bing", "value": 3 },
                { "from": "Chandler", "to": "Nina", "value": 1 },
                { "from": "Ross", "to": "Joey", "value": 3 },
                { "from": "Ross", "to": "Phoebe", "value": 18 },
                { "from": "Ross", "to": "Carol", "value": 10 },
                { "from": "Ross", "to": "Mrs Geller", "value": 8 },
                { "from": "Ross", "to": "Aunt Lilian", "value": 1 },
                { "from": "Ross", "to": "Mrs Bing", "value": 3 },
                { "from": "Ross", "to": "Celia", "value": 2 },
                { "from": "Joey", "to": "Phoebe", "value": 6 },
                { "from": "Joey", "to": "Janice", "value": 1 },
                { "from": "Joey", "to": "Lorraine", "value": 2 },
                { "from": "Joey", "to": "Melanie", "value": 2 },
                { "from": "Joey", "to": "Erica", "value": 2 },
                { "from": "Joey", "to": "Mrs Green", "value": 1 },
                { "from": "Joey", "to": "Kate", "value": 4 },
                { "from": "Joey", "to": "Lauren", "value": 2 }]



            chart.dataFields.fromName = "from";
            chart.dataFields.toName = "to";
            chart.dataFields.value = "value";


            chart.nodePadding = 0.5;
            chart.minNodeSize = 0.01;
            chart.startAngle = 80;
            chart.endAngle = chart.startAngle + 360;
            chart.sortBy = "value";

            var nodeTemplate = chart.nodes.template;
            nodeTemplate.readerTitle = "Click to show/hide or drag to rearrange";
            nodeTemplate.showSystemTooltip = true;
            nodeTemplate.propertyFields.fill = "color";
            nodeTemplate.tooltipText = "{name}'s kisses: {total}";

            // when rolled over the node, make all the links rolled-over
            nodeTemplate.events.on("over", function (event) {
                var node = event.target;
                node.outgoingDataItems.each(function (dataItem) {
                    if (dataItem.toNode) {
                        dataItem.link.isHover = true;
                        dataItem.toNode.label.isHover = true;
                    }
                })
                node.incomingDataItems.each(function (dataItem) {
                    if (dataItem.fromNode) {
                        dataItem.link.isHover = true;
                        dataItem.fromNode.label.isHover = true;
                    }
                })

                node.label.isHover = true;
            })

            // when rolled out from the node, make all the links rolled-out
            nodeTemplate.events.on("out", function (event) {
                var node = event.target;
                node.outgoingDataItems.each(function (dataItem) {
                    if (dataItem.toNode) {
                        dataItem.link.isHover = false;
                        dataItem.toNode.label.isHover = false;
                    }
                })
                node.incomingDataItems.each(function (dataItem) {
                    if (dataItem.fromNode) {
                        dataItem.link.isHover = false;
                        dataItem.fromNode.label.isHover = false;
                    }
                })

                node.label.isHover = false;
            })

            var label = nodeTemplate.label;
            label.relativeRotation = 90;

            label.fillOpacity = 0.25;
            var labelHS = label.states.create("hover");
            labelHS.properties.fillOpacity = 1;

            nodeTemplate.cursorOverStyle = am4core.MouseCursorStyle.pointer;
            // this adapter makes non-main character nodes to be filled with color of the main character which he/she kissed most
            nodeTemplate.adapter.add("fill", function (fill, target) {
                var node = target;
                var counters = {};
                var mainChar = false;
                node.incomingDataItems.each(function (dataItem) {
                    if (colors[dataItem.toName]) {
                        mainChar = true;
                    }

                    if (isNaN(counters[dataItem.fromName])) {
                        counters[dataItem.fromName] = dataItem.value;
                    }
                    else {
                        counters[dataItem.fromName] += dataItem.value;
                    }
                })
                if (mainChar) {
                    return fill;
                }

                var count = 0;
                var color;
                var biggest = 0;
                var biggestName;

                for (var name in counters) {
                    if (counters[name] > biggest) {
                        biggestName = name;
                        biggest = counters[name];
                    }
                }
                if (colors[biggestName]) {
                    fill = colors[biggestName];
                }

                return fill;
            })

            // link template
            var linkTemplate = chart.links.template;
            linkTemplate.strokeOpacity = 0;
            linkTemplate.fillOpacity = 0.1;
            linkTemplate.tooltipText = "{fromName} & {toName}:{value.value}";

            var hoverState = linkTemplate.states.create("hover");
            hoverState.properties.fillOpacity = 0.7;
            hoverState.properties.strokeOpacity = 0.7;

        }
    }
    customElements.define('com-sap-sample-chord-prepared', SamplePrepared)

})()
