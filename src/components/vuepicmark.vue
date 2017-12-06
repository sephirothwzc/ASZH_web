<template>
  <div>
    <div class="body_content">
      <div class="content_box">
        <div class="cont_l clearfix">
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
                <button>有效数据</button>
              </li>
            </ul>
          </div>

          <!--标注有效区域-->
          <div class="main-page">
            <div id="work-space-loading" style="color: #DDDDDD; font-size: 50px; left: 0; position: absolute; right: 0; text-align: center; top: 100px;">加载中...</div>
            <h5 style="margin-bottom:10px;">2017</h5>
            <!--标注内容区域-->

            <!--图片标注区域-->
            <div id="work-cont">
              <div id="work-space" class="workContainer wrapper">
                <div id="viewer" class="viewer">

                </div>
              </div>
            </div>

            <div id="box-form" style="position: absolute; right: -218px; top: 30px;  box-shadow: rgb(191, 191, 191) 1px 0px 10px; z-index: 999; width: 210px; background-color: rgb(255, 255, 255); display:none;">
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
                  <label style="width:200px;" id="InBrand"></label>
                </p>
                <p id="fujia_content">
                  <label>附加文本:</label>
                  <br />
                  <input id="fujia" name="fujia" type="text" style="width:167px" onkeyup="this.value=this.value.replace(/[^\-?\d.]/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')"
                  />
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
          </div>
          <div>
              <ul id="v-for-object">
                  <li v-for="item of boxs">
                    <input type="button"  class="btn btn btn-info" 
                    v-bind:value="item.shade"/>
                  </li>
              </ul>
          </div>
        </div>
        <!--右侧表单部分-->
        <div class="cont_r clearfix">
          <div id="property_list">
            <!--一二级属性选择栏-->
            <div class="rect_selects">
              <ul class="clearfix">
                <li>车辆</li>
                <li class="cur_one_floor">行人</li>
                <li>禁止标志</li>
                <li>信号灯</li>
                <li>指示标志</li>
                <li>其他</li>
              </ul>
              <div class="pic_attr clearfix">
                <div class="pic_items">
                  <img src="http://crowdweb.blob.core.chinacloudapi.cn/100148/小型汽车.png" data-style="小型汽车" alt="小型汽车" width="80" height="80"
                    selecttype="Car" selectdata="1,0,">
                </div>
                <div class="pic_items">
                  <img src="http://crowdweb.blob.core.chinacloudapi.cn/100148/小型汽车.png" data-style="小型汽车" alt="小型汽车" width="80" height="80"
                    selecttype="Car" selectdata="1,0,">
                </div>
                <div class="pic_items">
                  <img src="http://crowdweb.blob.core.chinacloudapi.cn/100148/小型汽车.png" data-style="小型汽车" alt="小型汽车" width="80" height="80"
                    selecttype="Car" selectdata="1,0,">
                </div>
                <div class="pic_items">
                  <img src="http://crowdweb.blob.core.chinacloudapi.cn/100148/小型汽车.png" data-style="小型汽车" alt="小型汽车" width="80" height="80"
                    selecttype="Car" selectdata="1,0,">
                </div>
                <div class="pic_items">
                  <img src="http://crowdweb.blob.core.chinacloudapi.cn/100148/小型汽车.png" data-style="小型汽车" alt="小型汽车" width="80" height="80"
                    selecttype="Car" selectdata="1,0,">
                </div>
              </div>
            </div>
          </div>

        </div>
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
    InitData
  } from "../assets/js/use/sephiroth.default";

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
        boxs: [{
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
  export default {
    name: "md_picmark",
    data() {
        return resutl;
    },
    mounted() {
      sephirothdefault();
      //加载矩形框
      InitData(resutl);
    },
    methods: {
        saveItem:()=>{
            // 保存新增图像
            
        }
    }
  };

</script>

<style>
  .wrapper {
    overflow: hidden;
  }

</style>
