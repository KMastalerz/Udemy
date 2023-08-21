import View from './View.js' 
import icons from 'url:../../img/icons.svg'//Parcel 2 url for not programming files

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function(e) {
            //e.preventDefault();
            const btn = e.target.closest('.btn--inline');

            //if no button then return
            if(!btn) return;

            handler(+btn.dataset.goto);
        });
    }

    _generateMarkup() {
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);  
        const curPage = this._data.page;

        // There is only one page
        if (numPages === 1) return '';
        // Page 1 and there are other pages
        if (numPages > 1 && curPage === 1) {
            return this._generateMarkupNext(curPage + 1);
        }
        // Page beteen 1 and N
        if (numPages !== curPage) {
            let markup =  this._generateMarkupPrev(curPage - 1);
            markup += this._generateMarkupNext(curPage + 1);
            return markup;
        }
        // Page N
        if(numPages === curPage){
            return this._generateMarkupPrev(curPage - 1);
        }
    }

    _generateMarkupPrev(prevPage){
        return `
        <button data-goto="${prevPage}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${prevPage}</span>
        </button>`
    }

    _generateMarkupNext(nextPage){
        return `
        <button data-goto="${nextPage}" class="btn--inline pagination__btn--next">
            <span>Page ${nextPage}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>`
    }
}

export default new PaginationView();