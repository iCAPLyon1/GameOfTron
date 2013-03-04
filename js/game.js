var canvasOptions = {
    'width' : 600,
    'height' : 400,
    'bgcolor' : '#333333',
    'bordercolor' : '#000000',
    'shadowOffset' : 1,
    'shadowBlur' :2
}

var player = {
    'color' : '#ff0000',
    'name' : 'Panos',
    'shadowColor' : 'rgba(255,0,0,0.6)',
    'size' : 1,
    'isDead' : false,
    'lastPosition' : {
        'x' : null,
        'y' :null,
    },
    'points' : [{'x':10, 'y':10}, {'x':11, 'y':10}, {'x':12, 'y':10}]
}

var wall = new Array();

window.onload=function()
{
    var canvas = initializeCanvas('game-canvas', canvasOptions, player);
};

function initializeCanvas(canvasId, options, player) 
{
    var c=document.getElementById(canvasId);
    var ctx=c.getContext("2d");
    c.width = options.width;
    c.height = options.height;
    c.style.border = '1px solid ' + options.bordercolor;

    ctx.fillStyle=options.bgcolor;
    ctx.fillRect(0,0,options.width, options.height);

    loadPlayerPoints(ctx, canvasOptions, player);
    bindCanvasEvents(c, canvasOptions, player);

    return c;
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
        } else {
            savePlayerPoint(ctx, canvasOptions, player);
            printPlayerPoints(player);
        }
    }
}