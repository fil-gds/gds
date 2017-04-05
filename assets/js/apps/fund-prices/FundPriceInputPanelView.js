/**
 * Use Text JavaScript (RequireJS plug-in) to point to SingleAssetFundPanel
 * template on server Extend and create your own Backbone View with this
 * template.
 */
define([ 'jquery', 'backbone', 'underscore','ServiceManager',
	'FundPriceResultPanelView','text!templates/FundPriceInputPanel.html'],
function(jQuery, Backbone, _,ServiceManager,FundPriceResultPanelView,FundPriceInputPanel) {

    var flag = "";
	var FundPriceInputPanelView = Backbone.View.extend({
		
		el : jQuery('#fundPriceInputPanel'),
		initialize : function(options) {
		},
		render : function(fundproviders) {

			template = _.template(FundPriceInputPanel,{providers : fundproviders, resultsCount : this.resultsCount, showResults : this.resultsCount > 0});

			jQuery('#fundPriceInputPanel').html(template);
		},
		
		getFundPrices : function(){
			// load PS fund data
			ServiceManager.searchBySubstringWithFilters();


			fundPriceResultPanelView = new FundPriceResultPanelView({
						collection : ServiceManager.fundPriceCollectionInstance});
				fundPriceResultPanelView.render();			
		},

		updateResultsCount : function (col) {
			this.resultsCount = col.length;
		},

		/** Below code is added and updated to fix INC140043953 - -	Fund Prices: Whenever �fund type� is changed, the fund provider shouldn�t revert back to Fidelity every time.
 * 
 */
		
		updateFundProviderMenu : function(){
			var fundType = jQuery('#fund_type').val();	
            var fundProvider = 	jQuery('#fund_provider').val();	
			if('Currency' == fundType){
				jQuery('#fund_provider').val('Fidelity');
				jQuery('#fund_provider').prop('disabled', true);
			//Start:: AB:: Changed fundType from IT to ETF to disable fund provider filter
			}else if('ETF' == fundType){
				jQuery('#fund_provider').val('Fidelity');
				jQuery('#fund_provider').prop('disabled', false);
			//End:: AB:: Changed fundType from IT to ETF to disable fund provider filter	
			}else if(""==fundType){
				jQuery('#fund_provider').val('Fidelity');
				jQuery('#fund_provider').prop('disabled', false);
			}
			else{
			    if(flag==""){
			    	jQuery('#fund_provider').val('Fidelity');	
					jQuery('#fund_provider').prop('disabled', false);
				}else{
					jQuery('#fund_provider').val(flag);	
					jQuery('#fund_provider').prop('disabled', false);
				}
		
			 }
			},
			
			updateFlag : function(){
		
		  flag = jQuery('#fund_provider').val();
		    
		},
			
		events : {		
			'click #filterBtn' : 'getFundPrices',
			'change #fund_type': 'updateFundProviderMenu',
            'change #fund_provider': 'updateFlag'			
		}		
	});
	return FundPriceInputPanelView;
});