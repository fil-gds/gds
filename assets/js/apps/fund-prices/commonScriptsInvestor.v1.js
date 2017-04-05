function getParent(e,tagName) {
  while (e != null) {
   if (e.tagName.toLowerCase() == tagName.toLowerCase()){
    return e;
        }
   e = e.parentNode;
  }
  return null;
}

function getChildren(e) {
     var aChildNodes = [];
     for(var i=0, oNode; oNode = e.childNodes[i]; i++){
          if(oNode.nodeType == 1){
               aChildNodes.push(oNode);
          }
     }
     return aChildNodes;
}

var Cookie = {
                set: function(name,value,seconds){
                        if(seconds){
                                d = new Date();
                                d.setTime(d.getTime() + (seconds * 1000));
                                expiry = '; expires=' + d.toGMTString();
                        }else
                                expiry = '';
                        document.cookie = name + "=" + value + expiry + "; domain=.fidelity.co.uk; path=/; secure";
                },
                get: function(name){
                        nameEQ = name + "=";
                        ca = document.cookie.split(';');
                        for(i = 0; i < ca.length; i++){
                                c = ca[i];
                                while(c.charAt(0) == ' ')
                                        c = c.substring(1,c.length);
                                if(c.indexOf(nameEQ) == 0)
                                        return c.substring(nameEQ.length,c.length);
                        }
                        return null
                },
                unset: function(name){
                        Cookie.set(name,'',-1);
                        Cookie.unset2(name);
                },
                unset2 : function(name) {
                        var d = new Date();
                        d.setTime(d.getTime() - 1000);
                        expiry = "; expires=" + d.toGMTString();
                        document.cookie =name + "=" + expiry + "; path=/";
                }
        }

/* Common scripts */
//Event.observe(document, 'dom:loaded', function() {
Event.observe(window, "load", function() {
		
		$$('#menuLink_1', '#menuLink_2', '#menuLink_3', '#menuLink_4', '#menuLink_5', '#menuLink_6', '#menuLink_7', '#menuLink_8', '#menuLink_9', '.ofxTopMenu', '#changeSiteLink','#changeSite','.ofLoginBtn a', '.ofLoginLayer', '.ofClientDetails').invoke('observe', 'click', function(z) {
		z.stopPropagation();
	});

	/*$$('.ofLoginBtn a', '.ofLoginLayer').invoke('observe', 'click', function(e) {
		if ((e.which && e.which == 3) || (e.button && e.button == 2)) e.stopPropagation();
	});*/
	
	if(document.cookie.indexOf("ls_user_type=adviser")!=-1 && document.URL.indexOf("fidelity.co.uk/mediacentre")==-1){
			if($("disclaimer")!=null) $('disclaimer').hide();
	}
        var showWrapper = getUrlParameter("showwrapper");
        if (showWrapper == "false"){

                $$(".ofMastHead")[0].hide();
                $$(".ofRegFooter")[0].hide();
                $$(".ofxExpand")[0].hide();
                $$(".ofxFooterBottom")[0].hide();
                $("moveBar").hide();

                //if ($("charttoollink")){$("charttoollink").hide();}

        } else {

                if ($$(".ofxNav").length > 0){
                        initNav();
                        watchMenus();
                }

                if ($("footerExpand")){
                        initFooter();
                }

        }

        calcHeights();
        sizeVerticals();

        //added for replacing rel='external' with target'='_blank'
    $$('a[rel="external"]').each(function(link) {
        if(link.readAttribute('href') != '' && link.readAttribute('href') != '#') {
            link.writeAttribute('target','_blank');
        }
    });
    // Start - Junior ISA

	if(Cookie.get("JuniorISAHolderCookie")!=null){
		if($('ISAallowance')!=null) 
			$('ISAallowance').innerHTML = $('ISAallowance').innerHTML.replace("ISA","Junior ISA");
		if($('topupISA')!=null) 
			$('topupISA').innerHTML = $('topupISA').innerHTML.replace("ISA","Junior ISA");
		if($('newISA')!=null) $('newISA').parentNode.parentNode.removeChild($('newISA').parentNode);
		if($('investISA')!=null) $('investISA').parentNode.parentNode.removeChild($('investISA').parentNode);
	}
// End -  Junior ISA

/* Start - WISA 1B */
	/*redirectToWISADefaultPage();
	if ((document.URL.indexOf("USER=false") ==-1)){wisaBookmarkPage();}*/
/* End - WISA 1B */
//Add for PI Project add by a408912
$$('.closeMenu', '.closeMenu2').invoke('observe', 'click', function(t) {
		$(this).up(1).hide();
		setTimeout("$$('.ofSubLevel').invoke('setStyle',{display: ''});", 100);
	});
/* Added for prespective by A408912 */	
	var contactDetailLayer = $$(".ofClientDetails")[0];
	Event.observe('clientName', 'click', function(){
		Effect.toggle(contactDetailLayer, 'blind', {duration: 0.2 });
		$(contactDetailLayer).style.left = $(this).positionedOffset()[0] - 159 + "px";
		$(this).toggleClassName('ofWelcomeNoteSelected');	
		$$(".ofClientDetails .ofxTabConnect")[0].style.width = $(this).getWidth() - 4 + "px";
		$$(".ofClientDetails .ofxTabConnect")[0].style.left = $(this).getWidth() + 48+  "px"; 
		closeAllTopMenus();
	});	
});

