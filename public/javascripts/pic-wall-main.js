"use strict";

var $grid = $('.grid').masonry({
  itemSelector: '.grid-item',
  percentPosition: true,
  columnWidth: '.grid-sizer'
});
// layout Isotope after each image loads
$grid.imagesLoaded().progress( function() {
  $grid.masonry();
});  

function showPics(result){
  var allPics = result.pics;
  var elems = allPics.map(getItemElement);
  var $elems = $(elems);
  $grid.append($elems).masonry('appended', $elems);
}

function getItemElement(pic) {
  var elem = document.createElement('div');
  var image = document.createElement('img');
  image.src = pic.url;
  var overlay = document.createElement('a');
  overlay.className = "overlay";
  overlay.href = "#";

  var imageTitle = document.createElement('p');
  imageTitle.className = "title";
  var text = document.createTextNode(pic.title);
  imageTitle.appendChild(text);
  overlay.appendChild(imageTitle);
  elem.appendChild(image);
  elem.appendChild(overlay);
  var hRand = Math.random();
  var heightClass = hRand > 0.85 ? 'grid-item--height4' : hRand > 0.6 ? 'grid-item--height3' : hRand > 0.35 ? 'grid-item--height2' : '';
  elem.className = 'grid-item ' ;
  return elem;
}

$grid.on( 'click', '.grid-item', function( event ) {
  event.preventDefault();
  $grid.masonry( 'remove', event.currentTarget )
    // trigger layout
    .masonry();
});


 $.getJSON('http://localhost:3000/all-pics', showPics)




// $('.add-button').on('click', function(event) {
//   event.preventDefault();
//   url = $("#url").val();
//   title = $("#title").val();
//   var elems = [getItemElement(url, title)];
//   // make jQuery object
//   var $elems = $(elems);
//   $grid.append($elems).masonry('appended', $elems);
  
//   $.getJSON('http://localhost:3000/all-pics', storeNewPic)
// });


// $grid.on( 'click', '.grid-item', function( event ) {
//   event.preventDefault();
//   $grid.masonry( 'remove', event.currentTarget )
//     // trigger layout
//     .masonry();
// });




