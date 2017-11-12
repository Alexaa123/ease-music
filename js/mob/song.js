//首先布好局
//旋转好 中心圆形
//从网页中获取好数据
//写好json
//用jq ajax获取数据
//获取数据，渲染数据
//写出停止播放按钮

$.get('./lyric.json',function(obj){
	let string = obj.lyric
	let arr = string.split('\n')
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
})

let src = 'http://dl.stream.qqmusic.qq.com/C400001uxKNp3a7Qkv.m4a?vkey=9BFBEF34C63460D26B51A7FD912A5D88317C81C193835910F41B499F66FE48915093523F12A1CC5404DB601B99FDE8575D6461D25BEE7465&guid=1890627140&uin=1085810633&fromtag=66'
let $audio = '<audio src='+src+'></audio>'
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
