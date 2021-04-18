class Flag {
  constructor(position,tilt, closest_planet) {
    var surfacepoint = [0,0];
    surfacepoint[0] = closest_planet.radius * Math.cos(closest_planet.landangle * Math.PI / 180) + closest_planet.posX;
    surfacepoint[1] = closest_planet.radius * Math.sin(closest_planet.landangle * Math.PI / 180) + closest_planet.posY;
    this.position=surfacepoint;
    this.tilt=tilt + 90;
    this.width=5;
    this.height=25;
    this.closest_planet = closest_planet;
    this.relative_pos = [closest_planet.posX - surfacepoint[0], closest_planet.posY - surfacepoint[1]]
    if(typeof Flag.instances == 'undefined'){
      Flag.instances=[];
    }
    Flag.instances.push(this);
    }
  update(){
    this.position[0] =  this.closest_planet.posX - this.relative_pos[0];
    this.position[1] =  this.closest_planet.posY - this.relative_pos[1];
    }
  draw(){
    ctx.translate(this.position[0],this.position[1]); //Here we move the canvas center to the object
    ctx.rotate(this.tilt * Math.PI / 180); //Here we rotate the canvas

      ctx.beginPath(); //this indicates the beginning of drawing tip of the rocket
        ctx.fillStyle = "brown";
      ctx.beginPath();
        ctx.rect(-this.width/2,-this.height/2,this.width,this.height); //this creates the rocket centered on the pivot
        ctx.fill() //this fills the rocket
      ctx.closePath(); //this indicates the end of drawing the rocket
      ctx.fillStyle = this.closest_planet.color;
    ctx.beginPath();
      ctx.rect(-this.width/2,-this.height/2,this.width*4,this.height/3); //this creates the rocket centered on the pivot
      ctx.fill() //this fills the rocket
    ctx.closePath(); //this indicates the end of drawing the rocket
    ctx.rotate(this.tilt *-1 * Math.PI / 180); //rotates the canvas back
    ctx.translate(-this.position[0],-this.position[1]); //positions the canvas
  }
}
