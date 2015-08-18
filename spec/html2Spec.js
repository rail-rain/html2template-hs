describe('html2hs', function () {
  var html2hs = require('../src/hyperscript-converter.js');
  
  it('base', function () {
    expect(html2hs(
      '<div>' +
        '<span>foo</span>' +
      '</div>'
    )).toBe('h("div",[h("span",["foo"])])');
  });
  
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
  
  it('whitespace and paragraph', function () {
    expect(html2hs(
      '  <div>\n' +
        '{{foo}}  <span> foo</span>\n' +
      '  </div>  '
    )).toBe('h("div",["{{foo}}",h("span",["foo"])])');
  });
  
});

describe('html2hs', function () {
  var html2vd = require('../src/virtual-dom-converter.js');
  
  it('attributes and property', function () {
    expect(html2vd(
      '<div>' +
        '<input type="text" ev-click="click">' +
      '</div>'
    )).toBe('h("div",[h("input",{attributes:{"type":"text"},"ev-click":"click"})])');
  });
});

describe("html2ths", function() {
  var html2ths = require('../hyperscript.js');
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
    expect(html2ths.compile(
      '<span>{{greeting}}</span>',
      h)(obj).outerHTML)
      .toBe('<span>hello!</span>');
  });
  
  it('variables', function () {
    expect(html2ths.compile(
      '<span>(greeting : {{greeting}})</span>',
      h)(obj).outerHTML)
      .toBe('<span>(greeting : hello!)</span>');
  });
  
  it('nest', function () {
    expect(html2ths.compile(
      '<span>{{object[0].greeting}}</span>',
      h)(obj).outerHTML)
      .toBe('<span>hello</span>');
  });
  
  it('if', function () {
    expect(html2ths.compile(
      '<div>' +
        '{{#if flag}}' +
          '<span>hello</span>' +
        '{{/if}}' +
        '<span>world</span>' +
      '</div>',
      h)(obj).outerHTML)
      .toBe('<div><span>world</span></div>');
  });
  
  it('unless', function () {
    expect(html2ths.compile(
      '<div>' +
        '{{#unless flag}}' +
          '<span>hello</span>' +
        '{{/unless}}' +
        '<span>world</span>' +
      '</div>',
      h)(obj).outerHTML).toBe(
      '<div>' +
        '<span>hello</span>' +
        '<span>world</span>' +
      '</div>');
  });
  
  it('array repeat', function () {
    expect(html2ths.compile(
      '<div>' +
        '{{#each array}}' +
          '<span>{{this}}</span>' +
        '{{/each}}' +
      '</div>',
      h)(obj).outerHTML).toBe(
      '<div>' +
        '<span>hello</span>' +
        '<span>world</span>' +
      '</div>');
  });
  
  it('object in array repeat', function () {
    expect(html2ths.compile(
      '<div>' +
        '{{#each object}}' +
          '<span>{{this.greeting}}</span>' +
        '{{/each}}' +
      '</div>',
      h)(obj).outerHTML).toBe(
      '<div>' +
        '<span>hello</span>' +
        '<span>world</span>' +
      '</div>');
  });
  
  it('if2', function () {
    expect(html2ths.compile(
      '<div>' +
        '{{#unless flag}}' +
          '<span>hello</span>' +
          '<span>!</span>' +
        '{{/unless}}' +
        '<span>world</span>' +
      '</div>',
      h)(obj).outerHTML)
      .toBe('<div><span>hello</span><span>!</span><span>world</span></div>');
  });
  
  it('registe helper', function () {
    html2ths.registerHelper("for", function (number, html) {
      var results = [];
      for (var i = 0; i < number; i++) {
        results.push(html(i));
      }
      return results;
    });
    
    expect(html2ths.compile(
      '<div>' +
        '{{#for number}}' +
          '<span>{{this}}</span>' +
        '{{/for}}' +
      '</div>',
      h)(obj).outerHTML)
      .toBe('<div><span>0</span><span>1</span><span>2</span></div>');
  });
  
  it('non block helpers', function () {
    html2ths.registerHelper("space", function (foo, bar) {
      return foo + ' ' + bar;
    });
    
    expect(html2ths.compile(
        '<span>{{space array[0] array[1]}}</span>',
      h)(obj).outerHTML)
      .toBe('<span>hello world</span>');
  });
  
  it('if else', function () {
    expect(html2ths.compile(
      '<div>' +
        '{{#if flag}}' +
          '<span>{{greeting}}</span>' +
        '{{else}}' +
          '<span>world</span>' +
        '{{/if}}' +
      '</div>',
      h)(obj).outerHTML)
      .toBe('<div><span>world</span></div>');
  });
  
  it('each else', function () {
    expect(html2ths.compile(
      '<div>' +
        '{{#each arrayNot}}' +
          '<span>{{this}}</span>' +
        '{{else}}' +
          '<span>not</span>' +
        '{{/each}}' +
      '</div>',
      h)(obj).outerHTML)
      .toBe('<div><span>not</span></div>');
  });
  
  it('whitespace helpers', function () {
    expect(html2ths.compile(
      '<div>' +
        '   {{#if flag}}   ' +
          '<span>{{greeting}}</span>' +
        '{{else}}' +
          '<span>world</span>' +
        '{{/if}}' +
      '</div>',
      h)(obj).outerHTML)
      .toBe('<div><span>world</span></div>');
  });
  
  it('global this', function () {
    html2ths.registerHelper("gt", function (object) {
      return object.greeting;
    });
    
    expect(html2ths.compile(
      '<span>{{gt .}}</span>',
      h)(obj).outerHTML)
      .toBe('<span>hello!</span>');
  });
  
});


