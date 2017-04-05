/*global define*/
'use strict';

define([
	'jquery',
	'underscore',
	'backbone',
	'FundProviderCollection',
	'FundPriceCollection',
	'FundPriceConstants',
	'UserTypeUtil'
], function (jQuery, _, Backbone, FundProviderCollection, FundPriceCollection, FundPriceConstants,UserTypeUtil) {

	function getDevProps () {
		return {
			url: './assets/js/apps/fund-prices/stub-data/fund-filters-for-search.json',
			urlFilters: './assets/js/apps/fund-prices/stub-data/search-by-substring-with-filters.json',
			method: 'GET'
		}
	}

	function getDefaultProps () {
		return {
			url : '/product/securities/service/funds/funds/fund-filters-for-search',
			urlFilters: '/product/securities/service/funds/search-by-substring-with-filters',
			method : 'POST'
		}
	}

	function  getEnvProperty(prop, envFn) {
		envFn = envFn || getDefaultProps;

		return envFn()[prop];
	}

	return {
		fundProviders: new Array(),
		fundPriceCollectionInstance: FundPriceCollection,

		loadFundProviderData:function() {
			var me = this;
	    	var fundProviderCollInstance = new FundProviderCollection();

			var audienceId = UserTypeUtil.getAudienceId();

			var data='audienceId=' + audienceId + '&appliedFilters=&fundNameSubString=';

			fundProviderCollInstance.fetch({
				url: getEnvProperty('url', getDevProps), //'/product/securities/service/funds/fund-filters-for-search',
				data: data,
				type: getEnvProperty('method', getDevProps), //'POST',
				success : function() {
					var categoryDataArray = fundProviderCollInstance.at(2).get('categories');
					_.each(categoryDataArray, function(category,index){
						me.fundProviders[index] = categoryDataArray[index].name;
					});
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					//console.log(XMLHttpRequest);
					//console.log(textStatus);
					//console.log(errorThrown);
				},
				async: false
			});
	    },

		searchBySubstringWithFilters:function(onComplete){
			var me = this;
			var data = me.getSearchBySubstringWithFiltersContentToSend();
			var fundPriceCollInstance = new FundPriceCollection();

			onComplete = onComplete || Function.prototype;

			fundPriceCollInstance.fetch({
				url: getEnvProperty('urlFilters', getDevProps), //'/product/securities/service/funds/search-by-substring-with-filters',
				data: data,
				type: getEnvProperty('method', getDevProps), //'POST',
				success : function() {
					me.fundPriceCollectionInstance = fundPriceCollInstance;
					me.prepareJSONFundPriceData();
					onComplete(me.fundPriceCollectionInstance);
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					console.log(XMLHttpRequest);
					console.log(textStatus);
					console.log(errorThrown);
				},
				async: false
			});
		},

		downloadFund:function(){
			var form = jQuery('<form id="downloadCSVForm" action="/product/securities/service/funds/download-funds" method="POST"></form>');

			form.append('<input type="hidden" name="substring"  value=""/>');
			form.append('<input type="hidden" name="appliedFilters" value=""/>');
			form.append('<input type="hidden" name="start" value="1"/>');
			form.append('<input type="hidden" name="maxResults" value=""/>');
			form.append('<input type="hidden" name="audienceId" value=""/>');
			form.append('<input type="hidden" name="idolQueryParam" value="fund_prices"/>');
			form.append('<input type="hidden" name="orderedUIFields" value="officialName,priceUpdatedDate,buy,sell,priceChange,currency"/>');
			form.append('<input type="hidden" name="mode" value="all"/>');

			var appliedFilter = jQuery("body").find("input[name=APPLIED_FILTER]").val();

			if(appliedFilter.indexOf('%26') >-1){
				appliedFilter = appliedFilter.replace(new RegExp('%26', 'g'), '&');
			}

			form.find("input[name=appliedFilters]").val(appliedFilter);
			form.find("input[name=maxResults]").val(FundPriceConstants.SEARCH_BY_SUBSTRING_WITH_FILTERS_MAX_RESULT);
			form.find("input[name=audienceId]").val(UserTypeUtil.getAudienceId());

			jQuery("body").append(form);

			form.submit();
		},

		prepareJSONFundPriceData:function() {
			var me = this;
			var funds = me.fundPriceCollectionInstance;

			// console.log('searchBySubstringWithFilters', data);

			_.each(funds, function(fund,index){
				var fundName = funds.at(index).get('name');
				var cleanShareClassFlag = funds.at(index).get('cleanShareClass');
				var bundledFundIndicator = '';
				if(!cleanShareClassFlag){
					bundledFundIndicator = '*';
				}
				var priceObj = funds.at(index).get('price');
				var askPrice = priceObj.askPrice;
				var bidPrice = priceObj.bidPrice;
				var navPrice = priceObj.navPrice;

				var updated = '';
				var priceBuySell = '';
				var buy = '';
				var sell = '';
				var change = '';

				if(askPrice != '' && bidPrice != ''){
					updated = askPrice.date;
					priceBuySell = askPrice.value + ' ' + FundPriceConstants.PIPE + ' ' + bidPrice.value;
					buy = askPrice.value;
					sell = bidPrice.value;
					change = askPrice.dayChanceInAbsolute;
				}else {
					updated = navPrice.date;
					priceBuySell = navPrice.value;
					buy = priceBuySell;
					sell = priceBuySell;
					change = navPrice.dayChanceInAbsolute;
				}

				// formatting the datetime
				if(updated !='' && updated != undefined){
					var arr = updated.split(" ");
					var res = arr[0].split("-");
					var year = res[0];
					var month = res[1];
					var day = res[2];
					updated = day+"/"+month+"/"+year;
				}

				// setting price update date
				funds.at(index).set('updated', updated);

				// setting price
				funds.at(index).set('price', priceBuySell);

				//setting for csv
				funds.at(index).set('buy', buy);
				funds.at(index).set('sell', sell);

				// setting price change
				if(change == undefined){
					change = '-';
				}
				funds.at(index).set('change', change);
				if(funds.at(index).get('yield') == undefined){
					funds.at(index).set('yield', '-');
				}
			});
		},

		getSearchBySubstringWithFiltersContentToSend:function(){
			var fundType = jQuery('#fund_type').val();
			var providerName = jQuery('#fund_provider').val();
			var fundStatus = jQuery('[name="fundsAvailability"]:checked').val();
			var appliedFilters = '';

			providerName = providerName || '';

			if(providerName.indexOf('&') >-1){
				providerName = providerName.replace('&','%26');
			}
			var audienceId = UserTypeUtil.getAudienceId();
			if(!audienceId || audienceId == ""){
				audienceId = "1202";
			}
			if(audienceId == "1202"){
				if(fundStatus == 'open'){
					if(fundType !='All'){
						if(fundType == 'Currency'){
							//INC150270095 - Closed fund are displaying under open fund option in Fund Pricing page

							appliedFilters = '(,MATCH|*/IS_CLEAN|1,AND,MATCH|*/FUND_STATUS|OPEN,AND,(,MATCH|*/ID_CONTINGENT|'+audienceId+',WHEN,MATCH|*/BASEDATA/AUDIENCES/AUDIENCE/BUYELIGIBLE|1,),AND,MATCH|*/LEGAL_STRUCTURE_CAT|OFFSHORE,AND,MATCH|*/CASH_FUND|1'
								+',AND,MATCH|*/INVESTMENT_COMPANY/NAME|' + providerName + ',)';
						}else{
							//INC150270095 - Closed fund are displaying under open fund option in Fund Pricing page

							appliedFilters = '(,MATCH|*/IS_CLEAN|1,AND,MATCH|*/FUND_STATUS|OPEN,AND,(,MATCH|*/ID_CONTINGENT|'+audienceId+',WHEN,MATCH|*/BASEDATA/AUDIENCES/AUDIENCE/BUYELIGIBLE|1,),AND,MATCH|*/LEGAL_STRUCTURE_CAT|' + fundType
							+',AND,MATCH|*/INVESTMENT_COMPANY/NAME|' + providerName + ',)';

						}
					}else{
						//INC150270095 - Closed fund are displaying under open fund option in Fund Pricing page
						appliedFilters = '(,MATCH|*/IS_CLEAN|1,AND,MATCH|*/FUND_STATUS|OPEN,AND,(,MATCH|*/ID_CONTINGENT|'+audienceId+',WHEN,MATCH|*/BASEDATA/AUDIENCES/AUDIENCE/BUYELIGIBLE|1,),AND,MATCH|*/INVESTMENT_COMPANY/NAME|' + providerName + ',)';
					}
				}
				else if(fundStatus == 'closed'){
					if(fundType !='All'){
						if(fundType == 'Currency'){
							//INC150270095 - Closed fund are displaying under open fund option in Fund Pricing page
							appliedFilters =
								'(,MATCH|*/LEGAL_STRUCTURE_CAT|OFFSHORE,AND,MATCH|*/INVESTMENT_COMPANY/NAME|'+providerName+',)'+',AND,'+'(,(,MATCH|*/IS_CLEAN|1,AND,MATCH|*/FUND_STATUS|CLOSED,AND,MATCH|*/CASH_FUND|1,)'+',OR,'+'(,MATCH|*/IS_CLEAN|1,AND,MATCH|*/FUND_STATUS|SUSPENDED,AND,MATCH|*/CASH_FUND|1,)'+',OR,'+'(,MATCH|*/IS_CLEAN|0,AND,MATCH|*/CASH_FUND|1,)'+',OR,'+'(,MATCH|*/IS_CLEAN|1,AND,MATCH|*/FUND_STATUS|OPEN,AND,(,MATCH|*/ID_CONTINGENT|'+audienceId+',WHEN,MATCH|*/BASEDATA/AUDIENCES/AUDIENCE/BUYELIGIBLE|0,),AND,MATCH|*/CASH_FUND|1,),)';
						}else{
							//INC150270095 - Closed fund are displaying under open fund option in Fund Pricing page
							appliedFilters =
							'(,MATCH|*/LEGAL_STRUCTURE_CAT|'+fundType+',AND,MATCH|*/INVESTMENT_COMPANY/NAME|'+providerName+',)'+',AND,'+'(,(,MATCH|*/IS_CLEAN|1,AND,MATCH|*/FUND_STATUS|CLOSED,)'+',OR,'+'(,MATCH|*/IS_CLEAN|1,AND,MATCH|*/FUND_STATUS|SUSPENDED,)'+',OR,'+'(,MATCH|*/IS_CLEAN|0,)'+',OR,'+'(,MATCH|*/IS_CLEAN|1,AND,MATCH|*/FUND_STATUS|OPEN,AND,(,MATCH|*/ID_CONTINGENT|'+audienceId+',WHEN,MATCH|*/BASEDATA/AUDIENCES/AUDIENCE/BUYELIGIBLE|0,),),)';
						}
					}
					else{
						//INC150270095 - Closed fund are displaying under open fund option in Fund Pricing page
						appliedFilters =
						'(,MATCH|*/INVESTMENT_COMPANY/NAME|'+providerName+',)'+',AND,'+'(,(,MATCH|*/IS_CLEAN|1,AND,MATCH|*/FUND_STATUS|CLOSED,)'+',OR,'+'(,MATCH|*/IS_CLEAN|1,AND,MATCH|*/FUND_STATUS|SUSPENDED,)'+',OR,'+'(,MATCH|*/IS_CLEAN|0,)'+',OR,'+'(,MATCH|*/IS_CLEAN|1,AND,MATCH|*/FUND_STATUS|OPEN,AND,(,MATCH|*/ID_CONTINGENT|'+audienceId+',WHEN,MATCH|*/BASEDATA/AUDIENCES/AUDIENCE/BUYELIGIBLE|0,),),)';


					}
				}else if(fundStatus == 'All'){
					if(fundType !='All'){
						if(fundType == 'Currency'){
							appliedFilters = 'LEGAL_STRUCTURE_CAT|OFFSHORE,CASH_FUND|1,*/INVESTMENT_COMPANY/NAME|' + providerName;
						}else{
							appliedFilters = 'LEGAL_STRUCTURE_CAT|' + fundType + ',*/INVESTMENT_COMPANY/NAME|' + providerName;
						}
					}else{
						appliedFilters = '*/INVESTMENT_COMPANY/NAME|' + providerName;
					}
				}

			}else{
				if(fundStatus == 'open'){
					if(fundType !='All'){
						if(fundType == 'Currency'){
							appliedFilters = '(,MATCH|*/IS_CLEAN|1,AND,MATCH|*/FUND_STATUS|OPEN,AND,MATCH|*/LEGAL_STRUCTURE_CAT|OFFSHORE,AND,MATCH|*/CASH_FUND|1'
								+',AND,MATCH|*/INVESTMENT_COMPANY/NAME|' + providerName + ',)';
						}else{
							appliedFilters = '(,MATCH|*/IS_CLEAN|1,AND,MATCH|*/FUND_STATUS|OPEN,AND,MATCH|*/LEGAL_STRUCTURE_CAT|' + fundType
								+',AND,MATCH|*/INVESTMENT_COMPANY/NAME|' + providerName + ',)';
						}
					}else{
						appliedFilters = '(,MATCH|*/IS_CLEAN|1,AND,MATCH|*/FUND_STATUS|OPEN,AND,MATCH|*/INVESTMENT_COMPANY/NAME|' + providerName + ',)';
					}
				}
				else if(fundStatus == 'closed'){
					if(fundType !='All'){
						if(fundType == 'Currency'){
							appliedFilters =
							'(,MATCH|*/IS_CLEAN|1,AND,MATCH|*/FUND_STATUS|CLOSED,AND,MATCH|*/LEGAL_STRUCTURE_CAT|OFFSHORE,AND,MATCH|*/CASH_FUND|1'+
								',AND,MATCH|*/INVESTMENT_COMPANY/NAME|'+providerName+',),OR,(,MATCH|*/IS_CLEAN|1,AND,MATCH|*/FUND_STATUS|SUSPENDED,AND,MATCH|*/LEGAL_STRUCTURE_CAT|OFFSHORE,AND,MATCH|*/CASH_FUND|1'+
								',AND,MATCH|*/INVESTMENT_COMPANY/NAME|'+providerName+',),OR,(,MATCH|*/IS_CLEAN|0,AND,MATCH|*/LEGAL_STRUCTURE_CAT|OFFSHORE,AND,MATCH|*/CASH_FUND|1'+',AND,MATCH|*/INVESTMENT_COMPANY/NAME|'+providerName+',)';
						}else{
							appliedFilters =
							'(,MATCH|*/IS_CLEAN|1,AND,MATCH|*/FUND_STATUS|CLOSED,AND,MATCH|*/LEGAL_STRUCTURE_CAT|'+
								fundType +',AND,MATCH|*/INVESTMENT_COMPANY/NAME|'+providerName+',),OR,(,MATCH|*/IS_CLEAN|1,AND,MATCH|*/FUND_STATUS|SUSPENDED,AND,MATCH|*/LEGAL_STRUCTURE_CAT|'+
							    fundType+',AND,MATCH|*/INVESTMENT_COMPANY/NAME|'+providerName+',),OR,(,MATCH|*/IS_CLEAN|0,AND,MATCH|*/LEGAL_STRUCTURE_CAT|'+
								fundType+',AND,MATCH|*/INVESTMENT_COMPANY/NAME|'+providerName+',)';



						}
					}
					else{

						appliedFilters = '(,MATCH|*/IS_CLEAN|1,AND,MATCH|*/FUND_STATUS|CLOSED,AND,MATCH|*/INVESTMENT_COMPANY/NAME|'+providerName+',)'+
						',OR,'+
						'(,MATCH|*/IS_CLEAN|1,AND,MATCH|*/FUND_STATUS|SUSPENDED,AND,MATCH|*/INVESTMENT_COMPANY/NAME|'+providerName+',)'+
						',OR,'+
						'(,MATCH|*/IS_CLEAN|0,AND,MATCH|*/INVESTMENT_COMPANY/NAME|'+providerName+',)';
					}
				}else if(fundStatus == 'All'){
					if(fundType !='All'){
						if(fundType == 'Currency'){
							appliedFilters = 'LEGAL_STRUCTURE_CAT|OFFSHORE,CASH_FUND|1,*/INVESTMENT_COMPANY/NAME|' + providerName;
						}else{
							appliedFilters = 'LEGAL_STRUCTURE_CAT|' + fundType + ',*/INVESTMENT_COMPANY/NAME|' + providerName;
						}
					}else{
						appliedFilters = '*/INVESTMENT_COMPANY/NAME|' + providerName;
					}
				}
			}

			// putting appliedfilter in a hidden field
			var APPLIED_FILTER_HIDDEN_FIELD = jQuery('<input type="hidden" name="APPLIED_FILTER" value=""/>');

			jQuery("body").append(APPLIED_FILTER_HIDDEN_FIELD);
			jQuery("body").find("input[name=APPLIED_FILTER]").val(appliedFilters);

			var data = 'substring=&appliedFilters=' +
							appliedFilters + '&start=1&maxResults=' +
							FundPriceConstants.SEARCH_BY_SUBSTRING_WITH_FILTERS_MAX_RESULT +
							'&audienceId='+audienceId+'&' + 'idolQueryParam=' + FundPriceConstants.IDOL_QUERY_PARAM;

			return data;
		},

	    loadData:function(){
       		this.loadFundProviderData();
	    }

	}
});
