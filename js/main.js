//YouTube API Key
//AIzaSyBR55y-MSJ3gmcx9oHNffilb_CX6vcW01Q
//Client ID
//1036247911535-uf0qvd7pdmvhqonaehh00459e1ne9oqb.apps.googleusercontent.com
// Client Secret
//IkKMoKjOaeHoQr48YlYD5l_m
//The endpoint is
//"https://www.googleapis.com/youtube/v3/search"


//Endpoint URL
var YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

//HTML template to be added dynamically to show results
var RESULT_HTML_TEMPLATE = (
  '<div class="results-div">' +
  '<div class="img-container"><img class="tnail js-thumbnail" src="" alt=""></div>' +
  '<h3 class="js-title"></h3></div>'
);

//get JSON data using search term
function getDataFromApi(searchTerm, callback) {
  console.log('getDataFromApi');
  var query = {
    part: 'snippet',
    key: 'AIzaSyBR55y-MSJ3gmcx9oHNffilb_CX6vcW01Q',
    q: searchTerm + 'in:name',
    per_page: 10
  }
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

/*  console logs of returned JSON data (substitute for "callback);}" above)

            function(returnedText) {
    console.log(returnedText);
    var jsonText = returnedText;
    console.log(jsonText);   console.log(jsonText.items[0].snippet.thumbnails.medium.url);
    console.log(jsonText.items[0].snippet.title);
  });
}

*/

//Adds returned results to HTML template
function renderResult(result) {
  $('.js-results-header').text("Results");
  var template = $(RESULT_HTML_TEMPLATE);
  template.find('.js-thumbnail').attr("src", result.snippet.thumbnails.medium.url);
  template.find(".js-title").text(result.snippet.title);
  return template;
}

//Adds the complete HTML template to the DOM so it is displayed
function displayYouTubeSearchData(data) {
  var results = data.items.map(function(item, index) {
    return renderResult(item);
  });
  $('.js-search-results').html(results);
}

//Event listener for submit, gets user search term and assigns it to variable
function watchSubmit() {
  $('.js-search-form').submit(function(event) {
    event.preventDefault();
    var queryTarget = $(event.currentTarget).find('.js-query');
    var query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(watchSubmit);

