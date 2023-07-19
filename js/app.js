import { contact_item, get_contacts, remove_contact, toggle_fav, validation } from "./modules.js"
import { open_modal, add_contact, search_input, contacts, modal } from "./constants.js"
/* ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- */

search_input.onfocus = search
add_contact.onclick = validation

open_modal.onclick = () => {
    modal.classList.add('modal_active')
}

document.onkeydown = (e) => {
    if (e.key == 'Escape' && modal.classList.contains('modal_active')) {
        modal.classList.remove('modal_active')
    }
}

show_contacts() // Запуск функции отображения контактов

/* Функция для отображения контактов на странице */
export async function show_contacts() {
    const result = await get_contacts() // Получаем данные контактов
    replace_contacts(result)
    search_input.value = ''
    // image_error()
}


function replace_contacts(array) {
    contacts.innerHTML = '' // Очищаем основной блок для контактов
    array.forEach(element => {
        contacts.innerHTML += contact_item(element) // Добавляем блок контакта в основной блок
    });
}


async function search() {
    let result = await get_contacts()
    search_input.oninput = () => {
        let text = search_input.value.toLowerCase()
        let filtered = result.filter(el => el['name'].toLowerCase().includes(text) || el['number'].toLowerCase().includes(text))
        replace_contacts(filtered)
    }
}


contacts.onclick = (e) => { // Вешаем функции удаления и добавления в избранное на соотв. кнопки
    if (e.target.classList.contains('rem')) {
        const id = e.target.parentElement.dataset.id
        if (confirm('Удалить контакт?')) { remove_contact(id) }
        setTimeout(show_contacts, 10)
    }
    if (e.target.classList.contains('toFav')) {
        const id = e.target.parentElement.dataset.id
        const fav = e.target.classList.contains('fav') ? 0 : 1
        if (!toggle_fav(id, fav)) { alert('Error!') }
        setTimeout(show_contacts, 10)
    }

}