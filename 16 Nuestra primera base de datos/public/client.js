const socket = io.connect();

//Products

let productTemplate = Handlebars.compile(`
{{#if products}}
<ul class="list-group mt-2">
    {{#each products}}
    <li class="list-group-item d-flex justify-content-around align-items-center">
        <p>{{this.Id}}</p>
        <p>{{this.Title}}</p>
        <p>{{this.Price}}</p>
        <img src={{this.Thumbnail}} alt={{this.title}} width="20%" height="20%">
    </li>
    {{/each}}
</ul>
{{else}}
<h3 class="alert alert-danger">Products not found</h3>
{{/if}}`
);

document.getElementById("saveProduct").addEventListener("click", save);

const title = document.getElementById("Title");
const Product_description = document.getElementById("Product_description");
const price = document.getElementById("Price");
const code = document.getElementById("code");
const thumbnail = document.getElementById("Thumbnail");
const stock = document.getElementById("Stock");

function save () {
    const newProduct = {
        Title: title.value,
        Product_description : Product_description.value,
        code : code.value,
        Thumbnail: thumbnail.value,
        Price: price.value,
        Stock : stock.value
    };
    socket.emit('product', newProduct);
};

socket.on('products', (data) => {
    console.log(data.products);
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
        author: author.value,
		message: textMessage.value, 
	};
	socket.emit("newMessage", message);
}