function showHideLogin(){
	//Show/hide the Login layer
	var loginBtnClicked = $$(".ofLoginBtn a")[0];
	var loginLayer =  $$(".ofLoginLayer")[0];
	$$(".ofLoginLayer .ofxTabConnect")[0].style.width = loginBtnClicked.getWidth() - 2 + "px";
	Effect.toggle(loginLayer, 'blind', {duration: 0.3 });
	Element.toggleClassName(loginLayer.previous().down(),"ofSelected");
	closeAllTopMenus();
}

function sizeVerticals(){
        var vertNodes = $$(".ofVertRule");
        for (var i=0;i<vertNodes.length;i++){
                var vertNode = vertNodes[i];
                var container = vertNode.parentNode.parentNode;
                var vertRuleHeight = $(container).getStyle("height");
                $(vertNode).setStyle({height:vertRuleHeight});
        }
}

function calcHeights(){
    var divs = $$("div.iw_component");
    for (var i=0; i < divs.length; i++) {

        var hasPercentHeight = false;
        var elts = divs[i].childNodes;

        for (var j=0; !hasPercentHeight && (j<elts.length); j++) {
          if (1 == elts[j].nodeType) {
            var h = elts[j].getAttribute('height') || elts[j].style.height;
                        h = h + " ";
            if (-1 != h.indexOf('%')) hasPercentHeight = true;
          }
        }

        if (!hasPercentHeight) {
          var oldStyleHeight = divs[i].style.height;
          var expl = divs[i].offsetHeight;
          divs[i].style.height = 'auto';
          var auto = divs[i].offsetHeight;
          if (expl > auto) divs[i].style.height = oldStyleHeight;
        }
    }
}

function getUrlParameter(name){
        name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
        var regexS = "[\\?&]"+name+"=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.href);
        if (results == null){
                return "";
        }else{
                return results[1];
        }
}

function getParentByClassName(e,strClass) {
  while (e != null) {
   if (e.className == strClass){
    return e;
        }
   e = e.parentNode;
  }
  return null;
}

function getParent2(e,obj) {
  while (e != null) {
   if (e == obj){
    return e;
        }
   e = e.parentNode;
  }
  return null;
}

function src(event){
        return event.target || event.currentTarget || event.srcElement;
}

var moveBar;
var demonstration;
var ieSixLayerHide;

Event.observe(document, 'click', function() {
	linkEles = $$("div.ofTopLinks a");
	for (i=0; i<linkEles.length; i++){
			Effect.BlindUp($(linkEles[i].id.replace("menuLink","menuDiv")),{duration:0.3});
			Element.removeClassName(linkEles[i],"ofSelected")
	}
	if ($('changeSite')){		
		if (document.getElementById('changeSite').style.display !='none'){
			Effect.BlindUp(helpSuppDiv,{duration:0.3});
			Element.removeClassName($('changeSiteLink'),"ofSelected");
		}
	}
	if ($('changeSite1')){
		if (document.getElementById('changeSite').style.display !='none'){
			Effect.BlindUp(helpSuppDiv,{duration:0.3});
			Element.removeClassName($('changeSite1Link'),"ofSelected");
		}
	}
	var contactDetailLayer = $$(".ofClientDetails")[0];
	if($$(".ofClientDetails")[0]){
		$(contactDetailLayer).hide();
		$('clientName').removeClassName('ofWelcomeNoteSelected');
	}
});

function initNav(){
        liEles = $$(".ofxNav li div a");
        for (i=0; i<liEles.length; i++){
                liEles[i].onmouseover = function(){showMenu(this)}
                liEles[i].onfocus = function(){navCloseAll()}
        }
        ieSixLayerHide = $("ieSixLayerHide");
}

