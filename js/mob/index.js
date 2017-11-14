
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

$('.siteNavtab').on('click','li',function(e){
	let $content = $('.content-wrap>li')

	let $li = $(e.currentTarget)
	$li.addClass('active').siblings().removeClass('active')

	let index = $li.index()
	$content.eq(index).addClass('show').siblings().removeClass('show')

	ajaxHttp($content,index)
})

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