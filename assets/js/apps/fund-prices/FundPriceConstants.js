define([	
	'underscore',
  	'backbone'
], function(_, Backbone) {
	return {
		LEGAL_STRUCTURE_CAT: 'LEGAL_STRUCTURE_CAT',		
		NAME: 'NAME',
		
		FUND_TYPE: 'Fund type',
		FUND_PROVIDER: 'Fund provider',
		AVAILABILITY: 'Availability',
		
		ALL: 'All',
		CURRENCY: 'Currency',
		CURRENCY_FUNDS: 'Currency Funds',
		INVESTMENTTRUST: 'INVESTMENTTRUST',
		INVESTMENT_TRUST: 'Investment Trust',
		
		OEIC: 'OEIC',
		OFFSHORE: 'OFFSHORE',
		UNITTRUST: 'UNITTRUST',
		WINDFALL: 'Windfall',
		SICAV: 'SICAV',
		UNIT_TRUST: 'Unit Trust',		
		
		PIPE: '|',
		COMMA: ',',
		
		// views 
		VIEW_FUND_PRICE_INPUT: 'Fund Price Input View',
		VIEW_FUND_PRICE_RESULT: 'Fund Price Result View',
		
		FUND_STATUS_OPEN_APPLIED_FILTER: '(,MATCH|*/IS_CLEAN|1,AND,MATCH|*/FUND_STATUS|OPEN,)',
		FUND_STATUS_CLOSED_APPLIED_FILTER: '(,MATCH|*/IS_CLEAN|1,AND,MATCH|*/FUND_STATUS|CLOSED,),OR,(,MATCH|*/IS_CLEAN|1,AND,MATCH|*/FUND_STATUS|SUSPENDED,),OR,(,MATCH|*/IS_CLEAN|0,)',

		SEARCH_BY_SUBSTRING_WITH_FILTERS_MAX_RESULT: 10000,
		IDOL_QUERY_PARAM: 'fund_prices'
	}
})