function SmoothMovement(position, target, velocity){
        position = Math.round(position);
        target   = Math.round(target);
        velocity = (velocity ? Math.round(velocity) : 0);
        this.updatePosition = function(){
                position += velocity;
                if (velocity < 0){
                        if (position - velocity * (velocity  - 1) / 2 < target){
                                velocity++;
                        }else if (position - (velocity - 1) * (velocity - 2) / 2 >= target){
                                velocity--;
                        }
                }else{
                        if (position + velocity * (velocity + 1) / 2 > target){
                                velocity--;
                        }else if (position + (velocity + 1) * (velocity + 2) / 2 <= target){
                                velocity++;
                        }
                }
                return position;
        }
        this.changeTarget = function(newTarget){
                target = Math.round(newTarget);
        }
        this.getPosition = function(){
                return position;
        }
        this.getVelocity = function(){
                return velocity;
        }
        this.hasStopped = function(){
                return (position == target && velocity == 0);
        }
}

function updateDemonstration(){
        if (moveBar){
                moveBar.style.height  = demonstration.updatePosition() + 'px';
        }
}

function initFooter(){
        var moveBar = $("footerContents");
        if (moveBar){
                if (Cookie.get("footerOpen")=="true"){
						Effect.toggle(moveBar, 'blind', {duration: 0.4 });			
						$('footerExpand').toggleClassName('ofxShow').toggleClassName('ofxHide').update('Hide site index');
						$('footerExpandBg').show();
                }
        }
}

function toggleFooter(foldID)
			{
				var fold = $(foldID);
				var btn;	
				if (fold) {		
					if (fold.visible()) {
						Effect.toggle(fold, 'blind', { duration: 0.4 });
						$('footerExpand').toggleClassName('ofxShow').toggleClassName('ofxHide').update('Show site index');
						$('footerExpandBg').hide();
						Cookie.unset("footerOpen");
			 
					} else {
						Effect.toggle(fold, 'blind', {duration: 0.4 });			
						$('footerExpand').toggleClassName('ofxShow').toggleClassName('ofxHide').update('Hide site index');
						$('footerExpandBg').show();
						Cookie.set("footerOpen","true",7776000); // 90 days
					}
				}
			}
function navCloseAll(){
        if (ieSixLayerHide){
                ieSixLayerHide.hide();
        }

        liEles = $$(".ofxNav")[0].down().childElements();
        //alert("length "+liEles.length);
        for (i=0; i<liEles.length; i++){
                //alert(liEles[i].hasClassName('ofFirstChild ofSelected'));
                //alert(Element.readAttribute(liEles[i],'class'));
                Element.removeClassName($(liEles[i]),"ofSelected");
        }
        currentlyOpen = false;
}

var lastLinkFocus,lastLinkMouseOver,lastDocMouseMove,MENU_DELAY, MENU_OUT_DELAY,currentlyOpen;
currentlyOpen   = true;
MENU_DELAY              = 100;
MENU_OUT_DELAY  = 2200;

function showMenu(oEle,jawsText){
        if(oEle.target || oEle.srcElement){
                if(oEle.keyCode==13){
                        lastLinkMouseOver = src(oEle);
                        displayMenu();
                }
        } else {
                lastLinkMouseOver = oEle;
                setTimeout("checkLastMouseMove()", MENU_DELAY);
        }
}

function timedCloseMenu(oEle){
        setTimeout("checkMenu()", MENU_OUT_DELAY);
}

function checkMenu(){
        if(Element.descendantOf( lastDocMouseMove, $$(".ofxNav")[0])){
                return;
        }
        navCloseAll();
}

function watchMenus(){
        if(document.all){
                document.attachEvent("onmousemove", checkMouseLocation);
        } else {
                document.addEventListener("mousemove", checkMouseLocation, false);
        }
        var lis = $$(".ofxNav");
        if (lis.length > 0){
                var lisEls = lis[0].getElementsByTagName("li");
                for(i = 0; i<lisEls.length; i++){
                        if(document.all){
                                lisEls[i].attachEvent("onmouseout", timedCloseMenu);
                        } else {
                                lisEls[i].addEventListener("mouseout", timedCloseMenu, false);
                        }
                }
                if(document.all){
                        lis[0].attachEvent("onmouseout", timedCloseMenu);
                } else {
                        lis[0].addEventListener("mouseout", timedCloseMenu, false);
                }
        }
}

