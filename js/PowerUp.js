function NewPowerUp(options) {

    return {
        type: "powerup",

        width: 0.2,
        height: 0.2,
        position: { x: options.x, y: options.y },
        img: powerUpImg,
        imgScale: 1,

        isGoingLeft: false,
        isGoingRight: false,

        // movement attr
        maxHorizontalVel: 3,
        maxVerticalVel: 3,

        physicsInfo: {
            density: 10,
            fixedRotation: true,
            type: b2Body.b2_dynamicBody,
            friction: 0,
            isSensor: true
        },

        body: null,

        animation: {
            img: null,
            timePerFrame: 1 / 1.1,
            currentFrametime: 0,
            frameWidth: 19,
            frameHeight: 24,
            actualX: 0,
            actualY: 0,
            bonus: 0,

            Update: function (deltaTime) {
                this.currentFrametime += deltaTime;
                if (this.currentFrametime >= this.timePerFrame) {
                    // update the animation frame
                    this.bonus += 1;
                    this.actualX += this.frameWidth;
                    if (this.actualX > 57) {
                        this.bonus = 0;
                        this.actualX = 0;
                    }
                    this.currentFrametime = 0.0;
                }
            },

            Draw: function (ctx) {
                ctx.drawImage(this.img, this.actualX, this.actualY,
                    this.frameWidth, this.frameHeight,
                    -this.frameWidth / 2 - 10, -this.frameHeight / 2 - 10,
                    this.frameWidth + 15, this.frameHeight + 15);
            }
        },

        Start: function () {
            this.animation.img = powerUpImg;
            this.body = CreateBox(world,
                this.position.x / scale , this.position.y / scale ,
                this.width, this.height, this.physicsInfo);
            this.body.SetUserData(this);

            console.log("en el Start, la x es: " + this.position.x);
            console.log("en el Start, la y es: " + this.position.y);
        },

        Destroy: function () {
            destroy_list.push(this.body);
            this.body = null;
        },

        Update: function (deltaTime) {
            if (body != null) {
                this.animation.Update(deltaTime);

                if (this.isGoingLeft) {
                    this.ApplyVelocity(new b2Vec2(-1, 0));
                    this.isGoingRight = false;
                    this.isGoingLeft = true;
                }
                if (this.isGoingRight) {
                    this.ApplyVelocity(new b2Vec2(1, 0));
                    this.isGoingLeft = false;
                    this.isGoingRight = true
                }

                // update the position
                var bodyPosition = this.body.GetPosition();
                this.position.x = bodyPosition.x * scale;
                this.position.y = Math.abs((bodyPosition.y * scale) - ctx.canvas.height);

            }
        },

        ApplyVelocity: function (vel) {
            var bodyVel = this.body.GetLinearVelocity();
            bodyVel.Add(vel);

            // horizontal movement cap
            if (Math.abs(bodyVel.x) > this.maxHorizontalVel)
                bodyVel.x = this.maxHorizontalVel * bodyVel.x / Math.abs(bodyVel.x);

            // vertical movement cap
            if (Math.abs(bodyVel.y) > this.maxVerticalVel)
                bodyVel.y = this.maxVerticalVel * bodyVel.y / Math.abs(bodyVel.y);

            this.body.SetLinearVelocity(bodyVel);
        },
        Stop: function ()
        {
            this.body.SetLinearVelocity(new b2Vec2(0, 0));
        },


        Draw: function (ctx) {
            var bodyPosition = this.body.GetPosition();
            var posX = bodyPosition.x * scale;
            var posY = Math.abs((bodyPosition.y * scale) - ctx.canvas.height);

            ctx.save();

            ctx.translate(posX, posY);
            ctx.scale(this.imgScale, this.imgScale);

            this.animation.Draw(ctx);


            ctx.restore();
        }
    }
}
