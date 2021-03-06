var wall = new Array();
var intervalId = null;

function initializeCanvas(canvasId, options, player) 
{
    var c=document.getElementById(canvasId);
    var ctx=c.getContext("2d");
    c.width = options.width;
    c.height = options.height;
    c.style.border = '1px solid ' + options.bordercolor;

    ctx.fillStyle=options.bgcolor;
    ctx.fillRect(0,0,options.width, options.height);



    loadPlayerPoints(ctx, options, player);
    bindCanvasEvents(c, options, player);

    return c;
}

function refreshCanvas(canvas, canvasOptions, players)
{
    var ctx=canvas.getContext("2d");
    ctx.clearRect(0, 0, canvasOptions.width, canvasOptions.height);
    ctx.fillStyle=canvasOptions.bgcolor;
    ctx.fillRect(0,0,canvasOptions.width, canvasOptions.height);
    for(var i = 0; i < players.length; i++)
    {
        var player = players[i];
        if(typeof player != "undefined" && player != null) {
            loadPlayerPoints(ctx, canvasOptions, player);
        }
    }
}

function drawPlayerPoint(context, canvasOptions, player)
{
    context.beginPath();
    context.fillStyle = player.color;
    context.arc(player.lastPosition.x, player.lastPosition.y,player.size, 0, 2 * Math.PI, false);
    context.shadowOffsetX = canvasOptions.shadowOffset;
    context.shadowOffsetY = canvasOptions.shadowOffset;
    context.shadowBlur    = canvasOptions.shadowBlur;
    context.shadowColor   = player.shadowColor;
    context.fill();
}

function savePlayerPoint(context, canvasOptions, player)
{
    drawPlayerPoint(context, canvasOptions, player);
    player.points.push({'x':player.lastPosition.x, 'y':player.lastPosition.y});
    addWall(player, canvasOptions);
    canvasOptions.socket.emit('update', player);
}

function printPlayerPoints(player)
{
    console.log('x : '+player.lastPosition.x+', y : '+player.lastPosition.y);
}

function loadPlayerPoints(context, canvasOptions, player)
{
    for(var i=0; i<player.points.length; i++){
        player.lastPosition.x = player.points[i].x;
        player.lastPosition.y = player.points[i].y;
        drawPlayerPoint(context, canvasOptions, player);
        addWall(player, canvasOptions);
    }
}

function addWall(player, canvasOptions)
{
    posX = player.lastPosition.x;
    posY = player.lastPosition.y;
    wall[posX+canvasOptions.width*posY] = player.name;
}

function isDead(player, canvasOptions)
{   
    posX = player.lastPosition.x;
    posY = player.lastPosition.y;
    if(typeof wall[posX+canvasOptions.width*posY] != "undefined") return true;
    else return false;
}

function bindCanvasEvents(canvas, canvasOptions, player)
{
    document.addEventListener('keydown',function (e){ 
        if(e.keyCode >= 37 && e.keyCode <= 40){
            e.preventDefault();
            if(!player.isDead) canvasKeydown(e, canvas, canvasOptions, player); 
            else{
                if(canvasOptions.autoMove) stopMoving();
            }
        }
    },false);

}

function canvasKeydown(event, canvas, canvasOptions, player){
    var ctx = canvas.getContext("2d");
    if(event.keyCode == 39){ // handle right key
        player.lastPosition.x = Math.min(canvasOptions.width, player.lastPosition.x +1);
    } else if (event.keyCode == 37) { // handle left key
        player.lastPosition.x = Math.max(0, player.lastPosition.x -1);
    } else if (event.keyCode == 40) { // handle down key
        player.lastPosition.y = Math.min(canvasOptions.height, player.lastPosition.y +1);
    } else if (event.keyCode == 38) { // handle up key
        player.lastPosition.y = Math.max(0, player.lastPosition.y -1);
    }
    if(event.keyCode >= 37 && event.keyCode <= 40){
        if(isDead(player, canvasOptions)){
            player.isDead = true;
            if(canvasOptions.autoMove) stopMoving();
        } else {
            savePlayerPoint(ctx, canvasOptions, player);
            //printPlayerPoints(player);
            if(canvasOptions.autoMove) {
                stopMoving();
                intervalId = window.setInterval(function(){startMoving(event.keyCode, canvas, canvasOptions, player);}, 5);
            }
        }
    }
}

function startMoving(keyCode, canvas, canvasOptions, player)
{
    var ctx = canvas.getContext("2d");
    if(keyCode == 39){ // handle right key
        player.lastPosition.x = Math.min(canvasOptions.width, player.lastPosition.x +1);
    } else if (keyCode == 37) { // handle left key
        player.lastPosition.x = Math.max(0, player.lastPosition.x -1);
    } else if (keyCode == 40) { // handle down key
        player.lastPosition.y = Math.min(canvasOptions.height, player.lastPosition.y +1);
    } else if (keyCode == 38) { // handle up key
        player.lastPosition.y = Math.max(0, player.lastPosition.y -1);
    }
    if(keyCode >= 37 && keyCode <= 40){
        if(isDead(player, canvasOptions)){
            player.isDead = true;
            stopMoving();
        } else {
            savePlayerPoint(ctx, canvasOptions, player);
        }
    }
}

function stopMoving()
{
    if(intervalId!=null) window.clearInterval(intervalId);
    intervalId = null;
}