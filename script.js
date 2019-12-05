// your code here
// encapsulating the function from the window 
window.onload = function loading() {

    //variable diclaration    
    let token;
    let animatedId;
    let username;
    let password


    //HTML longin view
    let loginDesplay = `
    <div>
       <h1> Please login</h1>
       User name: <input type="text" id="userName" value="mwp" ><br>
       Password: <input type= "text" id= "passWord" value="123"><br>
       <button id= "login">Login</button>
       </div>`

    //HTML animation view
    let animationDesplay = `
    <div>
    <h1 id= "animation">  </h1>
    <textarea id = "animationView"  rows="30" cols="50"  > </textarea><br>
    <button id= "refresh">Refresh Animation</button>
    <button id= "logout">Logout</button>
    <div>`

    // calling the HTML file
    let divDisplay = document.querySelector("#outlet")
    divDisplay.innerHTML = loginDesplay

    //adding event for login button 
    let loginButton = document.querySelector("#login");
    loginButton.addEventListener("click", loginnFunction);
    backToLoginView()
    // login function with its functionalities 
    function loginnFunction() {
        //memorizng the history
        history.pushState({ loginnFunction: 1 }, "title", "index.html")
        window.addEventListener("popstate", function (event) {
            if (event.state.loginnFunction === 1) {
                clearInterval(animationDesplay)
                backToLoginView()
            }
        })
        password = document.getElementById("passWord").value
        username = document.getElementById("userName").value
        if (password === "123" && username === "mwp") {

            alert("you are loging in");
            divDisplay.innerHTML = animationDesplay
            logoutFunction()
            feachAnimation()
            feachingAddres()
            //adding event for refresh button 
            document.querySelector("#refresh").addEventListener("click", feachAnimation)
        }
        else { alert("Wrong Login Credential tray again") }

    }
    // logout function from animation view
    function logoutFunction() {
        // alert("you are loging out ")
        // divDisplay.innerHTML = loginDesplay
        let logoutButton = document.querySelector("#logout");
        logoutButton.addEventListener("click", backToLoginView);
    }
    //helper function for logout  to back to login view
    function backToLoginView() {
        divDisplay.innerHTML = loginDesplay
        //adding event listner to login butoon.
        let loginButton = document.querySelector("#login");
        loginButton.addEventListener("click", loginnFunction);
    }

    // fitching addres from the geolocation server
    function feachingAddres() {
        navigator.geolocation.getCurrentPosition(success, fail);
        async function success(position) {
            console.log(position)
            let longitude = position.coords.longitude
            let latitude = position.coords.latitude
            let addres = await fetch(`http://www.mapquestapi.com/geocoding/v1/reverse?key=WFqvIrAcLZO7zsWflhxYDWgBVoH8yRXQ&location=${latitude},${longitude}&includeRoadMetadata=true&includeNearestIntersection=true`, {
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
    
    //fitching the annimation from mumstudents server
    token = `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtd2EiLCJpc3N1ZWRBdCI6IjIwMTktMTEtMjgiLCJ1c2VybmFtZSI6Im13cCJ9.H_AyVaB6QvmKtrXzEC_mHigPPToWRie_rSlstl5P4brg-bt5-HE62ETEjCZWbOVc0VggV7IW3hf2fe-6zb1Uog`;

    async function feachAnimation() {

        let url = "http://www.mumstudents.org/api/animation ";

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/text',
                Authorization: `Bearer ${token}`
            }
        })
        if (animatedId) clearInterval(animatedId)
        let anim = await response.text();
        let frames = anim.split('=====\n');
        let framesLength = frames.length;
        let currFrame = 0;
        animatedId = setInterval(() => {
            document.getElementById('animationView').innerHTML = frames[currFrame];
            currFrame++;
            if (currFrame === framesLength) currFrame = 0;
        }, 200)
    }
}