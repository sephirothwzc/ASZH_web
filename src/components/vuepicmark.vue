<template>
  <div class="body_content">
    <div class="content_box">
      <!--按钮组-->
      <div class="group_btn_l" style="float:left">
        <ul class="clearfix">
          <li>
            <button id="show_all">显示</button>
          </li>
          <li style="margin-bottom: 100px;">
            <button id="hide_all">隐藏框</button>
          </li>
          <li>
            <button>返回</button>
          </li>
          <li>
            <button>无效数据</button>
          </li>
          <li>
            <button>下一页</button>
          </li>
        </ul>
      </div>
      <div class="cont_l clearfix">
        <!--标注有效区域-->
        <div class="main-page">
          <div id="work-space-loading" style="color: #DDDDDD; font-size: 50px; left: 0; position: absolute; right: 0; text-align: center; top: 100px;">加载中...</div>
          <div id="work-space-header" style="height:30px">
            <span id="all-count">总框数：2017</span>
            <span id="is-valid">有效数据</span>
            <span id="invalid-reason">原因：图片模糊图片模糊图片模糊图片模糊图片模糊</span>
          </div>
          <!--标注内容区域-->
          <div style="clear:left"></div>
          <!--图片标注区域-->
          <div id="work-cont">
            <div id="work-space" class="workContainer wrapper">
              <div id="viewer" class="viewer">

              </div>
            </div>
          </div>          
        </div>

        <div id="mark_menu">
            <div class="rect_list" v-for="item of loadresutl.boxs" >
                {{item.shade}}
                <span v-on:click="delItem(item)">x</span>
            </div>
        </div>
      </div>
      <div class="tab_box">
        <div class="tab_div" v-for="item in prodata">
          <input type="radio" v-bind:id="item.id" class="tab_radio" name="tab" checked="checked" />
          <label class="tab_label" v-bind:for="item.id">{{item.title}}</label>	
          <div class="tab_content">            
            <div class="pic_items" v-for="tempitem in item.plist" v-on:click="chekproitem(item,tempitem)">{{tempitem.btnname}}</div>
          </div>
        </div>
      </div>
      <div id="box-form" style="position: relative;float:left;margin-top:2px;margin-left:2px;box-shadow: rgb(191, 191, 191) 1px 0px 10px; z-index: 999; width: 210px; background-color: rgb(255, 255, 255); display:none;">
        <div style="padding:10px;">
          <div style="display:none;background-color: #FFF;margin-bottom: 10px;">
            <a style="float: right;display: block;width: 25px;height: 25px;text-align: center;background-color: #FB0000;line-height: 25px;color: #fff;font-size: 36px;cursor: pointer;"
              id="cloth-close">
              ×
            </a>
          </div>
          <p id="Traffic_light_status">
            <label>交通标志类型：</label>
            <br />
            <label style="width:200px;" >{{justItem.jtype}}</label>
            <br />
            <label style="width:200px;" >{{justItem.jpro}}</label>
            <template v-if="">

            </template>
          </p>
          <p id="fujia_content">
            <label>附加文本:</label>
            <br />
            <input id="fujia" name="fujia" type="text" style="width:167px" v-model="justItemtype" />
          </p>
          <br />
          <p>
            <button type="button" id="box_save" v-on:click="saveItem" >保存</button>&nbsp;
            <button type="button" id="box_cancel">取消</button>
            <br>
            <span style="color:#f00;">操作完成请记得点击“保存”</span>
          </p>
        </div>
      </div>
      <!--质检表单-->
      <div class="valid_form">
          <form action="">
              <p class="label_input">错误类型：</p>
              <p>
                  <label for="">
                      <input type="checkbox" name="" ><span>存在未框选  </span>
                        <input type="checkbox" name="" ><span>框选错误    </span>
                      <input type="checkbox" name="" ><span>场景信息错误</span>
                      <input type="checkbox" name="" ><span>有效性错误  </span>
                  </label>
              </p>
              <p class="label_input">审核意见：</p>
              <textarea id="check_inp"></textarea>
              <div class="valid_btn_group">
                  <button id="valid_qualified">合格</button>
                  <button id="valid_unqualified">不合格</button>
                  <button id="repulse">一键打回</button>
                  <button id="tem_save">临时保存</button>
                  <button id="complete">完成</button>
                  <button id="next">下一张</button>
              </div>
          </form>
      </div>
    </div>      
  </div>
</template>

<script>
import "../assets/css/use/demo.css";
import "../../node_modules/jquery-mousewheel";
import "../assets/js/use/jquery-ui-1.10.4.custom";
import "../assets/css/jquery.iviewer.css";
import "../../node_modules/iviewer/jquery.iviewer";
import "../assets/js/use/jquery.sephiroth.simpleShape";
import {
  sephirothdefault,
  InitData,
  getlastRectId,
  mouseRightDown,
  Set_saved
} from "../assets/js/use/sephiroth.default";
import { SetObject, GetObject } from "../assets/js/use/ObjectHelper";