/**     Sets the last element that was moused over. */
function checkMouseLocation(event){
        lastDocMouseMove = src(event);
        if(currentlyOpen && !Element.descendantOf(lastDocMouseMove, $$(".ofxNav")[0]))timedCloseMenu();
}

/** Checks whether the last sub context link mouse over lement is the same as the last identifying document mousemove element.*/
function checkLastMouseMove(){
        if(lastLinkMouseOver == lastDocMouseMove && lastLinkMouseOver!= null){
                displayMenu();
        }
}

function setIELayerPosition(x,y,oEle){
        if (ieSixLayerHide){
                var theLayer = oEle.up().next();
                ieSixLayerHide.style.left = x + "px";
                ieSixLayerHide.style.top = y + "px";
                ieSixLayerHide.style.height = theLayer.getHeight() + "px";
                ieSixLayerHide.style.width = theLayer.getWidth() + "px";
                ieSixLayerHide.show();
        }
}

function displayMenu(){
        closeAllTopMenus();
        navCloseAll();
        var theEle = $(lastLinkMouseOver);

        var yPos = Element.positionedOffset(theEle)[1];
        var xPos = Element.positionedOffset(theEle)[0];

        theEle.up().next().style.top = yPos + 38 + "px";

        if( Element.hasClassName(theEle.up(1),"ofLastChild") ){ // keep the last menu from displaying outside the window
                        if(navigator.userAgent.indexOf('MSIE 6') == -1){ // move it over a bit if its IE6
                                theEle.up().next().style.left = xPos - 53 + "px";
                                setIELayerPosition(xPos - 53,yPos + 38,theEle);
                        }else{
                                theEle.up().next().style.left = xPos - 64 + "px";
                                setIELayerPosition(xPos - 64,yPos + 38,theEle);
                        }

                } else {
                        theEle.up().next().style.left = xPos + "px";
                        setIELayerPosition(xPos,yPos + 38,theEle);
                }
        Element.addClassName(theEle.up(1),"ofSelected");
        currentlyOpen = true;
}

function check(e){
        var navObjs = $$(".ofxNav");
        var target = (e && e.target) || (event && event.srcElement);
        if (navObjs.length > 0){
                if(target!=navObjs[0] && getParent2(target,navObjs[0])!=navObjs[0]) {
                        navCloseAll();
                }
        }
        var closeTopLinks = true;
        if (getParentByClassName(target,"ofxTopMenu") != null){closeTopLinks = false}
        if (getParentByClassName(target,"ofxTopMenuLinks") != null){closeTopLinks = false}
        if (Element.hasClassName(target,"ofxTopMenu")){closeTopLinks = false}
        if (Element.hasClassName(target,"ofxTopMenuLinks")){closeTopLinks = false}
        //alert("test " + closeTopLinks)
        if (closeTopLinks == true){closeAllTopMenus()}
}
function closeAllTopMenus(){
        linkEles = $$("div.ofTopLinks a");
        for (i=0; i<linkEles.length; i++){
                $(linkEles[i].id.replace("menuLink","menuDiv")).hide();
                Element.removeClassName(linkEles[i],"ofSelected");
        }
        // Also close the site switcher
        closechangeSite();
		closeMiniBasketDirect();
		//New for PI Project added by a408912
		if ($$(".ofLoginLayer")[0]){
			if ( $$(".ofLoginLayer")[0].style.display !='none' ){
					$$(".ofLoginLayer")[0].hide();
					$$(".ofLoginBtn a")[0].removeClassName('ofSelected');
			}
		}
}

function openTopMenu(id){
        var linkEle = $("menuLink_"+ id);
        var divEle = $("menuDiv_"+ id);
        if (Element.hasClassName(linkEle,"ofSelected")){
                closeTopMenu(id);
        }else{
                closeAllTopMenus();
                Element.addClassName(linkEle,"ofSelected");
                $$("#menuDiv_"+ id +" .ofxTabConnect")[0].style.width = linkEle.getWidth() - 2 + "px";
				//divEle.show();
				Effect.BlindDown(divEle,{duration:0.3, queue:{scope:'myscope', position:'end', limit: 1}});
                divEle.style.top = Element.positionedOffset(linkEle)[1] + linkEle.getHeight() - 2 + "px";
                divEle.style.left = Element.positionedOffset(linkEle)[0] - divEle.getWidth() + linkEle.getWidth() - 2 + "px";
//                $$("a#menuLink_"+ id +" img")[0].alt = "Menu opened";
        }
}

