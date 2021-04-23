Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("cam");

Webcam.attach(camera);

function capture(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="snapshot" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version: ', ml5.version);

model = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/CNck3lcZb/model.json', loaded);

function loaded(){
    console.log('The model has been loaded. ');
}

function identify(){
    img = document.getElementById("snapshot");
    model.classify(img, gotResult);
}

function gotResult(error, results){
    if (error){
        console.error(error);
    } else{
        console.log(results);
        document.getElementById("value_object").innerHTML = results[0].label;
        value = results[0].confidence.toFixed(3);
        document.getElementById("value_accuracy").innerHTML = (value*100) + "% ";
    }
}