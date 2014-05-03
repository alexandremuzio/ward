function createTag() {
	$(this).append('.');
	$(this).append(' <a id="cards">Ward</a>');
};

var f = function() {
	$("._5pcp._5vsi.lfloat._ohe").each(function() {
    	if ($(this).find('#cartas').length == 0) {
     	 $(this).each(createTag);
  		}
	});
};

var replay = function() {
	f();
	setTimeout() {function() {}, 100}
	replay();
}