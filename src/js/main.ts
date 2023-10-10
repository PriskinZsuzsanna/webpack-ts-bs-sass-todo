// Import our custom CSS
import { v4 as uuidv4 } from 'uuid';
import '../scss/styles.scss'
import Todo from './todomodel';

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'


let todos: Todo[] = load()
let filtered: Todo[] = todos

const form = document.querySelector('form') as HTMLFormElement
const textInput = document.querySelector('#text-input') as HTMLInputElement
const list = document.querySelector('ul') as HTMLUListElement
const filterBtns = document.querySelectorAll('.filter-btn') as NodeList
const filters = document.querySelector('.filters') as HTMLDivElement

window.addEventListener('load', render)

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

filters.addEventListener('click', (e:Event) => {
    const { target } = e;
    const dataId = (target as HTMLButtonElement).dataset.id
    filter(dataId)
    clear()
    render()
})

function save(): void {
    localStorage.setItem('tsTodos', JSON.stringify(todos))
}

function load(): Todo[] {
    return JSON.parse(localStorage.getItem('tsTodos') || '[]')
}

function clear(): void {
    list.innerHTML = ''
}

function filter(state: string | undefined): Todo[] {
    filtered = todos
    filterBtns.forEach(btn => (btn as HTMLButtonElement).classList.remove('active'))
    if (state == 'active') {
        filtered = filtered.filter(item => item.completed == false)
        document.querySelector('#active')?.classList.add('active')
    } else if (state == 'finished') {
        filtered = filtered.filter(item => item.completed == true)
        document.querySelector('#finished')?.classList.add('active')
    } else if (state == 'all') {
        filtered = todos
        document.querySelector('#all')?.classList.add('active')
    }
    return filtered
}

function render(): void {
    filtered.forEach(item => {
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

        const input = document.createElement('input')
        input.value = item.text
        input.classList.add('w-100')
        input.classList.add('d-none')
        input.setAttribute('id', item.id)
        li.appendChild(input);

        const edit = document.createElement('button')
        edit.classList.add('btn', 'btn-sm', 'btn-primary')
        edit.setAttribute('id', item.id)
        li.appendChild(edit);
        const iedit = document.createElement('iedit')
        iedit.classList.add('bi', 'bi-pencil')
        edit.appendChild(iedit)

        const saveBtn = document.createElement('button')
        saveBtn.classList.add('btn', 'btn-sm', 'btn-primary')
        saveBtn.setAttribute('id', item.id)
        saveBtn.classList.add('d-none')
        li.appendChild(saveBtn);
        const isave = document.createElement('isave')
        isave.classList.add('bi', 'bi-save')
        saveBtn.appendChild(isave)

        const del = document.createElement('button')
        del.classList.add('btn', 'btn-sm', 'btn-primary')
        del.setAttribute('id', item.id)
        li.appendChild(del);
        const i = document.createElement('i')
        i.classList.add('bi', 'bi-trash')
        del.appendChild(i)

        list.appendChild(li);

        check.addEventListener('change', () => {
            item.completed = !item.completed;
            save()
        })

        del.addEventListener('click', (e: Event) => {
            const { target } = e
            todos = todos.filter(item => item.id != (target as HTMLButtonElement).id)
            //filtered = todos
            filter('all')
            save()
            clear()
            render()
        })

        edit.addEventListener('click', () => {
            check.classList.add('d-none')
            label.classList.add('d-none')
            input.classList.remove('d-none')
            edit.classList.add('d-none')
            saveBtn.classList.remove('d-none')
        })

        saveBtn.addEventListener('click', (e: Event) => {
            item.text = input.value.trim()
            const { target } = e
            //filter('all')
            save()
            clear()
            render()
            edit.classList.remove('d-none')
            saveBtn.classList.add('d-none')

        })

        
    })

    
}




