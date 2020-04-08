
/**
 * Responsible for initializing buttons, sliders, radio buttons, etc. present
 * within your HTML document.
 */
 
function initEventHandelers() {
	canvas = document.getElementById("myCanvas");
    perspectiveButton = document.getElementById("perspective");
    orthographicButton = document.getElementById("orthographic");
    nearSlider = document.getElementById("near");
    farSlider = document.getElementById("far");
    zoomSlider = document.getElementById("zoom");
    catOBJ = document.getElementById("catOBJ");
    teapotOBJ = document.getElementById("teapotOBJ");
    mapHUD = document.getElementById('maphud');
    haloHUD = document.getElementById('halohud');
}

/**
 * Function called upon mouse click or mouse drag. Computes position of cursor,
 * pushes cursor position as GLSL coordinates, and draws.
 *
 * @param {Object} ev The event object containing the mouse's canvas position
 */


/**
 * Clears the HTML canvas.
 */
function clearCanvas() {
	scene.clearGeometry();
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	sendTextToHTML("x: --- y: --- ", "coordinates");
}


function addObjToScene() {
	var objectFile = document.getElementById("chooseObjectFile").files[0];
	var textureFile = document.getElementById("chooseTextureFile").files[0];
	var fileReader = new FileReader();
	
	fileReader.onloadend = function() {
		var objString = fileReader.result;
		
		if (textureFile != undefined)
		{
			fileReader.onloadend = function() {
				var textureURL = fileReader.result;
				var texturedOBJ = new TexturedOBJ(objString);
				var callback = function (texture) { texturedOBJ.texture = texture; }
				create2DTexture(textureURL, gl.LINEAR, gl.LINEAR, gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE, callback);
				scene.addGeometry(texturedOBJ);
			}
			fileReader.readAsDataURL(textureFile);
			
		}
		else 
		{
			var loadedOBJ = new LoadedOBJ(objString);
			scene.addGeometry(loadedOBJ);
		}
		
	}
	
	fileReader.readAsText(objectFile);
}	


	
	


function initializeTerrain(heightData, colorData) {

	// center of the cube
	var centerX = 0; 
	var centerY = 0.85;

	for (let i = 0; i < heightData.length; i += 4) {
		// decide the 3 components of the height starting from the grey shades
		var r = heightData[i] / 255;
		r = Math.round(r * 10) / 10;
		var g = heightData[i + 1] / 255;
		g = Math.round(g * 10) / 10;
		var b = heightData[i + 2] / 255;
		b = Math.round(b * 10) / 10;

		// each 16 pixels (64 elements of the array) you change row
		// the first time this if{} is calculated is when i == 0
		if (i % 64 == 0) {
			centerX = 0.05 - 0.8;
			centerY = centerY - 0.1;
		//	console.log(i);
		}

		// if the height is 0, for efficiency sake you don't want to draw a cube
		if (r == 0.0 && g == 0.0 && b == 0.0)
        {
			centerX = centerX + 0.1; // update x coordinate of the canvas
        }
		else { // otherwise you draw the cube 
			// calculate height 
			var height = Math.sqrt(r * r + g * g + b * b);
			height = Math.round(height * 10) / 10;
            
			// store the color data in the global variable, then
			// the cube class will use the colors to draw each vertex
			red = colorData[i] / 255;
			red = Math.round(red * 10) / 10;
			green = colorData[i + 1] / 255;
			green = Math.round(green * 10) / 10;
			blue = colorData[i + 2] / 255;
			blue = Math.round(blue * 10) / 10;
			      
           scene.addGeometry(new TiltedCube(height, centerX, centerY));
            
        /*    var textureFile = "external/textures/brick.jpg";
	       var fileReader = new FileReader();
	       fileReader.onload = function() {		
		
		//var texture = new MultiTextureCube(event.target.result);
		textureURL = fileReader.result;
		
		var textureCube = new CheckerCube(height, x, y);
		
		var callback = function (texture) { textureCube.texture = texture; }
		create2DTexture(textureURL, gl.LINEAR, gl.LINEAR, gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE, callback);
		scene.addGeometry(textureCube);
		
	}
	fileReader.readAsDataURL(textureFile);
			*/

			// update x coordinate of the canvas
			centerX = centerX + 0.1;
		}
		
	}
    
    scene.addGeometry(new Square(0.8, 0, -0.085));
}

function loadImage() {

    var img1 = new Image();
    var img2 = new Image();
    
    img1.crossOrigin = "Anonymous";
    img2.crossOrigin = "Anonymous";
	
    var heightData = [];
	var colorData = [];

    img1.onload = function () {
        heightData = sampleImageColor(img1);

          img2.onload = function () {
			colorData = sampleImageColor(img2);
    
			initializeTerrain(heightData, colorData);
		};
		
	};
    img1.src = "external/terrain/height_terrain.png";
    img2.src = "external/terrain/color_terrain.png";
    
}

