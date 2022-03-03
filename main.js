Object_Name = "";
video = "";
Status = "";
objects = [];
var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

function setup(){
    canvas = createCanvas(380, 280);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 280);
    video.hide();
}

function start(){
        objectDetector = ml5.objectDetector('cocossd', modelLoaded);
        document.getElementById("status").innerHTML = "Status: Detecting Objects";
        document.getElementById("name").value = Object_Name;

        if(objects[i].label == Object_Name){
            Object_Name_webcamLiveView.stop();
            objectDetector.detect(gotResult);
            document.getElementById("object_status").innerHTML = Object_Name + "Found";
            speak();
        }
        else{
            document.getElementById("object_status").innerHTML = Object_Name + "Not Found"; 
        }
        if(objects.length == 0){
            Object_Name_webcamLiveView.stop();
            objectDetector.detect(gotResult);
            document.getElementById("object_status").innerHTML = Object_Name + "Found";
            speak();
        }
    }
    function speak(){
        var synth = window.speechSynthesis;
    
        speak_data = "Object mentioned Found";
    
        var utterThis = new SpeechSynthesisUtterance(speak_data);
    
        synth.speak(utterThis);
    }

    function modelLoaded(){
        console.log("Model Loaded!");
        Status = true;
    }

    function draw(){
        image(video, 0, 0, 380, 280);
        objectDetector.detect(video, gotResult);
        for(i=0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y +15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
  
    }

    function gotResult(error, results){
        if(error){
            console.error(error);
        }
        console.log(results);
        objects = results;
    }