/**
 * This view contains user fund search query result. User can see fund Detail and
 * plot charts for the selected fund.
 *  *  -
 */
define(['jquery', 'backbone', 'underscore', 'FundPriceCollection', 'ServiceManager', 'UserTypeUtil',
            'text!templates/FundPriceResultPanel.html'],
        function (jQuery, Backbone, _, FundPriceCollection, ServiceManager, UserTypeUtil,
                  FundPriceResultPanel) {

            // var fundPriceCollectionInstance = new FundPriceCollection();

            var FundPriceResultPanelView = Backbone.View.extend({
                el: jQuery('#fundPriceResult'),

                initialize: function (options) {
                    //INC150363721
                    this.fullCollection = this.collection;
                    this.fullCollection.sortName = 'name';
                    this.fullCollection.sortOrder = 'asc';
                    this.PAGE_LEN = 999999;
                    this.start = 0;
                    this.stop = this.PAGE_LEN;
                },

                render: function () {
                    console.log('total results =', this.collection.length);
                    console.log('start =', this.start);
                    console.log('page length =', this.PAGE_LEN);

                    if (this.fullCollection.sort) {
                        this.fullCollection.sort();
                    }

                    // this.collection = getCollectionPage(this.fullCollection, this.start, this.stop);
                    this.collection = this.fullCollection;

                    this.collection.totalFunds = this.fullCollection.length;
                    this.collection.pageLen = this.PAGE_LEN;

                    template = _.template(FundPriceResultPanel, {funds: this.collection, audienceId: UserTypeUtil.getAudienceId()});
                    jQuery('#fundPriceResult').html(template);

                    jQuery('#defaultLoader').fadeOut(function () {
                        jQuery('#fundPricePanel,  #fundPriceResult').show();
                    });

                    //INC150363721
                    this.$el.find('#sortByName').on('click', _.bind(function () {
                        this.sortbyName();

                    }, this));
                    this.$el.find('#sortByCurrency').on('click', _.bind(function () {
                        this.sortbyCurrency();
                    }, this));
                },
                downloadCSV: function (event) {
                    ServiceManager.downloadFund();
                },

                //INC150363721
                sortbyName: function () {

                    var id = 'arrowImgFund';
                    this.fullCollection.toggleSortOrder();
                    this.fullCollection.sortName = 'name';
                    this.fullCollection.sort();
                    this.render();
                    this.setSortImage(id);

                },

                //INC150363721
                sortbyCurrency: function () {
                    var id = 'arrowImgCurr';
                    this.fullCollection.toggleSortOrder();
                    this.fullCollection.sortName = 'fundCurrency';
                    this.fullCollection.sort();
                    this.render();
                    this.setSortImage(id);
                },

                //INC150363721
                setSortImage: function (id) {

                    var sortOrderforImage = this.fullCollection.sortOrder;
                    var temp = "#" + id;
                    if (sortOrderforImage === 'asc') {

                        jQuery(temp).removeClass("ofBlueArrowdown").closest( 'th' ).removeClass( 'is-sorted-by' );
                        jQuery(temp).addClass("ofBlueArrowUp").closest( 'th' ).addClass( 'is-sorted-by' );

                    } else {

                        jQuery(temp).removeClass("ofBlueArrowUp").closest( 'th' ).removeClass( 'is-sorted-by' );
                        jQuery(temp).addClass("ofBlueArrowdown").closest( 'th' ).addClass( 'is-sorted-by' );

                    }
                },

                getPageLenFromEvent: function(e){
                    return parseInt($(e.currentTarget).val(), 10);
                },

                updatePageCount: function (e) {
                    this.PAGE_LEN = this.getPageLenFromEvent(e);
                    this.stop = this.PAGE_LEN;
                    this.render();
                },

                renderNextFunds: function () {
                    this.stop = this.stop + this.PAGE_LEN;
                    this.render();
                },

                events: function () {

                    return {

                        'click #ofPrint': 'downloadCSV',
                        //INC150363721
                        'click #sortByName': 'sortByName',
                        'click #sortByCurrency': 'sortByCurrency',
                        'click #nextFunds': 'renderNextFunds',
                        'change #pageCount_1': 'updatePageCount',
                        'change #pageCount_2': 'updatePageCount'
                    };
                }
            });

            function getCollectionPage (col, index, len) {
                return new Backbone.Collection(col.models.slice(index, index + len));
            }

            return FundPriceResultPanelView;

        });
