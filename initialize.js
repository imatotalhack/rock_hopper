
var gap = 85;

var constant;

var bX = 50;

var bY = 150;
var bW = 25;
var bH = 15;

var bcX = bX + (bW/2);
var bxY = bY + (bH/2);

var vY = 0;
var vX = 0;
var vel = [0,0];

var gravity = 0;
var thrust = 0.01;
var score = 0;
var deg = 0;
var tilt = 1;
var score =0;
var angle_spread = 45;
var reset_velocity = [1.75-1.75];

var cameraPos=[540,0];
var cameraScroll=[0,0];
var cameraTarget=[540,0];
var cameraPosPrev=[0,0];

var win=0;
var camera_speed=1;
var crash_speed=1.5;
var starting_fuel = 100;
var crash_message = [0,"nothing"];

const minimap_width =300;
const minimap_height = 300;
const minimap_color = "rgba(20,20,20,0.9)";
var minimap_min = -2000;
var minimap_max = 2000;
var minimap_scale = 1;
var first_loop = 1;
var first_landing = 0;

const remap = (
  value,
  sourceMin,
  sourceMax,
  destMin,
  destMax,
) =>
  destMin +
  ((value - sourceMin) / (sourceMax - sourceMin)) *
    (destMax - destMin);


//this is borrowed code
