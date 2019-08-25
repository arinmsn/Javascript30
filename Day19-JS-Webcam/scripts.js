const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

function getVideo() {
	navigator.mediaDevices
		.getUserMedia({ video: true, audio: false })
		.then(localMediaStream => {
			console.log(localMediaStream);
			video.src = window.URL.createObjectURL(localMediaStream);
			video.play();
		})
		.catch(err => {
			console.error(`Error: `, err);
		});
}

function paintToCanvas() {
	const width = video.videoWidth;
	const height = video.videoHeight;
	canvas.width = width;
	canvas.height = height;

	return setInterval(() => {
		ctx.drawImage(video, 0, 0, width, height);
		let pixels = ctx.getImageDate(0, 0, width, height);
		pixels = redEffect(pixels);
	}, 16);
}

function takePhoto() {
	// Play the sound
	snap.currentTime = 0;
	snap.play();

	// Take data out of the canvas
	const data = canvas.toDataURL("image/jpeg");
	const link = document.createElement("a");
	link.href = data;
	link.setAttribute("download", "webcam-Photo");
	link.innerHTML = `<img src="${data}" alt="snapshot of webcam" />`;
	strip.insertBefore(link, strip.firstChild);
}

//  Filters

getVideo();

video.addEventListener("canplay", paintToCanvas);
