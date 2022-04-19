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
let deadLine = '2022-05-17T00:00:00+0300'; // так добавляет к текущему времени 3 часа


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


// модальные окна
const modal = document.querySelector('.modal');
const btnOpenModal = document.querySelectorAll('[data-modal]');
const btnCloseModal = document.querySelector('[data-close]');


//ф. открытиф модалки
function openModal() { 
  let offset =  window.outerWidth - window.innerWidth; // 16 px
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = offset + 'px';
  // убираем показ если юзер сам кликнул и очищаем показ с задержкой
  window.removeEventListener('scroll', showModalByScroll);
  clearTimeout(showModalDelay);

   
}

// ф. закрытия модалки
function closeModal() { 
  modal.style.display = 'none';
     document.body.style.overflow = '';
     document.body.style.paddingRight = 0 + 'px';
     console.log(555);
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
  let showModalDelay = setTimeout( openModal, 5000);

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

console.log(document.body.scrollHeight);
console.log(document.documentElement.scrollTop);
console.log(window.pageYOffset);

console.log(document.documentElement.clientHeight);





















}); //конец loaded