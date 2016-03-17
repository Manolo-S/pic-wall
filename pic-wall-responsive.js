var $grid = $('.grid').masonry({
  itemSelector: '.grid-item',
  percentPosition: true,
  columnWidth: '.grid-sizer'
});
// layout Isotope after each image loads
$grid.imagesLoaded().progress( function() {
  $grid.masonry();
});  




$('.add-button').on('click', function(event) {
  event.preventDefault();
  var link = $("#link").val();
  var title = $("#title").val();
  var elems = [getItemElement(link, title)];
  // make jQuery object
  var $elems = $(elems);
  $grid.append($elems).masonry('appended', $elems);

  // 1) Retrieve array [[title, link], [title, link], etc.] from database 
  // 2) add new link and title to array and store array in database
});


$grid.on( 'click', '.grid-item', function( event ) {
  event.preventDefault();
  $grid.masonry( 'remove', event.currentTarget )
    // trigger layout
    .masonry();
});


function getItemElement(link, title) {
  var elem = document.createElement('div');
  var image = document.createElement('img');
  image.src = link;
  var overlay = document.createElement('a');
  overlay.className = "overlay";
  overlay.href = "#";

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



