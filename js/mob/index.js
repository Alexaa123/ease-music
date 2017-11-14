
$.get('json/songs.json',function(node){
	node.forEach((node)=>{
		let $li = $(`
			<li>
				<a href="./song.html?id=${node.id}">
					<h3>${node.name}</h3>
					<p>
						<span>
							<svg class="icon-sq">
								<use xlink:href = '#icon-sq'></use>
							</svg>
						</span>
						${node.album}
					</p>
					<svg class="icon">
						<use xlink:href = '#icon-play1'></use>
					</svg>
				</a>
			</li>		
			`)
		$('.new-music>ol').append($li)
	})
	$('.loading').fadeOut(100)
})

//页面切换
$('.siteNavtab').on('click','li',function(e){
	let $content = $('.content-wrap>li')

	let $li = $(e.currentTarget)
	$li.addClass('active').siblings().removeClass('active')

	let index = $li.index()
	$content.eq(index).addClass('show').siblings().removeClass('show')

	ajaxHttp($content,index)
})
//请求节约函数
function ajaxHttp(elemt,index){
	let $liLoading = elemt.eq(index)
	if ($liLoading.attr('data-loading')==='yes') {return}
	if(index == 2){
		$.get('./json/searchsong.json',function(res){
			$liLoading.attr('data-loading','yes')
		})
	}
}

$('.songlist').each((index,node)=>{
	$(node).attr('href',`songlist.html?id=${index+1}`)
})

// $('#search-song').on('input',function(){
// 	let value = $(this).val()
// 	if(value === ""){
// 		console.log(123)
// 		$('.output-wrap').empty()
// 		return;
// 	}
// })

// let timer = undefined
// $('#search-song').on('input',function(){
// 	let value = $(this).val()

// 	if(value === ""){
// 		console.log(123)
// 		$('.output-wrap').empty()
// 		return;
// 	}

// 	if (timer) {
// 		clearTimeout(timer)
// 	}

// 	timer = setTimeout(function(){
// 		search(value).then((result)=>{
// 			timer = undefined
// 			if (result.length!==0) {
// 				append(result)
// 			}else{
// 				$('.output-wrap').text('没有结果')
// 			}
// 		})
// 	},300)
// })

// function search(value){
// 	return new Promise((res,rej)=>{
// 		$.get('./json/songs.json',function(songs){
// 			$('.output-wrap').empty()
// 			let result = songs.filter(function(item){
// 				return item.name.indexOf(value)>=0
// 			})
// 			setTimeout(function(){
// 				res(result)
// 			},(Math.random()*500+500))
// 		})
// 	})
// }

let timer = null
$('#search-song').on('input',function(e){

	if (timer) {
		window.clearTimeout(timer)
	}
	timer = setTimeout(()=>{
		let $input = $(e.currentTarget)
		let value = $input.val().trim()
		if (value === '') {
			$('.output-wrap').empty()
			return
		}
		getAjax(value)
	timer = null
	},1000)
})

function getAjax(value){
	$.get('./json/songs.json',function(songs){
		$('.output-wrap').empty()
		let result = songs.filter(function(item){
			return item.name.indexOf(value)>=0
		})
		if (result.length === 0) {
			$('.output-wrap').html('没有结果')
		}else{
			append(result)
		}
	})
}



function append(node){
	node.forEach((node)=>{
		let $li = $(`
			<li>
				<a href="./song.html?id=${node.id}">
					<h3>${node.name}</h3>
					<p>
						<span>
							<svg class="icon-sq">
								<use xlink:href = '#icon-sq'></use>
							</svg>
						</span>
						${node.album}
					</p>
					<svg class="icon">
						<use xlink:href = '#icon-play1'></use>
					</svg>
				</a>
			</li>		
			`)
		$('.output-wrap').append($li)
	})
}
