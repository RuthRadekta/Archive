const comics = [
    { title: 'Tatoeba [Kuroken]', description: 'Type: Manga', pdfUrl: 'https://drive.google.com/file/d/1LtA2twG5SryJAVinCK2Kg2D2E6htxbNH/view?usp=sharing'},
    { title: 'Natsu no Hinemotsu [Kuroken]', description: 'Type: Manga', pdfUrl: 'https://drive.google.com/file/d/1VZdhKy9_qqQ2lMcIVuRjblIjLK-_n1kJ/view?usp=sharing'},
    // Tambahkan data komik lainnya
];

const comicForm = document.getElementById("comic-form");

comicForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const pdfFileInput = document.getElementById('pdfFile');

    const newComic = {
        title: titleInput.value,
        description: descriptionInput.value,
        pdfUrl: URL.createObjectURL(pdfFileInput.files[0])
    };

    comics.push(newComic);
    renderComics();

    // Reset formulir setelah mengumpulkan data
    titleInput.value = '';
    descriptionInput.value = '';
    pdfFileInput.value = ''; // Reset input file
});


function renderComics() {
    const comicList = document.querySelector('.comic-list');
    comicList.innerHTML = '';

    comics.forEach(comic => {
        const comicElement = document.createElement('div');
        comicElement.classList.add('comic');
        comicElement.innerHTML = `
            <h2>${comic.title}</h2>
            <p>${comic.description}</p>
            <a href="${comic.pdfUrl}" target="_blank">Open</a>
        `;
        comicList.appendChild(comicElement);
    });
}


renderComics();
