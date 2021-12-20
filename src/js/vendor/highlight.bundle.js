;(function () {
  'use strict'

  var hljs = require('highlight.js/lib/highlight')
  hljs.registerLanguage('asciidoc', require('highlight.js/lib/languages/asciidoc'))
  hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'))
  hljs.registerLanguage('cpp', require('highlight.js/lib/languages/cpp'))
  hljs.registerLanguage('cs', require('highlight.js/lib/languages/cs'))
  hljs.registerLanguage('css', require('highlight.js/lib/languages/css'))
  hljs.registerLanguage('dockerfile', require('highlight.js/lib/languages/dockerfile'))
  hljs.registerLanguage('java', require('highlight.js/lib/languages/java'))
  hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'))
  hljs.registerLanguage('json', require('highlight.js/lib/languages/json'))
  hljs.registerLanguage('markdown', require('highlight.js/lib/languages/markdown'))
  hljs.registerLanguage('properties', require('highlight.js/lib/languages/properties'))
  hljs.registerLanguage('sql', require('highlight.js/lib/languages/sql'))
  hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'))
  hljs.registerLanguage('yaml', require('highlight.js/lib/languages/yaml'))
  hljs.registerLanguage('pgSQL', require('highlight.js/lib/languages/pgsql'))
  hljs.registerLanguage('typescript', require('highlight.js/lib/languages/typescript'))
  hljs.registerLanguage('shell', require('highlight.js/lib/languages/shell'))
  hljs.registerLanguage('treeview', function (hljs) {
    return {
      contains: [
        {
          className: 'folder-last-branch win',
          begin: /(\\|\└)(\-|\─){3}/,
          relevance: 0,
        },
        {
          className: 'folder-last-branch',
          begin: /(\`|\└)(\-|\─){2}/,
          relevance: 0,
        },
        {
          className: 'folder-branch win',
          begin: /(\-|\─){3}/,
          relevance: 0,
        },
        {
          className: 'folder-branch',
          begin: /(\-|\─){2}/,
          relevance: 0,
        },
        {
          className: 'tvline',
          begin: /\||\¦|\│|\+|\├/,
          relevance: 0,
        },
        {
          className: 'file plain',
          begin:
            /[^ \n\t  ].+\.(epub(3)?|mobi|azw(3)?|sh|bat|csv|log|md|markdown|info|txt|tex|pom|lst|project|iml)$/,
          relevance: 0,
        },
        /* new */
        {
          className: 'file asciidoc',
          begin: /[^ \n\t  ].+\.(asc(iidoc)?|ad(oc)?)/,
          relevance: 0,
        },
        {
          className: 'file certificate',
          begin: /\b(LICENSE|license)(\.txt)?\b/,
          relevance: 10,
        },
        {
          className: 'file css',
          begin: /[^ \n\t  ].+\.(css)/,
          relevance: 0,
        },
        {
          className: 'file editorconfig',
          begin: '\\.editorconfig',
          relevance: 10,
        },
        {
          className: 'file eslint',
          begin: '.eslintrc',
          relevance: 10,
        },
        {
          className: 'file favicon',
          begin: /[^ \n\t  ].+\.(ico)/,
          relevance: 0,
        },
        {
          className: 'file git',
          begin: '.gitignore',
          relevance: 10,
        },
        {
          className: 'file gitlab',
          begin: '.gitlab-ci.yml',
          relevance: 10,
        },
        {
          className: 'file handlebars',
          begin: /[^ \n\t  ].+\.(hbs)/,
          relevance: 0,
        },
        {
          className: 'file javascript',
          begin: /[^ \n\t  ].+\.(js|jsx)\b/,
          relevance: 0,
        },
        {
          className: 'file nodejs',
          begin: 'package.json|.nvmrc',
          relevance: 10,
        },
        {
          className: 'file json',
          begin: /[^ \n\t  ].+\.(json)/,
          relevance: 0,
        },
        {
          className: 'file settings',
          begin:
            /[^ \n\t  ].+\.(ini|config|conf|properties|prop|settings|props|toml|cfg)\b/,
          relevance: 10,
        },
        {
          className: 'file settings',
          begin: 'hosts',
          relevance: 10,
        },
        {
          className: 'file svg',
          begin: /[^ \n\t  ].+\.(svg)/,
          relevance: 0,
        },
        {
          className: 'file stylelint',
          begin: '.stylelintrc',
          relevance: 10,
        },
        {
          className: 'file vagrant',
          begin: 'Vagrantfile',
          relevance: 10,
        },
        {
          className: 'file xml',
          begin: /[^ \n\t  ].+\.(xml(.j2)?)/,
          relevance: 0,
        },
        {
          className: 'file yaml',
          begin: /[^ \n\t  ].+\.(y(a)?ml(.j2)?)\b/,
          relevance: 0,
        },
        {
          className: 'file yaml',
          begin: '\\.ansible-lint|\\.yamllint',
          relevance: 10,
        },
        {
          className: 'file yarn',
          begin: 'yarn.lock',
          relevance: 10,
        },
        {
          className: 'folder ansible',
          begin: 'ansible_collections|roles|inventories|playbooks',
          relevance: 10,
        },
        {
          className: 'folder css',
          begin: 'css',
          relevance: 10,
        },
        {
          className: 'folder docs',
          begin: 'docs',
          relevance: 10,
        },
        {
          className: 'folder dist',
          begin: 'dist|out|build|release|bin',
          relevance: 10,
        },
        {
          className: 'folder helper',
          begin: 'helper|helpers',
          relevance: 10,
        },
        {
          className: 'folder images',
          begin: 'img|images',
          relevance: 10,
        },
        {
          className: 'folder javascript',
          begin: 'js',
          relevance: 10,
        },
        {
          className: 'folder layout',
          begin: 'layout',
          relevance: 10,
        },
        {
          className: 'folder lib',
          begin: 'lib|libs|libraries|vendor|vendors|third-party',
          relevance: 10,
        },
        {
          className: 'folder src',
          begin: 'src|source',
          relevance: 10,
        },
        {
          className: 'folder public',
          begin: 'public|www|wwwroot|web|website',
          relevance: 10,
        },
        {
          className: 'folder vagrant',
          begin: '\\.vagrant',
          relevance: 10,
        },
        {
          className: 'folder views',
          begin: 'pages',
          relevance: 10,
        },
        {
          className: 'folder vscode',
          begin: '.vscode',
          relevance: 10,
        },
        /** old */
        {
          className: 'file video',
          begin:
            /[^ \n\t  ].+\.(cda|avi|flv|mkv|mov|mp4|mpeg|mpg|ogv|webm|divx|wmv)$/,
          relevance: 0,
        },
        {
          className: 'file source',
          begin:
            /[^ \n\t  ].+\.(asp(x)?|c(pp|lass)?|h(tm(l)?|(h)?)|jav(a)?|aj|php|rb)$/,
          relevance: 0,
        },
        {
          className: 'file photo',
          begin:
            /[^ \n\t  ].+\.(bmp|eps|gif|jpg|jpe(g)?|png|tif(f)?|ico|tga|targa|j2(k|c)|jng)$/,
          relevance: 0,
        },
        {
          className: 'file audio',
          begin:
            /[^ \n\t  ].+\.(aac|au|cda|flac|mp(3|2)|oga|ogg|wav|wma|flac|ac3|mac)$/,
          relevance: 0,
        },
        {
          className: 'file archive',
          begin: /[^ \n\t  ].+\.(7z|bz(2)?|gz|rar|tar|tgz|zip|repo|jar)$/,
          relevance: 0,
        },
        {
          className: 'file pdf',
          begin: /[^ \n\t  ].+\.(pdf)$/,
          relevance: 0,
        },
        {
          className: 'file xls',
          begin: /[^ \n\t  ].+\.(xls(x)?)$/,
          relevance: 0,
        },
        {
          className: 'file doc',
          begin: /[^ \n\t  ].+\.(doc(m|x)?)$/,
          relevance: 0,
        },
        {
          className: 'file ppt',
          begin: /[^ \n\t  ].+\.(pps|ppt(x)?)$/,
          relevance: 0,
        },
        // {
        //   className: "hiddenfile",
        //   begin: /\..+/,
        //   relevance: 0,
        // },
        {
          className: 'file plain',
          begin: /(readme|README|CNAME)$/,
          relevance: 0,
        },
        {
          className: 'folder',
          begin: /[^ \n\t  ].+(\/)?/,
          relevance: 0,
        },
      ],
    }
  });

  [].slice
    .call(document.querySelectorAll('pre code.hljs'))
    .forEach(function (node) {
      hljs.highlightBlock(node)
    })
})()
