function NewBullet(options) {
    return {
        type: options.type,

        width: options.width,
        height: options.height,
        position: { x: options.x, y: options.y },
        img: options.img,
        imgScale: 1,

        maxHorizontalVel: 8,
        maxVerticalVel: 8,

        spawnTime: 0,


        animation: {
            img: null,
            timePerFrame: 1 / 12,
            currentFrametime: 0,
            frameWidth: 64,
            frameHeight: 128,
            actualX: 0,
            actualY: 0,
            isGoingDown: false,
            isGoingLeft: false,
            isGoingUp: false,
            isGoingRight: false,

            Update: function (deltaTime) {
                this.currentFrametime += deltaTime;
                if (this.currentFrametime >= this.timePerFrame) {

                    this.timePerFrame = 1 / 12;
                    this.actualY = 0;
                    this.actualX += 64;
                    if (this.actualX > 448) {
                        if (this.actualY < 384) {
                            this.actualY = 0;
                        }
                        this.actualX = 0;
                        this.actualY += 128;
                    }
                    this.currentFrametime = 0.0;
                }
            },

            Draw: function (ctx) {
                ctx.drawImage(this.img, this.actualX, this.actualY,
                    this.frameWidth, this.frameHeight,
                    -this.frameWidth / 2, -this.frameHeight / 2,
                    this.frameWidth, this.frameHeight);
            }
        },

        physicsInfo: {
            density: 10,
            fixedRotation: true,
            type: b2Body.b2_kinematicBody,
            friction: 0
        },

        body: null,

        Start: function () {
            this.spawnTime = Date.now();
            this.animation.img = bulletImg;
            this.body = CreateBox(world,
                this.position.x / scale, this.position.y / scale,
                this.width, this.height, this.physicsInfo);
            this.body.SetUserData(this);
            body = this.body;
            if (player.isGoingRight)
                this.ApplyVelocity(new b2Vec2(8, 0));
            if (player.isGoingLeft)
                this.ApplyVelocity(new b2Vec2(-8, 0))

        },

        Destroy: function () {
            destroy_list.push(this.body);
            this.body = null;
        },

        Update: function (deltaTime) {
            if (this.body != null) {

                this.animation.Update(deltaTime);

                var bodyPosition = this.body.GetPosition();
                this.position.x = bodyPosition.x * scale;
                this.position.y = Math.abs((bodyPosition.y * scale) - ctx.canvas.height);
            }
        },

        ApplyVelocity: function (vel) {
            if (body != null) {
                var bodyVel = this.body.GetLinearVelocity();
                bodyVel.Add(vel);

                // horizontal movement cap
                if (Math.abs(bodyVel.x) > this.maxHorizontalVel)
                    bodyVel.x = this.maxHorizontalVel * bodyVel.x / Math.abs(bodyVel.x);

                // vertical movement cap
                if (Math.abs(bodyVel.y) > this.maxVerticalVel)
                    bodyVel.y = this.maxVerticalVel * bodyVel.y / Math.abs(bodyVel.y);

                this.body.SetLinearVelocity(bodyVel);
            }
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

            this.animation.Draw(ctx);

            ctx.restore();
        }
    }
}
