module objects {

    export class Button extends createjs.Bitmap {

        //public image: createjs.Bitmap;

        constructor(imageString: string, x: number, y: number) {
            super(imageString);
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
        public OnOver(event: createjs.MouseEvent):void {
            //this.image.alpha = 0.8;
            this.alpha = 0.8;
        }

        public OnOut(event: createjs.MouseEvent):void {
            //this.image.alpha = 1.0;
            this.alpha = 1.0;
        }

    }
}