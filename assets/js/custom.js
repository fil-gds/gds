$( document ).ready( function() {

  // Init
  $( document ).foundation();

} );

$( document ).ready( function() {

  window.checkBreakpoint = function() {

    var mediaQueryElement = document.querySelector( '.js-mediaquery' );
    var zindex = window.getComputedStyle( mediaQueryElement ).getPropertyValue( 'z-index' );

    switch( zindex ) {
      case "0":
        return "small";
      case "1":
        return "medium";
      case "2":
        return "large";
      default:
        return "default";
    }
  };

});

(function($,sr){

  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100);
      };
  }
  // smartresize
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');

// Taken from: https://davidwalsh.name/css-animation-callback
function whichTransitionEvent() {

    var el = document.createElement('fake'),
        transEndEventNames = {
            'WebkitTransition' : 'webkitTransitionEnd',// Saf 6, Android Browser
            'MozTransition'    : 'transitionend',      // only for FF < 15
            'transition'       : 'transitionend'       // IE10, Opera, Chrome, FF 15+, Saf 7+
        };

        for ( var t in transEndEventNames ) {
            if( el.style[ t ] !== undefined ) {
                return transEndEventNames[ t ];
            }
        }
}

var transEndEventName = whichTransitionEvent();

// https://github.com/faisalman/ua-parser-js
(function(window,undefined){"use strict";var LIBVERSION="0.7.10",EMPTY="",UNKNOWN="?",FUNC_TYPE="function",UNDEF_TYPE="undefined",OBJ_TYPE="object",STR_TYPE="string",MAJOR="major",MODEL="model",NAME="name",TYPE="type",VENDOR="vendor",VERSION="version",ARCHITECTURE="architecture",CONSOLE="console",MOBILE="mobile",TABLET="tablet",SMARTTV="smarttv",WEARABLE="wearable",EMBEDDED="embedded";var util={extend:function(regexes,extensions){var margedRegexes={};for(var i in regexes){if(extensions[i]&&extensions[i].length%2===0){margedRegexes[i]=extensions[i].concat(regexes[i])}else{margedRegexes[i]=regexes[i]}}return margedRegexes},has:function(str1,str2){if(typeof str1==="string"){return str2.toLowerCase().indexOf(str1.toLowerCase())!==-1}else{return false}},lowerize:function(str){return str.toLowerCase()},major:function(version){return typeof version===STR_TYPE?version.split(".")[0]:undefined}};var mapper={rgx:function(){var result,i=0,j,k,p,q,matches,match,args=arguments;while(i<args.length&&!matches){var regex=args[i],props=args[i+1];if(typeof result===UNDEF_TYPE){result={};for(p in props){if(props.hasOwnProperty(p)){q=props[p];if(typeof q===OBJ_TYPE){result[q[0]]=undefined}else{result[q]=undefined}}}}j=k=0;while(j<regex.length&&!matches){matches=regex[j++].exec(this.getUA());if(!!matches){for(p=0;p<props.length;p++){match=matches[++k];q=props[p];if(typeof q===OBJ_TYPE&&q.length>0){if(q.length==2){if(typeof q[1]==FUNC_TYPE){result[q[0]]=q[1].call(this,match)}else{result[q[0]]=q[1]}}else if(q.length==3){if(typeof q[1]===FUNC_TYPE&&!(q[1].exec&&q[1].test)){result[q[0]]=match?q[1].call(this,match,q[2]):undefined}else{result[q[0]]=match?match.replace(q[1],q[2]):undefined}}else if(q.length==4){result[q[0]]=match?q[3].call(this,match.replace(q[1],q[2])):undefined}}else{result[q]=match?match:undefined}}}}i+=2}return result},str:function(str,map){for(var i in map){if(typeof map[i]===OBJ_TYPE&&map[i].length>0){for(var j=0;j<map[i].length;j++){if(util.has(map[i][j],str)){return i===UNKNOWN?undefined:i}}}else if(util.has(map[i],str)){return i===UNKNOWN?undefined:i}}return str}};var maps={browser:{oldsafari:{version:{"1.0":"/8",1.2:"/1",1.3:"/3","2.0":"/412","2.0.2":"/416","2.0.3":"/417","2.0.4":"/419","?":"/"}}},device:{amazon:{model:{"Fire Phone":["SD","KF"]}},sprint:{model:{"Evo Shift 4G":"7373KT"},vendor:{HTC:"APA",Sprint:"Sprint"}}},os:{windows:{version:{ME:"4.90","NT 3.11":"NT3.51","NT 4.0":"NT4.0",2000:"NT 5.0",XP:["NT 5.1","NT 5.2"],Vista:"NT 6.0",7:"NT 6.1",8:"NT 6.2",8.1:"NT 6.3",10:["NT 6.4","NT 10.0"],RT:"ARM"}}}};var regexes={browser:[[/(opera\smini)\/([\w\.-]+)/i,/(opera\s[mobiletab]+).+version\/([\w\.-]+)/i,/(opera).+version\/([\w\.]+)/i,/(opera)[\/\s]+([\w\.]+)/i],[NAME,VERSION],[/(OPiOS)[\/\s]+([\w\.]+)/i],[[NAME,"Opera Mini"],VERSION],[/\s(opr)\/([\w\.]+)/i],[[NAME,"Opera"],VERSION],[/(kindle)\/([\w\.]+)/i,/(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]+)*/i,/(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i,/(?:ms|\()(ie)\s([\w\.]+)/i,/(rekonq)\/([\w\.]+)*/i,/(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs)\/([\w\.-]+)/i],[NAME,VERSION],[/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i],[[NAME,"IE"],VERSION],[/(edge)\/((\d+)?[\w\.]+)/i],[NAME,VERSION],[/(yabrowser)\/([\w\.]+)/i],[[NAME,"Yandex"],VERSION],[/(comodo_dragon)\/([\w\.]+)/i],[[NAME,/_/g," "],VERSION],[/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i,/(qqbrowser)[\/\s]?([\w\.]+)/i],[NAME,VERSION],[/(uc\s?browser)[\/\s]?([\w\.]+)/i,/ucweb.+(ucbrowser)[\/\s]?([\w\.]+)/i,/JUC.+(ucweb)[\/\s]?([\w\.]+)/i],[[NAME,"UCBrowser"],VERSION],[/(dolfin)\/([\w\.]+)/i],[[NAME,"Dolphin"],VERSION],[/((?:android.+)crmo|crios)\/([\w\.]+)/i],[[NAME,"Chrome"],VERSION],[/XiaoMi\/MiuiBrowser\/([\w\.]+)/i],[VERSION,[NAME,"MIUI Browser"]],[/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)/i],[VERSION,[NAME,"Android Browser"]],[/FBAV\/([\w\.]+);/i],[VERSION,[NAME,"Facebook"]],[/fxios\/([\w\.-]+)/i],[VERSION,[NAME,"Firefox"]],[/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i],[VERSION,[NAME,"Mobile Safari"]],[/version\/([\w\.]+).+?(mobile\s?safari|safari)/i],[VERSION,NAME],[/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i],[NAME,[VERSION,mapper.str,maps.browser.oldsafari.version]],[/(konqueror)\/([\w\.]+)/i,/(webkit|khtml)\/([\w\.]+)/i],[NAME,VERSION],[/(navigator|netscape)\/([\w\.-]+)/i],[[NAME,"Netscape"],VERSION],[/(swiftfox)/i,/(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,/(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/([\w\.-]+)/i,/(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i,/(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,/(links)\s\(([\w\.]+)/i,/(gobrowser)\/?([\w\.]+)*/i,/(ice\s?browser)\/v?([\w\._]+)/i,/(mosaic)[\/\s]([\w\.]+)/i],[NAME,VERSION]],cpu:[[/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i],[[ARCHITECTURE,"amd64"]],[/(ia32(?=;))/i],[[ARCHITECTURE,util.lowerize]],[/((?:i[346]|x)86)[;\)]/i],[[ARCHITECTURE,"ia32"]],[/windows\s(ce|mobile);\sppc;/i],[[ARCHITECTURE,"arm"]],[/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i],[[ARCHITECTURE,/ower/,"",util.lowerize]],[/(sun4\w)[;\)]/i],[[ARCHITECTURE,"sparc"]],[/((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+;))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i],[[ARCHITECTURE,util.lowerize]]],device:[[/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i],[MODEL,VENDOR,[TYPE,TABLET]],[/applecoremedia\/[\w\.]+ \((ipad)/],[MODEL,[VENDOR,"Apple"],[TYPE,TABLET]],[/(apple\s{0,1}tv)/i],[[MODEL,"Apple TV"],[VENDOR,"Apple"]],[/(archos)\s(gamepad2?)/i,/(hp).+(touchpad)/i,/(kindle)\/([\w\.]+)/i,/\s(nook)[\w\s]+build\/(\w+)/i,/(dell)\s(strea[kpr\s\d]*[\dko])/i],[VENDOR,MODEL,[TYPE,TABLET]],[/(kf[A-z]+)\sbuild\/[\w\.]+.*silk\//i],[MODEL,[VENDOR,"Amazon"],[TYPE,TABLET]],[/(sd|kf)[0349hijorstuw]+\sbuild\/[\w\.]+.*silk\//i],[[MODEL,mapper.str,maps.device.amazon.model],[VENDOR,"Amazon"],[TYPE,MOBILE]],[/\((ip[honed|\s\w*]+);.+(apple)/i],[MODEL,VENDOR,[TYPE,MOBILE]],[/\((ip[honed|\s\w*]+);/i],[MODEL,[VENDOR,"Apple"],[TYPE,MOBILE]],[/(blackberry)[\s-]?(\w+)/i,/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|huawei|meizu|motorola|polytron)[\s_-]?([\w-]+)*/i,/(hp)\s([\w\s]+\w)/i,/(asus)-?(\w+)/i],[VENDOR,MODEL,[TYPE,MOBILE]],[/\(bb10;\s(\w+)/i],[MODEL,[VENDOR,"BlackBerry"],[TYPE,MOBILE]],[/android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7)/i],[MODEL,[VENDOR,"Asus"],[TYPE,TABLET]],[/(sony)\s(tablet\s[ps])\sbuild\//i,/(sony)?(?:sgp.+)\sbuild\//i],[[VENDOR,"Sony"],[MODEL,"Xperia Tablet"],[TYPE,TABLET]],[/(?:sony)?(?:(?:(?:c|d)\d{4})|(?:so[-l].+))\sbuild\//i],[[VENDOR,"Sony"],[MODEL,"Xperia Phone"],[TYPE,MOBILE]],[/\s(ouya)\s/i,/(nintendo)\s([wids3u]+)/i],[VENDOR,MODEL,[TYPE,CONSOLE]],[/android.+;\s(shield)\sbuild/i],[MODEL,[VENDOR,"Nvidia"],[TYPE,CONSOLE]],[/(playstation\s[34portablevi]+)/i],[MODEL,[VENDOR,"Sony"],[TYPE,CONSOLE]],[/(sprint\s(\w+))/i],[[VENDOR,mapper.str,maps.device.sprint.vendor],[MODEL,mapper.str,maps.device.sprint.model],[TYPE,MOBILE]],[/(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i],[VENDOR,MODEL,[TYPE,TABLET]],[/(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i,/(zte)-(\w+)*/i,/(alcatel|geeksphone|huawei|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]+)*/i],[VENDOR,[MODEL,/_/g," "],[TYPE,MOBILE]],[/(nexus\s9)/i],[MODEL,[VENDOR,"HTC"],[TYPE,TABLET]],[/[\s\(;](xbox(?:\sone)?)[\s\);]/i],[MODEL,[VENDOR,"Microsoft"],[TYPE,CONSOLE]],[/(kin\.[onetw]{3})/i],[[MODEL,/\./g," "],[VENDOR,"Microsoft"],[TYPE,MOBILE]],[/\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?(:?\s4g)?)[\w\s]+build\//i,/mot[\s-]?(\w+)*/i,/(XT\d{3,4}) build\//i,/(nexus\s[6])/i],[MODEL,[VENDOR,"Motorola"],[TYPE,MOBILE]],[/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i],[MODEL,[VENDOR,"Motorola"],[TYPE,TABLET]],[/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n8000|sgh-t8[56]9|nexus 10))/i,/((SM-T\w+))/i],[[VENDOR,"Samsung"],MODEL,[TYPE,TABLET]],[/((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-n900))/i,/(sam[sung]*)[\s-]*(\w+-?[\w-]*)*/i,/sec-((sgh\w+))/i],[[VENDOR,"Samsung"],MODEL,[TYPE,MOBILE]],[/(samsung);smarttv/i],[VENDOR,MODEL,[TYPE,SMARTTV]],[/\(dtv[\);].+(aquos)/i],[MODEL,[VENDOR,"Sharp"],[TYPE,SMARTTV]],[/sie-(\w+)*/i],[MODEL,[VENDOR,"Siemens"],[TYPE,MOBILE]],[/(maemo|nokia).*(n900|lumia\s\d+)/i,/(nokia)[\s_-]?([\w-]+)*/i],[[VENDOR,"Nokia"],MODEL,[TYPE,MOBILE]],[/android\s3\.[\s\w;-]{10}(a\d{3})/i],[MODEL,[VENDOR,"Acer"],[TYPE,TABLET]],[/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i],[[VENDOR,"LG"],MODEL,[TYPE,TABLET]],[/(lg) netcast\.tv/i],[VENDOR,MODEL,[TYPE,SMARTTV]],[/(nexus\s[45])/i,/lg[e;\s\/-]+(\w+)*/i],[MODEL,[VENDOR,"LG"],[TYPE,MOBILE]],[/android.+(ideatab[a-z0-9\-\s]+)/i],[MODEL,[VENDOR,"Lenovo"],[TYPE,TABLET]],[/linux;.+((jolla));/i],[VENDOR,MODEL,[TYPE,MOBILE]],[/((pebble))app\/[\d\.]+\s/i],[VENDOR,MODEL,[TYPE,WEARABLE]],[/android.+;\s(glass)\s\d/i],[MODEL,[VENDOR,"Google"],[TYPE,WEARABLE]],[/android.+(\w+)\s+build\/hm\1/i,/android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i,/android.+(mi[\s\-_]*(?:one|one[\s_]plus)?[\s_]*(?:\d\w)?)\s+build/i],[[MODEL,/_/g," "],[VENDOR,"Xiaomi"],[TYPE,MOBILE]],[/\s(tablet)[;\/\s]/i,/\s(mobile)[;\/\s]/i],[[TYPE,util.lowerize],VENDOR,MODEL]],engine:[[/windows.+\sedge\/([\w\.]+)/i],[VERSION,[NAME,"EdgeHTML"]],[/(presto)\/([\w\.]+)/i,/(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i,/(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,/(icab)[\/\s]([23]\.[\d\.]+)/i],[NAME,VERSION],[/rv\:([\w\.]+).*(gecko)/i],[VERSION,NAME]],os:[[/microsoft\s(windows)\s(vista|xp)/i],[NAME,VERSION],[/(windows)\snt\s6\.2;\s(arm)/i,/(windows\sphone(?:\sos)*|windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i],[NAME,[VERSION,mapper.str,maps.os.windows.version]],[/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],[[NAME,"Windows"],[VERSION,mapper.str,maps.os.windows.version]],[/\((bb)(10);/i],[[NAME,"BlackBerry"],VERSION],[/(blackberry)\w*\/?([\w\.]+)*/i,/(tizen)[\/\s]([\w\.]+)/i,/(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]+)*/i,/linux;.+(sailfish);/i],[NAME,VERSION],[/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i],[[NAME,"Symbian"],VERSION],[/\((series40);/i],[NAME],[/mozilla.+\(mobile;.+gecko.+firefox/i],[[NAME,"Firefox OS"],VERSION],[/(nintendo|playstation)\s([wids34portablevu]+)/i,/(mint)[\/\s\(]?(\w+)*/i,/(mageia|vectorlinux)[;\s]/i,/(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?([\w\.-]+)*/i,/(hurd|linux)\s?([\w\.]+)*/i,/(gnu)\s?([\w\.]+)*/i],[NAME,VERSION],[/(cros)\s[\w]+\s([\w\.]+\w)/i],[[NAME,"Chromium OS"],VERSION],[/(sunos)\s?([\w\.]+\d)*/i],[[NAME,"Solaris"],VERSION],[/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i],[NAME,VERSION],[/(ip[honead]+)(?:.*os\s([\w]+)*\slike\smac|;\sopera)/i],[[NAME,"iOS"],[VERSION,/_/g,"."]],[/(mac\sos\sx)\s?([\w\s\.]+\w)*/i,/(macintosh|mac(?=_powerpc)\s)/i],[[NAME,"Mac OS"],[VERSION,/_/g,"."]],[/((?:open)?solaris)[\/\s-]?([\w\.]+)*/i,/(haiku)\s(\w+)/i,/(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i,/(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i,/(unix)\s?([\w\.]+)*/i],[NAME,VERSION]]};var UAParser=function(uastring,extensions){if(!(this instanceof UAParser)){return new UAParser(uastring,extensions).getResult()}var ua=uastring||(window&&window.navigator&&window.navigator.userAgent?window.navigator.userAgent:EMPTY);var rgxmap=extensions?util.extend(regexes,extensions):regexes;this.getBrowser=function(){var browser=mapper.rgx.apply(this,rgxmap.browser);browser.major=util.major(browser.version);return browser};this.getCPU=function(){return mapper.rgx.apply(this,rgxmap.cpu)};this.getDevice=function(){return mapper.rgx.apply(this,rgxmap.device)};this.getEngine=function(){return mapper.rgx.apply(this,rgxmap.engine)};this.getOS=function(){return mapper.rgx.apply(this,rgxmap.os)};this.getResult=function(){return{ua:this.getUA(),browser:this.getBrowser(),engine:this.getEngine(),os:this.getOS(),device:this.getDevice(),cpu:this.getCPU()}};this.getUA=function(){return ua};this.setUA=function(uastring){ua=uastring;return this};return this};UAParser.VERSION=LIBVERSION;UAParser.BROWSER={NAME:NAME,MAJOR:MAJOR,VERSION:VERSION};UAParser.CPU={ARCHITECTURE:ARCHITECTURE};UAParser.DEVICE={MODEL:MODEL,VENDOR:VENDOR,TYPE:TYPE,CONSOLE:CONSOLE,MOBILE:MOBILE,SMARTTV:SMARTTV,TABLET:TABLET,WEARABLE:WEARABLE,EMBEDDED:EMBEDDED};UAParser.ENGINE={NAME:NAME,VERSION:VERSION};UAParser.OS={NAME:NAME,VERSION:VERSION};if(typeof exports!==UNDEF_TYPE){if(typeof module!==UNDEF_TYPE&&module.exports){exports=module.exports=UAParser}exports.UAParser=UAParser}else{if(typeof define===FUNC_TYPE&&define.amd){define("ua-parser-js",[],function(){return UAParser})}else{window.UAParser=UAParser}}var $=window.jQuery||window.Zepto;if(typeof $!==UNDEF_TYPE){var parser=new UAParser;$.ua=parser.getResult();$.ua.get=function(){return parser.getUA()};$.ua.set=function(uastring){parser.setUA(uastring);var result=parser.getResult();for(var prop in result){$.ua[prop]=result[prop]}}}})(typeof window==="object"?window:this);

var parser              = new UAParser(); // init parser
var currentBrowser      = parser.getResult(); // get some results
var currentBrowserInfo  = currentBrowser.browser.name + '_' + currentBrowser.browser.major; // get a string we can work with

// define browser levels
var levelOne = [
  'IE_11', 'Firefox_47', 'Firefox_45', 'Chrome_52', 'Edge_14', 'Safari_9'
];

var levelTwo = [
  'IE_9', 'IE_10', 'Firefox_38', 'Safari_5', 'Safari_6', 'Safari_8'
];

var levelThree = [
  'IE_7', 'IE_8'
];

// display on the page which browser and version we're using
$( '.js-browser-version' ).text( 'Current Browser: ' + currentBrowser.browser.name + ', v' + currentBrowser.browser.major );

// dependant on which/if it's in an array, update the .js-browser-level field
if ( $.inArray( currentBrowserInfo, levelOne ) !== -1 ) {

  $( '.js-browser-level' ).text( 'Level One' );

} else if ( $.inArray( currentBrowserInfo, levelTwo ) !== -1 ) {

  $( '.js-browser-level' ).text( 'Level Two' );

} else if ( $.inArray( currentBrowserInfo, levelThree ) !== -1 ) {

  $( '.js-browser-level' ).text( 'Level Three' );

} else {

  $( '.js-browser-level' ).text( 'This browser has not been categorized.' );

}

/**
 * Initialises carousels
 */
( function() {

    var oc = $( '.owl-carousel' ).not( '.no-default-carousel' );

    var defaults = {
        loop:       true,
        navigation: false,
        autoplay:   true,
        pagination: true
    }

    oc.each( function() {
        console.log( $( this) );
        var el = $( this );
        var ocOptions = el.data( 'carousel-options' );

        el.owlCarousel( $.extend( defaults, ocOptions ) );

    } );

} )();

/**
* This is a horrible, horrible hack to reduce the padding-bottom on containers that
* have containers following with similar backgrounds, making the spacing (padding) inbetween
* look doubled-up. This would be able to be dealt with in CSS alone if only the CMS 
* didn't add it's own wrapping elements and break the hiarachy present in the
* prototype build  
**/

$( document ).ready( function(){

if ( $('.js-expandable-content').length === 0 ) {

	$( '.component-row--bg-grey, .component-row--bg-grey-to-white').not( '.component-row--expandable, .expandable-content__reveal' ).closest( '.iw_section' ).prev().find( '.component-row--bg-grey, .component-row--bg-white-to-grey' ).not( '.component-row--expandable, .expandable-content__reveal' ).addClass( 'component-row--no-pad' );

	$( '.component-row--bg-white, .component-row--bg-white-to-grey').not( '.component-row--expandable, .expandable-content__reveal' ).closest( '.iw_section' ).prev().find( '.component-row--bg-white, .component-row--bg-grey-to-white' ).not( '.component-row--expandable, .expandable-content__reveal' ).addClass( 'component-row--no-pad' );

	$( '.component-row--bg-grey, .component-row--bg-grey-to-white').not( '.component-row--expandable, .expandable-content__reveal' ).prev( '.component-row--bg-grey, .component-row--bg-white-to-grey' ).not( '.component-row--expandable, .expandable-content__reveal' ).addClass( 'component-row--no-pad' );

	$( '.component-row--bg-white, .component-row--bg-white-to-grey').not( '.component-row--expandable, .expandable-content__reveal' ).prev( '.component-row--bg-white, .component-row--bg-grey-to-white' ).not( '.component-row--expandable, .expandable-content__reveal' ).addClass( 'component-row--no-pad' );

	$( '.component-row--bg-grey, .component-row--bg-grey-to-white').not( '.component-row--expandable, .expandable-content__reveal' ).prev().closest( '.iw_section').find( '.component-row--bg-grey, .component-row--bg-white-to-grey' ).not( '.component-row--expandable, .expandable-content__reveal' ).addClass( 'component-row--no-pad' );

	$( '.component-row--bg-white, .component-row--bg-white-to-grey').not( '.component-row--expandable, .expandable-content__reveal' ).prev().closest( '.iw_section').find( '.component-row--bg-white, .component-row--bg-grey-to-white' ).not( '.component-row--expandable, .expandable-content__reveal' ).addClass( 'component-row--no-pad' );

}



});

$( document ).ready( function() {

    var expandableAreaOpen = false; // track state



    function expandContent( el ) {

        var dataLabel = el.find( '.toggle-label' ).attr( 'data-label' ),
            htmlLabel = el.find( '.toggle-label' ).html();

        el.addClass( 'is-active' ).find( '.toggle-label' ).html( dataLabel ).attr( 'data-label', htmlLabel );
        el.closest( '.js-expandable-content' ).find( '.js-expandable-reveal' ).slideDown();

        expandableAreaOpen = true;

    }


    function collapseContent( el ) {

        var dataLabel = el.find( '.toggle-label' ).attr( 'data-label' ),
            htmlLabel = el.find( '.toggle-label' ).html();

        // switch the wording
        el.removeClass( 'is-active' ).find( '.toggle-label' ).html( dataLabel ).attr( 'data-label', htmlLabel );
        el.closest( '.js-expandable-content' ).find( '.js-expandable-reveal' ).slideUp(); // slideUp clicked reveal

        expandableAreaOpen = false; // update state variable

    }



    $( document ).on( 'click', '.js-expandable-toggle', function( e ) {

        // if expandable content is already expanded when user clicks 'Show more'
        if ( $( this ).closest( '.js-expandable-content' ).find( '.js-expandable-reveal' ).is( ':visible' ) ) {

            collapseContent( $( this ) );

        } else {

            expandContent( $( this ) );

        }

        e.preventDefault();

    } );





} );

$( document ).ready( function() {

    var footerContext = $( '.js-footer-context' ), // Set context, may be removed at some point
        footerMenuInitiated = false; // State variable, helps to further rate limit this thing

    function closeFooterMenu( el ) {

        el.siblings( '.js-footer-menu', footerContext ).slideUp(); // Find and close menu
        el.children( '.accordion-icon', footerContext ).removeClass( 'is-active' ); // Find and remove .is-active class

    }

    function openFooterMenu( el ) {

        $( '.js-footer-menu', footerContext ).slideUp(); // Close other footer menus
        $( '.accordion-icon', footerContext ).removeClass( 'is-active' ); // Remove .is-active classes
        el.siblings( '.js-footer-menu', footerContext ).slideDown(); // Display the one we clicked
        el.children( '.accordion-icon', footerContext ).addClass( 'is-active' ); // Add the .is-active class to current menu

    }

    function initFooterMenu() {

        footerMenuInitiated = true;

        // Create click event on the footer menu title
        // $( document ).on( 'click', '.js-footer-menu-trigger', function() {
        $( '.js-footer-menu-trigger' ).bind( 'click', function() {

            if( $( this ).siblings( '.js-footer-menu', footerContext ).is( ':visible' ) ) {
                // If this menu is visible, run the closeFooterMenu function
                closeFooterMenu( $( this ) );
            } else {
                // If this menu is not visible, run the openFooterMenu function
                openFooterMenu( $( this ) );
            }

            return false;

        } );

    }

    function destroyFooterMenu() {

        footerMenuInitiated = false;

        // $( document ).off( 'click', '.js-footer-menu-trigger' ); // Unbind click event
        $( '.js-footer-menu-trigger' ).unbind( 'click' );
        $( '.accordion-icon', footerContext ).removeClass( 'is-active' ); // Remove all .is-active classes
        $( '.js-footer-menu' ).removeAttr( 'style' ); // Reset inline styles

    }

    // onload, if the screen is small, initiate the footer menus
    if ( checkBreakpoint() == 'small' && !footerMenuInitiated ) {

        initFooterMenu();

    }

    // smartresize = debounce on window.resize helper - see js/custom/smartresize.js
    $( window ).smartresize( function() {

        if ( checkBreakpoint() == 'small' && !footerMenuInitiated ) {
            // If screensize is small, initiate footer menu
            initFooterMenu();
        } else if ( checkBreakpoint() != 'small' ) {
            // Else destroy and remove click events
            destroyFooterMenu();
        }

    } );

} );

(function (fsc) {
    //TODO: this is temporary code used just to run the code on the funds search page.
    if (fsc) {
        initFundsSearch(fsc);
    }
})($('#fundsSearchContainer')[0]);


function initFundsSearch(fundsSearchContainer) {
    multiButton($('#availabilityButtons > .button'));
    $('#fundsQueryForm', $(fundsSearchContainer)).on('submit', doFundsSearch);
}

function doFundsSearch(e) {
    e.preventDefault();
    console.log('SUBMIT > ', e);
    /*

     substring:
     appliedFilters: * /INVESTMENT_COMPANY/NAME|Fidelity
    start:1
    maxResults:10000
    audienceId:1202
    idolQueryParam:fund_prices

     */

    var foo = {
        fundType : $('#fundType').val(),
        fundProvider : $('#fundProvider').val(),
        fundAvailability : $('#fundAvailability').val()
    };

    return false;
}


/*
 multi button
 */

function multiButton(buttonArray, valueFieldSelector) {

    var onButtonClick = function onButtonClick(btnArr) {

        return function (e) {
            var $e = $(e.currentTarget);
            e.preventDefault();

            btnArr.each(function (idx, btn) {
                var $btn = $(btn);
                $btn.removeClass('selected');
            });

            $e.addClass('selected');
            $(valueFieldSelector).val($e.attr('data-value'));

            return false;
        };
    };

    buttonArray.each(function (idx, btn) {
        var $btn = $(btn);

        $btn.on('click', onButtonClick(buttonArray, '#fundAvailability'));
    });
}

$( document ).ready( function() {

    $( '.js-internal-link' ).click( function() {

        if ( location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname ) {

            var target = $( this.hash ),
                el = $( this );

            target = target.length ? target : $( '[name=' + this.hash.slice(1) +']' );

            if ( target.length ) {

                $( 'html, body' ).animate({

                    scrollTop: target.offset().top

                }, 1000 );

                if ( el.hasClass( 'js-internal-link--to-accordion' ) ) {

                    target.find( '.accordion-title' ).click();

                }

                return false;

            }

        }

    });

} );

/**

 * Javascript for the Investment-finder page modal provided by M* .

 * Override Foundation reveal plugin with simple show/hide as angularjs app

 * initialises too late for Foundation to register,

 * plus we dont have any control over the code to add data-reveal to button

 */

$( document ).ready( function(){

	$( document ).on( "click", ".ec-screener-loader-universe-select-explanation .mstar-button-info button", function() {
		$( '.reveal-overlay, #investment-type-modal').show();
	});

	$( document ).on( "click", "#investment-type-modal .close-button", function() {
		$( '.reveal-overlay, #investment-type-modal').hide();
	});


});
$( document ).ready( function() {

    // Check the :before content on .header
    // returns "desktop" or "mobile"
    window.whichNav = function() {
        var c = window.getComputedStyle( document.querySelector( '.header' ), ':before' ).getPropertyValue( 'content' );
            c = c.replace(/[^a-zA-Z 0-9]+/g, ''); // Remove excess punctation etc from string
        return c;
    }

    function debounce( fn, delay ) {
        var timer = null;
        return function () {
            var context = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        };
    }


    var mobileNavInitiated = false,
        subMenuOpen = false,
        thirdLevelMenuOpen = false,
        desktopMyAccounts = $( '.js-desktop-my-accounts' ),
        mobileMyAccounts = desktopMyAccounts.html(),
        mobileMenuOpen = false,
        mobileMyAccountsOpen = false,
        searchOpen = false;


    if ( whichNav() == 'mobile' ) {
        initMobileHeader();
    }

    $( window ).smartresize( function() {

        if ( whichNav() == 'mobile' && !mobileNavInitiated ) {
            initMobileHeader();
        } else if ( whichNav() == 'desktop' && mobileNavInitiated ) {
            destroyMobileHeader();
        }

    } );

    // Header functions
    function initMobileHeader() {
        // Loop through anything that needs adding to main nav
        $( '.js-move-to-main-nav' ).each( function() {
            var item = $( this ).clone(); // Get a clone
            item.addClass( 'primary-nav__list-item' ).find( 'a' ).removeClass( 'utility-nav__link' ).addClass( 'primary-nav__link' ).siblings( '.sub-menu' ).addClass( 'primary-nav__sub-menu' ); // Add classes to make it look/behave like primary nav item
            $( '.primary-nav__list' ).append( item ); // Append to nav
        } );

        $( '.js-mobile-my-accounts' ).append( mobileMyAccounts );

        mobileNavInitiated = true;

    }

    function destroyMobileHeader() {

        // Empty out what was moved for mobile
        $( '.js-mobile-my-accounts' ).empty();
        $( '.primary-nav__list .js-move-to-main-nav' ).remove();
        // Remove inline style
        $( '.primary-nav__list' ).removeAttr( 'style' );

        mobileNavInitiated = false;

    }

    function openSubMenu( el, parentItem, aSubMenuIsOpen, itNeedsMobileHeight, mobileHeight ) {

        // check flex-menu and close it if it's open
        $( '.flexMenu-viewMore' ).hasClass( 'active' ) ? ( $( '.flexMenu-viewMore' ).removeClass( 'active' ), $( '.flexMenu-popup' ).hide() ) : false;


        if ( aSubMenuIsOpen ) {

            // If we have a Sub Menu already open...
            $( '.sub-menu-open' ).each( function() {
                $( this ).removeClass( 'sub-menu-open' ); // Remove the class [close it]
            } );

            // Find anything with is-open, remove the class [close it] and fire callback once animation has ended
            $( '.js-sub-menu.is-open' ).removeClass( 'is-open' ).one( transEndEventName, function( e ) {

                // Add classes to correct Sub Menu [open it]
                el.parent().addClass( 'sub-menu-open' );
                el.siblings( '.js-sub-menu' ).addClass( 'is-open' );

            } );

            // If it needs mobileHeight, set it
            if ( itNeedsMobileHeight && whichNav() == 'mobile' ) {
                $( '.primary-nav__list' ).css( 'min-height', mobileHeight+'px' );
            }

            if ( whichNav() == 'mobile' ) {
                $( 'html, body' ).animate({
                    scrollTop: 91
                }, 500 );
            }

        } else {

            // Add classes to correct Sub Menu [open it]
            el.parent().addClass( 'sub-menu-open' );
            el.siblings( '.js-sub-menu' ).addClass( 'is-open' );

            if ( itNeedsMobileHeight && whichNav() == 'mobile' ) {
                $( '.primary-nav__list' ).css( 'min-height', mobileHeight+'px' );
            }

            if ( whichNav() == 'mobile' ) {
                $( 'html, body' ).animate({
                    scrollTop: 74
                }, 500 );
            }

        }

    }

    function closeSubMenu( el, parentItem ) {

        $( '.primary-nav__list' ).removeAttr( 'style' );
        parentItem.removeClass( 'sub-menu-open' ); // list item
        el.siblings( '.js-sub-menu' ).removeClass( 'is-open' ); // Sub menu

        subMenuOpen = false;

    }

    function openThirdLevelMenu( el ) {

        $( '.js-secondary-sub-menu' ).removeClass( 'is-open' ); // remove excess classes
        $( '.js-secondary-sub-menu-container' ).addClass( 'secondary-is-open' ); // top level wrapper wider
        $( '.js-secondary-sub-menu-trigger' ).removeClass( 'is-active' );
        el.siblings( '.js-secondary-sub-menu' ).addClass( 'is-open' ); // display correct secondary
        el.addClass( 'is-active' );

        if ( whichNav() == 'mobile' ) {
            $( 'html, body' ).animate({
                scrollTop: 74
            }, 500 );
        }

        thirdLevelMenuOpen = true;

    }

    function closeThirdLevelMenu( el ) {

        $( '.js-secondary-sub-menu-container' ).removeClass( 'secondary-is-open' ); // top level wrapper smaller
        el.siblings( '.js-secondary-sub-menu' ).removeClass( 'is-open' ); // remove display of secondary sub menu
        el.removeClass( 'is-active' );

        thirdLevelMenuOpen = false;

    }

    function openSearch() {

        $( '.js-primary-nav' ).addClass( 'nav-search-open' );

        if ( whichNav() == 'mobile' ) {
            $( 'html, body' ).animate({
                scrollTop: 91
            }, 500 );
        }

        searchOpen = true;

    }

    function closeSearch() {

        $( '.js-primary-nav' ).removeClass( 'nav-search-open' );
        $( '.js-nav-search-input' ).val( '' );
        $( '.nav-search__submit' ).addClass( 'disabled' );
        searchOpen = false;

    }

    function openMobileMenu() {

        var menuLabel = $( '.js-mobile-main-nav-trigger' ).find( '.mobile-nav-trigger__label' ),
            htmlLabel = menuLabel.html(),
            dataLabel = menuLabel.attr( 'data-label' );

        if ( mobileMyAccountsOpen ) {
            closeMobileMyAccounts();
        }

        $( '.js-mobile-main-nav-trigger' ).addClass( 'nav-trigger--open' ).parent().addClass( 'menu-open' );
        menuLabel.html( dataLabel ).attr( 'data-label', htmlLabel );
        $( '.js-primary-nav' ).addClass( 'is-open' );

        mobileMenuOpen = true;

    }

    function closeMobileMenu() {

        var menuLabel = $( '.js-mobile-main-nav-trigger' ).find( '.mobile-nav-trigger__label' ),
            htmlLabel = menuLabel.html(),
            dataLabel = menuLabel.attr( 'data-label' );

        $( '.js-mobile-main-nav-trigger' ).removeClass( 'nav-trigger--open' ).parent().removeClass( 'menu-open' );
        menuLabel.html( dataLabel ).attr( 'data-label', htmlLabel );
        $( '.js-primary-nav' ).removeClass( 'is-open' );

        mobileMenuOpen = false;

    }

    function openMobileMyAccounts() {

        if ( mobileMenuOpen ) {
            closeMobileMenu();
        }

        $( '.js-mobile-my-accounts' ).addClass( 'is-open' );
        $( '.js-mobile-my-accounts-trigger' ).parent().addClass( 'menu-open' );
        mobileMyAccountsOpen = true;

    }

    function closeMobileMyAccounts() {

        $( '.js-mobile-my-accounts' ).removeClass( 'is-open' );
        $( '.js-mobile-my-accounts-trigger' ).parent().removeClass( 'menu-open' );
        mobileMyAccountsOpen = false;

    }

    $( '.js-tertiary-flex-menu' ).flexMenu( {
        cutoff: 2,
        linkText: 'More',
        linkTextAll: 'More'
    } );

    // Click events
    $( document ).on( 'click', '.js-sub-menu-trigger', function( e ) {

        var el = $( this ), // Pass $( this ) to function
            parentItem = el.closest( '.js-has-sub-menu' ), // Know your parents
            itNeedsMobileHeight =  $( this ).siblings( '.js-sub-menu' ).find( '.sub-menu-align' ).length > 0, // If this needs mobileHeight
            aSubMenuIsOpen = $( '.js-sub-menu.is-open' ).length > 0, // Do we have any open Sub Menus?
            imAlreadyOpen = parentItem.hasClass( 'sub-menu-open' ); // Is my Sub Menu already open?

        if ( itNeedsMobileHeight ) {
            // If you do need a height for mobile, get it set it
            var mobileHeight = el.siblings( '.js-sub-menu' ).find( '.sub-menu-align' )[ 0 ].getBoundingClientRect().height;
        }

        if ( imAlreadyOpen ) {
            closeSubMenu( el, parentItem );
        } else {
            openSubMenu( el, parentItem, aSubMenuIsOpen, itNeedsMobileHeight, mobileHeight );
        }

        e.preventDefault();

    } );

    $( document ).on( 'click', '.js-secondary-sub-menu-trigger', function( e ) {

        var el = $( this );

        if ( el.siblings( '.js-secondary-sub-menu' ).hasClass( 'is-open' ) ) {
            closeThirdLevelMenu( el );
        } else {
            openThirdLevelMenu( el );
        }

        e.preventDefault();

    } );

    $( document ).on( 'click', '.js-close-sub-menu', function( e ) {

        // Find the closest Sub Menu and remove classes and close
         $( this ).closest( '.js-has-sub-menu' ).removeClass( 'sub-menu-open' ).find( '.js-sub-menu' ).removeClass( 'is-open' );
         $( '.primary-nav__list' ).removeAttr( 'style' );

        e.preventDefault();

    } );

    $( document ).on( 'click', '.js-close-third-level-menu', function( e ) {

        $( this ).closest( '.js-secondary-sub-menu' ).removeClass( 'is-open' );
        $( '.js-secondary-sub-menu-container' ).removeClass( 'secondary-is-open' );
        $( this ).closest( '.has-secondary-sub-menu' ).find( '.js-secondary-sub-menu-trigger' ).removeClass( 'is-active' );

        e.preventDefault();

    } );

    $( document ).on( 'click', '.js-nav-search-trigger', function( e ) {

        if ( searchOpen ) {
            closeSearch();
        } else {
            openSearch();
        }

        e.preventDefault();

    } );

    $( document ).on( 'click', '.js-nav-search-close', function( e ) {

        closeSearch();

        e.preventDefault();

    } );

    $( document ).on( 'click', '.js-mobile-main-nav-trigger', function( e ) {

        if ( mobileMenuOpen ) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }

        e.preventDefault();

    } );

    $( document ).on( 'click', '.js-mobile-my-accounts-trigger', function( e ) {

        if ( mobileMyAccountsOpen ) {
            closeMobileMyAccounts();
        } else {
            openMobileMyAccounts();
        }

        e.preventDefault();

    } );

    $( '.js-nav-search-input' ).keyup( debounce( function() {
        if ( $( this ).val().length > 0 ) {
            $( '.nav-search__submit' ).removeClass( 'disabled' );
        } else {
            $( '.nav-search__submit' ).addClass( 'disabled' );
        }

    }, 250 ) );

} );
/**

 * Javascript for the Pathfinder component.

 * A form that allows the user to choose why they

 * want invest, and how much etc

 */

(function(){



    // Show the correct form when the user makes a choice
    $( '.pathfinder-choice-trigger' ).click( function() {

        var choiceClass = '.js-pathfinder-' + $( this ).parent().find( 'input' ).val() + '-form';

        // Hide all other pathfinder form content
        $( '.js-pathfinder-form-content' ).addClass( 'hide' );

        // Show the correct form
        $( choiceClass ).removeClass( 'hide' );

        $('html, body').animate({
            scrollTop: $( choiceClass ).offset().top
        }, 500);

    } );


    // Perform validation and build the url when the user

    // submits the pathfinder form
    $( '.js-pathfinder-submit' ).click( function( event ) {

        event.preventDefault();

        console.log( "Submitted" );

        // Find its parent container
        var parent = $( this ).closest( '.js-pathfinder-form-content' );

        // Get the target values
        var targetBalance  = parseInt( parent.find( '.balance-input' ).val() );
        var targetYears    = parseInt( parent.find( '.time-input' ).val() );
        var lumpSum        = parseInt( parent.find( '.lump-sum-input' ).val() );
        var monthlyContrib = parseInt( parent.find( '.monthly-contribution-input' ).val() );
        var pensionAge     = parseInt( parent.find( '.pension-age-input' ).val() );
        var childAge       = parseInt( parent.find( '.child-age-input' ).val() );


        // Get the url
        var url = $( this ).attr( 'href' );

        // Build the URL
        url = ( targetBalance > 0 ) ? updateURL( url, 'targetBalance', targetBalance ) : url;
        url = ( targetYears > 0 ) ? updateURL( url, 'targetYears', targetYears ) : url;
        url = ( lumpSum > 0 ) ? updateURL( url, 'lumpSum', lumpSum ) : url;
        url = ( monthlyContrib > 0 ) ? updateURL( url, 'monthlyContrib', monthlyContrib ) : url;
        url = ( pensionAge > 0 ) ? updateURL( url, 'pensionAge', pensionAge ) : url;
        url = ( childAge > 0 ) ? updateURL( url, 'childAge', childAge ) : url;

        // Add the type of goal selected
        url = updateURL( url, 'type', $( this ).data( 'type' ) );

        // Validate
        if ( parent.find( '.lump-sum-input' ).length > 0 && parent.find( '.lump-sum-input' ).val() < 1000 ) {

            console.log( 'Validation error' );
            parent.find( '.lump-sum-input' ).addClass( 'input--error' );
            parent.find( '.form-errors' ).removeClass( 'hide' );

        } else {

            parent.find( '.lump-sum-input' ).removeClass( 'input--error' );
            parent.find( '.form-errors' ).addClass( 'hide' );

        }

        // Only submit if there are no errors
        if ( parent.find( '.input--error' ).length < 1 ) {

            // Redirect with anchor
            window.location = url + '#step-1';

        }

    } );



    /**

     * Function to add URI parameters to url

     * @param  String uri

     * @param  String key

     * @param  String value

     * @return String

     */

    function updateURL(uri, key, value) {

        var regex = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        var separator = uri.indexOf('?') !== -1 ? "&" : "?";

        if (uri.match(regex)) {

            return uri.replace(re, '$1' + key + "=" + value + '$2');

        } else {

            return uri + separator + key + "=" + value;

        }

    }

})();


(function() {    var chart;    var startAmount = 1000;    var startAmountUpdatedByUser = false;    var monthlyDeposit = 100;    var monthlyDepositUpdatedByUser = false;    var numberOfYears = 10;    var targetYears = 10;    var numberOfYearsUpdatedByUser = false;    var riskLevel = 1;    var ready = false;    var loading = false;    var isTouching = false;    var lastX = 0;    var lastY = 0;    var currentSeries;    var ctGrids;    var averagePath;    var graphPoint = $('.graph-point');    var graphKey = $('.graph__key');    var graphLine = $('.graph-line');    var graphContainer = $('.graph-container');    var tooltip = {        container: $('.graph-tooltip'),        poor: $('.graph-tooltip .poor'),        average: $('.graph-tooltip .average'),        good: $('.graph-tooltip .good'),        countUpAnim: null    };    var graphOverlay = $('.graph-overlay');    // Get a reference to input elements    var balanceInput = $('.start-balance');    var monthlyDepositInput = $('.monthly-deposit');    /**     * Generates the options object to initialise the chart. The options will     * vary depending on browser size     * @return Object The chart options     */    function getChartOptions() {        var self = this;        // Build the chart options        var chartOptions = {            showLine: true,            showArea: true,            chartPadding: {                top: 0,                right: 0,                bottom: 60,                left: 80            },            divisor: 4,            fullWidth: true,            axisX: {                showLabel: true,                scaleMinSpace: 350,                labelOffset: {                    x: -2,                    y: 20                },                labelInterpolationFnc: function(value, index) {                    if (numberOfYears > 20) {                        return index % 10 === 0 ? value : null;                    } else {                        return value;                    }                }            },            axisY: {                showLabel: true,                onlyInteger: true,                scaleMinSpace: 50,                labelOffset: {                    x: -10,                    y: 6                },                labelInterpolationFnc: function(value) {                    return '£' + formatMoney(value, 0);                }            }        };        // If we are on mobile modify them        if ($('.responsive').css('z-index') <= 3) {            chartOptions.chartPadding.left = 0;            chartOptions.axisY.showLabel = false;            chartOptions.axisY.offset = 0;            // Add the axis title plugin just for the x axis            chartOptions.plugins = [                Chartist.plugins.ctAxisTitle({                    axisX: {                        axisTitle: 'Years',                        axisClass: 'ct-axis-title',                        offset: {                            x: -45,                            y: 70                        },                        textAnchor: 'left'                    },                    axisY: {}                })            ];        } else {            // Add the title plugin to both axis            chartOptions.plugins = [                Chartist.plugins.ctAxisTitle({                    axisX: {                        axisTitle: 'Years',                        axisClass: 'ct-axis-title',                        offset: {                            x: 0,                            y: 70                        },                        textAnchor: 'middle'                    },                    axisY: {                        axisTitle: 'Balance',                        axisClass: 'ct-axis-title',                        offset: {                            x: -35,                            y: 20                        },                        flipTitle: true                    }                })            ];        }        return chartOptions;    }    /**     * Generates the years array for the y axis of the chartist.js graph     * based on the number of years     */    function getYears() {        // If we have a target year set make the number of years the        // target years        if (targetYears !== null && !numberOfYearsUpdatedByUser) {            numberOfYears = targetYears;        }        var years = [];        for (var i = 0; i <= numberOfYears + 5; i++) {            years.push(i);        }        return years;    }    function drawChart(chart, years, series) {        var chartData = {            // A labels array that can contain any sort of values            labels: years,            // Our series array that contains series objects or in this case series data arrays            series: series        };        if (!chart) {            chart = new Chartist.Line('.ct-chart', chartData, getChartOptions());            chart.on('created', function() {                ready = true;                // We call detach on the graph to remove its default event listeners                // this gives us more control over what happens to the graph on window                // resize etc                chart.detach();                // Grad a reference to the .ct-grids elements as we will make                // use of this a lot                ctGrids = {                    element: $('.ct-grids'),                    width: $('.ct-grids')[0].getBoundingClientRect().right - $('.ct-grids')[0].getBoundingClientRect().left,                    boundingRect: $('.ct-grids')[0].getBoundingClientRect()                };                // Get a reference to the svg path for the average balance                averagePath = {                    element: document.querySelector('.ct-series-b .ct-line'),                    length: document.querySelector('.ct-series-b .ct-line').getTotalLength()                };                // Hide the tooltip and point                hideTooltip();                graphPoint.removeClass('graph-point--visible');                if (!graphOverlay.hasClass('graph-overlay--closing')) {                    graphOverlay.addClass('graph-overlay--visible');                }                // Show the key                graphKey.addClass('graph__key--visible');                // Position the vertical line in the middle                graphLine.css({                    height: $('.ct-horizontal').attr('y2') + 'px',                    left: ctGrids.boundingRect.left                });                // The position to animate left                var graphStartOffset = ctGrids.boundingRect.left - graphContainer.offset().left;                var left = $('.ct-point')[numberOfYears].getBoundingClientRect().left - graphContainer.offset().left;                // Animate the line up the graph                graphLine.finish();                graphLine.animate({                    left: left                }, 1000, function() {                    var point = getAveragePathPoint(left - graphStartOffset);                    graphPoint.finish();                    graphPoint.css({                        left: left,                        top: point.y - 10                    });                    var year = numberOfYears - 1;                    updateTooltip(left, point.y, year, true);                    showTooltip();                    graphPoint.addClass('graph-point--visible');                });                var width = ctGrids.boundingRect.right - ctGrids.boundingRect.left;                var height = ctGrids.boundingRect.bottom - ctGrids.boundingRect.top;                // Work out the x position of the rectangle. If on mobile set to                // 0 as there is no y axis labels, otherwise set to 120 to account                // for the labels                var x = 120;                if ($('.responsive').css('z-index') <= 3) {                    x = 0;                }                // Add the grey background svgrectangle                var svgNS = 'http://www.w3.org/2000/svg';                var rect = document.createElementNS(svgNS, 'rect');                rect.setAttributeNS(null, 'x', x);                rect.setAttributeNS(null, 'y', 0);                rect.setAttributeNS(null, 'height', height);                rect.setAttributeNS(null, 'width', width);                rect.setAttributeNS(null, 'fill', '#f7f7f7');                document.getElementsByClassName('ct-grids')[0].appendChild(rect);                // if (self.model.get('targetAchievable') === false && self.model.get('targetType') !== null && self.model.get('targetBalance') > 0) {                //     $('.target-unachievable').removeClass('hidden');                // } else {                //     $('.target-unachievable').addClass('hidden');                // }            });        } else {            chart.update(this.chartData, getChartOptions());        }    }    function displayMarketPercentages( figures ) {        $( ".good-percent").html( figures.high + "%" );        $( ".average-percent").html( figures.medium + "%" );        $( ".poor-percent").html( figures.low + "%" );    }    function calculateGraph() {        // Get the values from the api        var queryBody = {            "caller": "WEB",            "currency": "GBP",            "riskLevel": riskLevel,            "lumpSump": startAmount,            "goals": [{                "goalName": "Test123",                "payOutYear": "0",                "amount": "0"            }],            "duration": numberOfYears + 5,            "msp": {                "amount": monthlyDeposit,                "mode": 0            },            "returns": 1        };        console.log( 'queryBody: ', queryBody );        $.ajax({            // url: '/json/new-forecast-engine-01.json',            // url: 'https://forecast-service-dev.paasnp.bip.uk.fid-intl.com/rest/fetchForecast',            // type: 'GET',            // live api url (POST)            url: 'https://uat.fidelity.co.uk/gateway/planforecast/v1/investment/returns', // POST            type: 'POST',            // mock data url (GET)            // url: 'assets/js/api.json',            // type: 'GET',                        contentType: 'application/json',            data: JSON.stringify(queryBody),            processData: false,            dataType: 'json',            success: function(response) {                var newSeries = [                    {                        name: 'exceptional',                        data: []                    }, // 0 - Exceptional market                    {                        name: 'average',                        data: []                    }, // 1 - Average market                    {                        name: 'poor',                        data: []                    }, // 2 - poor Line                    {                        name: 'cash',                        data: []                    }, // 3 - cash market                    {                        name: 'average-line',                        data: []                    } // 4 - average line market                ];                // //NOTE:                // // may need sorting : sort(function(a,b){ return a.year -b.year;})                response.wealthProjections.forEach(function(item, index) {                    newSeries[0].data[index] = {                        meta: index,                        value: item.high.value                    };                    newSeries[1].data[index] = {                        meta: index,                        value: item.medium.value                    };                    newSeries[2].data[index] = {                        meta: index,                        value: item.low.value                    };                    newSeries[3].data[index] = {                        meta: index,                        value: startAmount + (index * (monthlyDeposit * 12))                    };                    newSeries[4].data[index] = {                        meta: index,                        value: item.medium.value                    };                });                var marketPercentages = {                    high: response.returnsRate.high,                    medium: response.returnsRate.medium,                    low: response.returnsRate.low,                };                console.log( "marketPercentages", marketPercentages );                displayMarketPercentages( marketPercentages );                console.log(newSeries);                currentSeries = newSeries;                drawChart(chart, getYears(), newSeries);                // self.set({series: newSeries});                // self.set({loading: false});                //                // // See if our goal is achievable                // if (self.get('riskLevel') !== null && self.get('targetBalance') > 0) {                //     var currentSeries = self.get('series')[2].data; // 1 is the average line                //                //     if (currentSeries[self.get('targetYears')].value >= self.get('targetBalance')) {                //         self.set('targetAchievable', true);                //     } else {                //         self.set('targetAchievable', false);                //     }                // }            }        });    }    /**     * Take an integer and format it as money     * like 24,123.24     * @param  {Int} n The number to format     * @param  {Int} c Numnber of decimal places     * @param  {String} d Decimal symbol ( optional )     * @param  {String} t Thousands symbol ( optional )     * @return {String}     */    function formatMoney(n, c, d, t) {        c = isNaN(c = Math.abs(c)) ? 2 : c,            d = d == undefined ? '.' : d,            t = t == undefined ? ',' : t,            s = n < 0 ? '-' : '',            i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + '',            j = (j = i.length) > 3 ? j % 3 : 0;        return s + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');    }    /**     * Gets the point at position x along the average balance path     * @param  {Int} x The x coordintate of the mouse of pointer     * @return {Object}  An object containing an x and y value     */    function getAveragePathPoint(x) {        // Find our position along the average path        var percentAcross = 1 - (((ctGrids.width - x) / ctGrids.width));        // Cap the percentage between 0 and 1        percentAcross = Math.min(Math.max(0, percentAcross), 1);        if (isNaN(percentAcross)) {            return {                x: 0,                y: 0            };        }        // Get the closest point on the average line        return averagePath.element.getPointAtLength(percentAcross * averagePath.length);    }    /**     * Find the year closest to the x coordinate provided     * @param  {Int} x An x coordinate relative to the page     * @return {Int} The closest year on the graph     */    function getClosestYear(x) {        var closestDistance = 999999;        var closestYear;        $('.ct-labels .ct-label.ct-horizontal').each(function(index, label) {            var distance = Math.abs(label.getBoundingClientRect().left - x);            if (distance < closestDistance) {                closestYear = $(label).text();                closestDistance = distance;            }        });        return closestYear;    }    /**     * Updates the position of the point on the graph     * @param  {Int} x     * @param  {Int} y     */    function updatePoint(x, y) {        graphPoint.finish();        graphPoint.css({            left: x,            top: y        });    }    /**     * Positions and updates the chart tooltip with new values     * @param  {Int} x     * @param  {Int} y     */    function updateTooltip(x, y, year, countup) {        var poorMktValue, averageMktValue, goodMktValue;        // By default we don't want to count up        countup = typeof countup !== 'undefined' ? countup : false;        // Position the tooptip        tooltip.container.css({            top: y - tooltip.container.height() * 1.1,            left: x        });        // Update its values        var valuesAtYear = getPointsByYear(year);        poorMktValue = Math.ceil(valuesAtYear[2] / 100) * 100;        averageMktValue = Math.ceil(valuesAtYear[1] / 100) * 100;        goodMktValue = Math.ceil(valuesAtYear[0] / 100) * 100;        tooltip.countUpAnims = tooltip.countUpAnims || {            poor: null,            average: null        };        function createCountUpAnim(self, className, market, val) {            self.tooltip.countUpAnims[market] = new CountUp(self.tooltip[className][0], 0, val, 0, 2.0, {                prefix: '£'            });            self.tooltip.countUpAnims[market].start();        }        function updateCountUpAnim(self, market, val) {            self.tooltip.countUpAnims[market].update(val);        }        // Set the estimated value        // if (countup) {        if (true === false) {            if (this.tooltip.countUpAnims.average === null) {                createCountUpAnim(this, 'poor', 'poor', poorMktValue);                createCountUpAnim(this, 'average', 'average', averageMktValue);                createCountUpAnim(this, 'good', 'good', goodMktValue);            } else {                updateCountUpAnim(this, 'poor', poorMktValue);                updateCountUpAnim(this, 'average', averageMktValue);                updateCountUpAnim(this, 'good', goodMktValue);            }        } else {            tooltip['poor'].empty().append('£' + formatMoney(poorMktValue, 0));            tooltip['average'].empty().append('£' + formatMoney(averageMktValue, 0));            tooltip['good'].empty().append('£' + formatMoney(goodMktValue, 0));        }        // this.updateMarketPercentages();    }    /**    * Find the graph points at a certain x position ( year )    * @param  {Int} year    * @return {Array} An array of the points    */    function getPointsByYear(year) {        var values = [];        currentSeries.forEach(function(series, index) {            values.push(series.data[year].value);        });        return values;    }    /**    * Shows the graph tooltip    */    function showTooltip() {        tooltip.container.addClass('graph-tooltip--visible');    }    /**     * Hides the graph tooltip     */    function hideTooltip() {        tooltip.container.removeClass('graph-tooltip--visible');    }    /**     * Handler for the move events on the graph     * to allow dragging of the tooltip     * @param  Event event     */    function graphPointMove(event) {        if (isTouching) {            // We only want to trigger the mouseover function if            // the user is moving left or right, and not up or down            // this is so the user can still scroll up and down the            // page while touching the graph            var moveX;            var moveY;            if (event.type == 'mousemove') {                moveX = Math.abs(lastX - event.clientX);                moveY = Math.abs(lastY - event.clientY);            } else if (event.type == 'touchmove') {                moveX = Math.abs(lastX - event.originalEvent.touches[0].pageX);                moveY = Math.abs(lastY - event.originalEvent.touches[0].pageY);            }            if (moveX > moveY || moveX > 20) {                event.preventDefault();                graphMouseover(event);            }        }    }    /**     * Handler for mousing over the graph. Responsible for updating the     * chart-info section, showing the tooltip and moving the graph vertical     * line all based on the position of the mouse     * @param  {Event} event     */    function graphMouseover(event) {        if (!loading) {            // Get the x coordinate of the event            var x = 0;            if (event.type == 'mousemove') {                x = event.clientX;            } else if (event.type == 'touchmove') {                x = event.originalEvent.touches[0].pageX;            }            // Find the year closest to the cursor            var year = getClosestYear(x);            // Get the offset from the left of the graph            var graphStartOffset = ctGrids.boundingRect.left - graphContainer.offset().left;            var left = Math.min(Math.max(x - ctGrids.boundingRect.left, 0), ctGrids.boundingRect.right - ctGrids.boundingRect.left);            // Get the closest point on the average line            var point = getAveragePathPoint(left);            // Move the chart line            graphLine.finish();            graphLine.css({                left: left + graphStartOffset            });            // Move the graph point along the average line            updatePoint(left + graphStartOffset, point.y - 10);            // Move graph tooltip            updateTooltip(left + graphStartOffset, point.y, year);        }    }    function graphPointDown(event) {        event.preventDefault();        isTouching = true;        ctGrids.element.attr('class', 'ct-grids ct-grids--grabbing');        // We keep track of the starting x position so we can work out        // whether the user is dragging left and right or up and down        if (event.type == 'mousedown') {            lastX = event.clientX;            lastY = event.clientY;        } else if (event.type == 'touchstart') {            lastX = event.originalEvent.touches[0].pageX;            lastY = event.originalEvent.touches[0].pageY;        }    }    /**     * Handle letting go of the graph point,     * eg mouseleave or touchend     *     * @param  Event event     */    function graphPointLeave(event) {        event.preventDefault();        if (ready) {            isTouching = false;            ctGrids.element.attr('class', 'ct-grids');        }    }    /**    * Handler for the start balance input change. Update the model    * with the value from the input    * @param  {Event} event    */    function updateStartBalance(event) {        var input = $(event.target);        // Removes all non numeric characters from string then        // parse as an integer        var val = parseInt(input.val().replace(/\D/g, ''));        setStartBalance(val);    }    /**     * Set the start amount and perform     * and update based on the new risk     *     * @param Integer value     */    function setStartBalance(balance) {        startAmount = balance;        startAmountUpdatedByUser = true;        calculateGraph();    }    /**     * Handler for the number of years input change. Updates the mode     * with the value from the input     * @param  {Event} event     */    function updateNumberYears(event) {        var val = parseInt($(event.target).val());        if (val > 2) {            numberOfYears = val;            numberOfYearsUpdatedByUser = true;            calculateGraph();        }    }    /**     * Handler for the start balance input field on blur     * @param  {Event} event     */    function formatInput(event) {        var input = $(event.target);        // Removes all non numeric characters from string then        // parse as an integer        var val = formatMoney(parseInt(input.val().replace(/\D/g, '')), 0);        input.val('£' + val);    }    /**     * Handler for the monthly deposit input change. Updates the model     * with the value from the input     * @param  {Event} event     */    function updateMonthlyDeposit(event) {        var input = $(event.target);        // Removes all non numeric characters from string then        // parse as an integer        var val = parseInt(input.val().replace(/\D/g, ''));        console.log("Monthly val: " + val);        setMonthlyDeposit(val);    }    /**     * Set the monthly deposit and perform     * and update based on the new risk     *     * @param Integer value     */    function setMonthlyDeposit(value) {        monthlyDeposit = value;        monthlyDepositUpdatedByUser = true;        calculateGraph();    }    /**    * Handler for for clicking on a risk-select button. This will update    * the risk level of the model and in turn update the graph    * @param  {Event} event    */    function updateRisk(event) {        event.preventDefault();        var val = parseInt($(event.currentTarget).val());        // Swap in the correct risk explanation        $('.risk-explanation').removeClass('hide');        $('.risk-explanation p').addClass('hide');        $('.risk-explanation .risk' + val).removeClass('hide');        $('.forecasting-info').removeClass('hide');        $('.pathfinder__graph').removeClass('hide');        $('.pathfinder__inputs').removeClass('hide');        hideTooltip();        graphPoint.removeClass('graph-point--visible');        // Move pointer to the correct position, only on desktop        var zindex = $('.js-mediaquery').css('z-index');        if (zindex < 3) {            var parent = $(event.currentTarget).parent()[0];            $('.risk-explanation .risk-explanation__pointer').css({                left: parent.getBoundingClientRect().left + ((parent.getBoundingClientRect().right - parent.getBoundingClientRect().left) / 2) - $('.risk-explanation')[0].getBoundingClientRect().left            });        }        // this.model.setRiskLevel(val);        riskLevel = val;        calculateGraph();        $( 'html, body' ).animate({            scrollTop: $( '.js-pathfinder-anchor-1' ).offset().top        }, 750 );        // Update market percentages        showStep2();    }    /**     * Shows and hides the graph overlay explaining what is happening     * @param  Event event     */    function toggleOverlay(event) {        event.preventDefault();        graphOverlay.toggleClass('hidden');    }    /**     * Hides and shows the graph inputs on mobile     */    function toggleSettings(event) {        // event.preventDefault();        $('.graph-inputs').toggleClass('tablet-hidden');        // Scroll back to the graph if it is closing        if ($('.graph-inputs').hasClass('tablet-hidden')) {            $('html, body').animate({                scrollTop: $('#graph-container').offset().top            }, 200);        }    }    /**     * Gets url parameters by name if they exist     * @param  String name The name of the url param     * @return String     */    function urlParam(name) {        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);        if (results === null) {            return null;        } else {            return results[1] || 0;        }    }    function debounce(func, wait, immediate) {        var timeout, args, context, timestamp, result;        var later = function() {            var last = Date.now() - timestamp;            if (last < wait && last >= 0) {                timeout = setTimeout(later, wait - last);            } else {                timeout = null;                if (!immediate) {                    result = func.apply(context, args);                    if (!timeout) context = args = null;                }            }        };        return function() {            context = this;            args = arguments;            timestamp = Date.now();            var callNow = immediate && !timeout;            if (!timeout) timeout = setTimeout(later, wait);            if (callNow) {                result = func.apply(context, args);                context = args = null;            }            return result;        };    }    /**    * Handler for for clicking on a risk-select button. This will update    * the risk level of the model and in turn update the graph    * @param  {Event} event    */    function incomeUpdateRisk(event) {        event.preventDefault();        var val = parseInt($(event.currentTarget).val());        $('.risk-explanation--income-funds').removeClass('hide');        $('.risk-explanation--income-funds p').addClass('hide');        $('.risk-explanation--income-funds .risk' + val).removeClass('hide');        $('.forecasting-info').removeClass('hide');        // Moe pointer to the correct position, only on desktop        var zindex = $('.js-mediaquery').css('z-index');        if ( zindex < 3 ) {            var parent = $(event.currentTarget).parent()[0];            $('.risk-explanation--income-funds .risk-explanation__pointer').css({                left: parent.getBoundingClientRect().left + ((parent.getBoundingClientRect().right - parent.getBoundingClientRect().left) / 2) - $('.risk-explanation--income-funds')[0].getBoundingClientRect().left            });        }        riskLevel = val;        // Update market percentages        $('.fund-info-container--income').load('/personal-investor/investing/pathfinder/risk-' + riskLevel + '.page', function() {            $( document ).foundation();        });    }    /**     * Reveals step 2 of pathfinder     */    function showStep2() {        $('.number-badge.hide').removeClass('hide');        $('.number-badge--dotted').addClass('hide');        $('.step-2-inactive').removeClass('step-2-inactive');        $('.step-2-activatable').removeClass('hide');    }    /**     * Chose a fund and show its performance and tabs     * @param  Event event     */    function selectFund(event) {        event.preventDefault();        var button = $(event.currentTarget).children( '.option-panel__state' );        var container = button.closest('.option-panel');        $('.option-panel').removeClass('is-active');        // $('.js-select-fund-trigger .option-panel__state').html('Select this fund type');        // button.html('Selected');        container.addClass('is-active');        $('.fund-info-container').load('pathfinder-funds/growth/risk-' + riskLevel + '-' + container.data('type') + '.html', function() {            $(document).foundation();            $( 'html, body' ).animate({                scrollTop: $( '.js-pathfinder-anchor-2' ).offset().top            }, 750 );        });    }    /**     * Chose a fund and show its performance and tabs     * @param  Event event     */    function selectIncomeFund(event) {        event.preventDefault();        var val = parseInt($(event.currentTarget).val());        console.log( val );        // 1. get value from the 3 options        // 2. remove classes etc        // 3. load correct fund and animate to it        var button = $(event.currentTarget).children( '.option-panel__state' );        var container = button.closest('.option-panel');        $('.option-panel').removeClass('is-active');        // $('.js-select-fund-trigger .option-panel__state').html('Select this fund type');        // button.html('Selected');        container.addClass('is-active');        $('.fund-info-container').load('/personal-investor/investing/pathfinder/risk-' + riskLevel + '-' + container.data('type') + '.page', function() {            $(document).foundation();            $( 'html, body' ).animate({                scrollTop: $( '.js-pathfinder-anchor-2' ).offset().top            }, 750 );        });    }    if ( $( '.graph-container' ).length > 0 ) {        // Set parameters from url        if (urlParam('targetBalance')) {            targetBalance = parseInt(urlParam('targetBalance'));        }        if (urlParam('targetYears')) {            targetYears = parseInt(urlParam('targetYears'));        }        startAmount = parseInt(urlParam('lumpSum')) || 5000;        $('.lump-sum-input').val(startAmount);        monthlyDeposit = parseInt(urlParam('monthlyContrib')) || 500;        $('.monthly-deposit').val(monthlyDeposit);        numberOfYears = parseInt(urlParam('numberOfYears')) || 10;        $('.number-years').val(numberOfYears);        if (urlParam('pensionAge')) {            numberOfYears = 65 - parseInt(urlParam('pensionAge'));            $('.number-years').val(numberOfYears);        }        if (urlParam('type')) {            targetType = urlParam('type');        }        calculateGraph();        // Graph move event listeners        $('.ct-chart').on('mousemove', graphPointMove);        $('.ct-chart').on('touchmove', graphPointMove);        graphPoint.on('mousemove', graphPointMove);        graphPoint.on('touchmove', graphPointMove);        $('.ct-chart').on('mousedown', graphPointDown);        graphPoint.on('mousedown', graphPointDown);        $('.ct-chart').on('mouseleave', graphPointLeave);        $('.ct-chart').on('mouseup', graphPointLeave);        graphPoint.on('mouseup', graphPointLeave);        // Graph form event listeners        $('.lump-sum-input').on('keyup', debounce(updateStartBalance, 300));        $('.lump-sum-input').on('focusout', formatInput);        $('.monthly-deposit').on('focusout', formatInput);        $('.monthly-deposit').on('keyup', debounce(updateMonthlyDeposit, 300));        $('.number-years').on('keyup', debounce(updateNumberYears, 300));        $('.risk-select').on('click', updateRisk);        $('input[type=radio][name=pathfinder-risk]').on('change', updateRisk);        $('.graph-overlay__ok').on('click', toggleOverlay);        $('.show-settings').on('click', toggleSettings);        $('.graph-inputs__close').on('click', toggleSettings);        $('.graph-inputs__submit').on('click', toggleSettings);        $('.js-select-fund-trigger').on('click', selectFund);        $('input[type=radio][name=risk-level]').on( 'change', incomeUpdateRisk );        $(window).on('resize', debounce(calculateGraph, 500));        $( document ).on( 'click', '.js-pathfinder-inputs-trigger', function( e ) {            $( '.js-pathfinder-inputs' ).slideToggle();            e.preventDefault();        } );    }})();
/**
* Javascript for quiz components
**/

// IIFE closure, isolate "$" (dollar) for jQuery
;(function( $ ){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Page variables
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var $quizEl = $('#quiz');
	var $questions = $( "#quiz [data-question]" );
	var editQuestionLinks = $( '.js-edit-answer' );

	var $quizType = $('#quiz').attr('data-quiz-type');
	var isQuizTypeScore = $quizType === "score" ? true : false ;
	var isQuizTypeList = $quizType === "list" ? true : false ;
	var isQuizTypeCarousel = $quizType === "conditional-carousel" ? true : false ;

	// carousels

	/**************************************************
	// pre-question carousel
	**************************************************/

	var preQuestionCarouselOptions = {

		items: 4,
		itemsDesktop : [1199,4],
		itemsDesktopSmall: [980,4],
		itemsTablet: [830,3],
		itemsTabletSmall: false,
		itemsMobile: [600,2],
		margin: '20px',
		center: true,
		afterInit: carouselResizeInit()
	};

	// store carousel
	var preQuestionCarouselEl = $( '#pre-question-carousel' ).owlCarousel( preQuestionCarouselOptions );
	// store carousel data point for later ( carousel needs to be initialised )
	var preQuestionCarouselData;

	/**************************************************
	// Results carousel
	**************************************************/

	var resultsCarouselOptions = {

		loop:       		true,
        navigation: 		false,
        autoplay:   		true,
        pagination:			true,
		items: 				3,
		itemsDesktop : 		[1199,3],
		itemsDesktopSmall: 	[1024,2],
		itemsTablet: 		[678,1],
		itemsTabletSmall: 	false,
		itemsMobile: 		[600,1]
		// itemsScaleUp: 		true

	};

	// store carousel element
	var resultsCarouselEl = $( '#answers-carousel' );
	// store carousel data for later ( carousel needs to be initialised )
	var resultsCarouselData;

	// store carousel item clones for quiz restart
	var	sipp = $( "[data-answer-slide-name=SIPP]" ).clone();
	var	isa = $( "[data-answer-slide-name=ISA]" ).clone();
	var	gia = $( "[data-answer-slide-name=GIA]" ).clone();
	var	jisa = $( "[data-answer-slide-name=JISA]" ).clone();
	var	jsipp = $( "[data-answer-slide-name=JSIPP]" ).clone();

	// collect cloned items
	var carouselItemClones = sipp.add( isa ).add( gia ).add( jisa ).add( jsipp );

	// animation variables
	var baseAnimSpeed = 250; // miliseconds
	var extendedAnimSpeed = baseAnimSpeed * 2;
	// scrollTo el store
	var screenScrollEls = $(' html, body');


	/*
	* function getVisualData
	* description : get and set dynamic heights on selected elements
	* creates offscreen clones of elements to get visual data
	* used in maniplulating grid cell heights in carousel
	* used in question accordion to overcome "height: auto" transition/animation easing limitation
	*/
	function getVisualData() {

		var cloneWrapper = '<div id="quizCopy" class="offscreenMeasure"></div>';
		var cloneContents = $( '.questions' ).clone();
		var clonedFields = cloneContents.find( 'input[type="radio"]' );
		$.each( clonedFields, function( i ) {
			thisName = $( this ).attr( 'name' );
			$( this ).attr( 'name', thisName+"clone" );
		});
		$( 'body' ).append( cloneWrapper );
		$( '#quizCopy' ).append( cloneContents );
		$( '#quizCopy .questions' ).addClass( 'active' );
		$( '#quizCopy .is-collapsed' ).removeClass( 'is-collapsed' );
		var cloneQuestionCollapseSections = $( '#quizCopy .collapsable' );
		cloneQuestionCollapseSections.css( 'height', 'auto' );

		$.each( cloneQuestionCollapseSections, function( index ){

			$( '#quiz [data-question]').eq( index ).find( '.collapsable' ).attr( 'data-height', $( this ).height() );
			// height with error....
			$( this ).closest( "[data-question]" ).addClass( 'is-error' );
			$( '#quiz [data-question]').eq( index ).find( '.collapsable' ).attr( 'data-height-max', $( this ).height() );
		
		} );

		$( '#quizCopy' ).remove();

	};

	$( window ).smartresize( function( event ){
		getVisualData();
	} );

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Page load functions
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	

	getVisualData();

	// equalHeightItems( '.block-radio' );

	// set initial heights for questions
	$.each( $questions, function( index ){

		if ( index === 0 ) {
			var thisHeight = $( this ).find( '.collapsable' ).data( 'height' );
			$( this ).find( '.collapsable' ).css( 'height', thisHeight );
		} else {
			$( this ).addClass( 'is-collapsed' );
			$( this ).find( '.collapsable' ).css( 'height', '0' );
		}

	} );

	if ( $( '#quiz' ).hasClass( 'js-quiz-conditional' ) ) {
		$( '[data-question-list]' ).addClass( 'hide' );
	}


	function carouselResizeInit() {
		console.log('fN working');
		$('#pre-question-carousel').find('.owl-wrapper').each(function () {
			    var w = $(this).width() / 2;
			    $(this).width(w);
			    $(this).css('margin', '0 auto');
			});

	}

	$('#pre-question-carousel').owlCarousel({
		afterInit: carouselResizeInit()
	});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// END Page load functions
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	// rewrite

	// standard next button
	$( '.js-quiz-next-button' ).click( function( event ){

		event.preventDefault();
		event.stopPropagation();

		// store elements
		var $thisEl = $( this );
		var $thisQuestion = $( this ).closest( "[data-question]" );
		var $thisQuestionCollapseable = $thisQuestion.find( '.collapsable' );
		var $thisQuestionHeight = $thisQuestionCollapseable.data( 'height' );
		var $thisQuestionHeightMax = $thisQuestionCollapseable.data( 'height-max' );
		// check and store conditions
		var radios = $( this ).closest( "[data-question]" ).find( "input[type=radio]" );
		var checkedRadios = radios.filter( ":checked" ).length > 0 ? true : false;
		var hasVisited = $thisQuestion.hasClass( 'visited' ) ? true : false;

		if ( !checkedRadios ) { 
			/* question NOT answered - show error */
			if ( !$thisQuestion.hasClass( 'is-error') ) {
				$thisQuestion.addClass( 'is-error' ).find( '.collapsable' ).css( 'height', $thisQuestionHeightMax );
			}

		} else {

			/* question IS answered - NEXT quiz state */
			collapseSection( $thisQuestion );
			var $nextQuestion = $( '#quiz .questions.active [data-question]' ).not( '.visited' ).first();
			openSection( $nextQuestion );
			scrollScreenToEl( $nextQuestion.prev() );
		}
	});


	// quiz end function helpers

	function quizTypeScoreResult( resultArray ) {

		var scoreCard = 0;
		$.each( resultArray, function( index ){
			scoreCard += parseInt( $( this ).val(), 10 );
			// console.log( 'scoreCard: ', scoreCard);
		});
		// console.log( 'scoreCard: ', scoreCard);
		
		var quizRiskResult = 0;

		if ( scoreCard <= 240 ) {
			quizRiskResult = 1;
		} else if ( scoreCard >= 245 && scoreCard <= 290 ) {
			quizRiskResult = 2;
		} else if ( scoreCard >= 295 && scoreCard <= 335 ) {
			quizRiskResult = 3;
		} else if ( scoreCard >= 340 && scoreCard <= 355 ) {
			quizRiskResult = 4;
		} else if ( scoreCard >= 360 && scoreCard <= 365 ) {
			quizRiskResult = 5;
		} else if ( scoreCard >= 370 ) {
			quizRiskResult = 6;
		}

		$( '.risk-ladder' ).addClass( 'pos-'+ quizRiskResult+' intro' );
		$( '[data-risk-level=' + quizRiskResult + ']').addClass( 'highlite' );
		$( '.risk-ladder-item').eq( quizRiskResult - 1 ).addClass( 'highlight' );

	} // CLOSE quizTypeScoreResult fN


	function quizTypeListResult( resultArray ) {

		var answerResult = true;
		$.each( resultArray, function( index ){
			if ( $( this ).val() == 2 ) {
				answerResult = false;
				return false;
			}
		});

		$.each( resultArray, function( index ){
			if ( $( this ).val() == 2 ) {
				var reindexed = index + 1;
				$( '.response-'+reindexed ).removeClass( 'hide' );
			}
			var idVal = $( this ).attr( "id" );
			var thisText = $( "label[for='"+idVal+"']" ).eq( 0 ).text();
			// console.log('thisText: ', thisText );
			$( '.answers-list .answer-output' ).eq( index ).html( thisText );
		});

		if( answerResult ) {

			$( '.answers [data-answer=2]').addClass( 'hide' );
			$( '.answers .answer-text' ).addClass( 'bg-green1' );
			// console.log('quiz-result-1');
			$( '.answers-carousel .owl-carousel' ).addClass( 'quiz-result-1' );
		
		} else {

			$( '.answers [data-answer=1]').addClass( 'hide' );
			$( '.answers .answer-text' ).addClass( 'bg-blue1' );
			// console.log('quiz-result-2');
			$( '.answers-carousel .owl-carousel' ).addClass( 'quiz-result-2' );
		
		}
	
	} // CLOSE quizTypeListResult fN


	function quizTypeCarouselResult( thisQuestion ) {

		// store carousel items
		var $sippSlide = $( ".answers-carousel [data-answer-slide-name=SIPP]" );
		var $isaSlide = $( ".answers-carousel [data-answer-slide-name=ISA]" ); 
		var $giaSlide = $( ".answers-carousel [data-answer-slide-name=GIA]" );
		var $jsippSlide = $( ".answers-carousel [data-answer-slide-name=JSIPP]" );
		var $jisaSlide = $( ".answers-carousel [data-answer-slide-name=JISA]" );

		// if first question is saving for child
		var isChildProducts = $( '.pre-question input[type=radio]' ).filter( ':checked' ).val() == 2 ? true : false;

		// check if answer invalidates child products
		var areChildProductsIneligable = $( '[data-question-list=2] [data-question]' ).eq( 0 ).find( 'input[type=radio]' ).filter( ':checked' ).val() == 2 ? true : false;

		$( '.questions.active' ).addClass( 'complete' );

		if ( isChildProducts ) {

			$sippSlide.remove();
			$isaSlide.remove();
			$giaSlide.remove();

			resultsCarouselOptions.items = 2;
			resultsCarouselOptions.itemsDesktop = [1199,2];

			if ( areChildProductsIneligable ) {

				$jsippSlide.add( $jisaSlide ).addClass( 'disabled' );
				setCarouselItemHeights();
				
			} else {

				if ( $( '[data-question-list=2] [data-question]' ).eq( 2 ).find( 'input[type=radio]' ).filter( ':checked' ).val() == 1 ) {
					$jsippSlide.addClass( 'disabled' );
				}

				if ( $( '[data-question-list=2] [data-question]' ).eq( 2 ).find( 'input[type=radio]' ).filter( ':checked' ).val() == 2 ) {
					$jisaSlide.addClass( 'disabled' );
				}
				
			}

		} else {

			$jsippSlide.remove();
			$jisaSlide.remove();

			if ( $( '[data-question-list=1] [data-question]' ).eq( 0 ).find( 'input[type=radio]' ).filter( ':checked' ).val() == 1 ) {

				$sippSlide.addClass( 'disabled' );

			}

			if ( $( '[data-question-list=1] [data-question]' ).eq( 2 ).find( 'input[type=radio]' ).filter( ':checked' ).val() == 1 ) {

				$isaSlide.addClass( 'disabled' );

			}
			
		}

		resultsCarouselEl.owlCarousel( resultsCarouselOptions );
		// store carousel
		resultsCarouselData = $( '#answers-carousel' ).data( 'owlCarousel' );

		$('.quiz-carousel__item.disabled').parent().addClass( 'source-order-push' );
		$('.quiz-carousel__item').not( '.disabled' ).parent().addClass( 'source-order-pull' );

		updateResult( ".carousel-total-items", resultsCarouselData.owl.owlItems.length );
		processCarouselAction();
		resizeCarouselItemHeights();
		// setCarouselItemHeights();
		
		collapseSection( thisQuestion );
		editQuestionLinks.addClass( 'disabled' );
		$( '.answers' ).addClass( 'active' );
		scrollScreenToEl( $( '.answers' ) );

	} // CLOSE quizTypeCarouselResult fN


	$( '.js-quiz-end-button' ).click( function( event ){
		console.log('new end fN');
		event.preventDefault();
		event.stopPropagation();

		// store elements
		var $thisEl = $( this );
		var $thisQuestion = $( this ).closest( "[data-question]" );
		var $thisQuestionCollapseable = $thisQuestion.find( '.collapsable' );
		var $thisQuestionHeight = $thisQuestionCollapseable.data( 'height' );
		var $thisQuestionHeightMax = $thisQuestionCollapseable.data( 'height-max' );

		// check and store conditions
		var radios = $( this ).closest( "[data-question]" ).find( "input[type=radio]" );
		var checkedRadios = radios.filter( ":checked" ).length > 0 ? true : false;
		var hasVisited = $thisQuestion.hasClass( 'visited' ) ? true : false;

		if ( !checkedRadios ) { /* question NOT answered - show error */

			if ( !$thisQuestion.hasClass( 'is-error') ) {
				$thisQuestion.addClass( 'is-error' ).find( '.collapsable' ).css( 'height', $thisQuestionHeightMax );
			}

		} else {
				

			if ( !isQuizTypeCarousel ) {

				$( this ).addClass( '--is-loading' );
				var answerArr = collectAnswers();
				// console.log('answerArr: ', answerArr);

				if ( isQuizTypeScore ) {
					quizTypeScoreResult( answerArr );
				}

				if ( isQuizTypeList ) {
					quizTypeListResult( answerArr );
				}

				// section collapse time equals extendedAnimSpeed ( 500 ms );
				collapseSection( $thisQuestion );
					
				setTimeout( function(){
					$( '.questions' ).removeClass( 'active' ).addClass( 'complete' );
					editQuestionLinks.addClass( 'disabled' );
					$( '.answers' ).addClass( 'active' );
					scrollScreenToEl( $( '.answers.active' ) );
				}, extendedAnimSpeed );

			} else {
				quizTypeCarouselResult( $thisQuestion );
			}

		} // end IF checkedRadios

	});


	// old version ///// NOT USED NOW
	// $( '.js-quiz-next-btn' ).click( function( event ){
	// 	console.log('old end fN');
	// 	event.preventDefault();
	// 	event.stopPropagation();

	// 	// store elements
	// 	var $thisEl = $( this );
	// 	var $thisQuestion = $( this ).closest( "[data-question]" );
	// 	var $thisQuestionCollapseable = $thisQuestion.find( '.collapsable' );
	// 	var $thisQuestionHeight = $thisQuestionCollapseable.data( 'height' );
	// 	var $thisQuestionHeightMax = $thisQuestionCollapseable.data( 'height-max' );

	// 	// check and store conditions
	// 	var radios = $( this ).closest( "[data-question]" ).find( "input[type=radio]" );
	// 	var checkedRadios = radios.filter( ":checked" ).length > 0 ? true : false;
	// 	var hasVisited = $thisQuestion.hasClass( 'visited' ) ? true : false;
	// 	var lastQuestion = $thisEl.hasClass( 'js-quiz-btn-last' ) ? true : false;
	// 	var conditionalQuestions = $( this ).hasClass( 'js-quiz-conditional' ) ? true : false;

	// 	if ( !checkedRadios ) { /* question NOT answered - show error */

	// 		if ( !$thisQuestion.hasClass( 'is-error') ) {
	// 			$thisQuestion.addClass( 'is-error' ).find( '.collapsable' ).css( 'height', $thisQuestionHeightMax );
	// 		}

	// 	} else {

	// 		/* question IS answered - NEXT quiz state */

	// 		if ( !lastQuestion ) {
	// 			/* if NOT lastQuestion handler */
	// 			collapseSection( $thisQuestion );
	// 			var $nextQuestion = $( '#quiz .questions.active [data-question]' ).not( '.visited' ).first();
	// 			openSection( $nextQuestion );
	// 			scrollScreenToEl( $nextQuestion.prev() );

	// 		} else {
	// 			/* if IS lastQuestion handler */
				

	// 			if ( !isQuizTypeCarousel ) {

	// 				$( this ).addClass( '--is-loading' );
	// 				var answerArr = collectAnswers();
	// 				// console.log('answerArr: ', answerArr);

	// 				if ( isQuizTypeScore ) {

	// 					var scoreCard = 0;
	// 					$.each( answerArr, function( index ){
	// 						scoreCard += parseInt( $( this ).val(), 10 );
	// 						// console.log( 'scoreCard: ', scoreCard);
	// 					});
	// 					// console.log( 'scoreCard: ', scoreCard);
						
	// 					var quizRiskResult = 0;

	// 					if ( scoreCard <= 240 ) {
	// 						quizRiskResult = 1;
	// 					} else if ( scoreCard >= 245 && scoreCard <= 290 ) {
	// 						quizRiskResult = 2;
	// 					} else if ( scoreCard >= 295 && scoreCard <= 335 ) {
	// 						quizRiskResult = 3;
	// 					} else if ( scoreCard >= 340 && scoreCard <= 355 ) {
	// 						quizRiskResult = 4;
	// 					} else if ( scoreCard >= 360 && scoreCard <= 365 ) {
	// 						quizRiskResult = 5;
	// 					} else if ( scoreCard >= 370 ) {
	// 						quizRiskResult = 6;
	// 					}

	// 					$( '.risk-ladder' ).addClass( 'pos-'+ quizRiskResult+' intro' );
	// 					$( '[data-risk-level=' + quizRiskResult + ']').addClass( 'highlite' );
	// 					$( '.risk-ladder-item').eq( quizRiskResult - 1 ).addClass( 'highlight' );

	// 				}

	// 				if ( isQuizTypeList ) {

	// 					var answerResult = true;
	// 					$.each( answerArr, function( index ){
	// 						if ( $( this ).val() == 2 ) {
	// 							answerResult = false;
	// 							return false;
	// 						}
	// 					});

	// 					$.each( answerArr, function( index ){
	// 						if ( $( this ).val() == 2 ) {
	// 							var reindexed = index + 1;
	// 							$( '.response-'+reindexed ).removeClass( 'hide' );
	// 						}
	// 						var idVal = $( this ).attr( "id" );
	//         				var thisText = $( "label[for='"+idVal+"']" ).eq( 0 ).text();
	// 						// console.log('thisText: ', thisText );
	// 						$( '.answers-list .answer-output' ).eq( index ).html( thisText );
	// 					});

	// 					if( answerResult ) {

	// 						$( '.answers [data-answer=2]').addClass( 'hide' );
	// 						$( '.answers .answer-text' ).addClass( 'bg-green1' );
	// 						// console.log('quiz-result-1');
	// 						$( '.answers-carousel .owl-carousel' ).addClass( 'quiz-result-1' );
						
	// 					} else {

	// 						$( '.answers [data-answer=1]').addClass( 'hide' );
	// 						$( '.answers .answer-text' ).addClass( 'bg-blue1' );
	// 						// console.log('quiz-result-2');
	// 						$( '.answers-carousel .owl-carousel' ).addClass( 'quiz-result-2' );
						
	// 					}

	// 				}

	// 				collapseSection( $thisQuestion );
						
	// 				setTimeout( function(){

	// 					$( '.questions' ).removeClass( 'active' ).addClass( 'complete' );
	// 					editQuestionLinks.addClass( 'disabled' );
	// 					$( '.answers' ).addClass( 'active' );

	// 					scrollScreenToEl( $( '.answers.active' ) );

	// 				}, 500 );

	// 			} else {

	// 				resultsCarouselEl.owlCarousel();
	// 				// store carousel
	// 				resultsCarouselData = $( '.owl-carousel' ).data( 'owlCarousel' );

	// 				// console.log('carouselEl: ', carouselEl);
	// 				// console.log('carousel: ', carousel);

	// 				// resultsCarouselData.reinit({
	// 				// 	afterAction : processCarouselAction
	// 				// });

	// 				$( '.questions.active' ).addClass( 'complete' );
	// 				$( '.answers [data-answer=1], .answers [data-answer=2]').addClass( 'hide' );
	// 				$( '.answers [data-answer=3]' ).removeClass( 'hide' );

	// 				// console.log( "thisVal: ", $( '.pre-question input[type=radio]' ).filter( ':checked' ).val() );

	// 				// if first question is saving for child
	// 				if ( $( '.pre-question input[type=radio]' ).filter( ':checked' ).val() == 4  ) {

	// 					resultsCarouselData.removeItem( 0 );
	// 					resultsCarouselData.removeItem( 0 );
	// 					resultsCarouselData.removeItem( 0 );
	// 					updateResult( ".carousel-total-items", carousel.owl.owlItems.length );

	// 					if ( $( '[data-question-list=2] [data-question]' ).eq( 0 ).find( 'input[type=radio]' ).filter( ':checked' ).val() == 2 ) {

	// 						$( "[data-answer-slide-name=JISA], [data-answer-slide-name=JSIPP]" ).addClass( 'disabled' );

	// 						setCarouselItemHeights();
							
	// 					} else {

	// 						if ( $( '[data-question-list=2] [data-question]' ).eq( 2 ).find( 'input[type=radio]' ).filter( ':checked' ).val() == 1 ) {
	// 							$( "[data-answer-slide-name=JSIPP]" ).addClass( 'disabled' ).parent().addClass( 'source-order-push' ).siblings( 'source-order-pull' );;
	// 						}

	// 						if ( $( '[data-question-list=2] [data-question]' ).eq( 2 ).find( 'input[type=radio]' ).filter( ':checked' ).val() == 2 ) {
	// 							$( "[data-answer-slide-name=JISA]" ).addClass( 'disabled' ).parent().addClass( 'source-order-push' ).siblings().addClass( 'source-order-pull' );
	// 						}

	// 						setCarouselItemHeights();
							
	// 					}


	// 				} else {

	// 					resultsCarouselData.removeItem();
	// 					resultsCarouselData.removeItem();
	// 					updateResult( ".carousel-total-items", carousel.owl.owlItems.length );

	// 					if ( $( '[data-question-list=1] [data-question]' ).eq( 0 ).find( 'input[type=radio]' ).filter( ':checked' ).val() == 1 ) {

	// 						$( "[data-answer-slide-name=SIPP]" ).addClass( 'disabled' ).parent().addClass( 'source-order-push' ).siblings().addClass( 'sorce-order-pull' );

	// 					}

	// 					if ( $( '[data-question-list=1] [data-question]' ).eq( 2 ).find( 'input[type=radio]' ).filter( ':checked' ).val() == 1 ) {

	// 						$( "[data-answer-slide-name=ISA]" ).addClass( 'disabled' ).parent().addClass( 'source-order-push' ).siblings().addClass( 'sorce-order-pull' );

	// 					}

	// 					setCarouselItemHeights();

	// 				}

	// 				collapseSection( $thisQuestion );
	// 				editQuestionLinks.addClass( 'disabled' );
	// 				$( '.answers' ).addClass( 'active' );

	// 				// if ( $( '.answers' ).hasClass( 'answers-slides' ) ) {
	// 				// 	carouselEl.owlCarousel();
	// 				// 	// store carousel
	// 				// 	var carouselEl = $( '.owl-carousel' );
	// 				// 	var carousel = $( '.owl-carousel' ).data( 'owlCarousel' );
	// 				// 	updateResult( ".carousel-total-items", this.carouselEl.owlItems.length );
	// 				// }

	// 				scrollScreenToEl( $( '.answers' ) );

	// 			}

	// 		}


	// 	} // end IF checkedRadios

	// });


	$( '.js-quiz-conditional' ).click( function(){

		var $thisEl = $( this );
		var $thisQuestion = $( this ).closest( "[data-question]" );
		var $thisQuestionCollapseable = $thisQuestion.find( '.collapsable' );
		var $thisQuestionHeight = $thisQuestionCollapseable.data( 'height' );
		var $thisQuestionHeightMax = $thisQuestionCollapseable.data( 'height-max' );

		var $questionVisited = $thisQuestion.hasClass( 'visited' ) ? true : false;

		var radios = $thisQuestion.find( "input[type=radio]" );
		var selectedRadios = radios.filter( ":checked" );

		if ( selectedRadios.length == 0 ) { /* question NOT answered - show error */

			if ( !$thisQuestion.hasClass( 'is-error') ) {
				$thisQuestion.addClass( 'is-error' );
				$thisQuestionCollapseable.css( 'height', $thisQuestionHeightMax );
			}

		} else {

			$( '[data-question-list]' ).removeClass( 'active' );
			$( '[data-question-list="'+ selectedRadios.val() +'"]' ).addClass( 'active' ).removeClass( 'hide' );
			collapseSection( $thisQuestion );
			openSection( $( '[data-question-list].active [data-question]' ).first() );
			scrollScreenToEl( $thisQuestion );

		}

	} );

	/* remove error text when clicking on answer radio button
		if not visited then set visited class
		if not lastQuestion then increment lastQuestion
	*/
	$( 'input[type=radio]' ).click( function( event ){
		// console.log( 'radio clicked' );
		var $thisQuestion = $( this ).closest( "[data-question]" );
		var $thisId = $(this).attr("id");
		var $thisAnswer = $( "label[for='" + $thisId + "']" ).eq( 0 ).text();
		var $thisQuestionCollapseable = $thisQuestion.find( '.collapsable' );
		var $thisQuestionHeight = $thisQuestionCollapseable.data( 'height' );
		var $thisQuestionHeightMax = $thisQuestionCollapseable.data( 'height-max' );

		// console.log( '$thisAnswer: ', $thisAnswer);

		if ( $thisQuestion.hasClass( 'is-error' ) ) {
			$thisQuestion.removeClass( 'is-error' ).find( '.js-answer-summary' ).html( $thisAnswer );
			$thisQuestionCollapseable.css( 'height', $thisQuestionHeight );
		} else {
			$thisQuestion.find( '.js-answer-summary' ).html( $thisAnswer );
		}

		if ( !$thisQuestion.hasClass( 'visited' ) ) {
			$thisQuestion.addClass( 'visited' );
		}

	} );

	$( '.js-edit-answer' ).click( function( event ){

		var $closeThis = $( "#quiz [data-question]" ).not( '.is-collapsed' );
		var $openThis = $( this ).closest( "[data-question]" );
		var $openThisIndex = $openThis.index();
		var $moveToThis;

		if ( $( "[data-question-list]" ).length > 0 ) {

			if ( $openThis.index() === 0 ) {
				// console.log( '$moveToThis if 1' );
				$moveToThis = $questions.eq( 0 );
			} else {
				// console.log( '$moveToThis if 2' );
				$moveToThis = $questions.eq( $openThisIndex - 1 ); 
			}

		} else {
			// console.log( '$moveToThis if 3' );

			if ( $openThis.index() === 0 ) {
				// console.log( '$moveToThis if 1' );
				$moveToThis = $questions.eq( 0 );
			} else {
				$moveToThis = $questions.eq( $openThisIndex - 1 );
			}

			
		}

		// console.log( '$moveToThis: ', $moveToThis );
		collapseSection( $closeThis );
		$questions.not( '.visited' ).find( '.number-badge' ).addClass( 'number-badge--dotted' );
		openSection( $openThis );
		scrollScreenToEl( $moveToThis );

	} );


	/* carousel controls */

	$( '.answers-carousel .slider-control--prev' ).click( function( event ) {
		resultsCarouselData.prev();
		processCarouselAction();
	});

	$( '.answers-carousel .slider-control--next' ).click( function( event ) {
		resultsCarouselData.next();
		processCarouselAction();
	});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Utilities
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	function checkAnswers( radioSet ){
		var checkedRadios = radioSet.filter(":checked");
		return checkedRadios;
	};


	function collectAnswers(){
		var radios = $("input[type='radio']");
		var checkedRadios = radios.filter(":checked");
		return checkedRadios;
	};


	/*
	* function collapseSection
	* description: apply class changes to target element (question)
	* to collapse section to closed state
	* {param} : "parentEl" question wrapper element
	*/

	function collapseSection( parentEl ) {
		var isVisited = parentEl.hasClass( 'visited' ) ? true : false;
		parentEl.addClass( 'is-collapsed' ).find( '.collapsable' ).css( 'height', 0 );
		if ( isVisited ) {
			parentEl.find( '.header-contents__visited' ).removeClass( 'pos-abs pos-rel' ).addClass( 'pos-rel' );
			parentEl.find( '.header-contents' ).removeClass( 'pos-abs pos-rel' ).addClass( 'pos-abs' );
		}

	};


	/*
	* function openSection
	* description: apply class changes to target element (question)
	* to open section to active state
	* {param} : "parentEl" question wrapper element
	*/

	function openSection( parentEl ) {
		var $thisHeight = parentEl.find( '.collapsable' ).data( 'height' );
		parentEl.removeClass( 'is-collapsed' ).find( '.number-badge' ).removeClass( 'number-badge--dotted' ).end().find( '.collapsable' ).css( 'height', $thisHeight );

		parentEl.find( '.header-contents__visited' ).removeClass( 'pos-abs pos-rel' ).addClass( 'pos-abs' );
		parentEl.find( '.header-contents' ).removeClass( 'pos-abs pos-rel' ).addClass( 'pos-rel' );

	};


	/*
	* function equalHeightItems
	* description: query visual height of target elements and apply largest height to all
	* {param} : "el" target element list as CSS class selector
	* i.e. '.element', '.element-parent .element'
	*/

	function equalHeightItems( el ){
		var thisElSet = $( el );
		var tempHeight = 0;
		$.each( thisElSet, function( i ) {
			var thisHeight = $( this ).height();
			if ( thisHeight > tempHeight ) {
				tempHeight = thisHeight;
			}
		} );
		thisElSet.height( tempHeight );
	};

	var carouselListItems = '#answers-carousel .item-disabled, #answers-carousel .item-1, #answers-carousel .item-2, #answers-carousel .item-3, #answers-carousel .item-4, #answers-carousel .item-5, #answers-carousel .quiz-carousel__item-footer';

	function setCarouselItemHeights() {
		equalHeightItems( '#answers-carousel .item-disabled' );
		equalHeightItems( '#answers-carousel .item-1' );
		equalHeightItems( '#answers-carousel .item-2' );
		equalHeightItems( '#answers-carousel .item-3' );
		equalHeightItems( '#answers-carousel .item-4' );
		equalHeightItems( '#answers-carousel .item-5' );
		equalHeightItems( '#answers-carousel .quiz-carousel__item-footer' );
	};

	function resizeCarouselItemHeights() {
		console.log( 'resizeCarouselItemHeights event working ');
		$( carouselListItems ).css( 'height', 'auto' );
		setCarouselItemHeights();
	};


	function updateResult(pos,value){
	   	$(pos).html(value);
	}


	function processCarouselAction(){
		var tempArr = resultsCarouselData.owl.visibleItems;
		var tempArr2 = [];

		$.each( tempArr, function( index, value ){
			tempArr2.push( value + 1 );
		});
		
		tempArr2 = tempArr2.join( ' & ' );

		updateResult( ".carousel-current-item-index", tempArr2 );

	};

	/*
	* function scrollScreenToEl
	* description: scroll screen to target position.
	* Uses Velocity, "baseAnimSpeed" variable for timing
	* {param} : "el" target element as CSS class selector OR <html> as default
	* {note} If no 
	*/

	// using velocity
	function scrollScreenToEl( el ) {
		var $scrollThis = el || $('html');
		$scrollThis.velocity("scroll", { duration: baseAnimSpeed, delay: baseAnimSpeed, easing: "ease" });
	};


	/*
	* function initialiseQuiz
	* description: Resets quiz to initial state
	*/

	function initialiseQuiz() {

		// reset all question inputs
		$( '.answers, [data-question-list]' ).removeClass( 'active' );

		resultsCarouselData.destroy();
		resultsCarouselEl.empty();
		
		resultsCarouselEl.append( carouselItemClones );
		
		$( 'input[type=radio]' ).attr( 'checked' , false );
		$( '.visited' ).removeClass( 'visited' );
		$( '.quiz-carousel__item' ).removeClass( 'disabled' );
		$( '.number-badge' ).addClass( 'number-badge--dotted' );
		$( '[data-question] .pos-abs, [data-question] .pos-rel' ).removeClass( 'pos-abs pos-rel' );
		editQuestionLinks.removeClass( 'disabled' );

		getVisualData();
		$.each( $questions, function( index ){

			if ( index === 0 ) {
				var thisHeight = $( this ).find( '.collapsable' ).data( 'height' );
				$( this ).find( '.collapsable' ).css( 'height', thisHeight );
				$( this ).find( '.number-badge' ).removeClass( 'number-badge--dotted' );
				$( this ).removeClass( 'is-collapsed' );
			} else {
				$( this ).find( '.collapsable' ).css( 'height', '0' );
			}

		} );

		scrollScreenToEl( $( '.question' ).eq( 0 ) );

	};

	$( '.js-restart-quiz' ).click( function( event ) {
		initialiseQuiz();
	} );

	/* check all carousels that use comparison_listing  class and reformt heights where appropriate */

	function formatComparisonElementHeights(){

		// get number of list items and check if comparison listing has footer
		var listingLen = $( '.comparison-listings' ).eq( 0 ).find( '.comparison-listings__item' ).length;
		var hasFooter = $( '.comparison-listings' ).eq( 0 ).next().length > 0 ? true : false;
		var headerEl = $( '.comparison-listings' ).prev();
		var footerEl = $( '.comparison-listings' ).next();
		
		// match heights of list items in order across comparison panels
		equalHeightItems( headerEl );

		for ( var i = 1; i <= listingLen; i++ ) {

			$( '.comparison-listings .comparison-listings__item:nth-of-type(' + i + ')' ).css( 'height', 'auto' );
			equalHeightItems( $( '.comparison-listings .comparison-listings__item:nth-of-type(' + i + ')' ) );
		}

		if ( hasFooter ) {
			equalHeightItems( footerEl );
		}

	};

	// check for quiz on page, and check for simple comparison carousel
	var quizOnPage = $( '#quiz').length > 0 ? true : false;
	var simpleComparisonCarouselOnPage = !quizOnPage && $( 'ul.comparison-listings').length > 0 ? true : false;


	// leave quiz carousels alone and make sure .comparison-listings
	// exists on page
	if ( simpleComparisonCarouselOnPage ) {
		formatComparisonElementHeights();
	};

	var resizeTimer;
	// capture window resize event and fire event when finished
	$(window).on('resize', function(e) {
		console.log( 'resize event working ');

		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function() {
			// Run code here, resizing has "stopped"
			if ( quizOnPage ) {
				resizeCarouselItemHeights();
			}
			if ( simpleComparisonCarouselOnPage ) {
				formatComparisonElementHeights();
			}

			if ( $( '.teaser' ).length > 1 ) {
				formatTeaserHeights();
			}

			if ( $( '.product-panel' ).length > 1 ) {
				formatProductHeights();
			}

		}, 250);

	});



function formatTeaserHeights() {

	if ( $( '.teaser' ).length > 1 ) {

		$.each( $( '.row' ), function( index ){

			if ( $( this ).find( '.item' ).length > 1 && $( this ).find( '.teaser' ) ) {

				$( this ).find( '.teaser div a' ).css( 'height', 'auto' );
				$( this ).find( '.teaser p' ).css( 'height', 'auto' );
				$( this ).find( '.teaser .author-card' ).css( 'height', 'auto' );

				equalHeightItems( $( this ).find( '.teaser div a' ) );
				equalHeightItems( $( this ).find( '.teaser p' ) );
				equalHeightItems( $( this ).find( '.teaser .author-card' ) );
			}
		} );

	}

}

if ( $( '.teaser' ).length > 1 ) {
	formatTeaserHeights();
}


function formatProductHeights() {

	if ( $( '.row .product-panel' ).length > 1 ) {

		$.each( $( '.row' ), function( index ){

			if ( $( this ).find( '.flex-grid__item' ).length > 1 && $( this ).find( '.product-panel' ) ) {

				$( this ).find( '.product-panel h3' ).css( 'height', 'auto' );
				$( this ).find( '.product-panel p' ).css( 'height', 'auto' );

				equalHeightItems( $( this ).find( '.product-panel h3' ) );
				equalHeightItems( $( this ).find( '.product-panel p' ) );
			}
		} );

	}

}

if ( $( '.product-panel' ).length > 1 ) {
	formatProductHeights();
}


})( jQuery );
