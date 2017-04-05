require.config({
	
	// The shim config allows us to configure dependencies for
	// scripts that do not call define() to register a module
	baseUrl:'/assets/js/apps/fund-prices/',
	
	paths : {
	    underscore: 'libs/underscore/underscore_1_52',
	    backbone: 'libs/backbone/backbone_1_1_min',
		jquery: '/static/common/js/jquery-1.9.1.min',
		
		router : 'router',
		templates: '../templates',
		MainView: 'com/fidelity/fundprices/views/MainView',		
        FundPriceInputPanelView: 'com/fidelity/fundprices/views/FundPriceInputPanelView',  
		FundPriceResultPanelView: 'com/fidelity/fundprices/views/FundPriceResultPanelView',	
		ServiceManager: 'com/fidelity/fundprices/models/ServiceManager',
		FundPriceResultModel: 'com/fidelity/fundprices/models/FundPriceResultModel',				
		FundProviderResultModel: 'com/fidelity/fundprices/models/FundProviderResultModel',				
		FundPriceCollection: 'com/fidelity/fundprices/collections/FundPriceCollection',
		FundProviderCollection: 'com/fidelity/fundprices/collections/FundProviderCollection',		
		FundPriceConstants:'com/fidelity/fundprices/constant/FundPriceConstants',
		UserTypeUtil: 'com/fidelity/fundprices/util/UserTypeUtil'
	},
	shim : {
		backbone : {
			deps : ['underscore', 'jquery'],
			exports : 'Backbone'
		},		
		underscore : {
			exports : '_'
		}		
	}
});