// your code here
window.onload = function loading() {

    let token;
    //cosnst GEOLOCATION_API_KEY="url";

    let loginDesplay = `
       <h1> Please login</h1>
       User name: <input type="text" id="userName" value= mwp ><br>
       Password: <input type= "text" id= "password" value= 123><br>
       <button id= "login">Login</button>`



    let animationDesplay = `
    
    <h1 id= "animation">  </h1>
    <textarea id = animationView"  rows="10" cols="30" stayle = "font-size:10px"> </textarea><br>
    <button id= "refresh">Refresh Animation</button>
    <button id= "logout">Logout</button>`
    // calling the HTML file
    let divDisplay = document.querySelector("#outlet")
    divDisplay.innerHTML = loginDesplay


    let loginButton = document.querySelector("#login");
    loginButton.addEventListener("click", loginnFunctio);


    function loginnFunctio() {

        alert("you are loging in");
        divDisplay.innerHTML = animationDesplay
        let logoutButton = document.querySelector("#logout");
        logoutButton.addEventListener("click", logoutFunction);
        feachingAddres()
        feachlogin()
    }

    function logoutFunction() {
        alert("you are loging out ")
        divDisplay.innerHTML = loginDesplay
        let loginButton = document.querySelector("#login");
        loginButton.addEventListener("click", loginnFunctio);
    }

    function feachingAddres() {
        navigator.geolocation.getCurrentPosition(success, fail);
        async function success(position) {
            console.log(position)
            let longitude = position.coords.longitude
            let latitude = position.coords.latitude
            // console.log('Longitude:' + position.coords.longitude);
            // console.log('Latitude:' + position.coords.latitude);
            let addres = await fetch(`http://www.mapquestapi.com/geocoding/v1/reverse?key=WFqvIrAcLZO7zsWflhxYDWgBVoH8yRXQ&location=${latitude},${longitude}8&includeRoadMetadata=true&includeNearestIntersection=true`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            let newAddres = await addres.json();
            console.log(newAddres);
            const city = newAddres.results[0].locations[0].adminArea5;
            const state = newAddres.results[0].locations[0].adminArea3;
            const country = newAddres.results[0].locations[0].adminArea1;
            let x = `Welcome to ${country} ${city} ${state}`
            let y = document.querySelector("#animation");
            y.innerHTML = x;
            // document.querySelector("#animation").innerHTML = `Welcome to ${country} ${city} ${state}`;
        }
        function fail() {
            console.log("Sorry unable to get the location");
        }


    }
    async function feachlogin() {
        let request = await fetch("http://www.mumstudents.org/api/login",
            {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    "username": document.querySelector("#userName"),
                    "password": document.querySelector("#password")
                })
            })
        let x = await request.json();
        let y = x.token;
        console.log(y)

    }

    async function feachAnimation() {
        const response = await fetch("http://www.mumstudents.org/api/animation", {
            method: "GET",
            headers: {
                "Content-Type": "applicaion/text",
                Authorization: `Bearer ${token}`
            }
        });
        animation = await response.text();
        animationview()
    }

    function animationview() {
        let frames = animation.split('=====\n')
        let frameLength = frames.length;
        let currentFrame = 0;
        animationId = setInterval(() => {
            document.querySelector("#animationView").value = frames[currentFrame];
            currentFrame++;
            if (currentFrame === frameLength) { currentFrame = 0; }
        }, 200)
        feachAnimation()

        // let token =`eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtd2EiLCJpc3N1ZWRBdCI6IjIwMTktMTEtMjciLCJ1c2VybmFtZSI6Im13cCJ9.U9ciwh5lcPwFlJdxhNQkeiMc7AMYAnawfKNidw8CNDpTIUjNBL_EtDqkXG4qGOF8H_Ve1S2Gg2PwmCYOkfgmWA`
    }
}