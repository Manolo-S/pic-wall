"use strict";
var url;
var title;
var user = document.getElementById('user').textContent;
var userName = document.getElementById('userName').textContent;

var validURL;
var ext;
console.log('user', user);

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

function showUserPics (result){
  console.log('showuserpics called')
  var allPics = result.pics;
  var userPics = allPics.filter(filterUserPics);
  console.log('userpics', userPics);
  var elems = userPics.map(getItemElement2);
  var $elems = $(elems);
  $grid.append($elems).masonry('appended', $elems);
}


function storeNewPic(result){
  var allPics = result.pics;
  allPics.push({"user": user, "title": title, "url": url});
  $.post('https://pic-wall.herokuapp.com/store-pic', {"data": allPics});
  // $.post('http://localhost:3000/store-pic', {"data": allPics});
}

function check(extension){
    if (ext.indexOf(extension) > -1){
        validURL = true;
    }
}

function validateURL(url){
  ext = url.substr(url.length - 4, 4);
  var picFormats = ['tif', 'tiff', 'gif', 'jpeg', 'jpg', 'jif', 'jfif', 'jp2', 'jpx', 'j2k', 'j2c', 'fpx', 'pcd', 'png', 'pdf'];
  picFormats.map(check);
 }


$('.add-button').on('click', function(event) {
  event.preventDefault();
  validURL = false;
  url = $("#url").val();
  validateURL(url);
  if (validURL === false){
  //TODO display message that url needs to end with a valid pic extension
      return;
  }
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
  var target = $(event.target);
  var node = event.target.nodeName;
  console.log('target tagname', node)
  if (node === 'A'){
    url = target.siblings().attr('src');
    console.log(url);
  } else {
    url = target.parent().siblings().attr('src');
  }
  
  $.post('https://pic-wall.herokuapp.com/remove-pic', {"url": url, "user": user});
    // $.post('http://localhost:3000/remove-pic', {"url": event.target.id});
  
  $grid.masonry( 'remove', event.currentTarget )
    // trigger layout
    .masonry();
});

//TODO remove ?
// $('a').on('click', function(event){
//   event.preventDefault();
//   var url = event.target.id;
// })

function getItemElement2(pic) {
  var elem = document.createElement('div');
  var image = document.createElement('img');
  image.src = pic.url;
  var overlay = document.createElement('a');
  overlay.className = "overlay";
  overlay.href = "#";
  
  var imageUser = document.createElement('p');
  imageUser.className = "userName";
  var userText = document.createTextNode(userName);
  imageUser.appendChild(userText);
  var imageTitle = document.createElement('p');
  imageTitle.className = "title";
  var text = document.createTextNode(pic.title);
  imageTitle.appendChild(text);
  overlay.appendChild(imageUser);
  overlay.appendChild(imageTitle);
  elem.appendChild(image);
  elem.appendChild(overlay);
  var hRand = Math.random();
  var heightClass = hRand > 0.85 ? 'grid-item--height4' : hRand > 0.6 ? 'grid-item--height3' : hRand > 0.35 ? 'grid-item--height2' : '';
  elem.className = 'grid-item ' ;
  return elem;
}


function getItemElement(url, title) {
  console.log('getitemelement called')
  var elem = document.createElement('div');
  var image = document.createElement('img');
  image.src = url;
  var overlay = document.createElement('a');
  overlay.className = "overlay";
  overlay.href = "#";
  overlay.id = url;

  var imageUser = document.createElement('p');
  imageUser.className = "userName";
  var userText = document.createTextNode(userName);
  imageUser.appendChild(userText);
  var imageTitle = document.createElement('p');
  imageTitle.className = "title";
  var text = document.createTextNode(title);
  imageTitle.appendChild(text);
  overlay.appendChild(imageUser);
  overlay.appendChild(imageTitle);
  elem.appendChild(image);
  elem.appendChild(overlay);
  var hRand = Math.random();
  var heightClass = hRand > 0.85 ? 'grid-item--height4' : hRand > 0.6 ? 'grid-item--height3' : hRand > 0.35 ? 'grid-item--height2' : '';
  elem.className = 'grid-item ' ;
  return elem;
}

$.getJSON('https://pic-wall.herokuapp.com/all-pics', showUserPics)


