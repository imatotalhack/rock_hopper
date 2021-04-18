class Rocketship {
  constructor(name) {
    this.name=name;
    this.fuel_max=starting_fuel;
    this.fuel=this.fuel_max;
    this.position=[canvas.width/2,canvas.height/2];
    //cameraPos = [450,150];
    this.resetposition=[540,0];
    this.resettilt=0;
    this.velocity=[2,-2];
    this.acceleration=[0,0];
    this.tilt=0%360;
    this.tiltVel=-0;
    this.width=6;
    this.height=3;
    this.rockets= -1;
    this.thrust= thrust;
    this.mass=2;
    this.landed=0;
    this.crash=0;
    this.closest_planet="none";
    this.autoflip= [-1,0];
    this.explosion_radius = 50;
    this.explosion_max = 100;
    this.explosion_alpha = 1;
  }
  reset(){
    //draw explosion
    this.fuel=this.fuel_max;
    cameraPos=Object.assign({},this.resetposition);
    this.tilt=this.resettilt;
    if (first_landing == 0)
      {this.velocity=[2.5,-2.5];}
    else {this.velocity=[0,0];}
    this.acceleration=[0,0];
    this.tiltVel=0;
    this.rockets= -1;
    this.thrust= thrust;
    this.landed=0;
    this.crash=0;
    this.autoflip= [-1,0];
  }

  draw(){

    //Drawing the Rocket Ship
    /*canvas can't draw rotated objects, so we need to rate the canvas,
    then draw the object, then rotate it back.
    */

    if (this.crash == 0) {
    ctx.translate(this.position[0],this.position[1]); //Here we move the canvas center to the object
    ctx.rotate(this.tilt * Math.PI / 180); //Here we rotate the canvas
      ctx.beginPath(); //this indicates the beginning of drawing tip of the rocket
      ctx.arc(this.width*0.55,0, this.height/2, 0, 2 * Math.PI);
      ctx.fillStyle = "white";
      ctx.strokeStyle = '#666666';
      ctx.fill();
      ctx.closePath();
      ctx.beginPath();
        ctx.fillStyle = "red"; //this makes the fillstyle red
        ctx.rect(-this.width/2,-this.height/2,this.width,this.height); //this creates the rocket centered on the pivot
        ctx.fill() //this fills the rocket
      ctx.closePath(); //this indicates the end of drawing the rocket
      if (this.rockets > 0) {
        ctx.beginPath();
          ctx.fillStyle = "yellow";
          ctx.moveTo(-this.width/2,-this.height/2);
          ctx.lineTo(-this.width/2,this.height/2);
          ctx.lineTo(-this.width/2 -(Math.random()*(this.thrust*300)),0);
        ctx.closePath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#666666';
        ctx.fill();
        }
    ctx.rotate(this.tilt *-1 * Math.PI / 180); //rotates the canvas back
    ctx.translate(-this.position[0],-this.position[1]); //positions the canvas
    }
    else {
      //this draws the explosion
      var draw_explosion = true;
      if (this.explosion_radius > this.explosion_max) {
        if (this.explosion_alpha > 0.05) {
            this.explosion_alpha *= 0.95;
            ctx.globalAlpha = this.explosion_alpha;
        }
        else {
            rocketship.reset();
            var draw_explosion = false;
            crash_message = [0,"nothing"];
          }
      }
      else {this.explosion_radius *= 1.05}
      if (draw_explosion == true) {
        ctx.beginPath();
        ctx.arc(this.position[0],this.position[1], this.explosion_radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = "red";
        ctx.fill();
        this.velocity=[0,0];
        if (crash_message[0] > 0) {
          ctx.textAlign = "center";
          ctx.font = "40px Verdana";
          ctx.fillText(crash_message[1],cvs.width/2,cvs.height/2 - 60);
        }
      }
    }

  }
  update(){
    ambient_background.play();
    cameraPos[1] += this.velocity[1];
    cameraPos[0] += this.velocity[0];
    this.tilt += this.tiltVel;
    this.tilt = Math.round(this.tilt%360);
    if (this.tilt < 0) {
      this.tilt = 360 - Math.abs(this.tilt);
    }
    if (this.autoflip[0] > 0) {
      if (this.autoflip[1] != this.tilt) {
        this.tiltVel = Math.abs(Math.ceil((this.autoflip[1] - this.tilt)/100))
      }
      else {
        this.tiltVel = 0;
        this.autoflip[0] *= -1;
        }
    }
    //if the rockets are on, accellerate
    if (this.rockets > 0) {
      if (this.fuel > 0) {
        rocket_sound.play();
        this.velocity[0] += (this.thrust * Math.cos(this.tilt * Math.PI / 180)/this.mass);
        this.velocity[1] += (this.thrust * Math.sin(this.tilt * Math.PI / 180)/this.mass);
        this.fuel -= (this.thrust * 5);
      if (this.landed == 1 && (this.closest_planet.distance_surface > this.height*1.25)){
        this.landed = 0;
      }
      }
      else {this.rockets = 0; rocket_sound.stop();}
    }

  }
  land(){
    if (this.landed == 0 && this.crash == 0){
      first_landing = 1;
      this.resetposition=Object.assign({},cameraPos);
      this.resettilt=this.tilt;
      this.fuel = this.fuel_max;
      this.velocity = [0,0];
      reset_velocity=[0,0];
      this.tiltVel = 0;
      this.landed = 1;
      if (this.closest_planet.claimed == 0) {
        this.closest_planet.claimed = 1;
        if (this.fuel_max < 300) {
          this.fuel_max += 25;
        }
        this.fuel = this.fuel_max;
        this.thrust = thrust;
        mysong.stop();
        discovery_hit.play();
        return new Flag(this.position, this.tilt, this.closest_planet);
      }
  }
  }
}
