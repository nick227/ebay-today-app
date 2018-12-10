
function wrapItems(data, key, rowcount){
	var colors = ['#ffff5a', '#90caf9', '#bef67a', '#ce93d8', '#adcf11','#ffff5a', '#90caf9', '#bef67a', '#ce93d8', '#adcf11'];
	var randoColor = colors[rowcount];
	var html = '';
		html += '<h2 class="heading" id="'+key.replace(/ /g, '').toUpperCase()+data.length+'" style="background:'+randoColor+'">';
		html += key.toUpperCase()+': '+data.length + '<HR>';
		html += '<div style="">';
		html += '<label class="switch"><input class="toggle-box" data-status="open" data-elm=".term-'+key.replace(/ /g, '')+'" type="checkbox" checked><span class="slider round"></span></label>';
		html += '</div>';
		html += '</h2>';
	for(var index=0;index<data.length;index++){
		let item = data[index];
		var {days, hours, minutes, seconds} = convertEbayTime(item.sellingStatus[0].timeLeft.toString());
		let safeTitle = item.title.toString().replace(/ /g, "-");
		html += '<li class="list-item term-'+key.replace(/ /g, '')+'">';
		html += '<div class="item"><div class="inner">';
		html += '<a target="_blank" href="https://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=4&toolid=11800&pub=5575449992&campid=5338422827&mpre='+item.viewItemURL+'"><h3 style="margin:2px 0;">' + item.title+ '</h3><a>';
		html += '<a target="_blank" href="https://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=4&toolid=11800&pub=5575449992&campid=5338422827&mpre='+item.viewItemURL+'"><img style="float:left;width:200px;margin-right:10px;" src="'+item.galleryURL+'" /><a>';
		html += '<div style="background-color:lightgray;font-weight:900;">Price: <span class="price">$' +item.sellingStatus[0].convertedCurrentPrice[0].__value__ + '</span></div>';
		if(typeof item.condition==='object' && typeof item.condition[0]==='object' && typeof item.condition[0].conditionDisplayName==='object'){
			html += '<div>Condition: ' +item.condition[0].conditionDisplayName[0] + '</div>';
		}
		html += '<div>Bids: ' +item.sellingStatus[0].bidCount + '</div>';
		html += '<div>Location: ' +item.location + '</div>';
		html += '<div>Ends: <span class="ends" style="background:#f9b6b6;">' +days + ' days '+hours+' hours '+minutes+' minutes '+seconds+' seconds</span></div>';
		html += '</div><hr style="">';
		html += '<div><a href="https://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Daps&field-keywords='+encodeURI(item.title)+'" target="_blank">amazon</a>, <a href="https://www.google.com/search?q='+safeTitle+'" target="_blank">google</a></div>';
		html += '</div>';
		html += '</li>';
	};

	return html;
}
function wrapRow(data){
	var html = '<div class="row">';
	html += data;
	html += '</div>';

	return html;
}
function genStyle(){
	return `<script src="//cdnjs.cloudflare.com/ajax/libs/list.js/1.5.0/list.min.js"></script><style>
				body{font-family:Roboto;width:100%;height:100%;overflow-x:hidden;}
				.link{color:blue;text-decoration:underline;cursor:pointer;}
				.heading{z-index:2;padding:20px 10px; width:200px;text-align:center;}
				.list{width:100%;display:flex;flex-direction:row;flex-wrap:wrap;padding:0;margin:0;list-style-type:none;}
				.item{width:200px; margin:33px 5px 45px 5px;}
				.item > .inner{min-height:480px;}
				.row{display:flex; flex-direction:row; width:100%;flex-wrap:wrap;}
				.main{width:98%;margin:0 1%;}
				.toggle-box{}.toggle-box:hover{background-color:#aaa;color:#fff;}h3{margin:0;}.menu{}hr{clear:both;}.menu a:hover{background:#eca;cursor:pointer;}.menu a{padding:2px; margin:3px; float:left;}.top-btn{position:fixed;bottom:20px; right:40px;background:#fff;border:1px solid gray;padding:20px 33px}
				.switch{position: relative; display: inline-block; width: 60px; height: 24px;}.switch input{opacity: 0; width: 0; height: 0;}.slider{position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; -webkit-transition: .4s; transition: .4s;}.slider:before{position: absolute; content: ""; height: 16px; width: 16px; left: 5px; bottom: 4px; background-color: white; -webkit-transition: .4s; transition: .4s;}input:checked + .slider{background-color: green;}input:focus + .slider{box-shadow: 0 0 1px #2196F3;}input:checked + .slider:before{-webkit-transform: translateX(33px); -ms-transform: translateX(33px); transform: translateX(33px);}.slider.round{border-radius: 24px;}.slider.round:before{border-radius: 50%;}
				</style>`;
}
function wrapHTML(data, terms){
	var html = '<!doctype html>';
	html += '<html lang="eng"><head><meta charset="utf-8"><title>ebay app</title></head>';
	html += '<body><div class="main"><h1>ebay today</h1> <div>by <a href="http://www.atxnick.com">atxnick</a></div>';
	html += '<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">';
	html += genStyle();
	html += '<hr>';
	html += '<h3>categories:</h3>';
	html += '<div id="top-menu" name="top-menu" class="menu">';
	for(var i=0; i<terms.length;i++){
		html += '<a href="'+terms[i]+'">'+terms[i]+'</a>';
	}
	html += '</div>';
	
	html += '<hr>';
	html += '<h3 style="">terms:</h3>';
	html += '<div class="menu menu-terms"></div>';
	html += '<hr>';
	html += '<h3 style="">request:</h3>';
	html += '<div class="row"><div style="width:96px;">end time:</div> <a href="?t=day">one day</a> / <a href="?t=hour">next hour</a> / <a href="?t=minute">sixty seconds</a> / <a href="?t=three">three days</a> / <a href="?t=all">all times</a></div>';
	html += '<div class="row"><div style="width:96px;">max price:</div> <a href="?p=500">$500</a> / <a href="?p=999">$999</a> /  <a href="?p=2999">$2999</a> /  <a href="?p=5000">$5000</a></div>';
	html += '<div class="row"><div style="width:96px;">max results:</div>  <a href="?z=50">50</a> /  <a href="?z=100">100</a> /  <a href="?z=999">999</a> / <a href="?z=5">5</a></div>';
	html += '<div class="row"><div style="width:96px;">sort results:</div> <a href="?f=EndTimeSoonest">EndTimeSoonest</a> / <a href="?f=BestMatch">BestMatch</a> /  <a href="?f=PricePlusShippingLowest">PricePlusShippingLowest</a> /  <a href="?f=StartTimeNewest">StartTimeNewest</a></div>';
	html += '<hr>';


	var sortOps = ["price", "ends"];
	sortOps.sort();

	html += '<div id="main-list">';
	html += '<div class="sortBy"><h3>sort:</h3>';
	for(var i = 0, length1 = sortOps.length; i < length1; i++){
		var op = sortOps[i];
		html += '<a class="sort link" data-sort="'+op+'">'+op+'</a>';
		if(i < sortOps.length-1){
			html += ' / ';
		}
	}
	html += '</div>';
	html += '<ul class="list">'+data+'</ul>';
	html += '</div>';


	html += '<div class="top-btn"><a href="#top-menu" style="font-size:20px;">^ top</a></div>';
	html += '</div></body>';
	html += `<script>
	function addSorting(){
		var options = {
				valueNames: [ 'price', 'ends']
			};
		var list = new List('main-list', options);
	}
			(function(){
					document.addEventListener("DOMContentLoaded", function() {addSorting();});
				
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
					var boxes = document.querySelectorAll(key);
					var status = this.getAttribute('data-status');
					console.log(status, "?");
					if(status === 'closed'){
						this.setAttribute('data-status', 'open');
						for (i = 0; i < boxes.length; ++i) {
  							boxes[i].style.display = "block";
						}
					}else{
						this.setAttribute('data-status', 'closed');
						for (i = 0; i < boxes.length; ++i) {
  							boxes[i].style.display = "none";
						}
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

module.exports = {wrapRow, wrapItems, wrapHTML};