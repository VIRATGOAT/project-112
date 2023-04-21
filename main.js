prediction="";

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='captured_image' src="+data_uri+">";
    })
}

console.log("ml5 version:", ml5.version)

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/X7Bac02bF/model.json', modelLoaded)
function modelLoaded(){
    console.log("modelLoaded");
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data_1="The prediction is "+ prediction;
   
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}
function predictEmotion(){
    img=document.getElementById("captured_image");
    classifier.classify(img,gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        
     
        prediction=results[0].label;
        toSpeak="";
        if(prediction=="Peace"){
            toSpeak = "Peace";
            document.getElementById("update_emoji").innerHTML="&#9996;";

        }
        if(prediction=="Thumbs Up"){
            toSpeak = "Thumbs up";
            document.getElementById("update_emoji").innerHTML="&#128077;"
        }
        if(prediction=="Ok"){
            toSpeak = "Ok"
            document.getElementById("update_emoji").innerHTML="&#128076;"
        }
        speak();
    }

        
        
}
