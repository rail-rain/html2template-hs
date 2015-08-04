describe('html2hs', function () {
  var html2hs = require('../src/htmlParser.js');
  
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
    )).toBe('h("div",[h("input",{attributes:{"type":"text"}}),h("span",["foo"])])');
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
    )).toBe('h("div",["{{foo}} ",h("span",[" foo"])])');
  });
  
});

describe("html2ths", function() {
  var html2ths = require('../src/index.js');
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
        '{{/flag}}' +
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
    expect(html2ths.compile(
      '<div>' +
        '{{#each array}}' +
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
    expect(html2ths.compile(
      '<div>' +
        '{{#each object}}' +
          '<span>{{.greeting}}</span>' +
        '{{/object}}' +
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
        '{{/flag}}' +
        '<span>world</span>' +
      '</div>',
      h)(obj).outerHTML)
      .toBe('<div><span>hello</span><span>!</span><span>world</span></div>');
  });
  
  beforeEach(function() {
    html2ths.registerHelper("foo", function (greeting, html) {
      return html(greeting);
    });
  });
  
  it('registe helper', function () {
    expect(html2ths.compile(
      '<div>' +
        '{{#foo greeting}}' +
          '<span>{{.}}</span>' +
          '<span>world</span>' +
        '{{/foo}}' +
      '</div>',
      h)(obj).outerHTML)
      .toBe('<div><span>hello!</span><span>world</span></div>');
  });
  
  it('if else', function () {
    expect(html2ths.compile(
      '<div>' +
        '{{#if flag}}' +
          '<span>{{greeting}}</span>' +
        '{{else}}' +
          '<span>world</span>' +
        '{{/flag}}' +
      '</div>',
      h)(obj).outerHTML)
      .toBe('<div><span>world</span></div>');
  });
  
  it('if else', function () {
    expect(html2ths.compile(
      '<div>' +
        '{{#each arrayNot}}' +
          '<span>{{.}}</span>' +
        '{{else}}' +
          '<span>not</span>' +
        '{{/arrayNot}}' +
      '</div>',
      h)(obj).outerHTML)
      .toBe('<div><span>not</span></div>');
  });
});
