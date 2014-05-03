$(document).ready(function () {
  $('.uiSideNav').append('<li class="sideNavItem stat_elem" id="idWardButton"><div class="buttonWrap"><div class="_6a mas uiPopover uiSideNavEditButton" title="Edit" id="u_0_2u"><img class="_26tg _p img" src="https://fbstatic-a.akamaihd.net/rsrc.php/v2/yH/r/JUEgzOwVY38.png" alt="" title="Edit" aria-label="Edit Messages" aria-haspopup="true" aria-expanded="false" id="u_0_2v" width="12" height="12" role="button"></div></div><a class="item clearfix sortableItem" title="Ward" data-gt="{&quot;bmid&quot;:&quot;2344061033&quot;,&quot;count&quot;:&quot;11&quot;,&quot;bookmark_type&quot;:&quot;type_facebook_app&quot;,&quot;rank&quot;:&quot;3&quot;}"><div class="rfloat"><span class="img _55ym _55yn _55yo _5tqs uiSideNavSpinner" aria-label="Loading..." aria-busy="1"></span><span class="count _5wk0 uiSideNavCount"><span class="countValue fss"></span><span class="maxCountIndicator"></span></span><span class="grip"></span></div><div><span class="imgWrap"><img src="https://lh6.ggpht.com/HezkCU4jTvkHoR6CgufId5e0IL32UPsfdJsT4m1klwbxq21uIlRUzpDj2hheBZQNa8c=w300" class="img" alt width="16" height="16"/></span><div class="linkWrap hasCount">Ward</div></div></a><span class="mover hidden_elem"></span></li>')
  var news = $('#topnews_main_stream_408239535924329').html();

  $('#idWardButton').click(function () {
    $.get( "", {} )

    $('#contentArea').children().remove();
    $('#contentArea').append(news);
  });
});