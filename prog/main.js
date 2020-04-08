/**
 * Function called when the webpage loads.
 */
 
var gl;
var viewMatrix;
var projMatrix;
var normalShader;
var lightShader;
var scene;
var canvas
var perspectiveButton;
var orthographicButton;
var viewMode = "perspective";
var nearSlider;
var farSlider;
var zoomSlider;
var red, green, blue;
var catOBJ;
var teapotOBJ;
var catObject;
var teapotObject;
var addAnimatedObject = true;
var pan = false;
var useNormalShader = false;
var u_eyePosition;
var u_LightDirection;
var u_LightAmbColor;
var u_LightDifColor;
var u_LightSpeColor;
var haloHUD;
var mapHUD;
var ctx1;
var ctx2;
var ctx3;
var hud;
var u_Clicked;

function main() {
  
  initEventHandelers();

  // Get the rendering context for WebGL
  gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }
   
  ctx1 = halohud.getContext('2d');
  if (!gl || !ctx1) {
    console.log('Failed to get rendering context');
    return;
  }
    
  ctx2 = mapHUD.getContext('2d');
  if (!gl || !ctx2) {
    console.log('Failed to get rendering context');
    return;
  }
  ctx3 = bang.getContext('2d');

 

canvas.onmousedown = function(ev) {   // Mouse is pressed
   drawbang(ctx3); 
   resizebang(gl.canvas);
   //resizebang2(gl.canvas);


    //console.log("inside console");
    var x = ev.clientX, y = ev.clientY;
    var rect = ev.target.getBoundingClientRect();
    if (rect.left <= x && x < rect.right && rect.top <= y && y < rect.bottom) {
      // If pressed position is inside <canvas>, check if it is above object
      var x_in_canvas = x - rect.left, y_in_canvas = rect.bottom - y;
      check(x_in_canvas, y_in_canvas);

      
    }
  }

function check(x, y) {
  var picked = false;
  gl.uniform1i(u_Clicked, 1);
    scene.render();
    // Pass true to u_Clicked
  //draw(gl, n, currentAngle, viewProjMatrix, u_MvpMatrix); // Draw cube with red
  // Read pixel at the clicked position
  var pixels = new Uint8Array(4); // Array for storing the pixel value
  gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
  console.log("Hit item " + pixels );
  if (pixels[0] != 0 || pixels[1] != 0 || pixels[2] != 0){
      console.log("Hit item " + pixels );
      picked = true;
      alert('Shots were fired.');
      resizebang2(gl.canvas);

  } 
    else{
         alert('You missed! Click on the cats!');  
         resizebang2(gl.canvas);

    }
    
  gl.uniform1i(u_Clicked, 0);  // Pass false to u_Clicked(rewrite the cube)
  scene.render();
  //draw(gl, n, currentAngle, viewProjMatrix, u_MvpMatrix); // Draw the cube
  //return picked;
}    
    
    
  normalShader = createShader(gl, VSHADER6_NORMAL, FSHADER6_NORMAL);
  lightShader = createShader(gl, VSHADER6_LIGHT, FSHADER6_LIGHT);
    

  draw2DHalo(ctx1);
  draw2DMap(ctx2);
    
  useShader(gl, lightShader);

  scene = new Scene(gl);
    
  u_eyePosition = gl.getUniformLocation(gl.program, "u_eyePosition");
  u_LightDirection = gl.getUniformLocation(gl.program, "u_LightDirection");
  u_LightAmbColor =  gl.getUniformLocation(gl.program, "u_LightAmbColor");
  u_LightDifColor =  gl.getUniformLocation(gl.program, "u_LightDifColor");
  u_LightSpeColor =  gl.getUniformLocation(gl.program, "u_LightSpeColor");
  u_Clicked = gl.getUniformLocation(gl.program, 'u_Clicked');
  perspectiveButton.onclick = function (ev) 
  {
      viewMode = "perspective";
  }
    
  orthographicButton.onclick = function (ev)
  {
       viewMode = "orthographic";
  }
    
    
 var catOBJ = document.getElementById("catOBJ");
 var teapotOBJ = document.getElementById("teapotOBJ");
 var catObject = new LoadedOBJ(catOBJ.text,+6, 0 , Math.random(), Math.random(), Math.random());
 var catObject2 = new LoadedOBJ(catOBJ.text, -1, 0, Math.random(), Math.random(), Math.random());
 var catObject3 = new LoadedOBJ(catOBJ.text,+1, 0, Math.random(), Math.random(), Math.random());
 var catObject4 = new LoadedOBJ(catOBJ.text,-6,0, Math.random(), Math.random(), Math.random());

 
    
 //scene.addGeometry(new CU)
 scene.addGeometry(catObject);
 scene.addGeometry(catObject2);
 scene.addGeometry(catObject3);
 scene.addGeometry(catObject4);




  // Register the event handler to be called on key press
  document.onkeydown = function(ev){ keydown(ev); };
    
  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);

  // Clear <canvas>`
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
  resize(gl.canvas);
  resizebang(gl.canvas);
  resizeHaloHUD(gl.canvas);
  resizeMapHUD(gl.canvas);
 
   gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

 

    /*        
    catObject = new LoadedOBJ(catOBJ.text, 2.5, Math.random(), Math.random(), Math.random());
    teapotObject = new LoadedOBJ(teapotOBJ.text, 2.5, Math.random(), Math.random(), Math.random());
    scene.addGeometry(catObject);
    scene.addGeometry(teapotObject);*/
    
    //red = 1.0, green = 0.0, blue = 0.0;
    //scene.addGeometry(new TiltedCube(0.5, 0, 0));
 loadImage();
 
 tick();
}


