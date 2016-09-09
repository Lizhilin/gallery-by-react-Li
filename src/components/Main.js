import ReactDOM from 'react-dom'

require('normalize.css/normalize.css');
require('../styles/App.scss');
//获取图片相关数据
var imageDatas = require('../data/imagesDatas.json');

import React from 'react';

//let yeomanImage = require('../images/yeoman.png');

//利用自执行函数，将图片名信息转成图片 URL 路径信息
imageDatas = (function getImageURL(imageDatasArr) {
	for (var i = 0, j = imageDatasArr.length; i < j; i++) {
		var singleImageData = imageDatasArr[i];
		singleImageData.imageURL = require('../images/'+ singleImageData.fileName)
		imageDatasArr[i] = singleImageData;
	}
	console.log(imageDatasArr)
	return imageDatasArr;
})(imageDatas);

var ImgFigure  = React.createClass({
	render(){
		return(
			<figure className="img-figure">
				<div className="imgbox">
					<img src={this.props.data.imageURL} alt={this.props.data.title}/>
				</div>
				<figcaption>
					<h2 className="img-title">{this.props.data.title}</h2>
				</figcaption>
			</figure>
		)
	}
})

var GalleryByReactApp = React.createClass({
	Constant:{//常量存储
		centerPos:{ left:0, right:0},
		hPosRange:{ leftSecX:[0,0], rightSecX:[0,0], y:[0,0]},//水平方向的取值范围
		vPosRange:{ x:[0,0], topY:[0,0]}//垂直方向的取值范围
	},

	//组件加载后，为每张图片计算其位置的范围
	componentDidMount: function () {
		//首先拿到舞台的大小
		var stageDOM = ReactDOM.findDOMNode(this.refs.stage),
			stageW = stageDOM.scrollWidth,
			stageH = stageDOM.scrollHeight,
			halfStageW = Math.ceil(stageW /2),
			halfStageH = Math.ceil(stageH /2);
		console.log(stageDOM)

		//拿到一个 imageFigure 的大小
		var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
			imgW = imgFigureDOM.scrollWidth,
			imgH = imgFigureDOM.scrollHeight,
			halfImgW = Math.ceil(imgW/2),
			halfImgH = Math.ceil(imgH/2);
		//计算中心图片的位置点
		this.Constant.centerPos ={
			left: halfStageW - halfImgW,//舞台的一半宽减去图片的一半宽
			top: halfStageH - halfImgH
		}
		this.Constant.hPosRange.leftSecX[0] = - halfImgW;
		this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW *3;
		this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
		this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
		this.Constant.hPosRange.y[0] = - halfImgH;
		this.Constant.hPosRange.y[1] = stageH - halfImgH;

		this.Constant.vPosRange.topY[0] = - halfImgH;
		this.Constant.vPosRange.topY[1] = halfStageH - halfImgH *3;
		this.Constant.vPosRange.x[0] = halfImgW - imgW;//最小值
		this.Constant.vPosRange.x[1] = halfImgW;//最大值
	},

	render: function () {

		var controllerUnits = [],
			imgFigures = [];

		imageDatas.forEach(function (value,index) {
			imgFigures.push( <ImgFigure key={index} data={value} ref={'imgFigure'+index}/> );
		});
		//for(var i in imageDatas){
		//	imgFigures.push( <ImgFigure key={i} data={imageDatas[i]} /> );
		//}

		return(
			<section className="stage" ref='stage'>
				<section className="ima-sec">
					{imgFigures}
				</section>
				<nav className="controller-nav">
					{controllerUnits}
				</nav>
			</section>
		);
	}
})

GalleryByReactApp.defaultProps = {};

export default GalleryByReactApp;
//class AppComponent extends React.Component {
//	render() {
//		return (
//			<div className="index">
//				<img src={yeomanImage} alt="Yeoman Generator"/>
//				<div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
//			</div>
//		);
//	}
//}
//
//AppComponent.defaultProps = {};
//
//export default AppComponent;
