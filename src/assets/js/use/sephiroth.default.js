import {
  SetObject,
  GetObject
} from "../use/ObjectHelper";

// 获取高度
function normailHeight(imgsrc) {
  var img = new Image();
  // 改变图片的src  
  img.src = imgsrc;
  $normailHeight = img.height;
  return $normailHeight;
};

/**
 * 获取所给元素的最大层级树
 * @param doms DOM元素数组
 */
function getMaxZindex(doms) {
  var max = 0;
  for (var i = 0; i < doms.length; i++) {
    var dom = doms[i];
    var zIndex = dom.style.zIndex;
    if (zIndex > max) {
      max = zIndex;
    }
  }
  return max;
}

// 最后的id
var $lastRectId, $normailHeight;
// get $lastRectId
function getlastRectId() {
  var obj = {
    // 当前id
    _lastRectId: $lastRectId,
    // 当前图片高度
    _normailHeight: $normailHeight,
    // 当前画图对象
    _shape: $shape
  };
  return obj;
}

// 鼠标右键按下事件处理函数
function mouseRightDown(e) {
  // 排除鼠标点击不是右键的情况
  if (e.which != 3) {
    return;
  }

  // 删除已有的右键菜单
  if ($('.right-menu').length > 0) {
    $('.right-menu').remove();
  }
  var $rect = $(this);
  var title = $(this).attr("title");
  var selectid = $(this).attr("id");
  var left = $rect.get(0).offsetLeft;
  var top = $rect.get(0).offsetTop;
  var w = $rect.width();
  $rect.parent().append('<div class="right-menu"><span>删除</span></div>');
  var childs = $rect.parent().children();
  var zIndex = getMaxZindex(childs);
  if (left + w + 57 >= 826) {
    $('.right-menu').css({
      'left': left - 57,
      'top': top,
      'z-index': zIndex + 1
    });
  } else {
    $('.right-menu').css({
      'left': left + w + 5,
      'top': top,
      'z-index': zIndex + 1
    });
  }
  $('.right-menu').on('click', function () {
    // 删除矩形框
    var tempid = parseInt(selectid.substring(8))+1;
    $rect.remove();
    $('#rf_show_' + selectid).remove();
    deldata(tempid);
    // 删除右键菜单
    $(this).remove();
    sumMarkCount();
  });
}

// 公共加载对象 画图用需要先调用 defalut
var $shape = null;
  // 是否保存 如果没有保存，则删除之前的画框
  var $saved = false;
  // public 设置保存
  function Set_saved(value){
    $saved = value;
  }
  // public ref 删除方法
  var deldata=null;

// 初始化加载
function sephirothdefault(funcdelData) {
  deldata = funcdelData;

  $("#work-space").on("contextmenu", function () {
    return false; //设置返回为false，设置为true则返回右键菜单  限制浏览器右键
  });
  /// 加载用全局变量
  var $img = "../../src/assets/images/Untitled2.jpg";
  // 画图判断
  var flag = true;
  // 加载插件
  $shape = $("#viewer").simpleShape({
    src: $img,
    stopDraw: false,
    onFinishLoad: function () {
      //alert("onFinishLoad");
      //alert("onFinishLoad");
      $(".dwa-loading").remove();
      var _hrh = '<hr id="h_hr" style="border:1px dashed #F00;border-bottom:0;border-right:0;border-left:0;width:0;height:0;position: absolute;top: 0;visibility:hidden;margin-top: 0;margin-bottom: 0;">';
      var _hrv = '<hr id="v_hr" style="border:1px dashed #F00;border-bottom:0;border-right:0;border-top:0;width:0;height:0;position: absolute;top: 0;visibility:hidden;margin-top: 0;margin-bottom: 0;">';
      $("#workPlace").append(_hrh);
      $("#workPlace").append(_hrv);
      $("#h_hr").css("width", $("#workPlace").width() + "px");
      $("#v_hr").css("height", $("#workPlace").height() + "px");
      $("#workPlace").mouseover(function () {
        $("#h_hr").css("visibility", "visible");
        $("#v_hr").css("visibility", "visible");
      });
      $("#workPlace").mouseout(function () {
        $("#h_hr").css("visibility", "hidden");
        $("#v_hr").css("visibility", "hidden");
      });
      $("#workPlace").mousemove(function (e) {
        $("#h_hr").css("width", $("#workPlace").width() + "px");
        $("#v_hr").css("height", $("#workPlace").height() + "px");
        if (e.originalEvent.offsetY > 1) {
          $("#h_hr").css("top", e.originalEvent.offsetY + "px");
        }
        if (e.originalEvent.offsetX > 1) {
          $("#v_hr").css("left", e.originalEvent.offsetX + "px");
        }
      });
    },
    onDrawStart: function (e, shape) {
      if (!$("#box-form").is(":hidden")) {
        $("#foodtype").select2("open");
        alert("尚有未保存的标注内容");
        return;
      }
    },
    onDrawed: function (e, shape) {
      if (!$("#box-form").is(":hidden")) {
        $(shape).remove();
        alert("尚有未保存的标注内容！");
        return;
      }
      if (!$saved) {
        $("#" + $lastRectId).remove();
      }
      $lastRectId = shape.id;
      var h = $(shape).height() + 2;
      var newHeight = $("#workPlace").height();
      var realh = h * normailHeight($img) / newHeight;
      //alert("标注框的当前高度为："+h+"\n当前图片的实际高度为："+newHeight+"\n当前计算结果为："+realh+"\n计算公式为：标注框的实际高度=（标注框的当前高度*1080）/当前图片的实际高度");
      if (realh < 10) {
        $(".pixes-tip3").fadeIn();
        setTimeout(function () {
          $("#" + $lastRectId).remove();
          $(".pixes-tip3").fadeOut();
        }, 1000);
        return;
      } else {
        flag = true;
        $saved = false;
        $lastRectId = shape.id;
        $("#fujia").hide();
        $("#fujia_content").hide();
        $("#fujia").val("");
        $("#cont").hide();
        $("#shade").hide();
        $("#cut").hide();
        $("#light_color").hide();
        $("#misc_type").hide();
        //document.getElementById("InBrand").innerHTML = "";
        $("#box-form")
          .addClass("active")
          .show();
        $("#" + $lastRectId).html(
          '<div class="d_c">' + parseInt(realh) + "<div>"
        );
      }
    },
    onRemoved: function (e, shape) {
      var id = shape.id;
      $("#box-form")
        .removeClass("active")
        .hide();
    },
    onZoomAfter: function () {},
    onResizeEnd: function (e, shape) {
      updateColorForFailPassRect();
    }
  });
}

