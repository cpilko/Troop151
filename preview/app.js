(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("assets/404.pug", function(exports, require, module) {
function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"app\u002Fassets\u002F404.pug":"extends partials\u002F_layout\n\nblock vars\n  -var pageTitle = '404'\n  -var pageDesc = 'Error: Resource Not Found'\n  -var mastheadImg ='lost.jpg'\n\nblock masthead\n  h1 You Look Lost\n  p Sorry. We can't find the page you're looking for.\n","app\u002Fassets\u002Fpartials\u002F_layout.pug":"include _mixins.pug\r\n\r\nblock vars\r\n  -var pageTitle = 'Layout'\r\n  -var pageDesc = 'Description of this page'\r\n  -var pageFile = 'index'\r\n  -var scripts = ''\r\n\r\nif mastheadImg\r\n  -var mastheadImgUrl = '.\u002Fimg\u002Fmastheads\u002F' + mastheadImg\r\nelse\r\n  -var mastheadImgUrl = '.\u002Fimg\u002Fmastheads\u002Fmasthead_img.jpg'\r\n\r\ndoctype html\r\nhtml(prefix='og: http:\u002F\u002Fogp.me\u002Fns#', lang='en')\r\n  head\r\n    include _head.pug\r\n\r\n  body\r\n    #main\r\n      header\r\n        include _top_nav.pug\r\n        section#masthead(style='background: no-repeat center\u002Fcover url('+mastheadImgUrl+')')\r\n          .masthead-content\r\n            block masthead\r\n              h1 Troop 151, Broomall PA\r\n              p A Scout-Led Troop\r\n              p Chartered to Marple Presbyterian Church\r\n\r\n      #content\r\n        block content\r\n        article#contact\r\n          header\r\n            h1 Contact Us\r\n          #contact-form\r\n            include _contact.pug\r\n\r\n    include _foot.pug\r\n\r\n    if scripts == 'foxycart'\r\n      include _foxycart.html\r\n","app\u002Fassets\u002Fpartials\u002F_mixins.pug":"mixin linkbutton(link, text)\n  .more-div\n    span.more-wrap\n      a(href=link, class='more-button')= text\n\nmixin eventItem(title, eventImage)\n  .event-gallery\n    img(src='.\u002Fimg\u002Fevents\u002F'+eventImage)\n    .background-shade\n      .event-desc\n        h4= title\n        block\n\nmixin leader(name, title, profileImage)\n  .leader-gallery\n    if profileImage\n      img(src='.\u002Fimg\u002Fleaders\u002F'+profileImage)\n    else\n      img(src='.\u002Fimg\u002Fleaders\u002Fno-photo.png')\n    p.leader_name= name\n    p.leader_title= title\n\nmixin eagle(name, year)\n  .eagle-gallery\n    .eagle-logo\n      img(src='.\u002Fimg\u002Feagle_badge.gif')\n    .eagle-data\n      p.eagle-name= name\n      p.eagle-year= year\n      \nmixin foxyitem(name, price, image, code, option_name, ...options)\n  .item-card(id= code)\n    .item-card-info\n      .item-image\n        img(src=image)\n      .item-data\n        .item-data-head\n          p.item-name= name\n          p.item-price= '$' + price.toFixed(2)\n        .item-description\n          if block\n            block\n        .item-form\n          form(action='https:\u002F\u002Ft151.foxycart.com\u002Fcart', method='post', accept-charset='utf-8' id= code + '_form')\n            input(type='hidden', name='name', value= name)\n            input(type='hidden', name='price', value= price)\n            input(type='hidden', name='code', value= code)\n            input(type='hidden', name='category', value='Poinsettia_Sale')\n            -var date = new Date('2019-11-17T23:59:00')\n            input(type='hidden', name='expires', value= Math.floor(date.getTime()\u002F1000))\n            input(type='number', name='quantity' value=1, min=0)\n            if option_name\n              -var on = option_name.charAt(0).toUpperCase() + option_name.slice(1)\n              label.option_label= on\n              select(name= option_name)\n                each item in options\n                  -var it = item.charAt(0).toUpperCase()+item.slice(1)\n                  option(value= it +'{c+' + it.charAt(0) +'}') #{it}\n            input.submit(type='submit', value=`Add ${name} to Cart`)\n            ","app\u002Fassets\u002Fpartials\u002F_head.pug":"meta(charset='utf-8')\nmeta(http-equiv='X-UA-Compatible', content='IE=edge')\nmeta(name='description', content= pageDesc)\nmeta(name='author', content= \"Troop 151 Broomall, PA\")\nmeta(name=\"viewport\" content=\"width=device-width, initial-scale=1\")\n\nmeta(property=\"og:title\", content= pageTitle)\nmeta(property=\"og:description\", content= pageDesc)\nmeta(property=\"og:type\", content=\"website\")\nmeta(property=\"og:url\", content=\"https:\u002F\u002Ft151.org\u002F\" + pageFile + '.html' )\nmeta(property=\"og:image\", content= mastheadImgUrl)\nmeta(property=\"og:image:width\", content=\"3264\")\nmeta(property=\"og:image:height\", content=\"2448\")\n\ninclude _favicon.pug\n\nlink(href=\"app.css\", rel=\"stylesheet\", type=\"text\u002Fcss\")\n","app\u002Fassets\u002Fpartials\u002F_favicon.pug":"\u002F\u002F- Generated at https:\u002F\u002Frealfavicongenerator.net\u002F\r\nlink(rel=\"apple-touch-icon\", sizes=\"180x180\", href=\"\u002Fimg\u002Ffavicon\u002Fapple-touch-icon.png\")\r\nlink(rel=\"icon\", type=\"image\u002Fpng\", sizes=\"32x32\", href=\"\u002Fimg\u002Ffavicon\u002Ffavicon-32x32.png\")\r\nlink(rel=\"icon\", type=\"image\u002Fpng\", sizes=\"16x16\", href=\"\u002Fimg\u002Ffavicon\u002Ffavicon-16x16.png\")\r\nlink(rel=\"manifest\", href=\"\u002Fimg\u002Ffavicon\u002Fsite.webmanifest\")\r\nlink(rel=\"mask-icon\", href=\"\u002Fimg\u002Ffavicon\u002Fsafari-pinned-tab.svg\", color=\"#5bbad5\")\r\nmeta(name=\"apple-mobile-web-app-title\", content=\"Troop 151\")\r\nmeta(name=\"application-name\", content=\"Troop 151\")\r\nmeta(name=\"msapplication-TileColor\", content=\"#da532c\")\r\nmeta(name=\"theme-color\", content=\"#da532c\")\r\n","app\u002Fassets\u002Fpartials\u002F_top_nav.pug":"nav#top_nav\r\n  h1 Troop 151\r\n  ul\r\n    li: a(href='.\u002Findex.html') &#127968;\r\n    li: a(href='#footer') &#x2630;\r\n","app\u002Fassets\u002Fpartials\u002F_contact.pug":"form(\n  action='https:\u002F\u002Fapp.99inbound.com\u002Fapi\u002Fe\u002FqnSf2KrH'\n  method='POST'\n)\n  .col-wrap\n    .formcol\n      .form\n        label(for='name') Name:\n        input(\n          type='text'\n          name='name'\n          id='name'\n          placeholder='Joe Smith'\n          required\n          autocomplete='name'\n        )\n      .form\n        label(for='__replyto') Email:\n        input(\n          type='email'\n          name='__replyto'\n          id='__replyto'\n          placeholder='jsmith@example.com'\n          required\n          autocomplete='email'\n        )\n      .form\n        label(for='phone') Phone:\n        input(\n          type='tel'\n          name='phone'\n          id='phone'\n          placeholder='610-555-1212'\n          autocomplete='tel'\n        )\n    .formcol\n      .form\n        label(for='message') Message:\n        textarea(\n          name='message'\n          id='message'\n          placeholder='Your message here'\n          minlength=20\n          rows=6\n          cols=20\n        )\n  input(\n    type='hidden'\n    name='__redirect'\n    id='__redirect'\n    value=''\n  )\n  input(\n    type='hidden'\n    name='__subject'\n    id='__subject'\n    value='Troop 151 Website Contact'\n  )\n  \u003Cdiv style=\"position: absolute; left: -5000px;\"\u003E\n  \u003Cinput type=\"checkbox\" name=\"conservative_cornflower_blue_matte_headphones\" value=\"1\" tabindex=\"-1\" autocomplete=\"no\"\u003E\n  \u003C\u002Fdiv\u003E\n  input(\n    type='submit'\n    id='form_submit'\n    value='Send Message'\n  )\nscript.\n  var r = document.getElementById('__redirect')\n  var s = window.location.href\n  if (s.indexOf('.html') !== -1 ) {\n    var re = \u002F(.+\\\u002F)(.+\\.html?$)\u002Fi\n    r.value = s.replace(re, '$1') + 'thankyou.html'\n  } else {\n    r.value = s + 'thankyou.html'\n  }\n","app\u002Fassets\u002Fpartials\u002F_foot.pug":"-var now = new Date()\r\n-var expires = new Date('2019-11-17T23:59:00')\r\nfooter#footer\r\n  .col-wrap\r\n    .col-thirds\r\n      img(src='.\u002Fimg\u002F151-patch.png').foot-img\r\n      a(href='https:\u002F\u002Fmy.bsa.us\u002F525taa0151mb' target='_blank').join-button Join Now\r\n    .col-thirds\r\n      h4 Troop 151, BSA\r\n      p: a(href='http:\u002F\u002Fcubpack151.org\u002F' target='_blank') Pack 151\r\n      p Crew 151\r\n      h4 Chartered To\r\n      p: a(href='http:\u002F\u002Fmarplepres.org\u002F' target='_blank') Marple Presbyterian Church\r\n      p 150 North Sproul Road\r\n      p Broomall, PA 19008\r\n      h4 Affiliated With\r\n      p: a(href='http:\u002F\u002Fcolbsa.org\u002Fconstellation\u002F') Constellation District\r\n      p: a(href='http:\u002F\u002Fcolbsa.org\u002F' target='_blank') Cradle of Liberty Council\r\n      p: a(href='http:\u002F\u002Fscouting.org\u002F' target='_blank') Boy Scouts of America\r\n    .col-thirds\r\n      h4 Site Map\r\n      ul.foot-nav\r\n        li: a(href='.\u002Findex.html') Home\r\n        li: a(href='.\u002Fabout.html') About Us\r\n        if now \u003C= expires\r\n          li: a(href='.\u002Fpoinsettias.html') Support Us\r\n        else\r\n          li: a(href='.\u002Fsupport.html') Support Us\r\n        li: a(href='.\u002Fresources.html') Tools and Resources\r\n        li: a(href='.\u002Fterms.html') Terms and Privacy Policy\r\n  .foot-end\r\n    p &copy;2019 Troop 151\r\n","app\u002Fassets\u002Fpartials\u002F_foxycart.html":"\u003C!-- FOXYCART --\u003E\n\u003Cscript data-cfasync=\"false\" src=\"https:\u002F\u002Fcdn.foxycart.com\u002Ft151\u002Floader.js\" async defer\u003E\u003C\u002Fscript\u003E\n\u003C!-- \u002FFOXYCART --\u003E\n"};
;var locals_for_with = (locals || {});(function (pageFile, scripts) {;pug_debug_line = 1;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";











;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";


















;pug_debug_line = 14;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";






















;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";



















;pug_debug_line = 31;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";






















































































;pug_debug_line = 3;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002F404.pug";
var pageTitle = '404'
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002F404.pug";
var pageDesc = 'Error: Resource Not Found'
;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002F404.pug";
var mastheadImg ='lost.jpg'
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
if (mastheadImg) {
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
var mastheadImgUrl = './img/mastheads/' + mastheadImg
}
else {
;pug_debug_line = 12;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
var mastheadImgUrl = './img/mastheads/masthead_img.jpg'
}
;pug_debug_line = 14;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003C!DOCTYPE html\u003E";
;pug_debug_line = 15;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Chtml prefix=\"og: http:\u002F\u002Fogp.me\u002Fns#\" lang=\"en\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Chead\u003E";
;pug_debug_line = 1;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta charset=\"utf-8\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta" + (" name=\"description\""+pug.attr("content", pageDesc, true, true)) + "\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta name=\"author\" content=\"Troop 151 Broomall, PA\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta" + (" property=\"og:title\""+pug.attr("content", pageTitle, true, true)) + "\u003E";
;pug_debug_line = 8;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta" + (" property=\"og:description\""+pug.attr("content", pageDesc, true, true)) + "\u003E";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta property=\"og:type\" content=\"website\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta" + (" property=\"og:url\""+pug.attr("content", "https://t151.org/" + pageFile + '.html', true, true)) + "\u003E";
;pug_debug_line = 11;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta" + (" property=\"og:image\""+pug.attr("content", mastheadImgUrl, true, true)) + "\u003E";
;pug_debug_line = 12;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta property=\"og:image:width\" content=\"3264\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta property=\"og:image:height\" content=\"2448\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Clink rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"\u002Fimg\u002Ffavicon\u002Fapple-touch-icon.png\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Clink rel=\"icon\" type=\"image\u002Fpng\" sizes=\"32x32\" href=\"\u002Fimg\u002Ffavicon\u002Ffavicon-32x32.png\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Clink rel=\"icon\" type=\"image\u002Fpng\" sizes=\"16x16\" href=\"\u002Fimg\u002Ffavicon\u002Ffavicon-16x16.png\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Clink rel=\"manifest\" href=\"\u002Fimg\u002Ffavicon\u002Fsite.webmanifest\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Clink rel=\"mask-icon\" href=\"\u002Fimg\u002Ffavicon\u002Fsafari-pinned-tab.svg\" color=\"#5bbad5\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Cmeta name=\"apple-mobile-web-app-title\" content=\"Troop 151\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Cmeta name=\"application-name\" content=\"Troop 151\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Cmeta name=\"msapplication-TileColor\" content=\"#da532c\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Cmeta name=\"theme-color\" content=\"#da532c\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Clink href=\"app.css\" rel=\"stylesheet\" type=\"text\u002Fcss\"\u003E\u003C\u002Fhead\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cbody\u003E";
;pug_debug_line = 20;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cdiv id=\"main\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cheader\u003E";
;pug_debug_line = 1;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Cnav id=\"top_nav\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 2;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "Troop 151\u003C\u002Fh1\u003E";
;pug_debug_line = 3;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Cul\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Findex.html\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "&#127968;\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Ca href=\"#footer\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "&#x2630;\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fnav\u003E";
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Csection" + (" id=\"masthead\""+pug.attr("style", pug.style('background: no-repeat center/cover url('+mastheadImgUrl+')'), true, true)) + "\u003E";
;pug_debug_line = 24;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cdiv class=\"masthead-content\"\u003E";
;pug_debug_line = 25;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002F404.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002F404.pug";
pug_html = pug_html + "You Look Lost\u003C\u002Fh1\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002F404.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002F404.pug";
pug_html = pug_html + "Sorry. We can't find the page you're looking for.\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fsection\u003E\u003C\u002Fheader\u003E";
;pug_debug_line = 30;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cdiv id=\"content\"\u003E";
;pug_debug_line = 31;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
;pug_debug_line = 32;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Carticle id=\"contact\"\u003E";
;pug_debug_line = 33;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cheader\u003E";
;pug_debug_line = 34;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 34;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "Contact Us\u003C\u002Fh1\u003E\u003C\u002Fheader\u003E";
;pug_debug_line = 35;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cdiv id=\"contact-form\"\u003E";
;pug_debug_line = 1;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cform action=\"https:\u002F\u002Fapp.99inbound.com\u002Fapi\u002Fe\u002FqnSf2KrH\" method=\"POST\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-wrap\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"formcol\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"form\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Clabel for=\"name\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "Name:\u003C\u002Flabel\u003E";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cinput type=\"text\" name=\"name\" id=\"name\" placeholder=\"Joe Smith\" required autocomplete=\"name\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"form\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Clabel for=\"__replyto\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "Email:\u003C\u002Flabel\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cinput type=\"email\" name=\"__replyto\" id=\"__replyto\" placeholder=\"jsmith@example.com\" required autocomplete=\"email\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 27;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"form\"\u003E";
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Clabel for=\"phone\"\u003E";
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "Phone:\u003C\u002Flabel\u003E";
;pug_debug_line = 29;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cinput type=\"tel\" name=\"phone\" id=\"phone\" placeholder=\"610-555-1212\" autocomplete=\"tel\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 36;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"formcol\"\u003E";
;pug_debug_line = 37;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"form\"\u003E";
;pug_debug_line = 38;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Clabel for=\"message\"\u003E";
;pug_debug_line = 38;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "Message:\u003C\u002Flabel\u003E";
;pug_debug_line = 39;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Ctextarea name=\"message\" id=\"message\" placeholder=\"Your message here\" minlength=\"20\" rows=\"6\" cols=\"20\"\u003E\u003C\u002Ftextarea\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 47;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cinput type=\"hidden\" name=\"__redirect\" id=\"__redirect\" value=\"\"\u003E";
;pug_debug_line = 53;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cinput type=\"hidden\" name=\"__subject\" id=\"__subject\" value=\"Troop 151 Website Contact\"\u003E";
;pug_debug_line = 59;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv style=\"position: absolute; left: -5000px;\"\u003E\n\u003Cinput type=\"checkbox\" name=\"conservative_cornflower_blue_matte_headphones\" value=\"1\" tabindex=\"-1\" autocomplete=\"no\"\u003E\n\u003C\u002Fdiv\u003E";
;pug_debug_line = 62;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cinput type=\"submit\" id=\"form_submit\" value=\"Send Message\"\u003E\u003C\u002Fform\u003E";
;pug_debug_line = 67;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cscript\u003E";
;pug_debug_line = 68;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "var r = document.getElementById('__redirect')";
;pug_debug_line = 69;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 69;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "var s = window.location.href";
;pug_debug_line = 70;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 70;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "if (s.indexOf('.html') !== -1 ) {";
;pug_debug_line = 71;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 71;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "  var re = \u002F(.+\\\u002F)(.+\\.html?$)\u002Fi";
;pug_debug_line = 72;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 72;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "  r.value = s.replace(re, '$1') + 'thankyou.html'";
;pug_debug_line = 73;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 73;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "} else {";
;pug_debug_line = 74;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 74;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "  r.value = s + 'thankyou.html'";
;pug_debug_line = 75;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 75;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "}\u003C\u002Fscript\u003E\u003C\u002Fdiv\u003E\u003C\u002Farticle\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 1;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
var now = new Date()
;pug_debug_line = 2;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
var expires = new Date('2019-11-17T23:59:00')
;pug_debug_line = 3;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cfooter id=\"footer\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-wrap\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-thirds\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cimg class=\"foot-img\" src=\".\u002Fimg\u002F151-patch.png\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca class=\"join-button\" href=\"https:\u002F\u002Fmy.bsa.us\u002F525taa0151mb\" target=\"_blank\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Join Now\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 8;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-thirds\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Troop 151, BSA\u003C\u002Fh4\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\"http:\u002F\u002Fcubpack151.org\u002F\" target=\"_blank\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Pack 151\u003C\u002Fa\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 11;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 11;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Crew 151\u003C\u002Fp\u003E";
;pug_debug_line = 12;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 12;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Chartered To\u003C\u002Fh4\u003E";
;pug_debug_line = 13;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 13;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\"http:\u002F\u002Fmarplepres.org\u002F\" target=\"_blank\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Marple Presbyterian Church\u003C\u002Fa\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 14;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 14;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "150 North Sproul Road\u003C\u002Fp\u003E";
;pug_debug_line = 15;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 15;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Broomall, PA 19008\u003C\u002Fp\u003E";
;pug_debug_line = 16;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 16;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Affiliated With\u003C\u002Fh4\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\"http:\u002F\u002Fcolbsa.org\u002Fconstellation\u002F\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Constellation District\u003C\u002Fa\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\"http:\u002F\u002Fcolbsa.org\u002F\" target=\"_blank\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Cradle of Liberty Council\u003C\u002Fa\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\"http:\u002F\u002Fscouting.org\u002F\" target=\"_blank\"\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Boy Scouts of America\u003C\u002Fa\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 20;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-thirds\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 21;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Site Map\u003C\u002Fh4\u003E";
;pug_debug_line = 22;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cul class=\"foot-nav\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Findex.html\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Home\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 24;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 24;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Fabout.html\"\u003E";
;pug_debug_line = 24;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "About Us\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 25;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
if (now <= expires) {
;pug_debug_line = 26;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 26;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Fpoinsettias.html\"\u003E";
;pug_debug_line = 26;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Support Us\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
}
else {
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Fsupport.html\"\u003E";
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Support Us\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
}
;pug_debug_line = 29;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 29;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Fresources.html\"\u003E";
;pug_debug_line = 29;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Tools and Resources\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 30;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 30;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Fterms.html\"\u003E";
;pug_debug_line = 30;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Terms and Privacy Policy\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 31;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cdiv class=\"foot-end\"\u003E";
;pug_debug_line = 32;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 32;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "&copy;2019 Troop 151\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Ffooter\u003E";
;pug_debug_line = 40;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
if (scripts == 'foxycart') {
pug_html = pug_html + "\u003C!-- FOXYCART --\u003E\n\u003Cscript data-cfasync=\"false\" src=\"https:\u002F\u002Fcdn.foxycart.com\u002Ft151\u002Floader.js\" async defer\u003E\u003C\u002Fscript\u003E\n\u003C!-- \u002FFOXYCART --\u003E\n";
}
pug_html = pug_html + "\u003C\u002Fbody\u003E\u003C\u002Fhtml\u003E";}.call(this,"pageFile" in locals_for_with?locals_for_with.pageFile:typeof pageFile!=="undefined"?pageFile:undefined,"scripts" in locals_for_with?locals_for_with.scripts:typeof scripts!=="undefined"?scripts:undefined));} catch (err) {pug.rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;};
module.exports = template;
});

