window.addEventListener("DOMContentLoaded", getData);


function getData() {


//    This is the part changed for search

    const urlParams = new
    URLSearchParams(window.location.search);
    const search = urlParams.get("search");

//  And then we added ?_embed&search="+search to the JSON fetch link

    fetch("http://dredesigns.dk/MyWordpress/wp-json/wp/v2/volunteer?_embed&search="+search)
        .then(res => res.json())
        .then(handleData)
}


function handleData(myData) {
    console.log(myData);

    //1 loop
    myData.forEach(showPost);
}

function showPost(post) {
    console.log(post)

    //    2.Cloning a Template
    const template = document.querySelector(".postTemplate").content;
    const postCopy = template.cloneNode(true);

    //    3. textcontent & innerHTML
    const h1 = postCopy.querySelector("h1");
    h1.innerHTML = post.title.rendered;



    const a = postCopy.querySelector("a");
    a.href = "sub.html?id=" + post.id



    const bodyCopy = postCopy.querySelector(".bodycopy");
    bodyCopy.innerHTML = post.content.rendered;


    const venue = postCopy.querySelector(".venue");
    venue.textContent = post.venue;

    const resp = postCopy.querySelector(".responsibilities");
    resp.textContent = post.responsibilities;

    const contact = postCopy.querySelector(".contact");
    contact.textContent = post.contact;




    // 4. Append
    document.querySelector("#posts").appendChild(postCopy)

}
