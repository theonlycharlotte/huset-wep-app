// add this to url in browser ?name=Charlotte&hobby=JS


const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

console.log(id)

fetch("http://dredesigns.dk/MyWordpress/wp-json/wp/v2/volunteer/"+id)
.then(res=>res.json())
.then(showPost)

function showPost(post) {
    console.log(post)
    document.querySelector("article h1").textContent=post.title.rendered
}
