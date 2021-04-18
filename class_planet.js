class Planet {
  constructor(name,posX, posY,radius,color,mass) {
    this.name = name;
    this.radius = radius;
    this.gridPos = [posX,posY];
    this.posX = posX;
    this.posY = posY;
    this.absPos = [posX,posY];
    this.color = color;
    this.mass = mass;
    this.closest_point = [0,0];
    this.distance =  Math.sqrt(Math.pow(this.closest_point[0] - rocketship.position[0],2) + Math.pow(this.closest_point[1] - rocketship.position[1],2));
    this.distance_surface =  10000;
    this.landangle = 0;
    this.landangleMin = 0;
    this.landangleMax = 0;
    this.claimed = 0;
    this.landable = (between(rocketship.tilt,this.landangle-25,this.landangle+25) && (Math.abs(rocketship.velocity[0])<2 && Math.abs(rocketship.velocity[1])<2));
    this.gravity_pull = [0,0];
    this.gravity_on = false;
    this.discovered = false;
    this.grav_distance = this.radius*10;

    if(typeof Planet.instances == 'undefined'){
      Planet.instances=[];
    }
    Planet.instances.push(this);
    }
  draw() {
    ctx.beginPath(); //this indicates the beginning of drawing tip of the rocket
    ctx.arc(this.posX,this.posY, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.strokeStyle = '#666666';
    ctx.fill();
    ctx.closePath();
  }
  update(){
    this.posX -= cameraScroll[0];
    this.posY -= cameraScroll[1];

    this.closest_point[0] = this.radius * Math.cos(this.landangle * Math.PI / 180) + this.posX;
    this.closest_point[1] = this.radius * Math.sin(this.landangle * Math.PI / 180) + this.posY;
    this.distance_surface =  Math.sqrt(Math.pow(this.closest_point[0] - rocketship.position[0],2) + Math.pow(this.closest_point[1] - rocketship.position[1],2));
    //calculating gravity gravity_pull
    this.gravity_on = JSON.parse(JSON.stringify(this.distance <= (this.grav_distance)));
    if (this.gravity_on==true && rocketship.landed == 0) {
      var gravitational_force = this.mass/this.distance;
      this.gravity_pull[0] = (gravitational_force * Math.cos(this.landangle * Math.PI / 180));
      this.gravity_pull[1] = (gravitational_force * Math.sin(this.landangle * Math.PI / 180));

      rocketship.velocity[0] -= this.gravity_pull[0];
      rocketship.velocity[1] -= this.gravity_pull[1];
    }
    if (this.distance_surface < cvs.width/2) {
      this.discovered = true;
    }
    var deltaX = rocketship.position[0] - this.posX;
    var deltaY = rocketship.position[1] - this.posY;
    var inRads = Math.atan2(deltaY,deltaX);
    if (inRads > 0) {
      inRads = Math.abs(inRads);
    }
    else {inRads = (2 * Math.PI) + inRads}
    this.landangle = inRads  * (180/Math.PI);

    this.LandAngleMax = (this.landangle+angle_spread);
    this.LandAngleMin = this.LandAngleMin = this.landangle-angle_spread;

    this.landable = (between(
                        rocketship.tilt,
                        this.landangleMin,
                        this.LandAngleMax)
                     && (
                       Math.abs(rocketship.velocity[0])<crash_speed
                        && Math.abs(rocketship.velocity[1])<crash_speed)
                        && (rocketship.crash == 0)
                      )
    this.distance =  Math.sqrt(Math.pow(this.posX - rocketship.position[0],2) + Math.pow(this.posY - rocketship.position[1],2));

  }
  collisiondetect() {
    if (this.distance < this.radius) {
      if (this.landable == true && rocketship.crash == 0){
        return rocketship.land();
      }
      else if (rocketship.crash != 1){
        if (between(
                  rocketship.tilt%360,
                  (this.landangle-angle_spread)%360,
                  (this.landangle+angle_spread)%360))
                  {
                    crash_message = [1,"TOO FAST"];
                  }
        else
         {
          crash_message = [1,"BAD ANGLE"];
        }
        rocketship.explosion_alpha = 1;
        rocketship.explosion_radius = 5;
        rocketship.explosion_max = (Math.abs(rocketship.velocity[0]) + Math.abs(rocketship.velocity[1]))*10;
        rocketship.crash = 1;
        rocketship.rockets = 0;
        rocket_sound.stop();
        explosion_sound.play();
        mysong.stop();
        }

    }
  }
}
