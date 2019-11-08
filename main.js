window.addEventListener("DOMContentLoaded", init);

const urlParams = new URLSearchParams(window.location.search);
const search = urlParams.get("search");
const id = urlParams.get("id");



function init() {
    if (search) {
        getSearchData();
    } else if (id) {
        getSinglePost();
    } else {
        getFrontPageData();
    }

}

function getSearchData() {


    //  And then we added ?_embed&search="+search to the JSON fetch link

    fetch("http://dredesigns.dk/MyWordpress/wp-json/wp/v2/volunteer?_embed&search=" + search)
        .then(res => res.json())
        .then(handleData)
}

function getFrontPageData() {
    console.log("getData");
    fetch("http://dredesigns.dk/MyWordpress/wp-json/wp/v2/volunteer?_embed")
        .then(res => res.json())
        .then(handleData)
}


function getSinglePost() {


    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    console.log(id)

    fetch("http://dredesigns.dk/MyWordpress/wp-json/wp/v2/volunteer/" + id+"?_embed")
        .then(res => res.json())
        .then(showPost)

    function showPost(post) {
        console.log(post)
        document.querySelector("article h1").innerHTML = post.title.rendered
    }


}


function handleData(myData) {
    console.log(myData);

    //1 loop
    myData.forEach(showPost);
}

function showPost(post) {

    console.log(post)
    const imgPath = post._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url

    console.log(imgPath)

    //    2.Cloning a Template
    const template = document.querySelector(".postTemplate").content;
    const postCopy = template.cloneNode(true);

    //    3. textcontent & innerHTML
    const h1 = postCopy.querySelector("h1");
    h1.innerHTML = post.title.rendered;

    const img = postCopy.querySelector(".image img")

    img.setAttribute("src", imgPath)
    img.setAttribute("alt", "Featured image" + post.title.rendered);



    const a = postCopy.querySelector("a");
    a.href = "sub.html?id=" + post.id



    const bodyCopy = postCopy.querySelector(".bodycopy");
    bodyCopy.innerHTML = post.content.rendered;


    const venue = postCopy.querySelector(".venue span");
    venue.textContent = post.venue;

    const resp = postCopy.querySelector(".responsibilities");
    resp.textContent = post.responsibilities;

    const contact = postCopy.querySelector(".contact");
    contact.textContent = post.contact;

    const preview = postCopy.querySelector(".preview");
    preview.textContent = post.previews;






    // 4. Append
    document.querySelector("#posts").appendChild(postCopy)

}
