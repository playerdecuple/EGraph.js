/*
 * EGraph.js by DEVELOPER_DECUPLE, Idea by rococpy
 *  # GITHUB : https://github.com/playerdecuple
 *  # TWITTER : https://twitter.com/playerdecuple
 * 
 * "DRAW GRAPHS EASIER" : EGraph.js
 *  # License : DECUPLE Library License
 *     - Include 'EGrpah.js : Powered by DEVELOPER_DECUPLE' in your code or output.
 *     - The following are allowed:
 *       * Allow everything (However, sales are excluded.)
 *  # Version : 1.0-Snapshot
 */


const Graph = {
    // @param canvasElement: String | Selector of canvas element
    // @param graphOption: Object   | Data and style options of graph

    /*
     * @param graphOption - Keys
     * 
     * graphOption.type: String - Type of graph
     *  - barVertical : Vertical Bar Graph
     *  - barHorizon : Horizontal Bar Graph
     *  - circle : Circle Graph
     *  - donut : Donut Graph
     *  - line : Line Graph
     *  - bezierLine : Curved Line Graph
     * 
     * graphOption.color: String or Array - Color of graph (default : black)
     *  > String: barVertical, barHorizon, line, bezierLine
     *  > Array:  circle, donut
     * 
     * graphOption.textColor: String - Color of text (default: graphOption.color)
     * 
     * graphOption.barWidth: Number - Width of bar graph (Only works for bar graphs)
     * 
     * graphOption.yScale: Number - Height scale of graph 
     *  > Works for : barVertical, barHorizon, line, bezierLine
     * 
     * graphOption.marginLeft: Number
     * 
     * graphOption.font: String - Font setting of text in graph
     *  ex) font: '21px serif'
     * 
     * graphOption.background: Boolean - Show background line
     * 
     * graphOption.data: Array - Value of Graph
     * 
     * graphOption.xAxisData : Array - Key of Graph
     * 
     * graphOption.dotType: String - Show dot and setting style of dot
     *  - square: set dot's shape to square. (default)
     *  - circle: set dot's shape to circle.
     * 
     * graphOption.dataLabel: Boolean - Show data label.
     * 
     * graphOption.r: Number - Radius of circle graph (Only works for circle graph)
     * 
     * graphOption.innerR: Number - Radius of inner circle graph (Only works for donut graph)
     * 
     * graphOption.angleDirection: Boolean - Set angle direction of graph
     *  - true:  clockwise
     *  - false: counterclockwise
     * 
     * graphOption.roundGraph: Boolean - Round-ended bar graph
     */
    
    drawGraph(canvasElement, graphOption = {}) {
        const canvas = typeof canvasElement == "string" 
            ? document.querySelector(canvasElement) 
            : canvasElement;

        const context = canvas.getContext('2d');

        
        if (!graphOption.type) graphOption.type = 'barVertical';
        if (!graphOption.color) graphOption.color = 'black';
        if (!graphOption.barWidth) graphOption.barWidth = 10;
        if (!graphOption.yScale) graphOption.yScale = 1;
        if (!graphOption.marginLeft) graphOption.marginLeft = 5;
        if (!graphOption.font) graphOption.font = "16px sans-serif";
        if (graphOption.type != "donut" 
            && graphOption.type != "circle" 
            && typeof graphOption.color == "object") {
                graphOption.color = graphOption.color[0];
            }


        switch (graphOption.type) {
            case "barVertical": 
                if (graphOption.background == true) {
                    for (let i = canvas.height - 30; i > 0; i -= (canvas.height * graphOption.yScale) / 3) {
                        context.beginPath();
                        context.strokeStyle = "#ddd";
                        context.moveTo(0, i);
                        context.lineTo(canvas.width, i);
                        context.stroke();
                        context.closePath();
                    }
                }

                graphOption.data.forEach((v, i) => {
                    const x = i * (canvas.width / graphOption.data.length) + graphOption.barWidth + (graphOption.marginLeft / 2);
                    const y = canvas.height - 30 - (v * graphOption.yScale);
                    const w = graphOption.barWidth;
                    const h = v * graphOption.yScale;
        
                    context.beginPath();
                    
                    context.fillStyle = graphOption.color;
                    context.fillRect(x - (w / 2), y, w, h);

                    if (graphOption.roundGraph == true) {
                        context.moveTo(x, y);
                        context.arc(x, y, w / 2, 0, Math.PI * 2);
                        context.fill();
                    }

                    context.fillStyle = graphOption.textColor
                        ? graphOption.textColor
                        : graphOption.color;
                    if (graphOption.font) context.font = graphOption.font;
                    context.textAlign = "center";
                    context.fillText(graphOption.xAxisData[i], x, canvas.height - 10);

                    if (graphOption.dataLabel == true) {
                        context.font = `13px ${graphOption.font.split(" ")[1]}`;
                        context.fillText(v, x, y - 10);
                    }

                    context.closePath();
                });
                break;
            case "barHorizon":
                if (graphOption.background == true) {
                    for (let i = 70; i < canvas.width; i += (canvas.width * graphOption.yScale) / 3) {
                        context.beginPath();
                        context.strokeStyle = "#ddd";
                        context.moveTo(i, 0);
                        context.lineTo(i, canvas.height);
                        context.stroke();
                        context.closePath();
                    }
                }

                graphOption.data.forEach((v, i) => {
                    const x = i * (canvas.height / graphOption.data.length) + graphOption.barWidth + (graphOption.marginLeft / 2);
                    const y = 70 + (graphOption.barWidth / 2);
                    const w = graphOption.barWidth;
                    const h = v * graphOption.yScale;
        
                    context.beginPath();
                    
                    context.fillStyle = graphOption.color;
                    context.fillRect(y - (w / 2), x, h, w);

                    if (graphOption.roundGraph == true) {
                        context.moveTo(y, x);
                        context.arc(h + 70, x + (graphOption.barWidth / 2), w / 2, 0, Math.PI * 2);
                        context.fill();
                    }

                    context.fillStyle = graphOption.textColor
                        ? graphOption.textColor
                        : graphOption.color;
                    if (graphOption.font) context.font = graphOption.font;
                    context.textAlign = "left";
                    context.fillText(graphOption.xAxisData[i], 0, x + graphOption.barWidth);

                    if (graphOption.dataLabel == true) {
                        context.font = `13px ${graphOption.font.split(" ")[1]}`;
                        context.fillText(v, h + 90 + (graphOption.barWidth / 2), x + graphOption.barWidth);
                    }

                    context.closePath();
                });
                break;
            case "circle":
                let lastAngle = Math.PI / -2;
                if (graphOption.startAngle) lastAngle += startAngle * (Math.PI / 180)
                graphOption.data.forEach((v, i) => {
                    const angleDirection = graphOption.angleDirection == true ? true : false;
                    const x = canvas.width / 2;
                    const y = canvas.height / 2;
                    const r = graphOption.r
                        ? graphOption.r
                        : canvas.width <= canvas.height
                            ? canvas.width / 2
                            : canvas.height / 2;
                    const deg = ((v / graphOption.data.reduce((acc, w) => acc + w, 0)) * 360);
                    const rad = deg * (Math.PI / 180);


                    context.beginPath();

                    context.moveTo(x, y);
                    context.fillStyle = 
                        typeof graphOption.color != 'object' 
                        || i >= graphOption.color.length
                            ? "black"
                            : graphOption.color[i];
                    context.arc(x, y, r, lastAngle, lastAngle + rad, angleDirection);
                    context.fill();

                    context.closePath();

                    
                    lastAngle += rad;
                });
                break;
            case "donut":
                const newOption = JSON.parse(JSON.stringify(graphOption)); // DEEP-Clone Object
                const x = canvas.width / 2;
                const y = canvas.height / 2;
                const r = graphOption.innerR
                    ? graphOption.innerR
                    : 50;


                newOption.type = "circle";

                Graph.drawGraph(canvasElement, newOption);
                context.beginPath();


                context.moveTo(x, y);
                context.fillStyle = graphOption.innerCircleColor
                    ? graphOption.innerCircleColor
                    : "white";
                context.arc(x, y, r, 0, Math.PI * 2);
                context.fill();

                context.closePath();
                break;

                
            case "bezierLine":
                if (graphOption.background == true) {
                    for (let i = canvas.height - 30; i > 0; i -= (canvas.height * graphOption.yScale) / 3) {
                        context.beginPath();
                        context.strokeStyle = "#ddd";
                        context.moveTo(0, i);
                        context.lineTo(canvas.width, i);
                        context.stroke();
                        context.closePath();
                    }
                }

                graphOption.data.forEach((v, i) => {
                    const x = i * (canvas.width / graphOption.data.length) + graphOption.barWidth + (graphOption.marginLeft / 2);
                    const y = canvas.height - 30 - (v * graphOption.yScale);

                    if (graphOption.dotType) {
                        context.beginPath();
                        context.moveTo(x, y);
                        
                        if (graphOption.dotType == 'circle') {
                            const r = graphOption.dotRadius
                                ? graphOption.dotRadius
                                : 3;
                            context.arc(x, y, r, 0, Math.PI * 2)
                            context.fillStyle = graphOption.color;
                            context.fill();
                        } else {
                            context.fillRect(x - (graphOption.dotRadius / 2), y - (graphOption.dotRadius / 2));
                        }
                    }

                    
                    context.fillStyle = graphOption.textColor
                        ? graphOption.textColor
                        : graphOption.color;
                    if (graphOption.font) context.font = graphOption.font;
                    if (graphOption.dataLabel == true) {
                        context.font = `13px ${graphOption.font.split(" ")[1]}`;
                        context.fillText(v, x, y - 10);
                    }
                    

                    context.fillStyle = graphOption.textColor
                        ? graphOption.textColor
                        : graphOption.color;
                    if (graphOption.font) context.font = graphOption.font;
                    context.textAlign = "center";
                    context.fillText(graphOption.xAxisData[i], x, canvas.height - 10);


                    if (i == graphOption.data.length - 1) return;

                    const x2 = (i + 1) * (canvas.width / graphOption.data.length) + graphOption.barWidth + (graphOption.marginLeft / 2);
                    const y2 = canvas.height - 30 - (graphOption.data[i + 1] * graphOption.yScale);

                    const ax = (x + x2) / 2;
        
                    context.beginPath();
                    
                    context.strokeStyle = graphOption.color;
                    context.moveTo(x, y);
                    context.bezierCurveTo(ax, y, ax, y2, x2, y2);
                    context.stroke();

                    context.closePath();
                });

                break;


            case "line":
                if (graphOption.background == true) {
                    for (let i = canvas.height - 30; i > 0; i -= (canvas.height * graphOption.yScale) / 3) {
                        context.beginPath();
                        context.strokeStyle = "#ddd";
                        context.moveTo(0, i);
                        context.lineTo(canvas.width, i);
                        context.stroke();
                        context.closePath();
                    }
                }

                graphOption.data.forEach((v, i) => {
                    const x = i * (canvas.width / graphOption.data.length) + graphOption.barWidth + (graphOption.marginLeft / 2);
                    const y = canvas.height - 30 - (v * graphOption.yScale);

                    if (graphOption.dotType) {
                        context.beginPath();
                        context.moveTo(x, y);
                        
                        if (graphOption.dotType == 'circle') {
                            const r = graphOption.dotRadius
                                ? graphOption.dotRadius
                                : 3;
                            context.arc(x, y, r, 0, Math.PI * 2)
                            context.fillStyle = graphOption.color;
                            context.fill();
                        } else {
                            context.fillRect(x - (graphOption.dotRadius / 2), y - (graphOption.dotRadius / 2));
                        }

                        context.closePath();
                    }


                    context.fillStyle = graphOption.textColor
                        ? graphOption.textColor
                        : graphOption.color;
                    if (graphOption.font) context.font = graphOption.font;
                    if (graphOption.dataLabel == true) {
                        context.textAlign = "center";
                        context.font = `13px ${graphOption.font.split(" ")[1]}`;
                        context.fillText(v, x, y - 10);
                    }


                    context.fillStyle = graphOption.textColor
                        ? graphOption.textColor
                        : graphOption.color;
                    if (graphOption.font) context.font = graphOption.font;
                    context.textAlign = "center";
                    context.fillText(graphOption.xAxisData[i], x, canvas.height - 10);


                    if (i == graphOption.data.length - 1) return;

                    const x2 = (i + 1) * (canvas.width / graphOption.data.length) + graphOption.barWidth + (graphOption.marginLeft / 2);
                    const y2 = canvas.height - 30 - (graphOption.data[i + 1] * graphOption.yScale);
        
                    context.beginPath();
                    
                    context.strokeStyle = graphOption.color;
                    context.moveTo(x, y);
                    context.lineTo(x2, y2);
                    context.stroke();

                    context.closePath();
                });

                break;
        }
    }
}
