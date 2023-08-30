/* eslint-disable */

$('document').ready(function () {
		var search = instantsearch({
		  appId: 'BH4D9OD16A',
		  apiKey: 'c25b7174e8f6161ce5fdd44bb0b95081',
		  indexName: 'buckbuild',
		  urlSync: true
		});

		search.addWidget(
		  instantsearch.widgets.searchBox({
		    container: '#ais-input-container',
		    placeholder: 'Search in the documentation',
		    autofocus: false,
		    poweredBy: true
		  })
		);

		search.addWidget(
		  instantsearch.widgets.hits({
		    container: '#ais-results-container',
		    templates: {
		      empty: 'No results',
		      item: $('#ais-results-template').html()
		    },
		    hitsPerPage: 6
		  })
		);

		search.addWidget(
		  instantsearch.widgets.pagination({
		    container: '#ais-pagination-container',
		    maxPages: 20,
		    // default is to scroll to 'body', here we disable this behavior
		    scrollTo: false
		  })
		);

		search.start();
	});
    