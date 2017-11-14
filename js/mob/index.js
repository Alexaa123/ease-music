
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

let timer = undefined
$('#search-song').on('input',function(){
	let value = $(this).val()

	if(value === ""){
		console.log(123)
		$('.output-wrap').empty()
		return;
	}

	if (timer) {
		clearTimeout(timer)
	}

	timer = setTimeout(function(){
		search(value).then((result)=>{
			timer = undefined
			if (result.length!==0) {
				append(result)
			}else{
				$('.output-wrap').text('没有结果')
			}
		})
	},300)
})

function search(value){
	return new Promise((res,rej)=>{
		$.get('./json/songs.json',function(songs){
			let result = songs.filter(function(item){
				return item.name.indexOf(value)>=0
			})
			setTimeout(function(){
				res(result)
			},(Math.random()*500+500))
		})
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

//search 查找函数

// $('#search-song').on('input',function(){
// 	let value = $(this).val()
// 	search(value).then((result)=>{
// 		if (result.length!==0) {
// 			$('.output').text(result.map((r)=>r.name).join(','))
// 		}else{
// 			$('.output').text('没有结果')
// 		}
// 	})
// })
// function search(keyword){
// 	return new Promise((res,rej)=>{
// 		var database = [
// 			{"id":1,"name":"那些花儿"},
// 			{"id":2,"name":"panama"},
// 			{"id":3,"name":"风一样的"}
// 		]
// 		let result = database.filter(function(item){
// 			return item.name.indexOf(keyword)>=0
// 		})
// 		setTimeout(function(){
// 			res(result)
// 		},(Math.random()*1000+500))
// 	})
// }



// <li>
// 	<a href="song.html">
// 		<h3>歌名</h3>
// 		<p>
// 			<span>
// 				<svg class="icon-sq">
// 					<use xlink:href = '#icon-sq'></use>
// 				</svg>
// 			</span>
// 			作者-革命
// 		</p>
// 		<svg class="icon">
// 			<use xlink:href = '#icon-play1'></use>
// 		</svg>
// 	</a>
// </li>