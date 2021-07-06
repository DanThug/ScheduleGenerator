const addSchedule = document.querySelector('#addSchedule');
const saveSchedule = document.querySelector('#saveSchedule');
const resetSchedule = document.querySelector('#resetSchedule');
const containerAlternative = document.querySelector('.container-alternative');
const printSchedule = document.querySelector('#printSchedule');
const copySchedule = document.querySelector('#copySchedule');
const hideSchedule = document.querySelector('#hideSchedule');

const addRowInTableMain = () =>
    `<tr class="timelines">
        <th scope="row" data-main-index=""></th>
        <td><input type="time" data-time="${++getScheduleValue().length}"></td>
        <td><input type="checkbox" data-day="${++getScheduleValue().length}"></td>
        <td><input type="checkbox" data-day="${++getScheduleValue().length}"></td>
        <td><input type="checkbox" data-day="${++getScheduleValue().length}"></td>
        <td><input type="checkbox" data-day="${++getScheduleValue().length}"></td>
        <td><input type="checkbox" data-day="${++getScheduleValue().length}"></td>
        <td><input type="checkbox" data-day="${++getScheduleValue().length}"></td>
        <td><input type="checkbox" data-day="${++getScheduleValue().length}"></td>
    </tr>`;

const addRowInTableAlternative = () =>
    `<tr>
        <th scope="row" data-alternative-index=""></th>
        <td data-set-day="${getScheduleValue().length}"></td>
        <td data-set-day="${getScheduleValue().length}"></td>
        <td data-set-day="${getScheduleValue().length}"></td>
        <td data-set-day="${getScheduleValue().length}"></td>
        <td data-set-day="${getScheduleValue().length}"></td>
        <td data-set-day="${getScheduleValue().length}"></td>
        <td data-set-day="${getScheduleValue().length}"></td>
    </tr>`;

//gera e insere automaticamente uma numeração para cada horário
const setScheduleIndex = () => {
    const dataMainIndex = document.querySelectorAll('[data-main-index]');
    const dataAlternativeIndex = document.querySelectorAll('[data-alternative-index]');
    dataMainIndex.forEach((element, index) => element.textContent = index + 1);
    dataAlternativeIndex.forEach((element, index) => element.textContent = index + 1);
}

//retorna um array com os valores dos inputs de horários
const getScheduleValue = () => {
    const times = document.querySelectorAll('[type="time"]');
    return Array.from(times).map(time => time.value)
}

//retorna um array contendo os 7 dias preenchidos com o horário informado ou a string "X"
const getCheckboxValue = scheduleLine => {
    const checkboxes = document.querySelectorAll(`[data-day="${scheduleLine}"]`);
    return Array.from(checkboxes)
        .map(checkbox => checkbox.checked
        ? document.querySelector(`[data-time="${scheduleLine}"]`).value: 'X');
}

//insere na tabela alternativa o array com os valores da tabela principal
const setScheduleValue = scheduleIndex => {
    const dataSetDay = document.querySelectorAll(`[data-set-day="${scheduleIndex}"]`);

    return Array.from(dataSetDay).forEach((setDay, index) => {
        setDay.textContent = getCheckboxValue(scheduleIndex)[index];
    });
}

setScheduleIndex();

//LISTENERS
addSchedule.addEventListener('click', () => {
    const tableMain = document.querySelector('.table-main');
    const tableAlternative = document.querySelector('.table-alternative');

    tableMain.lastElementChild.insertAdjacentHTML('beforeend', addRowInTableMain());
    tableAlternative.lastElementChild.insertAdjacentHTML('beforeend', addRowInTableAlternative());
    setScheduleIndex();
});

saveSchedule.addEventListener('click', () => {
    containerAlternative.classList.remove('hide');
    getScheduleValue().forEach((_, index) => setScheduleValue(index + 1))
});

resetSchedule.addEventListener('click', () => {
    document.location.reload();
});

printSchedule.addEventListener('click', () => {
    print();
});

copySchedule.addEventListener('click', () => {
    const tableAlternative = document.querySelector('.table-alternative');
    navigator.clipboard.writeText(tableAlternative.innerText)
});

hideSchedule.addEventListener('click', event => {
    event.target.children[0].classList.toggle('fa-plus');
    containerAlternative.classList.add('hide');
});