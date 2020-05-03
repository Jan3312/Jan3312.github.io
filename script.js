const video = document.getElementById('video')
let size = 0.8;
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    //Gets the content from the webcam
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    //Displays facial expression
    //const results = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions()
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
/*
    export type FaceExpression = 'neutral' | 'happy' | 'sad' | 'angry' | 'fearful' | 'disgusted' | 'surprised'

    export type FaceExpressionPrediction = {
      expression: FaceExpression,
      probability: number
    }
export type WithFaceExpressions<TSource> TSource & {
  expressions: FaceExpressionPrediction[]
}
*/
const expressions = resizedDetections[0].expressions;
    //If facial expression size is greater than 0 (facial expression detected) change the text in p
    if ((expressions.happy > 0.98) && (document.getElementById("p1").innerHTML === "I brighten people’s day")) {

            if (resizedDetections && Object.keys(resizedDetections).length > 0.9) {
              const expressions = resizedDetections.expressions;
            
              //Get angry riddle
              document.getElementById("p1").innerHTML = "Red as a ballon,";
              document.getElementById("p2").innerHTML = "my duration is as short as a child,";
              document.getElementById("p3").innerHTML = "or as long as a snake,";
              document.getElementById("p4").innerHTML = "I will make your head shake.";
              document.getElementById("p5").innerHTML = "What am I?";
            }
    }

    //If facial expression size is greater than 0 (facial expression detected) change the text in p
    if ((expressions.angry > 0.90) && (document.getElementById("p1").innerHTML === "Red as a ballon,")) {

            if (resizedDetections && Object.keys(resizedDetections).length > 0.9) {
              const expressions = resizedDetections.expressions;
            
              //Get surprised riddle
              document.getElementById("p1").innerHTML = "Her mouth gaped open,";
              document.getElementById("p2").innerHTML = "eyes wide open,";
              document.getElementById("p3").innerHTML = "as she gasped, her spagehtii";
              document.getElementById("p4").innerHTML = "went confetii on freddy.";
              document.getElementById("p5").innerHTML = "What is she?";
            }
    }

    //If facial expression size is greater than 0 (facial expression detected) change the text in p
    if ((expressions.surprised > 0.98) && (document.getElementById("p1").innerHTML === "Her mouth gaped open,")) {

            if (resizedDetections && Object.keys(resizedDetections).length > 0.9) {
              const expressions = resizedDetections.expressions;
            
                //Get sad riddle
                document.getElementById("p1").innerHTML = "A clown might make you feel down,";
                document.getElementById("p2").innerHTML = "or ghastly sounds when no one is around,";
                document.getElementById("p3").innerHTML = "for, however, long I am around";
                document.getElementById("p4").innerHTML = "you will find me upside down.";
                document.getElementById("p5").innerHTML = "What am I?";
            }
    }

    //If facial expression size is greater than 0 (facial expression detected) change the text in p
    if ((expressions.sad > 0.9) && (document.getElementById("p1").innerHTML === "A clown might make you feel down,")) {

            if (resizedDetections && Object.keys(resizedDetections).length > 0.9) {
              const expressions = resizedDetections.expressions;
            
                //Get neutral riddle
                document.getElementById("p1").innerHTML = "You saw me where I could not be yet";
                document.getElementById("p2").innerHTML = "often you see me.";
                document.getElementById("p3").innerHTML = "What am I?";
                document.getElementById("p4").innerHTML = "";
                document.getElementById("p5").innerHTML = "";

            }
    }

    //If facial expression size is greater than 0 (facial expression detected) change the text in p
    if ((expressions.neutral > 0.98) && (document.getElementById("p1").innerHTML === "You saw me where I could not be yet")) {

            if (resizedDetections && Object.keys(resizedDetections).length > 0.9) {
              const expressions = resizedDetections.expressions;
            
                //Get Win
                document.getElementById("p1").innerHTML = "You Win for now.....";
                document.getElementById("p2").innerHTML = "";
                document.getElementById("p3").innerHTML = "";
                document.getElementById("p4").innerHTML = "";
                document.getElementById("p5").innerHTML = "";

            }
    }


  }, 40)
})


