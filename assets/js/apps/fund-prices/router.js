/**
 * Extend and create your own Backbone Router. Create and attach event handlers
 * to events (captured using URL routes).
 */
define(['underscore','backbone','FundPriceCollection','MainView','FundPriceConstants'],		
	function(_,Backbone,FundPriceCollection,MainView,FundPriceConstants) {
		// extend backbone router
		var AppRouter = Backbone.Router.extend({
		// hold fundsCollection instance once populated for using later
		// in event handlers.	
		fundPriceCollectionInstance : FundPriceCollection,		
		routes : {
			// Define fund prices URL routes			
			'fundPriceComp' : 'fundPriceComp',			
			// Default route that gets invoked when index.html is loaded
			'*action': 'fundPriceComp'
		}
	});
	var appRouter = new AppRouter();
	// initialize router
	var initialize = function() {
		var mainView = new MainView();		
		appRouter.on('route:fundPriceComp',function() {
				//render fund price input page
				mainView.render(FundPriceConstants.VIEW_FUND_PRICE_INPUT);				
				// render fund prices with fidelity data
				mainView.render(FundPriceConstants.VIEW_FUND_PRICE_RESULT);				
		});					
		Backbone.history.start();		
	};	
	return {
		initialize : initialize
	};
});