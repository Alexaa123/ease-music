
let id = parseInt(location.search.match(/\bid=([\d]*)/)[1])
console.log(location.search)
$.get('./json/songs.json',function(node){
	let songs = node.filter((node)=>{
		return node.id === id
	})[0]
	let {url,name,lyric,img,background} = songs
	initPlayer(url)
	initText(name,lyric)
	image(img,background)


})

function image(img,background){
	$('.cover').attr('src',img)
	$('.page').css({
		"background":"url("+background+"),center",
		"background-repeat":"no-repeat",
		"background-size":"cover"
		})
}

function initText(name,lyric){
	$('.song-description>h1').text(name)
		parseLyirsc(lyric)
	}


function initPlayer(url){
	let $audio = '<audio src='+url+'></audio>'
	let audio = $($audio)[0]

	audio.oncanplay = function(){
		this.play()
		$('.disc').addClass('playing')
	}

	$('.icon-stop').on('click',function(){
		audio.pause()
		$('.disc').removeClass('playing')
		$('.icon-wrap').addClass('none')
		$('.icon').addClass('hover')
	})
	$('.icon-play').on('click',function(){
		audio.play()
		$('.disc').addClass('playing')
		$('.icon-wrap').removeClass('none')
		$('.icon').removeClass('hover')
	})

	let timer = setInterval(()=>{
		let seconds = audio.currentTime
		let munites = ~~(seconds/60)
		let left = seconds - munites*60
		let time = `${pad(munites)}:${pad(left)}`
		let $lines = $('.lines>p')
		//console.log($lines.eq(62).next())
		for(let i=0; i<$lines.length; i++){
			let topTime = $lines.eq(i).attr('data-time')
			let bottomTime = $lines.eq(i+1).attr('data-time')

			 if($lines.eq(i+1).length !== 0 && topTime<time && bottomTime>time){
				whichLine($lines.eq(i))

				if ($lines.length-1 === i+1) {
					console.log(timer)
					lastLyric(topTime,bottomTime,$lines,i)
					clearTimeout(timer)	
				}
			}
		}	
	},500)

}

function lastLyric(topTime,bottomTime,$lines,i){
	let gex = /\b\:(\d{2}\.{1}\d+)/
	let prevTime = topTime.match(gex)
	let nextTime = bottomTime.match(gex)
	let num = (nextTime[1]-prevTime[1])*1000
	console.log(num)

	setTimeout(()=>{
		whichLine($lines.eq(i+1))
	},num)
}



function pad(num){
	return num>10 ? num + '':'0'+ num
}

function whichLine(elemt){
	let top = elemt.offset().top
	let lineTop = $('.lines').offset().top
	let delta = top - lineTop
	let deltapx = "-"+delta+"px"
	$('.lines').css({
		"transform":"translateY("+deltapx+")",
	})
	elemt.addClass('active').prev().removeClass('active')
}


function parseLyirsc(lyric){
	let arr = lyric.split('\n')
	let gex = /^\[(.+)\](.*)$/
	arr = arr.map(function(node){
		let matches = node.match(gex)
		if (matches) {
			return {time:matches[1],words:matches[2]}
		}
	})
	let $lines = $('.lines')
	arr.forEach(function(node){
		if(!node){return}
		let $p = $('</p>')
		$p.attr('data-time',node.time).text(node.words)
		$lines.append($p)
	})
}
