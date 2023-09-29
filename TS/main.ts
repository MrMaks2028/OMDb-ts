const AppEl = document.querySelector('#app');
const API_KEY = '486c76d3'

type formView = {
    search,
    type,
    button
}

class Film {
    private id: string;
    private poster: string;
    private title: string;
    private type: string;
    private year: number|string;

    constructor({imdbID, Poster, Title, Type, Year}) {
        this.id = imdbID;
        this.poster = Poster;
        this.title = Title;
        this.type = Type;
        this.year = Year;
    }

    getHtml():string {
        return `<div> class="film">
            <img src=${this.poster} />
            <h3>${this.title} (${this.year} г.)</h3>
            <p>${this.type}</p>
        </div>`
    }
}

function createForm():formView {
    AppEl?.insertAdjacentHTML('afterbegin', `
        <div class="form">
            <input type="text" id="search" />
            <select id="type">
                <option value="movie">Фильм</option>
                <option value="series">Сериал</option>
                <option value="episode">Эпизод</option>
            </select>
            <button id="button">Найти</button>
        </div>
    `)

    return {
        search: AppEl?.querySelector('#search'),
        type: AppEl?.querySelector('#type'),
        button: AppEl?.querySelector('#button')
    }
}

function drawRsult(filmList:Film[]) {
    const resultEl = document.querySelector('#result')
    if(resultEl) {
            resultEl.textContent = '';

            filmList.forEach((film) => {
                resultEl.insertAdjacentHTML('afterbegin', film.getHtml())
            })
    }
}

function send(view:formView):void {
    fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${view.search.value}&type=${view.type.value}`)
    .then(response => response.json())
    .then(data => drawRsult(data.Search.map((filmData) => new Film(filmData))))
}

function init():void {
    const formView:formView = createForm();

    formView.button.addEventListener('click', () => send(formView))
}

init()