// 初始化数据
var resutl = {
  Workload: {
    Ban_sign: 0,
    Car: 16,
    Other: 0,
    Pedestrians: 14,
    Traffic_light: 2,
    Traffic_sign: 1,
    boxCount: 38,
    workTime: 830.7305833333334
  },
  boxs: [
    {
      cont: "1",
      content: "小型汽车",
      cut: "0",
      h: 52.999635568513135,
      id: "ui-rect-1",
      shade: "1",
      title: "2-小型汽车-左侧面-部分遮挡（0%~35%）-完全未截断（0%）",
      type: "小型汽车",
      val1: "Car",
      val_data: "1,0,",
      val_data1: "1,0,1",
      w: 143.99781341107874,
      x: 2083.480320699709,
      y: 539.0051020408165
    },
    {
      cont: "1",
      content: "小型汽车",
      cut: "0",
      h: 116.2000728862974,
      id: "ui-rect-0",
      shade: "2",
      title: "1-小型汽车-左侧面-大部分遮挡（35%~50%）-完全未截断（0%）",
      type: "小型汽车",
      val1: null,
      val_data: null,
      val_data1: "null1",
      w: 242.19788629737616,
      x: 2135.6559766763853,
      y: 552.9956268221576
    }
  ],
  effective: "1",
  img: "bj20160905_M_005\bj20160905_M_005_f021.png",
  _createTime: "2017/8/14 17:00:33",
  _guid: "c020a8dc-198f-42f4-aa85-8ace7ff17a6b",
  _personInProjectId: 407229
};

// 属性数据
var tempprodate=[
    {
        id:'tab1',
        title:'车辆',
        plist:[{
            btnname:'大卡车',
            pro2:[{
                pro2type:'text',
                pro2txt:'车牌'
            },{
                pro2type:'text',
                pro2txt:'颜色'
            }]
        },{
            btnname:'小卡车',
            pro2:[{
                pro2type:'sel',
                pro2txt:'车型',
                pro2option:['李白','杜甫','白居易']
            },{
                pro2type:'text',
                pro2txt:'颜色'
            }]
        },{
            btnname:'卡丁车'
        },{
            btnname:'碰碰车'
        },{
            btnname:'摩托车'
        },{
            btnname:'拖拉机'
        },{
            btnname:'卡丁车'
        },{
            btnname:'碰碰车'
        },{
            btnname:'摩托车'
        },{
            btnname:'拖拉机'
        },{
            btnname:'卡丁车'
        },{
            btnname:'碰碰车'
        },{
            btnname:'摩托车'
        },{
            btnname:'拖拉机'
        },{
            btnname:'卡丁车'
        },{
            btnname:'碰碰车'
        },{
            btnname:'摩托车'
        },{
            btnname:'拖拉机'
        },{
            btnname:'卡丁车'
        },{
            btnname:'碰碰车'
        },{
            btnname:'摩托车'
        },{
            btnname:'拖拉机'
        }]
    },    {
        id:'tab2',
        title:'行人',
        plist:[{
            btnname:'男人'
        },{
            btnname:'女人'
        },{
            btnname:'老人'
        }]
    },    {
        id:'tab3',
        title:'禁止行动',
        plist:[{
            btnname:'抽烟'
        },{
            btnname:'喝酒'
        },{
            btnname:'烫头'
        }]
    }
]

