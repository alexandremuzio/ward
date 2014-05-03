$(document).ready(
	function (){
		var url = "http://steel-lacing-568.appspot.com/";

		function action(){
			//var x = JSON.parse($(this).parent().parent().parent().children("input[name=feedback_params]").attr("value"));
			var POSTID = $(this).attr("id");
			console.log("click on " + POSTID);
			var y = JSON.parse($(".fbxWelcomeBoxBlock._8o._8s.lfloat._ohe").attr("data-gt"));
			var USER = y.bmid.toString();
			console.log("user is " + USER);
			if($(this).attr("title") === "Ward this"){
				console.log("CLIENT asks for server request insert");
				chrome.runtime.sendMessage(
					{code: "insert", user_id: USER, post_id: POSTID}
				);
			}
			if($(this).attr("title") === "Unward this"){
				console.log("CLIENT asks for server request delete");
				chrome.runtime.sendMessage(
					{code: "delete", user_id: USER, post_id: POSTID},
					function(response) {}
				);
			}

		}

		function checkStatus () {
			console.log ($(this)[0]);
			try{
				var x = JSON.parse($(this).parent().parent().children("input[name=feedback_params]").attr("value"));
				var POSTID = x.actor + "_" + x.target_fbid;
				var y = JSON.parse($(".fbxWelcomeBoxBlock._8o._8s.lfloat._ohe").attr("data-gt"));
				var USER = y.bmid.toString();
				$(this).children(".ward").attr("id", POSTID).click(action);
				console.log("CLIENT asks BG for server request search");
				chrome.runtime.sendMessage(
					{code: "search", user_id: USER, post_id: POSTID}
				);
				console.log("batata");
				console.log(chrome.runtime.lastError);
			}
			catch(err){
				console.log($(this)[0]);
			}
		}

		function responseListener(data, sender, sendResponse){
			console.log("CLIENT receives message from ");
			if(data.code === 'update'){
				console.log("CLIENT executes");
				if(data.status === "true"){
					console.log("entrou no true");
					$("#" + data.post_id).attr("title", "Unward this").html("Unward");
				}
				else{
					console.log("entrou no false");
					console.log(data.post_id);
					$("#" + data.post_id).attr("title", "Ward this").html("Ward");


				}
			}
		}


		function createTag(){
			$(this).append(" · ");
			$(this).append($("<a class='ward'></a>")).each(checkStatus);
		}

		chrome.runtime.onMessage.addListener(responseListener);
		
		var loadNewWardButtons = function() {
			$("._5pcp._5vsi.lfloat._ohe").each(function() {
		    	if ($(this).find('.ward').length == 0) {
		     	 $(this).each(createTag);
		  		}
			});
			setTimeout(loadNewWardButtons, 100);
		};

		loadNewWardButtons();

	}
	);