;require.register("assets/about.pug", function(exports, require, module) {
function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"app\u002Fassets\u002Fabout.pug":"extends partials\u002F_layout\r\n\r\nblock vars\r\n  -var pageTitle = 'About'\r\n  -var pageDesc = 'About Troop 151'\r\n  -var mastheadImg ='masthead_about.jpg'\r\n\r\nblock masthead\r\n  h1 About Troop 151\r\n\r\nblock content\r\n  article#mission\r\n    heading\r\n      h1 Mission\r\n    \u002F\u002F- p TODO: Write Mission Statement\r\n  article#values\r\n    heading\r\n      h1 Values\r\n      h2 Our values are the Scout Oath and Law\r\n    .col-wrap\r\n      .values-col\r\n        dl\r\n          dt The Scout Law\r\n          dd A Scout is:\r\n          dd Trustworthy, Loyal, Helpful,\r\n          dd Friendly, Corteous, Kind,\r\n          dd Obedient, Cheerful, Thrifty,\r\n          dd Brave, Clean, and Reverent\r\n      .values-col\r\n        dl\r\n          dt The Scout Oath\r\n          dd On my honor I will do my best to do my duty\r\n          dd to God and my country\r\n          dd and to obey the Scout Law;\r\n          dd to help other people at all times;\r\n          dd to keep myself physically strong,\r\n          dd mentally awake,\r\n          dd and morally straight.\r\n  article#history\r\n    heading\r\n      h1 History\r\n  article#leadership\r\n    heading\r\n      h1 Leadership\r\n    .col-wrap\r\n      include partials\u002F_leaders.pug\r\n    +linkbutton('resources.html#training', 'Become a Leader')\r\n  article#eagles\r\n    heading\r\n      h1 Eagles Nest\r\n      p.\r\n        The rank of Eagle, the highest rank in Scouting, is a badge of honor. It is symbolic of\r\n        the years of hard work these Scouts performed learning leadership, outdoor skills, and\r\n        dedicating themselves to service. We are proud of all of our Eagles.\r\n      .col-wrap\r\n        include partials\u002F_eagles.pug\r\n","app\u002Fassets\u002Fpartials\u002F_layout.pug":"include _mixins.pug\r\n\r\nblock vars\r\n  -var pageTitle = 'Layout'\r\n  -var pageDesc = 'Description of this page'\r\n  -var pageFile = 'index'\r\n  -var scripts = ''\r\n\r\nif mastheadImg\r\n  -var mastheadImgUrl = '.\u002Fimg\u002Fmastheads\u002F' + mastheadImg\r\nelse\r\n  -var mastheadImgUrl = '.\u002Fimg\u002Fmastheads\u002Fmasthead_img.jpg'\r\n\r\ndoctype html\r\nhtml(prefix='og: http:\u002F\u002Fogp.me\u002Fns#', lang='en')\r\n  head\r\n    include _head.pug\r\n\r\n  body\r\n    #main\r\n      header\r\n        include _top_nav.pug\r\n        section#masthead(style='background: no-repeat center\u002Fcover url('+mastheadImgUrl+')')\r\n          .masthead-content\r\n            block masthead\r\n              h1 Troop 151, Broomall PA\r\n              p A Scout-Led Troop\r\n              p Chartered to Marple Presbyterian Church\r\n\r\n      #content\r\n        block content\r\n        article#contact\r\n          header\r\n            h1 Contact Us\r\n          #contact-form\r\n            include _contact.pug\r\n\r\n    include _foot.pug\r\n\r\n    if scripts == 'foxycart'\r\n      include _foxycart.html\r\n","app\u002Fassets\u002Fpartials\u002F_mixins.pug":"mixin linkbutton(link, text)\n  .more-div\n    span.more-wrap\n      a(href=link, class='more-button')= text\n\nmixin eventItem(title, eventImage)\n  .event-gallery\n    img(src='.\u002Fimg\u002Fevents\u002F'+eventImage)\n    .background-shade\n      .event-desc\n        h4= title\n        block\n\nmixin leader(name, title, profileImage)\n  .leader-gallery\n    if profileImage\n      img(src='.\u002Fimg\u002Fleaders\u002F'+profileImage)\n    else\n      img(src='.\u002Fimg\u002Fleaders\u002Fno-photo.png')\n    p.leader_name= name\n    p.leader_title= title\n\nmixin eagle(name, year)\n  .eagle-gallery\n    .eagle-logo\n      img(src='.\u002Fimg\u002Feagle_badge.gif')\n    .eagle-data\n      p.eagle-name= name\n      p.eagle-year= year\n      \nmixin foxyitem(name, price, image, code, option_name, ...options)\n  .item-card(id= code)\n    .item-card-info\n      .item-image\n        img(src=image)\n      .item-data\n        .item-data-head\n          p.item-name= name\n          p.item-price= '$' + price.toFixed(2)\n        .item-description\n          if block\n            block\n        .item-form\n          form(action='https:\u002F\u002Ft151.foxycart.com\u002Fcart', method='post', accept-charset='utf-8' id= code + '_form')\n            input(type='hidden', name='name', value= name)\n            input(type='hidden', name='price', value= price)\n            input(type='hidden', name='code', value= code)\n            input(type='hidden', name='category', value='Poinsettia_Sale')\n            -var date = new Date('2019-11-17T23:59:00')\n            input(type='hidden', name='expires', value= Math.floor(date.getTime()\u002F1000))\n            input(type='number', name='quantity' value=1, min=0)\n            if option_name\n              -var on = option_name.charAt(0).toUpperCase() + option_name.slice(1)\n              label.option_label= on\n              select(name= option_name)\n                each item in options\n                  -var it = item.charAt(0).toUpperCase()+item.slice(1)\n                  option(value= it +'{c+' + it.charAt(0) +'}') #{it}\n            input.submit(type='submit', value=`Add ${name} to Cart`)\n            ","app\u002Fassets\u002Fpartials\u002F_head.pug":"meta(charset='utf-8')\nmeta(http-equiv='X-UA-Compatible', content='IE=edge')\nmeta(name='description', content= pageDesc)\nmeta(name='author', content= \"Troop 151 Broomall, PA\")\nmeta(name=\"viewport\" content=\"width=device-width, initial-scale=1\")\n\nmeta(property=\"og:title\", content= pageTitle)\nmeta(property=\"og:description\", content= pageDesc)\nmeta(property=\"og:type\", content=\"website\")\nmeta(property=\"og:url\", content=\"https:\u002F\u002Ft151.org\u002F\" + pageFile + '.html' )\nmeta(property=\"og:image\", content= mastheadImgUrl)\nmeta(property=\"og:image:width\", content=\"3264\")\nmeta(property=\"og:image:height\", content=\"2448\")\n\ninclude _favicon.pug\n\nlink(href=\"app.css\", rel=\"stylesheet\", type=\"text\u002Fcss\")\n","app\u002Fassets\u002Fpartials\u002F_favicon.pug":"\u002F\u002F- Generated at https:\u002F\u002Frealfavicongenerator.net\u002F\r\nlink(rel=\"apple-touch-icon\", sizes=\"180x180\", href=\"\u002Fimg\u002Ffavicon\u002Fapple-touch-icon.png\")\r\nlink(rel=\"icon\", type=\"image\u002Fpng\", sizes=\"32x32\", href=\"\u002Fimg\u002Ffavicon\u002Ffavicon-32x32.png\")\r\nlink(rel=\"icon\", type=\"image\u002Fpng\", sizes=\"16x16\", href=\"\u002Fimg\u002Ffavicon\u002Ffavicon-16x16.png\")\r\nlink(rel=\"manifest\", href=\"\u002Fimg\u002Ffavicon\u002Fsite.webmanifest\")\r\nlink(rel=\"mask-icon\", href=\"\u002Fimg\u002Ffavicon\u002Fsafari-pinned-tab.svg\", color=\"#5bbad5\")\r\nmeta(name=\"apple-mobile-web-app-title\", content=\"Troop 151\")\r\nmeta(name=\"application-name\", content=\"Troop 151\")\r\nmeta(name=\"msapplication-TileColor\", content=\"#da532c\")\r\nmeta(name=\"theme-color\", content=\"#da532c\")\r\n","app\u002Fassets\u002Fpartials\u002F_top_nav.pug":"nav#top_nav\r\n  h1 Troop 151\r\n  ul\r\n    li: a(href='.\u002Findex.html') &#127968;\r\n    li: a(href='#footer') &#x2630;\r\n","app\u002Fassets\u002Fpartials\u002F_contact.pug":"form(\n  action='https:\u002F\u002Fapp.99inbound.com\u002Fapi\u002Fe\u002FqnSf2KrH'\n  method='POST'\n)\n  .col-wrap\n    .formcol\n      .form\n        label(for='name') Name:\n        input(\n          type='text'\n          name='name'\n          id='name'\n          placeholder='Joe Smith'\n          required\n          autocomplete='name'\n        )\n      .form\n        label(for='__replyto') Email:\n        input(\n          type='email'\n          name='__replyto'\n          id='__replyto'\n          placeholder='jsmith@example.com'\n          required\n          autocomplete='email'\n        )\n      .form\n        label(for='phone') Phone:\n        input(\n          type='tel'\n          name='phone'\n          id='phone'\n          placeholder='610-555-1212'\n          autocomplete='tel'\n        )\n    .formcol\n      .form\n        label(for='message') Message:\n        textarea(\n          name='message'\n          id='message'\n          placeholder='Your message here'\n          minlength=20\n          rows=6\n          cols=20\n        )\n  input(\n    type='hidden'\n    name='__redirect'\n    id='__redirect'\n    value=''\n  )\n  input(\n    type='hidden'\n    name='__subject'\n    id='__subject'\n    value='Troop 151 Website Contact'\n  )\n  \u003Cdiv style=\"position: absolute; left: -5000px;\"\u003E\n  \u003Cinput type=\"checkbox\" name=\"conservative_cornflower_blue_matte_headphones\" value=\"1\" tabindex=\"-1\" autocomplete=\"no\"\u003E\n  \u003C\u002Fdiv\u003E\n  input(\n    type='submit'\n    id='form_submit'\n    value='Send Message'\n  )\nscript.\n  var r = document.getElementById('__redirect')\n  var s = window.location.href\n  if (s.indexOf('.html') !== -1 ) {\n    var re = \u002F(.+\\\u002F)(.+\\.html?$)\u002Fi\n    r.value = s.replace(re, '$1') + 'thankyou.html'\n  } else {\n    r.value = s + 'thankyou.html'\n  }\n","app\u002Fassets\u002Fpartials\u002F_foot.pug":"-var now = new Date()\r\n-var expires = new Date('2019-11-17T23:59:00')\r\nfooter#footer\r\n  .col-wrap\r\n    .col-thirds\r\n      img(src='.\u002Fimg\u002F151-patch.png').foot-img\r\n      a(href='https:\u002F\u002Fmy.bsa.us\u002F525taa0151mb' target='_blank').join-button Join Now\r\n    .col-thirds\r\n      h4 Troop 151, BSA\r\n      p: a(href='http:\u002F\u002Fcubpack151.org\u002F' target='_blank') Pack 151\r\n      p Crew 151\r\n      h4 Chartered To\r\n      p: a(href='http:\u002F\u002Fmarplepres.org\u002F' target='_blank') Marple Presbyterian Church\r\n      p 150 North Sproul Road\r\n      p Broomall, PA 19008\r\n      h4 Affiliated With\r\n      p: a(href='http:\u002F\u002Fcolbsa.org\u002Fconstellation\u002F') Constellation District\r\n      p: a(href='http:\u002F\u002Fcolbsa.org\u002F' target='_blank') Cradle of Liberty Council\r\n      p: a(href='http:\u002F\u002Fscouting.org\u002F' target='_blank') Boy Scouts of America\r\n    .col-thirds\r\n      h4 Site Map\r\n      ul.foot-nav\r\n        li: a(href='.\u002Findex.html') Home\r\n        li: a(href='.\u002Fabout.html') About Us\r\n        if now \u003C= expires\r\n          li: a(href='.\u002Fpoinsettias.html') Support Us\r\n        else\r\n          li: a(href='.\u002Fsupport.html') Support Us\r\n        li: a(href='.\u002Fresources.html') Tools and Resources\r\n        li: a(href='.\u002Fterms.html') Terms and Privacy Policy\r\n  .foot-end\r\n    p &copy;2019 Troop 151\r\n","app\u002Fassets\u002Fpartials\u002F_foxycart.html":"\u003C!-- FOXYCART --\u003E\n\u003Cscript data-cfasync=\"false\" src=\"https:\u002F\u002Fcdn.foxycart.com\u002Ft151\u002Floader.js\" async defer\u003E\u003C\u002Fscript\u003E\n\u003C!-- \u002FFOXYCART --\u003E\n","app\u002Fassets\u002Fpartials\u002F_leaders.pug":"+leader('Chris Pilko', 'Scoutmaster', 'chrisp.jpg')\n+leader('Ben Mitchell', 'Chartered Organization Representative', '')\n+leader('Cara Curley', 'Committee Chair', '')\n+leader('Brendan Curley', 'Committee Member', '')\n+leader('Dan McGinn', 'Committee Member', '')\n+leader('Mike Pilko', 'Treasurer', '')\n+leader('Mo Sharon', 'Committee Member', '')\n+leader('Mike Shultz', 'Committee Member', '')\n+leader('Lee Stratton', 'Committee Member', '')\n+leader('Lee Zeplowitz', 'Committee Member', '')","app\u002Fassets\u002Fpartials\u002F_eagles.pug":"+eagle('Richard Creadick', '1941')\n+eagle('Howard Young', '1953')\n+eagle('David Armstrong', '1955')\n+eagle('Ralph Morgan', '1955')\n+eagle('Donald Senges', '1955')\n+eagle('Ronald Mendelzon', '1956')\n+eagle('Paul Davis, Jr.', '1957')\n+eagle('Wesley Bowers', '1964')\n+eagle('John Paxton, Jr.', '1964')\n+eagle('Gary Callahan', '1964')\n+eagle('Carl Roe, Jr.', '1965')\n+eagle('Robert T. Badders', '1966')\n+eagle('John Mellon III', '1966')\n+eagle('Robert D. Lake', '1967')\n+eagle('Robert E. Paxton', '1967')\n+eagle('G. Clinthicum, Jr.', '1968')\n+eagle('E. Allan Roe', '1965')\n+eagle('Kirk Drange', '1969')\n+eagle('David B. Fitzgerald', '1970')\n+eagle('Lee W. Diestelow, Jr.', '1970')\n+eagle('David P. Paist', '1970')\n+eagle('William S. Reamer', '1970')\n+eagle('William M. Reed, Jr.', '1972')\n+eagle('Thomas P. Gorham', '1973')\n+eagle('Fredrick L. Null, Jr.', '1973')\n+eagle('Thomas S. Morris', '1973')\n+eagle('Jonathan H. Fitzgerald', '1974')\n+eagle('Robert R. Gerisch', '1974')\n+eagle('Michael A. Lipton', '1977')\n+eagle('Christopher M. Peraino', '1983')\n+eagle('Greg Cluver', '1991')\n+eagle('Matthew W. Bayley', '1982')\n+eagle('John H. Walter', '2013')\n+eagle('Jake Maguire', '2014')\n+eagle('Matthew Walter', '2015')\n+eagle('Nicholas Marcellino', '2016')\n+eagle('Joseph Fino', '2016')\n+eagle('Sean Summerfield', '2016')\n"};
;var locals_for_with = (locals || {});(function (pageFile, scripts) {;pug_debug_line = 1;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_mixins["linkbutton"] = pug_interp = function(link, text){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 2;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cdiv class=\"more-div\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cspan class=\"more-wrap\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Ca" + (" class=\"more-button\""+pug.attr("href", link, true, true)) + "\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
};
;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";


















;pug_debug_line = 14;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_mixins["leader"] = pug_interp = function(name, title, profileImage){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 15;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cdiv class=\"leader-gallery\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
if (profileImage) {
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cimg" + (pug.attr("src", './img/leaders/'+profileImage, true, true)) + "\u003E";
}
else {
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cimg src=\".\u002Fimg\u002Fleaders\u002Fno-photo.png\"\u003E";
}
;pug_debug_line = 20;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cp class=\"leader_name\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + (pug.escape(null == (pug_interp = name) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
;pug_debug_line = 21;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cp class=\"leader_title\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + (pug.escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
};
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_mixins["eagle"] = pug_interp = function(name, year){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 24;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cdiv class=\"eagle-gallery\"\u003E";
;pug_debug_line = 25;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cdiv class=\"eagle-logo\"\u003E";
;pug_debug_line = 26;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cimg src=\".\u002Fimg\u002Feagle_badge.gif\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 27;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cdiv class=\"eagle-data\"\u003E";
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cp class=\"eagle-name\"\u003E";
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + (pug.escape(null == (pug_interp = name) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
;pug_debug_line = 29;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cp class=\"eagle-year\"\u003E";
;pug_debug_line = 29;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + (pug.escape(null == (pug_interp = year) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
};
;pug_debug_line = 31;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";






















































































;pug_debug_line = 3;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
var pageTitle = 'About'
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
var pageDesc = 'About Troop 151'
;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
var mastheadImg ='masthead_about.jpg'
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
if (mastheadImg) {
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
var mastheadImgUrl = './img/mastheads/' + mastheadImg
}
else {
;pug_debug_line = 12;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
var mastheadImgUrl = './img/mastheads/masthead_img.jpg'
}
;pug_debug_line = 14;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003C!DOCTYPE html\u003E";
;pug_debug_line = 15;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Chtml prefix=\"og: http:\u002F\u002Fogp.me\u002Fns#\" lang=\"en\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Chead\u003E";
;pug_debug_line = 1;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta charset=\"utf-8\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta" + (" name=\"description\""+pug.attr("content", pageDesc, true, true)) + "\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta name=\"author\" content=\"Troop 151 Broomall, PA\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta" + (" property=\"og:title\""+pug.attr("content", pageTitle, true, true)) + "\u003E";
;pug_debug_line = 8;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta" + (" property=\"og:description\""+pug.attr("content", pageDesc, true, true)) + "\u003E";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta property=\"og:type\" content=\"website\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta" + (" property=\"og:url\""+pug.attr("content", "https://t151.org/" + pageFile + '.html', true, true)) + "\u003E";
;pug_debug_line = 11;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta" + (" property=\"og:image\""+pug.attr("content", mastheadImgUrl, true, true)) + "\u003E";
;pug_debug_line = 12;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta property=\"og:image:width\" content=\"3264\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta property=\"og:image:height\" content=\"2448\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Clink rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"\u002Fimg\u002Ffavicon\u002Fapple-touch-icon.png\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Clink rel=\"icon\" type=\"image\u002Fpng\" sizes=\"32x32\" href=\"\u002Fimg\u002Ffavicon\u002Ffavicon-32x32.png\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Clink rel=\"icon\" type=\"image\u002Fpng\" sizes=\"16x16\" href=\"\u002Fimg\u002Ffavicon\u002Ffavicon-16x16.png\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Clink rel=\"manifest\" href=\"\u002Fimg\u002Ffavicon\u002Fsite.webmanifest\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Clink rel=\"mask-icon\" href=\"\u002Fimg\u002Ffavicon\u002Fsafari-pinned-tab.svg\" color=\"#5bbad5\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Cmeta name=\"apple-mobile-web-app-title\" content=\"Troop 151\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Cmeta name=\"application-name\" content=\"Troop 151\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Cmeta name=\"msapplication-TileColor\" content=\"#da532c\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Cmeta name=\"theme-color\" content=\"#da532c\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Clink href=\"app.css\" rel=\"stylesheet\" type=\"text\u002Fcss\"\u003E\u003C\u002Fhead\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cbody\u003E";
;pug_debug_line = 20;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cdiv id=\"main\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cheader\u003E";
;pug_debug_line = 1;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Cnav id=\"top_nav\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 2;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "Troop 151\u003C\u002Fh1\u003E";
;pug_debug_line = 3;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Cul\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Findex.html\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "&#127968;\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Ca href=\"#footer\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "&#x2630;\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fnav\u003E";
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Csection" + (" id=\"masthead\""+pug.attr("style", pug.style('background: no-repeat center/cover url('+mastheadImgUrl+')'), true, true)) + "\u003E";
;pug_debug_line = 24;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cdiv class=\"masthead-content\"\u003E";
;pug_debug_line = 25;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "About Troop 151\u003C\u002Fh1\u003E\u003C\u002Fdiv\u003E\u003C\u002Fsection\u003E\u003C\u002Fheader\u003E";
;pug_debug_line = 30;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cdiv id=\"content\"\u003E";
;pug_debug_line = 31;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
;pug_debug_line = 12;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "\u003Carticle id=\"mission\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "\u003Cheading\u003E";
;pug_debug_line = 14;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 14;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "Mission\u003C\u002Fh1\u003E\u003C\u002Fheading\u003E\u003C\u002Farticle\u003E";
;pug_debug_line = 16;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "\u003Carticle id=\"values\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "\u003Cheading\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "Values\u003C\u002Fh1\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "\u003Ch2\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "Our values are the Scout Oath and Law\u003C\u002Fh2\u003E\u003C\u002Fheading\u003E";
;pug_debug_line = 20;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-wrap\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "\u003Cdiv class=\"values-col\"\u003E";
;pug_debug_line = 22;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "\u003Cdl\u003E";
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "\u003Cdt\u003E";
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "The Scout Law\u003C\u002Fdt\u003E";
;pug_debug_line = 24;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "\u003Cdd\u003E";
;pug_debug_line = 24;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "A Scout is:\u003C\u002Fdd\u003E";
;pug_debug_line = 25;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "\u003Cdd\u003E";
;pug_debug_line = 25;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "Trustworthy, Loyal, Helpful,\u003C\u002Fdd\u003E";
;pug_debug_line = 26;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "\u003Cdd\u003E";
;pug_debug_line = 26;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "Friendly, Corteous, Kind,\u003C\u002Fdd\u003E";
;pug_debug_line = 27;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "\u003Cdd\u003E";
;pug_debug_line = 27;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "Obedient, Cheerful, Thrifty,\u003C\u002Fdd\u003E";
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "\u003Cdd\u003E";
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "Brave, Clean, and Reverent\u003C\u002Fdd\u003E\u003C\u002Fdl\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 29;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "\u003Cdiv class=\"values-col\"\u003E";
;pug_debug_line = 30;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "\u003Cdl\u003E";
;pug_debug_line = 31;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "\u003Cdt\u003E";
;pug_debug_line = 31;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "The Scout Oath\u003C\u002Fdt\u003E";
;pug_debug_line = 32;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "\u003Cdd\u003E";
;pug_debug_line = 32;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "On my honor I will do my best to do my duty\u003C\u002Fdd\u003E";
;pug_debug_line = 33;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "\u003Cdd\u003E";
;pug_debug_line = 33;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "to God and my country\u003C\u002Fdd\u003E";
;pug_debug_line = 34;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "\u003Cdd\u003E";
;pug_debug_line = 34;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "and to obey the Scout Law;\u003C\u002Fdd\u003E";
;pug_debug_line = 35;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "\u003Cdd\u003E";
;pug_debug_line = 35;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "to help other people at all times;\u003C\u002Fdd\u003E";
;pug_debug_line = 36;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "\u003Cdd\u003E";
;pug_debug_line = 36;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "to keep myself physically strong,\u003C\u002Fdd\u003E";
;pug_debug_line = 37;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "\u003Cdd\u003E";
;pug_debug_line = 37;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "mentally awake,\u003C\u002Fdd\u003E";
;pug_debug_line = 38;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "\u003Cdd\u003E";
;pug_debug_line = 38;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "and morally straight.\u003C\u002Fdd\u003E\u003C\u002Fdl\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Farticle\u003E";
;pug_debug_line = 39;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "\u003Carticle id=\"history\"\u003E";
;pug_debug_line = 40;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "\u003Cheading\u003E";
;pug_debug_line = 41;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 41;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "History\u003C\u002Fh1\u003E\u003C\u002Fheading\u003E\u003C\u002Farticle\u003E";
;pug_debug_line = 42;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "\u003Carticle id=\"leadership\"\u003E";
;pug_debug_line = 43;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "\u003Cheading\u003E";
;pug_debug_line = 44;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 44;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "Leadership\u003C\u002Fh1\u003E\u003C\u002Fheading\u003E";
;pug_debug_line = 45;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-wrap\"\u003E";
;pug_debug_line = 1;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_leaders.pug";
pug_mixins["leader"]('Chris Pilko', 'Scoutmaster', 'chrisp.jpg');
;pug_debug_line = 2;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_leaders.pug";
pug_mixins["leader"]('Ben Mitchell', 'Chartered Organization Representative', '');
;pug_debug_line = 3;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_leaders.pug";
pug_mixins["leader"]('Cara Curley', 'Committee Chair', '');
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_leaders.pug";
pug_mixins["leader"]('Brendan Curley', 'Committee Member', '');
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_leaders.pug";
pug_mixins["leader"]('Dan McGinn', 'Committee Member', '');
;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_leaders.pug";
pug_mixins["leader"]('Mike Pilko', 'Treasurer', '');
;pug_debug_line = 7;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_leaders.pug";
pug_mixins["leader"]('Mo Sharon', 'Committee Member', '');
;pug_debug_line = 8;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_leaders.pug";
pug_mixins["leader"]('Mike Shultz', 'Committee Member', '');
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_leaders.pug";
pug_mixins["leader"]('Lee Stratton', 'Committee Member', '');
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_leaders.pug";
pug_mixins["leader"]('Lee Zeplowitz', 'Committee Member', '');
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 47;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_mixins["linkbutton"]('resources.html#training', 'Become a Leader');
pug_html = pug_html + "\u003C\u002Farticle\u003E";
;pug_debug_line = 48;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "\u003Carticle id=\"eagles\"\u003E";
;pug_debug_line = 49;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "\u003Cheading\u003E";
;pug_debug_line = 50;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 50;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "Eagles Nest\u003C\u002Fh1\u003E";
;pug_debug_line = 51;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 52;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "The rank of Eagle, the highest rank in Scouting, is a badge of honor. It is symbolic of";
;pug_debug_line = 53;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 53;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "the years of hard work these Scouts performed learning leadership, outdoor skills, and";
;pug_debug_line = 54;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 54;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "dedicating themselves to service. We are proud of all of our Eagles.\u003C\u002Fp\u003E";
;pug_debug_line = 55;pug_debug_filename = "app\u002Fassets\u002Fabout.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-wrap\"\u003E";
;pug_debug_line = 1;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_eagles.pug";
pug_mixins["eagle"]('Richard Creadick', '1941');
;pug_debug_line = 2;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_eagles.pug";
pug_mixins["eagle"]('Howard Young', '1953');
;pug_debug_line = 3;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_eagles.pug";
pug_mixins["eagle"]('David Armstrong', '1955');
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_eagles.pug";
pug_mixins["eagle"]('Ralph Morgan', '1955');
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_eagles.pug";
pug_mixins["eagle"]('Donald Senges', '1955');
;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_eagles.pug";
pug_mixins["eagle"]('Ronald Mendelzon', '1956');
;pug_debug_line = 7;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_eagles.pug";
pug_mixins["eagle"]('Paul Davis, Jr.', '1957');
;pug_debug_line = 8;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_eagles.pug";
pug_mixins["eagle"]('Wesley Bowers', '1964');
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_eagles.pug";
pug_mixins["eagle"]('John Paxton, Jr.', '1964');
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_eagles.pug";
pug_mixins["eagle"]('Gary Callahan', '1964');
;pug_debug_line = 11;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_eagles.pug";
pug_mixins["eagle"]('Carl Roe, Jr.', '1965');
;pug_debug_line = 12;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_eagles.pug";
pug_mixins["eagle"]('Robert T. Badders', '1966');
;pug_debug_line = 13;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_eagles.pug";
pug_mixins["eagle"]('John Mellon III', '1966');
;pug_debug_line = 14;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_eagles.pug";
pug_mixins["eagle"]('Robert D. Lake', '1967');
;pug_debug_line = 15;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_eagles.pug";
pug_mixins["eagle"]('Robert E. Paxton', '1967');
;pug_debug_line = 16;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_eagles.pug";
pug_mixins["eagle"]('G. Clinthicum, Jr.', '1968');
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_eagles.pug";
pug_mixins["eagle"]('E. Allan Roe', '1965');
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_eagles.pug";
pug_mixins["eagle"]('Kirk Drange', '1969');
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_eagles.pug";
pug_mixins["eagle"]('David B. Fitzgerald', '1970');
;pug_debug_line = 20;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_eagles.pug";
pug_mixins["eagle"]('Lee W. Diestelow, Jr.', '1970');
;pug_debug_line = 21;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_eagles.pug";
pug_mixins["eagle"]('David P. Paist', '1970');
;pug_debug_line = 22;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_eagles.pug";
pug_mixins["eagle"]('William S. Reamer', '1970');
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_eagles.pug";
pug_mixins["eagle"]('William M. Reed, Jr.', '1972');
;pug_debug_line = 24;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_eagles.pug";
pug_mixins["eagle"]('Thomas P. Gorham', '1973');
;pug_debug_line = 25;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_eagles.pug";
pug_mixins["eagle"]('Fredrick L. Null, Jr.', '1973');
;pug_debug_line = 26;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_eagles.pug";
pug_mixins["eagle"]('Thomas S. Morris', '1973');
;pug_debug_line = 27;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_eagles.pug";
pug_mixins["eagle"]('Jonathan H. Fitzgerald', '1974');
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_eagles.pug";
pug_mixins["eagle"]('Robert R. Gerisch', '1974');
;pug_debug_line = 29;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_eagles.pug";
pug_mixins["eagle"]('Michael A. Lipton', '1977');
;pug_debug_line = 30;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_eagles.pug";
pug_mixins["eagle"]('Christopher M. Peraino', '1983');
;pug_debug_line = 31;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_eagles.pug";
pug_mixins["eagle"]('Greg Cluver', '1991');
;pug_debug_line = 32;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_eagles.pug";
pug_mixins["eagle"]('Matthew W. Bayley', '1982');
;pug_debug_line = 33;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_eagles.pug";
pug_mixins["eagle"]('John H. Walter', '2013');
;pug_debug_line = 34;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_eagles.pug";
pug_mixins["eagle"]('Jake Maguire', '2014');
;pug_debug_line = 35;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_eagles.pug";
pug_mixins["eagle"]('Matthew Walter', '2015');
;pug_debug_line = 36;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_eagles.pug";
pug_mixins["eagle"]('Nicholas Marcellino', '2016');
;pug_debug_line = 37;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_eagles.pug";
pug_mixins["eagle"]('Joseph Fino', '2016');
;pug_debug_line = 38;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_eagles.pug";
pug_mixins["eagle"]('Sean Summerfield', '2016');
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fheading\u003E\u003C\u002Farticle\u003E";
;pug_debug_line = 32;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Carticle id=\"contact\"\u003E";
;pug_debug_line = 33;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cheader\u003E";
;pug_debug_line = 34;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 34;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "Contact Us\u003C\u002Fh1\u003E\u003C\u002Fheader\u003E";
;pug_debug_line = 35;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cdiv id=\"contact-form\"\u003E";
;pug_debug_line = 1;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cform action=\"https:\u002F\u002Fapp.99inbound.com\u002Fapi\u002Fe\u002FqnSf2KrH\" method=\"POST\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-wrap\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"formcol\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"form\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Clabel for=\"name\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "Name:\u003C\u002Flabel\u003E";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cinput type=\"text\" name=\"name\" id=\"name\" placeholder=\"Joe Smith\" required autocomplete=\"name\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"form\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Clabel for=\"__replyto\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "Email:\u003C\u002Flabel\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cinput type=\"email\" name=\"__replyto\" id=\"__replyto\" placeholder=\"jsmith@example.com\" required autocomplete=\"email\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 27;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"form\"\u003E";
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Clabel for=\"phone\"\u003E";
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "Phone:\u003C\u002Flabel\u003E";
;pug_debug_line = 29;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cinput type=\"tel\" name=\"phone\" id=\"phone\" placeholder=\"610-555-1212\" autocomplete=\"tel\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 36;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"formcol\"\u003E";
;pug_debug_line = 37;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"form\"\u003E";
;pug_debug_line = 38;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Clabel for=\"message\"\u003E";
;pug_debug_line = 38;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "Message:\u003C\u002Flabel\u003E";
;pug_debug_line = 39;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Ctextarea name=\"message\" id=\"message\" placeholder=\"Your message here\" minlength=\"20\" rows=\"6\" cols=\"20\"\u003E\u003C\u002Ftextarea\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 47;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cinput type=\"hidden\" name=\"__redirect\" id=\"__redirect\" value=\"\"\u003E";
;pug_debug_line = 53;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cinput type=\"hidden\" name=\"__subject\" id=\"__subject\" value=\"Troop 151 Website Contact\"\u003E";
;pug_debug_line = 59;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv style=\"position: absolute; left: -5000px;\"\u003E\n\u003Cinput type=\"checkbox\" name=\"conservative_cornflower_blue_matte_headphones\" value=\"1\" tabindex=\"-1\" autocomplete=\"no\"\u003E\n\u003C\u002Fdiv\u003E";
;pug_debug_line = 62;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cinput type=\"submit\" id=\"form_submit\" value=\"Send Message\"\u003E\u003C\u002Fform\u003E";
;pug_debug_line = 67;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cscript\u003E";
;pug_debug_line = 68;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "var r = document.getElementById('__redirect')";
;pug_debug_line = 69;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 69;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "var s = window.location.href";
;pug_debug_line = 70;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 70;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "if (s.indexOf('.html') !== -1 ) {";
;pug_debug_line = 71;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 71;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "  var re = \u002F(.+\\\u002F)(.+\\.html?$)\u002Fi";
;pug_debug_line = 72;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 72;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "  r.value = s.replace(re, '$1') + 'thankyou.html'";
;pug_debug_line = 73;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 73;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "} else {";
;pug_debug_line = 74;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 74;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "  r.value = s + 'thankyou.html'";
;pug_debug_line = 75;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 75;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "}\u003C\u002Fscript\u003E\u003C\u002Fdiv\u003E\u003C\u002Farticle\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 1;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
var now = new Date()
;pug_debug_line = 2;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
var expires = new Date('2019-11-17T23:59:00')
;pug_debug_line = 3;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cfooter id=\"footer\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-wrap\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-thirds\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cimg class=\"foot-img\" src=\".\u002Fimg\u002F151-patch.png\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca class=\"join-button\" href=\"https:\u002F\u002Fmy.bsa.us\u002F525taa0151mb\" target=\"_blank\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Join Now\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 8;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-thirds\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Troop 151, BSA\u003C\u002Fh4\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\"http:\u002F\u002Fcubpack151.org\u002F\" target=\"_blank\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Pack 151\u003C\u002Fa\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 11;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 11;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Crew 151\u003C\u002Fp\u003E";
;pug_debug_line = 12;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 12;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Chartered To\u003C\u002Fh4\u003E";
;pug_debug_line = 13;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 13;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\"http:\u002F\u002Fmarplepres.org\u002F\" target=\"_blank\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Marple Presbyterian Church\u003C\u002Fa\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 14;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 14;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "150 North Sproul Road\u003C\u002Fp\u003E";
;pug_debug_line = 15;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 15;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Broomall, PA 19008\u003C\u002Fp\u003E";
;pug_debug_line = 16;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 16;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Affiliated With\u003C\u002Fh4\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\"http:\u002F\u002Fcolbsa.org\u002Fconstellation\u002F\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Constellation District\u003C\u002Fa\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\"http:\u002F\u002Fcolbsa.org\u002F\" target=\"_blank\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Cradle of Liberty Council\u003C\u002Fa\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\"http:\u002F\u002Fscouting.org\u002F\" target=\"_blank\"\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Boy Scouts of America\u003C\u002Fa\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 20;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-thirds\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 21;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Site Map\u003C\u002Fh4\u003E";
;pug_debug_line = 22;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cul class=\"foot-nav\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Findex.html\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Home\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 24;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 24;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Fabout.html\"\u003E";
;pug_debug_line = 24;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "About Us\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 25;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
if (now <= expires) {
;pug_debug_line = 26;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 26;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Fpoinsettias.html\"\u003E";
;pug_debug_line = 26;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Support Us\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
}
else {
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Fsupport.html\"\u003E";
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Support Us\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
}
;pug_debug_line = 29;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 29;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Fresources.html\"\u003E";
;pug_debug_line = 29;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Tools and Resources\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 30;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 30;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Fterms.html\"\u003E";
;pug_debug_line = 30;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Terms and Privacy Policy\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 31;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cdiv class=\"foot-end\"\u003E";
;pug_debug_line = 32;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 32;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "&copy;2019 Troop 151\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Ffooter\u003E";
;pug_debug_line = 40;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
if (scripts == 'foxycart') {
pug_html = pug_html + "\u003C!-- FOXYCART --\u003E\n\u003Cscript data-cfasync=\"false\" src=\"https:\u002F\u002Fcdn.foxycart.com\u002Ft151\u002Floader.js\" async defer\u003E\u003C\u002Fscript\u003E\n\u003C!-- \u002FFOXYCART --\u003E\n";
}
pug_html = pug_html + "\u003C\u002Fbody\u003E\u003C\u002Fhtml\u003E";}.call(this,"pageFile" in locals_for_with?locals_for_with.pageFile:typeof pageFile!=="undefined"?pageFile:undefined,"scripts" in locals_for_with?locals_for_with.scripts:typeof scripts!=="undefined"?scripts:undefined));} catch (err) {pug.rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;};
module.exports = template;
});