function closeTopMenu(id){
        var linkEle = $("menuLink_"+ id);
        var divEle = $("menuDiv_"+ id);
        Element.removeClassName(linkEle,"ofSelected");
        Effect.BlindUp(divEle,{duration:0.3});
//        $$("a#menuLink_"+ id +" img")[0].alt = "Menu closed";
}

function searchKeyPress(linkIndex){
        if (linkIndex > 0){
                if(event.keyCode==40){
                        $$("div#recent a")[linkIndex].focus()
                }
                if(event.keyCode==38){$$("div#recent a")[linkIndex-1].focus()}
        } else {
                if(event.keyCode==40 || event.keyCode==9) $$("div#recent a")[linkIndex].focus();
                if(event.keyCode==38){$("search").focus()}
        }
}

function openchangeSite(oEle,EleId){
        theEle = $(oEle);
        if (Element.hasClassName(theEle,"ofSelected")){
				Effect.BlindUp(helpSuppDiv,{duration:0.3});
				Element.removeClassName(theEle,"ofSelected");
        } else {
                closeAllTopMenus();
                helpSuppDiv = $(EleId);
                Element.addClassName(theEle,"ofSelected");                
				Effect.BlindDown(helpSuppDiv,{duration:0.3, queue:{scope:'myscope', position:'end', limit: 1}});			
        }
}

function closeMiniBasketDirect()
{
	if ($('miniBasket')){	
		if ($('miniBasket').style.display !='none'){
			Effect.BlindUp($('miniBasket'),{duration:0.3});
			$('miniBasket').previous().removeClassName("ofSelected");
		}
	}
}

function closechangeSite(){
        if ($("changeSite")){
                helpSuppDiv = $("changeSite");
                helpSuppLink = $("changeSiteLink");
                Element.removeClassName(helpSuppLink,"ofSelected");
                helpSuppDiv.hide();               
        }
		 if ($("changeSite1")){
                helpSuppDiv = $("changeSite1");
                helpSuppLink = $("changeSite1Link");
                Element.removeClassName(helpSuppLink,"ofSelected");
                helpSuppDiv.hide();               
        }
}
function submitenter(myfield,e,param)
{
var formObj = $(myfield).up("form");
var keycode;
if (window.event) keycode = window.event.keyCode;
else if (e) keycode = e.which;
else return true;

if (keycode == 13)
   {
        if(param == 'AM'){
                if(isRemembered){Cookie.set("LoginPage","loginWithRememberedPersonalDetails",YEAR_MS);}
                if(formObj.id == "loginCDBForm" && !isRemembered ){Cookie.set("LoginPage","loginWithCDB",YEAR_MS);}
                if(formObj.id == "loginPersonalDetailsForm" ){Cookie.set("LoginPage","loginWithPersonalDetails",YEAR_MS);}
        }
        else{
                if(isRemembered){
                        Cookie.set("LoginPage","loginWithRememberedPersonalDetails",YEAR_MS);
                }else{
                        Cookie.set("LoginPage","loginWithCDB",YEAR_MS);
                }
        }
   formObj.submit();
   return false;
   }
else
   return true;
}

/*
@depends prototype_1_5_0.js
@depends ofDomFunctions.js
*/

function switchTab(e){
        theEle = getParent(e,'LI');
        theUL = getParent(theEle,'UL');
        theLIs = theUL.immediateDescendants();
        for (i=0; i<theLIs.length; i++){
                Element.removeClassName(theLIs[i],"ofSelected");
                Element.removeClassName(theLIs[i],"ofSelectedAndOfFirstChild");
        }
        Element.addClassName(theEle,"ofSelected");

        if (window.ActiveXObject){
                if (Element.hasClassName(theEle,"ofFirstChild")) {
                        Element.addClassName(theEle,"ofSelectedAndOfFirstChild");
                }
        }

        sizeTabObjects();
}

function switchTabParent(e){
        childDiv = e.immediateDescendants();
        aTag = childDiv[0].immediateDescendants();
        switchTab(aTag[0]);
}

function sizeTabObjects(){ // Sets the height and width
        theTabObjects = $$(".ofTabRounded");
        for (j=0; j<theTabObjects.length; j++){
                if (Element.hasClassName(theTabObjects[j],"ofLastChild")){ // accommodate ofLastChild spacing on bottom
                offSet = 12;
        }else{
                offSet = 36;
        }
        theUL = theTabObjects[j].immediateDescendants();
        theLIs = theUL[0].immediateDescendants();
        for (i=0; i<theLIs.length; i++){
                if (Element.hasClassName(theLIs[i],"ofSelected")){
                        theLIchildren = theLIs[i].immediateDescendants();
                        theContentObjects = theLIchildren[1];
                        theTabObjects[j].style.height = Element.getHeight(theContentObjects) + offSet + "px"; // sets height
                }
        }
}

setAutoWidthObjectWidths() // only needed to support IE6 - sets width of container
calcHeights() // Needed for interwoven framework
}

