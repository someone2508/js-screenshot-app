const screenShotBtn = document.querySelector("#src-btn");
const screenShotPreview = document.querySelector(".src-preview");
const closeBtn = document.querySelector("#close-btn");

const captureScreen = async () => {
  try {
    // ask for permission to record current tab
    const stream = await navigator.mediaDevices.getDisplayMedia({
      preferCurrentTab: true,
    });

    console.log("Allowed!");

    const video = document.createElement("video");

    video.addEventListener("loadedmetadata", () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      // passing the height and width of the video to canvas
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // if video is not played, you will observe a blank/black screen!
      video.play();

      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // terminating first video track of your stream!
      stream.getVideoTracks()[0].stop();

      screenShotPreview.querySelector("img").src = canvas.toDataURL();
      screenShotPreview.classList.add("show");
    });

    // video is just an html element, here we need to specify the stream/src/content what it should should
    video.srcObject = stream;
  } catch (error) {
    console.log("Not allowed!");
    alert("Failed to capture the screenshot!");
  }
};

screenShotBtn.addEventListener("click", captureScreen);
