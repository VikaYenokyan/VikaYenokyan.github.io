import { closeModal, openModal } from "./modal";
import { postData } from "../services/services";

function forms(formSelector, modalTimerId) {
    //Forms

    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        succes: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();   //обязательно у XMLHttpRequest должна стоять отмена стандартного поведения
            
            const statusMessage = document.createElement('div');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);
            const formData = new FormData(form);    //создание объекта типа "ключ":"значение" для получения данных с формы
                                                    //таких есть 2 способа: FormData и когда передаем именно JSON
                                                    //атрибут name у input должен быть обязательно
            
            //Сначала получили данные с формы, сделали из них массив, затем объект и затем JSON
            const json = JSON.stringify(Object.fromEntries(formData.entries()));


            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.succes);
                statusMessage.remove(); //убирается надпись через 2 секунды после отправки
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset(); //очищение формы после отправки
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide'); //скрываем это модальное окно
        openModal('.modal', modalTimerId); //открытие модальных окон

        const thanksModal = document.createElement('div'); 
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }


    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));
}

export default forms;