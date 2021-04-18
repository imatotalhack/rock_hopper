function drawGui(){
  ctx.globalAlpha = 1;
  ctx.textAlign = "start";
  ctx.fillStyle = "#FFFFFF";


  var i;
    for (i = 0; i < Planet.instances.length; i++) {
        if (Planet.instances[i].gravity_on == true) {
          ctx.beginPath();
            ctx.moveTo(rocketship.position[0], rocketship.position[1]);
            ctx.lineTo(Planet.instances[i].closest_point[0], Planet.instances[i].closest_point[1]);
            ctx.font = "20px Verdana";

            //ctx.fillText("gravity: "+Planet.instances[i].name + Planet.instances[i].gravity_pull,350,cvs.height-(50*i)-25);
            ctx.setLineDash([0,0]);
          ctx.closePath();
          //ctx.strokeStyle = Planet.instances[i].color;
          ctx.stroke();
        }
    }
  ctx.font = "20px Verdana";
  var force = Math.sqrt(Math.pow(rocketship.velocity[0],2) + Math.pow(rocketship.velocity[1],2));
  var sina = (Math.sin(rocketship.tilt * Math.PI / 180)).toFixed(2);
  var cosa = (Math.cos(rocketship.tilt * Math.PI / 180)).toFixed(2);



  if (win == 1) {
    ctx.textAlign = "center";
    ctx.font = "60px Verdana";
    ctx.fillText("YOU WIN!",cvs.width/2,cvs.height/2 - 30);
    ctx.fillText("THANKS FOR PLAYING!",cvs.width/2,cvs.height/2 + 30);
  }
  else if (win == -1) {
    ctx.strokeStyle = "FF0000";
    ctx.textAlign = "center";
    ctx.font = "60px Verdana";
    ctx.fillText("GAME OVER!",cvs.width/2,cvs.height/2);
    ctx.stroke();
  }
  ctx.strokeStyle = "#FFFFFF";
  ctx.font = "10px Verdana";
  // this draws a guideline to the nearby planet
  var surfacepoint = rocketship.closest_planet.closest_point;
  if ((rocketship.closest_planet.distance - rocketship.closest_planet.radius) < 50 && rocketship.crash == 0) {
    if (rocketship.closest_planet.landable) {ctx.strokeStyle = "green";}
    else {ctx.strokeStyle = "red"; ctx.fillText("Adjust angle!",rocketship.position[0] + 20,rocketship.position[1]);}
    ctx.beginPath();
      ctx.moveTo(rocketship.position[0], rocketship.position[1]);
      ctx.lineTo(surfacepoint[0], surfacepoint[1]);
      ctx.setLineDash([5]);
    ctx.closePath();
    ctx.stroke();
    }

  //This is where the minimap will be written
  var minimapX = cvs.width-minimap_width;
  var minimapY = cvs.height-minimap_height;
  ctx.beginPath();
    ctx.fillStyle = minimap_color;
    ctx.rect(minimapX,minimapY,minimap_width,minimap_height);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "white";
    ctx.font = "15px Verdana";
  ctx.fillText("POS: ["+Math.round(cameraPos[0])+","+Math.round(cameraPos[1])+"]",cvs.width-minimap_width,cvs.height-minimap_height);
  console.log(typeof rocketship.resettilt)

    // draw all planets
    for (i = 0; i < Planet.instances.length; i++) {
      if (Planet.instances[i].discovered == true) {
      ctx.beginPath();
        var planet_minimap_x = clamp(remap(Planet.instances[i].absPos[0],minimap_min,minimap_max,minimapX,minimapX+minimap_width),minimapX,minimapX+minimap_width);
        var planet_minimap_y = clamp(remap(Planet.instances[i].absPos[1],minimap_min,minimap_max,minimapY,minimapY+minimap_height),minimapY,minimapY+minimap_height);
        var planet_minimap_r = remap(Planet.instances[i].radius,0,1000,1*minimap_scale,6.5*minimap_scale);
        ctx.font = "20px Verdana";
        //ctx.fillText("PlanetAbsPos "+Planet.instances[i].name + " " + Planet.instances[i].absPos,1200,cvs.height-(20*i));
        ctx.arc(planet_minimap_x,planet_minimap_y, planet_minimap_r, 0, 2 * Math.PI);
        ctx.fillStyle = Planet.instances[i].color;
        ctx.fill();
        ctx.closePath();
      }
    }
    for (i = 0; i < Flag.instances.length; i++) {
        var flag_minimap_x = remap(Flag.instances[i].closest_planet.absPos[0],minimap_min,minimap_max,minimapX,minimapX+minimap_width);
        var flag_minimap_y = remap(Flag.instances[i].closest_planet.absPos[1],minimap_min,minimap_max,minimapY,minimapY+minimap_height);
        var map_flag= Flag.instances[i]
        ctx.font = "20px Verdana";
        //ctx.fillText("MapFlagPos "+map_flag.closest_planet.absPos,500,cvs.height-(20*i)-20);
        ctx.translate(flag_minimap_x,flag_minimap_y); //Here we move the canvas center to the object
        ctx.rotate(map_flag.tilt * Math.PI / 180); //Here we rotate the canvas

          ctx.beginPath(); //this indicates the beginning of drawing tip of the rocket
            ctx.fillStyle = "brown";
          ctx.beginPath();
            ctx.rect(-map_flag.width/2,-map_flag.height/2,map_flag.width/2,map_flag.height/2); //this creates the rocket centered on the pivot
            ctx.fill() //this fills the rocket
          ctx.closePath(); //this indicates the end of drawing the rocket
          ctx.fillStyle = map_flag.closest_planet.color;
        ctx.beginPath();
          ctx.rect(-map_flag.width/2,-map_flag.height/2,map_flag.width*2,map_flag.height/6); //this creates the rocket centered on the pivot
          ctx.fill() //this fills the rocket
        ctx.closePath(); //this indicates the end of drawing the rocket
        ctx.rotate(map_flag.tilt *-1 * Math.PI / 180); //rotates the canvas back
        ctx.translate(-flag_minimap_x,-flag_minimap_y); //positions the canvas

    }
    // draw rocket on minimap


    if (rocketship.crash == 0) {
    var rocket_minimap_x = clamp(remap(cameraPos[0] + canvas.width/2,minimap_min,minimap_max,minimapX,minimapX+minimap_width),minimapX,minimapX+minimap_width);
    var rocket_minimap_y = clamp(remap(cameraPos[1] + canvas.height/2,minimap_min,minimap_max,minimapY,minimapY+minimap_height),minimapY,minimapY+minimap_height);
    ctx.translate(rocket_minimap_x,rocket_minimap_y); //Here we move the canvas center to the object
    ctx.rotate(rocketship.tilt * Math.PI / 180); //Here we rotate the canvas
      ctx.beginPath(); //this indicates the beginning of drawing tip of the rocket
      ctx.arc(rocketship.width*0.55,0, rocketship.height/2, 0, 2 * Math.PI);
      ctx.fillStyle = "white";
      ctx.strokeStyle = '#666666';
      ctx.fill();
      ctx.closePath();
      ctx.beginPath();
        ctx.fillStyle = "red"; //this makes the fillstyle red
        ctx.rect(-rocketship.width/2,-rocketship.height/2,rocketship.width,rocketship.height); //this creates the rocket centered on the pivot
        ctx.fill() //this fills the rocket
      ctx.closePath(); //this indicates the end of drawing the rocket
      if (this.rockets > 0) {
        ctx.beginPath();
          ctx.fillStyle = "red";
          ctx.moveTo(-rocketship.width/2,-rocketship.height/2);
          ctx.lineTo(-rocketship.width/2,rocketship.height/2);
          ctx.lineTo(-rocketship.width/2 -(Math.random()*(this.thrust*300)),0);
        ctx.closePath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#666666';
        ctx.fill();
        }
    ctx.rotate(rocketship.tilt *-1 * Math.PI / 180); //rotates the canvas back
    ctx.translate(-rocket_minimap_x,-rocket_minimap_y); //positions the canvas


    //draw vector compas
    var compas_pos = [cvs.width-minimap_width*1.25,cvs.height-minimap_width/1.35];

    ctx.beginPath();
    ctx.arc(compas_pos[0],compas_pos[1], minimap_width/4, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = "rgba(20,20,20,0.9)";
    ctx.fill();
    ctx.strokeStyle = "FFFFFF";
    ctx.beginPath();
      ctx.moveTo(compas_pos[0], compas_pos[1]);
      ctx.lineTo(rocketship.velocity[0] * 10 + compas_pos[0], rocketship.velocity[1] * 10 + compas_pos[1]);
    ctx.closePath();
    ctx.fillStyle = "rgba(50,50,50,0.9)";
    ctx.textAlign = "center";
    ctx.setLineDash([0,0]);
    ctx.font = "70px Verdana";
    ctx.fillText(+Math.round(Math.sqrt(Math.pow(rocketship.velocity[0],2) + Math.pow(rocketship.velocity[1],2))),compas_pos[0],compas_pos[1]+30);
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.lineWidth = 1;

    //draw LIDAR Scanner
    var lidar_pos = [cvs.width-minimap_width*1.25,cvs.height-minimap_width/4];

    ctx.beginPath();
    ctx.arc(lidar_pos[0],lidar_pos[1], minimap_width/4, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = "rgba(8,80,80,0.9)";
    ctx.fill();
    ctx.strokeStyle = "FFFFFF";
    ctx.beginPath();

    for (i = 0; i < Planet.instances.length; i++) {
      var planeti = Planet.instances[i]
        if (Math.round((Planet.instances[i].landangle + 175)%360) < Math.round(rocketship.tilt) && Math.round((Planet.instances[i].landangle + 185)%360) > Math.round(rocketship.tilt)) {
          ctx.beginPath();
          //alert("planet detected!")
          ctx.arc(lidar_pos[0],lidar_pos[1], minimap_width/6, 0, 2 * Math.PI);
          ctx.closePath();
          //ctx.fillStyle = Planet.instances[i].color;
          if (planeti.discovered == 0) {
            radar_ping.play();
            ctx.fillStyle = "rgba(5,50,50,0.9)";
            ctx.fill();
            ctx.textAlign = "center";
            ctx.fillStyle = "white";
            ctx.font = "10px Verdana";
            ctx.fillText("NAME: ??????",lidar_pos[0],lidar_pos[1]+25);
          }
          ctx.fillStyle = "white";
          ctx.font = "10px Verdana";
          if (planeti.discovered == 1) {
            ctx.fillStyle = planeti.color;
            ctx.fill();
            ctx.fillStyle = "white";
            ctx.fillText("Planet Detected:",lidar_pos[0],lidar_pos[1]-15);
            ctx.fillText("NAME: " + planeti.name,lidar_pos[0],lidar_pos[1]+25);
          }
          ctx.font = "25px Verdana";
          ctx.fillText(Math.round(Planet.instances[i].distance_surface),lidar_pos[0],lidar_pos[1]+7);


        }
      }
    //fuelBar
    var fuelcolor = "red";
    if (rocketship.fuel > 40) {fuelcolor = "green";}
    else if (rocketship.fuel <= 40 && rocketship.fuel > 10) {
      fuelcolor = "yellow";
      ctx.fillStyle = fuelcolor;
      ctx.textAlign = "center";
      ctx.font = "40px Verdana";
      ctx.fillText("FUEL LOW",cvs.width/2,cvs.height/2 - 60);
      }
    else if (rocketship.fuel <= 10 && rocketship.fuel >= 0) {
      fuelcolor = "red";
      ctx.fillStyle = fuelcolor;
      ctx.textAlign = "center";
      ctx.font = "40px Verdana";
      ctx.fillText("FUEL CRITICAL",cvs.width/2,cvs.height/2 - 60);
    }
    else if (rocketship.fuel <= 0) {
        fuelcolor = "red";
        ctx.fillStyle = fuelcolor;
        ctx.textAlign = "center";
        ctx.font = "40px Verdana";
        mysong.stop();
        ctx.fillText("OUT OF FUEL. Press 'K' to self-destruct",cvs.width/2,cvs.height/2 - 60);
      }

    ctx.translate(compas_pos[0]-75,cvs.height);
    ctx.rotate(180 * Math.PI / 180);
    ctx.fillStyle = "grey";
    ctx.beginPath();
      ctx.rect(0,0,25, minimap_height);
      ctx.fill();
    ctx.closePath();
    ctx.fillStyle = fuelcolor;
    ctx.beginPath();
      ctx.rect(0,0,25,rocketship.fuel/100*minimap_height);
      ctx.fill();
    ctx.closePath();
    ctx.rotate(-180 * Math.PI / 180);
    ctx.translate(-(compas_pos[0]-75),(cvs.height)*-1);

    minimap_max = Math.max(minimap_max,cameraPos[0],cameraPos[1]);
    minimap_min = Math.min(minimap_min,cameraPos[0],cameraPos[1]);
    minimap_scale = 1/((minimap_max - minimap_min)/50000);
}
}
