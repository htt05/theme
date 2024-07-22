class PredictiveSearch extends HTMLElement{constructor(){super(),this.cachedResults={},this.input=this.querySelector('input[type="search"]'),this.predictiveSearchResults=this.querySelector("[data-predictive-search]"),this.isOpen=!1,this.setupEventListeners()}setupEventListeners(){this.querySelector("form.search").addEventListener("submit",this.onFormSubmit.bind(this)),this.input.addEventListener("input",debounce(event=>{this.onChange(event)},300).bind(this)),this.input.addEventListener("focus",this.onFocus.bind(this)),this.addEventListener("focusout",this.onFocusOut.bind(this)),this.addEventListener("keyup",this.onKeyup.bind(this)),this.addEventListener("keydown",this.onKeydown.bind(this))}getQuery(){return this.input.value.trim()}onChange(){const searchTerm=this.getQuery();if(!searchTerm.length){this.close(!0);return}this.getSearchResults(searchTerm)}onFormSubmit(event){(!this.getQuery().length||this.querySelector('[aria-selected="true"] a'))&&event.preventDefault()}onFocus(){const searchTerm=this.getQuery();searchTerm.length&&(this.getAttribute("results")==="true"?this.open():this.getSearchResults(searchTerm))}onFocusOut(){setTimeout(()=>{this.contains(document.activeElement)||this.close()})}onKeyup(event){switch(this.getQuery().length||this.close(!0),event.preventDefault(),event.code){case"ArrowUp":this.switchOption("up");break;case"ArrowDown":this.switchOption("down");break;case"Enter":this.selectOption();break}}onKeydown(event){(event.code==="ArrowUp"||event.code==="ArrowDown")&&event.preventDefault()}switchOption(direction){if(!this.getAttribute("open"))return;const moveUp=direction==="up",selectedElement=this.querySelector('[aria-selected="true"]'),allElements=this.querySelectorAll("li");let activeElement=this.querySelector("li");moveUp&&!selectedElement||(this.statusElement.textContent="",!moveUp&&selectedElement?activeElement=selectedElement.nextElementSibling||allElements[0]:moveUp&&(activeElement=selectedElement.previousElementSibling||allElements[allElements.length-1]),activeElement!==selectedElement&&(activeElement.setAttribute("aria-selected",!0),selectedElement&&selectedElement.setAttribute("aria-selected",!1),this.setLiveRegionText(activeElement.textContent),this.input.setAttribute("aria-activedescendant",activeElement.id)))}selectOption(){const selectedProduct=this.querySelector('[aria-selected="true"] a, [aria-selected="true"] button');selectedProduct&&selectedProduct.click()}getSearchResults(searchTerm){const queryKey=searchTerm.replace(" ","-").toLowerCase();if(this.setLiveRegionLoadingState(),this.cachedResults[queryKey]){this.renderSearchResults(this.cachedResults[queryKey]);return}fetch(`${routes.predictive_search_url}?q=${encodeURIComponent(searchTerm)}&${encodeURIComponent("resources[type]")}=product&${encodeURIComponent("resources[limit]")}=4&section_id=predictive-search`).then(response=>{if(!response.ok){var error=new Error(response.status);throw this.close(),error}return response.text()}).then(text=>{const resultsMarkup=new DOMParser().parseFromString(text,"text/html").querySelector("#shopify-section-predictive-search").innerHTML;this.cachedResults[queryKey]=resultsMarkup,this.renderSearchResults(resultsMarkup)}).catch(error=>{throw this.close(),error})}setLiveRegionLoadingState(){this.statusElement=this.statusElement||this.querySelector(".predictive-search-status"),this.loadingText=this.loadingText||this.getAttribute("data-loading-text"),this.setLiveRegionText(this.loadingText),this.setAttribute("loading",!0)}setLiveRegionText(statusText){this.statusElement.setAttribute("aria-hidden","false"),this.statusElement.textContent=statusText,setTimeout(()=>{this.statusElement.setAttribute("aria-hidden","true")},1e3)}renderSearchResults(resultsMarkup){this.predictiveSearchResults.innerHTML=resultsMarkup,this.setAttribute("results",!0),this.setLiveRegionResults(),this.open()}setLiveRegionResults(){this.removeAttribute("loading"),this.setLiveRegionText(this.querySelector("[data-predictive-search-live-region-count-value]").textContent)}getResultsMaxHeight(){return this.resultsMaxHeight=window.innerHeight-document.getElementById("shopify-section-header").getBoundingClientRect().bottom,this.resultsMaxHeight}open(){this.predictiveSearchResults.style.maxHeight=this.resultsMaxHeight||`${this.getResultsMaxHeight()}px`,this.setAttribute("open",!0),this.input.setAttribute("aria-expanded",!0),this.isOpen=!0}close(clearSearchTerm=!1){clearSearchTerm&&(this.input.value="",this.removeAttribute("results"));const selected=this.querySelector('[aria-selected="true"]');selected&&selected.setAttribute("aria-selected",!1),this.input.setAttribute("aria-activedescendant",""),this.removeAttribute("open"),this.input.setAttribute("aria-expanded",!1),this.resultsMaxHeight=!1,this.predictiveSearchResults.removeAttribute("style"),this.isOpen=!1}}customElements.define("predictive-search",PredictiveSearch);
//# sourceMappingURL=/cdn/shop/t/11/assets/predictive-search.js.map?v=31278710863581584031712829871
