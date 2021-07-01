const addTime = document.querySelector('#addTime');
const saveTime = document.querySelector('#saveTime');
const resetTable = document.querySelector('#resetTable');


const addRowInTableMain = () =>
    `<tr class="timelines">
        <th scope="row" data-main-index=""></th>
        <td><input type="time" value="10:00" data-time="${++getScheduleValue().length}"></td>
        <td><input type="checkbox" data-day="${++getScheduleValue().length}"></td>
        <td><input type="checkbox" data-day="${++getScheduleValue().length}"></td>
        <td><input type="checkbox" data-day="${++getScheduleValue().length}" checked></td>
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
addTime.addEventListener('click', () => {
    const tableMain = document.querySelector('.table-main');
    const tableAlternative = document.querySelector('.table-alternative');

    tableMain.lastElementChild.insertAdjacentHTML('beforeend', addRowInTableMain());
    tableAlternative.lastElementChild.insertAdjacentHTML('beforeend', addRowInTableAlternative());
    setScheduleIndex();
});

saveTime.addEventListener('click', () => {
    getScheduleValue().forEach((_, index) => setScheduleValue(index + 1))
});