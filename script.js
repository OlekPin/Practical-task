$(document).ready(function () {

    var song = {};
    var currentPage = 0;
    var songsPerPage = 9;

    //Events
    $('#prev').click(function () {
        currentPage--;
        updatePageResultList();
    });
    $('#next').click(function () {
        currentPage++;
        updatePageResultList();
    });

    //Main function to update results on page
    function updatePageResultList() {
        //If there are songs
        if (typeof (song.results) != "undefined" && song.resultCount > 0) {

            var from = currentPage * songsPerPage;
            var to = from + songsPerPage;

            //Display song data 
            var songListHtml = "";
            for (var i = from; i < to && i < song.resultCount && typeof (song.results[i]) != "undefined"; i++) {
                songListHtml += '<a href="#">' +
                    '<div class="songitem">' +
                    '<div class="album-cover song" id="albumid' + i + '">' +
                    '<img src="' + song.results[i].artworkUrl100 + '" alt="Album cover">' +
                    '</div>' +
                    '<div class="song-descr song">' +
                    '<div class="song-name" id="songid' + i + '">' + song.results[i].trackName + '</div>' +
                    '<div class="song-divider"></div>' +
                    '<div class="singer" id="singerid' + i + '">By ' + song.results[i].artistName +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</a>';
            }

            //Navigation Buttons
            if (currentPage !== 0) {
                $('#prev').css('display', 'inline-block');
            } else {
                $('#prev').css('display', 'none');
            }
            if (typeof (song.results[to + 1]) != "undefined") {
                $('#next').css('display', 'inline-block');
            } else {
                $('#next').css('display', 'none');
            }

            //Updates on Page
            $('#songlist').html(songListHtml);
            $('#found').html("Found " + song.resultCount + " songs");
        } else {
            //If there are no songs
            $('#found').html("");
            $('#songlist').html("Sorry, no matches found");
        }
    }

    //On search
    $("#search-form").submit(function (event) {
        var value = $("input:first").val()
        var URL = "https://itunes.apple.com/search?term=" + value + "&entity=song" //API URL
        event.preventDefault();
        $.ajax({
            type: 'GET',
            url: URL
        }).done(function (response) {
            song = JSON.parse(response);
            updatePageResultList();
        }).fail(function (response) {
            $('#songlist').html("Sorry, no matches found");
        });
    });
});