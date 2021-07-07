function setup() {
	createCanvas(400, 400);
	background("beige");
	colorMode(HSB);

 	var btnExport = document.getElementById("btnExport");
	var displayCanvas = document.querySelector("canvas");
	var context = displayCanvas.getContext("2d");
	var displayWidth = displayCanvas.width;
	var displayHeight = displayCanvas.height;

	var url = "";
	
	var exportCanvas = document.createElement('canvas');
	exportCanvas.width = displayWidth;
	exportCanvas.height = displayHeight;
	var exportCanvasContext = exportCanvas.getContext("2d");
	btnExport.addEventListener("click", exportPressed, false);
  
	document.querySelector("form").addEventListener("submit", handleSubmit);
	

	function dataURItoBlob(dataURI, type) {
		// convert base64 to raw binary data held in a string
		var byteString = atob(dataURI.split(',')[1]);
	
		// separate out the mime component
		var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
	
		// write the bytes of the string to an ArrayBuffer
		var ab = new ArrayBuffer(byteString.length);
		var ia = new Uint8Array(ab);
		for (var i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		}
	
		// write the ArrayBuffer to a blob, and you're done
		var bb = new Blob([ab], { type: type });
		return bb;
	}


  
 function exportPressed(evt) {
	 // add base64 code into hidden textarea
	document.getElementById("doodle").value += dataURL;
	//background - otherwise background will be transparent.
	exportCanvasContext.fillStyle = "beige";
	exportCanvasContext.fillRect(0,0,displayWidth,displayHeight);
	
	//draw
	exportCanvasContext.drawImage(displayCanvas, 0,0,displayWidth,displayHeight,0,0,displayWidth,displayHeight);
	
	// //add printed url to image
	// exportCanvasContext.fillStyle = "white";
	// exportCanvasContext.font = 'bold italic 16px Helvetica, Arial, sans-serif';
	// exportCanvasContext.textBaseline = "top";
	// var metrics = exportCanvasContext.measureText("rectangleworld.com");
	// exportCanvasContext.fillText("rectangleworld.com", displayWidth - metrics.width - 10, 5);
	
	//we will open a new window with the image contained within:		
	//retrieve canvas image as data URL:
	var dataURL = exportCanvas.toDataURL("image/png");
	//open a new window of appropriate size to hold the image:
	var imageWindow = window.open("", "fractalLineImage", "left=0,top=0,width="+displayWidth+",height="+displayHeight+",toolbar=0,resizable=0");
	//write some html into the new window, creating an empty image:
	imageWindow.document.write("<title>Export Image</title>")
	imageWindow.document.write("<img id='exportImage'"
								+ " alt=''"
								+ " height='" + displayHeight + "'"
								+ " width='"  + displayWidth  + "'"
								+ " style='position:absolute;left:0;top:0'/>");
	imageWindow.document.close();
	//copy the image into the empty img in the newly opened window:
	var exportImage = imageWindow.document.getElementById("exportImage");
	exportImage.src = dataURL;



	

	

}

}


const handleSubmit = (e) => {
	e.preventDefault();
	let myForm = document.getElementById('doodleform');
	let formData = new FormData(myForm)
	fetch('/', {
	  method: 'POST',
	  headers: { "Content-Type": "application/x-www-form-urlencoded" },
	  body: new URLSearchParams(formData).toString()
	}).then(() => console.log('Form successfully submitted')).catch((error) =>
	  alert(error))
	
	
}
  
//   function draw() {
   
//   }

  function mouseDragged() {
	//Line from prev pt to current pt of mouse position
	var lineDraw = line(mouseX, mouseY, pmouseX, pmouseY);
  }
  
  //listen when we click the mouse
  function mouseClicked() {
	//weights 0 to 1
	stroke("slateBlue");
	strokeWeight(random());
	//what if want weights 0 to .4?
	//strokeWeight( random(.4) );
  }
  
  //listen when we release *any* key
  function keyReleased() {
	//color hue values between 20 and 145
	//saturation 0 to 100
	//brightness 80 to 100
	stroke(random(20, 145), random(100), random(80, 100));
  }
  
  //listen for only character keys
  function keyTyped() {
	//weights 0 to 5
	stroke("turquoise");
	strokeWeight(random(5));
  }

document.getElementById("clear").addEventListener('click', function() {
  background("beige");
});