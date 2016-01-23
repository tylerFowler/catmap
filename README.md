CatMap
=================================

A simple package to convert a file mapping configuration into a file map that can be used for minification or concatenation build tasks.

*Motivated by my laziness.*

## Format
```cson
example_config.cson

app:
  options: srcDir: '.tmp/app'
  files:
    # Main Application Code #
    'public/app/app.js': [
      'app.module.js'
      'app.routes.js'
      'app.directives.js'
      'app.controller.js'
    ]

    # User Authentication Components #
    'public/app/auth.js': [
      'components/auth/singupController.js'
      'components/auth/signinController.js'
      'components/auth/authService.js'
    ]

libs:
  options: srcDir: 'bower_modules'
  files:
    'public/lib/vendor.min.js': [
      'angular/angular.min.js'
      'angular-resource/angular-resource.min.js'
      'angular-ui-router/release/angular-ui-router.min.js'
    ]
```

## Usage
```javascript
const catmap = require('catmap');

let filemapping = catmap('./example_config.cson');

// Or if you prefer JSON

let filemapping = catmap('./example_config.json');

// filemapping =>
{
  'public/lib/vendor.min.js': [
    'bower_modules/angular/angular.min.js',
    'bower_modules/angular-resource/angular-resource.min.js',
    'bower_modules/angular-ui-router/release/angular-ui-router.min.js'
  ],
  'public/app/app.js': [
    '.tmp/app/app.module.js',
    '.tmp/app/app.routes.js',
    '.tmp/app/app.directives.js',
    '.tmp/app/app.controller.js'
  ],
  'public/app/auth.js': [
    '.tmp/app/components/auth/singupController.js',
    '.tmp/app/components/auth/signinController.js',
    '.tmp/app/components/auth/authService.js'
  ]
}
```

#### Example: Grunt Uglify

```javascript
const catmap = require('catmap');

uglify: {
  production: {
    files: catmap('config/fileConcatMappings.cson')
  }
}
```

## License

The MIT License (MIT)

Copyright (c) 2016 Tyler Fowler

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
