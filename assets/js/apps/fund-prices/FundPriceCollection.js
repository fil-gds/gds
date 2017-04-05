/**
 * Extend and create your own Backbone Collection of FundPriceResultModel Fetch a JSON and
 * implement parse call back method to construct a basic Backbone collection of
 * models from items array in JSON. Each item object represents a fund price result object.
 */
define([ 'underscore', 'backbone', 'FundPriceResultModel' ], function(_, Backbone,
		FundPriceResultModel) {

	var FundPriceCollection = Backbone.Collection.extend({
		defaults : {
			substring : '',
			//INC150363721
			sortName : 'name',
			sortOrder : 'asc'
		},
		model : FundPriceResultModel,
		initialize : function(models, options) {
		},
		url: '/product/securities/service/funds/search-by-substring-with-filters',
		parse : function(result) {			
			return result.FundList.funds;
		},		
	
	//INC150363721
		initialize: function () {
			this.on('change:sortName', function () {
				this.sortOrder = 'asc';
			}, this)
		},
		
	//INC150363721
		toggleSortOrder: function () {
			if ('asc' === this.sortOrder) {
				this.sortOrder = 'desc';
			} else {
				this.sortOrder = 'asc';
			}
		},
		
	//INC150363721
		comparator: function (model1, model2) {
		  var sortName = this.sortName;
		  
	      var value1 = model1.get(sortName);
	      var value2 = model2.get(sortName);
	      return this.generalSort(value1, value2);
	    },

	   
	 //INC150363721
	    generalSort: function (value1, value2) {
	      if ('string' === typeof value1 && 'string' === typeof value2) {
	        value1 = value1.toLowerCase();
	        value2 = value2.toLowerCase();
	      }
	      
	      var sortOrder = this.sortOrder;
	      if ('asc' === sortOrder) {
	        if (value1 > value2) {
	          return 1; 
	        } else if (value1 < value2) {
	          return -1; 
	        } else {
	          return 0; 
	        }
	      } else {
	        if (value1 > value2) {
	          return -1; 
	        } else if (value1 < value2) {
	          return 1; 
	        } else {
	          return 0; 
	        }
	      }
	    }
		
	});
	return FundPriceCollection;
});