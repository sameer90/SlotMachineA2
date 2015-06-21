var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    var Button = (function (_super) {
        __extends(Button, _super);
        //public image: createjs.Bitmap;
        function Button(imageString, x, y) {
            _super.call(this, imageString);
            //this.image = new createjs.Bitmap(imageString);
            //this.image.regX = this.image.getBounds().width * 0.5;
            //this.image.regY = this.image.getBounds().height * 0.5;
            //this.image.x = x;
            //this.image.y = y;
            this.regX = this.getBounds().width * 0.5;
            this.regY = this.getBounds().height * 0.5;
            this.x = x;
            this.y = y;
            //create event listeners for mouseover and mouseout events
            //this.image.on("mouseover", this.OnOver, this);
            //this.image.on("mouseout", this.OnOut, this);
            this.on("mouseover", this.OnOver, this);
            this.on("mouseout", this.OnOut, this);
        }
        //public methods
        Button.prototype.OnOver = function (event) {
            //this.image.alpha = 0.8;
            this.alpha = 0.8;
        };
        Button.prototype.OnOut = function (event) {
            //this.image.alpha = 1.0;
            this.alpha = 1.0;
        };
        return Button;
    })(createjs.Bitmap);
    objects.Button = Button;
})(objects || (objects = {}));
//# sourceMappingURL=button.js.map