;require.register("assets/index.pug", function(exports, require, module) {
function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"app\u002Fassets\u002Findex.pug":"extends partials\u002F_layout\r\n\r\nblock vars\r\n  -var pageFile = 'index'\r\n  -var pageTitle = 'Home'\r\n  -var pageDesc = 'Troop 151, Broomall PA'\r\n  -var mastheadImg ='HSR_gateway.jpg'\r\n\r\nblock masthead\r\n      h1 Troop 151, Broomall PA\r\n      p A Scout-Led Troop\r\n      p Chartered to Marple Presbyterian Church\r\n\r\nblock content\r\n  article#about\r\n    header\r\n      h1 About Us\r\n    .col-wrap\r\n      #meetings.col-thirds\r\n        img(src='.\u002Fimg\u002Fcitizenship_in_the_community_lg.png')\r\n        p.\r\n          We meet at 7pm on Wednesdays during the school year in Fellowship Hall at Marple Presbyterian Church\r\n          (#[a(href='https:\u002F\u002Fwww.google.com\u002Fmaps\u002Fplace\u002FMarple+Presbyterian+Church\u002F@39.9850625,-75.3606328,17z\u002Fdata=!4m5!3m4!1s0x89c6ea8a1e73155f:0xd1515550b1534517!8m2!3d39.9850625!4d-75.3584441', target='_blank') Map])\r\n      #outings.col-thirds\r\n        img(src='.\u002Fimg\u002Fcamping_lg.png')\r\n        p.\r\n          Each month our goal is to have two outings: One campout and one other event.\r\n      #scoutled.col-thirds\r\n        img(src='.\u002Fimg\u002Fhiking_lg.png')\r\n        p We are Scout-Led: Our Scouts develop our program, and our adult leaders help #[em them] make it happen.\r\n    +linkbutton('about.html', 'Learn More')\r\n\r\n  article#events\r\n    header\r\n      h1 What We Do\r\n    .col-wrap\r\n      include partials\u002F_sample_events.pug\r\n    p.events-foot.\r\n      All quotes by Lord Baden-Powell, the founder of Scouting\r\n\r\n  \u002F\u002F-\r\n    article#support\r\n      header\r\n        h1 Support Us\r\n      p TODO: Build a Fundraising Widget.\r\n","app\u002Fassets\u002Fpartials\u002F_layout.pug":"include _mixins.pug\r\n\r\nblock vars\r\n  -var pageTitle = 'Layout'\r\n  -var pageDesc = 'Description of this page'\r\n  -var pageFile = 'index'\r\n  -var scripts = ''\r\n\r\nif mastheadImg\r\n  -var mastheadImgUrl = '.\u002Fimg\u002Fmastheads\u002F' + mastheadImg\r\nelse\r\n  -var mastheadImgUrl = '.\u002Fimg\u002Fmastheads\u002Fmasthead_img.jpg'\r\n\r\ndoctype html\r\nhtml(prefix='og: http:\u002F\u002Fogp.me\u002Fns#', lang='en')\r\n  head\r\n    include _head.pug\r\n\r\n  body\r\n    #main\r\n      header\r\n        include _top_nav.pug\r\n        section#masthead(style='background: no-repeat center\u002Fcover url('+mastheadImgUrl+')')\r\n          .masthead-content\r\n            block masthead\r\n              h1 Troop 151, Broomall PA\r\n              p A Scout-Led Troop\r\n              p Chartered to Marple Presbyterian Church\r\n\r\n      #content\r\n        block content\r\n        article#contact\r\n          header\r\n            h1 Contact Us\r\n          #contact-form\r\n            include _contact.pug\r\n\r\n    include _foot.pug\r\n\r\n    if scripts == 'foxycart'\r\n      include _foxycart.html\r\n","app\u002Fassets\u002Fpartials\u002F_mixins.pug":"mixin linkbutton(link, text)\n  .more-div\n    span.more-wrap\n      a(href=link, class='more-button')= text\n\nmixin eventItem(title, eventImage)\n  .event-gallery\n    img(src='.\u002Fimg\u002Fevents\u002F'+eventImage)\n    .background-shade\n      .event-desc\n        h4= title\n        block\n\nmixin leader(name, title, profileImage)\n  .leader-gallery\n    if profileImage\n      img(src='.\u002Fimg\u002Fleaders\u002F'+profileImage)\n    else\n      img(src='.\u002Fimg\u002Fleaders\u002Fno-photo.png')\n    p.leader_name= name\n    p.leader_title= title\n\nmixin eagle(name, year)\n  .eagle-gallery\n    .eagle-logo\n      img(src='.\u002Fimg\u002Feagle_badge.gif')\n    .eagle-data\n      p.eagle-name= name\n      p.eagle-year= year\n      \nmixin foxyitem(name, price, image, code, option_name, ...options)\n  .item-card(id= code)\n    .item-card-info\n      .item-image\n        img(src=image)\n      .item-data\n        .item-data-head\n          p.item-name= name\n          p.item-price= '$' + price.toFixed(2)\n        .item-description\n          if block\n            block\n        .item-form\n          form(action='https:\u002F\u002Ft151.foxycart.com\u002Fcart', method='post', accept-charset='utf-8' id= code + '_form')\n            input(type='hidden', name='name', value= name)\n            input(type='hidden', name='price', value= price)\n            input(type='hidden', name='code', value= code)\n            input(type='hidden', name='category', value='Poinsettia_Sale')\n            -var date = new Date('2019-11-17T23:59:00')\n            input(type='hidden', name='expires', value= Math.floor(date.getTime()\u002F1000))\n            input(type='number', name='quantity' value=1, min=0)\n            if option_name\n              -var on = option_name.charAt(0).toUpperCase() + option_name.slice(1)\n              label.option_label= on\n              select(name= option_name)\n                each item in options\n                  -var it = item.charAt(0).toUpperCase()+item.slice(1)\n                  option(value= it +'{c+' + it.charAt(0) +'}') #{it}\n            input.submit(type='submit', value=`Add ${name} to Cart`)\n            ","app\u002Fassets\u002Fpartials\u002F_head.pug":"meta(charset='utf-8')\nmeta(http-equiv='X-UA-Compatible', content='IE=edge')\nmeta(name='description', content= pageDesc)\nmeta(name='author', content= \"Troop 151 Broomall, PA\")\nmeta(name=\"viewport\" content=\"width=device-width, initial-scale=1\")\n\nmeta(property=\"og:title\", content= pageTitle)\nmeta(property=\"og:description\", content= pageDesc)\nmeta(property=\"og:type\", content=\"website\")\nmeta(property=\"og:url\", content=\"https:\u002F\u002Ft151.org\u002F\" + pageFile + '.html' )\nmeta(property=\"og:image\", content= mastheadImgUrl)\nmeta(property=\"og:image:width\", content=\"3264\")\nmeta(property=\"og:image:height\", content=\"2448\")\n\ninclude _favicon.pug\n\nlink(href=\"app.css\", rel=\"stylesheet\", type=\"text\u002Fcss\")\n","app\u002Fassets\u002Fpartials\u002F_favicon.pug":"\u002F\u002F- Generated at https:\u002F\u002Frealfavicongenerator.net\u002F\r\nlink(rel=\"apple-touch-icon\", sizes=\"180x180\", href=\"\u002Fimg\u002Ffavicon\u002Fapple-touch-icon.png\")\r\nlink(rel=\"icon\", type=\"image\u002Fpng\", sizes=\"32x32\", href=\"\u002Fimg\u002Ffavicon\u002Ffavicon-32x32.png\")\r\nlink(rel=\"icon\", type=\"image\u002Fpng\", sizes=\"16x16\", href=\"\u002Fimg\u002Ffavicon\u002Ffavicon-16x16.png\")\r\nlink(rel=\"manifest\", href=\"\u002Fimg\u002Ffavicon\u002Fsite.webmanifest\")\r\nlink(rel=\"mask-icon\", href=\"\u002Fimg\u002Ffavicon\u002Fsafari-pinned-tab.svg\", color=\"#5bbad5\")\r\nmeta(name=\"apple-mobile-web-app-title\", content=\"Troop 151\")\r\nmeta(name=\"application-name\", content=\"Troop 151\")\r\nmeta(name=\"msapplication-TileColor\", content=\"#da532c\")\r\nmeta(name=\"theme-color\", content=\"#da532c\")\r\n","app\u002Fassets\u002Fpartials\u002F_top_nav.pug":"nav#top_nav\r\n  h1 Troop 151\r\n  ul\r\n    li: a(href='.\u002Findex.html') &#127968;\r\n    li: a(href='#footer') &#x2630;\r\n","app\u002Fassets\u002Fpartials\u002F_contact.pug":"form(\n  action='https:\u002F\u002Fapp.99inbound.com\u002Fapi\u002Fe\u002FqnSf2KrH'\n  method='POST'\n)\n  .col-wrap\n    .formcol\n      .form\n        label(for='name') Name:\n        input(\n          type='text'\n          name='name'\n          id='name'\n          placeholder='Joe Smith'\n          required\n          autocomplete='name'\n        )\n      .form\n        label(for='__replyto') Email:\n        input(\n          type='email'\n          name='__replyto'\n          id='__replyto'\n          placeholder='jsmith@example.com'\n          required\n          autocomplete='email'\n        )\n      .form\n        label(for='phone') Phone:\n        input(\n          type='tel'\n          name='phone'\n          id='phone'\n          placeholder='610-555-1212'\n          autocomplete='tel'\n        )\n    .formcol\n      .form\n        label(for='message') Message:\n        textarea(\n          name='message'\n          id='message'\n          placeholder='Your message here'\n          minlength=20\n          rows=6\n          cols=20\n        )\n  input(\n    type='hidden'\n    name='__redirect'\n    id='__redirect'\n    value=''\n  )\n  input(\n    type='hidden'\n    name='__subject'\n    id='__subject'\n    value='Troop 151 Website Contact'\n  )\n  \u003Cdiv style=\"position: absolute; left: -5000px;\"\u003E\n  \u003Cinput type=\"checkbox\" name=\"conservative_cornflower_blue_matte_headphones\" value=\"1\" tabindex=\"-1\" autocomplete=\"no\"\u003E\n  \u003C\u002Fdiv\u003E\n  input(\n    type='submit'\n    id='form_submit'\n    value='Send Message'\n  )\nscript.\n  var r = document.getElementById('__redirect')\n  var s = window.location.href\n  if (s.indexOf('.html') !== -1 ) {\n    var re = \u002F(.+\\\u002F)(.+\\.html?$)\u002Fi\n    r.value = s.replace(re, '$1') + 'thankyou.html'\n  } else {\n    r.value = s + 'thankyou.html'\n  }\n","app\u002Fassets\u002Fpartials\u002F_foot.pug":"-var now = new Date()\r\n-var expires = new Date('2019-11-17T23:59:00')\r\nfooter#footer\r\n  .col-wrap\r\n    .col-thirds\r\n      img(src='.\u002Fimg\u002F151-patch.png').foot-img\r\n      a(href='https:\u002F\u002Fmy.bsa.us\u002F525taa0151mb' target='_blank').join-button Join Now\r\n    .col-thirds\r\n      h4 Troop 151, BSA\r\n      p: a(href='http:\u002F\u002Fcubpack151.org\u002F' target='_blank') Pack 151\r\n      p Crew 151\r\n      h4 Chartered To\r\n      p: a(href='http:\u002F\u002Fmarplepres.org\u002F' target='_blank') Marple Presbyterian Church\r\n      p 150 North Sproul Road\r\n      p Broomall, PA 19008\r\n      h4 Affiliated With\r\n      p: a(href='http:\u002F\u002Fcolbsa.org\u002Fconstellation\u002F') Constellation District\r\n      p: a(href='http:\u002F\u002Fcolbsa.org\u002F' target='_blank') Cradle of Liberty Council\r\n      p: a(href='http:\u002F\u002Fscouting.org\u002F' target='_blank') Boy Scouts of America\r\n    .col-thirds\r\n      h4 Site Map\r\n      ul.foot-nav\r\n        li: a(href='.\u002Findex.html') Home\r\n        li: a(href='.\u002Fabout.html') About Us\r\n        if now \u003C= expires\r\n          li: a(href='.\u002Fpoinsettias.html') Support Us\r\n        else\r\n          li: a(href='.\u002Fsupport.html') Support Us\r\n        li: a(href='.\u002Fresources.html') Tools and Resources\r\n        li: a(href='.\u002Fterms.html') Terms and Privacy Policy\r\n  .foot-end\r\n    p &copy;2019 Troop 151\r\n","app\u002Fassets\u002Fpartials\u002F_foxycart.html":"\u003C!-- FOXYCART --\u003E\n\u003Cscript data-cfasync=\"false\" src=\"https:\u002F\u002Fcdn.foxycart.com\u002Ft151\u002Floader.js\" async defer\u003E\u003C\u002Fscript\u003E\n\u003C!-- \u002FFOXYCART --\u003E\n","app\u002Fassets\u002Fpartials\u002F_sample_events.pug":"+eventItem('Camping', 'camping.jpg')\n  p We are not a club or a Sunday school class, but a school of the woods.\n+eventItem('Community Involvement', 'civics.jpg')\n  p We must change boys from a &lsquo;what can I get&rsquo; to a &lsquo;what can I give&rsquo; attitude.\n+eventItem('Marksmanship', 'marksman.jpg')\n  p The Scout is not governed by #[strong don’t], but is led by #[strong do].\n+eventItem('STEM', 'stem.jpg')\n  p A fisherman does not bait his hook with food he likes. He uses food the fish likes. So with Scouts.\n+eventItem('Service', 'service.jpg')\n  p The real way to gain happiness is to give it to others.\n+eventItem('Patriotism', 'parade_marching.jpg')\n  p Loyalty is a feature in a boy’s character that inspires boundless hope.\n+eventItem('Winning', 'winning.jpg')\n  p It is important to arrange games and competition so that all Scouts of the troop take part.\n+eventItem('Learning', 'learning.jpg')\n  p In Scouting, a Scout is encouraged to educate himself instead of being instructed.\n+eventItem('Hiking', 'hiking.jpg')\n  p Where is there a boy to whom the call of the wild and the open road does not appeal?\n+eventItem('Summer Camp', 'summer_camp.jpg')\n  p A week of camp life is worth six months of theoretical teaching in the meeting room.\n+eventItem('Fun and Games', 'gaga.jpg')\n  p Vigorous Scout games are the best form of physical education because most of them bring in moral education.\n+eventItem('First Aid', 'first_aid.jpg')\n  p The most important object in Boy Scout training is to educate, not instruct\n"};
;var locals_for_with = (locals || {});(function (scripts) {;pug_debug_line = 1;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_mixins["linkbutton"] = pug_interp = function(link, text){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 2;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cdiv class=\"more-div\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cspan class=\"more-wrap\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Ca" + (" class=\"more-button\""+pug.attr("href", link, true, true)) + "\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
};
;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_mixins["eventItem"] = pug_interp = function(title, eventImage){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 7;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cdiv class=\"event-gallery\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cimg" + (pug.attr("src", './img/events/'+eventImage, true, true)) + "\u003E";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cdiv class=\"background-shade\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cdiv class=\"event-desc\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 11;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + (pug.escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002Fh4\u003E";
;pug_debug_line = 12;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
block && block();
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
};
;pug_debug_line = 14;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";






















;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";



















;pug_debug_line = 31;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";






















































































;pug_debug_line = 3;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Findex.pug";
var pageFile = 'index'
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Findex.pug";
var pageTitle = 'Home'
;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Findex.pug";
var pageDesc = 'Troop 151, Broomall PA'
;pug_debug_line = 7;pug_debug_filename = "app\u002Fassets\u002Findex.pug";
var mastheadImg ='HSR_gateway.jpg'
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
if (mastheadImg) {
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
var mastheadImgUrl = './img/mastheads/' + mastheadImg
}
else {
;pug_debug_line = 12;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
var mastheadImgUrl = './img/mastheads/masthead_img.jpg'
}
;pug_debug_line = 14;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003C!DOCTYPE html\u003E";
;pug_debug_line = 15;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Chtml prefix=\"og: http:\u002F\u002Fogp.me\u002Fns#\" lang=\"en\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Chead\u003E";
;pug_debug_line = 1;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta charset=\"utf-8\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta" + (" name=\"description\""+pug.attr("content", pageDesc, true, true)) + "\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta name=\"author\" content=\"Troop 151 Broomall, PA\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta" + (" property=\"og:title\""+pug.attr("content", pageTitle, true, true)) + "\u003E";
;pug_debug_line = 8;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta" + (" property=\"og:description\""+pug.attr("content", pageDesc, true, true)) + "\u003E";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta property=\"og:type\" content=\"website\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta" + (" property=\"og:url\""+pug.attr("content", "https://t151.org/" + pageFile + '.html', true, true)) + "\u003E";
;pug_debug_line = 11;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta" + (" property=\"og:image\""+pug.attr("content", mastheadImgUrl, true, true)) + "\u003E";
;pug_debug_line = 12;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta property=\"og:image:width\" content=\"3264\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta property=\"og:image:height\" content=\"2448\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Clink rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"\u002Fimg\u002Ffavicon\u002Fapple-touch-icon.png\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Clink rel=\"icon\" type=\"image\u002Fpng\" sizes=\"32x32\" href=\"\u002Fimg\u002Ffavicon\u002Ffavicon-32x32.png\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Clink rel=\"icon\" type=\"image\u002Fpng\" sizes=\"16x16\" href=\"\u002Fimg\u002Ffavicon\u002Ffavicon-16x16.png\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Clink rel=\"manifest\" href=\"\u002Fimg\u002Ffavicon\u002Fsite.webmanifest\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Clink rel=\"mask-icon\" href=\"\u002Fimg\u002Ffavicon\u002Fsafari-pinned-tab.svg\" color=\"#5bbad5\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Cmeta name=\"apple-mobile-web-app-title\" content=\"Troop 151\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Cmeta name=\"application-name\" content=\"Troop 151\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Cmeta name=\"msapplication-TileColor\" content=\"#da532c\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Cmeta name=\"theme-color\" content=\"#da532c\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Clink href=\"app.css\" rel=\"stylesheet\" type=\"text\u002Fcss\"\u003E\u003C\u002Fhead\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cbody\u003E";
;pug_debug_line = 20;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cdiv id=\"main\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cheader\u003E";
;pug_debug_line = 1;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Cnav id=\"top_nav\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 2;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "Troop 151\u003C\u002Fh1\u003E";
;pug_debug_line = 3;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Cul\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Findex.html\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "&#127968;\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Ca href=\"#footer\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "&#x2630;\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fnav\u003E";
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Csection" + (" id=\"masthead\""+pug.attr("style", pug.style('background: no-repeat center/cover url('+mastheadImgUrl+')'), true, true)) + "\u003E";
;pug_debug_line = 24;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cdiv class=\"masthead-content\"\u003E";
;pug_debug_line = 25;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Findex.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Findex.pug";
pug_html = pug_html + "Troop 151, Broomall PA\u003C\u002Fh1\u003E";
;pug_debug_line = 11;pug_debug_filename = "app\u002Fassets\u002Findex.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 11;pug_debug_filename = "app\u002Fassets\u002Findex.pug";
pug_html = pug_html + "A Scout-Led Troop\u003C\u002Fp\u003E";
;pug_debug_line = 12;pug_debug_filename = "app\u002Fassets\u002Findex.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 12;pug_debug_filename = "app\u002Fassets\u002Findex.pug";
pug_html = pug_html + "Chartered to Marple Presbyterian Church\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fsection\u003E\u003C\u002Fheader\u003E";
;pug_debug_line = 30;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cdiv id=\"content\"\u003E";
;pug_debug_line = 31;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
;pug_debug_line = 15;pug_debug_filename = "app\u002Fassets\u002Findex.pug";
pug_html = pug_html + "\u003Carticle id=\"about\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "app\u002Fassets\u002Findex.pug";
pug_html = pug_html + "\u003Cheader\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Findex.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Findex.pug";
pug_html = pug_html + "About Us\u003C\u002Fh1\u003E\u003C\u002Fheader\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-wrap\"\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-thirds\" id=\"meetings\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "app\u002Fassets\u002Findex.pug";
pug_html = pug_html + "\u003Cimg src=\".\u002Fimg\u002Fcitizenship_in_the_community_lg.png\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "app\u002Fassets\u002Findex.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 22;pug_debug_filename = "app\u002Fassets\u002Findex.pug";
pug_html = pug_html + "We meet at 7pm on Wednesdays during the school year in Fellowship Hall at Marple Presbyterian Church";
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Findex.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Findex.pug";
pug_html = pug_html + "(";
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Findex.pug";
pug_html = pug_html + "\u003Ca href=\"https:\u002F\u002Fwww.google.com\u002Fmaps\u002Fplace\u002FMarple+Presbyterian+Church\u002F@39.9850625,-75.3606328,17z\u002Fdata=!4m5!3m4!1s0x89c6ea8a1e73155f:0xd1515550b1534517!8m2!3d39.9850625!4d-75.3584441\" target=\"_blank\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Findex.pug";
pug_html = pug_html + "Map\u003C\u002Fa\u003E";
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Findex.pug";
pug_html = pug_html + ")\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 24;pug_debug_filename = "app\u002Fassets\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-thirds\" id=\"outings\"\u003E";
;pug_debug_line = 25;pug_debug_filename = "app\u002Fassets\u002Findex.pug";
pug_html = pug_html + "\u003Cimg src=\".\u002Fimg\u002Fcamping_lg.png\"\u003E";
;pug_debug_line = 26;pug_debug_filename = "app\u002Fassets\u002Findex.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 27;pug_debug_filename = "app\u002Fassets\u002Findex.pug";
pug_html = pug_html + "Each month our goal is to have two outings: One campout and one other event.\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-thirds\" id=\"scoutled\"\u003E";
;pug_debug_line = 29;pug_debug_filename = "app\u002Fassets\u002Findex.pug";
pug_html = pug_html + "\u003Cimg src=\".\u002Fimg\u002Fhiking_lg.png\"\u003E";
;pug_debug_line = 30;pug_debug_filename = "app\u002Fassets\u002Findex.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 30;pug_debug_filename = "app\u002Fassets\u002Findex.pug";
pug_html = pug_html + "We are Scout-Led: Our Scouts develop our program, and our adult leaders help ";
;pug_debug_line = 30;pug_debug_filename = "app\u002Fassets\u002Findex.pug";
pug_html = pug_html + "\u003Cem\u003E";
;pug_debug_line = 30;pug_debug_filename = "app\u002Fassets\u002Findex.pug";
pug_html = pug_html + "them\u003C\u002Fem\u003E";
;pug_debug_line = 30;pug_debug_filename = "app\u002Fassets\u002Findex.pug";
pug_html = pug_html + " make it happen.\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 31;pug_debug_filename = "app\u002Fassets\u002Findex.pug";
pug_mixins["linkbutton"]('about.html', 'Learn More');
pug_html = pug_html + "\u003C\u002Farticle\u003E";
;pug_debug_line = 33;pug_debug_filename = "app\u002Fassets\u002Findex.pug";
pug_html = pug_html + "\u003Carticle id=\"events\"\u003E";
;pug_debug_line = 34;pug_debug_filename = "app\u002Fassets\u002Findex.pug";
pug_html = pug_html + "\u003Cheader\u003E";
;pug_debug_line = 35;pug_debug_filename = "app\u002Fassets\u002Findex.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 35;pug_debug_filename = "app\u002Fassets\u002Findex.pug";
pug_html = pug_html + "What We Do\u003C\u002Fh1\u003E\u003C\u002Fheader\u003E";
;pug_debug_line = 36;pug_debug_filename = "app\u002Fassets\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-wrap\"\u003E";
;pug_debug_line = 1;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_sample_events.pug";
pug_mixins["eventItem"].call({
block: function(){
;pug_debug_line = 2;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_sample_events.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 2;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_sample_events.pug";
pug_html = pug_html + "We are not a club or a Sunday school class, but a school of the woods.\u003C\u002Fp\u003E";
}
}, 'Camping', 'camping.jpg');
;pug_debug_line = 3;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_sample_events.pug";
pug_mixins["eventItem"].call({
block: function(){
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_sample_events.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_sample_events.pug";
pug_html = pug_html + "We must change boys from a &lsquo;what can I get&rsquo; to a &lsquo;what can I give&rsquo; attitude.\u003C\u002Fp\u003E";
}
}, 'Community Involvement', 'civics.jpg');
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_sample_events.pug";
pug_mixins["eventItem"].call({
block: function(){
;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_sample_events.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_sample_events.pug";
pug_html = pug_html + "The Scout is not governed by ";
;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_sample_events.pug";
pug_html = pug_html + "\u003Cstrong\u003E";
;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_sample_events.pug";
pug_html = pug_html + "don’t\u003C\u002Fstrong\u003E";
;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_sample_events.pug";
pug_html = pug_html + ", but is led by ";
;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_sample_events.pug";
pug_html = pug_html + "\u003Cstrong\u003E";
;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_sample_events.pug";
pug_html = pug_html + "do\u003C\u002Fstrong\u003E";
;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_sample_events.pug";
pug_html = pug_html + ".\u003C\u002Fp\u003E";
}
}, 'Marksmanship', 'marksman.jpg');
;pug_debug_line = 7;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_sample_events.pug";
pug_mixins["eventItem"].call({
block: function(){
;pug_debug_line = 8;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_sample_events.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 8;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_sample_events.pug";
pug_html = pug_html + "A fisherman does not bait his hook with food he likes. He uses food the fish likes. So with Scouts.\u003C\u002Fp\u003E";
}
}, 'STEM', 'stem.jpg');
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_sample_events.pug";
pug_mixins["eventItem"].call({
block: function(){
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_sample_events.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_sample_events.pug";
pug_html = pug_html + "The real way to gain happiness is to give it to others.\u003C\u002Fp\u003E";
}
}, 'Service', 'service.jpg');
;pug_debug_line = 11;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_sample_events.pug";
pug_mixins["eventItem"].call({
block: function(){
;pug_debug_line = 12;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_sample_events.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 12;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_sample_events.pug";
pug_html = pug_html + "Loyalty is a feature in a boy’s character that inspires boundless hope.\u003C\u002Fp\u003E";
}
}, 'Patriotism', 'parade_marching.jpg');
;pug_debug_line = 13;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_sample_events.pug";
pug_mixins["eventItem"].call({
block: function(){
;pug_debug_line = 14;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_sample_events.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 14;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_sample_events.pug";
pug_html = pug_html + "It is important to arrange games and competition so that all Scouts of the troop take part.\u003C\u002Fp\u003E";
}
}, 'Winning', 'winning.jpg');
;pug_debug_line = 15;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_sample_events.pug";
pug_mixins["eventItem"].call({
block: function(){
;pug_debug_line = 16;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_sample_events.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 16;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_sample_events.pug";
pug_html = pug_html + "In Scouting, a Scout is encouraged to educate himself instead of being instructed.\u003C\u002Fp\u003E";
}
}, 'Learning', 'learning.jpg');
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_sample_events.pug";
pug_mixins["eventItem"].call({
block: function(){
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_sample_events.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_sample_events.pug";
pug_html = pug_html + "Where is there a boy to whom the call of the wild and the open road does not appeal?\u003C\u002Fp\u003E";
}
}, 'Hiking', 'hiking.jpg');
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_sample_events.pug";
pug_mixins["eventItem"].call({
block: function(){
;pug_debug_line = 20;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_sample_events.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 20;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_sample_events.pug";
pug_html = pug_html + "A week of camp life is worth six months of theoretical teaching in the meeting room.\u003C\u002Fp\u003E";
}
}, 'Summer Camp', 'summer_camp.jpg');
;pug_debug_line = 21;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_sample_events.pug";
pug_mixins["eventItem"].call({
block: function(){
;pug_debug_line = 22;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_sample_events.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 22;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_sample_events.pug";
pug_html = pug_html + "Vigorous Scout games are the best form of physical education because most of them bring in moral education.\u003C\u002Fp\u003E";
}
}, 'Fun and Games', 'gaga.jpg');
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_sample_events.pug";
pug_mixins["eventItem"].call({
block: function(){
;pug_debug_line = 24;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_sample_events.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 24;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_sample_events.pug";
pug_html = pug_html + "The most important object in Boy Scout training is to educate, not instruct\u003C\u002Fp\u003E";
}
}, 'First Aid', 'first_aid.jpg');
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 38;pug_debug_filename = "app\u002Fassets\u002Findex.pug";
pug_html = pug_html + "\u003Cp class=\"events-foot\"\u003E";
;pug_debug_line = 39;pug_debug_filename = "app\u002Fassets\u002Findex.pug";
pug_html = pug_html + "All quotes by Lord Baden-Powell, the founder of Scouting";
;pug_debug_line = 40;pug_debug_filename = "app\u002Fassets\u002Findex.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 40;pug_debug_filename = "app\u002Fassets\u002Findex.pug";
pug_html = pug_html + "\u003C\u002Fp\u003E\u003C\u002Farticle\u003E";
;pug_debug_line = 32;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Carticle id=\"contact\"\u003E";
;pug_debug_line = 33;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cheader\u003E";
;pug_debug_line = 34;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 34;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "Contact Us\u003C\u002Fh1\u003E\u003C\u002Fheader\u003E";
;pug_debug_line = 35;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cdiv id=\"contact-form\"\u003E";
;pug_debug_line = 1;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cform action=\"https:\u002F\u002Fapp.99inbound.com\u002Fapi\u002Fe\u002FqnSf2KrH\" method=\"POST\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-wrap\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"formcol\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"form\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Clabel for=\"name\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "Name:\u003C\u002Flabel\u003E";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cinput type=\"text\" name=\"name\" id=\"name\" placeholder=\"Joe Smith\" required autocomplete=\"name\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"form\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Clabel for=\"__replyto\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "Email:\u003C\u002Flabel\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cinput type=\"email\" name=\"__replyto\" id=\"__replyto\" placeholder=\"jsmith@example.com\" required autocomplete=\"email\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 27;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"form\"\u003E";
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Clabel for=\"phone\"\u003E";
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "Phone:\u003C\u002Flabel\u003E";
;pug_debug_line = 29;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cinput type=\"tel\" name=\"phone\" id=\"phone\" placeholder=\"610-555-1212\" autocomplete=\"tel\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 36;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"formcol\"\u003E";
;pug_debug_line = 37;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"form\"\u003E";
;pug_debug_line = 38;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Clabel for=\"message\"\u003E";
;pug_debug_line = 38;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "Message:\u003C\u002Flabel\u003E";
;pug_debug_line = 39;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Ctextarea name=\"message\" id=\"message\" placeholder=\"Your message here\" minlength=\"20\" rows=\"6\" cols=\"20\"\u003E\u003C\u002Ftextarea\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 47;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cinput type=\"hidden\" name=\"__redirect\" id=\"__redirect\" value=\"\"\u003E";
;pug_debug_line = 53;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cinput type=\"hidden\" name=\"__subject\" id=\"__subject\" value=\"Troop 151 Website Contact\"\u003E";
;pug_debug_line = 59;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv style=\"position: absolute; left: -5000px;\"\u003E\n\u003Cinput type=\"checkbox\" name=\"conservative_cornflower_blue_matte_headphones\" value=\"1\" tabindex=\"-1\" autocomplete=\"no\"\u003E\n\u003C\u002Fdiv\u003E";
;pug_debug_line = 62;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cinput type=\"submit\" id=\"form_submit\" value=\"Send Message\"\u003E\u003C\u002Fform\u003E";
;pug_debug_line = 67;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cscript\u003E";
;pug_debug_line = 68;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "var r = document.getElementById('__redirect')";
;pug_debug_line = 69;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 69;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "var s = window.location.href";
;pug_debug_line = 70;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 70;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "if (s.indexOf('.html') !== -1 ) {";
;pug_debug_line = 71;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 71;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "  var re = \u002F(.+\\\u002F)(.+\\.html?$)\u002Fi";
;pug_debug_line = 72;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 72;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "  r.value = s.replace(re, '$1') + 'thankyou.html'";
;pug_debug_line = 73;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 73;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "} else {";
;pug_debug_line = 74;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 74;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "  r.value = s + 'thankyou.html'";
;pug_debug_line = 75;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 75;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "}\u003C\u002Fscript\u003E\u003C\u002Fdiv\u003E\u003C\u002Farticle\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 1;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
var now = new Date()
;pug_debug_line = 2;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
var expires = new Date('2019-11-17T23:59:00')
;pug_debug_line = 3;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cfooter id=\"footer\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-wrap\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-thirds\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cimg class=\"foot-img\" src=\".\u002Fimg\u002F151-patch.png\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca class=\"join-button\" href=\"https:\u002F\u002Fmy.bsa.us\u002F525taa0151mb\" target=\"_blank\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Join Now\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 8;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-thirds\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Troop 151, BSA\u003C\u002Fh4\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\"http:\u002F\u002Fcubpack151.org\u002F\" target=\"_blank\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Pack 151\u003C\u002Fa\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 11;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 11;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Crew 151\u003C\u002Fp\u003E";
;pug_debug_line = 12;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 12;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Chartered To\u003C\u002Fh4\u003E";
;pug_debug_line = 13;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 13;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\"http:\u002F\u002Fmarplepres.org\u002F\" target=\"_blank\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Marple Presbyterian Church\u003C\u002Fa\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 14;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 14;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "150 North Sproul Road\u003C\u002Fp\u003E";
;pug_debug_line = 15;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 15;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Broomall, PA 19008\u003C\u002Fp\u003E";
;pug_debug_line = 16;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 16;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Affiliated With\u003C\u002Fh4\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\"http:\u002F\u002Fcolbsa.org\u002Fconstellation\u002F\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Constellation District\u003C\u002Fa\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\"http:\u002F\u002Fcolbsa.org\u002F\" target=\"_blank\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Cradle of Liberty Council\u003C\u002Fa\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\"http:\u002F\u002Fscouting.org\u002F\" target=\"_blank\"\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Boy Scouts of America\u003C\u002Fa\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 20;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-thirds\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 21;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Site Map\u003C\u002Fh4\u003E";
;pug_debug_line = 22;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cul class=\"foot-nav\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Findex.html\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Home\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 24;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 24;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Fabout.html\"\u003E";
;pug_debug_line = 24;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "About Us\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 25;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
if (now <= expires) {
;pug_debug_line = 26;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 26;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Fpoinsettias.html\"\u003E";
;pug_debug_line = 26;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Support Us\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
}
else {
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Fsupport.html\"\u003E";
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Support Us\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
}
;pug_debug_line = 29;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 29;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Fresources.html\"\u003E";
;pug_debug_line = 29;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Tools and Resources\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 30;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 30;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Fterms.html\"\u003E";
;pug_debug_line = 30;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Terms and Privacy Policy\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 31;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cdiv class=\"foot-end\"\u003E";
;pug_debug_line = 32;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 32;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "&copy;2019 Troop 151\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Ffooter\u003E";
;pug_debug_line = 40;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
if (scripts == 'foxycart') {
pug_html = pug_html + "\u003C!-- FOXYCART --\u003E\n\u003Cscript data-cfasync=\"false\" src=\"https:\u002F\u002Fcdn.foxycart.com\u002Ft151\u002Floader.js\" async defer\u003E\u003C\u002Fscript\u003E\n\u003C!-- \u002FFOXYCART --\u003E\n";
}
pug_html = pug_html + "\u003C\u002Fbody\u003E\u003C\u002Fhtml\u003E";}.call(this,"scripts" in locals_for_with?locals_for_with.scripts:typeof scripts!=="undefined"?scripts:undefined));} catch (err) {pug.rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;};
module.exports = template;
});