function getParentGridWidthSize(e) {
 if(null==e) return null;
 if (e.className!=null && (e.className.indexOf("ofGridWidth") > -1 || e.className.indexOf("iw_component") > -1) && e.className.indexOf("ofGridWidthAuto") == -
1){

        //alert(Element.getStyle(e,"width"));
        return Element.getStyle(e,"width").replace("px","");

 } else {
   if(e.parentNode!=null) return getParentGridWidthSize(e.parentNode);
   else {
    // since now we're at the top of the DOM and our class wasn't found, assume that we should use the entire screen width
    return Element.getWidth(document.getElementsByTagName("body")[0]);
   }
 }
}


function setAutoWidthObjectWidths(){ // Sets width of anything with an ofGridWidthWidthAuto to width of the containing ofGridWidthWidth# class
        theAutoWidthObjects = $$(".ofGridWidthAuto");
        for (i=0; i<theAutoWidthObjects.length; i++){
                theAutoWidthObjects[i].style.width = getParentGridWidthSize(theAutoWidthObjects[i]) + "px";
        }
}

// Added for New Masthead Design
function endUserSession(){
	var userLoggedIn=false;
	var userLoggedInCookie = Cookie.get("loggedIntoAccountManagement");
	if (userLoggedInCookie != null && userLoggedInCookie.toLowerCase() == 'null') 
	{
		alert("Deleting Cookie: SMSESSION and loggedIntoAccountManagement");
		Cookie.unset("SMSESSION");
		Cookie.unset("loggedIntoAccountManagement");
		alert("Cookie Deleted: "+Cookie.get("SMSESSION"));
		alert("Cookie Deleted: "+Cookie.get("loggedIntoAccountManagement"));
	} else {
		alert("loggedIntoAccountManagement cookie not found");
	}
	return true;
}

var businessSiteURL = '';
					var personalSiteURL = '';
					function BusinessPopup(obj) 
					{
						if (bLoggedIntoAccountManagement)
						{	
							if(Cookie.get("userType")!="adviser"){
								window["business"] = new Modal({node:$("business")});
								window["business"].show();
								businessSiteURL=obj.href;
							} else window.location = obj.href;
						}
						else{
						window.location = obj.href;
						}
					}
					document.observe("dom:loaded", function() {
						if(Prototype._ModalLoaded != true){
							Prototype._ModalLoaded = true;
							var script = new Element("script", { type: "text/javascript", src: "/static/common/js/ofModalWindow.js" });
							$$("head")[0].insert(script);
						}
					});
					function closeBusinessPopup() {
						$('business').hide();
						$$("html")[0].removeAttribute("style");
					}
					function PersonalPopup(obj) 
					{
						if (bLoggedIntoAccountManagement)
						{
							if((Cookie.get("userType")!="Client" && Cookie.get("userType")!="BrokerClient") || (Cookie.get("userType")=="Client" && obj.getAttribute('segment')=="Advised") || (Cookie.get("userType")=="BrokerClient" && obj.getAttribute('segment')=="Direct"))
							{
								window["personal"] = new Modal({node:$("personal")});
								window["personal"].show();
								personalSiteURL=obj.href;
							} else window.location = obj.href;
						}
						else
						{
							Cookie.unset("ls_user_type");
							window.location = obj.href;
						}

					}
					function closePersonalPopup() {
						$('personal').hide();
						$$("html")[0].removeAttribute("style");
					}

					function redirectToBusinessSite()
					{
						closeOnLoad('/investor/login/InvalidateSession.jsp',businessSiteURL,"adviser");
					}

					function redirectToPersonalSite()
					{
						closeOnLoad('/investor/login/InvalidateSession.jsp',personalSiteURL,"personal");
						
						//INC140348778 - Commented to close the log-out pop up window closure 
						//	window.location.href = personalSiteURL;
					}
					
					function closeOnLoad(myLink,url,cookieValue)
					{
						var newWindow = window.open(myLink, "", "width=1,height=1,top=1,left=1,menubar=no,status=no,scrollbars=no,titlebar=no,toolbar=no,location=no,resizable=no");
						newWindow.blur();
						window.focus();
						setTimeout(
								 function()
								 {
								   newWindow.close();
								   if(cookieValue=="adviser") Cookie.set("ls_user_type","adviser","32000000");
									else Cookie.unset("ls_user_type");
								   window.location.href = url;
								 },
								 5000
								);
					}

