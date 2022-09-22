
var canvas;
var ctx;
var audio1;
var audioSFX;
var audioRIP;

var easyButton;
var normalButton;
var hardButton;

var buttonMute;
var buttonRestart;
var buttonNext;

var buttonManual;
var buttonCredits;

var stop = true;

var needCreate = false;
var shotOnCD = true;
var minSpawnDistance, maxSpawnDistance;
var levelSelected;
var displayCredits = true;

var fixedDeltaTime = 0.01666666; // 60fps: 1 frame each 16.66666ms
var deltaTime = fixedDeltaTime;

var time = 0,
    FPS = 0,
    frames = 0,
    acumDelta = 0;

var contactListener = new Box2D.Dynamics.b2ContactListener;

// images references
var menuImg, bulletImg, playerImg, bgImg, powerUpImg, enemyImg, goalImg, pointImg;

// game camera
var camera;

var createPowerUp_x;
var createPowerUp_y;


// game objects
var bullets = [];
var floors = [];
var mainfloors = [];
var powerups = [];
var enemys = [];
var destroy_list = [];
var points = [];

function Init ()
{
    // preparamos la variable para el refresco de la pantalla
    window.requestAnimationFrame = (function (evt) {
        return window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, fixedDeltaTime * 1000);
            };
    }) ();

    canvas = document.getElementById("my_canvas");
    
    if (canvas.getContext)
    {
        ctx = canvas.getContext('2d');

        audio1 = new Audio();
        audio1.src = "./media/MainTheme.mp3";

        audioSFX = new Audio();
        audioSFX.src = "./media/Shot.mp3";

        audioRIP = new Audio();
        audioRIP.src = "./media/Rip.mp3";

        menuImg = document.getElementById("bgStart");

        bulletImg = new Image();
        bulletImg.src = "./images/iama.png";

        bgImg = new Image();
        bgImg.src = "./images/space.png";

        powerUpImg = new Image();
        powerUpImg.src = "./images/PowerUp.png";

        enemyImg = new Image();
        enemyImg.src = "./images/spaceshit.png";

        playerImg = new Image();
        playerImg.src = "./images/shipsprite1.png";

        goalImg = new Image();
        goalImg.src = "./images/Portal.png";

        pointImg = new Image();
        pointImg.src = "./images/Point.png";

    }

    easyButton = document.getElementById("easyButton");
    normalButton = document.getElementById("normalButton");
    hardButton = document.getElementById("hardButton");

    buttonMute = document.getElementById("muteButton");
    buttonRestart = document.getElementById("buttRestart");
    buttonNext = document.getElementById("buttNext");

    buttonMute.style.backgroundImage = "url('./images/Unmute.png')";
    buttonCredits = document.getElementById("creditsButton");
    buttonManual = document.getElementById("manualButton");
    
    // setup keyboard events
    SetupKeyboardEvents();

    // setup mouse events
    SetupMouseEvents();

    // initialize Box2D
    PreparePhysics(ctx);

    //inicialize collisions
    world.SetContactListener(contactListener);

    easyButton.addEventListener('click', function ()
    {
        levelSelected = 1;
        HideMenuButtons();
        LevelOne();
        Start();

        
    });

    normalButton.addEventListener('click', function ()
    {
        levelSelected = 2;
        HideMenuButtons();
        Start();
    });

    hardButton.addEventListener('click', function ()
    {
        levelSelected = 3;
        HideMenuButtons();
        Start();
    });

    buttonMute.addEventListener('click', function ()
    {
        Mute();
    });

    buttonCredits.addEventListener('click', function () {

        Credits();

    });

    buttonManual.addEventListener('click', function () {
        HowToPlay();
    });

    buttonRestart.addEventListener('click', function ()
    {
        Destroyer();
        this.stop = true;
        DestroyObjects();
        console.log(levelSelected);
        switch (levelSelected)
        {
            case 1:
                LevelOne();
                Start();
                break;
            case 2:
                LevelTwo();
                Start();
                break;
            case 3:
                break;
        }

        buttonRestart.style.display = "none";
    });

    buttonNext.addEventListener('click', function () {
        NextLevel();
    });

}

function Start ()
{
    //Variable para parar las animaciones
    this.stop = false;
    audio1.currentTime = 0;
    audio1.play();

    // init background
    background.Start();

    // init player
    player.Start();
    
    // init camera
    if (!camera)
    {
        camera = new Camera(player);
        camera.Start();
    }

    //init variables
    createPowerUp_x = 0, createPowerUp_y = 0;
    maxSpawnDistance = 750;
    minSpawnDistance = 150;
    bullets.length = 0;

    // first call to the game loop
    Loop();
}

