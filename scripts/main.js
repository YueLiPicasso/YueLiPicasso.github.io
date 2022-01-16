function fontWithFallback(myfont) {
    switch (myfont) {
    case 'Default English Font':
    case '默认中文字体':
	return 'serif';
    default:
        return myfont + ', serif';
    }
}

function changeFont(element, name) {
    element.style.fontFamily = name;
}

function favef() {
    let mylist = document.getElementById('EF');
    let mychoice = mylist.options[mylist.selectedIndex].text;
    let ft = fontWithFallback(mychoice);
    let myelem = document.querySelector('html');
    changeFont(myelem, ft);
}

function favzf() {
    let mylist = document.getElementById('ZF');
    let mychoice = mylist.options[mylist.selectedIndex].text;
    let ft = fontWithFallback(mychoice);
    let myelems = document.querySelectorAll('[lang="zh-Hans"]');
    myelems.forEach(function (el) {changeFont(el, ft);});
}
