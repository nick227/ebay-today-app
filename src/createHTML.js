
function createColumn(data, key, rowcount){
	var colors = ['#ffff5a', '#90caf9', '#bef67a', '#ce93d8', '#adcf11','#ffff5a', '#90caf9', '#bef67a', '#ce93d8', '#adcf11'];
	var randoColor = colors[rowcount];
	var html = '<div class="outer" id="outer-'+key.replace(/ /g, '')+'">';
		html += '<h2 class="heading" id="'+key.replace(/ /g, '').toUpperCase()+data.length+'" style="background:'+randoColor+'">';
		html += key.toUpperCase()+': '+data.length;
		html += '<div class="toggle-box" data-status="default" data-elm="outer-'+key.replace(/ /g, '')+'">resize</div>';
		html += '</h2>';
		html += '<div class="column">';
	for(var index=0;index<data.length;index++){
		let item = data[index];
		var {days, hours, minutes, seconds} = convertEbayTime(item.sellingStatus[0].timeLeft.toString());
		let safeTitle = item.title.toString().replace(/ /g, "-");
		html += '<div style="padding:30px 13px;border-top:12px solid gray;">';
		html += '<a target="_blank" href="https://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=4&toolid=11800&pub=5575449992&campid=5338422827&mpre='+item.viewItemURL+'"><h3 style="margin:2px 0;">' + item.title+ '</h3><a>';
		html += '<a target="_blank" href="https://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=4&toolid=11800&pub=5575449992&campid=5338422827&mpre='+item.viewItemURL+'"><img style="float:left;width:200px;margin-right:10px;" src="'+item.galleryURL+'" /><a>';
		html += '<div style="background-color:lightgray;font-weight:900;">Price: <span>$' +item.sellingStatus[0].convertedCurrentPrice[0].__value__ + '</span></div>';
		if(typeof item.condition==='object' && typeof item.condition[0]==='object' && typeof item.condition[0].conditionDisplayName==='object'){
			html += '<div>Condition: ' +item.condition[0].conditionDisplayName[0] + '</div>';
		}
		html += '<div>Bids: ' +item.sellingStatus[0].bidCount + '</div>';
		html += '<div>' +item.location + '</div>';
		html += '<div>Ends: <span style="background:#f9b6b6;">' +days + ' days '+hours+' hours '+minutes+' minutes '+seconds+' seconds</span></div>';
		html += '<hr style="">';
		html += '<div><a href="https://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Daps&field-keywords='+encodeURI(item.title)+'" target="_blank">amazon</a>, <a href="https://www.google.com/search?q='+safeTitle+'" target="_blank">google</a></div>';
		html += '</div>';
	};
	html += '</div></div>';

	return html;
}
function wrapRow(data){
	var html = '<div class="row">';
	html += data;
	html += '</div>';

	return html;
}
function wrapHTML(data){
	var html = '<!doctype html>';
	html += '<html lang="eng"><head><meta charset="utf-8"><title>ebay app</title></head>';
	html += '<body><div class="main">';
	html += '<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">';
	html += `<style>
				body{font-family:Roboto;width:100%;height:100%;overflow-x:hidden;}
				.heading{z-index:2;padding:20px 10px; border-right:15px solid lightgray; }
				.outer{display:flex;flex-direction:column;flex-wrap:wrap;width:50%;min-width:400px;}
				.row{display:flex; width:100%;flex-wrap:wrap;}
				.column{display:flex;flex-direction:column;width:100%;height:50vh;overflow-y:auto;box-shadow:2px 3px 6px rgba(0,0,0,.5);margin-bottom:60px;}
				.main{width:70%;margin:0 15%;}
				.toggle-box{
					display:inline;
					float:right;
					font-size:16px;
					background:#ccc;
					cursor:pointer;
					padding:3px 6px;
				}
				.toggle-box:hover{
					background-color:#aaa;
					color:#fff;

				}
				h3{margin:0;}
				.menu{}
				hr{clear:both;}
				.menu a:hover{background:#eca;cursor:pointer;}
				.menu a{padding:2px; margin:3px; float:left;}
				.top-btn{position:fixed;bottom:20px; right:40px;background:#fff;border:1px solid gray;padding:20px 33px}
				</style>`;
	html += '<div id="top-menu" name="top-menu" class="menu"><a href="/cameras">cameras</a> <a href="/lenses">lenses</a> <a href="/lights">lights</a> <a href="/audio">audio <a href="/gear">gear</a> <a href="/shoes">shoes</a> <a href="/watches">watches</a> <a href="/books">books</a></div>';
	html += '<hr>';
	html += '<h3 style="">searches:</h3>';
	html += '<div class="menu menu-terms"></div>';
	html += '<hr>';
	html += '<h3 style="">options:</h3>';
	html += '<div class="row"><div style="width:96px;">end time:</div> <a href="?t=day">one day</a> / <a href="?t=hour">next hour</a> / <a href="?t=minute">sixty seconds</a> / <a href="?t=three">three days</a> / <a href="?t=all">all times</a></div>';
	html += '<div class="row"><div style="width:96px;">max price:</div> <a href="?p=500">500</a> / <a href="?p=999">999</a> /  <a href="?p=2999">2999</a> /  <a href="?p=5000">5000</a></div>';
	html += '<div class="row"><div style="width:96px;">max results:</div>  <a href="?z=50">50</a> /  <a href="?z=100">100</a> /  <a href="?z=999">999</a> / <a href="?z=5">5</a></div>';
	html += '<div class="row"><div style="width:96px;">sort results:</div> <a href="?f=EndTimeSoonest">EndTimeSoonest</a> / <a href="?f=BestMatch">BestMatch</a> /  <a href="?f=PricePlusShippingLowest">PricePlusShippingLowest</a> /  <a href="?f=StartTimeNewest">StartTimeNewest</a></div>';
	html += '<hr>';
	html += '<div>'+data+'</div>';
	html += '<div class="top-btn"><a href="#top-menu" style="font-size:20px;">^ top</a></div>';
	html += '</div></body>';
	html += `<script>
			(function(){
				var menu = document.querySelector('.menu-terms');
				var terms = document.querySelectorAll('.heading');
				for(var i=0;i<terms.length;i++){
					var t = terms[i];
					var elm = document.createElement('a');
					elm.href = '#'+t.textContent.replace(/ /g, '').replace(":", '');
					elm.innerHTML = t.textContent;
					menu.appendChild(elm);
				}
				var toggleBtns = document.querySelectorAll('.toggle-box');
				for(var i=0;i<toggleBtns.length;i++){
					toggleBtns[i].onclick = toggle;
				}
				function toggle(e){
					var key = this.getAttribute('data-elm');
					var box = document.querySelector('#'+key);
					var col = box.querySelector('.column');
					var status = this.getAttribute('data-status');
					if(status === 'closed'){
						col.style.height = '50vh';
						this.setAttribute('data-status', 'default');
					}
					if(status === 'default'){
						col.style.height = 'auto';
						this.setAttribute('data-status', 'open');
					}
					if(status === 'open'){
						col.style.height = '100px';
						this.setAttribute('data-status', 'closed');
					}
				}
			})()
	</script>`;
	html += '</html>';

	return html;
}
function convertEbayTime(str){
	var days = str.substring(str.indexOf('P')+1, str.indexOf('D'))
	var hours = str.substring(str.indexOf('T')+1, str.indexOf('H'))
	var minutes = str.substring(str.indexOf('H')+1, str.indexOf('M'))
	var seconds = str.substring(str.indexOf('M')+1, str.indexOf('S'))
	return {days, hours, minutes, seconds};
}

module.exports = {wrapRow, createColumn, wrapHTML};