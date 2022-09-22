contactListener.BeginContact = function (contact) {

    var fixA = contact.GetFixtureA().GetBody().GetUserData();
    var fixB = contact.GetFixtureB().GetBody().GetUserData();

   
    //ENEMY AGAINST BORDERS
    if (fixA.type == "enemy" && fixB.type == "wall") {
        fixA.Destroy();
        enemys.splice(enemys.indexOf(fixA), 1);
        
    }


    //FLAMES AGAINST BORDERS
    if (fixA.type == "bullet" && fixB.type == "wall") {
        fixA.Destroy();
        bullets.splice(bullets.indexOf(fixA), 1);

    }

    //PLAYER GETS A POINT
    if ((fixA.type == "player" && fixB.type == "point")) {
        maxSpawnDistance += 800;
        minSpawnDistance += 800;
        fixB.Destroy();
        points.splice(points.indexOf(fixB), 1);
        fixA.score++;
    }

    //PLAYER GETS A POWERUP
    if ((fixA.type == "player" && fixB.type == "powerup")) {
        fixB.Destroy();
        powerups.splice(powerups.indexOf(fixB), 1);

        switch (fixB.animation.bonus)
        {
            case 1:
                fixA.score += 5;
                break;
            case 2:
                fixA.score += 50;
                break;
            case 3:
                fixA.maxHorizontalVel += 1;
                fixA.maxVerticalVel += 1;
                break;
            case 4:
                fixA.maxHorizontalVel -= 1;
                fixA.maxVerticalVel -= 1;
                break;

        }
    }

    //PLAYER REACHES GOAL
    if ((fixA.type == "player" && fixB.type == "goal")) {
        Win(); 
    }

    //FLAMES REACH GOAL
    if ((fixA.type == "bullet" && fixB.type == "goal")) {
        fixA.Destroy();
        bullets.splice(bullets.indexOf(fixA), 1);
    }

    //PLAYER VS ENEMY
    if (fixA.type == "player" && fixB.type == "enemy")
    {
        GameOver();
    }
    if (fixA.type == "enemy" && fixB.type == "player")
    {
        GameOver();
    }

    //FLAMES VS ENEMY
    if (fixA.type == "bullet" && fixB.type == "enemy") {

            createPowerUp_x = fixB.position.x;
            createPowerUp_y = fixB.position.y - 270;

            fixB.Destroy();
            enemys.splice(enemys.indexOf(fixB), 1);
            fixA.Destroy();
            bullets.splice(bullets.indexOf(fixA), 1);

            needCreate = true;        
    }

    //ENEMY VS FLAMES
    if (fixA.type == "enemy" && fixB.type == "bullet")
    {
            createPowerUp_x = fixA.position.x;
            createPowerUp_y= fixA.position.y + 270;

            fixA.Destroy();
            enemys.splice(enemys.indexOf(fixA), 1);
            fixB.Destroy();
            bullets.splice(bullets.indexOf(fixB), 1)

            needCreate = true;
        
    }



}