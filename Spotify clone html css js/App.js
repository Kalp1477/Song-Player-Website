// Initialize the variables
let songIndex=0;
let audioElement = new Audio("song1.mp3");
let masterPlay=document.getElementById("masterPlay");
let myProgressBar=document.getElementById("myProgressBar");
let gif=document.getElementById("gif");
let masterSongName=document.getElementById("masterSongName");
let songItems=Array.from(document.getElementsByClassName("songItem"))   ;

let songs=[
        {songName:"Te Amo",filePath:"song1.mp3",coverPath:"TeAmoImage.jpg"},
        {songName:"Darkhaast",filePath:"song2.mp3",coverPath:"darkhaastImage.jpg"},
        {songName:"Gazab Ka Hai Din",filePath:"song3.mp3",coverPath:"gazab ka hai Din Image.webp"},
        {songName:"Tum Se Hi",filePath:"song4.mp3",coverPath:"Tum se hi Image.jpg"},
        {songName:"Raabta",filePath:"song5.mp3",coverPath:"raabtaImage.jpg"},
        {songName:"Halka Halka",filePath:"song6.mp3",coverPath:"halka halka Image.jpg"},
        {songName:"Humdard",filePath:"song7.mp3",coverPath:"humdardImage.jpg"},
]

songItems.forEach((element,i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

//audioElement.play();

// handle play/pause click
masterPlay.addEventListener("click", ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        gif.style.opacity=0;
    }
})

// Listen to Events
audioElement.addEventListener("timeupdate",()=>{
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener("change", ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = (()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
            //console.log(e.target);
            element.classList.remove("fa-solid", "fa-circle-pause");
            element.classList.add("fa-solid", "fa-circle-play");
    })
})

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener("click",(e)=>{
        //console.log(e.target);
        makeAllPlays();
        songIndex=parseInt(e.target.id);
        e.target.classList.remove("fa-solid", "fa-circle-play");
        e.target.classList.add("fa-solid", "fa-circle-pause");
        audioElement.src=`song${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove("fa-solid", "fa-circle-play");
        masterPlay.classList.add("fa-solid", "fa-circle-pause");
    })
})

document.getElementById("next").addEventListener("click", ()=>{
    if(songIndex>=6){
        songIndex=0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src=`song${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove("fa-solid", "fa-circle-play");
    masterPlay.classList.add("fa-solid", "fa-circle-pause");
})

document.getElementById("previous").addEventListener("click", ()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src=`song${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove("fa-solid", "fa-circle-play");
    masterPlay.classList.add("fa-solid", "fa-circle-pause");
})