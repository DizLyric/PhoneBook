const $qS = (selector) => document.querySelector(selector)
const $qSAll = (selector) => document.querySelectorAll(selector)
/* ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- */

export const open_modal = $qS('.open_modal') // Кнока "Добавить"
export const add_contact = $qS('.add_contact') // Кнока "Создать"
export const search_input = $qS('.search input') // Поле "Поиск"
export const contacts = $qS('.contacts') // Основной блок для контактов
export const modal = $qS('.modal') // Модальное окно
export const inputs = $qSAll('.form input') // Поля формы
export const tel = $qS('.tel') // Поле "Телефон"