function keydown(ev) {
    
    switch(ev.keyCode){
        case 74:   // j was pressed
            scene.camera.rotate(5);
            break; 
        case 76:   // l was pressed
            scene.camera.rotate(-5);
            break; 
        case 68:   // d was pressed
            scene.camera.pan(0.1, -1);
            break;  
        case 65:   // a was pressed
            scene.camera.pan(0.1, 1);
            break;  
        case 87:   // w was pressed
            scene.camera.move(0.1, 1);
            break;  
        case 83:   // s was pressed
            scene.camera.move(0.1, -1);
            break;  
        case 78:   // n was pressed
            useNormalShader = !useNormalShader;
            break;
        default: return; // Prevent the unnecessary drawing
    }
    
    
    //draw();
}

function resize(canvas) {
  // Lookup the size the browser is displaying the canvas.
  var displayWidth  = canvas.clientWidth;
  var displayHeight = canvas.clientHeight;
 
  // Check if the canvas is not the same size.
  if (canvas.width  != displayWidth ||
      canvas.height != displayHeight) 
  {
 
    // Make the canvas the same size
    canvas.width  = displayWidth;
    canvas.height = displayHeight;
  }
}

function resizeHaloHUD(canvas) {
	
  // Lookup the size the browser is displaying the canvas.
  //var displayWidth  = ctx.canvas.clientWidth*0.2;
  //var displayHeight = ctx.canvas.clientHeight*0.2;
    
  var displayWidth  = ctx1.canvas.clientWidth*1.5;
  var displayHeight = ctx1.canvas.clientHeight*1.4;
 // uncomment for haloHUD2
  //var displayWidth  = ctx1.canvas.clientWidth*.72;
  //var displayHeight = ctx1.canvas.clientHeight*.58

  // Check if the canvas is not the same size.
  if (ctx1.canvas.width  != displayWidth ||
	ctx1.canvas.height != displayHeight) 
  {
 
    // Make the canvas the same size
    ctx1.canvas.width  = displayWidth;
    ctx1.canvas.height = displayHeight;
  }
}

function resizeMapHUD(canvas) {
	
  // Lookup the size the browser is displaying the canvas.
  var displayWidth  = ctx2.canvas.clientWidth*1.5035;
  var displayHeight = ctx2.canvas.clientHeight*1.5;
    
  
 
  // Check if the canvas is not the same size.
  if (ctx2.canvas.width  != displayWidth ||
	ctx2.canvas.height != displayHeight) 
  {
 
    // Make the canvas the same size
    ctx2.canvas.width  = displayWidth;
    ctx2.canvas.height = displayHeight;
  }
}

function resizebang(canvas) {
	
  // Lookup the size the browser is displaying the canvas.
  var displayWidth  = ctx3.canvas.clientWidth*2;
  var displayHeight = ctx3.canvas.clientHeight*2;
    
  
 
  // Check if the canvas is not the same size.
  if (ctx3.canvas.width  != displayWidth ||
	ctx3.canvas.height != displayHeight) 
  {
 
    // Make the canvas the same size
    ctx3.canvas.width  = displayWidth;
    ctx3.canvas.height = displayHeight;
  }
}

function resizebang2(canvas) {
	
  // Lookup the size the browser is displaying the canvas.
  var displayWidth  = ctx3.canvas.clientWidth*0;
  var displayHeight = ctx3.canvas.clientHeight*0;
    
  
 
  // Check if the canvas is not the same size.
  if (ctx3.canvas.width  != displayWidth ||
	ctx3.canvas.height != displayHeight) 
  {
 
    // Make the canvas the same size
    ctx3.canvas.width  = displayWidth;
    ctx3.canvas.height = displayHeight;
  }
}

function draw2DHalo(ctx) {
	// ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear <hud>
    //               // Start drawingß
	var img = new Image();
	img.onload = function() {
	  ctx.drawImage(img, 5, 5);
	  ctx.beginPath();
	  ctx.stroke();
	}
	img.src = "external/terrain/haloHUD.png";
}

function draw2DMap(ctx) {
	// ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear <hud>
    // Start drawingß
	var img = new Image();
	img.onload = function() {
	  //ctx.drawImage(img, 600, 600);
	  ctx.drawImage(img, 800, 600);
	  ctx.beginPath();
	  ctx.stroke();
	}
	img.src = "external/terrain/TayKeith2.png";
  }

function drawbang(ctx) {
	// ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear <hud>
    //               // Start drawingß
	var img = new Image();
	img.onload = function() {
	  //ctx.drawImage(img, 600, 600);
	  ctx.drawImage(img, 650, 400);
	  ctx.beginPath();
	  ctx.stroke();
	}
	img.src = "external/terrain/bang.png";
  }


/**
 * Changes the size of the points drawn on HTML canvas.
 *
 * @param {float} size Real value representing the size of the point.
 */
//function changePointSize(size) {}

/**
 * Changes the color of the points drawn on HTML canvas.
 *
 * @param {float} color Color value from 0.0 to 1.0.
 */
//function changePointColor(color) {}