;require.register("assets/poinsettias.pug", function(exports, require, module) {
function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"app\u002Fassets\u002Fpoinsettias.pug":"extends partials\u002F_layout\n\nblock vars\n  -var pageTitle = 'Poinsettia Sale'\n  -var pageDesc = 'Support Troop 151 in our Annual Poinsettia Sale. Ends November 17.'\n  -var pageFile = \"support\"\n  -var mastheadImg ='poinsettia.jpg'\n  -var scripts = 'foxycart'\n\nblock masthead\n  h1 Poinsettia Fundraiser\n\nblock content\n  article#top\n    header\n      h1 Thank You For Your Support\n    p. \n      Your order helps Troop 151 put on a quality program of youth development for our members, \n      and gives you some of the most beautiful holiday floral items at a great price. \n    p This year, we are selling\n    ul\n      li: a(href='#poinsettias') Poinsettias\n      li: a(href='#wreaths') Wreaths\n      li: a(href='#cemetery') Cemetery Decorations\n      li: a(href='#decor') Home Decor\n      li: a(href='#tip') Tip Jar\n    p Orders muat be placed by November 17. \n    p Orders will be availabe for pickup on Wednesday, December 4th from Marple Presbyterian Church.\n    p We will email you details for pickup a few days before.\n    \n  article#poinsettias\n    header\n      h1 Poinsettias\n    +foxyitem('6in Poinsettia', 11, 'img\u002Fxmas\u002Fpoinsettia-red.jpg', 'P6', 'color', 'Red', 'White', 'Pink', 'Marble')\n      ul\n        li One poinsettia plant in a 6 inch pot. \n        li Stands about 10 inches tall. \n        li Pot is foil covered.\n        li Choose Red (pictured), White, Pink or Marble Flowers\n    +foxyitem('7in Poinsettia', 16, 'img\u002Fxmas\u002Fpoinsettia-white.jpg', 'P7', 'color', 'Red', 'White', 'Pink', 'Marble')\n      ul\n        li Two poinsettia plants in a 7-&frac12; inch pot. \n        li Stands about 14 inches tall. \n        li Pot is foil covered.\n        li Choose Red, White (pictured), Pink or Marble Flowers\n    +foxyitem('8in Poinsettia', 21, 'img\u002Fxmas\u002Fpoinsettia-pink.jpg', 'P8', 'color', 'Red', 'White', 'Pink', 'Marble')\n      ul\n        li Three poinsettia plants in a 8-&frac12; inch pot. \n        li Stands about 18 inches tall. \n        li Pot is foil covered.\n        li Choose Red, White, Pink (pictured) or Marble Flowers\n    +foxyitem('10in Poinsettia', 26, 'img\u002Fxmas\u002Fpoinsettia-marble.jpg', 'P10', 'color', 'Red', 'White', 'Pink', 'Marble')\n      ul\n        li Four poinsettia plants in a 10 inch pot. \n        li Stands about 30 inches tall. \n        li Pot is foil covered.\n        li Choose Red, White, Pink or Marble (pictured) Flowers\n        \n  article#wreaths\n    header\n      h1 Wreaths\n    +foxyitem('Plain Wreath', 16, 'img\u002Fxmas\u002Fwreath-plain.jpg', 'WP')\n      ul\n        li 22 inch diameter, single-faced live frazer fir wreath\n        li Plain to accept your decorations\n    +foxyitem('Plain Wreath with Bow', 18, 'img\u002Fxmas\u002Fwreath-bow.jpg', 'WB', 'bow color', 'red', 'burgundy', 'plaid')\n      ul\n        li 22 inch diameter, single-faced live frazer fir wreath\n        li Plain with a bow\n        li Choose a Red Velvet (pictured), Burgundy Velvet or Plaid Bow\n    +foxyitem('Decorated Wreath', 21, 'img\u002Fxmas\u002Fwreath-decorated.jpg', 'WD', 'bow color', 'red', 'burgundy', 'plaid')\n      ul\n        li 22 inch diameter, single-faced live frazer fir wreath\n        li Decorated with Bow, Pine Cones and Berries\n        li Wreaths are made so bows can be displayed either Top, Bottom or Side\n        li Choose a Red Velvet, Burgundy Velvet or Plaid (pictured) Bow\n    +foxyitem('Fancy Wreath', 24, 'img\u002Fxmas\u002Fwreath-fancy.jpg', 'WF', 'bow color', 'gold', 'red', 'burgundy')\n      ul\n        li 22 inch diameter, single-faced live frazer fir wreath\n        li Decorated with Bow w\u002Fstreamers, Glitter, Gold Pine Cones and Glass Balls\n        li Choose a Gold, Red Velvet, or Burgundy Velvet (pictured) Bow\n        \n  article#cemetery\n    header\n      h1 Cemetery Decorations\n    +foxyitem('Cemetery Log', 18, 'img\u002Fxmas\u002Fcemetery-log.jpg', 'CL')\n      ul\n        li 12 inch Log with a 18-20 inch spray & Balsam Fir decorated with a Red Bow, Pine Cones, White Sticks and Red Ruscus\n        li Handmade with live Balsam Fir\n        li All decorations are waterproof\n    +foxyitem('Small Grave Blanket', 22, 'img\u002Fxmas\u002Fsmall-grave-blanket.jpg', 'GB-S')\n      ul\n        li Approx. 3ft. x 2.5ft. \n        li Balsam Fir with a Red Bow, Pine Cones, White Sticks and Red Ruscus\n        li Handmade with live Balsam Fir\n        li All decorations are waterproof\n    +foxyitem('Large Grave Blanket', 27, 'img\u002Fxmas\u002Flarge-grave-blanket.jpg', 'GB-L')\n      ul\n        li Approx. 3ft. x 5ft. \n        li Balsam Fir with a Red Bow, Pine Cones, White Sticks and Red Ruscus\n        li Handmade with live Balsam Fir\n        li All decorations are waterproof  \n    +foxyitem('Deluxe Grave Blanket', 29, 'img\u002Fxmas\u002Fdeluxe-grave-blanket.jpg', 'GB-D')\n      ul\n        li Approx. 3ft. x 5ft. \n        li Balsam Fir with a Red Bow, Pine Cones, Statis, Red Ruscus and White Fern Leaves\n        li Handmade with live Balsam Fir\n        li All decorations are waterproof  \n        \n  article#decor\n    header\n      h1 Home Decor\n    +foxyitem('White Pine Roping', 26, 'img\u002Fxmas\u002Fwhite-pine-roping.jpg', 'WPR')\n      ul\n        li 75 feet of white pine roping for all your decorating needs.\n        li It's a lot of roping. Plan to give some to your friends.\n\n  article#tips\n    header\n      h1 Tip Jar\n    +foxyitem('Griddle Fund', 1, 'img\u002Fxmas\u002Fgriddle.jpg', 'TIP')\n      ul\n        li Help keep cheesteaks in our campouts!\n        li Give to our griddle fund so that we can get a second griddle to feed our growing Troop of growing Scouts.\n  ","app\u002Fassets\u002Fpartials\u002F_layout.pug":"include _mixins.pug\r\n\r\nblock vars\r\n  -var pageTitle = 'Layout'\r\n  -var pageDesc = 'Description of this page'\r\n  -var pageFile = 'index'\r\n  -var scripts = ''\r\n\r\nif mastheadImg\r\n  -var mastheadImgUrl = '.\u002Fimg\u002Fmastheads\u002F' + mastheadImg\r\nelse\r\n  -var mastheadImgUrl = '.\u002Fimg\u002Fmastheads\u002Fmasthead_img.jpg'\r\n\r\ndoctype html\r\nhtml(prefix='og: http:\u002F\u002Fogp.me\u002Fns#', lang='en')\r\n  head\r\n    include _head.pug\r\n\r\n  body\r\n    #main\r\n      header\r\n        include _top_nav.pug\r\n        section#masthead(style='background: no-repeat center\u002Fcover url('+mastheadImgUrl+')')\r\n          .masthead-content\r\n            block masthead\r\n              h1 Troop 151, Broomall PA\r\n              p A Scout-Led Troop\r\n              p Chartered to Marple Presbyterian Church\r\n\r\n      #content\r\n        block content\r\n        article#contact\r\n          header\r\n            h1 Contact Us\r\n          #contact-form\r\n            include _contact.pug\r\n\r\n    include _foot.pug\r\n\r\n    if scripts == 'foxycart'\r\n      include _foxycart.html\r\n","app\u002Fassets\u002Fpartials\u002F_mixins.pug":"mixin linkbutton(link, text)\n  .more-div\n    span.more-wrap\n      a(href=link, class='more-button')= text\n\nmixin eventItem(title, eventImage)\n  .event-gallery\n    img(src='.\u002Fimg\u002Fevents\u002F'+eventImage)\n    .background-shade\n      .event-desc\n        h4= title\n        block\n\nmixin leader(name, title, profileImage)\n  .leader-gallery\n    if profileImage\n      img(src='.\u002Fimg\u002Fleaders\u002F'+profileImage)\n    else\n      img(src='.\u002Fimg\u002Fleaders\u002Fno-photo.png')\n    p.leader_name= name\n    p.leader_title= title\n\nmixin eagle(name, year)\n  .eagle-gallery\n    .eagle-logo\n      img(src='.\u002Fimg\u002Feagle_badge.gif')\n    .eagle-data\n      p.eagle-name= name\n      p.eagle-year= year\n      \nmixin foxyitem(name, price, image, code, option_name, ...options)\n  .item-card(id= code)\n    .item-card-info\n      .item-image\n        img(src=image)\n      .item-data\n        .item-data-head\n          p.item-name= name\n          p.item-price= '$' + price.toFixed(2)\n        .item-description\n          if block\n            block\n        .item-form\n          form(action='https:\u002F\u002Ft151.foxycart.com\u002Fcart', method='post', accept-charset='utf-8' id= code + '_form')\n            input(type='hidden', name='name', value= name)\n            input(type='hidden', name='price', value= price)\n            input(type='hidden', name='code', value= code)\n            input(type='hidden', name='category', value='Poinsettia_Sale')\n            -var date = new Date('2019-11-17T23:59:00')\n            input(type='hidden', name='expires', value= Math.floor(date.getTime()\u002F1000))\n            input(type='number', name='quantity' value=1, min=0)\n            if option_name\n              -var on = option_name.charAt(0).toUpperCase() + option_name.slice(1)\n              label.option_label= on\n              select(name= option_name)\n                each item in options\n                  -var it = item.charAt(0).toUpperCase()+item.slice(1)\n                  option(value= it +'{c+' + it.charAt(0) +'}') #{it}\n            input.submit(type='submit', value=`Add ${name} to Cart`)\n            ","app\u002Fassets\u002Fpartials\u002F_head.pug":"meta(charset='utf-8')\nmeta(http-equiv='X-UA-Compatible', content='IE=edge')\nmeta(name='description', content= pageDesc)\nmeta(name='author', content= \"Troop 151 Broomall, PA\")\nmeta(name=\"viewport\" content=\"width=device-width, initial-scale=1\")\n\nmeta(property=\"og:title\", content= pageTitle)\nmeta(property=\"og:description\", content= pageDesc)\nmeta(property=\"og:type\", content=\"website\")\nmeta(property=\"og:url\", content=\"https:\u002F\u002Ft151.org\u002F\" + pageFile + '.html' )\nmeta(property=\"og:image\", content= mastheadImgUrl)\nmeta(property=\"og:image:width\", content=\"3264\")\nmeta(property=\"og:image:height\", content=\"2448\")\n\ninclude _favicon.pug\n\nlink(href=\"app.css\", rel=\"stylesheet\", type=\"text\u002Fcss\")\n","app\u002Fassets\u002Fpartials\u002F_favicon.pug":"\u002F\u002F- Generated at https:\u002F\u002Frealfavicongenerator.net\u002F\r\nlink(rel=\"apple-touch-icon\", sizes=\"180x180\", href=\"\u002Fimg\u002Ffavicon\u002Fapple-touch-icon.png\")\r\nlink(rel=\"icon\", type=\"image\u002Fpng\", sizes=\"32x32\", href=\"\u002Fimg\u002Ffavicon\u002Ffavicon-32x32.png\")\r\nlink(rel=\"icon\", type=\"image\u002Fpng\", sizes=\"16x16\", href=\"\u002Fimg\u002Ffavicon\u002Ffavicon-16x16.png\")\r\nlink(rel=\"manifest\", href=\"\u002Fimg\u002Ffavicon\u002Fsite.webmanifest\")\r\nlink(rel=\"mask-icon\", href=\"\u002Fimg\u002Ffavicon\u002Fsafari-pinned-tab.svg\", color=\"#5bbad5\")\r\nmeta(name=\"apple-mobile-web-app-title\", content=\"Troop 151\")\r\nmeta(name=\"application-name\", content=\"Troop 151\")\r\nmeta(name=\"msapplication-TileColor\", content=\"#da532c\")\r\nmeta(name=\"theme-color\", content=\"#da532c\")\r\n","app\u002Fassets\u002Fpartials\u002F_top_nav.pug":"nav#top_nav\r\n  h1 Troop 151\r\n  ul\r\n    li: a(href='.\u002Findex.html') &#127968;\r\n    li: a(href='#footer') &#x2630;\r\n","app\u002Fassets\u002Fpartials\u002F_contact.pug":"form(\n  action='https:\u002F\u002Fapp.99inbound.com\u002Fapi\u002Fe\u002FqnSf2KrH'\n  method='POST'\n)\n  .col-wrap\n    .formcol\n      .form\n        label(for='name') Name:\n        input(\n          type='text'\n          name='name'\n          id='name'\n          placeholder='Joe Smith'\n          required\n          autocomplete='name'\n        )\n      .form\n        label(for='__replyto') Email:\n        input(\n          type='email'\n          name='__replyto'\n          id='__replyto'\n          placeholder='jsmith@example.com'\n          required\n          autocomplete='email'\n        )\n      .form\n        label(for='phone') Phone:\n        input(\n          type='tel'\n          name='phone'\n          id='phone'\n          placeholder='610-555-1212'\n          autocomplete='tel'\n        )\n    .formcol\n      .form\n        label(for='message') Message:\n        textarea(\n          name='message'\n          id='message'\n          placeholder='Your message here'\n          minlength=20\n          rows=6\n          cols=20\n        )\n  input(\n    type='hidden'\n    name='__redirect'\n    id='__redirect'\n    value=''\n  )\n  input(\n    type='hidden'\n    name='__subject'\n    id='__subject'\n    value='Troop 151 Website Contact'\n  )\n  \u003Cdiv style=\"position: absolute; left: -5000px;\"\u003E\n  \u003Cinput type=\"checkbox\" name=\"conservative_cornflower_blue_matte_headphones\" value=\"1\" tabindex=\"-1\" autocomplete=\"no\"\u003E\n  \u003C\u002Fdiv\u003E\n  input(\n    type='submit'\n    id='form_submit'\n    value='Send Message'\n  )\nscript.\n  var r = document.getElementById('__redirect')\n  var s = window.location.href\n  if (s.indexOf('.html') !== -1 ) {\n    var re = \u002F(.+\\\u002F)(.+\\.html?$)\u002Fi\n    r.value = s.replace(re, '$1') + 'thankyou.html'\n  } else {\n    r.value = s + 'thankyou.html'\n  }\n","app\u002Fassets\u002Fpartials\u002F_foot.pug":"-var now = new Date()\r\n-var expires = new Date('2019-11-17T23:59:00')\r\nfooter#footer\r\n  .col-wrap\r\n    .col-thirds\r\n      img(src='.\u002Fimg\u002F151-patch.png').foot-img\r\n      a(href='https:\u002F\u002Fmy.bsa.us\u002F525taa0151mb' target='_blank').join-button Join Now\r\n    .col-thirds\r\n      h4 Troop 151, BSA\r\n      p: a(href='http:\u002F\u002Fcubpack151.org\u002F' target='_blank') Pack 151\r\n      p Crew 151\r\n      h4 Chartered To\r\n      p: a(href='http:\u002F\u002Fmarplepres.org\u002F' target='_blank') Marple Presbyterian Church\r\n      p 150 North Sproul Road\r\n      p Broomall, PA 19008\r\n      h4 Affiliated With\r\n      p: a(href='http:\u002F\u002Fcolbsa.org\u002Fconstellation\u002F') Constellation District\r\n      p: a(href='http:\u002F\u002Fcolbsa.org\u002F' target='_blank') Cradle of Liberty Council\r\n      p: a(href='http:\u002F\u002Fscouting.org\u002F' target='_blank') Boy Scouts of America\r\n    .col-thirds\r\n      h4 Site Map\r\n      ul.foot-nav\r\n        li: a(href='.\u002Findex.html') Home\r\n        li: a(href='.\u002Fabout.html') About Us\r\n        if now \u003C= expires\r\n          li: a(href='.\u002Fpoinsettias.html') Support Us\r\n        else\r\n          li: a(href='.\u002Fsupport.html') Support Us\r\n        li: a(href='.\u002Fresources.html') Tools and Resources\r\n        li: a(href='.\u002Fterms.html') Terms and Privacy Policy\r\n  .foot-end\r\n    p &copy;2019 Troop 151\r\n","app\u002Fassets\u002Fpartials\u002F_foxycart.html":"\u003C!-- FOXYCART --\u003E\n\u003Cscript data-cfasync=\"false\" src=\"https:\u002F\u002Fcdn.foxycart.com\u002Ft151\u002Floader.js\" async defer\u003E\u003C\u002Fscript\u003E\n\u003C!-- \u002FFOXYCART --\u003E\n"};
;pug_debug_line = 1;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";











;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";


















;pug_debug_line = 14;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";






















;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";



















;pug_debug_line = 31;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_mixins["foxyitem"] = pug_interp = function(name, price, image, code, option_name){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var options = [];
for (pug_interp = 5; pug_interp < arguments.length; pug_interp++) {
  options.push(arguments[pug_interp]);
}
;pug_debug_line = 32;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"item-card\""+pug.attr("id", code, true, true)) + "\u003E";
;pug_debug_line = 33;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cdiv class=\"item-card-info\"\u003E";
;pug_debug_line = 34;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cdiv class=\"item-image\"\u003E";
;pug_debug_line = 35;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cimg" + (pug.attr("src", image, true, true)) + "\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 36;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cdiv class=\"item-data\"\u003E";
;pug_debug_line = 37;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cdiv class=\"item-data-head\"\u003E";
;pug_debug_line = 38;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cp class=\"item-name\"\u003E";
;pug_debug_line = 38;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + (pug.escape(null == (pug_interp = name) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
;pug_debug_line = 39;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cp class=\"item-price\"\u003E";
;pug_debug_line = 39;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + (pug.escape(null == (pug_interp = '$' + price.toFixed(2)) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 40;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cdiv class=\"item-description\"\u003E";
;pug_debug_line = 41;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
if (block) {
;pug_debug_line = 42;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
block && block();
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 43;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cdiv class=\"item-form\"\u003E";
;pug_debug_line = 44;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cform" + (" action=\"https:\u002F\u002Ft151.foxycart.com\u002Fcart\" method=\"post\" accept-charset=\"utf-8\""+pug.attr("id", code + '_form', true, true)) + "\u003E";
;pug_debug_line = 45;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cinput" + (" type=\"hidden\" name=\"name\""+pug.attr("value", name, true, true)) + "\u003E";
;pug_debug_line = 46;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cinput" + (" type=\"hidden\" name=\"price\""+pug.attr("value", price, true, true)) + "\u003E";
;pug_debug_line = 47;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cinput" + (" type=\"hidden\" name=\"code\""+pug.attr("value", code, true, true)) + "\u003E";
;pug_debug_line = 48;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cinput type=\"hidden\" name=\"category\" value=\"Poinsettia_Sale\"\u003E";
;pug_debug_line = 49;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
var date = new Date('2019-11-17T23:59:00')
;pug_debug_line = 50;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cinput" + (" type=\"hidden\" name=\"expires\""+pug.attr("value", Math.floor(date.getTime()/1000), true, true)) + "\u003E";
;pug_debug_line = 51;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cinput type=\"number\" name=\"quantity\" value=\"1\" min=\"0\"\u003E";
;pug_debug_line = 52;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
if (option_name) {
;pug_debug_line = 53;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
var on = option_name.charAt(0).toUpperCase() + option_name.slice(1)
;pug_debug_line = 54;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Clabel class=\"option_label\"\u003E";
;pug_debug_line = 54;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + (pug.escape(null == (pug_interp = on) ? "" : pug_interp)) + "\u003C\u002Flabel\u003E";
;pug_debug_line = 55;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cselect" + (pug.attr("name", option_name, true, true)) + "\u003E";
;pug_debug_line = 56;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
// iterate options
;(function(){
  var $$obj = options;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var item = $$obj[pug_index0];
;pug_debug_line = 57;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
var it = item.charAt(0).toUpperCase()+item.slice(1)
;pug_debug_line = 58;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Coption" + (pug.attr("value", it +'{c+' + it.charAt(0) +'}', true, true)) + "\u003E";
;pug_debug_line = 58;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + (pug.escape(null == (pug_interp = it) ? "" : pug_interp)) + "\u003C\u002Foption\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var item = $$obj[pug_index0];
;pug_debug_line = 57;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
var it = item.charAt(0).toUpperCase()+item.slice(1)
;pug_debug_line = 58;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Coption" + (pug.attr("value", it +'{c+' + it.charAt(0) +'}', true, true)) + "\u003E";
;pug_debug_line = 58;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + (pug.escape(null == (pug_interp = it) ? "" : pug_interp)) + "\u003C\u002Foption\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fselect\u003E";
}
;pug_debug_line = 59;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"submit\""+" type=\"submit\""+pug.attr("value", `Add ${name} to Cart`, true, true)) + "\u003E\u003C\u002Fform\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
};
;pug_debug_line = 3;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
var pageTitle = 'Poinsettia Sale'
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
var pageDesc = 'Support Troop 151 in our Annual Poinsettia Sale. Ends November 17.'
;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
var pageFile = "support"
;pug_debug_line = 7;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
var mastheadImg ='poinsettia.jpg'
;pug_debug_line = 8;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
var scripts = 'foxycart'
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
if (mastheadImg) {
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
var mastheadImgUrl = './img/mastheads/' + mastheadImg
}
else {
;pug_debug_line = 12;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
var mastheadImgUrl = './img/mastheads/masthead_img.jpg'
}
;pug_debug_line = 14;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003C!DOCTYPE html\u003E";
;pug_debug_line = 15;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Chtml prefix=\"og: http:\u002F\u002Fogp.me\u002Fns#\" lang=\"en\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Chead\u003E";
;pug_debug_line = 1;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta charset=\"utf-8\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta" + (" name=\"description\""+pug.attr("content", pageDesc, true, true)) + "\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta name=\"author\" content=\"Troop 151 Broomall, PA\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta" + (" property=\"og:title\""+pug.attr("content", pageTitle, true, true)) + "\u003E";
;pug_debug_line = 8;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta" + (" property=\"og:description\""+pug.attr("content", pageDesc, true, true)) + "\u003E";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta property=\"og:type\" content=\"website\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta" + (" property=\"og:url\""+pug.attr("content", "https://t151.org/" + pageFile + '.html', true, true)) + "\u003E";
;pug_debug_line = 11;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta" + (" property=\"og:image\""+pug.attr("content", mastheadImgUrl, true, true)) + "\u003E";
;pug_debug_line = 12;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta property=\"og:image:width\" content=\"3264\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta property=\"og:image:height\" content=\"2448\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Clink rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"\u002Fimg\u002Ffavicon\u002Fapple-touch-icon.png\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Clink rel=\"icon\" type=\"image\u002Fpng\" sizes=\"32x32\" href=\"\u002Fimg\u002Ffavicon\u002Ffavicon-32x32.png\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Clink rel=\"icon\" type=\"image\u002Fpng\" sizes=\"16x16\" href=\"\u002Fimg\u002Ffavicon\u002Ffavicon-16x16.png\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Clink rel=\"manifest\" href=\"\u002Fimg\u002Ffavicon\u002Fsite.webmanifest\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Clink rel=\"mask-icon\" href=\"\u002Fimg\u002Ffavicon\u002Fsafari-pinned-tab.svg\" color=\"#5bbad5\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Cmeta name=\"apple-mobile-web-app-title\" content=\"Troop 151\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Cmeta name=\"application-name\" content=\"Troop 151\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Cmeta name=\"msapplication-TileColor\" content=\"#da532c\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Cmeta name=\"theme-color\" content=\"#da532c\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Clink href=\"app.css\" rel=\"stylesheet\" type=\"text\u002Fcss\"\u003E\u003C\u002Fhead\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cbody\u003E";
;pug_debug_line = 20;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cdiv id=\"main\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cheader\u003E";
;pug_debug_line = 1;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Cnav id=\"top_nav\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 2;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "Troop 151\u003C\u002Fh1\u003E";
;pug_debug_line = 3;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Cul\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Findex.html\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "&#127968;\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Ca href=\"#footer\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "&#x2630;\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fnav\u003E";
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Csection" + (" id=\"masthead\""+pug.attr("style", pug.style('background: no-repeat center/cover url('+mastheadImgUrl+')'), true, true)) + "\u003E";
;pug_debug_line = 24;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cdiv class=\"masthead-content\"\u003E";
;pug_debug_line = 25;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
;pug_debug_line = 11;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 11;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Poinsettia Fundraiser\u003C\u002Fh1\u003E\u003C\u002Fdiv\u003E\u003C\u002Fsection\u003E\u003C\u002Fheader\u003E";
;pug_debug_line = 30;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cdiv id=\"content\"\u003E";
;pug_debug_line = 31;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
;pug_debug_line = 14;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Carticle id=\"top\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cheader\u003E";
;pug_debug_line = 16;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 16;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Thank You For Your Support\u003C\u002Fh1\u003E\u003C\u002Fheader\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Your order helps Troop 151 put on a quality program of youth development for our members, ";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "and gives you some of the most beautiful holiday floral items at a great price. \u003C\u002Fp\u003E";
;pug_debug_line = 20;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 20;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "This year, we are selling\u003C\u002Fp\u003E";
;pug_debug_line = 21;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cul\u003E";
;pug_debug_line = 22;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 22;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Ca href=\"#poinsettias\"\u003E";
;pug_debug_line = 22;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Poinsettias\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Ca href=\"#wreaths\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Wreaths\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 24;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 24;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Ca href=\"#cemetery\"\u003E";
;pug_debug_line = 24;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Cemetery Decorations\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 25;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 25;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Ca href=\"#decor\"\u003E";
;pug_debug_line = 25;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Home Decor\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 26;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 26;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Ca href=\"#tip\"\u003E";
;pug_debug_line = 26;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Tip Jar\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E";
;pug_debug_line = 27;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 27;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Orders muat be placed by November 17. \u003C\u002Fp\u003E";
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Orders will be availabe for pickup on Wednesday, December 4th from Marple Presbyterian Church.\u003C\u002Fp\u003E";
;pug_debug_line = 29;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 29;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "We will email you details for pickup a few days before.\u003C\u002Fp\u003E\u003C\u002Farticle\u003E";
;pug_debug_line = 31;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Carticle id=\"poinsettias\"\u003E";
;pug_debug_line = 32;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cheader\u003E";
;pug_debug_line = 33;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 33;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Poinsettias\u003C\u002Fh1\u003E\u003C\u002Fheader\u003E";
;pug_debug_line = 34;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_mixins["foxyitem"].call({
block: function(){
;pug_debug_line = 35;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cul\u003E";
;pug_debug_line = 36;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 36;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "One poinsettia plant in a 6 inch pot. \u003C\u002Fli\u003E";
;pug_debug_line = 37;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 37;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Stands about 10 inches tall. \u003C\u002Fli\u003E";
;pug_debug_line = 38;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 38;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Pot is foil covered.\u003C\u002Fli\u003E";
;pug_debug_line = 39;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 39;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Choose Red (pictured), White, Pink or Marble Flowers\u003C\u002Fli\u003E\u003C\u002Ful\u003E";
}
}, '6in Poinsettia', 11, 'img/xmas/poinsettia-red.jpg', 'P6', 'color', 'Red', 'White', 'Pink', 'Marble');
;pug_debug_line = 40;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_mixins["foxyitem"].call({
block: function(){
;pug_debug_line = 41;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cul\u003E";
;pug_debug_line = 42;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 42;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Two poinsettia plants in a 7-&frac12; inch pot. \u003C\u002Fli\u003E";
;pug_debug_line = 43;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 43;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Stands about 14 inches tall. \u003C\u002Fli\u003E";
;pug_debug_line = 44;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 44;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Pot is foil covered.\u003C\u002Fli\u003E";
;pug_debug_line = 45;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 45;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Choose Red, White (pictured), Pink or Marble Flowers\u003C\u002Fli\u003E\u003C\u002Ful\u003E";
}
}, '7in Poinsettia', 16, 'img/xmas/poinsettia-white.jpg', 'P7', 'color', 'Red', 'White', 'Pink', 'Marble');
;pug_debug_line = 46;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_mixins["foxyitem"].call({
block: function(){
;pug_debug_line = 47;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cul\u003E";
;pug_debug_line = 48;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 48;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Three poinsettia plants in a 8-&frac12; inch pot. \u003C\u002Fli\u003E";
;pug_debug_line = 49;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 49;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Stands about 18 inches tall. \u003C\u002Fli\u003E";
;pug_debug_line = 50;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 50;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Pot is foil covered.\u003C\u002Fli\u003E";
;pug_debug_line = 51;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 51;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Choose Red, White, Pink (pictured) or Marble Flowers\u003C\u002Fli\u003E\u003C\u002Ful\u003E";
}
}, '8in Poinsettia', 21, 'img/xmas/poinsettia-pink.jpg', 'P8', 'color', 'Red', 'White', 'Pink', 'Marble');
;pug_debug_line = 52;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_mixins["foxyitem"].call({
block: function(){
;pug_debug_line = 53;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cul\u003E";
;pug_debug_line = 54;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 54;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Four poinsettia plants in a 10 inch pot. \u003C\u002Fli\u003E";
;pug_debug_line = 55;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 55;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Stands about 30 inches tall. \u003C\u002Fli\u003E";
;pug_debug_line = 56;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 56;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Pot is foil covered.\u003C\u002Fli\u003E";
;pug_debug_line = 57;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 57;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Choose Red, White, Pink or Marble (pictured) Flowers\u003C\u002Fli\u003E\u003C\u002Ful\u003E";
}
}, '10in Poinsettia', 26, 'img/xmas/poinsettia-marble.jpg', 'P10', 'color', 'Red', 'White', 'Pink', 'Marble');
pug_html = pug_html + "\u003C\u002Farticle\u003E";
;pug_debug_line = 59;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Carticle id=\"wreaths\"\u003E";
;pug_debug_line = 60;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cheader\u003E";
;pug_debug_line = 61;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 61;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Wreaths\u003C\u002Fh1\u003E\u003C\u002Fheader\u003E";
;pug_debug_line = 62;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_mixins["foxyitem"].call({
block: function(){
;pug_debug_line = 63;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cul\u003E";
;pug_debug_line = 64;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 64;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "22 inch diameter, single-faced live frazer fir wreath\u003C\u002Fli\u003E";
;pug_debug_line = 65;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 65;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Plain to accept your decorations\u003C\u002Fli\u003E\u003C\u002Ful\u003E";
}
}, 'Plain Wreath', 16, 'img/xmas/wreath-plain.jpg', 'WP');
;pug_debug_line = 66;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_mixins["foxyitem"].call({
block: function(){
;pug_debug_line = 67;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cul\u003E";
;pug_debug_line = 68;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 68;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "22 inch diameter, single-faced live frazer fir wreath\u003C\u002Fli\u003E";
;pug_debug_line = 69;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 69;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Plain with a bow\u003C\u002Fli\u003E";
;pug_debug_line = 70;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 70;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Choose a Red Velvet (pictured), Burgundy Velvet or Plaid Bow\u003C\u002Fli\u003E\u003C\u002Ful\u003E";
}
}, 'Plain Wreath with Bow', 18, 'img/xmas/wreath-bow.jpg', 'WB', 'bow color', 'red', 'burgundy', 'plaid');
;pug_debug_line = 71;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_mixins["foxyitem"].call({
block: function(){
;pug_debug_line = 72;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cul\u003E";
;pug_debug_line = 73;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 73;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "22 inch diameter, single-faced live frazer fir wreath\u003C\u002Fli\u003E";
;pug_debug_line = 74;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 74;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Decorated with Bow, Pine Cones and Berries\u003C\u002Fli\u003E";
;pug_debug_line = 75;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 75;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Wreaths are made so bows can be displayed either Top, Bottom or Side\u003C\u002Fli\u003E";
;pug_debug_line = 76;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 76;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Choose a Red Velvet, Burgundy Velvet or Plaid (pictured) Bow\u003C\u002Fli\u003E\u003C\u002Ful\u003E";
}
}, 'Decorated Wreath', 21, 'img/xmas/wreath-decorated.jpg', 'WD', 'bow color', 'red', 'burgundy', 'plaid');
;pug_debug_line = 77;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_mixins["foxyitem"].call({
block: function(){
;pug_debug_line = 78;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cul\u003E";
;pug_debug_line = 79;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 79;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "22 inch diameter, single-faced live frazer fir wreath\u003C\u002Fli\u003E";
;pug_debug_line = 80;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 80;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Decorated with Bow w\u002Fstreamers, Glitter, Gold Pine Cones and Glass Balls\u003C\u002Fli\u003E";
;pug_debug_line = 81;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 81;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Choose a Gold, Red Velvet, or Burgundy Velvet (pictured) Bow\u003C\u002Fli\u003E\u003C\u002Ful\u003E";
}
}, 'Fancy Wreath', 24, 'img/xmas/wreath-fancy.jpg', 'WF', 'bow color', 'gold', 'red', 'burgundy');
pug_html = pug_html + "\u003C\u002Farticle\u003E";
;pug_debug_line = 83;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Carticle id=\"cemetery\"\u003E";
;pug_debug_line = 84;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cheader\u003E";
;pug_debug_line = 85;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 85;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Cemetery Decorations\u003C\u002Fh1\u003E\u003C\u002Fheader\u003E";
;pug_debug_line = 86;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_mixins["foxyitem"].call({
block: function(){
;pug_debug_line = 87;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cul\u003E";
;pug_debug_line = 88;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 88;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "12 inch Log with a 18-20 inch spray & Balsam Fir decorated with a Red Bow, Pine Cones, White Sticks and Red Ruscus\u003C\u002Fli\u003E";
;pug_debug_line = 89;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 89;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Handmade with live Balsam Fir\u003C\u002Fli\u003E";
;pug_debug_line = 90;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 90;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "All decorations are waterproof\u003C\u002Fli\u003E\u003C\u002Ful\u003E";
}
}, 'Cemetery Log', 18, 'img/xmas/cemetery-log.jpg', 'CL');
;pug_debug_line = 91;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_mixins["foxyitem"].call({
block: function(){
;pug_debug_line = 92;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cul\u003E";
;pug_debug_line = 93;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 93;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Approx. 3ft. x 2.5ft. \u003C\u002Fli\u003E";
;pug_debug_line = 94;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 94;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Balsam Fir with a Red Bow, Pine Cones, White Sticks and Red Ruscus\u003C\u002Fli\u003E";
;pug_debug_line = 95;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 95;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Handmade with live Balsam Fir\u003C\u002Fli\u003E";
;pug_debug_line = 96;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 96;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "All decorations are waterproof\u003C\u002Fli\u003E\u003C\u002Ful\u003E";
}
}, 'Small Grave Blanket', 22, 'img/xmas/small-grave-blanket.jpg', 'GB-S');
;pug_debug_line = 97;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_mixins["foxyitem"].call({
block: function(){
;pug_debug_line = 98;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cul\u003E";
;pug_debug_line = 99;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 99;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Approx. 3ft. x 5ft. \u003C\u002Fli\u003E";
;pug_debug_line = 100;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 100;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Balsam Fir with a Red Bow, Pine Cones, White Sticks and Red Ruscus\u003C\u002Fli\u003E";
;pug_debug_line = 101;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 101;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Handmade with live Balsam Fir\u003C\u002Fli\u003E";
;pug_debug_line = 102;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 102;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "All decorations are waterproof  \u003C\u002Fli\u003E\u003C\u002Ful\u003E";
}
}, 'Large Grave Blanket', 27, 'img/xmas/large-grave-blanket.jpg', 'GB-L');
;pug_debug_line = 103;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_mixins["foxyitem"].call({
block: function(){
;pug_debug_line = 104;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cul\u003E";
;pug_debug_line = 105;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 105;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Approx. 3ft. x 5ft. \u003C\u002Fli\u003E";
;pug_debug_line = 106;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 106;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Balsam Fir with a Red Bow, Pine Cones, Statis, Red Ruscus and White Fern Leaves\u003C\u002Fli\u003E";
;pug_debug_line = 107;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 107;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Handmade with live Balsam Fir\u003C\u002Fli\u003E";
;pug_debug_line = 108;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 108;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "All decorations are waterproof  \u003C\u002Fli\u003E\u003C\u002Ful\u003E";
}
}, 'Deluxe Grave Blanket', 29, 'img/xmas/deluxe-grave-blanket.jpg', 'GB-D');
pug_html = pug_html + "\u003C\u002Farticle\u003E";
;pug_debug_line = 110;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Carticle id=\"decor\"\u003E";
;pug_debug_line = 111;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cheader\u003E";
;pug_debug_line = 112;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 112;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Home Decor\u003C\u002Fh1\u003E\u003C\u002Fheader\u003E";
;pug_debug_line = 113;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_mixins["foxyitem"].call({
block: function(){
;pug_debug_line = 114;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cul\u003E";
;pug_debug_line = 115;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 115;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "75 feet of white pine roping for all your decorating needs.\u003C\u002Fli\u003E";
;pug_debug_line = 116;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 116;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "It's a lot of roping. Plan to give some to your friends.\u003C\u002Fli\u003E\u003C\u002Ful\u003E";
}
}, 'White Pine Roping', 26, 'img/xmas/white-pine-roping.jpg', 'WPR');
pug_html = pug_html + "\u003C\u002Farticle\u003E";
;pug_debug_line = 118;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Carticle id=\"tips\"\u003E";
;pug_debug_line = 119;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cheader\u003E";
;pug_debug_line = 120;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 120;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Tip Jar\u003C\u002Fh1\u003E\u003C\u002Fheader\u003E";
;pug_debug_line = 121;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_mixins["foxyitem"].call({
block: function(){
;pug_debug_line = 122;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cul\u003E";
;pug_debug_line = 123;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 123;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Help keep cheesteaks in our campouts!\u003C\u002Fli\u003E";
;pug_debug_line = 124;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 124;pug_debug_filename = "app\u002Fassets\u002Fpoinsettias.pug";
pug_html = pug_html + "Give to our griddle fund so that we can get a second griddle to feed our growing Troop of growing Scouts.\u003C\u002Fli\u003E\u003C\u002Ful\u003E";
}
}, 'Griddle Fund', 1, 'img/xmas/griddle.jpg', 'TIP');
pug_html = pug_html + "\u003C\u002Farticle\u003E";
;pug_debug_line = 32;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Carticle id=\"contact\"\u003E";
;pug_debug_line = 33;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cheader\u003E";
;pug_debug_line = 34;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 34;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "Contact Us\u003C\u002Fh1\u003E\u003C\u002Fheader\u003E";
;pug_debug_line = 35;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cdiv id=\"contact-form\"\u003E";
;pug_debug_line = 1;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cform action=\"https:\u002F\u002Fapp.99inbound.com\u002Fapi\u002Fe\u002FqnSf2KrH\" method=\"POST\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-wrap\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"formcol\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"form\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Clabel for=\"name\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "Name:\u003C\u002Flabel\u003E";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cinput type=\"text\" name=\"name\" id=\"name\" placeholder=\"Joe Smith\" required autocomplete=\"name\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"form\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Clabel for=\"__replyto\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "Email:\u003C\u002Flabel\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cinput type=\"email\" name=\"__replyto\" id=\"__replyto\" placeholder=\"jsmith@example.com\" required autocomplete=\"email\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 27;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"form\"\u003E";
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Clabel for=\"phone\"\u003E";
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "Phone:\u003C\u002Flabel\u003E";
;pug_debug_line = 29;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cinput type=\"tel\" name=\"phone\" id=\"phone\" placeholder=\"610-555-1212\" autocomplete=\"tel\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 36;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"formcol\"\u003E";
;pug_debug_line = 37;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"form\"\u003E";
;pug_debug_line = 38;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Clabel for=\"message\"\u003E";
;pug_debug_line = 38;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "Message:\u003C\u002Flabel\u003E";
;pug_debug_line = 39;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Ctextarea name=\"message\" id=\"message\" placeholder=\"Your message here\" minlength=\"20\" rows=\"6\" cols=\"20\"\u003E\u003C\u002Ftextarea\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 47;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cinput type=\"hidden\" name=\"__redirect\" id=\"__redirect\" value=\"\"\u003E";
;pug_debug_line = 53;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cinput type=\"hidden\" name=\"__subject\" id=\"__subject\" value=\"Troop 151 Website Contact\"\u003E";
;pug_debug_line = 59;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv style=\"position: absolute; left: -5000px;\"\u003E\n\u003Cinput type=\"checkbox\" name=\"conservative_cornflower_blue_matte_headphones\" value=\"1\" tabindex=\"-1\" autocomplete=\"no\"\u003E\n\u003C\u002Fdiv\u003E";
;pug_debug_line = 62;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cinput type=\"submit\" id=\"form_submit\" value=\"Send Message\"\u003E\u003C\u002Fform\u003E";
;pug_debug_line = 67;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cscript\u003E";
;pug_debug_line = 68;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "var r = document.getElementById('__redirect')";
;pug_debug_line = 69;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 69;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "var s = window.location.href";
;pug_debug_line = 70;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 70;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "if (s.indexOf('.html') !== -1 ) {";
;pug_debug_line = 71;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 71;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "  var re = \u002F(.+\\\u002F)(.+\\.html?$)\u002Fi";
;pug_debug_line = 72;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 72;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "  r.value = s.replace(re, '$1') + 'thankyou.html'";
;pug_debug_line = 73;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 73;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "} else {";
;pug_debug_line = 74;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 74;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "  r.value = s + 'thankyou.html'";
;pug_debug_line = 75;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 75;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "}\u003C\u002Fscript\u003E\u003C\u002Fdiv\u003E\u003C\u002Farticle\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 1;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
var now = new Date()
;pug_debug_line = 2;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
var expires = new Date('2019-11-17T23:59:00')
;pug_debug_line = 3;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cfooter id=\"footer\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-wrap\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-thirds\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cimg class=\"foot-img\" src=\".\u002Fimg\u002F151-patch.png\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca class=\"join-button\" href=\"https:\u002F\u002Fmy.bsa.us\u002F525taa0151mb\" target=\"_blank\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Join Now\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 8;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-thirds\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Troop 151, BSA\u003C\u002Fh4\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\"http:\u002F\u002Fcubpack151.org\u002F\" target=\"_blank\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Pack 151\u003C\u002Fa\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 11;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 11;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Crew 151\u003C\u002Fp\u003E";
;pug_debug_line = 12;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 12;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Chartered To\u003C\u002Fh4\u003E";
;pug_debug_line = 13;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 13;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\"http:\u002F\u002Fmarplepres.org\u002F\" target=\"_blank\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Marple Presbyterian Church\u003C\u002Fa\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 14;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 14;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "150 North Sproul Road\u003C\u002Fp\u003E";
;pug_debug_line = 15;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 15;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Broomall, PA 19008\u003C\u002Fp\u003E";
;pug_debug_line = 16;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 16;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Affiliated With\u003C\u002Fh4\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\"http:\u002F\u002Fcolbsa.org\u002Fconstellation\u002F\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Constellation District\u003C\u002Fa\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\"http:\u002F\u002Fcolbsa.org\u002F\" target=\"_blank\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Cradle of Liberty Council\u003C\u002Fa\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\"http:\u002F\u002Fscouting.org\u002F\" target=\"_blank\"\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Boy Scouts of America\u003C\u002Fa\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 20;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-thirds\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 21;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Site Map\u003C\u002Fh4\u003E";
;pug_debug_line = 22;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cul class=\"foot-nav\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Findex.html\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Home\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 24;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 24;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Fabout.html\"\u003E";
;pug_debug_line = 24;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "About Us\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 25;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
if (now <= expires) {
;pug_debug_line = 26;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 26;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Fpoinsettias.html\"\u003E";
;pug_debug_line = 26;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Support Us\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
}
else {
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Fsupport.html\"\u003E";
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Support Us\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
}
;pug_debug_line = 29;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 29;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Fresources.html\"\u003E";
;pug_debug_line = 29;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Tools and Resources\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 30;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 30;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Fterms.html\"\u003E";
;pug_debug_line = 30;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Terms and Privacy Policy\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 31;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cdiv class=\"foot-end\"\u003E";
;pug_debug_line = 32;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 32;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "&copy;2019 Troop 151\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Ffooter\u003E";
;pug_debug_line = 40;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
if (scripts == 'foxycart') {
pug_html = pug_html + "\u003C!-- FOXYCART --\u003E\n\u003Cscript data-cfasync=\"false\" src=\"https:\u002F\u002Fcdn.foxycart.com\u002Ft151\u002Floader.js\" async defer\u003E\u003C\u002Fscript\u003E\n\u003C!-- \u002FFOXYCART --\u003E\n";
}
pug_html = pug_html + "\u003C\u002Fbody\u003E\u003C\u002Fhtml\u003E";} catch (err) {pug.rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;};
module.exports = template;
});

