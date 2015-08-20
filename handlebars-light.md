# handlebars-light

[handlebars] like light template

## sample

``` js
var obj = {
  greeting: "hello!"
};

var template = Handlebars.compile('<span>{{greeting}}</span>');
  console.log(template(obj));
   // <span>hello!</span>
```

* [docs](#docs)
  - [built-in helpers](#built-in-helpers)
  - [api](#api)
* [thanks](#thanks)

## docs

### built-in helpers

* if
* unless
* each
* if else
* each else

### api

* [registe helper](#registe-helper)
* [paths](#paths)
* [this context](#this-context)

#### registe helper
  block helper only

#### paths
  bracket syntax and dod syntax only
  
#### this context
  this expression is value > {{this}}
  
  example
  ``` html
    {{#each array}}
      <span>{{this}}</span>
    {{/each}}
  ```
  
  this expression is object > {{this.key}}
  example
  ``` html
  {{#each object}}
    <span>{{this.foo}}</span>
  {{/each}}
  ```

## thanks

  [handlebars] MIT
  
  Copyright (C) 2011-2015 by Yehuda Katz
  
  [MIT] source
  
[handlebars]: http://handlebarsjs.com/ "handlebars"
[MIT]: http://opensource.org/licenses/mit-license.php "MIT"

