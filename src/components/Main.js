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
	return imageDatasArr;
})(imageDatas);

var GalleryByReactApp = React.createClass({
	render: function () {
		return(
			<section className="stage">
				<section className="ima-sec"></section>
				<nav className="controller-nav"></nav>
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
