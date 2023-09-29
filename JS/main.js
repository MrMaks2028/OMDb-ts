var AppEl = document.querySelector('#app');
var API_KEY = '486c76d3';
var Film = /** @class */ (function () {
    function Film(_a) {
        var imdbID = _a.imdbID, Poster = _a.Poster, Title = _a.Title, Type = _a.Type, Year = _a.Year;
        this.id = imdbID;
        this.poster = Poster;
        this.title = Title;
        this.type = Type;
        this.year = Year;
    }
    Film.prototype.getHtml = function () {
        return "<div> class=\"film\">\n            <img src=".concat(this.poster, " />\n            <h3>").concat(this.title, " (").concat(this.year, " \u0433.)</h3>\n            <p>").concat(this.type, "</p>\n        </div>");
    };
    return Film;
}());
function createForm() {
    AppEl === null || AppEl === void 0 ? void 0 : AppEl.insertAdjacentHTML('afterbegin', "\n        <div class=\"form\">\n            <input type=\"text\" id=\"search\" />\n            <select id=\"type\">\n                <option value=\"movie\">\u0424\u0438\u043B\u044C\u043C</option>\n                <option value=\"series\">\u0421\u0435\u0440\u0438\u0430\u043B</option>\n                <option value=\"episode\">\u042D\u043F\u0438\u0437\u043E\u0434</option>\n            </select>\n            <button id=\"button\">\u041D\u0430\u0439\u0442\u0438</button>\n        </div>\n    ");
    return {
        search: AppEl === null || AppEl === void 0 ? void 0 : AppEl.querySelector('#search'),
        type: AppEl === null || AppEl === void 0 ? void 0 : AppEl.querySelector('#type'),
        button: AppEl === null || AppEl === void 0 ? void 0 : AppEl.querySelector('#button')
    };
}
function drawRsult(filmList) {
    var resultEl = document.querySelector('#result');
    if (resultEl) {
        resultEl.textContent = '';
        filmList.forEach(function (film) {
            resultEl.insertAdjacentHTML('afterbegin', film.getHtml());
        });
    }
}
function send(view) {
    fetch("http://www.omdbapi.com/?apikey=".concat(API_KEY, "&s=").concat(view.search.value, "&type=").concat(view.type.value))
        .then(function (response) { return response.json(); })
        .then(function (data) { return drawRsult(data.Search.map(function (filmData) { return new Film(filmData); })); });
}
function init() {
    var formView = createForm();
    formView.button.addEventListener('click', function () { return send(formView); });
}
init();
