// window loading
window.addEventListener("load", () =>
  setTimeout(function () {
    document.querySelector(".loadingCont").classList.add("hideLoader");
  }, 1500)
);
//
// call function to get user
async function getUser(username) {
  try {
    const res = await axios(`https://api.github.com/users/${username}`);
    return res.data;
  } catch (e) {
    return `We have an error here: ${e}`;
  }
}

let cont1 = document.querySelector("#cont1-btn");
let cont2 = document.querySelector("#cont2-btn");
let back = document.querySelector("#back-btn");
let player1 = document.querySelector(".player-1");
let player2 = document.querySelector(".player-2");
let initBtn = document.querySelector("#init-btn");
const fValue1 = document.querySelector("#user1");
const fValue2 = document.querySelector("#user2");
const image = document.querySelector(".user-image");
const pname = document.querySelector(".pname");
const username = document.querySelector(".username");
const locate = document.querySelector(".location");
const followers = document.querySelector(".followers");
const following = document.querySelector(".following");
const repos = document.querySelector(".repos");
const image1 = document.querySelector(".userimg");
const pname1 = document.querySelector(".pname1");
const username1 = document.querySelector(".username1");
const locate1 = document.querySelector(".location1");
const followers1 = document.querySelector(".followers1");
const following1 = document.querySelector(".following1");
const repos1 = document.querySelector(".repos1");

function asignVal(user, num) {
  if (num == 1) {
    image.src = user.avatar_url;
    pname.innerHTML = user.name;
    username.innerHTML = user.login;
    locate.innerHTML = user.location;
    followers.innerHTML = user.followers;
    following.innerHTML = user.following;
    repos.innerHTML = user.public_repos;
  } else {
    image1.src = user.avatar_url;
    pname1.innerHTML = user.name;
    username1.innerHTML = user.login;
    locate1.innerHTML = user.location;
    followers1.innerHTML = user.followers;
    following1.innerHTML = user.following;
    repos1.innerHTML = user.public_repos;
  }
}

cont1.addEventListener("click", async function (e) {
  e.preventDefault();
  // check for form field validity
  if (fValue1.validity.valueMissing) {
    return fValue1.reportValidity();
  } else {
    // get user-one
    let user1 = await getUser(fValue1.value);
    if (typeof user1 === "object") {
      asignVal(user1, 1);
      localStorage.setItem("user1", JSON.stringify(user1));
      player1.style.display = "";
      setTimeout(function () {
        player1.style.display = "none";
        document.querySelector(".form-1").classList.add("hideClass");
        document.querySelector(".form-2").classList.remove("hideClass");
      }, 500);
    } else {
      setTimeout(function () {
        fValue1.setCustomValidity("User does not exist enter a valid username");
        fValue1.reportValidity();
      }, 500);
      // cont1.insertAdjacentHTML("beforebegin", `<div style="color: red; margin:5px;">User does not exist enter another username</div>`)
      return;
    }
  }
});

back.addEventListener("click", function (e) {
  e.preventDefault();
  // clear local storage if user decide to go back and pick another user
  localStorage.removeItem("user1");
  document.querySelector(".form-1").classList.remove("hideClass");
  document.querySelector(".form-2").classList.add("hideClass");
});

cont2.addEventListener("click", async function (e) {
  e.preventDefault();
  // check for form field validity
  if (fValue2.validity.valueMissing) {
    return fValue2.reportValidity();
  } else {
    // get user-two
    let user2 = await getUser(fValue2.value);
    if (typeof user1 === "object") {
      asignVal(user2, 2);
      localStorage.setItem("user2", JSON.stringify(user2));
      player2.style.display = "";
      setTimeout(function () {
        let user1 = JSON.parse(localStorage.getItem("user1"));
        asignVal(user1, 1);
        document
          .querySelector("#results")
          .insertAdjacentHTML(
            "beforebegin",
            `<h1 id="confirm">Confirm Players</h1>`
          );
        player2.style.display = "";
        player1.style.display = "";
        initBtn.classList.remove("hideClass");
        document.querySelector(".form-1").classList.add("hideClass");
        document.querySelector(".form-2").classList.add("hideClass");
      }, 500);
    } else {
      setTimeout(function () {
        fValue2.setCustomValidity("User does not exist enter a valid username");
        fValue2.reportValidity();
      }, 500);
      // cont1.insertAdjacentHTML("beforebegin", `<div style="color: red; margin:5px;">User does not exist enter another username</div>`)
      return;
    }
  }
});

const initBattle = document.querySelector("#btn-initiate");
userRes1 = document.querySelector(".user-result1");
userRes2 = document.querySelector(".user-result2");

initBattle.addEventListener("click", function (e) {
  e.preventDefault();
  // clear local storage if user decide to go back and pick another user
  document.querySelector("#confirm").innerHTML = "Results!!!";
  const info1 = document.querySelector(".info-1");
  const info2 = document.querySelector(".info-2");
  let user1 = JSON.parse(localStorage.getItem("user1"));
  let user2 = JSON.parse(localStorage.getItem("user2"));
  let score1 =
    user1.followers + user1.following + Math.round(user1.public_repos * 0.5);
  let score2 =
    user2.followers + user2.following + Math.round(user2.public_repos * 0.5);
  info1.classList.remove("hideClass");
  info2.classList.remove("hideClass");
  info1.innerHTML = score1;
  info2.innerHTML = score2;

  if (score1 > score2) {
    userRes1.classList.add("winner");
    userRes2.classList.add("loser");
    userRes1.innerHTML = "Winner";
    userRes2.innerHTML = "Loser";
  } else {
    userRes1.classList.add("loser");
    userRes2.classList.add("winner");
    userRes1.innerHTML = "Loser";
    userRes2.innerHTML = "Winner";
  }
  initBattle.style.display = "none";
});