;require.register("assets/resources.pug", function(exports, require, module) {
function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"app\u002Fassets\u002Fresources.pug":"extends partials\u002F_layout\n\nblock vars\n  -var pageTitle = 'Tools and Resources'\n  -var pageDesc = 'Links to forms, websites, and resources that help make Troop 151 go'\n  -var mastheadImg ='tools.jpg'\n\nblock masthead\n  h1 Tools and Resources\n  p The forms, websites and other resources that help things go.\n\nblock content\n  .prose-page\n    #toc.toc\n      h1 Table of Contents\n      ul\n        li: a(href='#essentials') Essentials\n        li: a(href='#training') Training and Background Checks\n        li: a(href='#trips') Trip planning and Packing\n        li: a(href='#others') Other councils and websites\n\n    #essentials.tool-section\n      h1 Essentials\n      h2 The most frequently used resources are here.\n      dl\n        dt: a(href='https:\u002F\u002Fwww.scoutbook.com\u002Fmobile' target='_blank') Scoutbook\n        dd Scoutbook is our tool that manages advancement, finances and our calendar. A login is required.\n        dt: a(href='https:\u002F\u002Fwww.scoutbook.com\u002Fmobile\u002Freferences\u002Fboy-scouting\u002F' target='blank') Requirements\n        dd BSA requirements for all ranks, awards, and merit badges. This is also on Scoutbook.\n        dt: a(href='http:\u002F\u002Fmy.scouting.org' target='_blank') myScouting Tools\n        dd.\n          The main portal of the BSA. Take YPT and other training here. There are other\n          tools that will show depending on your official position in the BSA.\n        dt: a(href='http:\u002F\u002Fwww.scouting.org\u002Fscoutsource\u002FHealthandSafety\u002Fahmr.aspx' target='_blank') BSA Medical Forms\n        dd.\n          Medical forms are required for all participants at Scouting events. Forms are valid for\n          one year.\n        dd.\n          The link above has the different medical forms for each class of event, and\n          a description of when you need each one.\n        dt: a(href='http:\u002F\u002Fscoutstuff.com\u002F' target='_blank') The Scout Shop\n        dd.\n          Online home of the BSA's official supply division.\n        dt: a(href='http:\u002F\u002Fcolbsa.org' target='_blank') Cradle of Liberty Council\n        dd.\n          Our Council's homepage, with information about what is going on in our local\n          Scouting community.\n        dt: a(href='https:\u002F\u002Fwww.facebook.com\u002Fgroups\u002FTroop151Broomall\u002F' target='_blank') Facebook Group\n        dd.\n          The Troop 151 Facebook group. This is a closed group for current members only.\n        dt: a(href='https:\u002F\u002Fgithub.com\u002Fcpilko\u002FTroop151\u002F' target='_blank') GitHub\n        dd.\n          GitHub hosts this website, and some other documents.\n\n    #training.tool-section\n      h1 Training Resources\n      h2 Training resources and background check information.\n      h2 To be a Volunteer in the BSA, you need all of the following:\n      dl\n        dt Youth Protection Training\n        dd.\n          YPT is required every two years. To take this, login to\n          #[a(href='http:\u002F\u002Fmy.scouting.org' target='_blank') myScouting.org].\n          There is a large, red link for YPT on the home screen.\n        dt PA Criminal Background Checks\n        dd.\n          Complete this on the #[a(href='https:\u002F\u002Fepatch.state.pa.us\u002FHome.jsp' target='_blank') ePATCH]\n          website. Required every 3 years for all volunteers who work with youth in PA.\n        dd Free.\n        dt PA Child Abuse Clearance\n        dd.\n          Complete this on the #[a(href='https:\u002F\u002Fwww.compass.state.pa.us\u002Fcwis\u002Fpublic\u002Fhome' target=_blank) CWIS]\n          website. Required every 3 years for all volunteers who work with youth in PA.\n        dd Free.\n        dt FBI Fingerprint Check\n        dd.\n          Only required if you have not been a resident of PA for the last 10 years, but\n          most school districts require it for all volunteers. Begin the process online\n          at the #[a(href='https:\u002F\u002Fwww.pa.cogentid.com\u002Findex_dpwNew.htm' target='blank') Cogent]\n          website.\n        dd Fingerprint checks are done at UPS stores. There is a list when you register.\n        dd Fee is $28 and must be paid online.\n        dt Disclosure Statement\n        dd.\n          Complete #[a(href='http:\u002F\u002Fkeepkidssafe.pa.gov\u002Fcs\u002Fgroups\u002Fwebcontent\u002Fdocuments\u002Fdocument\u002Fc_160267.pdf') this disclosure statement]\n          and submit this with your paperwork.\n        dt Upload to the COL Website\n        dd.\n          After you receive PDF certificates for all the above items,\n          #[a(href='http:\u002F\u002Fow.ly\u002FMBGOE' target='_blank') upload them here]. This sends\n          them to the Cradle of Liberty Council who needs to keep them on record.\n        dt Email to Marple Pres\n        dd.\n          Marple Pres \"owns\" our troop, so they need a copy too.\n        dt Position Specific Training\n        dd.\n          To remain on the charter in our Council, you must be fully trained for\n          your position according to the BSA. Login to #[a(href='http:\u002F\u002Fmy.scouting.org' target='_blank') myScouting.org]\n          and visit \"My Dashboard\" to review your current training status, and take the online courses you need.\n        dd Some courses require in-person training.\n        dt PA Mandated Reporter Training\n        dd.\n          In certain people who work with youth have been nominated as \"Mandated Reporters\" &emdash;\n          meaning there are civil and criminal penalties if you witness an\n          act of child abuse and fail to report it.\n        dd.\n          Most Scouting volunteers qualify as mandated reporters. Others are \"Permissive Reporters.\"\n        dd.\n          Want to know what is expected of you as a mandated or permissive reporter?\n          Take #[a(href='https:\u002F\u002Fwww.reportabusepa.pitt.edu\u002Fwebapps\u002Fportal\u002Fexecute\u002Ftabs\u002FtabAction?tab_tab_group_id=_2_1' target='_blank') Mandated Reporter Training].\n        dd The course is free, but takes about 3 hours.\n\n    #trips.tool-section\n      h1 Trip Planning and Packing\n      p TODO create content for trip planning and packing\n\n    #others.tool-section\n      h1 Other Resources and Websites\n      p TODO create content for other resources and websites\n","app\u002Fassets\u002Fpartials\u002F_layout.pug":"include _mixins.pug\r\n\r\nblock vars\r\n  -var pageTitle = 'Layout'\r\n  -var pageDesc = 'Description of this page'\r\n  -var pageFile = 'index'\r\n  -var scripts = ''\r\n\r\nif mastheadImg\r\n  -var mastheadImgUrl = '.\u002Fimg\u002Fmastheads\u002F' + mastheadImg\r\nelse\r\n  -var mastheadImgUrl = '.\u002Fimg\u002Fmastheads\u002Fmasthead_img.jpg'\r\n\r\ndoctype html\r\nhtml(prefix='og: http:\u002F\u002Fogp.me\u002Fns#', lang='en')\r\n  head\r\n    include _head.pug\r\n\r\n  body\r\n    #main\r\n      header\r\n        include _top_nav.pug\r\n        section#masthead(style='background: no-repeat center\u002Fcover url('+mastheadImgUrl+')')\r\n          .masthead-content\r\n            block masthead\r\n              h1 Troop 151, Broomall PA\r\n              p A Scout-Led Troop\r\n              p Chartered to Marple Presbyterian Church\r\n\r\n      #content\r\n        block content\r\n        article#contact\r\n          header\r\n            h1 Contact Us\r\n          #contact-form\r\n            include _contact.pug\r\n\r\n    include _foot.pug\r\n\r\n    if scripts == 'foxycart'\r\n      include _foxycart.html\r\n","app\u002Fassets\u002Fpartials\u002F_mixins.pug":"mixin linkbutton(link, text)\n  .more-div\n    span.more-wrap\n      a(href=link, class='more-button')= text\n\nmixin eventItem(title, eventImage)\n  .event-gallery\n    img(src='.\u002Fimg\u002Fevents\u002F'+eventImage)\n    .background-shade\n      .event-desc\n        h4= title\n        block\n\nmixin leader(name, title, profileImage)\n  .leader-gallery\n    if profileImage\n      img(src='.\u002Fimg\u002Fleaders\u002F'+profileImage)\n    else\n      img(src='.\u002Fimg\u002Fleaders\u002Fno-photo.png')\n    p.leader_name= name\n    p.leader_title= title\n\nmixin eagle(name, year)\n  .eagle-gallery\n    .eagle-logo\n      img(src='.\u002Fimg\u002Feagle_badge.gif')\n    .eagle-data\n      p.eagle-name= name\n      p.eagle-year= year\n      \nmixin foxyitem(name, price, image, code, option_name, ...options)\n  .item-card(id= code)\n    .item-card-info\n      .item-image\n        img(src=image)\n      .item-data\n        .item-data-head\n          p.item-name= name\n          p.item-price= '$' + price.toFixed(2)\n        .item-description\n          if block\n            block\n        .item-form\n          form(action='https:\u002F\u002Ft151.foxycart.com\u002Fcart', method='post', accept-charset='utf-8' id= code + '_form')\n            input(type='hidden', name='name', value= name)\n            input(type='hidden', name='price', value= price)\n            input(type='hidden', name='code', value= code)\n            input(type='hidden', name='category', value='Poinsettia_Sale')\n            -var date = new Date('2019-11-17T23:59:00')\n            input(type='hidden', name='expires', value= Math.floor(date.getTime()\u002F1000))\n            input(type='number', name='quantity' value=1, min=0)\n            if option_name\n              -var on = option_name.charAt(0).toUpperCase() + option_name.slice(1)\n              label.option_label= on\n              select(name= option_name)\n                each item in options\n                  -var it = item.charAt(0).toUpperCase()+item.slice(1)\n                  option(value= it +'{c+' + it.charAt(0) +'}') #{it}\n            input.submit(type='submit', value=`Add ${name} to Cart`)\n            ","app\u002Fassets\u002Fpartials\u002F_head.pug":"meta(charset='utf-8')\nmeta(http-equiv='X-UA-Compatible', content='IE=edge')\nmeta(name='description', content= pageDesc)\nmeta(name='author', content= \"Troop 151 Broomall, PA\")\nmeta(name=\"viewport\" content=\"width=device-width, initial-scale=1\")\n\nmeta(property=\"og:title\", content= pageTitle)\nmeta(property=\"og:description\", content= pageDesc)\nmeta(property=\"og:type\", content=\"website\")\nmeta(property=\"og:url\", content=\"https:\u002F\u002Ft151.org\u002F\" + pageFile + '.html' )\nmeta(property=\"og:image\", content= mastheadImgUrl)\nmeta(property=\"og:image:width\", content=\"3264\")\nmeta(property=\"og:image:height\", content=\"2448\")\n\ninclude _favicon.pug\n\nlink(href=\"app.css\", rel=\"stylesheet\", type=\"text\u002Fcss\")\n","app\u002Fassets\u002Fpartials\u002F_favicon.pug":"\u002F\u002F- Generated at https:\u002F\u002Frealfavicongenerator.net\u002F\r\nlink(rel=\"apple-touch-icon\", sizes=\"180x180\", href=\"\u002Fimg\u002Ffavicon\u002Fapple-touch-icon.png\")\r\nlink(rel=\"icon\", type=\"image\u002Fpng\", sizes=\"32x32\", href=\"\u002Fimg\u002Ffavicon\u002Ffavicon-32x32.png\")\r\nlink(rel=\"icon\", type=\"image\u002Fpng\", sizes=\"16x16\", href=\"\u002Fimg\u002Ffavicon\u002Ffavicon-16x16.png\")\r\nlink(rel=\"manifest\", href=\"\u002Fimg\u002Ffavicon\u002Fsite.webmanifest\")\r\nlink(rel=\"mask-icon\", href=\"\u002Fimg\u002Ffavicon\u002Fsafari-pinned-tab.svg\", color=\"#5bbad5\")\r\nmeta(name=\"apple-mobile-web-app-title\", content=\"Troop 151\")\r\nmeta(name=\"application-name\", content=\"Troop 151\")\r\nmeta(name=\"msapplication-TileColor\", content=\"#da532c\")\r\nmeta(name=\"theme-color\", content=\"#da532c\")\r\n","app\u002Fassets\u002Fpartials\u002F_top_nav.pug":"nav#top_nav\r\n  h1 Troop 151\r\n  ul\r\n    li: a(href='.\u002Findex.html') &#127968;\r\n    li: a(href='#footer') &#x2630;\r\n","app\u002Fassets\u002Fpartials\u002F_contact.pug":"form(\n  action='https:\u002F\u002Fapp.99inbound.com\u002Fapi\u002Fe\u002FqnSf2KrH'\n  method='POST'\n)\n  .col-wrap\n    .formcol\n      .form\n        label(for='name') Name:\n        input(\n          type='text'\n          name='name'\n          id='name'\n          placeholder='Joe Smith'\n          required\n          autocomplete='name'\n        )\n      .form\n        label(for='__replyto') Email:\n        input(\n          type='email'\n          name='__replyto'\n          id='__replyto'\n          placeholder='jsmith@example.com'\n          required\n          autocomplete='email'\n        )\n      .form\n        label(for='phone') Phone:\n        input(\n          type='tel'\n          name='phone'\n          id='phone'\n          placeholder='610-555-1212'\n          autocomplete='tel'\n        )\n    .formcol\n      .form\n        label(for='message') Message:\n        textarea(\n          name='message'\n          id='message'\n          placeholder='Your message here'\n          minlength=20\n          rows=6\n          cols=20\n        )\n  input(\n    type='hidden'\n    name='__redirect'\n    id='__redirect'\n    value=''\n  )\n  input(\n    type='hidden'\n    name='__subject'\n    id='__subject'\n    value='Troop 151 Website Contact'\n  )\n  \u003Cdiv style=\"position: absolute; left: -5000px;\"\u003E\n  \u003Cinput type=\"checkbox\" name=\"conservative_cornflower_blue_matte_headphones\" value=\"1\" tabindex=\"-1\" autocomplete=\"no\"\u003E\n  \u003C\u002Fdiv\u003E\n  input(\n    type='submit'\n    id='form_submit'\n    value='Send Message'\n  )\nscript.\n  var r = document.getElementById('__redirect')\n  var s = window.location.href\n  if (s.indexOf('.html') !== -1 ) {\n    var re = \u002F(.+\\\u002F)(.+\\.html?$)\u002Fi\n    r.value = s.replace(re, '$1') + 'thankyou.html'\n  } else {\n    r.value = s + 'thankyou.html'\n  }\n","app\u002Fassets\u002Fpartials\u002F_foot.pug":"-var now = new Date()\r\n-var expires = new Date('2019-11-17T23:59:00')\r\nfooter#footer\r\n  .col-wrap\r\n    .col-thirds\r\n      img(src='.\u002Fimg\u002F151-patch.png').foot-img\r\n      a(href='https:\u002F\u002Fmy.bsa.us\u002F525taa0151mb' target='_blank').join-button Join Now\r\n    .col-thirds\r\n      h4 Troop 151, BSA\r\n      p: a(href='http:\u002F\u002Fcubpack151.org\u002F' target='_blank') Pack 151\r\n      p Crew 151\r\n      h4 Chartered To\r\n      p: a(href='http:\u002F\u002Fmarplepres.org\u002F' target='_blank') Marple Presbyterian Church\r\n      p 150 North Sproul Road\r\n      p Broomall, PA 19008\r\n      h4 Affiliated With\r\n      p: a(href='http:\u002F\u002Fcolbsa.org\u002Fconstellation\u002F') Constellation District\r\n      p: a(href='http:\u002F\u002Fcolbsa.org\u002F' target='_blank') Cradle of Liberty Council\r\n      p: a(href='http:\u002F\u002Fscouting.org\u002F' target='_blank') Boy Scouts of America\r\n    .col-thirds\r\n      h4 Site Map\r\n      ul.foot-nav\r\n        li: a(href='.\u002Findex.html') Home\r\n        li: a(href='.\u002Fabout.html') About Us\r\n        if now \u003C= expires\r\n          li: a(href='.\u002Fpoinsettias.html') Support Us\r\n        else\r\n          li: a(href='.\u002Fsupport.html') Support Us\r\n        li: a(href='.\u002Fresources.html') Tools and Resources\r\n        li: a(href='.\u002Fterms.html') Terms and Privacy Policy\r\n  .foot-end\r\n    p &copy;2019 Troop 151\r\n","app\u002Fassets\u002Fpartials\u002F_foxycart.html":"\u003C!-- FOXYCART --\u003E\n\u003Cscript data-cfasync=\"false\" src=\"https:\u002F\u002Fcdn.foxycart.com\u002Ft151\u002Floader.js\" async defer\u003E\u003C\u002Fscript\u003E\n\u003C!-- \u002FFOXYCART --\u003E\n"};
;var locals_for_with = (locals || {});(function (_blank, pageFile, scripts) {;pug_debug_line = 1;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";











;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";


















;pug_debug_line = 14;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";






















;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";



















;pug_debug_line = 31;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";






















































































;pug_debug_line = 3;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
var pageTitle = 'Tools and Resources'
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
var pageDesc = 'Links to forms, websites, and resources that help make Troop 151 go'
;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
var mastheadImg ='tools.jpg'
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
if (mastheadImg) {
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
var mastheadImgUrl = './img/mastheads/' + mastheadImg
}
else {
;pug_debug_line = 12;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
var mastheadImgUrl = './img/mastheads/masthead_img.jpg'
}
;pug_debug_line = 14;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003C!DOCTYPE html\u003E";
;pug_debug_line = 15;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Chtml prefix=\"og: http:\u002F\u002Fogp.me\u002Fns#\" lang=\"en\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Chead\u003E";
;pug_debug_line = 1;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta charset=\"utf-8\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta" + (" name=\"description\""+pug.attr("content", pageDesc, true, true)) + "\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta name=\"author\" content=\"Troop 151 Broomall, PA\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta" + (" property=\"og:title\""+pug.attr("content", pageTitle, true, true)) + "\u003E";
;pug_debug_line = 8;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta" + (" property=\"og:description\""+pug.attr("content", pageDesc, true, true)) + "\u003E";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta property=\"og:type\" content=\"website\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta" + (" property=\"og:url\""+pug.attr("content", "https://t151.org/" + pageFile + '.html', true, true)) + "\u003E";
;pug_debug_line = 11;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta" + (" property=\"og:image\""+pug.attr("content", mastheadImgUrl, true, true)) + "\u003E";
;pug_debug_line = 12;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta property=\"og:image:width\" content=\"3264\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta property=\"og:image:height\" content=\"2448\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Clink rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"\u002Fimg\u002Ffavicon\u002Fapple-touch-icon.png\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Clink rel=\"icon\" type=\"image\u002Fpng\" sizes=\"32x32\" href=\"\u002Fimg\u002Ffavicon\u002Ffavicon-32x32.png\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Clink rel=\"icon\" type=\"image\u002Fpng\" sizes=\"16x16\" href=\"\u002Fimg\u002Ffavicon\u002Ffavicon-16x16.png\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Clink rel=\"manifest\" href=\"\u002Fimg\u002Ffavicon\u002Fsite.webmanifest\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Clink rel=\"mask-icon\" href=\"\u002Fimg\u002Ffavicon\u002Fsafari-pinned-tab.svg\" color=\"#5bbad5\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Cmeta name=\"apple-mobile-web-app-title\" content=\"Troop 151\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Cmeta name=\"application-name\" content=\"Troop 151\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Cmeta name=\"msapplication-TileColor\" content=\"#da532c\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Cmeta name=\"theme-color\" content=\"#da532c\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Clink href=\"app.css\" rel=\"stylesheet\" type=\"text\u002Fcss\"\u003E\u003C\u002Fhead\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cbody\u003E";
;pug_debug_line = 20;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cdiv id=\"main\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cheader\u003E";
;pug_debug_line = 1;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Cnav id=\"top_nav\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 2;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "Troop 151\u003C\u002Fh1\u003E";
;pug_debug_line = 3;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Cul\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Findex.html\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "&#127968;\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Ca href=\"#footer\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "&#x2630;\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fnav\u003E";
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Csection" + (" id=\"masthead\""+pug.attr("style", pug.style('background: no-repeat center/cover url('+mastheadImgUrl+')'), true, true)) + "\u003E";
;pug_debug_line = 24;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cdiv class=\"masthead-content\"\u003E";
;pug_debug_line = 25;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "Tools and Resources\u003C\u002Fh1\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "The forms, websites and other resources that help things go.\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fsection\u003E\u003C\u002Fheader\u003E";
;pug_debug_line = 30;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cdiv id=\"content\"\u003E";
;pug_debug_line = 31;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
;pug_debug_line = 13;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdiv class=\"prose-page\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdiv class=\"toc\" id=\"toc\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 15;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "Table of Contents\u003C\u002Fh1\u003E";
;pug_debug_line = 16;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cul\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Ca href=\"#essentials\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "Essentials\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Ca href=\"#training\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "Training and Background Checks\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Ca href=\"#trips\"\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "Trip planning and Packing\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 20;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 20;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Ca href=\"#others\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "Other councils and websites\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 22;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdiv class=\"tool-section\" id=\"essentials\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "Essentials\u003C\u002Fh1\u003E";
;pug_debug_line = 24;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Ch2\u003E";
;pug_debug_line = 24;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "The most frequently used resources are here.\u003C\u002Fh2\u003E";
;pug_debug_line = 25;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdl\u003E";
;pug_debug_line = 26;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdt\u003E";
;pug_debug_line = 26;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Ca href=\"https:\u002F\u002Fwww.scoutbook.com\u002Fmobile\" target=\"_blank\"\u003E";
;pug_debug_line = 26;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "Scoutbook\u003C\u002Fa\u003E\u003C\u002Fdt\u003E";
;pug_debug_line = 27;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdd\u003E";
;pug_debug_line = 27;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "Scoutbook is our tool that manages advancement, finances and our calendar. A login is required.\u003C\u002Fdd\u003E";
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdt\u003E";
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Ca href=\"https:\u002F\u002Fwww.scoutbook.com\u002Fmobile\u002Freferences\u002Fboy-scouting\u002F\" target=\"blank\"\u003E";
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "Requirements\u003C\u002Fa\u003E\u003C\u002Fdt\u003E";
;pug_debug_line = 29;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdd\u003E";
;pug_debug_line = 29;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "BSA requirements for all ranks, awards, and merit badges. This is also on Scoutbook.\u003C\u002Fdd\u003E";
;pug_debug_line = 30;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdt\u003E";
;pug_debug_line = 30;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Ca href=\"http:\u002F\u002Fmy.scouting.org\" target=\"_blank\"\u003E";
;pug_debug_line = 30;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "myScouting Tools\u003C\u002Fa\u003E\u003C\u002Fdt\u003E";
;pug_debug_line = 31;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdd\u003E";
;pug_debug_line = 32;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "The main portal of the BSA. Take YPT and other training here. There are other";
;pug_debug_line = 33;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 33;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "tools that will show depending on your official position in the BSA.\u003C\u002Fdd\u003E";
;pug_debug_line = 34;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdt\u003E";
;pug_debug_line = 34;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Ca href=\"http:\u002F\u002Fwww.scouting.org\u002Fscoutsource\u002FHealthandSafety\u002Fahmr.aspx\" target=\"_blank\"\u003E";
;pug_debug_line = 34;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "BSA Medical Forms\u003C\u002Fa\u003E\u003C\u002Fdt\u003E";
;pug_debug_line = 35;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdd\u003E";
;pug_debug_line = 36;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "Medical forms are required for all participants at Scouting events. Forms are valid for";
;pug_debug_line = 37;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 37;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "one year.\u003C\u002Fdd\u003E";
;pug_debug_line = 38;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdd\u003E";
;pug_debug_line = 39;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "The link above has the different medical forms for each class of event, and";
;pug_debug_line = 40;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 40;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "a description of when you need each one.\u003C\u002Fdd\u003E";
;pug_debug_line = 41;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdt\u003E";
;pug_debug_line = 41;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Ca href=\"http:\u002F\u002Fscoutstuff.com\u002F\" target=\"_blank\"\u003E";
;pug_debug_line = 41;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "The Scout Shop\u003C\u002Fa\u003E\u003C\u002Fdt\u003E";
;pug_debug_line = 42;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdd\u003E";
;pug_debug_line = 43;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "Online home of the BSA's official supply division.\u003C\u002Fdd\u003E";
;pug_debug_line = 44;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdt\u003E";
;pug_debug_line = 44;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Ca href=\"http:\u002F\u002Fcolbsa.org\" target=\"_blank\"\u003E";
;pug_debug_line = 44;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "Cradle of Liberty Council\u003C\u002Fa\u003E\u003C\u002Fdt\u003E";
;pug_debug_line = 45;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdd\u003E";
;pug_debug_line = 46;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "Our Council's homepage, with information about what is going on in our local";
;pug_debug_line = 47;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 47;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "Scouting community.\u003C\u002Fdd\u003E";
;pug_debug_line = 48;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdt\u003E";
;pug_debug_line = 48;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Ca href=\"https:\u002F\u002Fwww.facebook.com\u002Fgroups\u002FTroop151Broomall\u002F\" target=\"_blank\"\u003E";
;pug_debug_line = 48;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "Facebook Group\u003C\u002Fa\u003E\u003C\u002Fdt\u003E";
;pug_debug_line = 49;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdd\u003E";
;pug_debug_line = 50;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "The Troop 151 Facebook group. This is a closed group for current members only.\u003C\u002Fdd\u003E";
;pug_debug_line = 51;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdt\u003E";
;pug_debug_line = 51;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Ca href=\"https:\u002F\u002Fgithub.com\u002Fcpilko\u002FTroop151\u002F\" target=\"_blank\"\u003E";
;pug_debug_line = 51;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "GitHub\u003C\u002Fa\u003E\u003C\u002Fdt\u003E";
;pug_debug_line = 52;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdd\u003E";
;pug_debug_line = 53;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "GitHub hosts this website, and some other documents.";
;pug_debug_line = 54;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 54;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003C\u002Fdd\u003E\u003C\u002Fdl\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 55;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdiv class=\"tool-section\" id=\"training\"\u003E";
;pug_debug_line = 56;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 56;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "Training Resources\u003C\u002Fh1\u003E";
;pug_debug_line = 57;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Ch2\u003E";
;pug_debug_line = 57;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "Training resources and background check information.\u003C\u002Fh2\u003E";
;pug_debug_line = 58;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Ch2\u003E";
;pug_debug_line = 58;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "To be a Volunteer in the BSA, you need all of the following:\u003C\u002Fh2\u003E";
;pug_debug_line = 59;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdl\u003E";
;pug_debug_line = 60;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdt\u003E";
;pug_debug_line = 60;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "Youth Protection Training\u003C\u002Fdt\u003E";
;pug_debug_line = 61;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdd\u003E";
;pug_debug_line = 62;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "YPT is required every two years. To take this, login to";
;pug_debug_line = 63;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 63;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "";
;pug_debug_line = 63;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Ca href=\"http:\u002F\u002Fmy.scouting.org\" target=\"_blank\"\u003E";
;pug_debug_line = 63;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "myScouting.org\u003C\u002Fa\u003E";
;pug_debug_line = 63;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + ".";
;pug_debug_line = 64;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 64;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "There is a large, red link for YPT on the home screen.\u003C\u002Fdd\u003E";
;pug_debug_line = 65;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdt\u003E";
;pug_debug_line = 65;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "PA Criminal Background Checks\u003C\u002Fdt\u003E";
;pug_debug_line = 66;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdd\u003E";
;pug_debug_line = 67;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "Complete this on the ";
;pug_debug_line = 67;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Ca href=\"https:\u002F\u002Fepatch.state.pa.us\u002FHome.jsp\" target=\"_blank\"\u003E";
;pug_debug_line = 67;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "ePATCH\u003C\u002Fa\u003E";
;pug_debug_line = 67;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "";
;pug_debug_line = 68;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 68;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "website. Required every 3 years for all volunteers who work with youth in PA.\u003C\u002Fdd\u003E";
;pug_debug_line = 69;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdd\u003E";
;pug_debug_line = 69;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "Free.\u003C\u002Fdd\u003E";
;pug_debug_line = 70;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdt\u003E";
;pug_debug_line = 70;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "PA Child Abuse Clearance\u003C\u002Fdt\u003E";
;pug_debug_line = 71;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdd\u003E";
;pug_debug_line = 72;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "Complete this on the ";
;pug_debug_line = 72;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Ca" + (" href=\"https:\u002F\u002Fwww.compass.state.pa.us\u002Fcwis\u002Fpublic\u002Fhome\""+pug.attr("target", _blank, true, true)) + "\u003E";
;pug_debug_line = 72;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "CWIS\u003C\u002Fa\u003E";
;pug_debug_line = 72;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "";
;pug_debug_line = 73;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 73;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "website. Required every 3 years for all volunteers who work with youth in PA.\u003C\u002Fdd\u003E";
;pug_debug_line = 74;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdd\u003E";
;pug_debug_line = 74;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "Free.\u003C\u002Fdd\u003E";
;pug_debug_line = 75;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdt\u003E";
;pug_debug_line = 75;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "FBI Fingerprint Check\u003C\u002Fdt\u003E";
;pug_debug_line = 76;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdd\u003E";
;pug_debug_line = 77;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "Only required if you have not been a resident of PA for the last 10 years, but";
;pug_debug_line = 78;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 78;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "most school districts require it for all volunteers. Begin the process online";
;pug_debug_line = 79;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 79;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "at the ";
;pug_debug_line = 79;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Ca href=\"https:\u002F\u002Fwww.pa.cogentid.com\u002Findex_dpwNew.htm\" target=\"blank\"\u003E";
;pug_debug_line = 79;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "Cogent\u003C\u002Fa\u003E";
;pug_debug_line = 79;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "";
;pug_debug_line = 80;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 80;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "website.\u003C\u002Fdd\u003E";
;pug_debug_line = 81;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdd\u003E";
;pug_debug_line = 81;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "Fingerprint checks are done at UPS stores. There is a list when you register.\u003C\u002Fdd\u003E";
;pug_debug_line = 82;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdd\u003E";
;pug_debug_line = 82;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "Fee is $28 and must be paid online.\u003C\u002Fdd\u003E";
;pug_debug_line = 83;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdt\u003E";
;pug_debug_line = 83;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "Disclosure Statement\u003C\u002Fdt\u003E";
;pug_debug_line = 84;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdd\u003E";
;pug_debug_line = 85;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "Complete ";
;pug_debug_line = 85;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Ca href=\"http:\u002F\u002Fkeepkidssafe.pa.gov\u002Fcs\u002Fgroups\u002Fwebcontent\u002Fdocuments\u002Fdocument\u002Fc_160267.pdf\"\u003E";
;pug_debug_line = 85;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "this disclosure statement\u003C\u002Fa\u003E";
;pug_debug_line = 85;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "";
;pug_debug_line = 86;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 86;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "and submit this with your paperwork.\u003C\u002Fdd\u003E";
;pug_debug_line = 87;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdt\u003E";
;pug_debug_line = 87;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "Upload to the COL Website\u003C\u002Fdt\u003E";
;pug_debug_line = 88;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdd\u003E";
;pug_debug_line = 89;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "After you receive PDF certificates for all the above items,";
;pug_debug_line = 90;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 90;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "";
;pug_debug_line = 90;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Ca href=\"http:\u002F\u002Fow.ly\u002FMBGOE\" target=\"_blank\"\u003E";
;pug_debug_line = 90;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "upload them here\u003C\u002Fa\u003E";
;pug_debug_line = 90;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + ". This sends";
;pug_debug_line = 91;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 91;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "them to the Cradle of Liberty Council who needs to keep them on record.\u003C\u002Fdd\u003E";
;pug_debug_line = 92;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdt\u003E";
;pug_debug_line = 92;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "Email to Marple Pres\u003C\u002Fdt\u003E";
;pug_debug_line = 93;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdd\u003E";
;pug_debug_line = 94;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "Marple Pres \"owns\" our troop, so they need a copy too.\u003C\u002Fdd\u003E";
;pug_debug_line = 95;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdt\u003E";
;pug_debug_line = 95;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "Position Specific Training\u003C\u002Fdt\u003E";
;pug_debug_line = 96;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdd\u003E";
;pug_debug_line = 97;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "To remain on the charter in our Council, you must be fully trained for";
;pug_debug_line = 98;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 98;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "your position according to the BSA. Login to ";
;pug_debug_line = 98;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Ca href=\"http:\u002F\u002Fmy.scouting.org\" target=\"_blank\"\u003E";
;pug_debug_line = 98;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "myScouting.org\u003C\u002Fa\u003E";
;pug_debug_line = 98;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "";
;pug_debug_line = 99;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 99;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "and visit \"My Dashboard\" to review your current training status, and take the online courses you need.\u003C\u002Fdd\u003E";
;pug_debug_line = 100;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdd\u003E";
;pug_debug_line = 100;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "Some courses require in-person training.\u003C\u002Fdd\u003E";
;pug_debug_line = 101;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdt\u003E";
;pug_debug_line = 101;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "PA Mandated Reporter Training\u003C\u002Fdt\u003E";
;pug_debug_line = 102;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdd\u003E";
;pug_debug_line = 103;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "In certain people who work with youth have been nominated as \"Mandated Reporters\" &emdash;";
;pug_debug_line = 104;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 104;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "meaning there are civil and criminal penalties if you witness an";
;pug_debug_line = 105;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 105;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "act of child abuse and fail to report it.\u003C\u002Fdd\u003E";
;pug_debug_line = 106;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdd\u003E";
;pug_debug_line = 107;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "Most Scouting volunteers qualify as mandated reporters. Others are \"Permissive Reporters.\"\u003C\u002Fdd\u003E";
;pug_debug_line = 108;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdd\u003E";
;pug_debug_line = 109;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "Want to know what is expected of you as a mandated or permissive reporter?";
;pug_debug_line = 110;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 110;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "Take ";
;pug_debug_line = 110;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Ca href=\"https:\u002F\u002Fwww.reportabusepa.pitt.edu\u002Fwebapps\u002Fportal\u002Fexecute\u002Ftabs\u002FtabAction?tab_tab_group_id=_2_1\" target=\"_blank\"\u003E";
;pug_debug_line = 110;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "Mandated Reporter Training\u003C\u002Fa\u003E";
;pug_debug_line = 110;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + ".\u003C\u002Fdd\u003E";
;pug_debug_line = 111;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdd\u003E";
;pug_debug_line = 111;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "The course is free, but takes about 3 hours.\u003C\u002Fdd\u003E\u003C\u002Fdl\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 113;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdiv class=\"tool-section\" id=\"trips\"\u003E";
;pug_debug_line = 114;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 114;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "Trip Planning and Packing\u003C\u002Fh1\u003E";
;pug_debug_line = 115;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 115;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "TODO create content for trip planning and packing\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 117;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cdiv class=\"tool-section\" id=\"others\"\u003E";
;pug_debug_line = 118;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 118;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "Other Resources and Websites\u003C\u002Fh1\u003E";
;pug_debug_line = 119;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 119;pug_debug_filename = "app\u002Fassets\u002Fresources.pug";
pug_html = pug_html + "TODO create content for other resources and websites\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 32;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Carticle id=\"contact\"\u003E";
;pug_debug_line = 33;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cheader\u003E";
;pug_debug_line = 34;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 34;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "Contact Us\u003C\u002Fh1\u003E\u003C\u002Fheader\u003E";
;pug_debug_line = 35;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cdiv id=\"contact-form\"\u003E";
;pug_debug_line = 1;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cform action=\"https:\u002F\u002Fapp.99inbound.com\u002Fapi\u002Fe\u002FqnSf2KrH\" method=\"POST\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-wrap\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"formcol\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"form\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Clabel for=\"name\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "Name:\u003C\u002Flabel\u003E";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cinput type=\"text\" name=\"name\" id=\"name\" placeholder=\"Joe Smith\" required autocomplete=\"name\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"form\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Clabel for=\"__replyto\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "Email:\u003C\u002Flabel\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cinput type=\"email\" name=\"__replyto\" id=\"__replyto\" placeholder=\"jsmith@example.com\" required autocomplete=\"email\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 27;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"form\"\u003E";
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Clabel for=\"phone\"\u003E";
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "Phone:\u003C\u002Flabel\u003E";
;pug_debug_line = 29;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cinput type=\"tel\" name=\"phone\" id=\"phone\" placeholder=\"610-555-1212\" autocomplete=\"tel\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 36;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"formcol\"\u003E";
;pug_debug_line = 37;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"form\"\u003E";
;pug_debug_line = 38;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Clabel for=\"message\"\u003E";
;pug_debug_line = 38;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "Message:\u003C\u002Flabel\u003E";
;pug_debug_line = 39;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Ctextarea name=\"message\" id=\"message\" placeholder=\"Your message here\" minlength=\"20\" rows=\"6\" cols=\"20\"\u003E\u003C\u002Ftextarea\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 47;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cinput type=\"hidden\" name=\"__redirect\" id=\"__redirect\" value=\"\"\u003E";
;pug_debug_line = 53;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cinput type=\"hidden\" name=\"__subject\" id=\"__subject\" value=\"Troop 151 Website Contact\"\u003E";
;pug_debug_line = 59;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv style=\"position: absolute; left: -5000px;\"\u003E\n\u003Cinput type=\"checkbox\" name=\"conservative_cornflower_blue_matte_headphones\" value=\"1\" tabindex=\"-1\" autocomplete=\"no\"\u003E\n\u003C\u002Fdiv\u003E";
;pug_debug_line = 62;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cinput type=\"submit\" id=\"form_submit\" value=\"Send Message\"\u003E\u003C\u002Fform\u003E";
;pug_debug_line = 67;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cscript\u003E";
;pug_debug_line = 68;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "var r = document.getElementById('__redirect')";
;pug_debug_line = 69;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 69;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "var s = window.location.href";
;pug_debug_line = 70;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 70;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "if (s.indexOf('.html') !== -1 ) {";
;pug_debug_line = 71;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 71;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "  var re = \u002F(.+\\\u002F)(.+\\.html?$)\u002Fi";
;pug_debug_line = 72;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 72;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "  r.value = s.replace(re, '$1') + 'thankyou.html'";
;pug_debug_line = 73;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 73;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "} else {";
;pug_debug_line = 74;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 74;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "  r.value = s + 'thankyou.html'";
;pug_debug_line = 75;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 75;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "}\u003C\u002Fscript\u003E\u003C\u002Fdiv\u003E\u003C\u002Farticle\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 1;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
var now = new Date()
;pug_debug_line = 2;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
var expires = new Date('2019-11-17T23:59:00')
;pug_debug_line = 3;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cfooter id=\"footer\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-wrap\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-thirds\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cimg class=\"foot-img\" src=\".\u002Fimg\u002F151-patch.png\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca class=\"join-button\" href=\"https:\u002F\u002Fmy.bsa.us\u002F525taa0151mb\" target=\"_blank\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Join Now\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 8;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-thirds\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Troop 151, BSA\u003C\u002Fh4\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\"http:\u002F\u002Fcubpack151.org\u002F\" target=\"_blank\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Pack 151\u003C\u002Fa\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 11;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 11;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Crew 151\u003C\u002Fp\u003E";
;pug_debug_line = 12;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 12;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Chartered To\u003C\u002Fh4\u003E";
;pug_debug_line = 13;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 13;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\"http:\u002F\u002Fmarplepres.org\u002F\" target=\"_blank\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Marple Presbyterian Church\u003C\u002Fa\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 14;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 14;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "150 North Sproul Road\u003C\u002Fp\u003E";
;pug_debug_line = 15;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 15;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Broomall, PA 19008\u003C\u002Fp\u003E";
;pug_debug_line = 16;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 16;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Affiliated With\u003C\u002Fh4\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\"http:\u002F\u002Fcolbsa.org\u002Fconstellation\u002F\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Constellation District\u003C\u002Fa\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\"http:\u002F\u002Fcolbsa.org\u002F\" target=\"_blank\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Cradle of Liberty Council\u003C\u002Fa\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\"http:\u002F\u002Fscouting.org\u002F\" target=\"_blank\"\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Boy Scouts of America\u003C\u002Fa\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 20;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-thirds\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 21;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Site Map\u003C\u002Fh4\u003E";
;pug_debug_line = 22;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cul class=\"foot-nav\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Findex.html\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Home\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 24;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 24;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Fabout.html\"\u003E";
;pug_debug_line = 24;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "About Us\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 25;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
if (now <= expires) {
;pug_debug_line = 26;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 26;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Fpoinsettias.html\"\u003E";
;pug_debug_line = 26;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Support Us\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
}
else {
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Fsupport.html\"\u003E";
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Support Us\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
}
;pug_debug_line = 29;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 29;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Fresources.html\"\u003E";
;pug_debug_line = 29;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Tools and Resources\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 30;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 30;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Fterms.html\"\u003E";
;pug_debug_line = 30;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Terms and Privacy Policy\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 31;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cdiv class=\"foot-end\"\u003E";
;pug_debug_line = 32;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 32;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "&copy;2019 Troop 151\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Ffooter\u003E";
;pug_debug_line = 40;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
if (scripts == 'foxycart') {
pug_html = pug_html + "\u003C!-- FOXYCART --\u003E\n\u003Cscript data-cfasync=\"false\" src=\"https:\u002F\u002Fcdn.foxycart.com\u002Ft151\u002Floader.js\" async defer\u003E\u003C\u002Fscript\u003E\n\u003C!-- \u002FFOXYCART --\u003E\n";
}
pug_html = pug_html + "\u003C\u002Fbody\u003E\u003C\u002Fhtml\u003E";}.call(this,"_blank" in locals_for_with?locals_for_with._blank:typeof _blank!=="undefined"?_blank:undefined,"pageFile" in locals_for_with?locals_for_with.pageFile:typeof pageFile!=="undefined"?pageFile:undefined,"scripts" in locals_for_with?locals_for_with.scripts:typeof scripts!=="undefined"?scripts:undefined));} catch (err) {pug.rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;};
module.exports = template;
});

