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




























}); //конец loaded