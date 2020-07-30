window.$ = window.jQuery = function (selectorOrArray) {      //别名的使用，等号在同一个语句，是从右往左执行的
  let element
  if (typeof selectorOrArray === 'string') {
    element = document.querySelectorAll(selectorOrArray);
  } else if (selectorOrArray instanceof Array) {
    element = selectorOrArray;
  }
  const api = Object.create(jQuery.prototype)    //创建一个对象，这个对象的
  //const api = {__proto__:jQuery.prototype}

  // api.element = element
  // api.oldApi = selectorOrArray.oldApi
  Object.assign(api, {
    element: element,
    oldApi: selectorOrArray.oldApi
  })
  return api
}  
jQuery.prototype = {
  jQuery: true,
  constructor: jQuery,
  find(selector) {
    let array = [];
    for (let i = 0; i < this.element.length; i++) {
      array = array.concat(Array.from(this.element[i].querySelectorAll(selector)));
    }
    array.oldApi = this;
    const newApi = jQuery(array);
    return newApi;
  },
  each(fn) {
    for (let i = 0; i < this.element.length; i++) {
      fn.call(null, this.element[i], i);
    }
    return this;
  },
  parent() {
    let array = [];
    this.each((node) => {
      if (array.indexOf(node.parentNode) === -1) {
        array.push(node.parentNode);
      }
    });
    return jQuery(array);
  },
  print() {
    console.log(this.element);
  },
  addClass(className) {
    for (let i = 0; i < this.element.length; i++) {
      this.element[i].classList.add(className);
    }
    return this;
  },
  end() {
    return this.oldApi;
  }
}