;require.register("assets/support.pug", function(exports, require, module) {
function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"app\u002Fassets\u002Fsupport.pug":"extends partials\u002F_layout\n\nblock vars\n  -var pageTitle = 'Support Troop 151'\n  -var pageDesc = 'Support Scouting in Troop 151.'\n  -var pageFile = \"support\"\n  -var mastheadImg ='support.jpg'\n  -var scripts = 'foxycart'\n\nblock masthead\n  h1 Support Troop 151\n\nblock content\n  article#top\n    header\n      h1 Thank You For Your Support\n    p. \n      Your ongoing support for Troop 151 helps us pay for camps, equipment and supplies to teach\n      our Scouts servant leadership skills in an outdoor setting. Watch for our Poinsettia sale in the\n      fall and our summer flower sale in the spring.\n    p If you would like to support us year-round, you can contribute to our Tip Jar here.\n    \n  article#tips\n    header\n      h1 Tip Jar\n    +foxyitem('Griddle Fund', 1, 'img\u002Fxmas\u002Fgriddle.jpg', 'TIP')\n      ul\n        li Help keep cheesteaks in our campouts!\n        li Give to our griddle fund so that we can get a second griddle to feed our growing Troop of growing Scouts.\n  ","app\u002Fassets\u002Fpartials\u002F_layout.pug":"include _mixins.pug\r\n\r\nblock vars\r\n  -var pageTitle = 'Layout'\r\n  -var pageDesc = 'Description of this page'\r\n  -var pageFile = 'index'\r\n  -var scripts = ''\r\n\r\nif mastheadImg\r\n  -var mastheadImgUrl = '.\u002Fimg\u002Fmastheads\u002F' + mastheadImg\r\nelse\r\n  -var mastheadImgUrl = '.\u002Fimg\u002Fmastheads\u002Fmasthead_img.jpg'\r\n\r\ndoctype html\r\nhtml(prefix='og: http:\u002F\u002Fogp.me\u002Fns#', lang='en')\r\n  head\r\n    include _head.pug\r\n\r\n  body\r\n    #main\r\n      header\r\n        include _top_nav.pug\r\n        section#masthead(style='background: no-repeat center\u002Fcover url('+mastheadImgUrl+')')\r\n          .masthead-content\r\n            block masthead\r\n              h1 Troop 151, Broomall PA\r\n              p A Scout-Led Troop\r\n              p Chartered to Marple Presbyterian Church\r\n\r\n      #content\r\n        block content\r\n        article#contact\r\n          header\r\n            h1 Contact Us\r\n          #contact-form\r\n            include _contact.pug\r\n\r\n    include _foot.pug\r\n\r\n    if scripts == 'foxycart'\r\n      include _foxycart.html\r\n","app\u002Fassets\u002Fpartials\u002F_mixins.pug":"mixin linkbutton(link, text)\n  .more-div\n    span.more-wrap\n      a(href=link, class='more-button')= text\n\nmixin eventItem(title, eventImage)\n  .event-gallery\n    img(src='.\u002Fimg\u002Fevents\u002F'+eventImage)\n    .background-shade\n      .event-desc\n        h4= title\n        block\n\nmixin leader(name, title, profileImage)\n  .leader-gallery\n    if profileImage\n      img(src='.\u002Fimg\u002Fleaders\u002F'+profileImage)\n    else\n      img(src='.\u002Fimg\u002Fleaders\u002Fno-photo.png')\n    p.leader_name= name\n    p.leader_title= title\n\nmixin eagle(name, year)\n  .eagle-gallery\n    .eagle-logo\n      img(src='.\u002Fimg\u002Feagle_badge.gif')\n    .eagle-data\n      p.eagle-name= name\n      p.eagle-year= year\n      \nmixin foxyitem(name, price, image, code, option_name, ...options)\n  .item-card(id= code)\n    .item-card-info\n      .item-image\n        img(src=image)\n      .item-data\n        .item-data-head\n          p.item-name= name\n          p.item-price= '$' + price.toFixed(2)\n        .item-description\n          if block\n            block\n        .item-form\n          form(action='https:\u002F\u002Ft151.foxycart.com\u002Fcart', method='post', accept-charset='utf-8' id= code + '_form')\n            input(type='hidden', name='name', value= name)\n            input(type='hidden', name='price', value= price)\n            input(type='hidden', name='code', value= code)\n            input(type='hidden', name='category', value='Poinsettia_Sale')\n            -var date = new Date('2019-11-17T23:59:00')\n            input(type='hidden', name='expires', value= Math.floor(date.getTime()\u002F1000))\n            input(type='number', name='quantity' value=1, min=0)\n            if option_name\n              -var on = option_name.charAt(0).toUpperCase() + option_name.slice(1)\n              label.option_label= on\n              select(name= option_name)\n                each item in options\n                  -var it = item.charAt(0).toUpperCase()+item.slice(1)\n                  option(value= it +'{c+' + it.charAt(0) +'}') #{it}\n            input.submit(type='submit', value=`Add ${name} to Cart`)\n            ","app\u002Fassets\u002Fpartials\u002F_head.pug":"meta(charset='utf-8')\nmeta(http-equiv='X-UA-Compatible', content='IE=edge')\nmeta(name='description', content= pageDesc)\nmeta(name='author', content= \"Troop 151 Broomall, PA\")\nmeta(name=\"viewport\" content=\"width=device-width, initial-scale=1\")\n\nmeta(property=\"og:title\", content= pageTitle)\nmeta(property=\"og:description\", content= pageDesc)\nmeta(property=\"og:type\", content=\"website\")\nmeta(property=\"og:url\", content=\"https:\u002F\u002Ft151.org\u002F\" + pageFile + '.html' )\nmeta(property=\"og:image\", content= mastheadImgUrl)\nmeta(property=\"og:image:width\", content=\"3264\")\nmeta(property=\"og:image:height\", content=\"2448\")\n\ninclude _favicon.pug\n\nlink(href=\"app.css\", rel=\"stylesheet\", type=\"text\u002Fcss\")\n","app\u002Fassets\u002Fpartials\u002F_favicon.pug":"\u002F\u002F- Generated at https:\u002F\u002Frealfavicongenerator.net\u002F\r\nlink(rel=\"apple-touch-icon\", sizes=\"180x180\", href=\"\u002Fimg\u002Ffavicon\u002Fapple-touch-icon.png\")\r\nlink(rel=\"icon\", type=\"image\u002Fpng\", sizes=\"32x32\", href=\"\u002Fimg\u002Ffavicon\u002Ffavicon-32x32.png\")\r\nlink(rel=\"icon\", type=\"image\u002Fpng\", sizes=\"16x16\", href=\"\u002Fimg\u002Ffavicon\u002Ffavicon-16x16.png\")\r\nlink(rel=\"manifest\", href=\"\u002Fimg\u002Ffavicon\u002Fsite.webmanifest\")\r\nlink(rel=\"mask-icon\", href=\"\u002Fimg\u002Ffavicon\u002Fsafari-pinned-tab.svg\", color=\"#5bbad5\")\r\nmeta(name=\"apple-mobile-web-app-title\", content=\"Troop 151\")\r\nmeta(name=\"application-name\", content=\"Troop 151\")\r\nmeta(name=\"msapplication-TileColor\", content=\"#da532c\")\r\nmeta(name=\"theme-color\", content=\"#da532c\")\r\n","app\u002Fassets\u002Fpartials\u002F_top_nav.pug":"nav#top_nav\r\n  h1 Troop 151\r\n  ul\r\n    li: a(href='.\u002Findex.html') &#127968;\r\n    li: a(href='#footer') &#x2630;\r\n","app\u002Fassets\u002Fpartials\u002F_contact.pug":"form(\n  action='https:\u002F\u002Fapp.99inbound.com\u002Fapi\u002Fe\u002FqnSf2KrH'\n  method='POST'\n)\n  .col-wrap\n    .formcol\n      .form\n        label(for='name') Name:\n        input(\n          type='text'\n          name='name'\n          id='name'\n          placeholder='Joe Smith'\n          required\n          autocomplete='name'\n        )\n      .form\n        label(for='__replyto') Email:\n        input(\n          type='email'\n          name='__replyto'\n          id='__replyto'\n          placeholder='jsmith@example.com'\n          required\n          autocomplete='email'\n        )\n      .form\n        label(for='phone') Phone:\n        input(\n          type='tel'\n          name='phone'\n          id='phone'\n          placeholder='610-555-1212'\n          autocomplete='tel'\n        )\n    .formcol\n      .form\n        label(for='message') Message:\n        textarea(\n          name='message'\n          id='message'\n          placeholder='Your message here'\n          minlength=20\n          rows=6\n          cols=20\n        )\n  input(\n    type='hidden'\n    name='__redirect'\n    id='__redirect'\n    value=''\n  )\n  input(\n    type='hidden'\n    name='__subject'\n    id='__subject'\n    value='Troop 151 Website Contact'\n  )\n  \u003Cdiv style=\"position: absolute; left: -5000px;\"\u003E\n  \u003Cinput type=\"checkbox\" name=\"conservative_cornflower_blue_matte_headphones\" value=\"1\" tabindex=\"-1\" autocomplete=\"no\"\u003E\n  \u003C\u002Fdiv\u003E\n  input(\n    type='submit'\n    id='form_submit'\n    value='Send Message'\n  )\nscript.\n  var r = document.getElementById('__redirect')\n  var s = window.location.href\n  if (s.indexOf('.html') !== -1 ) {\n    var re = \u002F(.+\\\u002F)(.+\\.html?$)\u002Fi\n    r.value = s.replace(re, '$1') + 'thankyou.html'\n  } else {\n    r.value = s + 'thankyou.html'\n  }\n","app\u002Fassets\u002Fpartials\u002F_foot.pug":"-var now = new Date()\r\n-var expires = new Date('2019-11-17T23:59:00')\r\nfooter#footer\r\n  .col-wrap\r\n    .col-thirds\r\n      img(src='.\u002Fimg\u002F151-patch.png').foot-img\r\n      a(href='https:\u002F\u002Fmy.bsa.us\u002F525taa0151mb' target='_blank').join-button Join Now\r\n    .col-thirds\r\n      h4 Troop 151, BSA\r\n      p: a(href='http:\u002F\u002Fcubpack151.org\u002F' target='_blank') Pack 151\r\n      p Crew 151\r\n      h4 Chartered To\r\n      p: a(href='http:\u002F\u002Fmarplepres.org\u002F' target='_blank') Marple Presbyterian Church\r\n      p 150 North Sproul Road\r\n      p Broomall, PA 19008\r\n      h4 Affiliated With\r\n      p: a(href='http:\u002F\u002Fcolbsa.org\u002Fconstellation\u002F') Constellation District\r\n      p: a(href='http:\u002F\u002Fcolbsa.org\u002F' target='_blank') Cradle of Liberty Council\r\n      p: a(href='http:\u002F\u002Fscouting.org\u002F' target='_blank') Boy Scouts of America\r\n    .col-thirds\r\n      h4 Site Map\r\n      ul.foot-nav\r\n        li: a(href='.\u002Findex.html') Home\r\n        li: a(href='.\u002Fabout.html') About Us\r\n        if now \u003C= expires\r\n          li: a(href='.\u002Fpoinsettias.html') Support Us\r\n        else\r\n          li: a(href='.\u002Fsupport.html') Support Us\r\n        li: a(href='.\u002Fresources.html') Tools and Resources\r\n        li: a(href='.\u002Fterms.html') Terms and Privacy Policy\r\n  .foot-end\r\n    p &copy;2019 Troop 151\r\n","app\u002Fassets\u002Fpartials\u002F_foxycart.html":"\u003C!-- FOXYCART --\u003E\n\u003Cscript data-cfasync=\"false\" src=\"https:\u002F\u002Fcdn.foxycart.com\u002Ft151\u002Floader.js\" async defer\u003E\u003C\u002Fscript\u003E\n\u003C!-- \u002FFOXYCART --\u003E\n"};
;pug_debug_line = 1;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";











;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";


















;pug_debug_line = 14;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";






















;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";



















;pug_debug_line = 31;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_mixins["foxyitem"] = pug_interp = function(name, price, image, code, option_name){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var options = [];
for (pug_interp = 5; pug_interp < arguments.length; pug_interp++) {
  options.push(arguments[pug_interp]);
}
;pug_debug_line = 32;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"item-card\""+pug.attr("id", code, true, true)) + "\u003E";
;pug_debug_line = 33;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cdiv class=\"item-card-info\"\u003E";
;pug_debug_line = 34;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cdiv class=\"item-image\"\u003E";
;pug_debug_line = 35;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cimg" + (pug.attr("src", image, true, true)) + "\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 36;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cdiv class=\"item-data\"\u003E";
;pug_debug_line = 37;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cdiv class=\"item-data-head\"\u003E";
;pug_debug_line = 38;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cp class=\"item-name\"\u003E";
;pug_debug_line = 38;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + (pug.escape(null == (pug_interp = name) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
;pug_debug_line = 39;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cp class=\"item-price\"\u003E";
;pug_debug_line = 39;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + (pug.escape(null == (pug_interp = '$' + price.toFixed(2)) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 40;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cdiv class=\"item-description\"\u003E";
;pug_debug_line = 41;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
if (block) {
;pug_debug_line = 42;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
block && block();
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 43;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cdiv class=\"item-form\"\u003E";
;pug_debug_line = 44;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cform" + (" action=\"https:\u002F\u002Ft151.foxycart.com\u002Fcart\" method=\"post\" accept-charset=\"utf-8\""+pug.attr("id", code + '_form', true, true)) + "\u003E";
;pug_debug_line = 45;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cinput" + (" type=\"hidden\" name=\"name\""+pug.attr("value", name, true, true)) + "\u003E";
;pug_debug_line = 46;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cinput" + (" type=\"hidden\" name=\"price\""+pug.attr("value", price, true, true)) + "\u003E";
;pug_debug_line = 47;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cinput" + (" type=\"hidden\" name=\"code\""+pug.attr("value", code, true, true)) + "\u003E";
;pug_debug_line = 48;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cinput type=\"hidden\" name=\"category\" value=\"Poinsettia_Sale\"\u003E";
;pug_debug_line = 49;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
var date = new Date('2019-11-17T23:59:00')
;pug_debug_line = 50;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cinput" + (" type=\"hidden\" name=\"expires\""+pug.attr("value", Math.floor(date.getTime()/1000), true, true)) + "\u003E";
;pug_debug_line = 51;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cinput type=\"number\" name=\"quantity\" value=\"1\" min=\"0\"\u003E";
;pug_debug_line = 52;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
if (option_name) {
;pug_debug_line = 53;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
var on = option_name.charAt(0).toUpperCase() + option_name.slice(1)
;pug_debug_line = 54;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Clabel class=\"option_label\"\u003E";
;pug_debug_line = 54;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + (pug.escape(null == (pug_interp = on) ? "" : pug_interp)) + "\u003C\u002Flabel\u003E";
;pug_debug_line = 55;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cselect" + (pug.attr("name", option_name, true, true)) + "\u003E";
;pug_debug_line = 56;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
// iterate options
;(function(){
  var $$obj = options;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var item = $$obj[pug_index0];
;pug_debug_line = 57;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
var it = item.charAt(0).toUpperCase()+item.slice(1)
;pug_debug_line = 58;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Coption" + (pug.attr("value", it +'{c+' + it.charAt(0) +'}', true, true)) + "\u003E";
;pug_debug_line = 58;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + (pug.escape(null == (pug_interp = it) ? "" : pug_interp)) + "\u003C\u002Foption\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var item = $$obj[pug_index0];
;pug_debug_line = 57;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
var it = item.charAt(0).toUpperCase()+item.slice(1)
;pug_debug_line = 58;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Coption" + (pug.attr("value", it +'{c+' + it.charAt(0) +'}', true, true)) + "\u003E";
;pug_debug_line = 58;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + (pug.escape(null == (pug_interp = it) ? "" : pug_interp)) + "\u003C\u002Foption\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fselect\u003E";
}
;pug_debug_line = 59;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"submit\""+" type=\"submit\""+pug.attr("value", `Add ${name} to Cart`, true, true)) + "\u003E\u003C\u002Fform\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
};
;pug_debug_line = 3;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fsupport.pug";
var pageTitle = 'Support Troop 151'
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fsupport.pug";
var pageDesc = 'Support Scouting in Troop 151.'
;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Fsupport.pug";
var pageFile = "support"
;pug_debug_line = 7;pug_debug_filename = "app\u002Fassets\u002Fsupport.pug";
var mastheadImg ='support.jpg'
;pug_debug_line = 8;pug_debug_filename = "app\u002Fassets\u002Fsupport.pug";
var scripts = 'foxycart'
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
if (mastheadImg) {
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
var mastheadImgUrl = './img/mastheads/' + mastheadImg
}
else {
;pug_debug_line = 12;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
var mastheadImgUrl = './img/mastheads/masthead_img.jpg'
}
;pug_debug_line = 14;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003C!DOCTYPE html\u003E";
;pug_debug_line = 15;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Chtml prefix=\"og: http:\u002F\u002Fogp.me\u002Fns#\" lang=\"en\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Chead\u003E";
;pug_debug_line = 1;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta charset=\"utf-8\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta" + (" name=\"description\""+pug.attr("content", pageDesc, true, true)) + "\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta name=\"author\" content=\"Troop 151 Broomall, PA\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta" + (" property=\"og:title\""+pug.attr("content", pageTitle, true, true)) + "\u003E";
;pug_debug_line = 8;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta" + (" property=\"og:description\""+pug.attr("content", pageDesc, true, true)) + "\u003E";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta property=\"og:type\" content=\"website\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta" + (" property=\"og:url\""+pug.attr("content", "https://t151.org/" + pageFile + '.html', true, true)) + "\u003E";
;pug_debug_line = 11;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta" + (" property=\"og:image\""+pug.attr("content", mastheadImgUrl, true, true)) + "\u003E";
;pug_debug_line = 12;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta property=\"og:image:width\" content=\"3264\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta property=\"og:image:height\" content=\"2448\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Clink rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"\u002Fimg\u002Ffavicon\u002Fapple-touch-icon.png\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Clink rel=\"icon\" type=\"image\u002Fpng\" sizes=\"32x32\" href=\"\u002Fimg\u002Ffavicon\u002Ffavicon-32x32.png\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Clink rel=\"icon\" type=\"image\u002Fpng\" sizes=\"16x16\" href=\"\u002Fimg\u002Ffavicon\u002Ffavicon-16x16.png\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Clink rel=\"manifest\" href=\"\u002Fimg\u002Ffavicon\u002Fsite.webmanifest\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Clink rel=\"mask-icon\" href=\"\u002Fimg\u002Ffavicon\u002Fsafari-pinned-tab.svg\" color=\"#5bbad5\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Cmeta name=\"apple-mobile-web-app-title\" content=\"Troop 151\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Cmeta name=\"application-name\" content=\"Troop 151\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Cmeta name=\"msapplication-TileColor\" content=\"#da532c\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Cmeta name=\"theme-color\" content=\"#da532c\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Clink href=\"app.css\" rel=\"stylesheet\" type=\"text\u002Fcss\"\u003E\u003C\u002Fhead\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cbody\u003E";
;pug_debug_line = 20;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cdiv id=\"main\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cheader\u003E";
;pug_debug_line = 1;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Cnav id=\"top_nav\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 2;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "Troop 151\u003C\u002Fh1\u003E";
;pug_debug_line = 3;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Cul\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Findex.html\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "&#127968;\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Ca href=\"#footer\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "&#x2630;\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fnav\u003E";
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Csection" + (" id=\"masthead\""+pug.attr("style", pug.style('background: no-repeat center/cover url('+mastheadImgUrl+')'), true, true)) + "\u003E";
;pug_debug_line = 24;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cdiv class=\"masthead-content\"\u003E";
;pug_debug_line = 25;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
;pug_debug_line = 11;pug_debug_filename = "app\u002Fassets\u002Fsupport.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 11;pug_debug_filename = "app\u002Fassets\u002Fsupport.pug";
pug_html = pug_html + "Support Troop 151\u003C\u002Fh1\u003E\u003C\u002Fdiv\u003E\u003C\u002Fsection\u003E\u003C\u002Fheader\u003E";
;pug_debug_line = 30;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cdiv id=\"content\"\u003E";
;pug_debug_line = 31;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
;pug_debug_line = 14;pug_debug_filename = "app\u002Fassets\u002Fsupport.pug";
pug_html = pug_html + "\u003Carticle id=\"top\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "app\u002Fassets\u002Fsupport.pug";
pug_html = pug_html + "\u003Cheader\u003E";
;pug_debug_line = 16;pug_debug_filename = "app\u002Fassets\u002Fsupport.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 16;pug_debug_filename = "app\u002Fassets\u002Fsupport.pug";
pug_html = pug_html + "Thank You For Your Support\u003C\u002Fh1\u003E\u003C\u002Fheader\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fsupport.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fsupport.pug";
pug_html = pug_html + "Your ongoing support for Troop 151 helps us pay for camps, equipment and supplies to teach";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fsupport.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fsupport.pug";
pug_html = pug_html + "our Scouts servant leadership skills in an outdoor setting. Watch for our Poinsettia sale in the";
;pug_debug_line = 20;pug_debug_filename = "app\u002Fassets\u002Fsupport.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 20;pug_debug_filename = "app\u002Fassets\u002Fsupport.pug";
pug_html = pug_html + "fall and our summer flower sale in the spring.\u003C\u002Fp\u003E";
;pug_debug_line = 21;pug_debug_filename = "app\u002Fassets\u002Fsupport.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 21;pug_debug_filename = "app\u002Fassets\u002Fsupport.pug";
pug_html = pug_html + "If you would like to support us year-round, you can contribute to our Tip Jar here.\u003C\u002Fp\u003E\u003C\u002Farticle\u003E";
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fsupport.pug";
pug_html = pug_html + "\u003Carticle id=\"tips\"\u003E";
;pug_debug_line = 24;pug_debug_filename = "app\u002Fassets\u002Fsupport.pug";
pug_html = pug_html + "\u003Cheader\u003E";
;pug_debug_line = 25;pug_debug_filename = "app\u002Fassets\u002Fsupport.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 25;pug_debug_filename = "app\u002Fassets\u002Fsupport.pug";
pug_html = pug_html + "Tip Jar\u003C\u002Fh1\u003E\u003C\u002Fheader\u003E";
;pug_debug_line = 26;pug_debug_filename = "app\u002Fassets\u002Fsupport.pug";
pug_mixins["foxyitem"].call({
block: function(){
;pug_debug_line = 27;pug_debug_filename = "app\u002Fassets\u002Fsupport.pug";
pug_html = pug_html + "\u003Cul\u003E";
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fsupport.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fsupport.pug";
pug_html = pug_html + "Help keep cheesteaks in our campouts!\u003C\u002Fli\u003E";
;pug_debug_line = 29;pug_debug_filename = "app\u002Fassets\u002Fsupport.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 29;pug_debug_filename = "app\u002Fassets\u002Fsupport.pug";
pug_html = pug_html + "Give to our griddle fund so that we can get a second griddle to feed our growing Troop of growing Scouts.\u003C\u002Fli\u003E\u003C\u002Ful\u003E";
}
}, 'Griddle Fund', 1, 'img/xmas/griddle.jpg', 'TIP');
pug_html = pug_html + "\u003C\u002Farticle\u003E";
;pug_debug_line = 32;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Carticle id=\"contact\"\u003E";
;pug_debug_line = 33;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cheader\u003E";
;pug_debug_line = 34;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 34;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "Contact Us\u003C\u002Fh1\u003E\u003C\u002Fheader\u003E";
;pug_debug_line = 35;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cdiv id=\"contact-form\"\u003E";
;pug_debug_line = 1;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cform action=\"https:\u002F\u002Fapp.99inbound.com\u002Fapi\u002Fe\u002FqnSf2KrH\" method=\"POST\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-wrap\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"formcol\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"form\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Clabel for=\"name\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "Name:\u003C\u002Flabel\u003E";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cinput type=\"text\" name=\"name\" id=\"name\" placeholder=\"Joe Smith\" required autocomplete=\"name\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"form\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Clabel for=\"__replyto\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "Email:\u003C\u002Flabel\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cinput type=\"email\" name=\"__replyto\" id=\"__replyto\" placeholder=\"jsmith@example.com\" required autocomplete=\"email\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 27;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"form\"\u003E";
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Clabel for=\"phone\"\u003E";
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "Phone:\u003C\u002Flabel\u003E";
;pug_debug_line = 29;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cinput type=\"tel\" name=\"phone\" id=\"phone\" placeholder=\"610-555-1212\" autocomplete=\"tel\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 36;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"formcol\"\u003E";
;pug_debug_line = 37;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"form\"\u003E";
;pug_debug_line = 38;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Clabel for=\"message\"\u003E";
;pug_debug_line = 38;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "Message:\u003C\u002Flabel\u003E";
;pug_debug_line = 39;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Ctextarea name=\"message\" id=\"message\" placeholder=\"Your message here\" minlength=\"20\" rows=\"6\" cols=\"20\"\u003E\u003C\u002Ftextarea\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 47;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cinput type=\"hidden\" name=\"__redirect\" id=\"__redirect\" value=\"\"\u003E";
;pug_debug_line = 53;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cinput type=\"hidden\" name=\"__subject\" id=\"__subject\" value=\"Troop 151 Website Contact\"\u003E";
;pug_debug_line = 59;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv style=\"position: absolute; left: -5000px;\"\u003E\n\u003Cinput type=\"checkbox\" name=\"conservative_cornflower_blue_matte_headphones\" value=\"1\" tabindex=\"-1\" autocomplete=\"no\"\u003E\n\u003C\u002Fdiv\u003E";
;pug_debug_line = 62;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cinput type=\"submit\" id=\"form_submit\" value=\"Send Message\"\u003E\u003C\u002Fform\u003E";
;pug_debug_line = 67;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cscript\u003E";
;pug_debug_line = 68;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "var r = document.getElementById('__redirect')";
;pug_debug_line = 69;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 69;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "var s = window.location.href";
;pug_debug_line = 70;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 70;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "if (s.indexOf('.html') !== -1 ) {";
;pug_debug_line = 71;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 71;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "  var re = \u002F(.+\\\u002F)(.+\\.html?$)\u002Fi";
;pug_debug_line = 72;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 72;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "  r.value = s.replace(re, '$1') + 'thankyou.html'";
;pug_debug_line = 73;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 73;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "} else {";
;pug_debug_line = 74;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 74;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "  r.value = s + 'thankyou.html'";
;pug_debug_line = 75;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 75;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "}\u003C\u002Fscript\u003E\u003C\u002Fdiv\u003E\u003C\u002Farticle\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 1;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
var now = new Date()
;pug_debug_line = 2;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
var expires = new Date('2019-11-17T23:59:00')
;pug_debug_line = 3;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cfooter id=\"footer\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-wrap\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-thirds\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cimg class=\"foot-img\" src=\".\u002Fimg\u002F151-patch.png\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca class=\"join-button\" href=\"https:\u002F\u002Fmy.bsa.us\u002F525taa0151mb\" target=\"_blank\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Join Now\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 8;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-thirds\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Troop 151, BSA\u003C\u002Fh4\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\"http:\u002F\u002Fcubpack151.org\u002F\" target=\"_blank\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Pack 151\u003C\u002Fa\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 11;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 11;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Crew 151\u003C\u002Fp\u003E";
;pug_debug_line = 12;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 12;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Chartered To\u003C\u002Fh4\u003E";
;pug_debug_line = 13;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 13;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\"http:\u002F\u002Fmarplepres.org\u002F\" target=\"_blank\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Marple Presbyterian Church\u003C\u002Fa\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 14;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 14;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "150 North Sproul Road\u003C\u002Fp\u003E";
;pug_debug_line = 15;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 15;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Broomall, PA 19008\u003C\u002Fp\u003E";
;pug_debug_line = 16;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 16;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Affiliated With\u003C\u002Fh4\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\"http:\u002F\u002Fcolbsa.org\u002Fconstellation\u002F\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Constellation District\u003C\u002Fa\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\"http:\u002F\u002Fcolbsa.org\u002F\" target=\"_blank\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Cradle of Liberty Council\u003C\u002Fa\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\"http:\u002F\u002Fscouting.org\u002F\" target=\"_blank\"\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Boy Scouts of America\u003C\u002Fa\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 20;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-thirds\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 21;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Site Map\u003C\u002Fh4\u003E";
;pug_debug_line = 22;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cul class=\"foot-nav\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Findex.html\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Home\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 24;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 24;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Fabout.html\"\u003E";
;pug_debug_line = 24;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "About Us\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 25;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
if (now <= expires) {
;pug_debug_line = 26;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 26;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Fpoinsettias.html\"\u003E";
;pug_debug_line = 26;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Support Us\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
}
else {
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Fsupport.html\"\u003E";
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Support Us\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
}
;pug_debug_line = 29;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 29;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Fresources.html\"\u003E";
;pug_debug_line = 29;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Tools and Resources\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 30;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 30;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Fterms.html\"\u003E";
;pug_debug_line = 30;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Terms and Privacy Policy\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 31;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cdiv class=\"foot-end\"\u003E";
;pug_debug_line = 32;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 32;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "&copy;2019 Troop 151\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Ffooter\u003E";
;pug_debug_line = 40;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
if (scripts == 'foxycart') {
pug_html = pug_html + "\u003C!-- FOXYCART --\u003E\n\u003Cscript data-cfasync=\"false\" src=\"https:\u002F\u002Fcdn.foxycart.com\u002Ft151\u002Floader.js\" async defer\u003E\u003C\u002Fscript\u003E\n\u003C!-- \u002FFOXYCART --\u003E\n";
}
pug_html = pug_html + "\u003C\u002Fbody\u003E\u003C\u002Fhtml\u003E";} catch (err) {pug.rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;};
module.exports = template;
});

