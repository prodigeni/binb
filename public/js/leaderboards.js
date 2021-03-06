(function() {
  var appendResults = function(data, leaderboard, offset, type) {
    for (var i=0; i<data.length; i+=2) {
      var link = $('<a href="/user/'+data[i]+'"></a>').text(data[i])
        , col1 = '<td>'+(++offset)+'</td>'
        , col2 = $('<td></td>').append(link)
        , col3 = (type === 'points')
          ? '<td>'+data[i+1]+'</td>'
          : '<td><i class="icon-time"></i> '+(data[i+1] / 1000).toFixed(2)+' sec</td>';
      var row = $('<tr></tr>').append(col1, col2, col3);
      leaderboard.append(row);
    }
  };

  $('.leaderboard-wrapper').each(function(index) {
    var leaderboard = $(this).find('tbody')
      , loading = $(this).find('.loading')
      , offset = 0
      , type = (index === 0) ? 'points' : 'times';

    $(this).scroll(function() {
      var diff = $(this).prop('scrollHeight') - $(this).scrollTop();
      if (diff === $(this).height() && offset < 180) {
        offset += 30;
        loading.show();
        $.get('/sliceleaderboard', {begin: offset, by: type}, function(data) {
          loading.hide();
          appendResults(data, leaderboard, offset, type);
        });
      }
    });
  });
})();
