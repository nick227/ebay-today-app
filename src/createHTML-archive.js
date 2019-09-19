function wrapHTML(data, terms) {
    var html = openHtml(terms);
    html += closeHtml(data);

    return html;
}

function openHtml(terms) {
    var html = '<!doctype html>';
    html += '<html lang="eng"><head><meta charset="utf-8"><title>Used Camera Gear</title><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>';
    html += '<body><div class="main"><h2>camera research</h2><b>No affiliation with ebay</b>';
    html += '<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">';
    html += getStyle();
    html += '<hr>';
    html += '<h3>categories:</h3>';
    html += '<div name="top-menu" class="menu"><select id="cat-menu">';
    var className = '';
    for (var i = 0; i < terms.length; i++) {
        html += '<option class="sort" data-sort="" value="' + terms[i] + '">' + terms[i] + '</option>';
    }
    html += '</select></div>';
    return html;

}

function closeHtml(data) {
    var html = '<hr>';
    html += '<h3 style="">found:</h3>';
    html += '<div class="menu"><select class="menu menu-terms"></select></div>';
    html += '<hr>';
    html += '<h3 style="">request:</h3>';
    html += '<div class="row"><div style="">end time:</div><div style=""><a href="?t=day">one day</a> / <a href="?t=hour">next hour</a> / <a href="?t=minute">sixty seconds</a> / <a href="?t=three">three days</a> / <a href="?t=all">all times</a></div></div>';
    html += '<div class="row"><div style="">max price:</div><div style=""><a href="?p=500000">$500000</a> / <a href="?p=200">$200</a> / <a href="?p=500">$500</a> / <a href="?p=999">$999</a> /  <a href="?p=2999">$2999</a> /  <a href="?p=5999">$5999</a></div></div>';
    html += '<div class="row"><div style="">max results:</div><div style=""><a href="?z=50">50</a> /  <a href="?z=100">100</a> /  <a href="?z=999">999</a> / <a href="?z=5">5</a></div></div>';
    html += '<div class="row"><div style="">sort results:</div><div style=""><a href="?f=EndTimeSoonest">EndTimeSoonest</a> / <a href="?f=BestMatch">BestMatch</a> /  <a href="?f=PricePlusShippingLowest">PricePlusShippingLowest</a> /  <a href="?f=StartTimeNewest">StartTimeNewest</a></div></div>';
    html += '<hr>';
    var sortOps = ["price", "ends", "key"];
    sortOps.sort();

    html += '<div id="main-list">';
    html += '<div class="sortBy"><h3>sort:</h3>';
    for (var i = 0, length1 = sortOps.length; i < length1; i++) {
        var op = sortOps[i];
        html += '<a class="sort link" data-sort="' + op + '">' + op + '</a>';
        if (i < sortOps.length - 1) {
            html += ' / ';
        }
    }
    html += '</div>';
    html += '<ul class="list">' + data + '</ul>';
    html += '</div>';
    html += '<hr>';


    html += '<div class="top-btn"><a href="#cat-menu" style="font-size:20px;">^ top</a></div>';
    html += '</div>';
    html += getJavascript();
    html += '</body>';
    html += '</html>';

    return html;

}

function wrapItem(data, key, rowcount) {
    var colors = ['#ffff5a', '#90caf9', '#bef67a', '#ce93d8', '#adcf11', '#ffff5a', '#90caf9', '#bef67a', '#ce93d8', '#adcf11', '#ffff5a', '#90caf9', '#bef67a', '#ce93d8', '#adcf11', '#ffff5a', '#90caf9', '#bef67a', '#ce93d8', '#adcf11'];
    var randoColor = colors[rowcount];
    var html = '';
    html += '<div class="heading" style="background:' + randoColor + '">';
    html += key.toUpperCase() + ': ' + data.length;
    html += '<label class="switch"><input class="toggle-box" data-status="open" data-elm=".term-' + key.replace(/ /g, '') + '" type="checkbox" checked><span class="slider round"></span></label>';
    html += '</div>';
    for (var index = 0; index < data.length; index++) {
        let item = data[index];
        var { days, hours, minutes, seconds } = convertEbayTime(item.sellingStatus[0].timeLeft.toString());
        let safeTitle = item.title.toString().replace(/ /g, "-");
        html += '<li class="list-item term-' + key.replace(/ /g, '') + '">';
        html += '<div class="item">';
    html += '<div class="key" style="">' + key.toUpperCase() + ': ' + data.length + '</div>';
        html += '<a target="_blank" href="https://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=4&toolid=11800&pub=5575449992&campid=5338422827&mpre=' + item.viewItemURL + '"><img style="" src="' + item.galleryURL + '" /></a>';
        html += '<div class="inner"><a target="_blank" href="https://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=4&toolid=11800&pub=5575449992&campid=5338422827&mpre=' + item.viewItemURL + '"><h3 style="margin:2px 0;">' + item.title + '</h3></a>';
        html += '<div style="background-color:lightgray;font-weight:900;">Price: <span class="price">$' + item.sellingStatus[0].convertedCurrentPrice[0].__value__ + '</span></div>';
        if (typeof item.condition === 'object' && typeof item.condition[0] === 'object' && typeof item.condition[0].conditionDisplayName === 'object') {
            html += '<div>Condition: ' + item.condition[0].conditionDisplayName[0] + '</div>';
        }
        html += '<div>Bids: ' + item.sellingStatus[0].bidCount + '</div>';
        html += '<div>Location: ' + item.location + '</div>';
        html += '<div>Ends: <span class="ends" style="background:#f9b6b6;">' + days + ' days ' + hours + ' hours ' + minutes + ' minutes ' + seconds + ' seconds</span></div>';
        html += '<div><a href="https://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Daps&field-keywords=' + encodeURI(item.title) + '" target="_blank">amazon</a>, <a href="https://www.google.com/search?q=' + safeTitle + '" target="_blank">google</a></div>';
        html += '</div>';
        html += '</div>';
        html += '</li>';
    };

    return html;
}

