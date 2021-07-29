# EGraph.js!
> Draw Graph Easier!

EGraph.js는 HTML의 `canvas`를 이용하여 **쉽게 그래프를 그릴 수 있도록 도와주는 라이브러리**입니다!
여러분의 통계 페이지를 빠르게 만들어 보세요! 이 라이브러리는 Vanilla JS로 프론트엔드를 위해 작성되었습니다.

### Requirements
 * 이 라이브러리는 다른 라이브러리가 필요하지 않습니다.
 
## Preview
### 막대 그래프
![image](https://user-images.githubusercontent.com/64447484/127447723-71e2dba0-ef80-4574-b876-8f54358ca61c.png)
```js
Graph.drawGraph("#canvas", {
    
  data: [10, 30, 50, 70, 90, 110],
  xAxisData: ["하나", "둘", "셋", "넷", "다섯", "여섯"],

  type: "barVertical",
  color: 'tomato',
  textColor: 'black',

  background: true,
  roundGraph: true,

  marginLeft: 70

});
```
![image](https://user-images.githubusercontent.com/64447484/127448036-09042767-b7f9-494a-83db-d884fc72ccb1.png)
```js
Graph.drawGraph("#canvas", {
    
  data: [10, 30, 50, 70, 90, 110],
  xAxisData: ["하나", "둘", "셋", "넷", "다섯", "여섯"],

  type: "barHorizon",
  color: 'royalblue',
  textColor: 'white',

  background: true,
  roundGraph: true,

  marginLeft: 40

});
```

### 원형 그래프
![image](https://user-images.githubusercontent.com/64447484/127448205-46fc0c85-f1a4-4eb4-a9d3-62ab624d0088.png)
```js
Graph.drawGraph("#canvas", {
    
  data: [10, 30, 50, 70, 90, 110],
  type: "circle",

  r: 200,

  color: ['tomato', 'orange', 'gold', 'yellowgreen', 'royalblue', 'mediumpurple']

});
```

### 도넛 그래프
![image](https://user-images.githubusercontent.com/64447484/127448703-b591a2b9-ccc6-4fb2-940e-2d3667c69d24.png)
```js
Graph.drawGraph("#canvas", {
    
  data: [10, 30, 50, 70, 90, 110],
  type: "donut",

  r: 200,
  innerR: 120,

  color: ['tomato', 'orange', 'gold', 'yellowgreen', 'royalblue', 'mediumpurple'],
  innerCircleColor: "black"

});
```

### 꺾은선 그래프
![image](https://user-images.githubusercontent.com/64447484/127449061-8da85403-becb-4c9c-bf9b-cbff24a66d6f.png)
```js
Graph.drawGraph("#canvas", {
    
  data: [10, 30, 50, 70, 90, 110],
  xAxisData: ["하나", "둘", "셋", "넷", "다섯", "여섯"],
  type: "line",

  background: true,
  dataLabel: true,

  dotType: "circle",
  dataRable: true,

  color: "royalblue",
  textColor: "black",

  yScale: 2.0,
  marginLeft: 70

});
```

### 곡선 그래프
![image](https://user-images.githubusercontent.com/64447484/127449389-eadbfdc5-461b-4e09-ae8f-e0e8efa8a05a.png)
```js
Graph.drawGraph("#canvas", {
    
  data: [0, 500, 100, 600, 200, 700],
  xAxisData: ["하나", "둘", "셋", "넷", "다섯", "여섯"],
  type: "bezierLine",

  background: true,
  dataLabel: true,

  dotType: "circle",
  dataRable: true,

  color: "tomato",
  textColor: "white",

  yScale: 0.4,
  marginLeft: 70

});
```


## License
마음껏 사용하셔도 됩니다! 그 대신, 코드나 결과물에 `Powered By DEVELOPER_DECUPLE`라고 써주시면 됩니다.
