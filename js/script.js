window.addEventListener('DOMContentLoaded', ()=> {
  
const tabs = document.querySelectorAll('.tabheader__item');
const tabsContent = document.querySelectorAll('.tabcontent');
const tabsParent = document.querySelector('.tabheader__items');

//функция скрытия табов  и класса выделения текста
function hideTabContent() {
  tabsContent.forEach(item => { 
    item.style.display = 'none'; 
   });
   tabs.forEach(item => { 
     item.classList.remove('tabheader__item_active'); 
    });
 }
hideTabContent();

// ф. показа табов
function showTabContent(i=0) { 
  tabsContent[i].style.display = 'block';
  tabs[i].classList.add('tabheader__item_active');
}
showTabContent(); // показали первый таб при загрузке страницы

// создаем обработчик для показа нужного Таба
tabsParent.addEventListener('click', (e)=> {
  //для e.target создаем переменную
  const target = e.target;
  if(target.classList.contains('tabheader__item')) {
    tabs.forEach((item, i) => { 
     
      if(target == item) {
        hideTabContent();
        showTabContent(i);
      }
     });
}
});
// мой вариант обработчика клика - проще
// tabs.forEach((item, i) => { 
//   item.addEventListener('click', ()=> { 
//     hideTabContent();
//     showTabContent(i);
//   }); 
//  });


// Таймер обратного отсчета времени Акции

// создаем дату конца акции
let deadLine = '2022-07-17T00:00:00+0300'; // так добавляет к текущему времени 3 часа


// Функ. которая будет определять разницу между deadline и текущим временем временем
function getTimerRemaining (endtime) { 
  let t = Date.parse(endtime) - Date.parse(new Date()); // получаем разницу в милисекундах между концом и текущим
  // console.log(t);
 
  // Теперь нам надо получить из милисекунд дни, часы, мин и сек.
  let days = Math.floor( t / (24*3600*1000)); //  у Кантора см. расчет мой
  // console.log(days); // 10
  let hours = Math.floor( t / ( 60 * 60 * 1000) % 24)  ;
  // console.log(hours);
  let minutes = Math.floor(t / (60 * 1000) % 60);
  // let minutes2 = Math.floor((t / 60 / 1000) % 60); // или так
// console.log(minutes);
 let seconds = Math.floor(t / (1000) % 60);
  // console.log(seconds);

  //выводим данные наружу в виде объекта 
  return {
'total': t,
'days': days,
'hours': hours,
'minutes': minutes,
'seconds': seconds,

  };
}
//функция добавления нулей перед числами до 10
function getZero(num) { 
  if(num > 0 && num <10) {
    return `0${num}`;

  } else {
    return num;
  } 
 
}

//Создаем ф. которая устанавливает таймер на страницу
function setClock(selector, endtime) { 
  //передаем класс timer в виде переменной
  const timer = document.querySelector(selector);
  //теперь уже находим идентификаторы внутри класса timer
  const days = timer.querySelector('#days');
  const hours = timer.querySelector('#hours');
  const minutes = timer.querySelector('#minutes');
  const seconds = timer.querySelector('#seconds');
  let timeInterval = setInterval(updateClock, 1000);

  //внутри ф. создаем ф. которая будет обновлять данные часов
  function updateClock() { 
    // получаем объект из  
   let t = getTimerRemaining(endtime);

   days.innerHTML = getZero(t.days);
   hours.innerHTML = getZero(t.hours);
   minutes.innerHTML = getZero(t.minutes);
   seconds.innerHTML = getZero(t.seconds);
   //следим когда время выйдет
   if (t.total <= 0) {
     clearInterval(timeInterval);
   }

   
  }

}
setClock('.timer', deadLine ); // deadline далее в параметрах как endtime везде


// ++++ Модальные окна ++++++++++++++++++++++++++++++
const modal = document.querySelector('.modal');
const btnOpenModal = document.querySelectorAll('[data-modal]');
const btnCloseModal = document.querySelector('[data-close]');

// Суть - автопоказ по скролу и по таймеру всего один раз при загрузке страницы. Если до этого автопоказа юзер сам вызвал модалку то автопоказ убирается навсегда. И потом юзер может только вручную вызывать модалку
//ф. открытиф модалки
function openModal() { 
  let offset =  window.outerWidth - window.innerWidth; // 16 px
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = offset + 'px';
  // убираем автопоказ если юзер сам кликнул и очищаем показ с задержкой и по скролу
  window.removeEventListener('scroll', showModalByScroll);
  // clearTimeout(showModalDelay);
}

// ф. закрытия модалки
function closeModal() { 
  modal.style.display = 'none';
     document.body.style.overflow = '';
     document.body.style.paddingRight = 0 + 'px';
   
     }

btnOpenModal.forEach(item => { 
  item.addEventListener('click', openModal);
  // или так
  // item.addEventListener('click', ()=> {
  //   openModal();
  // }); 
    // также если юзер сам кликнет по модалке то убираем ее показ с задержкой или промоткой до низа
    window.removeEventListener('scroll', showModalByScroll);
   
 });

 // закрываем с помощью делегирования + event target
//  modal.addEventListener('click', (e)=> { 
//    if(e.target == btnCloseModal|| e.target == modal ) {
//     modal.style.display = 'none';
//     document.body.style.overflow = '';
//     document.body.style.paddingRight = 0 + 'px';
//    }
  
//  });
 // закрываем по Esc
//  window.addEventListener('keydown', (e)=> { 
//    if (e.code === 'Escape') {
//     modal.style.display = 'none';
//     document.body.style.overflow = '';
//     document.body.style.paddingRight = 0 + 'px';
//    }
   
//  });
// Объединяем два события в одном слушателе
 ['click', 'keydown'].forEach(function(item) {
   //именно document или window иначе по клавише не сработает
  document.addEventListener(item, (e)=> { 
    // делаем ссработку клавиши Esc только когда открыто окно 
    if (e.target == btnCloseModal|| e.target == modal || (e.code == 'Escape'&& modal.style.display !== 'none')) {
      closeModal();
    }
 });
 
 });

  // Появление модалки при скроле до низа ( минус 300px) или после 10 секунд с начала входа на сайт
  // Для этого создадим функциии открытия модалки и закрытия
  // let showModalDelay = setTimeout( openModal, 5000);

// ф. показа при скроле вниз
function showModalByScroll() { 
  let scrollHeight = document.body.scrollHeight; // вся высота body
    let scrollTop = document.documentElement.scrollTop; // прокрутка
    let clientHeight = document.documentElement.clientHeight; // высота окна body
    if(scrollHeight <= (scrollTop + clientHeight) + 100 ) {
      console.log(222);
      clearTimeout(showModalDelay);
      openModal();
}
}

  window.addEventListener('scroll', showModalByScroll);

// console.log(document.body.scrollHeight);
// console.log(document.documentElement.scrollTop);
// console.log(window.pageYOffset);

// console.log(document.documentElement.clientHeight);

// Классы для карточек урок 48
// Что нужно для карточки - путь к фото, алт.текст для фото, заголовок, описание, цена в долларах
// Создаем те свойства которые будут меняться с сервера. Размеры будут те же. Класс будет создавать только верстку
class MenuCard {
  constructor(src, alt, title, descr, price, parentSelector, ...classes) {
    this.src = src;
    this.alt = alt;
    this.title = title;
    this.descr = descr;
    this.price = price;
    this.classes = classes;
    this.parent = document.querySelector(parentSelector);
    this.transfer = 27; // пример курса рубля
    this.changeToRouble(); // вызываем метод прямо в констр.
  }
  changeToRouble() { // метод перевода из дол. в рубли
this.price = this.price * this.transfer;
  }
  render() { // создает верстку в виде элементов
    const element = document.createElement('div');
    // если доп. классы не передадутся мы сами их добавим
    if(this.classes.length ==0) {element.classList.add('menu__item');} 
   
   
    // добавляем класс селектор через оператор rest ( classes) - их может быть несколько  - поэтому через цикл
    this.classes.forEach(itemClass => { 
      element.classList.add(itemClass); 
     });
    // внутрь пустого div вставляем образец верстки из HTML
    element.innerHTML = `
  
    <img src=${this.src} alt=${this.alt}>
    <h3 class="menu__item-subtitle">${this.title}</h3>
    <div class="menu__item-descr">${this.descr}</div>
    <div class="menu__item-divider"></div>
    <div class="menu__item-price">
        <div class="menu__item-cost">Цена:</div>
        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
    </div>

    `;
    this.parent.append(element); // вставляем элемент внутрь родителя в конец

  }
}

// Шаблон класса готов - создаем новые объекты
// 1 вариант
let div = new MenuCard( // передаем аргументы через запятую
"img/tabs/vegy.jpg",
"vegy",
'Меню "Фитнес"',
'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
12,
'.menu .container',


);
div.render();
// console.log(div);
// Создаем еще два объекта и добавляем в верстку
// 2 вар вызова более короткий
new MenuCard(
  "img/tabs/elite.jpg",
"йоги",
'Меню "Йога"',
'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
7,
'.menu .container',

).render();

new MenuCard(
  "img/tabs/post.jpg",
"йоги",
'Меню "Антон"',
'Йееей! В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
17,
'.menu .container',
'menu__item'
).render();

// Отправка Форм обратной связи через AJAX на локальный файл server.php

// Находим все формы по тегу form 3шт
const forms = document.querySelectorAll('form');
//кнопку в переменную не нужно т.к. form отправляет автоматом если кнликнуть по тегу button
// создаем объект с списками фраз уведомлениями для юзера
const message =  {
  loading: 'Идет Загрузка', //до отправки запроса
  success: 'Спасиоб! Скоро мы с Вами свяжемся',
  failed: 'Что то пошло не так...'
};

//привязываем поля ввода к formData
forms.forEach(item => { 
  postData(item);  //вызываем функцию
 });

function postData(form) {
  form.addEventListener('submit', (e)=> {
    e.preventDefault();  //отменяем перезагрузку

    // создаем новый блок для уведомления юзера до момента ( и в процессе) отправки
  let statusMessage = document.createElement('div');
  statusMessage.classList.add('status'); // добавим оформление
  statusMessage.textContent = message.loading;
  form.append(statusMessage); // добавили текст к форме

    // Создаем метод отправки
    const request = new XMLHttpRequest();
    request.open('POST', 'server.php'); // метод и путь
// настраиваем заголовки НО они  не нужны см. ниже.
// request.setRequestHeader('Content-type', 'application/json'); // не нужен для FormData
const formData = new FormData(form);

// для перевода в JSON создаем пустой объект, перебирем formData  с циклом forEach
const object = {};
formData.forEach(function(value, key) { 
  object[key] = value;
 });


 // создаем доп. переменную
//  const json = JSON.stringify(object); // перевели object  в JSON и теперь нужно  его поместить в  request.send(json)

    // получаем данные из полей. Можно долгое решение - через сбор value из всех input. НО быстрее через встроен. объект formData

   
//  request.send(json);
request.send(formData);
 //отслеживаем загрузку 
 request.addEventListener('load', ()=> { 
   if(request.status == 200) {
     console.log(request.response);
   //уведомляем юзера об успешной отправке его message
     statusMessage.textContent = message.success;
     // После отправки формы очищаем поля и убираем надпись уведомление
     form.reset();
     setTimeout(() => {
      statusMessage.textContent = '';
      //или statusMessage.remove();

      }, 2000);

   } else { // если не отправилось
    statusMessage.textContent = message.failed;
   }
 
});
   // Тестируем формы на сервере и получаем пока что пустые массивы. Важно! Когда мы работаем в связке XMLHTTPRequest  -FormData - нам НЕ нужны заголовки. Они установятся автоматически
   // В браузере Nerwork - находим файл server.php  - Headers  и смотрим процесс передачи 16-18
   //  При отправке форм получаем такие данные  console.log(request.response);
  //  array(2) {
  //   ["name"]=>
  //   string(6) "цыц"
  //   ["phone"]=>
  //   string(4) "3434"
  // }
  // Увидеть эти данные можно в Network - server.php - Payload или Preview, Response

  // Если в формате Json передаем то ответ  console.log(request.response);
  // console.log(json); //{"name":"axa","phone":"3434"}
 


  });
  
}











}); //конец loaded