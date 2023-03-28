let menu = document.querySelector('#menu-bars'),
    header = document.querySelector('header');

menu.addEventListener('click', () => {
    menu.classList.toggle('fa-times');
    header.classList.toggle('active');
});

window.addEventListener('scroll', () => {
    menu.classList.remove('fa-times');
    header.classList.remove('active');
});

let cursor1 = document.querySelector('.cursor-1'),
    cursor2 = document.querySelector('.cursor-2');

window.addEventListener('mousemove', (e) => {
    cursor1.style.top = e.pageY + 'px';
    cursor1.style.left = e.pageX + 'px';
    cursor2.style.top = e.pageY + 'px';
    cursor2.style.left = e.pageX + 'px';
});

let links = document.querySelectorAll('a');

links.forEach(link => {

    link.addEventListener('mouseenter', () => {
        cursor1.classList.add('active');
        cursor2.classList.add('active');
    });

    link.addEventListener('mouseleave', () => {
        cursor1.classList.remove('active');
        cursor2.classList.remove('active');
    });
});