// 数据加载
function InitData(result) {

  //加载标注结果
  if (result != null && result != undefined) {
    $("[name='effective']:checked").val(result.effective)
    var boxCount = result.Workload.boxCount;
    var Pedestrians = result.Workload.Pedestrians;
    var Car = result.Workload.Car;
    var Traffic_light = result.Workload.Traffic_light;
    var Traffic_sign = result.Workload.Traffic_sign;
    var Ban_sign = result.Workload.Ban_sign;
    var Other = result.Workload.Other;
    setMarkcount();
    //document.getElementById("InBrand").innerHTML = result.scene;
    var $list = result.boxs;

    $(result.boxs).each(function (i, obj) {
      var box = obj;
      var shapeId = null;
      if (obj.id != undefined) {
        shapeId = obj.id;
      }
      var shape_id = (parseInt(shapeId.split("-")[2]) + 1);
      $shape.drawShape(box.x, box.y, box.w, box.h, shapeId, function (shape) {
        $("#" + shapeId).data("type", box.type)
          .attr("type", box.type)
          .data("misc_type", box.misc_type)
          .attr("misc_type", box.misc_type)
          .data("cut", box.cut)
          .attr("cut", box.cut)
          .data("shade", box.shade)
          .attr("shade", box.shade)
          .data("title", box.title)
          .data("fujia", box.fujia)
          .data("light_id", box.light_id)
          .attr("light_id", box.light_id)
          .data("cont", box.cont)
          .attr("light_color", box.light_color)
          .data("val_data", box.val_data)
          .attr("val_data", box.val_data)
          .data("val_data1", box.val_data1)
          .attr("val_data1", box.val_data1)
          .data("val1", box.val1)
          .attr("val1", box.val1)
          .data("light_color", box.light_color)
          .attr("content", box.content)
          .data("content", box.content)
          .attr("fujia", box.fujia)
          .attr("cont", box.cont)
          .attr("title", box.title)
          .addClass("water_" + box.type)
          .append('<span class="box_watermark">' + shape_id + '</span>');
      });
      // 页面底部的矩形框
      $("#" + shapeId).data({
        'parentId': box.parentId,
        'content': box.content
      });
      // 重新注册鼠标右键事件
      $("#" + shapeId).on('mousedown', mouseRightDown);
    });
    //document.getElementById("boxCount").innerHTML = result.boxs.length;
  } else {
    //document.getElementById("boxCount").innerHTML = 0;
  }
}

// --------------进入自定义区域喽--------------

//设置所有的标注数量
function setMarkcount() {
  // setPedestrians(Pedestrians);
  // setCar(Car);
  // setTraffic_light(Traffic_light);
  // setTraffic_sign(Traffic_sign);
  // setBan_sign(Ban_sign);
  // setOther(Other);
  // setboxCount(boxCount);
}

//统计标注框数量
function sumMarkCount() {
  // var Pedestrians = $("div[val1='Pedestrians']").length;
  // var Car = $("div[val1='Car']").length;
  // Traffic_light = $("div[val1='Traffic_light']").length;
  // Traffic_sign = $("div[val1='Traffic_sign']").length;
  // Ban_sign = $("div[val1='Ban_sign']").length;
  // Other = $("div[val1='Other']").length;
  // boxCount = Pedestrians + Car + Traffic_light + Traffic_sign + Ban_sign + Other;

  setMarkcount();
}


export {
  sephirothdefault,
  InitData,
  getlastRectId,
  mouseRightDown,
  Set_saved,
}