// For Bookmark URLs
if(document.URL.indexOf("/investor")!=-1){
	if(document.cookie.indexOf("ls_user_type=adviser")!=-1) Cookie.unset("ls_user_type");
} 

function showHideMfeDisclaimer(userType)
{
	if(userType=="Direct")
	{
		if ($('mfe-disclaimer-direct') != null) 
		{ 
			$('mfe-disclaimer-direct').setStyle({display: "inline"});
		}
	} 
	else {
		if(userType=="Advised")
		{
			if ($('mfe-disclaimer-advised') != null) 
			{ 
				$('mfe-disclaimer-advised').setStyle({display: "inline"});
			}
		}
	}
}


// Add by Sailesh for Cookie Policy implementation 
var termFidelity = 'Fidelity';
var policyLink = '/investor/about/security-privacy/cookie-policy/default.page?WT.mc_id=EUCI02';
var continueLink = "#?WT.mc_id=EUCI01"
if(document.cookie.indexOf("ls_user_type=Advised")!=-1 || Cookie.get("userType") == "BrokerClient"){
	policyLink = '/investor/about/security-privacy/cookie-policy/default.page?WT.mc_id=EUCAC02';
	continueLink = "#?WT.mc_id=EUCAC01"
}
if(document.URL.indexOf("/adviserservices")!= -1){
termFidelity = 'FundsNetwork';
var continueLink = "#?WT.mc_id=EUCF01"
policyLink = '/adviserservices/about/security-privacy/cookie-policy/default.page?WT.mc_id=EUCF02';
}
if(document.URL.indexOf("/adviserproducts")!= -1){
var continueLink = "#?WT.mc_id=EUCA01"
policyLink = '/adviserproducts/about/security-privacy/cookie-policy/default.page?WT.mc_id=EUCA02';
}
if(document.URL.indexOf("/wealthmanager")!= -1){
var continueLink = "#?WT.mc_id=EUCW01"
policyLink = '/wealthmanager/about/security-privacy/cookie-policy/default.page?WT.mc_id=EUCW02';
}
if(document.URL.indexOf("/pensions")!= -1){
var continueLink = "#?WT.mc_id=EUCDC01"
policyLink = '/pensions/about/security-privacy/cookie-policy/default.page?WT.mc_id=EUCDC02';
}
if(document.URL.indexOf("/institutional")!= -1){
var continueLink = "#?WT.mc_id=EUCIN01"
policyLink = '/institutional/about/security-privacy/cookie-policy/default.page?WT.mc_id=EUCIN02';
}
if(document.URL.indexOf("/mediacentre")!= -1){
var continueLink = "#?WT.mc_id=EUCM01"
policyLink = '/mediacentre/about/security-privacy/cookie-policy/default.page?WT.mc_id=EUCM02';
}
if(document.URL.indexOf("/investmenttrusts")!= -1){
var continueLink = "#?WT.mc_id=EUCIT01"
policyLink = '/investmenttrusts/about/security-privacy/cookie-policy/default.page?WT.mc_id=EUCIT02';
}
if(document.cookie.indexOf("cookiepolicyv1=true") == -1  && document.URL.indexOf(".co.uk") != -1){
	var policyLayer='';
        policyLayer += '<div id="cookieMgn">';
        policyLayer += '<div class="ofCookieCentered">';
        	policyLayer += '<div class="ofTextBlock ofLastChild ofContainer">';
            policyLayer += '<div class="ofReg ofGridWidth12">';
        		policyLayer += "<p>"+ termFidelity +" uses cookies to provide you with the best possible online experience. If you continue without changing your settings, we'll assume that you are happy to receive all cookies on our site. However, you can <a href='"+ policyLink +"'>change the cookie settings and view our cookie policy</a> at any time.</p>";
                policyLayer += '</div>';
                policyLayer += '<div class="ofReg ofLastChild" style="padding-top:20px"><a class="ofLarge" onclick="javascript:policyRead()" href="javascript:void(0);" style="padding-left: 20px; background: url(/static/images/investor/isa/junior-isa/red-bullet.gif) no-repeat scroll 0px 3px transparent;">Continue</a></div>';
            policyLayer += '</div>';
        policyLayer += '</div>';
        policyLayer += '</div>';

	var tophref = top.location.href;
    var tophostname = top.location.hostname.toString();
    var myhref = location.href;
    if (tophref === myhref) {
        document.write(policyLayer);
    }	
    setTimeout(policyRead, 15000);	
	}

