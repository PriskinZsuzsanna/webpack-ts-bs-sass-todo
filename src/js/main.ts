// Import our custom CSS
import { v4 as uuidv4 } from 'uuid';
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

type Todo = {
    text: string,
    completed: boolean
    id: string
}

let todos: Todo[] = load()

const form = document.querySelector('form') as HTMLFormElement
const textInput = document.querySelector('#text-input') as HTMLInputElement
const list = document.querySelector('ul') as HTMLUListElement

form.addEventListener('submit', (e) => {
    e.preventDefault()

    let todoText = textInput.value.trim()

    if (!todoText.length) return

    const newTodo: Todo = {
        text: todoText,
        completed: false,
        id: uuidv4()
    }

    todos.push(newTodo)
    textInput.value = ''
    save()
    clear()
    render()

})

function save():void {
    localStorage.setItem('tsTodos', JSON.stringify(todos))
}

function load(): Todo[]{
    return JSON.parse(localStorage.getItem('tsTodos') || '[]')
}

function clear():void{
    list.innerHTML = ''
}

function render():void {
    todos.forEach(item => {
        const li = document.createElement('li')
        li.classList.add('d-flex', 'align-items-center', 'gap-2', 'my-2', 'p-2', 'rounded-2');

        const check = document.createElement('input')
        check.type = 'checkbox'
        check.checked = item.completed
        li.appendChild(check);

        const label = document.createElement('label')
        label.innerText = item.text
        label.classList.add('w-100')
        li.appendChild(label);

        const del = document.createElement('button')
        del.innerText = 'X'
        del.classList.add('btn', 'btn-sm', 'btn-primary')
        del.setAttribute('id', item.id)
        li.appendChild(del);

        list.appendChild(li);

        check.addEventListener('change', () => {
            item.completed = !item.completed;
            save()
        })

        del.addEventListener('click', (e:Event) => {
            const {target} = e
            todos = todos.filter(item => item.id != (target as HTMLButtonElement).id)
            save()
            clear()
            render()
        })
    })
}

render()

