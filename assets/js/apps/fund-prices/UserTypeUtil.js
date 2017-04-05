
define([	
	'underscore',
  	'backbone'
], function(_, Backbone) {
		
	return {				  
	    getUserTypeFromCookie:function(){	    	
			/*var lsUserType = Cookie.get("ls_user_type");
			if(lsUserType!=null){			
				return lsUserType;
			}					
			var me = this;
			return me.getUserTypeCookieValue();*/

			var me = this;
			var lsUserType = me.getUserTypeCookieValue();
			if(lsUserType!=null){			
				return lsUserType;
			}					
			return Cookie.get("ls_user_type"); 
	    },
		/*
		getAudienceId:function(){
			var me = this;
			var userTypeFromCookie = me.getUserTypeFromCookie();
			var audienceId;
			if((userTypeFromCookie == 'Direct') || (userTypeFromCookie == 'investor_primary_new') || (userTypeFromCookie == 'investor_primary_existing') || (userTypeFromCookie == 'investor_direct.segment_new')){
				audienceId = "1202";
			}else if((userTypeFromCookie == 'Advised') || (userTypeFromCookie == 'investor_advised.segment_new')){ 	//Q1 Changes
				audienceId = "1203";
			}else if((userTypeFromCookie == 'professional_primary_existing') || (userTypeFromCookie == 'professional_primary_new')){ 	//Q1 Changes
				audienceId = "1204";
			}else if((userTypeFromCookie == 'adviserservices_primary_new') || (userTypeFromCookie == 'adviser') || (userTypeFromCookie == 'adviserservices_primary_existing')){
				audienceId = "1205";
			}else if(userTypeFromCookie =='Wealth'){
				var userType = Cookie.get("userType");
				if(null != userType){
					if(userType == 'Client'){
						audienceId = "1202";
					}else{
						audienceId = "1203";
					}
				}
			}
			
			if(audienceId == undefined){
				audienceId = "1202";
			}
			return audienceId;
		},*/
		getAudienceId:function(){
			var me = this;
			//var userTypeFromCookie = me.getUserTypeFromCookie();
			var currenturl = window.location.href;
			var audienceId;
			if(currenturl.indexOf('professional') != -1){
				audienceId = "1204";
			}else if(currenturl.indexOf('-adv') != -1){
				audienceId = "1203";
			}else if(currenturl.indexOf('adviserservices') != -1){
				audienceId = "1205";
			}else if(currenturl.indexOf('investor') != -1){
				audienceId = "1202";
				
			}
			
			if(audienceId == undefined){
				audienceId = "1202";
			}
			return audienceId;
		},
		getUserTypeCookieValue:function(){						
			var sUserType;
			var cUserTypeCookie = Cookie.get("userTypeCookie");
			if (cUserTypeCookie != null) {
				var aUserTypeCookieAttributes = cUserTypeCookie.split(":");
				for (var i=0; i < aUserTypeCookieAttributes.length; i++) {
					var aUserTypeCookieAttribute = aUserTypeCookieAttributes[i].split("=");
					if (aUserTypeCookieAttribute[0] == "name") {
						sUserType = aUserTypeCookieAttribute[1];
					}
				}
			}
			return sUserType;
	    }
	}	
});