var channelName = 'BuzzFeedVideo';
var vidWidth = 400;
var vidHeight = 300;

$(document).ready(function(){
	$.get(
		"https://www.googleapis.com/youtube/v3/channels", {
			part:  'contentDetails',
			forUsername: channelName,
			key: 'AIzaSyD75Kh_zrUJQBiyXgZMh7CGbDlbNU9IMRA'},
			function(data){
				$.each(data.items, function(i, item){
					console.log(item);
					pid = item.contentDetails.relatedPlaylists.uploads;
					getVids(pid);
				})
			});
	function getVids(pid){
		$.get(
			"https://www.googleapis.com/youtube/v3/playlistItems", {
				part:  'snippet',
				maxResults: 10,
				playlistId: pid,
				key: 'AIzaSyD75Kh_zrUJQBiyXgZMh7CGbDlbNU9IMRA'},
				function(data){
					var output;
					$.each(data.items, function(i, item){
						console.log(item);
						videTitle = item.snippet.title;
						videoId = item.snippet.resourceId.videoId;

						output = '<li><iframe height="'+vidHeight+'" width="'+vidWidth+'" src=\"//www.youtube.com/embed/'+videoId+'\"></iframe></li>'

						//Append to results listStyleType
						$('#results').append(output);
					})
				});
		};
});

