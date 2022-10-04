// ==UserScript==
// @name        不是谭炜谭中文 AT 大师
// @namespace   Violentmonkey Scripts
// @match       https://atcoder.jp/contests/*
// @grant       none
// @version     1.0
// @author      -
// @description 2022/10/4 08:28:02
// ==/UserScript==

function addScript(url){
	var script = document.createElement('script');
	script.setAttribute('type','text/javascript');
	script.setAttribute('src',url);
	document.getElementsByTagName('head')[0].appendChild(script);
}

function add2(url){
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
        var t = document.getElementsByClassName('lang-en')
        var res = marked(s[1])
        for (var i = 1; i <= 100; i++) {
            if (i % 2 == 1) res = res.replace('$', '\\(')
            else res = res.replace('$', '\\)')
        }
        t[0].innerHTML = res + t[0].innerHTML
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
script.setAttribute('src','https://cdn.bootcss.com/mathjax/3.0.5/es5/tex-mml-chtml.js');
script.setAttribute('async','');
script.setAttribute('id','MathJax-script');
document.getElementsByTagName('head')[0].appendChild(script);

getSource(pr)