function policyRead(){
	Cookie.set('cookiepolicyv1','true', 94670778);
	document.getElementById('cookieMgn').style.visibility = 'hidden';
	if(document.URL.indexOf("co.uk/adviserservices")!= -1)
		dcsMultiTrack('WT.mc_id', 'EUCF01');
	else if (document.URL.indexOf("co.uk/adviserproducts")!= -1)
		dcsMultiTrack('WT.mc_id', 'EUCA01');
	else if (document.URL.indexOf("co.uk/wealthmanager")!= -1)
		dcsMultiTrack('WT.mc_id', 'EUCW01');
	else if (document.URL.indexOf("co.uk/pensions")!= -1)
		dcsMultiTrack('WT.mc_id', 'EUCDC01');
	else if (document.URL.indexOf("co.uk/institutional")!= -1)
		dcsMultiTrack('WT.mc_id', 'EUCIN01');
	else if (document.URL.indexOf("co.uk/mediacentre")!= -1)
		dcsMultiTrack('WT.mc_id', 'EUCM01');
	else if (document.URL.indexOf("co.uk/investmenttrusts")!= -1)
		dcsMultiTrack('WT.mc_id', 'EUCIT01');
	else if (document.URL.indexOf("co.uk/investor")!= -1){
		if(document.cookie.indexOf("ls_user_type=Advised")!=-1 || Cookie.get("userType") == "BrokerClient")
			dcsMultiTrack('WT.mc_id', 'EUCAC01');
		else 
			dcsMultiTrack('WT.mc_id', 'EUCI01');
	}
	
}
// End of Cookie policy script
// pensions site script

/*
This script is to clear the ls_user_type cookie 
*/
if(document.URL.indexOf("/pensions/noAccept.page")!=-1)
{
Cookie.set('ls_user_type','', 94670778);
location.href="/pensions/default.page";
}

// end of pension site script

// Start : Banner Image Segmentation Change ( Defining Global Function that can be invoke by external tool)

var globalXMLHttp;

function retriveXmlHttpObject()
{
	if (window.XMLHttpRequest) // Mozilla, Safari, Opera
	{
		 globalXMLHttp = new XMLHttpRequest();
	}
	else if (window.ActiveXObject)  {
			globalXMLHttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	return globalXMLHttp;
}

function initAjaxCallForMasthead(url){
	//url='/investor/integration/mastheadbanners/masthead-banners-temp.page';
	if(url!=''){
		try{
			globalXMLHttp=retriveXmlHttpObject();
			if (globalXMLHttp==null){
				alert ("Http Object could not be initiated");
				return;
			}
			globalXMLHttp.open('GET',url, true);
			globalXMLHttp.onreadystatechange = function(){placeTargetedContent()};
			globalXMLHttp.send(null);
		}
		catch(exception ){
			alert(exception);
		}
	}
}

function placeTargetedContent(){
	if (globalXMLHttp.readyState == 4){
			if(globalXMLHttp.status == 200){
                var div = window.document.createElement('div');
                div.innerHTML=globalXMLHttp.responseText;
                var elements = div.getElementsByTagName('div');
				var child = elements[1].childNodes;
				if(document.getElementById('NavOne'))
				{
					document.getElementById('NavOne').innerHTML = child[3].innerHTML;
				}
				if(document.getElementById('NavTwo'))
				{
					document.getElementById('NavTwo').innerHTML = child[4].innerHTML;
				}
				if(document.getElementById('NavThree'))
				{
					document.getElementById('NavThree').innerHTML = child[5].innerHTML;
				}
				if(document.getElementById('NavFour'))
				{
					document.getElementById('NavFour').innerHTML = child[6].innerHTML;
				}
				if(document.getElementById('NavFive'))
				{
					document.getElementById('NavFive').innerHTML = child[7].innerHTML;
				}
				if(document.getElementById('NavSix'))
				{
					document.getElementById('NavSix').innerHTML = child[8].innerHTML;
				}
				if(document.getElementById('NavSeven'))
				{
					document.getElementById('NavSeven').innerHTML = child[9].innerHTML;
				}
				if(document.getElementById('NavEight'))
				{
					document.getElementById('NavEight').innerHTML = child[10].innerHTML;
				}
		}
	}
}
// End : Banner Image Segmentation Change ( Defining Global Function that can be invoke by external tool)
