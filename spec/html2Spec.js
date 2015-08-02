describe('html2hs', function () {
  var html2hs = require('../src/htmlParser.js');
  
  it('non close tag', function () {
    expect(html2hs(
      '<div>' +
        '<input type="text">' +
        '<span>foo</span>' +
      '</div>'
    )).toBe('h("div",[h("input",{"type":"text"}),h("span",["foo"])])');
  });
  
  it('non children', function () {
    expect(html2hs(
      '<div>' +
      '</div>'
    )).toBe('h("div")');
  });
  
  it('comment', function () {
    expect(html2hs(
      '<div>' +
        '<!-- foo -->' +
        '<span>foo</span>' +
      '</div>'
    )).toBe('h("div",[h("span",["foo"])])');
  });
});

describe("html2ths", function() {
  var html2ths = require('../dist/index.js');
  var h = require('hyperscript');
  var obj = {
    greeting: "hello!",
    flag: false,
    array: ['hello', 'world'],
    object: [
      {greeting: "hello"},
      {greeting: "world"}
    ],
    number: 3
  };

  it("base", function() {
    expect(html2ths(
      '<span>{{greeting}}</span>',
      h)(obj).outerHTML)
      .toBe('<span>hello!</span>');
  });
  
  it('if', function () {
    expect(html2ths(
      '<div>' +
        '{{?flag}}' +
          '<span>hello</span>' +
        '{{/flag}}' +
        '<span>world</span>' +
      '</div>',
      h)(obj).outerHTML)
      .toBe('<div><span>world</span></div>');
  });
  
  it('reverse if', function () {
    expect(html2ths(
      '<div>' +
        '{{^flag}}' +
          '<span>hello</span>' +
        '{{/flag}}' +
        '<span>world</span>' +
      '</div>',
      h)(obj).outerHTML).toBe(
      '<div>' +
        '<span>hello</span>' +
        '<span>world</span>' +
      '</div>');
  });
  
  it('array repeat', function () {
    expect(html2ths(
      '<div>' +
        '{{#array}}' +
          '<span>{{.}}</span>' +
        '{{/array}}' +
      '</div>',
      h)(obj).outerHTML).toBe(
      '<div>' +
        '<span>hello</span>' +
        '<span>world</span>' +
      '</div>');
  });
  
  it('object in array repeat', function () {
    expect(html2ths(
      '<div>' +
        '{{#object}}' +
          '<span>{{.greeting}}</span>' +
        '{{/object}}' +
      '</div>',
      h)(obj).outerHTML).toBe(
      '<div>' +
        '<span>hello</span>' +
        '<span>world</span>' +
      '</div>');
  });
  
  it('number repeat', function () {
    expect(html2ths(
      '<div>' +
        '{{+number}}' +
          '<span>{{.}}</span>' +
        '{{/number}}' +
      '</div>',
      h)(obj).outerHTML).toBe(
      '<div>' +
        '<span>0</span>' +
        '<span>1</span>' +
        '<span>2</span>' +
      '</div>');
  });

});
