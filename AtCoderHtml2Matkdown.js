// ==UserScript==
// @name        AtCoder HTML to Markdown
// @namespace   Violentmonkey Scripts
// @match       https://atcoder.jp/contests/*/tasks/*
// @grant       none
// @version     1.0
// @author      -
// @description 2022/11/18 20:50:28
// ==/UserScript==

function parseKatex(text) {
    var s = ''
    try {
        s = text.getElementsByTagName('annotation')[0].innerHTML
        return '$' + text.getElementsByTagName('annotation')[0].innerHTML + '$'
    } catch { return s }
}
function parseText(w) {
    var c = w.childNodes, res = ''
    for (var i in c) {
        if (c[i].tagName == 'P') {
            var s = c[i].innerHTML
            try {
                var li = c[i].getElementsByTagName('var')
            } catch { break }
            for (var j in li)
                s = s.replace('<var>'+li[j].innerHTML+'</var>', parseKatex(li[j]))
            try {
                var li = c[i].getElementsByTagName('strong')
            } catch { break }
            for (var j in li)
                s = s.replace('<strong>'+li[j].innerHTML+'</strong>', '**' + li[j].innerHTML + '**')
            res += '\n' + s + '\n'
        }
        else if (c[i].tagName == 'UL') {
            res += '\n'
            try {
                var d = c[i].getElementsByTagName('li')
            } catch { break }
            for (var j in d) {
                var st
                try {
                  st = d[j].innerHTML
                  st = st.replace('::marker', '')
                  var li = d[j].getElementsByTagName('var')
                } catch { break }
                for (var k in li)
                    st = st.replace('<var>'+li[k].innerHTML+'</var>', parseKatex(li[k]))
                try {
                    var li = d[j].getElementsByTagName('strong')
                } catch { break }
                for (var k in li)
                    st = st.replace('<strong>'+li[k].innerHTML+'</strong>', '**' + li[k].innerHTML + '**')
                res += '- ' + st + '\n'
            }
        }
    }
    return res
}

var c = document.getElementsByClassName('lang-en')[0].getElementsByTagName('section')
var res = ''

res = res + '### 问题描述\n' + parseText(c[0]) + '\n---\n'
          + '### 数据范围\n' + parseText(c[1]) + '\n---\n'
          + '### 输入格式\n' + parseText(c[2]) + '\n---\n'
          + '### 输出格式\n' + parseText(c[3]) + '\n---\n'
var cnt = 0
for (var i = 4; i < c.length; i++) {
    if (i % 2 == 0) {
        cnt += 1
        res += '### 样例输入 ' + cnt + '\n\n'
    }
    else res += '### 样例输出 ' + cnt + '\n\n'
    var li = c[i].childNodes
    for (var j in li) {
        try {
          if (li[j].tagName == 'P') res += parseText(li[j])
          else if (li[j].tagName == 'PRE') {
            res += '```\n' + li[j].innerHTML + '```\n'
          }
        }
        catch {
          continue
        }
    }
    res += parseText(c[i]) + '\n---\n'
}

console.log(res)