export default {
  name: "md_picmark",
  //   data() {
  //     return resutl;
  //   },
  data() {
    return {
      loadresutl: resutl,
      justItemtype: "普通灯",
      prodata :tempprodate, 
      isNew: false,
      justItem: {
          jtype:'',// 类型
          jpro:'',// 属性
          jpro2:''// 二级属性
      }
    };
  },
  mounted() {
    sephirothdefault(this.deldata);
    //加载矩形框
    InitData(resutl);
  },
  methods: {
    // public
    saveItem() {
      var tempobj = getlastRectId();
      var $lastRectId = tempobj._lastRectId;
      var normailHeight = tempobj._normailHeight;

      var rect = $("#" + $lastRectId);
      var h = $("#" + $lastRectId).height() + 2;
      var newHeight = $("#workPlace").height();
      var realh = h * normailHeight / newHeight;
      if (realh <= 10 && val1_h == "Traffic_light") {
        $("#box-form")
          .removeClass("active")
          .hide();
        $(".pixes-tip3").fadeIn();
        setTimeout(function() {
          $("#" + $lastRectId).remove();
          $(".pixes-tip").fadeOut();
        }, 1000);
        Set_saved(false);
        return;
      } else {
        
        Set_saved(true);

        rect.append(
          '<span class="box_watermark">' +
            (parseInt($lastRectId.split("-")[2]) + 1) +
            "</span>"
        );
        // 保存对象
        $("#box-form")
          .removeClass("active")
          .hide();
        if (this.isNew) {
          this.isNew = true;
        } else {
          var stitle = parseInt($lastRectId.split("-")[2]) + 1;
          var sid = "rf_show_" + $lastRectId;
          $("#rf_show_span_" + $lastRectId).html(stitle);
          //统计框数
          //sumMarkCount();
          var totalcount = Number($("#boxCount").text());
          var curId = Number($lastRectId.split("-")[2]) + 1;
          if (curId >= totalcount) {
          }
          this.isNew = false;
        }
        rect.on("mousedown", mouseRightDown);
        $(".d_c").css("display", "none");
        this.savedata(stitle);
        //$saved = true;
      }
    },
    // public 删除标记
    delItem(boxitem){
        var stitle = parseInt(boxitem.shade-1);
        var $rect = $('#ui-rect-'+stitle);
        $rect.remove();
        this.deldata(boxitem.shade);
    },
    // public 弹出选择标记
    chekproitem(item,tempitem){
        this.justItem.jtype = item.title;
        this.justItem.jpro = tempitem.btnname;
    },
    // private 保存数据
    savedata(shade) {
      var result = {};
      var reflag = true;
      result.img = this.loadresutl.img;
      result.effective = $("[name='effective']:checked").val();
      result.boxs = [];
      var boxCount = 0,
        Pedestrians = 0,
        Car = 0,
        Traffic_light = 0,
        Traffic_sign = 0,
        Ban_sign = 0,
        Other = 0;

      var shapes = getlastRectId()._shape.getShapes();
      var tpui = getlastRectId()._lastRectId;
      var shape = shapes.find(n => n.id == tpui);

      this.loadresutl.boxs.push({
        id: shape.id,
        type: "t",
        title: "测试-" + tpui,
        fujia: "f",
        light_id: "light_id",
        cont: "z",
        val1: this.justItem.jtype,
        val_data: this.justItem.jpro,
        val_data1: "val_data1",
        light_color: "z_c",
        misc_type: "misc_type",
        shade: shade,
        cut: "cut",
        content: "t",
        x: shape.x,
        y: shape.y,
        w: shape.w,
        h: shape.h
      });
    },
    // private 删除数据
    deldata(shade){
        var tempindex = this.loadresutl.boxs.findIndex((evelment)=>{
            return evelment.shade == shade;
        });
        this.loadresutl.boxs.splice(tempindex,1);
    }
  }
};
</script>

<style>
.wrapper {
  overflow: hidden;
}

#mark_menu {
  width: 100%;
  padding-top: 6px;
  margin: 0px auto;
  margin-top:2px;
  height: 50px;
  background-color: #ccc;
  border-radius: 5px;
}
#mark_menu > .rect_list {
  float: left;
  position: relative;
  padding: 5px 0;
  min-width: 60px;
  line-height: 20px;
  text-align: center;
  margin: 0 5px 10px 6px;
  background-color: #ffc600;
  border-radius: 5px;
}

.rect_list > span {
  position: absolute;
  right: 0px;
  top: 0px;
  height: 16px;
  width: 16px;
  line-height: 16px;
  text-align: center;
  border-radius: 50%;
  cursor: pointer;
}

.qualified {
  background-color: #0094fb !important;
}
.un_qualified {
  background-color: #d9534f !important;
}

/*整个图片列表div*/
.tab_box {
    width: 440px;
    min-height: 254px;
    position: relative;
    float: left;
    background-color:#ccc;
    border-radius: 5px;
    margin-top:30px;
    margin-left:2px;
}
/*每个可切换的TAB-DIV*/
.tab_div {
    margin-right: -1px;
    border-bottom: 0;
    float: left;
    margin-top:5px;
}
.tab_label {
  display: block;
	padding:5px 10px;
  background-color: #eee;
  text-align: center;
	cursor: pointer;
	border-radius: 5px;
	margin-left:8px;
}
.tab_radio,
.tab_content {
    position: absolute;
    left: -999em;
    width: 440px;
    background-color:#ccc;
    border-radius: 5px;
    border-top-right-radius: 0px;
    border-top-left-radius: 0px;
    border-top:1px solid white;
    max-height: 214px;
    overflow :auto;
}
.tab_div span
{
  margin-top:0px;
  margin-bottom:0px;
  border: 1px solid white;
}
.tab_radio:checked ~ .tab_content {
    margin-top: -1px;
    padding: 8px 8px;    
    left: 0;
    right: 0;
}
.tab_radio:checked ~ .tab_label {
    background-color: #fff;    
    position: relative;
    z-index: 1;
}

/*小图标列表Start*/
.pic_items{
	float: left;
	width:95px;
	height: 95px;
	margin:5px 6px 0 0;
	background-color: white;
	border-radius: 5px;
	color:red;
}
</style>
