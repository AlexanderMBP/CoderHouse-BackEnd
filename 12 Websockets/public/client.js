const socket = io.connect();

//Products

let productTemplate = Handlebars.compile(`
{{#if products}}
<ul class="list-group mt-2">
    {{#each products}}
    <li class="list-group-item d-flex justify-content-around align-items-center">
        <p>{{this.id}}</p>
        <p>{{this.title}}</p>
        <p>{{this.price}}</p>
        <img src={{this.thumbnail}} alt={{this.title}} width="20%" height="20%">
    </li>
    {{/each}}
</ul>
{{else}}
<h3 class="alert alert-danger">Products not found</h3>
{{/if}}`
);

document.getElementById("saveProduct").addEventListener("click", save);

const title = document.getElementById("title");
const price = document.getElementById("price");
const thumbnail = document.getElementById("thumbnail");

function save () {
    const newProduct = {
        title: title.value,
        price: price.value,
        thumbnail: thumbnail.value,
    };
    socket.emit('product', newProduct);
};

socket.on('products', (data) => {
    $("#products").html(productTemplate({products: data.products}));
});

//Chat
socket.on("messages", (data) => {
	$("#messages").html(chatTemplate({messages : data}))
    console.log(data);
});

let chatTemplate = Handlebars.compile(`
{{#if messages}}
{{#each messages}}
<div class="card mt-2" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title"> {{this.author}}> <small class="text-muted">{{this.date}}</small> </h5>
    <p class="card-text">{{this.message}}</p>
  </div>
</div>
{{/each}}
{{else}}
<h3 class="alert alert-danger">Not messages found</h3>
{{/if}}`);

document.getElementById("sendMessageBtn").addEventListener("click", addMessages);

const author = document.getElementById("author");
const textMessage = document.getElementById("message");



function addMessages() {
	let message = {
        date: new Date(),
		author: author.value,
		message: textMessage.value, 
	};
	socket.emit("newMessage", message);
}