sap.ui.define([
    "sap/ui/core/Control",
    "sap/ui/core/HTML",
    "sap/ui/base/ManagedObject"
], function(Control, HTML, ManagedObject) {
    "use strict";
    return Control.extend("myapp.controls.Chart", {
        metadata: {
            properties: {
                width: { type: "string" },
                height: { type: "string" }
            },
            aggregations: {
                svgHtml: { type: "sap.ui.core.HTML", multiple: false, visibility: "hidden" },
                linePoints: { type: "sap.ui.base.ManagedObject" }
            },
            events: {
            }
        },
        init: function() {
            this.setAggregation("svgHtml", new sap.ui.core.HTML({
                content: "<svg width='100%' height='100%'></svg>"
            }));
        },
        onBeforeRendering: function() {
        },
        renderer: function(oRM, oControl) {
            oRM.write("<div");
            oRM.writeControlData(oControl);
            if (oControl.getWidth())
                oRM.addStyle("width", oControl.getWidth());
            if (oControl.getHeight())
                oRM.addStyle("height", oControl.getHeight());
            oRM.writeClasses();
            oRM.writeStyles();
            oRM.write(">");

            oRM.renderControl(oControl.getAggregation("svgHtml"));

            oRM.write("</div>");
            oControl.setBusy(0);
        },
        onAfterRendering: function() {

            var aLine = [];
            if (this.getBinding("linePoints")) {
                this.getBinding("linePoints").getContexts().forEach(function(oLineBindingContext) {
                    aLine.push(oLineBindingContext.getObject());
                });
            }


            var oVis = d3.select('#' + this.getAggregation("svgHtml").getId());
            var oMargin = { top: 20, right: 20, bottom: 30, left: 50 };
            var iWidth = 960 - oMargin.left - oMargin.right;
            var iHeight = 500 - oMargin.top - oMargin.bottom;

            // clear svg canvas
            oVis.selectAll("*").remove();

            // draw axes
            if (aLine.length <= 0)
                return;

            var xRange = d3.scale.linear().range([oMargin.left, iWidth - oMargin.right]).domain([d3.min(aLine, function(d) {
                return d.x;
            }), d3.max(aLine, function(d) {
                return d.x;
            })]);

            var yRange = d3.scale.linear().range([iHeight - oMargin.top, oMargin.bottom]).domain([d3.min(aLine, function(d) {
                return d.y;
            }), d3.max(aLine, function(d) {
                return d.y;
            })]);

            var xAxis = d3.svg.axis()
                .scale(xRange)
                .tickSize(5)
                .tickSubdivide(true);
            var yAxis = d3.svg.axis()
                .scale(yRange)
                .tickSize(5)
                .orient('left')
                .tickSubdivide(true);

            oVis.append('svg:g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(0,' + (iHeight - oMargin.bottom) + ')')
                .call(xAxis);

            oVis.append('svg:g')
                .attr('class', 'y axis')
                .attr('transform', 'translate(' + (oMargin.left) + ',0)')
                .call(yAxis);

            // draw line
            var oLineMaker = d3.svg.line()
                .x(function(d) { return xRange(d.x); })
                .y(function(d) { return yRange(d.y); })
                .interpolate('linear');

            oVis.append("svg:path")
                .data([aLine])
                .attr("d", oLineMaker)
                .attr('stroke', 'blue')
                .attr('stroke-width', 2)
                .attr('fill', 'none');
        }
    });
});