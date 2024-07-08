

let menuButton=document.querySelector('.navbar-mobile-button');
menuButton.addEventListener('click',toggle_navBar);
let navBar=document.querySelector('.navbar-mobile');
let line1=document.querySelector('.line-1');
let line2=document.querySelector('.line-2');
let line3=document.querySelector('.line-3');
let body=document.querySelector('body');

function toggle_navBar(){
    navBar.classList.toggle('open-navbar');
    line1.classList.toggle('open-line1');
    line2.classList.toggle('open-line2');
    line3.classList.toggle('open-line3');
}

let header=document.querySelector('header');

let lastScrollTop=0;
window.addEventListener("scroll",function(){
    let scrollTop=window.pageYOffset || document.documentElement.scrollTop;
    if(scrollTop>lastScrollTop){
        header.style.top="-70px";
    }else{
        header.style.top="0";
    }
    lastScrollTop=scrollTop;
})


let dropdown=document.querySelector('.select');
dropdown.addEventListener('click',toggle_dropdown_mobile);
let dropdownBox=document.querySelector('.dropdown-mobile');
let dropdownBoxLengs=document.querySelector('.languages-menu');

function toggle_dropdown_mobile(){
    dropdownBox.classList.toggle('show-box-dropdown');
    dropdownBoxLengs.classList.toggle('open-language-menu');
    dropdown.classList.toggle('select-outline-off');
}


let closeInfoButton=document.querySelector('.close-popup-button').addEventListener('click',toggleInfoPopup);
let popUpInfo=document.querySelector('.popup-products-container');

function toggleInfoPopup(){
    popUpInfo.classList.toggle('showPopup');
}

let copyEmail=document.querySelector('.copy-box-email').addEventListener('click',function(){
    copyText('email')
});
let copyPhone=document.querySelector('.copy-box-phone').addEventListener('click',function(){
    copyText('phone')
});

function copyText(pref){
    if(pref==='email'){
        navigator.clipboard.writeText('portonovobarano@gmail.com');
        let copyIcon=document.querySelector('.copy-icon-email');
        let copyValidIcon=document.querySelector('.copy-valid-icon-email');
        copyIcon.classList.add('hide-copy-icon-email');
        copyValidIcon.classList.add('show-copy-valid-icon-email')
        setTimeout(function() {
            copyIcon.classList.remove('hide-copy-icon-email')
            copyValidIcon.classList.remove('show-copy-valid-icon-email')
        }, 2000);
    }
    if(pref==='phone'){
        navigator.clipboard.writeText('+54 9 2235165256');
        let copyIcon=document.querySelector('.copy-icon-phone');
        let copyValidIcon=document.querySelector('.copy-valid-icon-phone');
        copyIcon.classList.add('hide-copy-icon-phone');
        copyValidIcon.classList.add('show-copy-valid-icon-phone')
        setTimeout(function() {
            copyIcon.classList.remove('hide-copy-icon-phone')
            copyValidIcon.classList.remove('show-copy-valid-icon-phone')
        }, 2000);
    }
}


document.querySelectorAll('.navbar-mobile-box a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      let target = this.getAttribute('data-scroll');
      let targetElement = document.getElementById(target);

      if (targetElement) {
        toggle_navBar()
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });


let inputName = document.querySelector("#input-name");
let inputEmail = document.querySelector("#input-email");
let inputMessage = document.querySelector("#message");
let buttonForm = document.querySelector(".send-form-button");



buttonForm.addEventListener('click', function(event) {
    event.preventDefault();
    if (validate_input()) {
        const formData = new FormData();
        formData.append('input-name', inputName.value.trim());
        formData.append('input-email', inputEmail.value.trim());
        formData.append('input-message', inputMessage.value.trim());

        let popupForm = document.querySelector('.popup-form-container');
        popupForm.classList.add('show-popup-form-container');
        let boxIconForm = document.querySelector('.popup-form-icons');
        let alertMessage = document.querySelector('.form-alert-message');

        const languagesAlerts = {
            'es': {
                'verifying': 'Verificando formulario...',
                'send': '¡Enviado!',
                'verifyFields': '¡Verifique los campos!'
            },
            'en': {
                'verifying': 'Verifying form...',
                'send': 'Sent!',
                'verifyFields': 'Check the fields!'
            },
            'pt': {
                'verifying': 'Verificando formulário...',
                'send': 'Enviado!',
                'verifyFields': 'Verifique os campos!'
            }
        };
        let actualLanguage=getCurrentLanguage(languagesAlerts);

        alertMessage.textContent = actualLanguage['verifying'];

        fetch('verifyForm', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            return response.text();
        })
        .then(data => {

            if (data != 'false') { 
                boxIconForm.classList.add('success-form');
                alertMessage.textContent = actualLanguage['send'];
            } else {
                boxIconForm.classList.add('failure-form');
                alertMessage.textContent = actualLanguage['verifyFields'];
            }

            setTimeout(function() {
                popupForm.classList.remove('show-popup-form-container');
                setTimeout(function() {
                    boxIconForm.classList.remove('success-form', 'failure-form');
                }, 700);
            }, 3000);
        })
    }
});

function getCurrentLanguage(languageJson){
    if((window.location.pathname).slice(-2) != 'es' && (window.location.pathname).slice(-2) != 'en' && (window.location.pathname).slice(-2) != 'pt'){
        return languageJson['es'];
    }
    return languageJson[(window.location.pathname).slice(-2)]
}

function transaleLanguageAlerts(jsonLanguages){
    if((window.location.pathname).slice(-2)=='en'){
        return jsonLanguages['verifying']
    }
}





function validate_input(){
    const inputNameValue = inputName.value.trim();
    const inputEmailValue = inputEmail.value.trim();
    const inputMessageValue = inputMessage.value.trim();
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let name=true,email=true,message=true;
    if(inputNameValue === ''){
        inputName.classList.add('error-input');
        name=false;
    } else {
        inputName.classList.remove('error-input');
    }

    if(inputEmailValue === '' || !re.test(inputEmailValue)){
        inputEmail.classList.add('error-input');
        email=false;
    } else {
        inputEmail.classList.remove('error-input');
    }

    if(inputMessageValue === ''){
        inputMessage.classList.add('error-input');
        message=false;
    } else {
        inputMessage.classList.remove('error-input');
    }
    return (name && email && message);
}