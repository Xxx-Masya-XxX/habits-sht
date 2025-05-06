
function openPage(page_id) {
    let pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.style.display = 'none';
    });
    const page = document.getElementById(page_id);
    page.style.display = 'block';
    
}





