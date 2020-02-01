/*
Закрепление пройденого воспроизвести все элементы страницы
 */

window.addEventListener('DOMContentLoaded', function(){

    //TABS

    let info = document.querySelector('.info-header'),
        tabs = document.querySelectorAll('.info-header-tab'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    hideTabs(1);

    function hideTabs(elem){
        for(let i = elem; i < tabContent.length; i++){
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    function showTab(elem){
        if(tabContent[elem].classList.contains('hide')){
            tabContent[elem].classList.remove('hide');
            tabContent[elem].classList.add('show');
        }
    }

    info.addEventListener('click', function(event){
        let target = event.target;
        if(target && target.classList.contains('info-header-tab')){
            for(let i = 0; i < tabs.length; i++){
                if(target === tabs[i]){
                    hideTabs(0);
                    showTab(i);
                    break;
                }
            }
        }
    });

    //END TABS


    //TIMER

    let dedline = '2020-08-20 17:51:00';

    function getTimeRemaing(endtime){
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor(t/1000)%60,
            minutes = Math.floor(t/1000/60)%60,
            hours = Math.floor(t/(1000*60*60));

        return {
            'counter': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function setTime(id, endtime){
        let time = document.getElementById(id),
            hours = time.querySelector('.hours'),
            minutes = time.querySelector('.minutes'),
            seconds = time.querySelector('.seconds');

        window.timer = setInterval(updateTime, 1000);

        function updateTime(){
            let t = getTimeRemaing(endtime);
            hours.textContent = getDigit(t.hours);
            minutes.textContent = getDigit(t.minutes);
            seconds.textContent = getDigit(t.seconds);
            if(t.counter <= 0){
                window.clearInterval(timer);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }

    }

    function getDigit(num){
        if(num <= 0 || num <= 9){
            return '0' + num;
        }else{
            return num;
        }
    }


    setTime('timer', dedline);
    //END TIMER


    //POPUP

    let more = document.querySelector('.more'),
        modal = document.querySelector('.overlay'),
        modalClose = document.querySelector('.popup-close');

    more.addEventListener('click', function(){
       modal.style.display = 'block';
       document.body.style.overflow = 'hidden';
    });

    modalClose.addEventListener('click', function(){
       modal.style.display = 'none';
       document.body.style.overflow = '';
    });

    window.addEventListener('click', function(event){
        if(event.target == modal){
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    //END POPUP


    //SEND PHONE POPUP

    let phoneForm = document.forms.phoneForm,
        phone = phoneForm.elements.phone,
        messageBox = document.createElement('div');

        messageBox.classList.add('stats');

    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        error: 'Что-то пошло не так'
    };

    phoneForm.addEventListener('submit', function(event){
        event.preventDefault();

        phoneForm.appendChild(messageBox);

        let request = new XMLHttpRequest();
        request.open('POST', '/phones');
        request.setRequestHeader('Content-type', 'application/json; charset = utf-8');


        let data = {
            phone: phone.value
        };

        request.send(JSON.stringify(data));

        request.addEventListener('readystatechange', function(){
            if(request.readyState < 4 ){
                messageBox.textContent = message.loading;
            }else if(request.readyState === 4 && request.status === 200){
                messageBox.textContent = message.success;
            }else{
                messageBox.textContent = message.error;
            }
        });

        phone.value = '';

    });

    //END SEND PHONE POPUP


    //SEND CONTACT FORM

    let contactForm = document.forms.contactForm,
        emailContact = contactForm.elements.email,
        phoneContact = contactForm.elements.phone,
        contactStatus = document.createElement('div');
        contactStatus.classList.add('status');

    contactForm.addEventListener('submit', function(event){
        event.preventDefault();
        contactForm.appendChild(contactStatus);

        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/contacts');
        xhr.setRequestHeader('Content-type', 'application/json; charset = utf-8');

        let data = {
            email: emailContact.value,
            contacts: phoneContact.value
        };

        xhr.send(JSON.stringify(data));

        xhr.addEventListener('readystatechange', function(){
           if(xhr.readyState < 4){
               contactStatus.textContent = message.loading;
           } else if(xhr.readyState === 4 && xhr.status === 200){
               contactStatus.textContent = message.success;
           }else{
               contactStatus.textContent = message.error;
           }

           for(let i = 0; i < contactForm.elements.length; i++){
               contactForm.elements[i].value = '';
           }
        });
    });

    //END SEND CONTACT FORM

    //SLIDER

    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next');

    showSlides(slideIndex);
    function showSlides(n){

        if(n > slides.length){
            slideIndex = 1;
        }

        if(n < 1){
            slideIndex = slides.length;
        }


        //Скрываем элементы

        slides.forEach(function(item){
            item.style.display = 'none';
        });

        dots.forEach(function(item){
           item.classList.remove('dot-active');
        });

        slides[slideIndex-1].style.display = 'block';
        dots[slideIndex-1].classList.add('dot-active');

    }


    function slidePlus(n){
        showSlides(slideIndex += n);
    }

    //текущий слайд
    function currentSlide(n){
       showSlides(slideIndex = n);
    }


    prev.addEventListener('click', function(){
        slidePlus(-1);
    });

    next.addEventListener('click', function(){
        slidePlus(1);
    });

    dotsWrap.addEventListener('click', function(event){
       for(let i = 0; i < dots.length+1; i++){
           if(event.target == dots[i-1] && event.target.classList.contains('dot')){
               currentSlide(i);
           }
       }
    });
    //END SLIDER


    //CALC

    let persons = document.querySelectorAll('.counter-block-input')[0],
        days = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;

    totalValue.textContent = 0;

    persons.addEventListener('change', function(){
        personsSum = Number(this.value);
        total = (daysSum + personsSum)*4000;
       if(days.value == ''){
           totalValue.textContent = 0;
       } else{
           totalValue.textContent = total;
       }
    });

    days.addEventListener('change', function(){
       daysSum = Number(this.value);
       total = (daysSum + personsSum)*4000;

       if(persons.value == ''){
           totalValue.textContent = 0;
       }else{
           totalValue.textContent = total;
       }


       place.addEventListener('change', function(){
           if(persons.value == '' || days.value == ''){
               totalValue.textContent = 0;
           }else{
               let a = total;
               totalValue.textContent = a * this.options[this.selectedIndex].value;
           }
        });
    });


    //END CALC
});
