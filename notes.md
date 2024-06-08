# Estate Project

## React-Redux

### `useSelector`

`useSelector` is a property of React-Redux used for retrieving the current user from local storage.

### `useRef`

`useRef` is used for referencing an element to another element. For example, to open a file browser by clicking an image:

```jsx
const fileInputRef = useRef();

const handleImageClick = () => {
  fileInputRef.current.click();
};

return (
  <>
    <img
      src="your-image.jpg"
      onClick={handleImageClick}
      alt="Click to upload"
    />
    <input type="file" ref={fileInputRef} style={{ display: "none" }} />
  </>
);
```

### Callback Function in React

- To center text, use `text-center`.
- To center an image, use `self-center`.
- `justify-between` adds space between elements.
- Use `<span>` to align text in one row.
- Use `flex` for elements wrapped with a `<div>`.
- `<input type="file" />` is used for choosing an image or file from the system.
- `onChange` event listener can be used for change events on a particular element.

### Firebase Setup

- Configure default rules and conditions in Firebase storage.
- Use the `onChange` property on an input field to store data. Pass a callback function with an argument `e` where you can use `e.target.value`.

```jsx
const handleChange = (e) => {
  console.log(e.target.value);
};

return <input type="text" onChange={handleChange} />;
```

## `useEffect`

The `useEffect` Hook allows you to perform side effects in your components. It gets called when some component changes.

```jsx
useEffect(() => {
  // Your side effect logic
}, [dependencies]); // dependencies determine when the function is called
```

### JavaScript Arrow Functions

In JavaScript, arrow functions are commonly used. You can add a name to the function and pass arguments inside the starting bracket.

## Firebase

### `getStorage`

`getStorage` is a function from `firebase/storage` used for uploading files to Firebase as needed.

### Firebase.js

Inside `firebase.js`, set up an app that contains everything as per the user in Firebase. Import it as needed to get essential details about the account.

### Unique Names

For making any name unique, you can add `new Date().getTime();`.

### `getDownloadURL`

Firebase has `getDownloadURL`, which can be used after uploading a file if you want to reuse it.

### Adding Text Inside a `span`

Inside a `span`, you can add text like this:

```jsx
const name = "world";

return <span>{`Hello, ${name}`}</span>;
```

---

This is a better-organized Markdown version of the provided information, making it easier to read and understand.

### post method

```jsx
post("/signup", handlerfucntion);
```

in post handler behaves as a the route to our sever wherer the function need to be called.

### common:

> in a backend api contains routes ,models, controllers

- routes determines the path, model gives the model structure strogly associated with databse andcontrollers are the function which we are call during the routes and http method handlers

- next is using for handling error in post , where we pass

```jsx

const function=(req,res,next)=>{
    ....
}
```

- for updating post request need to do an additional verification step to add where we determines the updating is correct user only

> getting info from the cookie for verification we need an addtional package called cookie-parser from where we can get the current ser info and details about the user.

> by adding cookieParser from cookie-parse and app.use(cookieParser()) we can get the get info from cookie

in a callback function what does it mean by req and how req and respond assciated ?

> if anywhere if you wanto to pass the password first thing is encrypt the password

### mongodb

- her for password updates use bcryptjs and hashSync
- for updating the user use findByIdAndUpdate(id,handle_function);

- if a function is using await must use the async key word on start of the function call

`findByIdAndUpdate`

```jsx
Model.findByIdAndUpdate(id, update, options, callback);
```

id: The \_id of the document you want to find and update.
update: An object containing the update operations to be applied to the document.
options (optional): An object with additional options (e.g., { new: true } to return the updated document).
callback (optional): A callback function to execute once the operation is complete.

The "Content-Type" header is an HTTP header that indicates the type of data that is being sent in the HTTP response body. It tells the client (e.g., a web browser or another server) how to interpret the content of the response.

When you send an HTTP response from a server, you can specify the "Content-Type" header to describe the format of the data being sent. Common values for the "Content-Type" header include:

    text/plain: Indicates plain text data.
    text/html: Indicates HTML data.
    application/json: Indicates JSON data.

```
cookie parser can use for store the current user info and , for updating and deleting we can use it
```

```
json web token is used for converting the id to a speicied token in our cookies, and using res.cookies we can store it in our local storage ans later usage for cookies

```

```jsx
const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
```

onchange ,will reflect the change in input field to formdata

e.preventDefualt() is used for preventing the defualt action done by event listerns where the, instead it allows to perfomr some custom logic for our form submmission

> try and catch is used for anticipating erros occured in the block of statment int try, in try if we occur any type of error we can easily jump into catch error .

---

frist we will make the route and controlling of update or delete method via any testing api tools here we are using insomnia or postman also we can use it

user.params.id gettting from the url we are passing into the endpoint , the retrived from the cookie storage inside the system

> for a delete method usually we donto need to pass any header and body.Only the method delete enough, and after finishing up the deleet hadle in a page we get the res via

```jsx
data = await res.json();
```

cookies need to be deleted after the delete account , that can be performed via res.clearCookie("access_token")

---

for creating a new route in we should start from index.js

```jsx
app.use("/api/listing", func_listing);
```

model creation can be done in a separate file inside in models folder where we can add the required models list

### tailwind styling

use sm:flex-col for mobile screens
adding additional sm: along with actual size will lead to an mmobile size screen view

---

we can add swiper package for swiping images in the window for swipiing effect

> link componet is from the routing library react-dom

#### mailto function from react jsx

```jsx
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}

```

the above way we can add the mail and corresponding conatact list also

inside a form the button have a property of submit itself
so it behaves as like a submitting in nature

in tailwind css trucate a para only can do by using one line , but using the tailwind css clamp library we can have it in more than two lines

# Deploy in Vercel app

- add the build command for vercel in package.json
- we need to create a dynmic directory name for rendering it in any compputer the name is \_\_dirname=path.resolve();

```
The __dirname is a global variable in Node.js that gives the directory name of the current module. In your code, __dirname is being set to the root directory of your project using path.resolve().

The dist directory typically contains the "distribution" version of your code. This is the version of your code that you intend to deploy or distribute. It's often minified and optimized for production.

The line app.use(express.static(path.join(__dirname, "/cluent/dist"))); is telling Express to serve static files from the dist directory in your project root. Static files are files that are not processed by the server, like HTML, CSS, and client-side JavaScript files, images, etc.

The app.get("*", (req, res) => {...} route handler is a catch-all handler that sends the index.html file in response to any request that doesn't match the previous routes. This is a common pattern in applications that use client-side routing with libraries like React Router.

During the deployment stage, your client-side code (React, Angular, Vue, etc.) is usually built into a set of static files (HTML, CSS, JS) that can be served by any static file server. These files are typically placed in a dist or build directory. The server's job then becomes serving these static files and handling any API routes your application might have.
```
