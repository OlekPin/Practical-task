$("#search-form").submit(function (event) {
    var value = $("input:first").val()
    var URL = "https://itunes.apple.com/search?term=" + value + "&entity=song" //API URL

    event.preventDefault();
    $.ajax({
    type: 'GET',
    url: URL
}).done(function (response) {
    var song = JSON.parse(response)

    console.log(song)//To remove!!!
    var name = ""
    var artist = ""
    var album = ""
    document.getElementById ("songlist").innerHTML = ""


    var container = document.getElementById("songlist");

for (var i = 0; i < song.results.length; i++) { //Adding divs with songs
    container.innerHTML += '<a href="#">'
+ '<div class="songitem">'                                
+ '<div class="album-cover song" id="albumid' + i + '">'
+ '</div>'
+ '<div class="song-descr song">'
+'<div class="song-name" id="songid'+ i +'"></div>'
+'<div class="song-divider"></div>'
+'<div class="singer" id="singerid' + i + '">'
+'</div>'
+'</div>'                                    
+'</div>'
+ '</a>';

}


for (i in song.results) { //Display song data

    for (j in song.results[i].trackName){
        name += song.results[i].trackName[j];
    }
    document.getElementById ("songid"+i).innerHTML = name   
    name = ""

    for (j in song.results[i].artistName){
        artist += song.results[i].artistName[j];
    }
    document.getElementById ("singerid"+i).innerHTML = 'By ' + artist
    artist = ""

    for (j in song.results[i].artworkUrl100){
        album += song.results[i].artworkUrl100[j];
    }
    document.getElementById ("albumid"+i).innerHTML = '<img src="' + album + '" alt="Album cover">'
    album = ""
}

var c = parseInt(i)+1
console.log(c)

if (song.resultCount >0){
    document.getElementById ("found").innerHTML = "Found " + c + " songs"
}
else {
    document.getElementById ("found").innerHTML = ""
    container.innerHTML =  "Sorry, no matches found"
}

}).fail(function (response) {
    if( !$.trim( $('#songlist').html() ).length ) {
        container.innerHTML =  "Sorry, no matches found"
    }
});
});
    

