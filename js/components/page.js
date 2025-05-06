class Page {
    constructor(content, title, id) {
        this.page = document.querySelector('main');
        this.content = content;
        this.title = title;
        this.id = id;
    }
    render() {
        this.page.innerHTML += `
        <div class="page" id="${this.id}">
            <div class="content">
                <button class="btn" onclick="openPage('menu')">Меню</button>
                <h2>${this.title}</h2>
                ${this.content}
            </div>        
        </div>
        `;
    }
} 