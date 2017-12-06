<template>
<div>
   <div id="work-space"  class="wrapper">
        <div id="viewer" class="viewer">
        </div>
    </div>

    <div id="box-form" style="position: absolute; left: 177px; top: 191px; border-radius: 3px; border: 1px solid rgb(115, 115, 115); box-shadow: rgb(191, 191, 191) 1px 0px 10px; z-index: 999; width: 190px; background-color: rgb(255, 255, 255); display:none;">
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
                <button type="button" id="box_save">保存</button>&nbsp;
                <button type="button" id="box_cancel">取消</button>
                <br>
                <span style="color:#f00;">操作完成请记得点击“保存”</span>
            </p>
        </div>
    </div>
</div>
   

</template>

<script>
import "../../node_modules/jquery-mousewheel";
import "../assets/js/use/jquery-ui-1.10.4.custom";
import "../assets/css/jquery.iviewer.css";
import "../../node_modules/iviewer/jquery.iviewer";
import "../assets/js/use/jquery.sephiroth.simpleShape";
import { sephirothdefault, InitData } from "../assets/js/use/sephiroth.default";

export default {
  name: "md_picmark",
  data() {
    return {
      msg: ""
    };
  },
  mounted() {
    sephirothdefault();
    //加载矩形框
    var result = {
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
    InitData(result);
  }
};
</script>

<style>
.viewer {
  width: 50%;
  height: 500px;
  border: 1px solid black;
  position: relative;
}

.wrapper {
  overflow: hidden;
}

</style>
