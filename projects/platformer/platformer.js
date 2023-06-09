$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  function setup() {
    if (firstTimeSetup) {
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      //start game
      setInterval(main, 1000 / frameRate);
    }
    //create walls
    createPlatform(-50, -50, canvas.width + 100, 50); //top
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200); //right
    createPlatform(-50, -50, 50, canvas.height + 500); //bottom
    createPlatform(canvas.width, -50, 50, canvas.height + 100);

    /**
     * Uncomment the loops below to add a "grid" to your platformer game's screen
     * The grid will place both horizontal and vertical platforms incremented 100 pixels apart
     * This can give you a better idea of where to create new platforms
     * You won't be able to play the game while these lines are uncommented
     * Comment the lines out to remove the grid
     */

    // Loop to create vertical grid lines
    // for (let i = 100; i < canvas.width; i += 100) {
    //   createPlatform(i, 0, 1, canvas.height);
    // }

    // Loop to create horizontal gride lines
    // for (let i = 100; i < canvas.height; i += 100) {
    //   createPlatform(0, i, canvas.width, 1);
    // }

    /////////////////////////////////////////////////
    //////////ONLY CHANGE BELOW THIS POINT///////////
    /////////////////////////////////////////////////

    // TODO 1
    // Create platforms
    // You must decide the x position, y position, width, and height of the platforms
    // example usage: createPlatform(x,y,width,height)
    let w=-300;
    let wClone=0;
    let h=760;
    let mod =1;
    let center=300;
  for(let i=0; i < 50; i++){
    // createPlatform(center,h,w,2);
    mod=mod-0.1;
    wClone=w;
    w=w-mod;
    h=h-2;
    center=550-w;
  }

  for(let i=0; i < 80; i++){
    createPlatform(center,h,w,2);
    mod=mod-0.1;
    wClone=w;
    w=w+mod;
    h=h+2;
  }
  for(let i=0; i < 80; i++){
    createPlatform(center,h,w,2);
    mod=mod+0.1;
    wClone=w;
    w=w-mod;
    h=h-2;
    center=545-w;
  }
  function hill (thingy){
  mod=-3
  center=thingy;
  w=100;
  h=740;
  center=thingy
    for(let i=0; i < 17; i++){
       h=h-2;
      createPlatform(center,h,w,2);
    mod=mod-0.1;
    wClone=w;
    w=w+mod;

  }
center=thingy-w
  for(let i=0; i < 17; i++){
    createPlatform(center,h,w,2);
    mod=mod+0.1;
    wClone=w;
    w=w-mod;
    h=h+2;
    center=thingy-w;
  }
  }
  hill(300);
  hill(90)
  hill(1100)
  hill(1300)
  //cannons

    // TODO 2
    // Create collectables
    // You must decide on the collectable type, the x position, the y position, the gravity, and the bounce strength
    // Your collectable choices are 'database' 'diamond' 'grace' 'kennedi' 'max' and 'steve'; more can be added if you wish
    // example usage: createCollectable(type, x, y, gravity, bounce)

    // TODO 3
    // Create cannons
    // You must decide the wall you want the cannon on, the position on the wall, and the time between shots in milliseconds
    // Your wall choices are: 'top' 'left' 'right' and 'bottom'
    // example usage: createCannon(side, position, delay, width, height)



    /////////////////////////////////////////////////
    //////////ONLY CHANGE ABOVE THIS POINT///////////
    /////////////////////////////////////////////////
  }

  registerSetup(setup);
});
