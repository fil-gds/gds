require.config({
	
	// The shim config allows us to configure dependencies for
	// scripts that do not call define() to register a module
	
	baseUrl:'/assets/js/apps/fund-prices/',
	
	shim:{
		 underscore: {
	     	exports: '_'
	     },
		 backbone: {
		 	deps: ['underscore', 'jquery'],
		    exports: 'Backbone'
		 }		 
	},
	
	paths: {   
		jquery: 'jquery-1.9.1.min',
	    underscore: 'underscore_1_52',
	    backbone: 'backbone_1_1_min'
	}
});