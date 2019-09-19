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
    var tableHeight = 900
    var colData = []
    for (var i = 0, length1 = keys.length; i < length1; i++) {
        var width = keys[i] === 'title' ? 580 : keys[i] === 'galleryURL' ? 140 : keys[i] === 'term' ? 140 : ''
        var visible = keys[i] === 'id' ? false : keys[i] === 'viewItemURL' ? false : keys[i] === 'type' ? false : keys[i] === 'category' ? false : true
        var formatter = keys[i] === 'galleryURL' ? 'image' : keys[i] === 'links' ? 'html' : 'plaintext'
        var headerFilter = keys[i] === 'galleryURL' ? false : keys[i] === 'endTime' ? false : keys[i] === 'links' ? false : true
        colData.push({ title: keys[i], field: keys[i], width:width, visible:visible, formatter:formatter, headerFilter:headerFilter })
    }
    console.log(route.length)
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
                var table = new Tabulator("#table-tabulator", {
                    height: ` + tableHeight + `,
                    data: ` + JSON.stringify(data) + `,
                    layout: "fitColumns",
                    columns: ` + JSON.stringify(colData) + `,
                    rowClick: function(e, row) {
                        //window.location.href = row.getData().viewItemURL
                    },
                });

             })()
        </script>`
}


function getStyle() {
    return `<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
            <script src="//cdnjs.cloudflare.com/ajax/libs/list.js/1.5.0/list.min.js"></script><style>
                body{font-family:Roboto;width:100%;height:100%;font-size:17px;padding:0;margin:0;}
                a{color:blue;text-decoration:underline;cursor:pointer;padding:0;}
                #table-tabulator{
                    width:100%;
                }
                .heading{
                    margin:10px;
                    width:95%;
                    display:flex;
                    justify-content:space-between;

                }
                </style>`;
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

module.exports = { wrapHTML };