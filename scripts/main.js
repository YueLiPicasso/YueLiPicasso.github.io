function fontWithFallback(myfont) {
    switch (myfont) {
    case 'Default English Font':
    case '默认中文字体':
	return 'serif';
    default:
        return myfont + ', serif';
    }
}

function changeFont(elem, name) {
    elem.style.fontFamily = name;
}

function changeBg (name) {
    let ur;
    if (name === 'none') {
	ur = 'none' ;
    } else {
	ur  = 'url("./photo/bkg/' + name + '.jpg")' ;
    }
    switch (name) {
    case 'monta':
	document.body.style.backgroundSize = '100%';
	document.body.style.backgroundAttachment = 'fixed';
	document.body.style.backgroundRepeat = 'no-repeat';
	document.body.style.backgroundPosition = '50% 15%';
	break;
    case 'spring':
	document.body.style.backgroundSize = '100%';
	document.body.style.backgroundAttachment = 'fixed';
	break;
    case 'leafa':
	document.body.style.backgroundSize = 'cover';
	document.body.style.backgroundAttachment = 'fixed';
	break;
    case 'montb':
	document.body.style.backgroundSize = '360%';
	document.body.style.backgroundRepeat = 'no-repeat';
	document.body.style.backgroundPosition = '8% 45%';
    default:
	document.body.style.backgroundAttachment = 'scroll';
	break;
    } 
    document.body.style.backgroundImage = ur;
    return;
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

function favbg() {
    let mylist = document.getElementById('BG');
    let mychoice = mylist.options[mylist.selectedIndex].text;
    changeBg(mychoice);
}
