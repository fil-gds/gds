define([
	'jquery',
  	'underscore',
  	'backbone',
  	'FundPriceConstants',  	
  	'FundPriceInputPanelView',
  	'FundPriceResultPanelView',
	'ServiceManager'
], function(jQuery, _, Backbone, FundPriceConstants, FundPriceInputPanelView, FundPriceResultPanelView, ServiceManager) {
	var mainView = Backbone.View.extend({
  		
  		/**
		 * Performs Initial tasks.
		 */
  		initialize:function() {
			this.fundPriceInputPanelView = new FundPriceInputPanelView();							
    	},
    	
	    render: function(viewType) {

			var onLoaded = function (fundPriceCollection) {
				this.fundPriceInputPanelView.updateResultsCount(fundPriceCollection);
				this.fundPriceInputPanelView.render();
			}.bind(this);

			if(viewType === FundPriceConstants.VIEW_FUND_PRICE_INPUT){
	    		this.fundPriceInputPanelView.render(ServiceManager.fundProviders);
	    	}else if(viewType === FundPriceConstants.VIEW_FUND_PRICE_RESULT){	    		
				// load PS fund data				
				ServiceManager.searchBySubstringWithFilters(onLoaded);

				fundPriceResultPanelView = new FundPriceResultPanelView({
						collection : ServiceManager.fundPriceCollectionInstance
				});

				fundPriceResultPanelView.render();


	    	}
	    	return this;
	    }
  	});
  	return mainView;
});