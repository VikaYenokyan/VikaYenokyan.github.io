window.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.story_tabs-item'),
          tabsContent = document.querySelectorAll('.story_descr'),
          tabsParent = document.querySelector('.story_tabs');

    function hiddenTabContent() {                        //функция скрытия контента
        tabsContent.forEach( item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach( item => {
            item.classList.remove('story_tabs-item_active');
        });
    }

    function showTabContent(i) {                        //функция показа контента
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('story_tabs-item_active');
    }

    hiddenTabContent();
    showTabContent(0);

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('story_tabs-item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hiddenTabContent();
                    showTabContent(i);
                }
            });
        }
    });
});