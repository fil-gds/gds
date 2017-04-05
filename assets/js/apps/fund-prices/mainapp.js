/**
 * Main application module file that initializes router.
 */
define(['router', 'ServiceManager'],
    function(Router, ServiceManager) {

	ServiceManager.loadData();

		// Pass in our Router module and call it's initialize function
		Router.initialize();
});
