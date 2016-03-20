"use strict";
var url;
var title;
var user = $("#user").val();

var $grid = $('.grid').masonry({
  itemSelector: '.grid-item',
  percentPosition: true,
  columnWidth: '.grid-sizer'
});
// layout Isotope after each image loads
$grid.imagesLoaded().progress( function() {
  $grid.masonry();
});  


function filterUserPics(pic){
  return user === pic.user
}

//TODO retrieve all pics and filter on user's id.
function showUserPics (result){
  console.log('showuserpics called')
  var allPics = result.pics;
  var userPics = allPics.filter(filterUserPics);
  console.log('userpics', userPics);
  var elems = userPics.map(getItemElement);
  var $elems = $(elems);
  $grid.append($elems).masonry('appended', $elems);
}


function storeNewPic(result){
  var allPics = result.pics;
  allPics.push({"user": user, "title": title, "url": url});
  $.post('https://pic-wall.herokuapp.com/store-pic', {"data": allPics});
  // $.post('http://localhost:3000/store-pic', {"data": allPics});
}

$('.add-button').on('click', function(event) {
  event.preventDefault();
  url = $("#url").val();
  title = $("#title").val();
  var elems = [getItemElement(url, title)];
  // make jQuery object
  var $elems = $(elems);
  $grid.append($elems).masonry('appended', $elems);
  
  $.getJSON('https://pic-wall.herokuapp.com/all-pics', storeNewPic)
  // $.getJSON('http://localhost:3000/all-pics', storeNewPic)
});


$grid.on( 'click', '.grid-item', function( event ) {
  event.preventDefault();
  if (event.target.id !== undefined){ //clicking on the overlay text results in undefined
    $.post('https://pic-wall.herokuapp.com/remove-pic', {"url": event.target.id});
    // $.post('http://localhost:3000/remove-pic', {"url": event.target.id});
  }
  $grid.masonry( 'remove', event.currentTarget )
    // trigger layout
    .masonry();
});

$('a').on('click', function(event){
  event.preventDefault();
  var url = event.target.id;
})


function getItemElement(url, title) {
  console.log('getitemelement called')
  var elem = document.createElement('div');
  var image = document.createElement('img');
  image.src = url;
  var overlay = document.createElement('a');
  overlay.className = "overlay";
  overlay.href = "#";
  overlay.id = url;

  var imageTitle = document.createElement('p');
  imageTitle.className = "title";
  var text = document.createTextNode(title);
  imageTitle.appendChild(text);
  overlay.appendChild(imageTitle);
  elem.appendChild(image);
  elem.appendChild(overlay);
  var hRand = Math.random();
  var heightClass = hRand > 0.85 ? 'grid-item--height4' : hRand > 0.6 ? 'grid-item--height3' : hRand > 0.35 ? 'grid-item--height2' : '';
  elem.className = 'grid-item ' ;
  return elem;
}

$.getJSON('https://pic-wall.herokuapp.com/all-pics', showUserPics)


