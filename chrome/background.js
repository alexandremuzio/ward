var url = "http://steel-lacing-568.appspot.com/";
var i = 0;
function readMessage(request, sender, callback){
	console.log("BG receives message from ");

	if(request.code === "search"){
		console.log("BG executes search" + i++);
		$.post(url + "search", {user_id: request.user_id, post_id: request.post_id},
			function(data){
				console.log("BG search sending response" + (i - 1) + "  post_id: " + data.post_id);
				chrome.tabs.query({url: '*://www.facebook.com/*'},
					function(tabs) {
				        for (var i = 0; i < tabs.length; i++) {
				            chrome.tabs.sendMessage(tabs[i].id, {status: data.status, post_id: data.post_id, code: 'update'});
				        }
				    });
				//chrome.runtime.sendMessage({status: data.status, post_id: data.post_id, code: 'update'});
			});


	} else if(request.code === "insert"){
		console.log("BG executes insert");
		$.post(url + "insert", {user_id: request.user_id, post_id: request.post_id},
		function(data) {
			chrome.tabs.query({url: '*://www.facebook.com/*'},
				function(tabs) {
			        for (var i = 0; i < tabs.length; i++) {
			            chrome.tabs.sendMessage(tabs[i].id, {status: 'true', post_id: data.post_id, code: 'update'});
			        }
			    });
		});

	} else if(request.code === "delete"){
		console.log("BG executes delete");
		$.post(url + "delete", {user_id: request.user_id, post_id: request.post_id},
		function(data) {
			chrome.tabs.query({url: '*://www.facebook.com/*'},
				function(tabs) {
			        for (var i = 0; i < tabs.length; i++) {
			            chrome.tabs.sendMessage(tabs[i].id, {status: 'false', post_id: data.post_id, code: 'update'});
			        }
			    });
		});

	}

}

chrome.runtime.onMessage.addListener(readMessage);

console.log("tentou addListener");