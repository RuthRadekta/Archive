//---------Popup function
window.onload = function() {
    // Get the modal
    var modal = document.getElementById("latestUpdateModal");

    // Get the <span> element that closes the modal
    var closeBtn = document.getElementsByClassName("close-btn")[0];

    // Show the modal after 1 second
    setTimeout(function() {
        modal.style.display = "block";
    }, 1000);

    // Close the modal when the user clicks on <span> (x)
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    // Close the modal when the user clicks anywhere outside of the modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}


let pdfDoc = null;

const scale = 1.5;

// Function to render all pages
function renderAllPages() {
    const pdfContainer = document.querySelector('#pdf-container');
    const numPages = pdfDoc.numPages;
    
    for (let i = 1; i <= numPages; i++) {
        pdfDoc.getPage(i).then(page => {
            const viewport = page.getViewport({ scale });
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            pdfContainer.appendChild(canvas);

            const renderCtx = {
                canvasContext: ctx,
                viewport
            };

            page.render(renderCtx).promise.then(() => {
                console.log(`Page ${i} rendered.`);
            }).catch(err => {
                console.error(`Error rendering page ${i}: `, err);
            });
        });
    }
}


//----- Function to render a specific PDF in same tab---
function renderPdf(url) {
    pdfjsLib.getDocument(url).promise.then(pdfDoc_ => {
        pdfDoc = pdfDoc_;
        document.querySelector('#pdf-container').textContent = '';
        renderAllPages();
    });
}

// Update PDF when a chapter link is clicked
document.querySelectorAll('#chapter-list a').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior

        // Remove active class from all chapters
        document.querySelectorAll('#chapter-list .comic').forEach(chapter => {
            chapter.classList.remove('active');
            toggleNavbarButton.textContent = 'Show Chapters';
        });

        // Add active class to the clicked chapter
        link.parentElement.classList.add('active');

        const url = link.getAttribute('href');
        renderPdf(url);

        // Automatically hide navbar when a chapter is clicked
        chapterNavbar.classList.add('hidden');
        chapterList.style.display = 'none';
        toggleNavbarButton.textContent = 'Show Chapters';
    });
});

// Toggle Navbar Function
document.addEventListener('contextmenu', event => event.preventDefault());

const toggleNavbarButton = document.getElementById('toggle-navbar');
const chapterNavbar = document.getElementById('chapter-navbar');
const chapterList = document.getElementById('chapter-list');
const scrollButtons = document.querySelectorAll('.scroll-btn');
const videoIframe = document.getElementById('video-iframe');
const documentIframe = document.getElementById('document-iframe');  // Perhatikan ID ini

toggleNavbarButton.addEventListener('click', () => {
    if (chapterNavbar.classList.contains('hidden')) {
        chapterNavbar.classList.remove('hidden');
        chapterNavbar.classList.remove('transparent');
        chapterList.style.display = 'flex';
        scrollButtons.forEach(button => button.style.display = 'block');
        toggleNavbarButton.textContent = 'Hide Chapters';
        toggleNavbarButton.classList.remove('show-chapters');
        toggleNavbarButton.classList.add('hide-chapters');
    } else {
        chapterNavbar.classList.add('hidden');
        chapterNavbar.classList.add('transparent');
        chapterList.style.display = 'none';
        scrollButtons.forEach(button => button.style.display = 'none');
        toggleNavbarButton.textContent = '☰';
        toggleNavbarButton.classList.remove('hide-chapters');
        toggleNavbarButton.classList.add('show-chapters');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const documentIframe = document.getElementById('document-iframe');

    documentIframe.addEventListener('load', function () {
        this.style.height = this.contentWindow.document.body.scrollHeight + 'px';
    });

    const chapterLinks = document.querySelectorAll('#chapter-list .comic a');
    chapterLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const contentId = link.getAttribute('data-content-id');
            const contentType = link.getAttribute('data-content-type');

            let contentUrl = '';

            if (contentType === 'video') {
                contentUrl = `https://drive.google.com/file/d/${contentId}/preview`;
            } else if (contentType === 'pdf') {
                contentUrl = `https://drive.google.com/file/d/${contentId}/preview?usp=drivesdk`;
            }

            documentIframe.src = contentUrl;

            documentIframe.addEventListener('load', function () {
                this.style.height = this.contentWindow.document.body.scrollHeight + 'px';
            });

            // Hide navbar when a chapter is clicked
            chapterNavbar.classList.add('hidden');
            chapterNavbar.classList.add('transparent');
            chapterList.style.display = 'none';
            scrollButtons.forEach(button => button.style.display = 'none');
            toggleNavbarButton.textContent = '☰';
            toggleNavbarButton.classList.remove('hide-chapters');
            toggleNavbarButton.classList.add('show-chapters');
        });
    });
});


// Scroll buttons functionality
document.getElementById('scroll-left').addEventListener('click', function() {
    document.getElementById('chapter-list').scrollBy({
        left: -200, // Scroll ke kiri 200px
        behavior: 'smooth'
    });
});

document.getElementById('scroll-right').addEventListener('click', function() {
    document.getElementById('chapter-list').scrollBy({
        left: 200, // Scroll ke kanan 200px
        behavior: 'smooth'
    });
});