;require.register("assets/terms.pug", function(exports, require, module) {
function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"app\u002Fassets\u002Fterms.pug":"extends partials\u002F_layout\n\nblock vars\n  -var pageTitle = 'Terms and Condtions'\n  -var pageDesc = 'The terms and conditions of accessing the Troop 151 Website, including the Privacy Policy'\n  -var mastheadImg ='terms.jpg'\n\nblock masthead\n  h1 Website Terms\n  p Terms and Conditions and Privacy Policy\n\nblock content\n  .prose-page\n    #toc.toc\n      h1 Table of Contents\n      ul\n        li: a(href='#copyright') Copyright\n        li: a(href='#privacy') Privacy Policy\n        li: a(href='#terms') Terms and Conditions\n\n    #copyright.terms-section\n      h1 Copyright\n      include:marked partials\u002F_copyright.md\n\n    #privacy.terms-section\n      h1 Privacy Policy\n      include:marked partials\u002F_privacypolicy.md\n\n    #terms.terms-section\n      h1 Terms and Conditions\n      include:marked partials\u002F_terms.md\n","app\u002Fassets\u002Fpartials\u002F_layout.pug":"include _mixins.pug\r\n\r\nblock vars\r\n  -var pageTitle = 'Layout'\r\n  -var pageDesc = 'Description of this page'\r\n  -var pageFile = 'index'\r\n  -var scripts = ''\r\n\r\nif mastheadImg\r\n  -var mastheadImgUrl = '.\u002Fimg\u002Fmastheads\u002F' + mastheadImg\r\nelse\r\n  -var mastheadImgUrl = '.\u002Fimg\u002Fmastheads\u002Fmasthead_img.jpg'\r\n\r\ndoctype html\r\nhtml(prefix='og: http:\u002F\u002Fogp.me\u002Fns#', lang='en')\r\n  head\r\n    include _head.pug\r\n\r\n  body\r\n    #main\r\n      header\r\n        include _top_nav.pug\r\n        section#masthead(style='background: no-repeat center\u002Fcover url('+mastheadImgUrl+')')\r\n          .masthead-content\r\n            block masthead\r\n              h1 Troop 151, Broomall PA\r\n              p A Scout-Led Troop\r\n              p Chartered to Marple Presbyterian Church\r\n\r\n      #content\r\n        block content\r\n        article#contact\r\n          header\r\n            h1 Contact Us\r\n          #contact-form\r\n            include _contact.pug\r\n\r\n    include _foot.pug\r\n\r\n    if scripts == 'foxycart'\r\n      include _foxycart.html\r\n","app\u002Fassets\u002Fpartials\u002F_mixins.pug":"mixin linkbutton(link, text)\n  .more-div\n    span.more-wrap\n      a(href=link, class='more-button')= text\n\nmixin eventItem(title, eventImage)\n  .event-gallery\n    img(src='.\u002Fimg\u002Fevents\u002F'+eventImage)\n    .background-shade\n      .event-desc\n        h4= title\n        block\n\nmixin leader(name, title, profileImage)\n  .leader-gallery\n    if profileImage\n      img(src='.\u002Fimg\u002Fleaders\u002F'+profileImage)\n    else\n      img(src='.\u002Fimg\u002Fleaders\u002Fno-photo.png')\n    p.leader_name= name\n    p.leader_title= title\n\nmixin eagle(name, year)\n  .eagle-gallery\n    .eagle-logo\n      img(src='.\u002Fimg\u002Feagle_badge.gif')\n    .eagle-data\n      p.eagle-name= name\n      p.eagle-year= year\n      \nmixin foxyitem(name, price, image, code, option_name, ...options)\n  .item-card(id= code)\n    .item-card-info\n      .item-image\n        img(src=image)\n      .item-data\n        .item-data-head\n          p.item-name= name\n          p.item-price= '$' + price.toFixed(2)\n        .item-description\n          if block\n            block\n        .item-form\n          form(action='https:\u002F\u002Ft151.foxycart.com\u002Fcart', method='post', accept-charset='utf-8' id= code + '_form')\n            input(type='hidden', name='name', value= name)\n            input(type='hidden', name='price', value= price)\n            input(type='hidden', name='code', value= code)\n            input(type='hidden', name='category', value='Poinsettia_Sale')\n            -var date = new Date('2019-11-17T23:59:00')\n            input(type='hidden', name='expires', value= Math.floor(date.getTime()\u002F1000))\n            input(type='number', name='quantity' value=1, min=0)\n            if option_name\n              -var on = option_name.charAt(0).toUpperCase() + option_name.slice(1)\n              label.option_label= on\n              select(name= option_name)\n                each item in options\n                  -var it = item.charAt(0).toUpperCase()+item.slice(1)\n                  option(value= it +'{c+' + it.charAt(0) +'}') #{it}\n            input.submit(type='submit', value=`Add ${name} to Cart`)\n            ","app\u002Fassets\u002Fpartials\u002F_head.pug":"meta(charset='utf-8')\nmeta(http-equiv='X-UA-Compatible', content='IE=edge')\nmeta(name='description', content= pageDesc)\nmeta(name='author', content= \"Troop 151 Broomall, PA\")\nmeta(name=\"viewport\" content=\"width=device-width, initial-scale=1\")\n\nmeta(property=\"og:title\", content= pageTitle)\nmeta(property=\"og:description\", content= pageDesc)\nmeta(property=\"og:type\", content=\"website\")\nmeta(property=\"og:url\", content=\"https:\u002F\u002Ft151.org\u002F\" + pageFile + '.html' )\nmeta(property=\"og:image\", content= mastheadImgUrl)\nmeta(property=\"og:image:width\", content=\"3264\")\nmeta(property=\"og:image:height\", content=\"2448\")\n\ninclude _favicon.pug\n\nlink(href=\"app.css\", rel=\"stylesheet\", type=\"text\u002Fcss\")\n","app\u002Fassets\u002Fpartials\u002F_favicon.pug":"\u002F\u002F- Generated at https:\u002F\u002Frealfavicongenerator.net\u002F\r\nlink(rel=\"apple-touch-icon\", sizes=\"180x180\", href=\"\u002Fimg\u002Ffavicon\u002Fapple-touch-icon.png\")\r\nlink(rel=\"icon\", type=\"image\u002Fpng\", sizes=\"32x32\", href=\"\u002Fimg\u002Ffavicon\u002Ffavicon-32x32.png\")\r\nlink(rel=\"icon\", type=\"image\u002Fpng\", sizes=\"16x16\", href=\"\u002Fimg\u002Ffavicon\u002Ffavicon-16x16.png\")\r\nlink(rel=\"manifest\", href=\"\u002Fimg\u002Ffavicon\u002Fsite.webmanifest\")\r\nlink(rel=\"mask-icon\", href=\"\u002Fimg\u002Ffavicon\u002Fsafari-pinned-tab.svg\", color=\"#5bbad5\")\r\nmeta(name=\"apple-mobile-web-app-title\", content=\"Troop 151\")\r\nmeta(name=\"application-name\", content=\"Troop 151\")\r\nmeta(name=\"msapplication-TileColor\", content=\"#da532c\")\r\nmeta(name=\"theme-color\", content=\"#da532c\")\r\n","app\u002Fassets\u002Fpartials\u002F_top_nav.pug":"nav#top_nav\r\n  h1 Troop 151\r\n  ul\r\n    li: a(href='.\u002Findex.html') &#127968;\r\n    li: a(href='#footer') &#x2630;\r\n","app\u002Fassets\u002Fpartials\u002F_contact.pug":"form(\n  action='https:\u002F\u002Fapp.99inbound.com\u002Fapi\u002Fe\u002FqnSf2KrH'\n  method='POST'\n)\n  .col-wrap\n    .formcol\n      .form\n        label(for='name') Name:\n        input(\n          type='text'\n          name='name'\n          id='name'\n          placeholder='Joe Smith'\n          required\n          autocomplete='name'\n        )\n      .form\n        label(for='__replyto') Email:\n        input(\n          type='email'\n          name='__replyto'\n          id='__replyto'\n          placeholder='jsmith@example.com'\n          required\n          autocomplete='email'\n        )\n      .form\n        label(for='phone') Phone:\n        input(\n          type='tel'\n          name='phone'\n          id='phone'\n          placeholder='610-555-1212'\n          autocomplete='tel'\n        )\n    .formcol\n      .form\n        label(for='message') Message:\n        textarea(\n          name='message'\n          id='message'\n          placeholder='Your message here'\n          minlength=20\n          rows=6\n          cols=20\n        )\n  input(\n    type='hidden'\n    name='__redirect'\n    id='__redirect'\n    value=''\n  )\n  input(\n    type='hidden'\n    name='__subject'\n    id='__subject'\n    value='Troop 151 Website Contact'\n  )\n  \u003Cdiv style=\"position: absolute; left: -5000px;\"\u003E\n  \u003Cinput type=\"checkbox\" name=\"conservative_cornflower_blue_matte_headphones\" value=\"1\" tabindex=\"-1\" autocomplete=\"no\"\u003E\n  \u003C\u002Fdiv\u003E\n  input(\n    type='submit'\n    id='form_submit'\n    value='Send Message'\n  )\nscript.\n  var r = document.getElementById('__redirect')\n  var s = window.location.href\n  if (s.indexOf('.html') !== -1 ) {\n    var re = \u002F(.+\\\u002F)(.+\\.html?$)\u002Fi\n    r.value = s.replace(re, '$1') + 'thankyou.html'\n  } else {\n    r.value = s + 'thankyou.html'\n  }\n","app\u002Fassets\u002Fpartials\u002F_foot.pug":"-var now = new Date()\r\n-var expires = new Date('2019-11-17T23:59:00')\r\nfooter#footer\r\n  .col-wrap\r\n    .col-thirds\r\n      img(src='.\u002Fimg\u002F151-patch.png').foot-img\r\n      a(href='https:\u002F\u002Fmy.bsa.us\u002F525taa0151mb' target='_blank').join-button Join Now\r\n    .col-thirds\r\n      h4 Troop 151, BSA\r\n      p: a(href='http:\u002F\u002Fcubpack151.org\u002F' target='_blank') Pack 151\r\n      p Crew 151\r\n      h4 Chartered To\r\n      p: a(href='http:\u002F\u002Fmarplepres.org\u002F' target='_blank') Marple Presbyterian Church\r\n      p 150 North Sproul Road\r\n      p Broomall, PA 19008\r\n      h4 Affiliated With\r\n      p: a(href='http:\u002F\u002Fcolbsa.org\u002Fconstellation\u002F') Constellation District\r\n      p: a(href='http:\u002F\u002Fcolbsa.org\u002F' target='_blank') Cradle of Liberty Council\r\n      p: a(href='http:\u002F\u002Fscouting.org\u002F' target='_blank') Boy Scouts of America\r\n    .col-thirds\r\n      h4 Site Map\r\n      ul.foot-nav\r\n        li: a(href='.\u002Findex.html') Home\r\n        li: a(href='.\u002Fabout.html') About Us\r\n        if now \u003C= expires\r\n          li: a(href='.\u002Fpoinsettias.html') Support Us\r\n        else\r\n          li: a(href='.\u002Fsupport.html') Support Us\r\n        li: a(href='.\u002Fresources.html') Tools and Resources\r\n        li: a(href='.\u002Fterms.html') Terms and Privacy Policy\r\n  .foot-end\r\n    p &copy;2019 Troop 151\r\n","app\u002Fassets\u002Fpartials\u002F_foxycart.html":"\u003C!-- FOXYCART --\u003E\n\u003Cscript data-cfasync=\"false\" src=\"https:\u002F\u002Fcdn.foxycart.com\u002Ft151\u002Floader.js\" async defer\u003E\u003C\u002Fscript\u003E\n\u003C!-- \u002FFOXYCART --\u003E\n","app\u002Fassets\u002Fpartials\u002F_copyright.md":"**Effective September 5, 2016**\n\nContent on this website is owned by several entities, and is subject to several different copyright licenses.\n\n## Boy Scouts of America owned content:\n\nCertain text, images and other items are registered trademarks of the Boy Scouts of America, and are used herein with permission as an affiliate of the Boy Scouts of America.\n\nBSA trademarks are the exclusive property of the Boy Scouts of America. In order to protect the proprietary marks of the Boy Scouts of America (BSA), the U.S. Congress granted BSA a federal charter (36 U.S.C. § 30901 et. seq.) in 1916. This charter gives BSA “the exclusive right to use emblems, badges, descriptive or designating marks, and words and phrases (BSA) adopts.” The marks include any trademark, service mark, name, logo, seal, design, insignia, phrase, or other symbol or device associated with or referring to Boy Scouts of America.\n\nFor more infomation about the Boy Scouts of America trademarks and their use, please visit their [Licensing Page](http:\u002F\u002Fwww.scouting.org\u002FLicensing\u002FProtecting%20the%20Brand.aspx)\n\n## Content with images or names of our Youth Members:\n\nAny images or text that contains images or personal information of our members is copyright Troop 151, all rights reserved.\n\n## All other content:\n\n\u003Ca rel=\"license\" href=\"http:\u002F\u002Fcreativecommons.org\u002Flicenses\u002Fby-sa\u002F4.0\u002F\"\u003E\u003Cimg alt=\"Creative Commons License\" style=\"border-width:0\" src=\"https:\u002F\u002Fi.creativecommons.org\u002Fl\u002Fby-sa\u002F4.0\u002F88x31.png\" \u002F\u003E\u003C\u002Fa\u003E\u003Cbr \u002F\u003EAll other content (including the website code) is licensed under a \u003Ca rel=\"license\" href=\"http:\u002F\u002Fcreativecommons.org\u002Flicenses\u002Fby-sa\u002F4.0\u002F\"\u003ECreative Commons Attribution-ShareAlike 4.0 International License\u003C\u002Fa\u003E.\n","app\u002Fassets\u002Fpartials\u002F_privacypolicy.md":"**Effective September 5, 2016**\n\nThis privacy policy has been compiled to better serve those who are concerned with how their 'Personally Identifiable Information' (PII) is being used online. PII, as described in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website.\n\n## What personal information do we collect from the people that visit our blog, website or app?\n\nWhen ordering or registering on our site, as appropriate, you may be asked to enter your name, email address, phone number or other details to help you with your experience.\n\n## When do we collect information?\n\nWe collect information from you when you fill out a form or enter information on our site.\n\n## How do we use your information?\n\nWe may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways:\n\n+ To send periodic emails regarding your inquiry or other products and services.\n+ To follow up with them after correspondence (live chat, email or phone inquiries)\n+ To help enroll you or a dependent as a member of the Boy Scouts of America\n\n## How do we protect your information?\n\nWe only provide articles and information. We never ask for credit card numbers.\nWe use regular Malware Scanning.\n\nWe use third party services to provide our data collection. While we regularly audit these services privacy policies, these services are not under our direct control, and may eavesdrop on data you submit to us.\n\nYour information you submit on our form is sent to us by email, and is subject to all vulnerabilities of email communication.\n\nAll purchase transactions are processed through a gateway provider and are not stored or processed on our servers.\n\n## Do we use 'cookies'?\n\nYes. Cookies are small files that a site or its service provider transfers to your computer's hard drive through your Web browser (if you allow) that enables the site's or service provider's systems to recognize your browser and capture and remember certain information. For instance, we use cookies to help us remember and process the items in your shopping cart. They are also used to help us understand your preferences based on previous or current site activity, which enables us to provide you with improved services. We also use cookies to help us compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future.\n\nWe use cookies to compile aggregate data about site traffic and site interactions in order to offer better site experiences and tools in the future. We may also use trusted third-party services that track this information on our behalf.\n\nYou can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies. You do this through your browser settings. Since browser is a little different, look at your browser's Help Menu to learn the correct way to modify your cookies.\n\nIf you turn cookies off, some features will be disabled. It won't affect the user's experience that make your site experience more efficient and may not function properly.\n\n## Third-party disclosure\n\nDo we disclose the information we collect to Third-Parties?\nWe sell, trade, or otherwise transfer to outside parties your name, address, city, town, phone number\n\nWe engage in this practice because,:\nWe share this information with Marple Presbyterian Church, the Cradle of Liberty Council and the Boy Scouts of America to aid in your conversion as a member of Troop 151, BSA.\n\nThird-party links\n\nOccasionally, at our discretion, we may include or offer third-party products or services on our website. These third-party sites have separate and independent privacy policies. We therefore have no responsibility or liability for the content and activities of these linked sites. Nonetheless, we seek to protect the integrity of our site and welcome any feedback about these sites.\ncompile data regarding user interactions.\n\n## California Online Privacy Protection Act\n\nCalOPPA is the first state law in the nation to require commercial websites and online services to post a privacy policy. The law's reach stretches well beyond California to require any person or company in the United States (and conceivably the world) that operates websites collecting Personally Identifiable Information from California consumers to post a conspicuous privacy policy on its website stating exactly the information being collected and those individuals or companies with whom it is being shared.\n\nAccording to CalOPPA, we agree to the following:\n\n+ Users can visit our site anonymously.\n+ Once this privacy policy is created, we will add a link to it on our home page or as a minimum, on the first significant page after entering our website.\n+ Our Privacy Policy link includes the word 'Privacy' and can be easily be found on the page specified above.\n\nYou will be notified of any Privacy Policy changes on our Privacy Policy Page.\n\nYou can change your personal information by emailing us.\n\n## How does our site handle Do Not Track signals?\n\nWe honor Do Not Track signals and Do Not Track, plant cookies, or use advertising when a Do Not Track (DNT) browser mechanism is in place.\n\n## Does our site allow third-party behavioral tracking?\n\nIt's also important to note that we do not allow third-party behavioral tracking\n\n## COPPA (Children Online Privacy Protection Act)\n\nWhen it comes to the collection of personal information from children under the age of 13 years old, the Children's Online Privacy Protection Act (COPPA) puts parents in control. The Federal Trade Commission, United States' consumer protection agency, enforces the COPPA Rule, which spells out what operators of websites and online services must do to protect children's privacy and safety online.\n\nIn order to remove your child's information please email us, or visit us in person at one of our meetings at 7pm on Wednesday Nights.\n\nWe adhere to the following COPPA tenants:\n\n+ Parents can review, delete, manage or refuse with whom their child's information is shared through contacting us directly.\n\n## Fair Information Practices\n\nThe Fair Information Practices Principles form the backbone of privacy law in the United States and the concepts they include have played a significant role in the development of data protection laws around the globe. Understanding the Fair Information Practice Principles and how they should be implemented is critical to comply with the various privacy laws that protect personal information.\n\nIn order to be in line with Fair Information Practices we will take the following responsive action, should a data breach occur:\n\n+ We will notify you via email within 7 business days\n\nWe also agree to the Individual Redress Principle which requires that individuals have the right to legally pursue enforceable rights against data collectors and processors who fail to adhere to the law. This principle requires not only that individuals have enforceable rights against data users, but also that individuals have recourse to courts or government agencies to investigate and\u002For prosecute non-compliance by data processors.\n\n## CAN SPAM Act\n\nThe CAN-SPAM Act is a law that sets the rules for commercial email, establishes requirements for commercial messages, gives recipients the right to have emails stopped from being sent to them, and spells out tough penalties for violations.\n\nWe collect your email address in order to:\n\n+ Send information, respond to inquiries, and\u002For other requests or questions\n+ Market to our mailing list or continue to send emails to our clients after the original transaction has occurred.\n\nTo be in accordance with CANSPAM, we agree to the following:\n\n+ Not use false or misleading subjects or email addresses.\n+ Identify the message as an advertisement in some reasonable way.\n+ Include the physical address of our business or site headquarters.\n+ Monitor third-party email marketing services for compliance, if one is used.\n+ Honor opt-out\u002Funsubscribe requests quickly.\n+ Allow users to unsubscribe by using the link at the bottom of each email.\n\nIf at any time you would like to unsubscribe from receiving future emails, you can follow the instructions at the bottom of each email and we will promptly remove you from ALL correspondence.\n\n## Contacting Us\n\nIf there are any questions regarding this privacy policy, you may contact us using the information below.\n","app\u002Fassets\u002Fpartials\u002F_terms.md":"While Troop 151, Boy Scouts of America (T151) makes every effort to present accurate and reliable information on this Internet Site, T151 does not endorse, approve or certify such information, nor does it guarantee the accuracy, completeness, efficacy, timeliness or correct sequencing of such information.\n\nUse of such information is voluntary and reliance on it should only be undertaken after an independent review of its accuracy, completeness, efficacy and timeliness. Reference to any specific commercial product, process or service by trade name, trademark, service mark, manufacturer, or otherwise does not constitute or imply endorsement, recommendation or favoring by T151.\n\nT151 (including its employees and agents) assumes no responsibility for consequences resulting from the use of the information herein (or from use of the information obtained at linked Internet addresses) or in any respect for the content of such information, including (but not limited to) errors or omissions, the accuracy or reasonableness of factual or scientific assumptions, studies or conclusions, the defamatory nature of statements, ownership of copyright or other intellectual property rights, and the violation of property, privacy, or personal rights of others. T151 is not responsible for, and expressly disclaims all liability for, damages of any kind arising out of use, reference to, or reliance on such information. No guarantees or warranties, including (but not limited to) any express or implied warrantees of merchantability or fitness or particular use or purpose, are made by T151 with respect to such information.\n\nWhile we endeavor to keep this site free from viruses, malware, and other malicious software, access and use of the Site is at your own risk and that you will be solely responsible for any damage to your computer or system or loss or data that may result from use or downloading any Content or other material or data from the Site.\n\nAt certain places on this T151 Internet Site, live links to other Internet addresses may be accessed. Such external Internet addresses contain information created, published, maintained, or otherwise posted by institutions or organizations independent of T151. T151 does not endorse, approve, certify or control these external Internet addresses and does not guarantee the accuracy, completeness, efficacy, timeliness or correct sequencing of information located at such address. Use of any information obtained from such addresses is voluntary, and reliance on it should only be undertaken after an independent review of its accuracy, completeness, efficacy and timeliness. Reference to any specific commercial product, process or service, by trade name, trademark, service mark, manufacturer, or otherwise does not constitute or imply endorsement, recommendation or favoring by T151.\n"};
;var locals_for_with = (locals || {});(function (pageFile, scripts) {;pug_debug_line = 1;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";











;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";


















;pug_debug_line = 14;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";






















;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";



















;pug_debug_line = 31;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";






















































































;pug_debug_line = 3;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fterms.pug";
var pageTitle = 'Terms and Condtions'
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fterms.pug";
var pageDesc = 'The terms and conditions of accessing the Troop 151 Website, including the Privacy Policy'
;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Fterms.pug";
var mastheadImg ='terms.jpg'
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
if (mastheadImg) {
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
var mastheadImgUrl = './img/mastheads/' + mastheadImg
}
else {
;pug_debug_line = 12;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
var mastheadImgUrl = './img/mastheads/masthead_img.jpg'
}
;pug_debug_line = 14;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003C!DOCTYPE html\u003E";
;pug_debug_line = 15;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Chtml prefix=\"og: http:\u002F\u002Fogp.me\u002Fns#\" lang=\"en\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Chead\u003E";
;pug_debug_line = 1;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta charset=\"utf-8\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta" + (" name=\"description\""+pug.attr("content", pageDesc, true, true)) + "\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta name=\"author\" content=\"Troop 151 Broomall, PA\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta" + (" property=\"og:title\""+pug.attr("content", pageTitle, true, true)) + "\u003E";
;pug_debug_line = 8;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta" + (" property=\"og:description\""+pug.attr("content", pageDesc, true, true)) + "\u003E";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta property=\"og:type\" content=\"website\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta" + (" property=\"og:url\""+pug.attr("content", "https://t151.org/" + pageFile + '.html', true, true)) + "\u003E";
;pug_debug_line = 11;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta" + (" property=\"og:image\""+pug.attr("content", mastheadImgUrl, true, true)) + "\u003E";
;pug_debug_line = 12;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta property=\"og:image:width\" content=\"3264\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta property=\"og:image:height\" content=\"2448\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Clink rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"\u002Fimg\u002Ffavicon\u002Fapple-touch-icon.png\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Clink rel=\"icon\" type=\"image\u002Fpng\" sizes=\"32x32\" href=\"\u002Fimg\u002Ffavicon\u002Ffavicon-32x32.png\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Clink rel=\"icon\" type=\"image\u002Fpng\" sizes=\"16x16\" href=\"\u002Fimg\u002Ffavicon\u002Ffavicon-16x16.png\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Clink rel=\"manifest\" href=\"\u002Fimg\u002Ffavicon\u002Fsite.webmanifest\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Clink rel=\"mask-icon\" href=\"\u002Fimg\u002Ffavicon\u002Fsafari-pinned-tab.svg\" color=\"#5bbad5\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Cmeta name=\"apple-mobile-web-app-title\" content=\"Troop 151\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Cmeta name=\"application-name\" content=\"Troop 151\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Cmeta name=\"msapplication-TileColor\" content=\"#da532c\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Cmeta name=\"theme-color\" content=\"#da532c\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Clink href=\"app.css\" rel=\"stylesheet\" type=\"text\u002Fcss\"\u003E\u003C\u002Fhead\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cbody\u003E";
;pug_debug_line = 20;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cdiv id=\"main\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cheader\u003E";
;pug_debug_line = 1;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Cnav id=\"top_nav\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 2;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "Troop 151\u003C\u002Fh1\u003E";
;pug_debug_line = 3;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Cul\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Findex.html\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "&#127968;\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Ca href=\"#footer\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "&#x2630;\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fnav\u003E";
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Csection" + (" id=\"masthead\""+pug.attr("style", pug.style('background: no-repeat center/cover url('+mastheadImgUrl+')'), true, true)) + "\u003E";
;pug_debug_line = 24;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cdiv class=\"masthead-content\"\u003E";
;pug_debug_line = 25;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fterms.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fterms.pug";
pug_html = pug_html + "Website Terms\u003C\u002Fh1\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fterms.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fterms.pug";
pug_html = pug_html + "Terms and Conditions and Privacy Policy\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fsection\u003E\u003C\u002Fheader\u003E";
;pug_debug_line = 30;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cdiv id=\"content\"\u003E";
;pug_debug_line = 31;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
;pug_debug_line = 13;pug_debug_filename = "app\u002Fassets\u002Fterms.pug";
pug_html = pug_html + "\u003Cdiv class=\"prose-page\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "app\u002Fassets\u002Fterms.pug";
pug_html = pug_html + "\u003Cdiv class=\"toc\" id=\"toc\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "app\u002Fassets\u002Fterms.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 15;pug_debug_filename = "app\u002Fassets\u002Fterms.pug";
pug_html = pug_html + "Table of Contents\u003C\u002Fh1\u003E";
;pug_debug_line = 16;pug_debug_filename = "app\u002Fassets\u002Fterms.pug";
pug_html = pug_html + "\u003Cul\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fterms.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fterms.pug";
pug_html = pug_html + "\u003Ca href=\"#copyright\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fterms.pug";
pug_html = pug_html + "Copyright\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fterms.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fterms.pug";
pug_html = pug_html + "\u003Ca href=\"#privacy\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fterms.pug";
pug_html = pug_html + "Privacy Policy\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fterms.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fterms.pug";
pug_html = pug_html + "\u003Ca href=\"#terms\"\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fterms.pug";
pug_html = pug_html + "Terms and Conditions\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 21;pug_debug_filename = "app\u002Fassets\u002Fterms.pug";
pug_html = pug_html + "\u003Cdiv class=\"terms-section\" id=\"copyright\"\u003E";
;pug_debug_line = 22;pug_debug_filename = "app\u002Fassets\u002Fterms.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 22;pug_debug_filename = "app\u002Fassets\u002Fterms.pug";
pug_html = pug_html + "Copyright\u003C\u002Fh1\u003E";
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fterms.pug";
pug_html = pug_html + "\u003Cp\u003E\u003Cstrong\u003EEffective September 5, 2016\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E\n\u003Cp\u003EContent on this website is owned by several entities, and is subject to several different copyright licenses.\u003C\u002Fp\u003E\n\u003Ch2 id=\"boy-scouts-of-america-owned-content-\"\u003EBoy Scouts of America owned content:\u003C\u002Fh2\u003E\n\u003Cp\u003ECertain text, images and other items are registered trademarks of the Boy Scouts of America, and are used herein with permission as an affiliate of the Boy Scouts of America.\u003C\u002Fp\u003E\n\u003Cp\u003EBSA trademarks are the exclusive property of the Boy Scouts of America. In order to protect the proprietary marks of the Boy Scouts of America (BSA), the U.S. Congress granted BSA a federal charter (36 U.S.C. § 30901 et. seq.) in 1916. This charter gives BSA “the exclusive right to use emblems, badges, descriptive or designating marks, and words and phrases (BSA) adopts.” The marks include any trademark, service mark, name, logo, seal, design, insignia, phrase, or other symbol or device associated with or referring to Boy Scouts of America.\u003C\u002Fp\u003E\n\u003Cp\u003EFor more infomation about the Boy Scouts of America trademarks and their use, please visit their \u003Ca href=\"http:\u002F\u002Fwww.scouting.org\u002FLicensing\u002FProtecting%20the%20Brand.aspx\"\u003ELicensing Page\u003C\u002Fa\u003E\u003C\u002Fp\u003E\n\u003Ch2 id=\"content-with-images-or-names-of-our-youth-members-\"\u003EContent with images or names of our Youth Members:\u003C\u002Fh2\u003E\n\u003Cp\u003EAny images or text that contains images or personal information of our members is copyright Troop 151, all rights reserved.\u003C\u002Fp\u003E\n\u003Ch2 id=\"all-other-content-\"\u003EAll other content:\u003C\u002Fh2\u003E\n\u003Cp\u003E\u003Ca rel=\"license\" href=\"http:\u002F\u002Fcreativecommons.org\u002Flicenses\u002Fby-sa\u002F4.0\u002F\"\u003E\u003Cimg alt=\"Creative Commons License\" style=\"border-width:0\" src=\"https:\u002F\u002Fi.creativecommons.org\u002Fl\u002Fby-sa\u002F4.0\u002F88x31.png\" \u002F\u003E\u003C\u002Fa\u003E\u003Cbr \u002F\u003EAll other content (including the website code) is licensed under a \u003Ca rel=\"license\" href=\"http:\u002F\u002Fcreativecommons.org\u002Flicenses\u002Fby-sa\u002F4.0\u002F\"\u003ECreative Commons Attribution-ShareAlike 4.0 International License\u003C\u002Fa\u003E.\u003C\u002Fp\u003E\n\u003C\u002Fdiv\u003E";
;pug_debug_line = 25;pug_debug_filename = "app\u002Fassets\u002Fterms.pug";
pug_html = pug_html + "\u003Cdiv class=\"terms-section\" id=\"privacy\"\u003E";
;pug_debug_line = 26;pug_debug_filename = "app\u002Fassets\u002Fterms.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 26;pug_debug_filename = "app\u002Fassets\u002Fterms.pug";
pug_html = pug_html + "Privacy Policy\u003C\u002Fh1\u003E";
;pug_debug_line = 27;pug_debug_filename = "app\u002Fassets\u002Fterms.pug";
pug_html = pug_html + "\u003Cp\u003E\u003Cstrong\u003EEffective September 5, 2016\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E\n\u003Cp\u003EThis privacy policy has been compiled to better serve those who are concerned with how their &#39;Personally Identifiable Information&#39; (PII) is being used online. PII, as described in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website.\u003C\u002Fp\u003E\n\u003Ch2 id=\"what-personal-information-do-we-collect-from-the-people-that-visit-our-blog-website-or-app-\"\u003EWhat personal information do we collect from the people that visit our blog, website or app?\u003C\u002Fh2\u003E\n\u003Cp\u003EWhen ordering or registering on our site, as appropriate, you may be asked to enter your name, email address, phone number or other details to help you with your experience.\u003C\u002Fp\u003E\n\u003Ch2 id=\"when-do-we-collect-information-\"\u003EWhen do we collect information?\u003C\u002Fh2\u003E\n\u003Cp\u003EWe collect information from you when you fill out a form or enter information on our site.\u003C\u002Fp\u003E\n\u003Ch2 id=\"how-do-we-use-your-information-\"\u003EHow do we use your information?\u003C\u002Fh2\u003E\n\u003Cp\u003EWe may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways:\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003ETo send periodic emails regarding your inquiry or other products and services.\u003C\u002Fli\u003E\n\u003Cli\u003ETo follow up with them after correspondence (live chat, email or phone inquiries)\u003C\u002Fli\u003E\n\u003Cli\u003ETo help enroll you or a dependent as a member of the Boy Scouts of America\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Ch2 id=\"how-do-we-protect-your-information-\"\u003EHow do we protect your information?\u003C\u002Fh2\u003E\n\u003Cp\u003EWe only provide articles and information. We never ask for credit card numbers.\nWe use regular Malware Scanning.\u003C\u002Fp\u003E\n\u003Cp\u003EWe use third party services to provide our data collection. While we regularly audit these services privacy policies, these services are not under our direct control, and may eavesdrop on data you submit to us.\u003C\u002Fp\u003E\n\u003Cp\u003EYour information you submit on our form is sent to us by email, and is subject to all vulnerabilities of email communication.\u003C\u002Fp\u003E\n\u003Cp\u003EAll purchase transactions are processed through a gateway provider and are not stored or processed on our servers.\u003C\u002Fp\u003E\n\u003Ch2 id=\"do-we-use-cookies-\"\u003EDo we use &#39;cookies&#39;?\u003C\u002Fh2\u003E\n\u003Cp\u003EYes. Cookies are small files that a site or its service provider transfers to your computer&#39;s hard drive through your Web browser (if you allow) that enables the site&#39;s or service provider&#39;s systems to recognize your browser and capture and remember certain information. For instance, we use cookies to help us remember and process the items in your shopping cart. They are also used to help us understand your preferences based on previous or current site activity, which enables us to provide you with improved services. We also use cookies to help us compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future.\u003C\u002Fp\u003E\n\u003Cp\u003EWe use cookies to compile aggregate data about site traffic and site interactions in order to offer better site experiences and tools in the future. We may also use trusted third-party services that track this information on our behalf.\u003C\u002Fp\u003E\n\u003Cp\u003EYou can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies. You do this through your browser settings. Since browser is a little different, look at your browser&#39;s Help Menu to learn the correct way to modify your cookies.\u003C\u002Fp\u003E\n\u003Cp\u003EIf you turn cookies off, some features will be disabled. It won&#39;t affect the user&#39;s experience that make your site experience more efficient and may not function properly.\u003C\u002Fp\u003E\n\u003Ch2 id=\"third-party-disclosure\"\u003EThird-party disclosure\u003C\u002Fh2\u003E\n\u003Cp\u003EDo we disclose the information we collect to Third-Parties?\nWe sell, trade, or otherwise transfer to outside parties your name, address, city, town, phone number\u003C\u002Fp\u003E\n\u003Cp\u003EWe engage in this practice because,:\nWe share this information with Marple Presbyterian Church, the Cradle of Liberty Council and the Boy Scouts of America to aid in your conversion as a member of Troop 151, BSA.\u003C\u002Fp\u003E\n\u003Cp\u003EThird-party links\u003C\u002Fp\u003E\n\u003Cp\u003EOccasionally, at our discretion, we may include or offer third-party products or services on our website. These third-party sites have separate and independent privacy policies. We therefore have no responsibility or liability for the content and activities of these linked sites. Nonetheless, we seek to protect the integrity of our site and welcome any feedback about these sites.\ncompile data regarding user interactions.\u003C\u002Fp\u003E\n\u003Ch2 id=\"california-online-privacy-protection-act\"\u003ECalifornia Online Privacy Protection Act\u003C\u002Fh2\u003E\n\u003Cp\u003ECalOPPA is the first state law in the nation to require commercial websites and online services to post a privacy policy. The law&#39;s reach stretches well beyond California to require any person or company in the United States (and conceivably the world) that operates websites collecting Personally Identifiable Information from California consumers to post a conspicuous privacy policy on its website stating exactly the information being collected and those individuals or companies with whom it is being shared.\u003C\u002Fp\u003E\n\u003Cp\u003EAccording to CalOPPA, we agree to the following:\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003EUsers can visit our site anonymously.\u003C\u002Fli\u003E\n\u003Cli\u003EOnce this privacy policy is created, we will add a link to it on our home page or as a minimum, on the first significant page after entering our website.\u003C\u002Fli\u003E\n\u003Cli\u003EOur Privacy Policy link includes the word &#39;Privacy&#39; and can be easily be found on the page specified above.\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cp\u003EYou will be notified of any Privacy Policy changes on our Privacy Policy Page.\u003C\u002Fp\u003E\n\u003Cp\u003EYou can change your personal information by emailing us.\u003C\u002Fp\u003E\n\u003Ch2 id=\"how-does-our-site-handle-do-not-track-signals-\"\u003EHow does our site handle Do Not Track signals?\u003C\u002Fh2\u003E\n\u003Cp\u003EWe honor Do Not Track signals and Do Not Track, plant cookies, or use advertising when a Do Not Track (DNT) browser mechanism is in place.\u003C\u002Fp\u003E\n\u003Ch2 id=\"does-our-site-allow-third-party-behavioral-tracking-\"\u003EDoes our site allow third-party behavioral tracking?\u003C\u002Fh2\u003E\n\u003Cp\u003EIt&#39;s also important to note that we do not allow third-party behavioral tracking\u003C\u002Fp\u003E\n\u003Ch2 id=\"coppa-children-online-privacy-protection-act-\"\u003ECOPPA (Children Online Privacy Protection Act)\u003C\u002Fh2\u003E\n\u003Cp\u003EWhen it comes to the collection of personal information from children under the age of 13 years old, the Children&#39;s Online Privacy Protection Act (COPPA) puts parents in control. The Federal Trade Commission, United States&#39; consumer protection agency, enforces the COPPA Rule, which spells out what operators of websites and online services must do to protect children&#39;s privacy and safety online.\u003C\u002Fp\u003E\n\u003Cp\u003EIn order to remove your child&#39;s information please email us, or visit us in person at one of our meetings at 7pm on Wednesday Nights.\u003C\u002Fp\u003E\n\u003Cp\u003EWe adhere to the following COPPA tenants:\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003EParents can review, delete, manage or refuse with whom their child&#39;s information is shared through contacting us directly.\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Ch2 id=\"fair-information-practices\"\u003EFair Information Practices\u003C\u002Fh2\u003E\n\u003Cp\u003EThe Fair Information Practices Principles form the backbone of privacy law in the United States and the concepts they include have played a significant role in the development of data protection laws around the globe. Understanding the Fair Information Practice Principles and how they should be implemented is critical to comply with the various privacy laws that protect personal information.\u003C\u002Fp\u003E\n\u003Cp\u003EIn order to be in line with Fair Information Practices we will take the following responsive action, should a data breach occur:\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003EWe will notify you via email within 7 business days\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cp\u003EWe also agree to the Individual Redress Principle which requires that individuals have the right to legally pursue enforceable rights against data collectors and processors who fail to adhere to the law. This principle requires not only that individuals have enforceable rights against data users, but also that individuals have recourse to courts or government agencies to investigate and\u002For prosecute non-compliance by data processors.\u003C\u002Fp\u003E\n\u003Ch2 id=\"can-spam-act\"\u003ECAN SPAM Act\u003C\u002Fh2\u003E\n\u003Cp\u003EThe CAN-SPAM Act is a law that sets the rules for commercial email, establishes requirements for commercial messages, gives recipients the right to have emails stopped from being sent to them, and spells out tough penalties for violations.\u003C\u002Fp\u003E\n\u003Cp\u003EWe collect your email address in order to:\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003ESend information, respond to inquiries, and\u002For other requests or questions\u003C\u002Fli\u003E\n\u003Cli\u003EMarket to our mailing list or continue to send emails to our clients after the original transaction has occurred.\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cp\u003ETo be in accordance with CANSPAM, we agree to the following:\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003ENot use false or misleading subjects or email addresses.\u003C\u002Fli\u003E\n\u003Cli\u003EIdentify the message as an advertisement in some reasonable way.\u003C\u002Fli\u003E\n\u003Cli\u003EInclude the physical address of our business or site headquarters.\u003C\u002Fli\u003E\n\u003Cli\u003EMonitor third-party email marketing services for compliance, if one is used.\u003C\u002Fli\u003E\n\u003Cli\u003EHonor opt-out\u002Funsubscribe requests quickly.\u003C\u002Fli\u003E\n\u003Cli\u003EAllow users to unsubscribe by using the link at the bottom of each email.\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cp\u003EIf at any time you would like to unsubscribe from receiving future emails, you can follow the instructions at the bottom of each email and we will promptly remove you from ALL correspondence.\u003C\u002Fp\u003E\n\u003Ch2 id=\"contacting-us\"\u003EContacting Us\u003C\u002Fh2\u003E\n\u003Cp\u003EIf there are any questions regarding this privacy policy, you may contact us using the information below.\u003C\u002Fp\u003E\n\u003C\u002Fdiv\u003E";
;pug_debug_line = 29;pug_debug_filename = "app\u002Fassets\u002Fterms.pug";
pug_html = pug_html + "\u003Cdiv class=\"terms-section\" id=\"terms\"\u003E";
;pug_debug_line = 30;pug_debug_filename = "app\u002Fassets\u002Fterms.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 30;pug_debug_filename = "app\u002Fassets\u002Fterms.pug";
pug_html = pug_html + "Terms and Conditions\u003C\u002Fh1\u003E";
;pug_debug_line = 31;pug_debug_filename = "app\u002Fassets\u002Fterms.pug";
pug_html = pug_html + "\u003Cp\u003EWhile Troop 151, Boy Scouts of America (T151) makes every effort to present accurate and reliable information on this Internet Site, T151 does not endorse, approve or certify such information, nor does it guarantee the accuracy, completeness, efficacy, timeliness or correct sequencing of such information.\u003C\u002Fp\u003E\n\u003Cp\u003EUse of such information is voluntary and reliance on it should only be undertaken after an independent review of its accuracy, completeness, efficacy and timeliness. Reference to any specific commercial product, process or service by trade name, trademark, service mark, manufacturer, or otherwise does not constitute or imply endorsement, recommendation or favoring by T151.\u003C\u002Fp\u003E\n\u003Cp\u003ET151 (including its employees and agents) assumes no responsibility for consequences resulting from the use of the information herein (or from use of the information obtained at linked Internet addresses) or in any respect for the content of such information, including (but not limited to) errors or omissions, the accuracy or reasonableness of factual or scientific assumptions, studies or conclusions, the defamatory nature of statements, ownership of copyright or other intellectual property rights, and the violation of property, privacy, or personal rights of others. T151 is not responsible for, and expressly disclaims all liability for, damages of any kind arising out of use, reference to, or reliance on such information. No guarantees or warranties, including (but not limited to) any express or implied warrantees of merchantability or fitness or particular use or purpose, are made by T151 with respect to such information.\u003C\u002Fp\u003E\n\u003Cp\u003EWhile we endeavor to keep this site free from viruses, malware, and other malicious software, access and use of the Site is at your own risk and that you will be solely responsible for any damage to your computer or system or loss or data that may result from use or downloading any Content or other material or data from the Site.\u003C\u002Fp\u003E\n\u003Cp\u003EAt certain places on this T151 Internet Site, live links to other Internet addresses may be accessed. Such external Internet addresses contain information created, published, maintained, or otherwise posted by institutions or organizations independent of T151. T151 does not endorse, approve, certify or control these external Internet addresses and does not guarantee the accuracy, completeness, efficacy, timeliness or correct sequencing of information located at such address. Use of any information obtained from such addresses is voluntary, and reliance on it should only be undertaken after an independent review of its accuracy, completeness, efficacy and timeliness. Reference to any specific commercial product, process or service, by trade name, trademark, service mark, manufacturer, or otherwise does not constitute or imply endorsement, recommendation or favoring by T151.\u003C\u002Fp\u003E\n\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 32;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Carticle id=\"contact\"\u003E";
;pug_debug_line = 33;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cheader\u003E";
;pug_debug_line = 34;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 34;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "Contact Us\u003C\u002Fh1\u003E\u003C\u002Fheader\u003E";
;pug_debug_line = 35;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cdiv id=\"contact-form\"\u003E";
;pug_debug_line = 1;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cform action=\"https:\u002F\u002Fapp.99inbound.com\u002Fapi\u002Fe\u002FqnSf2KrH\" method=\"POST\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-wrap\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"formcol\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"form\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Clabel for=\"name\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "Name:\u003C\u002Flabel\u003E";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cinput type=\"text\" name=\"name\" id=\"name\" placeholder=\"Joe Smith\" required autocomplete=\"name\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"form\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Clabel for=\"__replyto\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "Email:\u003C\u002Flabel\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cinput type=\"email\" name=\"__replyto\" id=\"__replyto\" placeholder=\"jsmith@example.com\" required autocomplete=\"email\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 27;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"form\"\u003E";
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Clabel for=\"phone\"\u003E";
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "Phone:\u003C\u002Flabel\u003E";
;pug_debug_line = 29;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cinput type=\"tel\" name=\"phone\" id=\"phone\" placeholder=\"610-555-1212\" autocomplete=\"tel\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 36;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"formcol\"\u003E";
;pug_debug_line = 37;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"form\"\u003E";
;pug_debug_line = 38;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Clabel for=\"message\"\u003E";
;pug_debug_line = 38;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "Message:\u003C\u002Flabel\u003E";
;pug_debug_line = 39;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Ctextarea name=\"message\" id=\"message\" placeholder=\"Your message here\" minlength=\"20\" rows=\"6\" cols=\"20\"\u003E\u003C\u002Ftextarea\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 47;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cinput type=\"hidden\" name=\"__redirect\" id=\"__redirect\" value=\"\"\u003E";
;pug_debug_line = 53;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cinput type=\"hidden\" name=\"__subject\" id=\"__subject\" value=\"Troop 151 Website Contact\"\u003E";
;pug_debug_line = 59;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv style=\"position: absolute; left: -5000px;\"\u003E\n\u003Cinput type=\"checkbox\" name=\"conservative_cornflower_blue_matte_headphones\" value=\"1\" tabindex=\"-1\" autocomplete=\"no\"\u003E\n\u003C\u002Fdiv\u003E";
;pug_debug_line = 62;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cinput type=\"submit\" id=\"form_submit\" value=\"Send Message\"\u003E\u003C\u002Fform\u003E";
;pug_debug_line = 67;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cscript\u003E";
;pug_debug_line = 68;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "var r = document.getElementById('__redirect')";
;pug_debug_line = 69;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 69;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "var s = window.location.href";
;pug_debug_line = 70;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 70;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "if (s.indexOf('.html') !== -1 ) {";
;pug_debug_line = 71;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 71;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "  var re = \u002F(.+\\\u002F)(.+\\.html?$)\u002Fi";
;pug_debug_line = 72;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 72;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "  r.value = s.replace(re, '$1') + 'thankyou.html'";
;pug_debug_line = 73;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 73;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "} else {";
;pug_debug_line = 74;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 74;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "  r.value = s + 'thankyou.html'";
;pug_debug_line = 75;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 75;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "}\u003C\u002Fscript\u003E\u003C\u002Fdiv\u003E\u003C\u002Farticle\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 1;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
var now = new Date()
;pug_debug_line = 2;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
var expires = new Date('2019-11-17T23:59:00')
;pug_debug_line = 3;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cfooter id=\"footer\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-wrap\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-thirds\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cimg class=\"foot-img\" src=\".\u002Fimg\u002F151-patch.png\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca class=\"join-button\" href=\"https:\u002F\u002Fmy.bsa.us\u002F525taa0151mb\" target=\"_blank\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Join Now\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 8;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-thirds\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Troop 151, BSA\u003C\u002Fh4\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\"http:\u002F\u002Fcubpack151.org\u002F\" target=\"_blank\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Pack 151\u003C\u002Fa\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 11;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 11;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Crew 151\u003C\u002Fp\u003E";
;pug_debug_line = 12;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 12;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Chartered To\u003C\u002Fh4\u003E";
;pug_debug_line = 13;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 13;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\"http:\u002F\u002Fmarplepres.org\u002F\" target=\"_blank\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Marple Presbyterian Church\u003C\u002Fa\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 14;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 14;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "150 North Sproul Road\u003C\u002Fp\u003E";
;pug_debug_line = 15;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 15;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Broomall, PA 19008\u003C\u002Fp\u003E";
;pug_debug_line = 16;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 16;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Affiliated With\u003C\u002Fh4\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\"http:\u002F\u002Fcolbsa.org\u002Fconstellation\u002F\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Constellation District\u003C\u002Fa\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\"http:\u002F\u002Fcolbsa.org\u002F\" target=\"_blank\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Cradle of Liberty Council\u003C\u002Fa\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\"http:\u002F\u002Fscouting.org\u002F\" target=\"_blank\"\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Boy Scouts of America\u003C\u002Fa\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 20;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-thirds\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 21;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Site Map\u003C\u002Fh4\u003E";
;pug_debug_line = 22;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cul class=\"foot-nav\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Findex.html\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Home\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 24;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 24;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Fabout.html\"\u003E";
;pug_debug_line = 24;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "About Us\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 25;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
if (now <= expires) {
;pug_debug_line = 26;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 26;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Fpoinsettias.html\"\u003E";
;pug_debug_line = 26;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Support Us\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
}
else {
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Fsupport.html\"\u003E";
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Support Us\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
}
;pug_debug_line = 29;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 29;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Fresources.html\"\u003E";
;pug_debug_line = 29;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Tools and Resources\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 30;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 30;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Fterms.html\"\u003E";
;pug_debug_line = 30;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Terms and Privacy Policy\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 31;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cdiv class=\"foot-end\"\u003E";
;pug_debug_line = 32;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 32;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "&copy;2019 Troop 151\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Ffooter\u003E";
;pug_debug_line = 40;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
if (scripts == 'foxycart') {
pug_html = pug_html + "\u003C!-- FOXYCART --\u003E\n\u003Cscript data-cfasync=\"false\" src=\"https:\u002F\u002Fcdn.foxycart.com\u002Ft151\u002Floader.js\" async defer\u003E\u003C\u002Fscript\u003E\n\u003C!-- \u002FFOXYCART --\u003E\n";
}
pug_html = pug_html + "\u003C\u002Fbody\u003E\u003C\u002Fhtml\u003E";}.call(this,"pageFile" in locals_for_with?locals_for_with.pageFile:typeof pageFile!=="undefined"?pageFile:undefined,"scripts" in locals_for_with?locals_for_with.scripts:typeof scripts!=="undefined"?scripts:undefined));} catch (err) {pug.rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;};
module.exports = template;
});

