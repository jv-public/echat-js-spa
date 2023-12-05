// Select DOM elements to work with
const signInButton = document.getElementById('signIn');
const signOutButton = document.getElementById('signOut');
const titleDiv = document.getElementById('title-div');
const welcomeDiv = document.getElementById('welcome-div');
const tableDiv = document.getElementById('table-div');
const tableBody = document.getElementById('table-body-div');
const infoDiv = document.getElementById('centered-text-info');
const toDoForm = document.getElementById('form');
const textInput = document.getElementById('textInput');
const toDoListDiv = document.getElementById('groupDiv');
const todoListItems = document.getElementById('toDoListItems');

toDoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let task = { description: textInput.value };
    handleToDoListActions(task, 'POST', protectedResources.toDoListAPI.endpoint);
    toDoForm.reset();
});

function welcomeUser(username) {
    signInButton.classList.add('d-none');
    signOutButton.classList.remove('d-none');
    titleDiv.classList.add('d-none');
    infoDiv.classList.remove('d-none');
    welcomeDiv.classList.remove('d-none');
    welcomeDiv.innerHTML = `Authenticated user: ${username}`;

(function(w, d, x, id){
    s=d.createElement('script');
    s.src='https://d2zasqxhmd6ne4.cloudfront.net/amazon-connect-chat-interface-client.js';
    s.async=1;
    s.id=id;
    d.getElementsByTagName('head')[0].appendChild(s);
    w[x] =  w[x] || function() { (w[x].ac = w[x].ac || []).push(arguments) };
  })(window, document, 'amazon_connect', '63121995-123f-4613-92c9-10bc50175a95');
  amazon_connect('styles', { iconType: 'CHAT', openChat: { color: '#ffffff', backgroundColor: '#123456' }, closeChat: { color: '#ffffff', backgroundColor: '#123456'} });
  amazon_connect('snippetId', 'QVFJREFIajB2ZWh0V0phclVpYUZ6M3pLNlhsbzI5ZENWTXp0dUl0L20zMmpCN0ltRGdFUHd5elpnUW5jK3dxQ1J2T05EMWlYQUFBQWJqQnNCZ2txaGtpRzl3MEJCd2FnWHpCZEFnRUFNRmdHQ1NxR1NJYjNEUUVIQVRBZUJnbGdoa2dCWlFNRUFTNHdFUVFNYklMUWxORGxGZW8va1ZvSEFnRVFnQ3RkK2dsWEcvaElaTDVUSndpRnlZVm03V2t1SSt0dEoxbFpkV1BDajVsb3o1aTlqcXZxbEc2UUk1Tk86OjNHUHVQc01jZ1BNRGVuenRLYUtMM0xnR0EwT21UK2tUTjBzY05SSTk5N2hjSDdOWm1OZXZsZU4yUitFVWxEUFRhRjVYalRHQi84SE1TNnRjRVFqTzVYNk04N3pBUGt4MVRvazdCV2gvQmNHNTY4QVVIMmdiUzBTN3JkcTloT3FETHdTd0M2c0JKNDlHYUZCLyt6OTZ0MHk2QjNObnd1WT0=');
  amazon_connect('supportedMessagingContentTypes', [ 'text/plain', 'text/markdown' ]);
  amazon_connect('customerDisplayName', function(callback) {const displayName = `${username}`; callback(displayName);});

}

function updateTable(account) {
    tableDiv.classList.remove('d-none');
    const tokenClaims = createClaimsTable(account.idTokenClaims);
    
    Object.keys(tokenClaims).forEach((key) => {
        if (tokenClaims[key][0] == 'name') {
            let row = tableBody.insertRow(0);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            cell1.innerHTML = tokenClaims[key][0];
            cell2.innerHTML = tokenClaims[key][1];
            cell3.innerHTML = tokenClaims[key][2];
          } 
        else if (tokenClaims[key][0] == 'email') {
            let row = tableBody.insertRow(0);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            cell1.innerHTML = tokenClaims[key][0];
            cell2.innerHTML = tokenClaims[key][1];
            cell3.innerHTML = tokenClaims[key][2];
          }

        
    });

}

function showToDoListItems(response) {
    todoListItems.replaceChildren();
    tableDiv.classList.add('d-none');
    toDoForm.classList.remove('d-none');
    toDoListDiv.classList.remove('d-none');
    if (!!response.length) {
        response.forEach((task) => {
            AddTaskToToDoList(task);
        });
    }
}

function AddTaskToToDoList(task) {
    let li = document.createElement('li');
    let button = document.createElement('button');
    button.innerHTML = 'Delete';
    button.classList.add('btn', 'btn-danger');
    button.addEventListener('click', () => {
        handleToDoListActions(task, 'DELETE', protectedResources.toDoListAPI.endpoint + `/${task.id}`);
    });
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    li.innerHTML = task.description;
    li.appendChild(button);
    todoListItems.appendChild(li);
}
