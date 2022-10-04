// ==UserScript==
// @name        AtCoder 中文助手
// @namespace   Violentmonkey Scripts
// @match       https://atcoder.jp/contests/*
// @grant       none
// @license MIT
// @version     1.4.1
// @author      -
// @description 在英文题面前显示 AtCoder 中文题面。
// ==/UserScript==

function addScript(url){
	var script = document.createElement('script');
	script.setAttribute('type','text/javascript');
	script.setAttribute('src',url);
	document.getElementsByTagName('head')[0].appendChild(script);
}

function createXmlHttp() {
    if (window.XMLHttpRequest) {
       xmlHttp = new XMLHttpRequest();
    } else {
       xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
}

function getSource(url) {
    createXmlHttp();
    xmlHttp.onreadystatechange = writeSource;
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}

function writeSource() {
    if (xmlHttp.readyState == 4) {
        var s = xmlHttp.responseText;
        s = s.split('<textarea>')
        s[1] = s[1].split('数据范围')[0]
        var t = document.getElementsByClassName('lang-en')
        var res = s[1];//marked(s[1])
        var flag = 1
        if (res[0] == '$') flag = 0
        var a = res.split('$');
        var fin;
        for (var i = 0; i < a.length; i++)
            if (i % 2 == flag) fin += katex.renderToString(a[i])
            else fin += a[i]
        fin = '<div class=\'chn\'>' + fin + '</div>'
        t[0].innerHTML = marked(fin) + t[0].innerHTML
        // alert(s[1]);
    }
}

var id = window.location.href
var pr = id.split('/')[6]
pr = pr.toUpperCase()
pr = pr + "_translation.html"
pr = "https://atcoder-for-chinese-developers.github.io/atcoder-for-chinese/translation/" + pr

addScript("https://cdn.bootcdn.net/ajax/libs/marked/2.0.3/marked.js")

var script = document.createElement('script');
script.setAttribute('type','text/javascript');
script.innerText = 'function disap() { var bo = document.getElementById(\'mybo\'); var c = document.getElementsByClassName(\'chn\')[0]; if (bo.innerHTML == \'隐藏中文题面\') {  c.style = \'display:none\'; bo.innerHTML = \'显示中文题面\' } else { c.style=\'\'; bo.innerHTML = \'隐藏中文题面\'  } }'
document.getElementsByTagName('head')[0].appendChild(script);

var pos = document.getElementsByClassName('h2')[0]
var bo = document.createElement('a');
bo.setAttribute('class', 'btn btn-default btn-sm')
bo.setAttribute('id', 'mybo')
bo.setAttribute('onclick', 'disap()')
bo.innerHTML = '隐藏中文题面'
pos.appendChild(bo)

getSource(pr)
