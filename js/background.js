
var background = {

    // fondo cielo
    layer0: {
        position: {x: 0, y: 0},

        Draw: function (ctx) {
            var bgGrd = ctx.createLinearGradient(0, 0, 0, canvas.height);
            bgGrd.addColorStop(0, "black");
            bgGrd.addColorStop(1, "#365B93");
            ctx.fillStyle = bgGrd;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    },

    layer1: {
        position: { x: 0, y: 0 },
        speed: 1,
        img: null,

        Start: function () {
            this.img = bgImg;
        },

        Draw: function (ctx) {
            if ((camera.position.x * this.speed) >= this.position.x + canvas.width) {
                this.position.x += canvas.width*2;
            }
            if ((camera.position.x * this.speed) <= this.position.x - canvas.width) {
                this.position.x -= canvas.width * 2;
            }

            ctx.drawImage(this.img, this.position.x - (camera.position.x * this.speed),
                0 - (camera.position.y * this.speed), canvas.width, canvas.height);

        }
    },
    // Background

    layer2: {
        position: { x:0 , y: 0},
        speed:1,
        img: null,

        Start: function () {
            this.img = bgImg;
            this.position.x = canvas.width;
        },

        Draw: function (ctx) {
            if ((camera.position.x * this.speed) >= this.position.x + canvas.width)
            {
                this.position.x += canvas.width *2;
            }
            if ((camera.position.x * this.speed) <= this.position.x - canvas.width) {
                this.position.x -= canvas.width * 2;
            }
            ctx.drawImage(this.img, this.position.x  - (camera.position.x * this.speed),
                0 - (camera.position.y * this.speed), canvas.width, canvas.height);                
        }
    },

    layers : null,

    // inicializamos el array de capas del fondo
    Start: function () {
        this.layers = new Array(this.layer0, this.layer1, this.layer2);
        for (let i = 0; i < this.layers.length; i++)
        {
            if (typeof(this.layers[i].Start) !== 'undefined')
                this.layers[i].Start();
        }
    },

    Draw: function (ctx) {
        for (let i = 0; i < this.layers.length; i++)
            this.layers[i].Draw(ctx);
    }

};
