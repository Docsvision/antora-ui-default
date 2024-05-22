/* eslint-disable */

// Init DocSearch
const appId = "XXX";
const apiKey = "12345abc";
docsearch({
    container: "#mycontainer",
    appId,
    indexName: "myindex",
    apiKey,
    resultsFooterComponent({ state }) {
        return {
            type: "a",
            ref: undefined,
            constructor: undefined,
            key: state.query,
            props: {
                href: `/search.html?q=${state.query}`,
                children: `See all ${state.context.nbHits} results`
            },
            __v: null
        };
    }
});
// Also init Algolia InstantSearch, if available (for search results page)
if (typeof algoliasearch != "undefined" && typeof instantsearch != "undefined") {
    const { algoliasearch, instantsearch } = window;

    const searchClient = algoliasearch(appId, apiKey);
    const indexName = "myindex";

    const search = instantsearch({
        searchClient,
        indexName,
        routing: {
            stateMapping: {
                stateToRoute(uiState) {
                    const indexUiState = uiState[indexName];
                    return {
                        q: indexUiState.query,
                    }
                },
                routeToState({q}) {
                    return {
                        [indexName]: {
                            query: q,
                        },
                    };
                },
            },
        }
    });

    search.addWidgets([
        instantsearch.widgets.searchBox({
            container: '#searchbox',
        }),
        instantsearch.widgets.hits({
            container: '#hits',
            templates: {
                item(hit, { html, components, sendEvent }) {
                    return html`
            <div>
                <p class="ais-Heading"><a href="${hit.url}">${hit.hierarchy.lvl2 ? hit.hierarchy.lvl2 : hit.hierarchy.lvl1}</a></p>
                <p>${components.Highlight({ hit, attribute: 'content' })}</p>
                <p class="ais-Breadcrumbs">${hit.hierarchy.lvl0}: ${hit.hierarchy.lvl1} ${hit.hierarchy.lvl2 ? "> " + hit.hierarchy.lvl2 : ""}</p>
            </div>
            `;
                },
            },
        }),
        instantsearch.widgets.configure({
            hitsPerPage: 8,
            facetFilters: [`lang:${currentLang}`],
            queryLanguages: [currentLang]
        }),
        instantsearch.widgets.pagination({
            container: '#pagination',
        }),
    ]);

    search.start();
}
