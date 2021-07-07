const addScheduleButton = document.querySelector('#addScheduleButton');
const saveScheduleButton = document.querySelector('#saveScheduleButton');
const resetScheduleButton = document.querySelector('#resetScheduleButton');
const containerAlternative = document.querySelector('.container-alternative');
const printScheduleButton = document.querySelector('#printScheduleButton');
const copyScheduleButton = document.querySelector('#copyScheduleButton');
const hideScheduleButton = document.querySelector('#hideScheduleButton');
let lastIndex = 3;

const addRowInTableMain = () =>
    `<tr class="timelines">
        <th scope="row" data-main-index="${lastIndex}">${lastIndex}</th>
        <td><input type="time" data-time="${lastIndex}"></td>
        <td><input type="checkbox" data-day="${lastIndex}"></td>
        <td><input type="checkbox" data-day="${lastIndex}"></td>
        <td><input type="checkbox" data-day="${lastIndex}"></td>
        <td><input type="checkbox" data-day="${lastIndex}"></td>
        <td><input type="checkbox" data-day="${lastIndex}"></td>
        <td><input type="checkbox" data-day="${lastIndex}"></td>
        <td><input type="checkbox" data-day="${lastIndex}"></td>
    </tr>`;

const addRowInTableAlternative = () =>
    `<tr>
        <th scope="row" data-alternative-index="${lastIndex}">${lastIndex}</th>
        <td data-set-day="${lastIndex}"></td>
        <td data-set-day="${lastIndex}"></td>
        <td data-set-day="${lastIndex}"></td>
        <td data-set-day="${lastIndex}"></td>
        <td data-set-day="${lastIndex}"></td>
        <td data-set-day="${lastIndex}"></td>
        <td data-set-day="${lastIndex}"></td>
    </tr>`;

//Adiciona uma nova linha de horário em ambas as tabelas
const addScheduleRow = () => {
    const tableMain = document.querySelector('.table-main');
    const tableAlternative = document.querySelector('.table-alternative');

    ++lastIndex;

    tableMain.lastElementChild.insertAdjacentHTML('beforeend', addRowInTableMain());
    tableAlternative.lastElementChild.insertAdjacentHTML('beforeend', addRowInTableAlternative());
}

//retorna um array com os valores dos inputs de horários
const getScheduleValue = () => {
    const times = document.querySelectorAll('[type="time"]');
    return Array.from(times).map(time => time.value)
}

//retorna um array contendo os 7 dias preenchidos com o horário informado ou a string "X"
const getCheckboxValue = scheduleRow => {
    const checkboxes = document.querySelectorAll(`[data-day="${scheduleRow}"]`);
    
    return Array.from(checkboxes)
        .map(checkbox => checkbox.checked
        ? document.querySelector(`[data-time="${scheduleRow}"]`).value: 'X');
}

//insere na tabela alternativa o array com os valores da tabela principal
const setScheduleValue = scheduleIndex => {
    const dataSetDay = document.querySelectorAll(`[data-set-day="${scheduleIndex}"]`);

    Array.from(dataSetDay).forEach((setDay, index) => {
        setDay.textContent = getCheckboxValue(scheduleIndex)[index];
    });
}



//LISTENERS
addScheduleButton.addEventListener('click', addScheduleRow);

saveScheduleButton.addEventListener('click', () => {
    containerAlternative.classList.remove('hide');
    getScheduleValue().forEach((_, index) => setScheduleValue(index + 1))
});

resetScheduleButton.addEventListener('click', () => {
    document.location.reload();
});

printScheduleButton.addEventListener('click', () => {
    print();
});

copyScheduleButton.addEventListener('click', () => {
    const tableAlternative = document.querySelector('.table-alternative');
    navigator.clipboard.writeText(tableAlternative.innerText)
});

hideScheduleButton.addEventListener('click', event => {
    event.target.children[0].classList.toggle('fa-plus');
    containerAlternative.classList.add('hide');
});