;require.register("assets/test.pug", function(exports, require, module) {
function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"app\u002Fassets\u002Ftest.pug":""};
} catch (err) {pug.rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;};
module.exports = template;
});

;require.register("assets/thankyou.pug", function(exports, require, module) {
function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"app\u002Fassets\u002Fthankyou.pug":"extends partials\u002F_layout\n\nblock vars\n  -var pageTitle = 'Thank You'\n  -var pageDesc = 'Thank You for contacting Troop 151'\n  -var mastheadImg ='waterfall.jpg'\n\nblock masthead\n  h1 Thank You\n  p for your message.\n  p Someone will reply to you shortly.\n\nblock content\n","app\u002Fassets\u002Fpartials\u002F_layout.pug":"include _mixins.pug\r\n\r\nblock vars\r\n  -var pageTitle = 'Layout'\r\n  -var pageDesc = 'Description of this page'\r\n  -var pageFile = 'index'\r\n  -var scripts = ''\r\n\r\nif mastheadImg\r\n  -var mastheadImgUrl = '.\u002Fimg\u002Fmastheads\u002F' + mastheadImg\r\nelse\r\n  -var mastheadImgUrl = '.\u002Fimg\u002Fmastheads\u002Fmasthead_img.jpg'\r\n\r\ndoctype html\r\nhtml(prefix='og: http:\u002F\u002Fogp.me\u002Fns#', lang='en')\r\n  head\r\n    include _head.pug\r\n\r\n  body\r\n    #main\r\n      header\r\n        include _top_nav.pug\r\n        section#masthead(style='background: no-repeat center\u002Fcover url('+mastheadImgUrl+')')\r\n          .masthead-content\r\n            block masthead\r\n              h1 Troop 151, Broomall PA\r\n              p A Scout-Led Troop\r\n              p Chartered to Marple Presbyterian Church\r\n\r\n      #content\r\n        block content\r\n        article#contact\r\n          header\r\n            h1 Contact Us\r\n          #contact-form\r\n            include _contact.pug\r\n\r\n    include _foot.pug\r\n\r\n    if scripts == 'foxycart'\r\n      include _foxycart.html\r\n","app\u002Fassets\u002Fpartials\u002F_mixins.pug":"mixin linkbutton(link, text)\n  .more-div\n    span.more-wrap\n      a(href=link, class='more-button')= text\n\nmixin eventItem(title, eventImage)\n  .event-gallery\n    img(src='.\u002Fimg\u002Fevents\u002F'+eventImage)\n    .background-shade\n      .event-desc\n        h4= title\n        block\n\nmixin leader(name, title, profileImage)\n  .leader-gallery\n    if profileImage\n      img(src='.\u002Fimg\u002Fleaders\u002F'+profileImage)\n    else\n      img(src='.\u002Fimg\u002Fleaders\u002Fno-photo.png')\n    p.leader_name= name\n    p.leader_title= title\n\nmixin eagle(name, year)\n  .eagle-gallery\n    .eagle-logo\n      img(src='.\u002Fimg\u002Feagle_badge.gif')\n    .eagle-data\n      p.eagle-name= name\n      p.eagle-year= year\n      \nmixin foxyitem(name, price, image, code, option_name, ...options)\n  .item-card(id= code)\n    .item-card-info\n      .item-image\n        img(src=image)\n      .item-data\n        .item-data-head\n          p.item-name= name\n          p.item-price= '$' + price.toFixed(2)\n        .item-description\n          if block\n            block\n        .item-form\n          form(action='https:\u002F\u002Ft151.foxycart.com\u002Fcart', method='post', accept-charset='utf-8' id= code + '_form')\n            input(type='hidden', name='name', value= name)\n            input(type='hidden', name='price', value= price)\n            input(type='hidden', name='code', value= code)\n            input(type='hidden', name='category', value='Poinsettia_Sale')\n            -var date = new Date('2019-11-17T23:59:00')\n            input(type='hidden', name='expires', value= Math.floor(date.getTime()\u002F1000))\n            input(type='number', name='quantity' value=1, min=0)\n            if option_name\n              -var on = option_name.charAt(0).toUpperCase() + option_name.slice(1)\n              label.option_label= on\n              select(name= option_name)\n                each item in options\n                  -var it = item.charAt(0).toUpperCase()+item.slice(1)\n                  option(value= it +'{c+' + it.charAt(0) +'}') #{it}\n            input.submit(type='submit', value=`Add ${name} to Cart`)\n            ","app\u002Fassets\u002Fpartials\u002F_head.pug":"meta(charset='utf-8')\nmeta(http-equiv='X-UA-Compatible', content='IE=edge')\nmeta(name='description', content= pageDesc)\nmeta(name='author', content= \"Troop 151 Broomall, PA\")\nmeta(name=\"viewport\" content=\"width=device-width, initial-scale=1\")\n\nmeta(property=\"og:title\", content= pageTitle)\nmeta(property=\"og:description\", content= pageDesc)\nmeta(property=\"og:type\", content=\"website\")\nmeta(property=\"og:url\", content=\"https:\u002F\u002Ft151.org\u002F\" + pageFile + '.html' )\nmeta(property=\"og:image\", content= mastheadImgUrl)\nmeta(property=\"og:image:width\", content=\"3264\")\nmeta(property=\"og:image:height\", content=\"2448\")\n\ninclude _favicon.pug\n\nlink(href=\"app.css\", rel=\"stylesheet\", type=\"text\u002Fcss\")\n","app\u002Fassets\u002Fpartials\u002F_favicon.pug":"\u002F\u002F- Generated at https:\u002F\u002Frealfavicongenerator.net\u002F\r\nlink(rel=\"apple-touch-icon\", sizes=\"180x180\", href=\"\u002Fimg\u002Ffavicon\u002Fapple-touch-icon.png\")\r\nlink(rel=\"icon\", type=\"image\u002Fpng\", sizes=\"32x32\", href=\"\u002Fimg\u002Ffavicon\u002Ffavicon-32x32.png\")\r\nlink(rel=\"icon\", type=\"image\u002Fpng\", sizes=\"16x16\", href=\"\u002Fimg\u002Ffavicon\u002Ffavicon-16x16.png\")\r\nlink(rel=\"manifest\", href=\"\u002Fimg\u002Ffavicon\u002Fsite.webmanifest\")\r\nlink(rel=\"mask-icon\", href=\"\u002Fimg\u002Ffavicon\u002Fsafari-pinned-tab.svg\", color=\"#5bbad5\")\r\nmeta(name=\"apple-mobile-web-app-title\", content=\"Troop 151\")\r\nmeta(name=\"application-name\", content=\"Troop 151\")\r\nmeta(name=\"msapplication-TileColor\", content=\"#da532c\")\r\nmeta(name=\"theme-color\", content=\"#da532c\")\r\n","app\u002Fassets\u002Fpartials\u002F_top_nav.pug":"nav#top_nav\r\n  h1 Troop 151\r\n  ul\r\n    li: a(href='.\u002Findex.html') &#127968;\r\n    li: a(href='#footer') &#x2630;\r\n","app\u002Fassets\u002Fpartials\u002F_contact.pug":"form(\n  action='https:\u002F\u002Fapp.99inbound.com\u002Fapi\u002Fe\u002FqnSf2KrH'\n  method='POST'\n)\n  .col-wrap\n    .formcol\n      .form\n        label(for='name') Name:\n        input(\n          type='text'\n          name='name'\n          id='name'\n          placeholder='Joe Smith'\n          required\n          autocomplete='name'\n        )\n      .form\n        label(for='__replyto') Email:\n        input(\n          type='email'\n          name='__replyto'\n          id='__replyto'\n          placeholder='jsmith@example.com'\n          required\n          autocomplete='email'\n        )\n      .form\n        label(for='phone') Phone:\n        input(\n          type='tel'\n          name='phone'\n          id='phone'\n          placeholder='610-555-1212'\n          autocomplete='tel'\n        )\n    .formcol\n      .form\n        label(for='message') Message:\n        textarea(\n          name='message'\n          id='message'\n          placeholder='Your message here'\n          minlength=20\n          rows=6\n          cols=20\n        )\n  input(\n    type='hidden'\n    name='__redirect'\n    id='__redirect'\n    value=''\n  )\n  input(\n    type='hidden'\n    name='__subject'\n    id='__subject'\n    value='Troop 151 Website Contact'\n  )\n  \u003Cdiv style=\"position: absolute; left: -5000px;\"\u003E\n  \u003Cinput type=\"checkbox\" name=\"conservative_cornflower_blue_matte_headphones\" value=\"1\" tabindex=\"-1\" autocomplete=\"no\"\u003E\n  \u003C\u002Fdiv\u003E\n  input(\n    type='submit'\n    id='form_submit'\n    value='Send Message'\n  )\nscript.\n  var r = document.getElementById('__redirect')\n  var s = window.location.href\n  if (s.indexOf('.html') !== -1 ) {\n    var re = \u002F(.+\\\u002F)(.+\\.html?$)\u002Fi\n    r.value = s.replace(re, '$1') + 'thankyou.html'\n  } else {\n    r.value = s + 'thankyou.html'\n  }\n","app\u002Fassets\u002Fpartials\u002F_foot.pug":"-var now = new Date()\r\n-var expires = new Date('2019-11-17T23:59:00')\r\nfooter#footer\r\n  .col-wrap\r\n    .col-thirds\r\n      img(src='.\u002Fimg\u002F151-patch.png').foot-img\r\n      a(href='https:\u002F\u002Fmy.bsa.us\u002F525taa0151mb' target='_blank').join-button Join Now\r\n    .col-thirds\r\n      h4 Troop 151, BSA\r\n      p: a(href='http:\u002F\u002Fcubpack151.org\u002F' target='_blank') Pack 151\r\n      p Crew 151\r\n      h4 Chartered To\r\n      p: a(href='http:\u002F\u002Fmarplepres.org\u002F' target='_blank') Marple Presbyterian Church\r\n      p 150 North Sproul Road\r\n      p Broomall, PA 19008\r\n      h4 Affiliated With\r\n      p: a(href='http:\u002F\u002Fcolbsa.org\u002Fconstellation\u002F') Constellation District\r\n      p: a(href='http:\u002F\u002Fcolbsa.org\u002F' target='_blank') Cradle of Liberty Council\r\n      p: a(href='http:\u002F\u002Fscouting.org\u002F' target='_blank') Boy Scouts of America\r\n    .col-thirds\r\n      h4 Site Map\r\n      ul.foot-nav\r\n        li: a(href='.\u002Findex.html') Home\r\n        li: a(href='.\u002Fabout.html') About Us\r\n        if now \u003C= expires\r\n          li: a(href='.\u002Fpoinsettias.html') Support Us\r\n        else\r\n          li: a(href='.\u002Fsupport.html') Support Us\r\n        li: a(href='.\u002Fresources.html') Tools and Resources\r\n        li: a(href='.\u002Fterms.html') Terms and Privacy Policy\r\n  .foot-end\r\n    p &copy;2019 Troop 151\r\n","app\u002Fassets\u002Fpartials\u002F_foxycart.html":"\u003C!-- FOXYCART --\u003E\n\u003Cscript data-cfasync=\"false\" src=\"https:\u002F\u002Fcdn.foxycart.com\u002Ft151\u002Floader.js\" async defer\u003E\u003C\u002Fscript\u003E\n\u003C!-- \u002FFOXYCART --\u003E\n"};
;var locals_for_with = (locals || {});(function (pageFile, scripts) {;pug_debug_line = 1;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";











;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";


















;pug_debug_line = 14;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";






















;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";



















;pug_debug_line = 31;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_mixins.pug";






















































































;pug_debug_line = 3;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fthankyou.pug";
var pageTitle = 'Thank You'
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fthankyou.pug";
var pageDesc = 'Thank You for contacting Troop 151'
;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Fthankyou.pug";
var mastheadImg ='waterfall.jpg'
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
if (mastheadImg) {
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
var mastheadImgUrl = './img/mastheads/' + mastheadImg
}
else {
;pug_debug_line = 12;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
var mastheadImgUrl = './img/mastheads/masthead_img.jpg'
}
;pug_debug_line = 14;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003C!DOCTYPE html\u003E";
;pug_debug_line = 15;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Chtml prefix=\"og: http:\u002F\u002Fogp.me\u002Fns#\" lang=\"en\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Chead\u003E";
;pug_debug_line = 1;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta charset=\"utf-8\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta" + (" name=\"description\""+pug.attr("content", pageDesc, true, true)) + "\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta name=\"author\" content=\"Troop 151 Broomall, PA\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta" + (" property=\"og:title\""+pug.attr("content", pageTitle, true, true)) + "\u003E";
;pug_debug_line = 8;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta" + (" property=\"og:description\""+pug.attr("content", pageDesc, true, true)) + "\u003E";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta property=\"og:type\" content=\"website\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta" + (" property=\"og:url\""+pug.attr("content", "https://t151.org/" + pageFile + '.html', true, true)) + "\u003E";
;pug_debug_line = 11;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta" + (" property=\"og:image\""+pug.attr("content", mastheadImgUrl, true, true)) + "\u003E";
;pug_debug_line = 12;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta property=\"og:image:width\" content=\"3264\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Cmeta property=\"og:image:height\" content=\"2448\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Clink rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"\u002Fimg\u002Ffavicon\u002Fapple-touch-icon.png\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Clink rel=\"icon\" type=\"image\u002Fpng\" sizes=\"32x32\" href=\"\u002Fimg\u002Ffavicon\u002Ffavicon-32x32.png\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Clink rel=\"icon\" type=\"image\u002Fpng\" sizes=\"16x16\" href=\"\u002Fimg\u002Ffavicon\u002Ffavicon-16x16.png\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Clink rel=\"manifest\" href=\"\u002Fimg\u002Ffavicon\u002Fsite.webmanifest\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Clink rel=\"mask-icon\" href=\"\u002Fimg\u002Ffavicon\u002Fsafari-pinned-tab.svg\" color=\"#5bbad5\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Cmeta name=\"apple-mobile-web-app-title\" content=\"Troop 151\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Cmeta name=\"application-name\" content=\"Troop 151\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Cmeta name=\"msapplication-TileColor\" content=\"#da532c\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_favicon.pug";
pug_html = pug_html + "\u003Cmeta name=\"theme-color\" content=\"#da532c\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_head.pug";
pug_html = pug_html + "\u003Clink href=\"app.css\" rel=\"stylesheet\" type=\"text\u002Fcss\"\u003E\u003C\u002Fhead\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cbody\u003E";
;pug_debug_line = 20;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cdiv id=\"main\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cheader\u003E";
;pug_debug_line = 1;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Cnav id=\"top_nav\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 2;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "Troop 151\u003C\u002Fh1\u003E";
;pug_debug_line = 3;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Cul\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Findex.html\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "&#127968;\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "\u003Ca href=\"#footer\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_top_nav.pug";
pug_html = pug_html + "&#x2630;\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fnav\u003E";
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Csection" + (" id=\"masthead\""+pug.attr("style", pug.style('background: no-repeat center/cover url('+mastheadImgUrl+')'), true, true)) + "\u003E";
;pug_debug_line = 24;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cdiv class=\"masthead-content\"\u003E";
;pug_debug_line = 25;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fthankyou.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fthankyou.pug";
pug_html = pug_html + "Thank You\u003C\u002Fh1\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fthankyou.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fthankyou.pug";
pug_html = pug_html + "for your message.\u003C\u002Fp\u003E";
;pug_debug_line = 11;pug_debug_filename = "app\u002Fassets\u002Fthankyou.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 11;pug_debug_filename = "app\u002Fassets\u002Fthankyou.pug";
pug_html = pug_html + "Someone will reply to you shortly.\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fsection\u003E\u003C\u002Fheader\u003E";
;pug_debug_line = 30;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cdiv id=\"content\"\u003E";
;pug_debug_line = 31;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
;pug_debug_line = 32;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Carticle id=\"contact\"\u003E";
;pug_debug_line = 33;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cheader\u003E";
;pug_debug_line = 34;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 34;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "Contact Us\u003C\u002Fh1\u003E\u003C\u002Fheader\u003E";
;pug_debug_line = 35;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
pug_html = pug_html + "\u003Cdiv id=\"contact-form\"\u003E";
;pug_debug_line = 1;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cform action=\"https:\u002F\u002Fapp.99inbound.com\u002Fapi\u002Fe\u002FqnSf2KrH\" method=\"POST\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-wrap\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"formcol\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"form\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Clabel for=\"name\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "Name:\u003C\u002Flabel\u003E";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cinput type=\"text\" name=\"name\" id=\"name\" placeholder=\"Joe Smith\" required autocomplete=\"name\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"form\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Clabel for=\"__replyto\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "Email:\u003C\u002Flabel\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cinput type=\"email\" name=\"__replyto\" id=\"__replyto\" placeholder=\"jsmith@example.com\" required autocomplete=\"email\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 27;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"form\"\u003E";
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Clabel for=\"phone\"\u003E";
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "Phone:\u003C\u002Flabel\u003E";
;pug_debug_line = 29;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cinput type=\"tel\" name=\"phone\" id=\"phone\" placeholder=\"610-555-1212\" autocomplete=\"tel\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 36;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"formcol\"\u003E";
;pug_debug_line = 37;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv class=\"form\"\u003E";
;pug_debug_line = 38;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Clabel for=\"message\"\u003E";
;pug_debug_line = 38;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "Message:\u003C\u002Flabel\u003E";
;pug_debug_line = 39;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Ctextarea name=\"message\" id=\"message\" placeholder=\"Your message here\" minlength=\"20\" rows=\"6\" cols=\"20\"\u003E\u003C\u002Ftextarea\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 47;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cinput type=\"hidden\" name=\"__redirect\" id=\"__redirect\" value=\"\"\u003E";
;pug_debug_line = 53;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cinput type=\"hidden\" name=\"__subject\" id=\"__subject\" value=\"Troop 151 Website Contact\"\u003E";
;pug_debug_line = 59;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cdiv style=\"position: absolute; left: -5000px;\"\u003E\n\u003Cinput type=\"checkbox\" name=\"conservative_cornflower_blue_matte_headphones\" value=\"1\" tabindex=\"-1\" autocomplete=\"no\"\u003E\n\u003C\u002Fdiv\u003E";
;pug_debug_line = 62;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cinput type=\"submit\" id=\"form_submit\" value=\"Send Message\"\u003E\u003C\u002Fform\u003E";
;pug_debug_line = 67;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\u003Cscript\u003E";
;pug_debug_line = 68;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "var r = document.getElementById('__redirect')";
;pug_debug_line = 69;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 69;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "var s = window.location.href";
;pug_debug_line = 70;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 70;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "if (s.indexOf('.html') !== -1 ) {";
;pug_debug_line = 71;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 71;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "  var re = \u002F(.+\\\u002F)(.+\\.html?$)\u002Fi";
;pug_debug_line = 72;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 72;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "  r.value = s.replace(re, '$1') + 'thankyou.html'";
;pug_debug_line = 73;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 73;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "} else {";
;pug_debug_line = 74;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 74;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "  r.value = s + 'thankyou.html'";
;pug_debug_line = 75;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 75;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_contact.pug";
pug_html = pug_html + "}\u003C\u002Fscript\u003E\u003C\u002Fdiv\u003E\u003C\u002Farticle\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 1;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
var now = new Date()
;pug_debug_line = 2;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
var expires = new Date('2019-11-17T23:59:00')
;pug_debug_line = 3;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cfooter id=\"footer\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-wrap\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-thirds\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cimg class=\"foot-img\" src=\".\u002Fimg\u002F151-patch.png\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca class=\"join-button\" href=\"https:\u002F\u002Fmy.bsa.us\u002F525taa0151mb\" target=\"_blank\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Join Now\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 8;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-thirds\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 9;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Troop 151, BSA\u003C\u002Fh4\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\"http:\u002F\u002Fcubpack151.org\u002F\" target=\"_blank\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Pack 151\u003C\u002Fa\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 11;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 11;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Crew 151\u003C\u002Fp\u003E";
;pug_debug_line = 12;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 12;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Chartered To\u003C\u002Fh4\u003E";
;pug_debug_line = 13;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 13;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\"http:\u002F\u002Fmarplepres.org\u002F\" target=\"_blank\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Marple Presbyterian Church\u003C\u002Fa\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 14;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 14;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "150 North Sproul Road\u003C\u002Fp\u003E";
;pug_debug_line = 15;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 15;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Broomall, PA 19008\u003C\u002Fp\u003E";
;pug_debug_line = 16;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 16;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Affiliated With\u003C\u002Fh4\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\"http:\u002F\u002Fcolbsa.org\u002Fconstellation\u002F\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Constellation District\u003C\u002Fa\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\"http:\u002F\u002Fcolbsa.org\u002F\" target=\"_blank\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Cradle of Liberty Council\u003C\u002Fa\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\"http:\u002F\u002Fscouting.org\u002F\" target=\"_blank\"\u003E";
;pug_debug_line = 19;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Boy Scouts of America\u003C\u002Fa\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 20;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-thirds\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 21;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Site Map\u003C\u002Fh4\u003E";
;pug_debug_line = 22;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cul class=\"foot-nav\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Findex.html\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Home\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 24;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 24;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Fabout.html\"\u003E";
;pug_debug_line = 24;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "About Us\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 25;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
if (now <= expires) {
;pug_debug_line = 26;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 26;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Fpoinsettias.html\"\u003E";
;pug_debug_line = 26;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Support Us\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
}
else {
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Fsupport.html\"\u003E";
;pug_debug_line = 28;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Support Us\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
}
;pug_debug_line = 29;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 29;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Fresources.html\"\u003E";
;pug_debug_line = 29;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Tools and Resources\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 30;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 30;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Ca href=\".\u002Fterms.html\"\u003E";
;pug_debug_line = 30;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "Terms and Privacy Policy\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 31;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cdiv class=\"foot-end\"\u003E";
;pug_debug_line = 32;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 32;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_foot.pug";
pug_html = pug_html + "&copy;2019 Troop 151\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Ffooter\u003E";
;pug_debug_line = 40;pug_debug_filename = "app\u002Fassets\u002Fpartials\u002F_layout.pug";
if (scripts == 'foxycart') {
pug_html = pug_html + "\u003C!-- FOXYCART --\u003E\n\u003Cscript data-cfasync=\"false\" src=\"https:\u002F\u002Fcdn.foxycart.com\u002Ft151\u002Floader.js\" async defer\u003E\u003C\u002Fscript\u003E\n\u003C!-- \u002FFOXYCART --\u003E\n";
}
pug_html = pug_html + "\u003C\u002Fbody\u003E\u003C\u002Fhtml\u003E";}.call(this,"pageFile" in locals_for_with?locals_for_with.pageFile:typeof pageFile!=="undefined"?pageFile:undefined,"scripts" in locals_for_with?locals_for_with.scripts:typeof scripts!=="undefined"?scripts:undefined));} catch (err) {pug.rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;};
module.exports = template;
});

;require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map