function getStyle() {
    return `<script src="//cdnjs.cloudflare.com/ajax/libs/list.js/1.5.0/list.min.js"></script><style>
				body{font-family:Roboto;width:100%;height:100%;overflow-x:hidden;font-size:17px;padding:0;margin:0;}
				a, .link{color:blue;text-decoration:underline;cursor:pointer;padding:0;}
				.heading{width:100%;text-align:left;font-size:1.2em;margin:20px 0;}
                .switch{margin:0 20px;}
				.list{width:100%;display:flex;flex-direction:row;flex-wrap:wrap;padding:0;margin:0;list-style-type:none;}
				.list-item{width:48%; margin:10px 10px 10px 0;box-shadow:0 5px 10px 0px rgba(0,0,0,0.55); padding:20px 0;float:left;}
				.selected{color:#000 !important;}
				h2{color:#fff;background:#093145;}
				.item img{max-height:300px; float:left; margin-right: 10px; }
				.item > .inner{float:left; }
				.row{display:flex; flex-direction:row; width:100%;flex-wrap:wrap;}
				.main{width:100%;margin:0;}
				.main > *{padding:0 1%;}
				.toggle-box{}.toggle-box:hover{background-color:#aaa;color:#fff;}.menu{}hr{clear:both;}.top-btn{position:fixed;bottom:20px; right:40px;background:#fff;border:1px solid gray;padding:20px 33px}
				.switch{position: relative; display: inline-block; width: 60px; height: 24px;}.switch input{opacity: 0; width: 0; height: 0;}.slider{position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; -webkit-transition: .4s; transition: .4s;}.slider:before{position: absolute; content: ""; height: 16px; width: 16px; left: 5px; bottom: 4px; background-color: white; -webkit-transition: .4s; transition: .4s;}input:checked + .slider{background-color: green;}input:focus + .slider{box-shadow: 0 0 1px #2196F3;}input:checked + .slider:before{-webkit-transform: translateX(33px); -ms-transform: translateX(33px); transform: translateX(33px);}.slider.round{border-radius: 24px;}.slider.round:before{border-radius: 50%;}
				@media all and (max-width: 720px){
					body{font-size:20px;}
					h2.heading, .list-item{width:90%; margin:1%;}
				}
				</style>`;
}

function getJavascript() {
    return `<link href="https://unpkg.com/tabulator-tables@4.4.1/dist/css/tabulator.min.css" rel="stylesheet">
<script type="text/javascript" src="https://unpkg.com/tabulator-tables@4.4.1/dist/js/tabulator.min.js"></script><script>
			(function(){
                var catmen = document.querySelector('#cat-menu')
                catmen.addEventListener('change', function(e){
                    window.location.href = '/' + catmen.value
                })
                for(var i = 0, length1 = catmen.options.length; i < length1; i++){
                    if (catmen.options[i].text === window.location.pathname.replace('/', '')){
                        catmen.options[i].selected = true;
                    }
                }
		var menu = document.querySelector('.menu-terms');
                menu.addEventListener('change', function(e){
                    console.log(menu.value)
                })
		var listItems = document.querySelectorAll('.list-item');
		var termsElms = document.querySelectorAll('.heading');
		var catElms = document.querySelectorAll('.category');
		for(var i = 0, length1 = catElms.length; i < length1; i++){
			var c = catElms[i];
			var q = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
			if(c.classList.contains(q)){
				c.style.color = '#000000';
			}
		}
		var options = {
				valueNames: [ 'price', 'ends', 'key']
			};
		var list = new List('main-list', options);
		list.on('updated', function(res){
			if(!this.run){
				for(var i=0;i<termsElms.length;i++){
						var t = termsElms[i];
						t.style.display = 'none';
				}
				for(var i=0;i<listItems.length;i++){
						var l = listItems[i];
						l.style.display = 'block';
				}
				this.run = true;
			}
		});
				for(var i=0;i<termsElms.length;i++){
					var t = termsElms[i];
					var opt = document.createElement('option');
					var str = t.textContent;
					opt.innerHTML = t.textContent;
                    opt.setAttribute('value', str);
					menu.appendChild(opt);
				}
				var toggleBtns = document.querySelectorAll('.toggle-box');
				for(var i=0;i<toggleBtns.length;i++){
					toggleBtns[i].onclick = toggle;
				}
				function toggle(e){
					var key = this.getAttribute('data-elm');
					var boxes = document.querySelectorAll(key);
					var status = this.getAttribute('data-status');
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
	</script>`
}

function wrapRow(data) {
    var html = '<div class="row">';
    html += data;
    html += '</div>';

    return html;
}

function convertEbayTime(str) {
    var days = str.substring(str.indexOf('P') + 1, str.indexOf('D'))
    var hours = str.substring(str.indexOf('T') + 1, str.indexOf('H'))
    var minutes = str.substring(str.indexOf('H') + 1, str.indexOf('M'))
    var seconds = str.substring(str.indexOf('M') + 1, str.indexOf('S'))
    return { days, hours, minutes, seconds };
}

module.exports = { wrapRow, wrapItem, wrapHTML };