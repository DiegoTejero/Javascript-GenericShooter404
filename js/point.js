function NewPoint(options) {

    return {
        type: "point",

        width: 0.25,
        height: 0.25,
        position: { x: options.x, y: options.y },
        img: options.img,
        imgScale: 1,

        physicsInfo: {
            density: 10,
            fixedRotation: true,
            type: b2Body.b2_kinematicBody,
            friction: 0,
            isSensor: true
        },

        body: null,

        /*animation: {
            timePerFrame: 1 / 6,
            currentFrametime: 0,
            frameWidth: 100,
            frameHeight: 100,
            actualX: 0,
            actualY: 0,

            Update: function (deltaTime) {
                this.currentFrametime += deltaTime;
                if (this.currentFrametime >= this.timePerFrame) {
                    // update the animation frame
                    this.actualX += this.frameWidth;
                    if (this.actualX > 900) {
                        this.actualX = 0;
                    }
                    this.currentFrametime = 0.0;
                }
            },

            Draw: function (ctx) {
                ctx.drawImage(this.img, this.actualX, this.actualY,
                    this.frameWidth, this.frameHeight,
                    -this.frameWidth /2 + 25, -this.frameHeight /2 +25,
                    this.frameWidth/2, this.frameHeight/2 );
            }
        },*/

        Start: function () {
            //this.animation.img = pointImg;

            this.body = CreateBox(world,
                this.position.x / scale, this.position.y / scale,
                this.width, this.height, this.physicsInfo);
            this.body.SetUserData(this);
            body = this.body;
        },

        Destroy: function () {
            destroy_list.push(this.body);
            this.body = null;
        },

        Update: function (deltaTime) {

        },


        Stop: function () {
            this.body.SetLinearVelocity(new b2Vec2(0, 0));
        },

        Draw: function (ctx) {
            var bodyPosition = this.body.GetPosition();
            var posX = bodyPosition.x * scale;
            var posY = Math.abs((bodyPosition.y * scale) - ctx.canvas.height);

            ctx.save();

            ctx.translate(posX, posY);
            ctx.drawImage(this.img,
                -this.width * scale,
                -this.height * scale,
                this.width * scale * 2, this.height * scale * 2);

            //this.animation.Draw(ctx);

            ctx.restore();
        }
    }
}