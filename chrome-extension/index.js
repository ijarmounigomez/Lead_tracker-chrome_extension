let myLeads = []; //Array to store inputs from user.
const inputBtn = document.querySelector('#input-btn');
const inputEl = document.getElementById('input-el'); //Selects the input box.
const ulEl = document.getElementById('ul-el');
const deleteBtn = document.getElementById('delete-btn');
//Get leads from localStorage in the App
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const tabBtn = document.getElementById('tab-btn');

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
};

// RENDERING FUNCTION

function render(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        listItems += `
        <li>
            <a target='_blank' href='${leads[i]}'>
                ${leads[i]}
            </a>
        </li>
        `;
    }
ulEl.innerHTML = listItems; 
}

// DELETE BUTTON

deleteBtn.addEventListener('dblclick', () => {
    localStorage.clear(); //Clean local storage
    myLeads = []; //Empty the array
    render(myLeads); //Re-render the page once we have emptied the array
});

// INPUT BUTTON

inputBtn.addEventListener('click', () => {
    myLeads.push(inputEl.value);
    inputEl.value = '';
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
});

// TAB BUTTON

tabBtn.addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    });
});