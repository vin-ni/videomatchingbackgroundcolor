/* eslint-disable */
//  Embed html videos with correct background color
//  Created by Vinzenz Aubry for sansho
//  Feel free to improve!
//  Base Code by Feng (https://stackoverflow.com/questions/35214962/html5-video-background-color-not-matching-background-color-of-website-in-some#44523649)
//	Contact: vinzenz@sansho.studio

var vid = document.getElementById('exampleVideo');

var wrapper = document.getElementById('wrapper');
var canvas = document.getElementById('exampleCanvas');
var ctx = canvas.getContext('2d');

var ratio = window.devicePixelRatio || 1;
var vidWidth;
var vidHeight;


vid.addEventListener('loadedmetadata', function (e) {
	console.log('onloadedmetadata');
	vid.style.transform = `scale(${ratio})`;

	vidWidth = vid.videoWidth;
	vidHeight = vid.videoHeight;

	canvas.width = vid.offsetWidth * ratio;
	canvas.height = vid.offsetHeight * ratio;

	canvas.style.width = vid.offsetWidth + "px";
	canvas.style.height = vid.offsetHeight + "px";

	drawingLoop();

	//resize scale for comparison
	vid.style.transform = `scale(1)`;
});

vid.addEventListener('loadeddata', function (e) {
	console.log('onloadeddata');
	setVideoBgColor(vid, wrapper);
	vid.play();
});

function drawingLoop() {
	requestId = window.requestAnimationFrame(drawingLoop)

	ctx.drawImage(vid, 0, 0, vidWidth, vidHeight, // source rectangle
		0, 0, canvas.width, canvas.height); // destination rectangle);
}

function setVideoBgColor(vid, backgroundElement) {
	// draw first four pixel of video to a canvas
	// then get pixel color from that canvas
	var canvas = document.createElement("canvas");
	canvas.width = 8;
	canvas.height = 8;

	var ctx = canvas.getContext("2d");
	ctx.drawImage(vid, 0, 0, 8, 8);

	var p = ctx.getImageData(0, 0, 8, 8).data;
	//dont take the first but fourth pixel [r g b]
	backgroundElement.style.backgroundColor = "rgb(" + p[60] + "," + p[61] + "," + p[62] + ")";
}

window.onresize = function (event) {
	//resize scale for comparison
	vid.style.transform = `scale(${ratio})`;

	vidWidth = vid.videoWidth;
	vidHeight = vid.videoHeight;

	canvas.width = vid.offsetWidth * ratio;
	canvas.height = vid.offsetHeight * ratio;

	canvas.style.width = vid.offsetWidth + "px";
	canvas.style.height = vid.offsetHeight + "px";

	//redraw canvas after resize
	ctx.drawImage(vid, 0, 0, vidWidth, vidHeight, // source rectangle
		0, 0, canvas.width, canvas.height); // destination rectangle);

	//resize scale for comparison
	vid.style.transform = `scale(1)`;
};


//add src
vid.src = vid.dataset.src;
vid.play();

(function () {
	var fixAutoPlay = function (e) {

		if (vid.paused) {
			vid.play();
			document.getElementById('mobileInstructions').style.visibility = "hidden";
		}

		// Remove events
		document.removeEventListener('touchstart', fixAutoPlay);
		document.removeEventListener('touchend', fixAutoPlay);
		document.removeEventListener('scroll', fixAutoPlay);
	};
	// iOS 6-8
	document.addEventListener('touchstart', fixAutoPlay);
	// iOS 9
	document.addEventListener('touchend', fixAutoPlay);
	// Scroll (Just in case for Desktop)
	document.addEventListener('scroll', fixAutoPlay);

	if (vid.paused) {
		document.getElementById('mobileInstructions').style.visibility = "visible";
	}

})();