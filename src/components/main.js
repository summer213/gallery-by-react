require('normalize.css/normalize.css');
require('styles/App.scss');
import React from 'react';
import { findDOMNode } from 'react-dom';

// let yeomanImage = require('../images/yeoman.png');
// 获取图片数据
var imageDatas = require('../data/imageData.json');
// 利用自执行函数，将图片信息转成图片URL路径信息
imageDatas = (function genImageURL(imageDatasArr){
    for(var i=0,j=imageDatasArr.length;i<j;i++){
      var singleImageData = imageDatasArr[i];
      singleImageData.imgURL = require('../images/'+singleImageData.fileName);

      imageDatasArr [i] = singleImageData ;
    }
    return imageDatasArr;
})(imageDatas);

/*class imgFigure extends React.Component{
  render(){
    return (
      <figure>
        <img src={this.props.data.imageURL} alt={this.data.props.title}/>
        <figcaption>
          <h2>sdfgsd</h2>
        </figcaption>
      </figure>
    )
  }
};*/
// 获取区间内的随机值
function getRangeRandom(low,high){
  return Math.ceil(Math.random()*(high-low)+low)
}

// 设置图片旋转角度,获取0-30°之间的一个任意正负值
function get30DegRandom(){
  return ((Math.random() > 0.5 ? '':'-') + Math.ceil(Math.random()*30));
}
var ImgFigure = React.createClass( {
  // ImgFigure的点击处理函数
  handleClick:function(e){
    if(this.props.arrange.isCenter){
      this.props.inverse();
    }else{
      this.props.center();
    }
    e.stopPropagation();
    e.preventDefault();
  },
  render(){
    var styleObj = {};
    // 如过props属性中指定了这张图片的位置，则使用
    // console.log(Boolean(this.props.arrange));
    if(this.props.arrange.pos){
      styleObj = this.props.arrange.pos;
    }
    // 如过图片的旋转角度有值，且不为0，添加旋转角度
    if(this.props.arrange.rotate){
      (['MozTransform','msTransform','WebkitTransform','transform']).forEach(function(value){
        styleObj[value] = 'rotate('+ this.props.arrange.rotate + 'deg)';
      }.bind(this));
    }
    if(this.props.arrange.isCenter){
      styleObj.zIndex = 11
    }
    var imgFigureClassName = 'img-figure';
    imgFigureClassName += this.props.arrange.isInverse?' is-inverse':'';
    return (
        <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick}>
        <img src={this.props.data.imgURL} alt={this.props.data.title}/>
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
          <div className="img-back" onClick={this.handleClick}>
            <p>{this.props.data.desc}</p>
          </div>
        </figcaption>
      </figure>
    );
  }
});
// 控制组件
var ControllerUnit = React.createClass({
  handleClick:function(e){
    // 如果点击的是当前正在选中态的按钮，则翻转图片，否则将图片居中
    if(this.props.arrange.isCenter){
      this.props.inverse();
    }else{
      this.props.center()
    }

    e.stopPropagation();
    e.preventDefault();
  },
  render(){
    var ControllerUnitClassName = 'controller-unit';
    // 如果对应的是居中的图片，显示控制按钮的居中态
    if(this.props.arrange.isCenter){
      ControllerUnitClassName += ' is-center';
      // 如果同时对应的是翻转图片，显示控制按钮的翻转态
      if(this.props.arrange.isInverse){
        ControllerUnitClassName += ' is-inverse';
      }
    }
    return (
      <span className={ControllerUnitClassName} onClick={this.handleClick}></span>
    )
  }
})
var GalleryByReact = React.createClass( {
  Constant:{
    centerPos:{
      left:0,
      right:0
    },
    hPosRange:{
      leftSecx:[0,0],
      rightSecx:[0,0],
      y:[0,0]
    },
    vPosRange:{
      x:[0,0],
      topY:[0,0]
    }
  },

  // 翻转图片
  // @params index输入当前被执行inverse操作的图片对应的图片信息数组的index
  // @return{Function} 这是一个闭包函数，其内return一个真正待执行的函数
  inverse: function(index){
    return function(){
      var imgsArrangeArr = this.state.imgsArrangeArr;
      imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
      this.setState({
        imgsArrangeArr:imgsArrangeArr
      });
    }.bind(this);
  },

  // 重新布局所有图片
  // @param  centerIndex 指定居中排布哪个图片
  rearrange:function(centerIndex){
    var imgsArrangeArr = this.state.imgsArrangeArr,
    Constant = this.Constant,
    centerPos = Constant.centerPos,
    hPosRange = Constant.hPosRange,
    vPosRange = Constant.vPosRange,
    hPosRangeLeftSecX = hPosRange.leftSecx,
    hPosRangeRightSecX = hPosRange.rightSecx,
    hPosRangeY = hPosRange.y,
    vPosRangeTopY = vPosRange.topY,
    vPosRangeX = vPosRange.x,

    imgsArrangeTopArr = [],
    topImgNum = Math.floor(Math.random()*2),//取一个或者不取
    topImgSpliceIndex = 0,
    imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);
    // 首先居中centerIndex的图片
    // 居中的centerIndex的图片不需要旋转
    imgsArrangeCenterArr[0] = {
      pos : centerPos,
      rotate : 0,
      isCenter : true
    }

    // 取出要布局上侧的图片的状态信息
    Math.ceil(Math.random()*(imgsArrangeArr.length - topImgNum));
    imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);

    // 布局位于上侧的图片
    imgsArrangeTopArr.forEach(function(value,index){
      imgsArrangeTopArr[index]={
        pos:{
          top:getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
          left:getRangeRandom(vPosRangeX[0],vPosRangeX[1])
        },
        rotate: get30DegRandom(),
        isCenter:false
      }
    });
    // 布局左右两侧的图片
    for(var i= 0,j=imgsArrangeArr.length,k=j/2;i<j;i++){
      var hPosRangeLORX = null;
      // 前半部分布局左边，右半部份布局右边
      if(i<k){
        hPosRangeLORX = hPosRangeLeftSecX;

      }else{
        hPosRangeLORX = hPosRangeRightSecX;
      }
      imgsArrangeArr[i]={
        pos:{
          top:getRangeRandom(hPosRangeY[0],hPosRangeY[1]),
          left:getRangeRandom(hPosRangeLORX[0],hPosRangeLORX[1])
        },
        rotate: get30DegRandom(),
        isCenter:false
      }
    }
    
    if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
      imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0]);
    }
    imgsArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0])
    this.setState({
      imgsArrangeArr:imgsArrangeArr
    })
  },

  // 利用 rearrange函数居中对应index的图片
  // @param index， 需要被剧中的图片对应的图片信息数组的index值,
  // @return {Function}
  center : function(index){
    return function(){
      this.rearrange(index);
    }.bind(this);
  },

  getInitialState:function(){
    return{
      imgsArrangeArr:[
        // {
        //   Pos:{
        //     left:'0',
        //     top:'0'
        //   },
        //   rotate:0,         //旋转角度
        //   isInverse: false, //图片正反面
        //    isCenter: false //图片是否居中
        // }
      ]
    }
  },
  //组件加载以后，为每张图片计算其位置的范围
  componentDidMount:function(){
    // 拿到舞台的大小
    var stageDOM = findDOMNode(this.refs.stage),
    stageW = stageDOM.scrollWidth,
    stageH = stageDOM.scrollHeight,
    halfStageW = Math.ceil(stageW/2),
    halfStageH = Math.ceil(stageH/2);
    // 拿到一个imageFigure的大小
    var ImgFigureDOM = findDOMNode(this.refs.ImgFigure0),
    imgW = ImgFigureDOM.scrollWidth,
    imgH = ImgFigureDOM.scrollHeight,
    halfImgW = Math.ceil(imgW/2),
    halfImgH = Math.ceil(imgH/2);

    // 计算constant的值
    this.Constant.centerPos = {
      left:halfStageW - halfImgW,
      top:halfStageH - halfImgH
    }

    // 计算左侧右侧区域，图片排布位置的取值范围
    this.Constant.hPosRange.leftSecx[0] = -halfImgW;
    this.Constant.hPosRange.leftSecx[1] = halfStageW-halfImgW * 3;
    this.Constant.hPosRange.rightSecx[0] = halfStageW+halfImgW;
    this.Constant.hPosRange.rightSecx[1] = stageW-halfImgW;
    this.Constant.hPosRange.y[0] = -halfImgW;
    this.Constant.hPosRange.y[1] = stageH-halfImgH;

    // 计算上侧区域图片排布位置的范围
    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH-halfImgH * 3;
    this.Constant.vPosRange.x[0] = halfStageW - imgW;
    this.Constant.vPosRange.x[1] = halfStageW;
    
    // var num = Math.floor(Math.random()*10);
    //         this.rearrange(num);
    this.rearrange();
  },
  render() {
    var controllerUnits = [],imgFigures = [];
    imageDatas.forEach(function(value,index){
      if(!this.state.imgsArrangeArr[index]){
        this.state.imgsArrangeArr[index] = {
          pos:{
            left:0,
            top:0
          },
          rotate:0,
          isInverse:false,
          isCenter:false
        }
      }
      imgFigures.push(<ImgFigure key={index} data={value} ref={'ImgFigure'+index} arrange={this.state.imgsArrangeArr[index]} inverse = {this.inverse(index)} center={this.center(index)}/>);
      controllerUnits.push(<ControllerUnit key={index} arrange={this.state.imgsArrangeArr[index]}  inverse = {this.inverse(index)} center={this.center(index)}/>);
    }.bind(this));
    return (
      /*<div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />
        <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
      </div>*/
      <section className="stage" ref = "stage">
        <section className="img-sec">
          {imgFigures}
        </section>
        <nav className="controller-nav">
          {controllerUnits}
        </nav>
      </section>
    );
  }
})
export default {GalleryByReact};

// export default haha;