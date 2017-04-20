# Description

## What goes wrong?
This example uses a custom control, which receives plain js objects as input. To allow data binding the control uses an aggregation of type "ManagedObject". Unfortunately the control only gets rerendered when the aggregation's length (number of objects) changes - but not when a single objects changes (probably this only affects the wrapping ManagedObject).

Example:
Press the buttons in the following order:
* this works: "Linear Line with 10 Points" -> "Random Line with 50 Points" -> "Random Line with 10 Points"
* this does not work, because the control will not get rerendered: * "Linear Line with 10 Points" -> "Random Line with 10 Points"

## About the code
- 1 controller with an xml-view called "App" -> find in /controller/App.controller.js and /view/App.view.xml
- 1 custom control to draw the diagram called "Chart" -> find in /controls/Chart.js
    - the chart control uses an aggregation called "linePoints" to receive the displayed data points
    - the aggregation is defined of type "ManagedObject" to allow data binding of plain js objects
