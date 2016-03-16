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
  var elems = [getItemElement()];
  // make jQuery object
  var $elems = $(elems);
  $grid.append($elems).masonry('appended', $elems);
});

// create <div class="grid-item"></div>
function getItemElement() {
  var elem = document.createElement('div');
  var hRand = Math.random();
  var heightClass = hRand > 0.85 ? 'grid-item--height4' : hRand > 0.6 ? 'grid-item--height3' : hRand > 0.35 ? 'grid-item--height2' : '';
  elem.className = 'grid-item ' + heightClass;
  return elem;
}