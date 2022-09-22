
var player = {
    type: 'player',

    position: {x: 200, y: 200},
    width: 0.24,
    height: 0.4,

    // movement attr
    maxHorizontalVel: 3,
    maxVerticalVel: 3,

    moveLeft: false,
    moveRight: false,
    moveUp: false,
    moveDown: false,

    canShoot: true,
    canJump: false,
    isAlive: true,
    

    score: 0,

    animation: {
        img: null,
        timePerFrame: 1/12,
        currentFrametime: 0,
        frameWidth: 64,
        frameHeight: 64,
        actualX: 0,
        actualY: 0,
        isRunning: false,
        isJumping: false,
        isGoingDown: false,
        isGoingLeft: false,
        isGoingUp: false,
        isGoingRight: false,

        Update: function (deltaTime) {
            this.currentFrametime += deltaTime;
            if (this.currentFrametime >= this.timePerFrame)
            {

                if (this.isGoingDown)
                {
                    this.timePerFrame = 1 / 6;
                    this.actualY = 192;
                    this.actualX += 64;
                    if (this.actualX > 128)
                    { this.actualX = 0; }
                    this.currentFrametime = 0.0;
                }
                else if (this.isGoingRight) {
                    this.timePerFrame = 1 / 6;
                    this.actualY = 128;
                    this.actualX += 64;
                    if (this.actualX > 128)
                    { this.actualX = 0; }
                    this.currentFrametime = 0.0;
                }
                else if (this.isGoingUp) {
                    this.timePerFrame = 1 / 6;
                    this.actualY = 64;
                    this.actualX += 64;
                    if (this.actualX > 128)
                    { this.actualX = 0; }
                    this.currentFrametime = 0.0;
                }
                // update the animation frame
                
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
        density: 1,
        fixedRotation: true,
        linearDamping: 1,
        user_data: player,
        type: b2Body.b2_dynamicBody,
        restitution: 0.0,
        friction: 0.5
    },

    Start: function () {
        this.animation.img = playerImg;
        this.score = 0;
        this.position.x = 200;
        this.position.y = 200;

        this.body = CreateBox(world,
            this.position.x / scale, this.position.y / scale,
            this.width, this.height, this.physicsInfo);

        this.body.SetUserData(this);
    },

    Destroy: function ()
    {
        destroy_list.push(this.body);
        this.body = null;
    },

    Update: function (deltaTime) {
        // update the animation
        this.animation.Update(deltaTime);

        if (this.body.GetLinearVelocity().x == 0 || this.body.GetLinearVelocity().y == 0)
        {
            this.animation.isRunning = false;
        }
            

        // movement
        if (this.moveRight) {
            this.ApplyVelocity(new b2Vec2(1, 0));
            this.moveRight = false;
            this.isGoingLeft = false;
            this.isGoingRight = true;

        }
        if (this.moveLeft) {
            this.ApplyVelocity(new b2Vec2(-1, 0));
            this.moveLeft = false;
            this.isGoingLeft = true;
            this.isGoingRight = false;
        }

        if (this.moveUp)
        {
            this.ApplyVelocity(new b2Vec2(0, 1));
            this.moveUp = false;
            //this.isGoingUp = true;
            //this.isGoingDown = false;
        }
        if (this.moveDown) {
            this.ApplyVelocity(new b2Vec2(0, -1));
            this.moveDown = false;
            //this.isGoingDown = true;
        }

        
        // update the position
        var bodyPosition = this.body.GetPosition();
        this.position.x = bodyPosition.x * scale;
        this.position.y = Math.abs((bodyPosition.y * scale) - ctx.canvas.height);
    },
    
    Draw: function (ctx) {
        var bodyPosition = this.body.GetPosition();
        var posX = bodyPosition.x * scale;
        var posY = Math.abs((bodyPosition.y * scale) - ctx.canvas.height);

        ctx.save();

        ctx.translate(posX, posY);

        if (this.isGoingLeft)
        {
            ctx.scale(-1, 1);

        }

        this.animation.Draw(ctx);

        ctx.restore();
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

    Shoot: function () {
        if (this.canShoot)
        {
            if (this.isGoingRight)
            {
                var bullet1 = NewBullet({ type: 'bullet', img: bulletImg, x: this.position.x + 50, y: 800 - this.position.y, width: 0.05, height: 0.05 });
                bullet1.Start();
                bullets.push(bullet1);
            }
            if (this.isGoingLeft)
            {
                var bullet1 = NewBullet({ type: 'bullet', img: bulletImg, x: this.position.x - 30, y: 800 - this.position.y, width: 0.05, height: 0.05 });
                bullet1.Start();
                bullets.push(bullet1);
            }
            //shotOnCD = true;
            //console.log("La equis es: " + this.position.x + " ademas la y es: " + this.position.y);
            
            
        }

    }

}
