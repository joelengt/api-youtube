var $btn_search = document.querySelector('#btn_search')
var $box_search = document.querySelector('#box_search')

var url = 'https://www.googleapis.com/youtube/v3/search'
var KEY = 'AIzaSyCL8pOuNlf3d_hBrY-CwhWu_EI-jOr9w0I'

var url_canal = 'https://www.youtube.com/channel/'
var form_url_video = 'https://www.youtube.com/embed/'
var options_video = '?rel=0&autoplay=1'
// var insertar_template = '<iframe width="560" height="315" src="https://www.youtube.com/embed/eNa6eAwdUss" frameborder="0" allowfullscreen></iframe>'

var search_defect = 'Rktecnology'

$btn_search.addEventListener('click', SearchVideo)

function SearchVideo (event) {

$.ajax({
    data : {
        q:  $box_search.value || search_defect,
        key: KEY,
        part: 'snippet',
        maxResults: 10,
    },
    url: url
}).done( callback )
	
}

function callback(res) {

	var videos = res.items

	var template_list = document.querySelector('.videos_list')
	template_list.innerHTML = ''

	document.querySelector('.loader').style.display = 'none'

	videos.map(function (element){
	

		var canal_id = element.snippet.channelId
		var canal_title = element.snippet.channelTitle

		var video_cover = element.snippet.thumbnails.medium.url
		var video_title = element.snippet.title
		var video_description = element.snippet.description
		var video_pulished = element.snippet.publishedAt
		var video_id = element.id.videoId

		var url_chanel = url_canal + canal_id

		var div = document.createElement('div')
		
		// var video_link = document.createElement('a')
		// var cover = document.createElement('img')
		var title = document.createElement('a')
		var description = document.createElement('p')
		var published = document.createElement('strong')
		var channel_go = document.createElement('a')
		var url_video = form_url_video + video_id + options_video
		

		title.innerHTML = video_title
		title.href = url_video
		title.target= '_blank'
		title.classList.add('video__title')

		description.innerHTML = video_description
		description.classList.add('video__description')

		published.innerHTML = video_pulished
		published.classList.add('video__published')

		channel_go.href = url_chanel
		channel_go.target = '_blank'
		channel_go.innerHTML = canal_title
		channel_go.classList.add('video__channel_go')

		var cover_video = document.createElement('div')
		var video_info = document.createElement('div')


		if(video_id === undefined) {
			title.href = url_chanel
			cover_video.innerHTML = `<a href="${url_chanel}" target="_blank"> <img src=${video_cover} width="100" height="100"></a>`
		} else {
			cover_video.innerHTML = `<a href="${url_video}" target="_blank"> <img src=${video_cover} width="196" height="110"></a>`
		}

		cover_video.classList.add('video__cover')
		video_info.classList.add('video__info')

		video_info.appendChild(title)
		video_info.appendChild(channel_go)
		video_info.appendChild(published)
		video_info.appendChild(description)

		div.appendChild(cover_video)
		div.appendChild(video_info)
		
		template_list.appendChild(div)
	
	})

	$box_search.value = ''
}


window.addEventListener('load', main)

function main() {
	SearchVideo()
}

$box_search.addEventListener('keypress', function (event) {
  if(event.keyCode == 13) {
	SearchVideo()
  }
})