function Loop ()
{
    if (!stop)
    {
        requestAnimationFrame(Loop);

        var now = Date.now();

        deltaTime = now - time;
        if (deltaTime > 1000) // si el tiempo es mayor a 1 seg: se descarta
            deltaTime = 0;
        time = now;

        frames++;
        acumDelta += deltaTime;

        if (acumDelta > 1000) {
            FPS = frames;
            frames = 0;
            acumDelta -= 1000;
        }

        // transform the deltaTime from miliseconds to seconds
        deltaTime /= 1000;

        // update the input data
        input.update();

        // Game logic -------------------
        Update();

        // Draw the game ----------------
        Draw();

        // reset input data
        input.postUpdate();

    }
}

function Update ()
{

    // update physics
    // Step(timestep , velocity iterations, position iterations)
    world.Step(deltaTime, 8, 3);
    world.ClearForces();


    // player logic
    if (input.isKeyPressed(KEY_LEFT))
    {
        player.moveLeft = true;
        player.animation.isGoingLeft = true;
        player.animation.isGoingUp = false;
        player.animation.isGoingDown = false;
        player.animation.isGoingRight = false;
    }
    /*if (input.isKeyUp(KEY_LEFT) && player.canJump)
    {
        player.Stop();
        player.animation.isRunning = false;
    }*/
        
    if (input.isKeyPressed(KEY_RIGHT))
    {
        player.moveRight = true;
        player.animation.isGoingRight = true;
        player.animation.isGoingLeft = false;
        player.animation.isGoingUp = false;
        player.animation.isGoingDown = false;
    }
        
    /*if (input.isKeyUp(KEY_RIGHT) && player.canJump)
    {
        player.Stop();
        player.animation.isRunning = false;
    }*/
        

    if (input.isKeyPressed(KEY_UP)) {
        
        player.moveUp = true;
        player.animation.isGoingUp = true;
        player.animation.isGoingDown = false;
        player.animation.isGoingLeft = false;
        player.animation.isGoingRight = false;
        //audioSFX.play(1);
        //player.Jump();
    }

    if (input.isKeyPressed(KEY_DOWN)) {

        player.moveDown = true;
        player.animation.isGoingDown = true;
        player.animation.isGoingUp = false;
        player.animation.isGoingRight = false;
        player.animation.isGoingLeft = false;
        //audioSFX.play(1);
        //player.Jump();
    }

    if (input.isKeyPressed(KEY_SPACE)) {


        /*if (shotOnCD)
        {}*/        
            if (bullets.length < 1)
            {
                audioSFX.play(1);
                //shotOnCD = false;
                player.Shoot();
            }

            if (bullets[0].position.x - player.position.x > 1000) {
                bullets[0].Destroy();
                bullets.splice(bullets.indexOf(bullets[0]), 1);
            }
            else if (bullets[0].position.x - player.position.x < -1000) {
                bullets[0].Destroy();
                bullets.splice(bullets.indexOf(bullets[0]), 1);
            }
    }



    if (needCreate)
    {
        CreatePowerUp(createPowerUp_x, createPowerUp_y);
        needCreate = false;
    }

   /* for (var i = 0; i < points.length; i++)
    {
        var point1 = NewPoint({ x: getRndInteger(50, 750), y: getRndInteger(50, 750), img: pointImg });
        point1.Start();
        points.push(point1);
    } */

    //genera el siguiente item de puntuación y genera la siguiente oleada de enemigos
    if (points.length < 1)
    {
        var point1 = NewPoint({ x: getRndInteger(minSpawnDistance, maxSpawnDistance), y: getRndInteger(50, 750), img: pointImg });
        point1.Start();
        points.push(point1);
        EnemyWave(minSpawnDistance);


    }


    // player update
    player.Update(deltaTime);

    //bullet update
    for (var i = 0; i < bullets.length; i++)
        bullets[i].Update(deltaTime);

    //powerup update
    for (var i = 0; i < powerups.length; i++)
        powerups[i].Update(deltaTime);
    
    //Enemy update
    if (enemys.length > 0)
        for (var i = 0; i < enemys.length; i++)
            enemys[i].Update(deltaTime);

    //Point update
    for (var i = 0; i < points.length; i++)
        points[i].Update(deltaTime);

    // camera update
    camera.Update(deltaTime);

    //for (var i = 0; i < bullets.length; i++) {

    //}

    //StopFire();

    Destroyer();

}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function HideMenuButtons()
{
    this.easyButton.hidden = true;
    this.normalButton.hidden = true;
    this.hardButton.hidden = true;
    this.menuImg.hidden = true;
    this.buttonCredits.hidden = true;
    this.buttonManual.hidden = true;
    canvas.hidden = false;

}

