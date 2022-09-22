 function LevelOne() {
    
    levelSelected = 1;

    //Main lvl frame
    var leftwall = NewObstacle({ type: 'wall', img: null, x: 0, y: 1, width: 0.01, height: 8 });
    leftwall.Start();
    mainfloors.push(leftwall);

    var bottomwall = NewObstacle({ type: 'wall', img: null, x: 1, y: 1, width: 11000, height: 0.01 });
    bottomwall.Start();
    mainfloors.push(bottomwall);

    var rightwall = NewObstacle({ type: 'wall', img: null, x: 10250, y: 1, width: 0.01, height: 8 });
    rightwall.Start();
    mainfloors.push(rightwall);

    var topwall = NewObstacle({ type: 'wall', img: null, x: 1, y: 800, width: 11000, height: 0.01 });
    topwall.Start();
    mainfloors.push(topwall);

    //Start first enemy  wave
    EnemyWave(0);

    //Level points

    var point1 = NewPoint({ x: 600, y: 500, img: pointImg });
    point1.Start();
    points.push(point1);

   /* var powerup1 = NewPowerUp({x: 760, y: 470});
    powerup1.Start();
    powerups.push(powerup1)*/

    //Level Ending
    var goal = NewObstacle({ type: 'goal', img: goalImg, x: 10150, y: 400, width: 1.0, height: 4.0 });
    goal.Start();
    floors.push(goal);

}

function EnemyWave(distanceTravelled)
{
    
    switch (getRndInteger(0, 3)) {
        case 0:
            var enemy1 = NewEnemy({ x: 1200 + distanceTravelled, y: 100 })
            enemy1.Start();
            enemys.push(enemy1);

            var enemy1 = NewEnemy({ x: 1200 + distanceTravelled, y: 200 })
            enemy1.Start();
            enemys.push(enemy1);

            var enemy3 = NewEnemy({ x: 1200 + distanceTravelled, y: 600 })
            enemy3.Start();
            enemys.push(enemy3);

            var enemy4 = NewEnemy({ x: 1200 + distanceTravelled, y: 700 })
            enemy4.Start();
            enemys.push(enemy4);
            break;
        case 1:
            var enemy1 = NewEnemy({ x: 900 + distanceTravelled, y: 100 })
            enemy1.Start();
            enemys.push(enemy1);

            var enemy1 = NewEnemy({ x: 1000 + distanceTravelled, y: 200 })
            enemy1.Start();
            enemys.push(enemy1);

            var enemy3 = NewEnemy({ x: 1100 + distanceTravelled, y: 600 })
            enemy3.Start();
            enemys.push(enemy3);

            var enemy4 = NewEnemy({ x: 1200 + distanceTravelled, y: 700 })
            enemy4.Start();
            enemys.push(enemy4);
            break;
        case 2:
            var enemy1 = NewEnemy({ x: 1000 + distanceTravelled, y: 150 })
            enemy1.Start();
            enemys.push(enemy1);

            var enemy1 = NewEnemy({ x: 1200 + distanceTravelled, y: 350 })
            enemy1.Start();
            enemys.push(enemy1);

            var enemy3 = NewEnemy({ x: 1000 + distanceTravelled, y: 450 })
            enemy3.Start();
            enemys.push(enemy3);

            var enemy4 = NewEnemy({ x: 1200 + distanceTravelled, y: 650 })
            enemy4.Start();
            enemys.push(enemy4);
            break;
        case 3:
            var enemy1 = NewEnemy({ x: 1200 + distanceTravelled, y: 100 })
            enemy1.Start();
            enemys.push(enemy1);

            var enemy1 = NewEnemy({ x: 1200 + distanceTravelled, y: 200 })
            enemy1.Start();
            enemys.push(enemy1);

            var enemy3 = NewEnemy({ x: 1200 + distanceTravelled, y: 600 })
            enemy3.Start();
            enemys.push(enemy3);

            var enemy4 = NewEnemy({ x: 1200 + distanceTravelled, y: 700 })
            enemy4.Start();
            enemys.push(enemy4);
            break;
    }
}

function LevelTwo()
{

    levelSelected = 2;

    //Main lvl frame
    var leftwall = NewObstacle({ type: 'wall', img: null, x: 0, y: 1, width: 0.01, height: 8 });
    leftwall.Start();
    mainfloors.push(leftwall);

    var bottomwall = NewObstacle({ type: 'wall', img: null, x: 1, y: 1, width: 11000, height: 0.01 });
    bottomwall.Start();
    mainfloors.push(bottomwall);

    var rightwall = NewObstacle({ type: 'wall', img: null, x: 10250, y: 1, width: 0.01, height: 8 });
    rightwall.Start();
    mainfloors.push(rightwall);

    var topwall = NewObstacle({ type: 'wall', img: null, x: 1, y: 800, width: 11000, height: 0.01 });
    topwall.Start();
    mainfloors.push(topwall);

    //Start first enemy  wave
    EnemyWave(0);

    //Level points

    var point1 = NewPoint({ x: 600, y: 500, img: pointImg });
    point1.Start();
    points.push(point1);

    /* var powerup1 = NewPowerUp({x: 760, y: 470});
     powerup1.Start();
     powerups.push(powerup1)*/

    //Level Ending
    var goal = NewObstacle({ type: 'goal', img: goalImg, x: 10150, y: 400, width: 1.0, height: 4.0 });
    goal.Start();
    floors.push(goal);
}

function LevelThree() {

    levelSelected = 3;

    //Main lvl frame
    var leftwall = NewObstacle({ type: 'wall', img: null, x: 0, y: 1, width: 0.01, height: 8 });
    leftwall.Start();
    mainfloors.push(leftwall);

    var bottomwall = NewObstacle({ type: 'wall', img: null, x: 1, y: 1, width: 11000, height: 0.01 });
    bottomwall.Start();
    mainfloors.push(bottomwall);

    var rightwall = NewObstacle({ type: 'wall', img: null, x: 10250, y: 1, width: 0.01, height: 8 });
    rightwall.Start();
    mainfloors.push(rightwall);

    var topwall = NewObstacle({ type: 'wall', img: null, x: 1, y: 800, width: 11000, height: 0.01 });
    topwall.Start();
    mainfloors.push(topwall);

    //Start first enemy  wave
    EnemyWave(0);

    //Level points

    var point1 = NewPoint({ x: 600, y: 500, img: pointImg });
    point1.Start();
    points.push(point1);

    /* var powerup1 = NewPowerUp({x: 760, y: 470});
     powerup1.Start();
     powerups.push(powerup1)*/

    //Level Ending
    var goal = NewObstacle({ type: 'goal', img: goalImg, x: 10150, y: 400, width: 1.0, height: 4.0 });
    goal.Start();
    floors.push(goal);
}