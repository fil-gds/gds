 /**
 * Extend and create your own Backbone Collection of FundProvider Fetch a JSON and
 * implement parse call back method to construct a basic Backbone collection of
 * models from items array in JSON. Each item object represents a fund object.
 */
define([ 'underscore', 'backbone', 'FundProviderResultModel' ], function(_, Backbone,
		FundProviderResultModel) {

	function getDevProps () {
		return {
			url: '/assets/js/apps/fund-prices/stub-data/fund-filters-for-search.json',
			method: 'GET'
		}
	}

	function getDefaultProps () {
		return {
			url: '/product/securities/service/funds/fund-filters-for-search',
			method: 'POST'
		}
	}

	function getEnvProperty (prop, envFn) {
		envFn = envFn || getDefaultProps;

		return envFn()[prop];
	}


	var FundProviderCollection = Backbone.Collection.extend({
		defaults : {
			fundNameSubString : ''
		},
		model : FundProviderResultModel,
		initialize : function(models, options) {
		},
		// url: '/product/securities/service/funds/fund-filters-for-search',
		parse : function(result) {
			return result.FundFilters.filters;
		}
	});
	return FundProviderCollection;
});