function StopFire()
{
    if (bullets.length > 20) {
        bullets[0].Destroy();
        bullets.splice(bullets.indexOf(0), 1);
    }
}

function CreatePowerUp( _x , _y )
{
    //stop = true;
    var powerUp = NewPowerUp({ x: _x, y: _y });

    powerUp.Start();
    powerups.push(powerUp);
    //stop = false;
}

function DestroyObjects()
{   
    for (var i = 0; i < floors.length; i++)
    {
        this.floors[i].Destroy();
    }
    for (var i = 0; i < powerups.length; i++) {
        this.powerups[i].Destroy();
    }
    for (var i = 0; i < enemys.length; i++) {
        this.enemys[i].Destroy();
    }
    for (var i = 0; i < mainfloors.length; i++) {
        this.mainfloors[i].Destroy();
    }
    for (var i = 0; i < points.length; i++) {
        this.points[i].Destroy();
    }
    for (var i = 0; i < bullets.length; i++) {
        this.bullets[i].Destroy();
    }


    this.player.Destroy();

    while (enemys.length > 0){
        this.enemys.pop();
    }
    while (powerups.length > 0) {
        this.powerups.pop();
    }
    while (floors.length > 0) {
        this.floors.pop();
    }
    while (mainfloors.length > 0) {
        this.mainfloors.pop();
    }
    while (points.length > 0) {
        this.points.pop();
    }
    while (bullets > 0) {
        this.bullets.pop();
    }

}
function Destroyer()
{
    for (var i in destroy_list) {
        world.DestroyBody(destroy_list[i]);
    }
    // Reset the array
    destroy_list.length = 0;
}

function Win()
{
    this.stop = true;

    buttonNext.style.display = "block";

}

function NextLevel()
{
    Destroyer();

    DestroyObjects();

    buttonNext.style.display = "none";


    switch (levelSelected) {
        case 1:
            LevelTwo();
            Start();
            break;
        case 2:
            LevelThree();
            break;
        case 3:
            console.log("TE PASASTE EL JUEGO AMIGO DEL YOUTUBE")
            break;
    }
}

function GameOver()
{
    audio1.pause();
    audioRIP.play(1);
    this.stop = true;
    buttonRestart.style.display = "block";
    //buttonRestart.hidden = true;
    player.isAlive = false;

}

function Credits()
{
    if (displayCredits) {
        menuImg.src = "./images/ManualBg.png";
        displayCredits = false;
    }
    else {
        menuImg.src = "./images/InitialBg.png";
        displayCredits = true;
    }
}

function HowToPlay()
{

}

function Mute()
{
    if (audio1.muted == false)
    {
        audio1.muted = true;
        buttonMute.style.backgroundImage = "url('./images/Mute.png')"
    }
    else
    {
        audio1.muted = false;
        buttonMute.style.backgroundImage = "url('./images/Unmute.png')"

    }
}

function Draw ()
{

    // clean the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw the background (with the parallax)
    background.Draw(ctx);

    // camera transform: translate
    ctx.save();
    
    ctx.translate(-camera.position.x, -camera.position.y);

    // draw the box2d world
    DrawWorld(world);

    // draw the player
    player.Draw(ctx);

    // draw the platforms
    for (var i = 0; i < floors.length; i++)
        floors[i].Draw(ctx);

    for (var i = 0; i < powerups.length; i++)
        powerups[i].Draw(ctx);

    if (enemys.length > 0)
        for (var i = 0; i < enemys.length; i++)
            enemys[i].Draw(ctx);

    for (var i = 0; i < points.length; i++)
        points[i].Draw(ctx);

    for (var i = 0; i < bullets.length; i++)
    {
        if (bullets[i].body != null)
            bullets[i].Draw(ctx);

    }


    // camera transform: restore
    ctx.restore();

    // draw the player score
    ctx.fillStyle = "white";
    ctx.font = "26px Comic Sans MS";
    ctx.fillText('Score: ' + player.score, 660, 24);
    if (bullets.length == 0)
    {
        ctx.fillText('SHOT READY!', 300, 24);
    }
    else
    {
        ctx.fillText('RELOADING...', 300, 24);

    }



    // draw the FPS
    ctx.fillStyle = "white";
    ctx.font = "10px Arial";
    ctx.fillText('FPS: ' + FPS, 10, 10);
    ctx.fillText('deltaTime: ' + Math.round(1 / deltaTime), 10, 20);


}

function DrawWorld (world)
{
    // Transform the canvas coordinates to cartesias coordinates
    ctx.save();
    ctx.translate(0, canvas.height);
    ctx.scale(1, -1);
    world.DrawDebugData();
    ctx.restore();
}
