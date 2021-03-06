(function() {
  $.get('/artworks', function(data) {
    $('.thumbnail').each(function() {
      var urls = data[$(this).attr('href')];
      for (var i = 0; i < urls.length; i++) {
        $('<img src="' + urls[i] + '" />').appendTo($(this));
      }
    });
  });
  var uri = location.protocol + '//' + location.host;
  var primus = Primus.connect(uri, {strategy: false});
  primus.on('open', function() {
    primus.send('getoverview', function(data) {
      for (var prop in data) {
        $('#' + prop).text(data[prop]);
      }
    });
    primus.on('updateoverview', function(room, players) {
      $('#' + room).text(players);
    });
  });
})();
