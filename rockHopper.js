var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
var w = window.innerWidth*0.95;
var h = window.innerHeight*0.95;
cvs.width = w;
cvs.height = h;
let rocketship = new Rocketship("escape")
let sun = new Planet("rock_sun",0, 0,1000,"rgb(150,150,0)",10)
let earth = new Planet("rock_earth",5000,0,300,"green",3)
let mars = new Planet("rock_mars",5000,5000,200,"red",3)
let jupiter = new Planet("rock_jupiter",-5000,-5000,600,"orange",7)
let saturn = new Planet("rock_saturn",0,12000,500,"red",3)
let uranus = new Planet("rock_uranus",-12000,-3000,150,"blue",3)
let neptune = new Planet("rock_neptune",8000,-3000,50,"orange",3)
let pluto = new Planet("rock_pluto",4.0* cvs.width,18000,15,"gray",2 )
 let plantx = new Planet("rock_planetX",500000,0,10000,"gray",100 )
var planetList = Planet.allinstances
Rocketship.instances = [];
Flag.instances = [];

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
  this.togglePlay = function(){
    return this.sound.paused ? this.sound.play() : this.sound.pause();
  }
}


ambient_background = new sound('ambient_background.mp3');
ambient_background.sound.volume = 0.1;
mysong = new sound('song.mp3');
mysong.sound.volume = 0.5;
mysong.sound.playbackRate = 1;
explosion_sound = new sound('Explosion_01.mp3');
explosion_sound.sound.volume = 0.8;
discovery_hit = new sound('discovery_hit.mp3');
discovery_hit.sound.volume = 0.4;
discovery_hit.sound.playbackRate = 1;
radar_ping = new sound('radar_ping_04.mp3');
radar_ping.sound.volume = 0.05;
rocket_sound = new sound('rocket_fuel.mp3');
rocket_sound.sound.volume = 0.8;
rocket_sound.sound.playbackRate = 1;
self_destruct = new sound('self_destruct.mp3');


function between(x, min, max) {
  return x >= min && x <= max;
}

function clamp(num, min, max) {
  return Math.max(min,Math.min(max,num))
}

var s = 5000;
var stars = [];
var w = cvs.width;
//this is borrowed code
for(var i=0;i<s;i++){
  stars.push({x:Math.random()*20000,
              y:Math.random()*20000,
              r:Math.random()+1,
              b:Math.random()});
}

function update(){
  var blur = 0;
  for(var i=0; i<s;i++){

   var ss = stars[i];
   if(i%3){
     ctx.shadowBlur = ss.b+Math.random()*119;
     ctx.shadowColor= "#ffffff";
     stars[i] = {x:ss.x1,
                 y:ss.y,
                 r:ss.r,
                 b:ss.b+1};
   }else{
     ctx.shadowBlur = ss.b+3;
     ctx.shadowColor= "#ffffff";
     stars[i] = {x:ss.x,
                 y:ss.y,
                 r:ss.r*Math.random()+1,
                 b:ss.b};
   }

  }
    blur+=1;
}

function draw(){
  if (first_loop == 1) {
    first_loop = 0;
    mysong.play();
  }
    ctx.globalAlpha = 1;
      var planet_distance = 1000;
    var i;
      for (i = 0; i < Planet.instances.length; i++) {
          if (Planet.instances[i].distance_surface < planet_distance) {
            planet_distance = Planet.instances[i].distance_surface;
            rocketship.closest_planet = Planet.instances[i];

          }

        }

    //cameraPos = rocketship.position;
    if (rocketship.closest_planet.name == "pluto" && rocketship.landed == 1) {
      win = 1;
    }
    cameraScroll = [cameraPos[0]-cameraPosPrev[0],cameraPos[1]-cameraPosPrev[1]]
    cameraPosPrev = Object.assign({},cameraPos);
    rocketship.update();
    var absolute_speed = Math.round(Math.sqrt(Math.pow(rocketship.velocity[0],2) + Math.pow(rocketship.velocity[1],2)));
    if (absolute_speed > 5) {
      ctx.globalAlpha = 0.05;
    }
    //Drawing the background
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,cvs.width,cvs.height)
    ctx.closePath();
    ctx.globalAlpha = 1;
      //this is borrowed Code
      ctx.beginPath();
      ctx.fillStyle="rgb(255, 204, 0)";

      for(var i=0;i<s;i++){
        var starAt = stars[i];
        ctx.moveTo(starAt.x, starAt.y);
        starAt.x -= (cameraScroll[0]/25);
        starAt.y -= (cameraScroll[1]/25);
        ctx.arc(starAt.x,starAt.y, starAt.r, 0, Math.PI*2, true);

      }
      ctx.fill();
      ctx.shadowBlur = 0;

  //this is borrowed code
    var i;
      for (i = 0; i < Planet.instances.length; i++) {
          Planet.instances[i].update();
          Planet.instances[i].draw();
          Planet.instances[i].collisiondetect();
    }
      for (i = 0; i < Flag.instances.length; i++) {
          Flag.instances[i].update();
          Flag.instances[i].draw();
    }
    rocketship.draw();
    drawGui();
    requestAnimationFrame(draw);
}

draw();
