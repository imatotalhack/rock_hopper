document.onkeydown = checkKey;

function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '32') {
        rocketship.rockets *= -1;
        mysong.play();
        if (rocketship.fuel > 0) {
          rocket_sound.togglePlay();
        }

    }
    else if (e.keyCode == '38') {
        // up arrow
        rocketship.thrust += thrust;
        discovery_hit.stop();
        //rocket_sound.sound.playbackRate = 2;
    }
    else if (e.keyCode == '40') {
        // down arrow
        if (rocketship.thrust > 0.01) {
        rocketship.thrust -= thrust;
        }
      }
    else if (e.keyCode == '37') {
       // left arrow
       rocketship.autoflip[0] = -1;
       rocketship.tiltVel -= tilt;
       rocketship.tilt = rocketship.tilt%360;
    }
    else if (e.keyCode == '39') {
       // right arrow
       rocketship.autoflip[0] = -1;
       rocketship.tiltVel += tilt;
       rocketship.tilt = rocketship.tilt%360;
    }
    else if (e.keyCode == '70') {
       // f key
       rocketship.autoflip[0] *= -1;
       rocketship.autoflip[1] = (rocketship.tilt + 180)%360;
        //rocketship.flipVel = 0;
    }
    else if (e.keyCode == '75') {
       // k key
       if (rocketship.crash == 0) {
         self_destruct.play();
         rocketship.crash = 1;
         rocketship.explosion_max = 100;
         rocketship.explosion_radius = 5;
         rocketship.explosion_alpha = 1;
         rocket_sound.stop();
       }
        //rocketship.flipVel = 0;
    }
}
