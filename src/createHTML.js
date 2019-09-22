function wrapHTML(data, terms, route) {
    var html = '<!doctype html>';
    html += '<html lang="eng"><head><meta charset="utf-8"><title>Camera prices</title><meta name="viewport" content="width=device-width,initial-scale=1.0">';
    html += getStyle();
    html += '</head>'
    html += '<body>'
    html += '<div class="heading"><b>No affiliation with ebay: ' + data.length + '</b>';
    html += '<div class="row"><a href="?z=50">50</a> /  <a href="?z=100">100</a> /  <a href="?z=999">999</a> / <a href="?z=5">5</a></div>';



    html += '<select id="cat-menu"><option value=""></option>';
    var className = '';
    for (var i = 0; i < terms.length; i++) {
        html += '<option class="sort" data-sort="" value="' + terms[i] + '">' + terms[i] + '</option>';
    }
    html += '</select>';
    html += '</div>';
    html += '<div id="table-tabulator"></div>';
    html += getJavascript(data, route);
    html += '</body>';
    html += '</html>';
    return html;
}

function getJavascript(data, route) {
    var colors = ['#ffff5a', '#90caf9', '#bef67a', '#ce93d8', '#adcf11', '#ffff5a', '#90caf9', '#bef67a', '#ce93d8', '#adcf11', '#ffff5a', '#90caf9', '#bef67a', '#ce93d8', '#adcf11', '#ffff5a', '#90caf9', '#bef67a', '#ce93d8', '#adcf11'];
    var keys = data[0] ? Object.keys(data[0]) : []
    var colData = []
    for (var i = 0, length1 = keys.length; i < length1; i++) {
        var width = keys[i] === 'title' ? 580 : keys[i] === 'galleryURL' ? 140 : keys[i] === 'term' ? 140 : keys[i] === 'history' ? 90 : ''
        var visible = keys[i] === 'id' ? false : keys[i] === 'viewItemURL' ? false : keys[i] === 'type' ? false : true
        var formatter = keys[i] === 'galleryURL' ? 'image' : 'html'
        var headerFilter = keys[i] === 'galleryURL' ? false : keys[i] === 'endTime' ? false : keys[i] === 'links' ? false : keys[i] === 'history' ? false : true
        colData.push({ title: keys[i], field: keys[i], width: width, visible: visible, formatter: formatter, headerFilter: headerFilter })
    }
    return `<link href="https://unpkg.com/tabulator-tables@4.4.1/dist/css/tabulator.min.css" rel="stylesheet">
        <script type="text/javascript" src="https://unpkg.com/tabulator-tables@4.4.1/dist/js/tabulator.min.js"></script>
        <script src="https://www.gstatic.com/firebasejs/6.6.1/firebase-app.js"></script>
        <script src="https://www.gstatic.com/firebasejs/6.6.1/firebase-auth.js"></script>
        <script src="https://www.gstatic.com/firebasejs/6.6.1/firebase-firestore.js"></script>
        <script>
            (function(){
                var tableTabulator = new Tabulator("#table-tabulator", {
                    index:"id",
                    data: ` + JSON.stringify(data) + `,
                    layout: "fitColumns",
                    columns: ` + JSON.stringify(colData) + `,
                    rowClick: function(e, row) { /*window.location.href = row.getData().viewItemURL*/ },
                });
                function toggleHistory(elm){
                    var row = elm.target.parentNode.parentNode.parentNode
                    var elm = row.querySelector('.drawer')
                    if(!elm){
                        elm  = document.createElement('div')
                        elm.classList.add('drawer')
                        elm.innerHTML = 'ok'
                        row.appendChild(elm)
                    }else{
                        if(elm.classList.contains('hidden')){
                            elm.classList.remove('hidden')
                        }else{
                            elm.classList.add('hidden')
                        }
                    }

                }
                var btns = document.querySelectorAll('.toggle-history')
                var btn = null
                for(var i = 0, length1 = btns.length; i < length1; i++){
                    btn = btns[i]
                    btn.onclick = toggleHistory
                }
                var catmen = document.querySelector('#cat-menu')
                catmen.addEventListener('change', function(e){
                    window.location.href = '/' + catmen.value
                })
                for(var i = 0, length1 = catmen.options.length; i < length1; i++){
                    if (catmen.options[i].text === window.location.pathname.replace('/', '')){
                        catmen.options[i].selected = true;
                    }
                }

             })()
        </script>`
}


function getStyle() {
    return `<head>
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
            <script src="//cdnjs.cloudflare.com/ajax/libs/list.js/1.5.0/list.min.js"></script><style>
                body{font-family:Roboto;width:100%;height:100%;font-size:17px;padding:0;margin:0;}
                a{color:blue;text-decoration:underline;cursor:pointer;padding:0;}
                .hidden{ display:none; }
                #table-tabulator{
                    width:100%;
                }
                .drawer{
                    width:100%;
                    height:300px;
                    background:#ccc;
                }
                .heading{
                    margin:10px;
                    width:95%;
                    display:flex;
                    justify-content:space-between;

                }
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
  width:100%;
}

.slider:before {
  position: absolute;
  content: "";
  height: 50px;
  width: 90px;
  left: 0;
  top: 0;
  background-color: darkgray;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #888;
}

input:focus + .slider {
  box-shadow: 0;
}

input:checked + .slider:before {
  -webkit-transform: translateY(90px);
  -ms-transform: translateY(90px);
  transform: translateY(90px);
}
                </style>`;
}

function convertEbayTime(str) {
    var days = str.substring(str.indexOf('P') + 1, str.indexOf('D'))
    var hours = str.substring(str.indexOf('T') + 1, str.indexOf('H'))
    var minutes = str.substring(str.indexOf('H') + 1, str.indexOf('M'))
    var seconds = str.substring(str.indexOf('M') + 1, str.indexOf('S'))
    return { days, hours, minutes, seconds };
}

module.exports = { wrapHTML };