var indexTop = window.pageYOffset;
function noScroll(isNoScroll) {
  if (isNoScroll) {
    indexTop = window.pageYOffset;
    $('body').css({
        overflow: 'hidden',
        height: '100%',
        width: '100%',
        top: -indexTop + 'px',
        position: 'fixed'
    });
  } else {
    $('body').css({
        position: 'static',
        overflow: '',
        top: 'auto',
        width: '',
        height: '',
    });
    $('html, body').scrollTop(indexTop);
  }
}
