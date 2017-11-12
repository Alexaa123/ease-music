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

let src = '//ozb1j982i.bkt.clouddn.com/C400001uxKNp3a7Qkv.m4a'
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
