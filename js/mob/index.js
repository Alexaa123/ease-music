
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