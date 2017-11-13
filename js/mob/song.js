//首先布好局
//旋转好 中心圆形
//从网页中获取好数据
//写好json
//用jq ajax获取数据
//获取数据，渲染数据
//写出停止播放按钮
//location.search获取ID
//歌词滚动：1. audio.currentTime获取数据的时间
//2. 转换时间 让格式一样

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
	setInterval(()=>{
		let seconds = audio.currentTime
		let munites = ~~(seconds/60)
		let left = seconds - munites*60
		let time = `${pad(munites)}:${pad(left)}`
		let $lines = $('.lines>p')

		let $whichLine
		$lines.each((index,node)=>{
			let topTime = $lines.eq(index).attr('data-time')
			let bottomTime = $lines.eq(index+1).attr('data-time')
			if ($lines.eq(index+1).length !== 0 && topTime<time && bottomTime>time) {
				$whichLine = $lines.eq(index)
			}
		})
		if ($whichLine) {
			let top = $whichLine.offset().top
			let lineTop = $('.lines').offset().top
			let delta = top - lineTop
			let deltapx = "-"+delta+"px"
			$('.lines').css({
				"transform":"translateY("+deltapx+")",
			})
			$whichLine.addClass('active').prev().removeClass('active')
		}
	},500)
}

function pad(num){
	return num>10 ? num + '':'0'+ num
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
