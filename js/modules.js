import { show_contacts } from "./app.js"
import { inputs, tel, modal } from "./constants.js"

/* Функция для получения данных из базы */
export async function get_contacts() {
    const response = await fetch('./php/get_contacts.php')
    return await response.json()
}

/* Функция для получения блока контакта с данными */
export function contact_item(element) {
    return `
        <div class="contact_item">
            <img src="./images/contact.png">
            <div class="info">
                <h2>${element.name}</h2>
                <h4>${element.number}</h4>
            </div>

            <div class="nav" data-id="${element.id}">
                <p class="rem">&#10006;</p>
                <p class="toFav${element.favorite == 1 ? ' fav' : ''}">&#10084;</p>
            </div>
        </div>
    `
}

/* Функция удаления контакта */
export async function remove_contact(id){
    const data = new FormData()
    data.set('id', id)

    const response = await fetch('./php/remove_contact.php', {method: 'POST', body: data})
    return response.ok
}

/* Функция добавления котакта в избранное */
export async function toggle_fav(id, fav){
    const data = new FormData()
    data.set('id', id); data.set('fav', fav)

    const response = await fetch('./php/toggle_favorite.php', {method: 'POST', body: data})
    return response.ok
}

export async function add_contact(){
    const data = new FormData()
    data.set('name', inputs[0].value)
    data.set('number', inputs[1].value)
    data.set('fav', inputs[2].checked ? 1 : 0)

    const response = await fetch('./php/add_contact.php', {method: 'POST', body: data})
    return response.ok
}

export function validation(){
    const regExp = /\+\d\(\d{3}\)\d{3}-\d{2}-\d{2}/ // маска номера телефона

    if (inputs[0].value.trim() == '' || !inputs[1].value.match(regExp)){ // Проверка полей на пустоту и на маску
       return alert('Заполните пустые поля!')
    }

    if(add_contact()){
        alert('Контакт добавлен!')
        show_contacts()
        modal.classList.remove('modal_active')
        inputs[0].value = ''
        inputs[1].value = '+7(___)___-__-__'
        inputs[2].checked = false
    }
}

tel.onkeydown = mask

function mask(e){
    e.preventDefault()
    
    if(e.key.match(/\d/)){
        tel.value = tel.value.replace(/_/, e.key)
    }
    if(e.key == 'Backspace'){
        tel.value = tel.value.replace(/\d(?=\D*$)/, '_')
    }
}