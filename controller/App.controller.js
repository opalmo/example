sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function(Controller, JSONModel, MessageToast) {
    "use strict";
    return Controller.extend("myapp.controller.App", {
        
        onBeforeRendering: function() {

        },
        onInit: function() {
            // init model
            var oModel = new JSONModel({});
            this.getView().setModel(oModel);
        },
        onUse10LinearPoints: function(oEvent) {
            var aLinePoints = [];
            for (var i=0; i<10; i++) {
                aLinePoints.push({x:i, y:i});
            }
            this.getView().getModel().setProperty("/linePoints", aLinePoints);
            this.getView().getModel().refresh(true); // trigger rerendering affected controls
        },
        onUse10RandomPoints: function(oEvent) {
            var aLinePoints = [];
            for (var i=0; i<10; i++) {
                aLinePoints.push({x:i, y:Math.random()*100});
            }
            this.getView().getModel().setProperty("/linePoints", aLinePoints);
            this.getView().getModel().refresh(true); // trigger rerendering affected controls
        },
        onUse50RandomPoints: function(oEvent) {
            var aLinePoints = [];
            for (var i=0; i<50; i++) {
                aLinePoints.push({x:i, y:Math.random()*100});
            }
            this.getView().getModel().setProperty("/linePoints", aLinePoints);
            this.getView().getModel().refresh(true); // trigger rerendering affected controls
        }
    });
});