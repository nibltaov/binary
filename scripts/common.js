const array = [];
(function () {
    const binaryArray = []
    let index = 128
    for (index; index >= 1;) {
        binaryArray.push(`<li> ${index} <span>0</span></li>`)
        array.push(index)
        index = index / 2
    }
    binaryArray.forEach(bit => {
        binary.innerHTML += bit
    })
})()

const $ = el => document.querySelector(el)
const _ = el => [...document.querySelectorAll(el)]
const result = $('.result span')
const li = _('#binary li')
const table = $('.alphabet__table')
li.forEach((el, index) => {
    el.addEventListener('click', () => {
        const span = el.querySelector('span')

        
        let innerSpan = Number(span.innerHTML)
        if (!innerSpan) {
            span.innerHTML = 1
            result.innerHTML = Number(result.innerHTML) + array[index]
        }
        else {
            span.innerHTML = 0
            result.innerHTML = result.innerHTML - array[index]
        }
        let finalResult = ''
        li.forEach(liEl => {
            finalResult += liEl.querySelector('span').innerHTML
        })
        const returnResult = binToUtf8(finalResult)
        $('.result-code span').innerHTML = returnResult
    })
})
const binToUtf8 = (s) => {
    try {
        let i = 0, l = s.length, chr, out = '';
        for (; i < l; i += 8) {
            chr = parseInt(s.substr(i, 8), 2).toString(16);
            out += '%' + ((chr.length % 2 == 0) ? chr : '0' + chr);
        }
        return decodeURIComponent(out);
    } catch {
        return 'Ошибка двоичного кода';
    }
}
const alphabet = 'ABCDEFGHIKLMNOPQRSTVXYZabcdefghiklmnopqrstvxyz'.split('')
table.innerHTML = `<div class='row'><div>Символ</div><div>Общее число</div><div>Двоичный код</div></div>`
alphabet.forEach(word => {
    const binary = convert(word)

    table.innerHTML += `<div class='row'><div>${word}</div><div>${calc(binary)}</div><div>${binary}</div></div>`
})

function convert(str) {
    const bin = str.charCodeAt().toString(2);
    resultBin = bin.length < 7
        ? '00' + bin
        : bin.length < 8
            ? '0' + bin
            : bin;
    return resultBin;
}
function calc(number) {
    let resultCalc = 0
    for (let i = 0; i < number.length; i++) {
        if (number[i] == 1) {
            resultCalc += array[i]
        }
    }
    return resultCalc
}
const navLi = _('nav li a')
const hashChange = () => {
    const { hash } = window.location
    navLi.forEach(list => {
        if (list.getAttribute('href') === hash) {
            list.classList.add('active')
            $(list.getAttribute('href')).classList.add('active')
        }
        else {
            list.classList.remove('active')
            $(list.getAttribute('href')).classList.remove('active')
        }

    })
}
window.addEventListener('hashchange', hashChange)
hashChange()