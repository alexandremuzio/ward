//To Do
$(document).ready(function () {
  $('.uiSideNav').first().append('<li class="sideNavItem stat_elem" id="idWardButton"><a class="item clearfix sortableItem" id="wardClick" title="Favorites" data-gt="{&quot;bmid&quot;:&quot;2344061033&quot;,&quot;count&quot;:&quot;11&quot;,&quot;bookmark_type&quot;:&quot;type_facebook_app&quot;,&quot;rank&quot;:&quot;3&quot;}"><div class="rfloat"><span class="img _55ym _55yn _55yo _5tqs uiSideNavSpinner" aria-label="Loading..." aria-busy="1"></span><span class="count _5wk0 uiSideNavCount"><span class="countValue fss" id="quant"></span><span class="maxCountIndicator"></span></span><span class="grip"></span></div><div><span class="imgWrap"><img src="https://cdn3.iconfinder.com/data/icons/token/Token,%20128x128,%20PNG/Star-Favorites.png" class="img" alt width="16" height="16"/></span><div class="linkWrap hasCount">Favorites</div></div></a><span class="mover hidden_elem"></span></li>')
  $('#quant').text("Update!");


  $('#wardClick').click(function () {
    var composer = $('#pagelet_composer');
    var megaphone = $('#pagelet_megaphone');
    $('#contentArea').replaceWith('<div id="contentArea"></div>');
    $('#contentArea').append('<div class="_4-u2 mvm _495i"><div class="fsm fwn fcg"><span style="padding-left: 17px;" class="uiIconText"><img class="img" src="http://www.designdownloader.com/item/pngl/crystal_star/crystal_star-20111003215155-00030.png" alt style="top: 0px;" width="17" height="17"><span class="_c24">Viewing most recent favorite posts</span></span></div></div>');
    //Handling group pages
    $('#headerArea').replaceWith('<div id="headerArea" hidden="true"></div>');
    //User logged on facebook!
    var y = JSON.parse($(".fbxWelcomeBoxBlock._8o._8s.lfloat._ohe").attr("data-gt"));
    var USER = y.bmid.toString();
    console.log(USER);

  
    $.post( "http://steel-lacing-568.appspot.com/query", { user_id: USER }, function(data) {
      $('#imag').fadeIn();
      if (data.length == 0) {$('#contentArea').replaceWith('<div class="_4-u2 mvm _495i"><div class="fsm fwn fcg"><span style="padding-left: 17px;" class="uiIconText"><span class="_c24">You do not have any favorite posts yet</span></span></div></div>');
}
      if (data.length > 0) { $('#quant').text(data.length); }
      data.sort(function(a,b){ return a.time < b.time; });
       	for (var i = 0; i < data.length; i++) {
          var obj = data[i];
          var j = obj.post_id.indexOf('_');
       		var id = obj.post_id.slice(0, j);
    	   	var post_id = obj.post_id.slice(j+1);

    		$('#contentArea').append('<div id="myDiv' + i + '"></div>');
      	$('#myDiv' + i).load('https://www.facebook.com/' + id + '/posts/' + post_id + '?stream_ref=1&_fb_noscript=1 #stream_pagelet', function () {
          //$('#myDiv' + i).find('.UFILikeLink').remove();
          //$('#myDiv' + i).find('.uiLinkButton.comment_link').remove();
        });
    	};
    });
  });
});