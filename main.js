// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);
function saveBookmark(e)
{
    var siteName = document.getElementById('siteName').value;
    var siteUrl  = document.getElementById('siteUrl').value;

    if(!validateForm(siteName, siteUrl)){
        return false;
      }

    var bookmark = {
        name: siteName,
        url: siteUrl
      }

    if (localStorage.getItem('bookmarks') === null)
    {
        var bookmarks = [];
        bookmarks.push(bookmark);

        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    else{
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    removeForm();
    displayForm();
    e.preventDefault();
}

function removeForm()
{
     name: siteName = "";
     url: siteUrl = "";
}

function displayForm()
{
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    var bookmarksResults = document.getElementById('bookmarksResults');

    bookmarksResults.innerHTML = '';
    for(var i=0; i < bookmarks.length; i++)
    {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="well-display">'+
          '<h3>'+name+
              ' <a class="btn btn-primary" target="_blank" href="' + addHttp(url) + '"> <i class="far fa-eye"></i> Visit</a> ' +
              ' <a onclick="deleteBookmark(\''+ url +'\')" class="btn btn-danger" href="#"><i class="far fa-trash-alt"></i> Delete</a> ' +
          '</h3>'+
          '</div>';
    }
}

function deleteBookmark(url)
{
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  for(var i =0; i < bookmarks.length; i++){
    if(bookmarks[i].url == url)
    {
      bookmarks.splice(i, 1);
    }
  }
  // Re-set back to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  displayForm();
}

// Validate Form
function validateForm(siteName, siteUrl){
  if(!siteName || !siteUrl){
    alert('Please fill in the form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)){
    alert('Please use a valid URL');
    return false;
  }

  return true;
}

function addHttp(url) {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
      url = "http://" + url;
  }
  return url;
}
