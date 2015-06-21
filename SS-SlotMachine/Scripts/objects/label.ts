module objects {

    export class Label extends createjs.Text {
        constructor(labelText:string) {
            super(labelText, config.FONT_SMALL + " " + config.FONT_FAMILY, config.GREEN);
        }
    }
}