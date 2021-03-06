/// <reference path="../../libs/LayaAir.d.ts" />
var laya;
(function (laya) {
    var Stage = laya.display.Stage;
    var Text = laya.display.Text;
    var Event = laya.events.Event;
    var HttpRequest = laya.net.HttpRequest;
    var Browser = laya.utils.Browser;
    var WebGL = laya.webgl.WebGL;
    var Network_POST = (function () {
        function Network_POST() {
            // 不支持WebGL时自动切换至Canvas
            Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);
            Laya.stage.alignV = Stage.ALIGN_MIDDLE;
            Laya.stage.alignH = Stage.ALIGN_CENTER;
            Laya.stage.scaleMode = "showall";
            Laya.stage.bgColor = "#232628";
            this.connect();
            this.showLogger();
        }
        Network_POST.prototype.connect = function () {
            this.hr = new HttpRequest();
            this.hr.once(Event.PROGRESS, this, this.onHttpRequestProgress);
            this.hr.once(Event.COMPLETE, this, this.onHttpRequestComplete);
            this.hr.once(Event.ERROR, this, this.onHttpRequestError);
            this.hr.send('http://xkxz.zhonghao.huo.inner.layabox.com/api/getData', 'name=myname&psword=xxx', 'post', 'text');
        };
        Network_POST.prototype.showLogger = function () {
            this.logger = new Text();
            this.logger.fontSize = 30;
            this.logger.color = "#FFFFFF";
            this.logger.align = 'center';
            this.logger.valign = 'middle';
            this.logger.size(Laya.stage.width, Laya.stage.height);
            this.logger.text = "等待响应...\n";
            Laya.stage.addChild(this.logger);
        };
        Network_POST.prototype.onHttpRequestError = function (e) {
            console.log(e);
        };
        Network_POST.prototype.onHttpRequestProgress = function (e) {
            console.log(e);
        };
        Network_POST.prototype.onHttpRequestComplete = function (e) {
            this.logger.text += "收到数据：" + this.hr.data;
        };
        return Network_POST;
    }());
    laya.Network_POST = Network_POST;
})(laya || (laya = {}));
new laya.Network_POST();
