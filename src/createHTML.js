const termsAll = require('./terms');

function wrapHTML(data, route) {
    var terms = Object.keys(termsAll)
    var html = '<!doctype html>';
    html += '<html lang="eng"><head><meta charset="utf-8"><title>' + route + '</title><meta name="viewport" content="width=device-width,initial-scale=1.0">';
    html += getStyle();
    html += '</head>'
    html += '<body>'
    var searchTerms = typeof termsAll[route] === 'object' ? termsAll[route].join(", ") : ''
    html += '<div class="row" style="padding:1%;width:98%;"><div><b>No affiliation with ebay: ' + data.length + ' results</b></div>';
    html += '<select style="width:300px;" id="cat-menu"><option value=""></option>';
    var className = '';
    for (var i = 0; i < terms.length; i++) {
        html += '<option class="sort" data-sort="" value="' + terms[i] + '">' + terms[i] + '</option>';
    }
    html += '</select>'
    html += '</div>'
    html += '<div style="background:lightgrey; padding:1%;width:98%;"><b>searched:</b> ' + searchTerms + '</div>'
    html += '<div id="table-tabulator"></div>'
    html += getJavascript(data);
    html += '</body>'
    html += '</html>'
    return html;
}

function getJavascript(data) {
    var colors = ['#ffff5a', '#90caf9', '#bef67a', '#ce93d8', '#adcf11', '#ffff5a', '#90caf9', '#bef67a', '#ce93d8', '#adcf11', '#ffff5a', '#90caf9', '#bef67a', '#ce93d8', '#adcf11', '#ffff5a', '#90caf9', '#bef67a', '#ce93d8', '#adcf11'];
    var colData = []
    if (data.length) {
        var keys = data[0] ? Object.keys(data[0]) : []
        for (var i = 0, length1 = keys.length; i < length1; i++) {
            var width = keys[i] === 'title' ? 580 : keys[i] === 'image' ? 140 : keys[i] === 'term' ? 140 : keys[i] === 'history' ? 90 : ''
            var visible = keys[i] === 'id' ? false : keys[i] === 'viewItemURL' ? false : keys[i] === 'type' ? false : keys[i] === 'epoch' ? false : true
            var formatter = keys[i] === 'image' ? 'image' : keys[i] === 'url' ? 'link' : 'html'
            var headerFilter = keys[i] === 'image' ? false : keys[i] === 'endTime' ? false : keys[i] === 'links' ? false : keys[i] === 'history' ? false : true
            colData.push({ title: keys[i], field: keys[i], width: width, visible: visible, formatter: formatter, headerFilter: headerFilter })
        }

    }
    return `<script src="https://cdn.firebase.com/libs/firebaseui/3.5.2/firebaseui.js"></script>
        <link type="text/css" rel="stylesheet" href="https://cdn.firebase.com/libs/firebaseui/3.5.2/firebaseui.css" />
        <link href="https://unpkg.com/tabulator-tables@4.4.1/dist/css/tabulator.min.css" rel="stylesheet">
        <script type="text/javascript" src="https://unpkg.com/tabulator-tables@4.4.1/dist/js/tabulator.min.js"></script>
        <script src="https://www.gstatic.com/firebasejs/6.6.1/firebase-app.js"></script>
        <script src="https://www.gstatic.com/firebasejs/6.6.1/firebase-auth.js"></script>
        <script src="https://www.gstatic.com/firebasejs/6.6.1/firebase-firestore.js"></script>
        <script>
            (function(){
                /*<div id="firebaseui-auth-container"></div>
                var base_url = window.location.origin;
                var pathArray = window.location.pathname.split( '/' );
                var firebaseConfig = {
                    apiKey: 'AIzaSyBNfmTvaAb30R0IoeZ0thow7EFTffDJ4Bg',
                    databaseURL: 'https://camera-watcher-7dd72.firebaseio.com',
                    authDomain: 'camera-watcher-7dd72.firebaseapp.com'
                }

                var uiConfig = {
                    signInSuccessUrl: window.location.href,
                    signInOptions: [
                        firebase.auth.GoogleAuthProvider.PROVIDER_ID
                    ]
                }
                var app = firebase.initializeApp(firebaseConfig)
                var auth = app.auth()
                var ui = new firebaseui.auth.AuthUI(auth)
                ui.start('#firebaseui-auth-container', uiConfig)

             firebase.auth().onAuthStateChanged(function(user) {
                  if (user && user.uid != null) {  
                    var accessToken = null;

                    firebase.auth().currentUser
                        .getIdToken()
                        .then(function (token) {});


                    var img = document.createElement('img')
                    img.classList.add('avatar')
                    var a = document.createElement('a')
                    a.textContent = 'Sign Out'
                    a.onclick = function(){
                            firebase.auth().signOut().then(function(){
                            document.querySelector('#firebaseui-auth-container').querySelector('.firebaseui-container').classList.remove('hidden')
                            var avatar = document.querySelector('#firebaseui-auth-container').querySelector('.avatar-container')
                            avatar.parentNode.removeChild(avatar)

                        })
                    }
                    var div = document.createElement('div')
                    div.classList.add('avatar-container')
                    var txt = document.createElement('div')
                    img.setAttribute('src', user.photoURL)
                    txt.textContent = user.displayName
                    div.appendChild(img)
                    div.appendChild(txt)
                    div.appendChild(a)
                    document.querySelector('#firebaseui-auth-container').querySelector('.firebaseui-container').classList.add('hidden')
                    document.querySelector('#firebaseui-auth-container').appendChild(div)
              }else{
                if(pathArray[1].length){
                    window.location.href=base_url
                }

              }
             });
             */
             if(` + data.length + `){
                var tableTabulator = new Tabulator("#table-tabulator", {
                    index:"id",
                    data: ` + JSON.stringify(data) + `,
                    layout: "fitColumns",
                    columns: ` + JSON.stringify(colData) + `
                });

             }
                function toggleHistory(elm){
                    var key = elm.target.getAttribute('data-key')
                    var id = elm.target.getAttribute('data-id')
                    var row = elm.target.parentNode.parentNode.parentNode
                    var drawer = row.querySelector('.drawer')
                    if(!drawer){

                        fetch(base_url + '/history?k='+escape(key)).then(function(res){
                             res.json().then(function(json) {
                                drawer  = document.createElement('div')
                                drawer.classList.add('drawer')
                                drawer.setAttribute('data-key', key)
                                drawer.setAttribute('id', 'drawer-' + id)
                                var colTits = Object.keys(json[0])
                                var colData = []
                                for(var i = 0, length1 = colTits.length; i < length1; i++){        
                                    var visible = colTits[i] === 'id' ? false : colTits[i] === 'term' ? false : colTits[i] === 'category' ? false : true
                                    var width = ''
                                    colData.push({ title: colTits[i], field: colTits[i], width:width, visible:visible })
                                }
                                row.appendChild(drawer)
                                var innerTable = new Tabulator('#drawer-' + id, {
                                    index:'id',
                                    data:json,
                                    layout:"fitColumns",
                                    columns: colData, 
                                    rowClick:function(e, row){
                                        var win = window.open(row.getData().url, '_blank')
                                        win.focus()
                                    }
                                })
                                })
                             });
                    }else{
                        if(drawer.classList.contains('hidden')){
                            drawer.classList.remove('hidden')
                        }else{
                            drawer.classList.add('hidden')
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
                .hidden{display:none;}
                a{color:blue;text-decoration:underline;cursor:pointer;padding:0;}
                .hidden{ display:none; }
                #table-tabulator{
                    width:100%;
                }
                .drawer{
                    height:auto;
                    background:#fff !important;
                    padding-bottom:90px;
                    border-top:2px solid black;
                    border-bottom:2px solid black;
                }
                .heading{
                    margin:10px;
                    width:95%;
                    display:flex;
                    justify-content:space-between;

                }
                .firebaseui-card-content{
                    padding:0 !important;
                }
                #firebaseui-auth-container{
                    width:auto;
                }
                .firebaseui-idp-list{
                    margin:0 !important;
                }
                select{
                    height:20px;
                }
                .row{
                    padding:0.5%;
                    width:99%;
                    display:flex;
                    justify-content:space-between;
                }
                .avatar{
                    width:40px;
                }
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

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
  height: 50%;
  width: 90px;
  left: 0;
  top: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: white;
}

input:focus + .slider {
  box-shadow: 0;
}

input:checked + .slider:before {
  -webkit-transform: translateY(100%);
  -ms-transform: translateY(100%);
  transform: translateY(100%);
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