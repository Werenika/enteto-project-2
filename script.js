//section in HTML
const sectionImg = document.getElementById("sectionImg");
const toTop = document.getElementById("to-top");
const form = document.getElementById("form");
const firstName = document.getElementById("first-name");
const secondName = document.getElementById("second-name");
const email = document.getElementById("email");
const password1 = document.getElementById("password-1");
const password2 = document.getElementById("password-2");

///////////////////////scroll arrow
if (toTop) {
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
      toTop.classList.add("active");
    } else {
      toTop.classList.remove("active");
    }
  });
}

////////////////////////////register-html///////////////////////////////////////////////////
//submit of form
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    validateInputs();
  });
}

//errror function
const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

//success function
const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

//removing class function
const removeClass = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.remove("success");
  inputControl.classList.remove("error");
};

//function for control filling of password
const validatePassword = (pass1, pass2) => {
  const password1Value = pass1.value.trim();
  const password2Value = pass2.value.trim();
  if (password1Value === "" && password2Value === "") {
    removeClass(pass1);
    removeClass(pass2);
  } else {
    if (password1Value.length < 6) {
      setError(password1, "Heslo musí obsahovat nejméně 6 znaků");
      setError(password2, "");
    } else if (password2Value !== password1Value) {
      setError(pass1, "Hesla se neshodují");
      setError(pass2, "Hesla se neshodují");
    } else {
      setSuccess(pass1);
      setSuccess(pass2);
    }
  }
};

//Event listener for password form
if (password1) {
  password1.addEventListener("input", () => {
    validatePassword(password1, password2);
  });
}
if (password2) {
  password2.addEventListener("input", () => {
    validatePassword(password1, password2);
  });
}

//copied function for email check
/*const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};*/

//validation function for rest of form
const validateInputs = () => {
  //trim-remove space in string
  const firstNameValue = firstName.value.trim();
  const secondNameValue = secondName.value.trim();
  const emailValue = email.value.trim();
  const password1Value = password1.value.trim();
  const password2Value = password2.value.trim();

  if (firstNameValue === "" || firstNameValue === null) {
    setError(firstName, "Prosím vyplňte pole");
  } else {
    setSuccess(firstName);
  }

  if (secondNameValue === "" || secondNameValue === null) {
    setError(secondName, "Prosím vyplňte pole");
  } else {
    setSuccess(secondName);
  }

  if (emailValue === "" || emailValue === null) {
    setError(email, "Prosím vyplňte pole");
  } else {
    /* using isValidEmail function check: else if (!isValidEmail(emailValue)) {
    setError(email, `Prosím vyplťe pole`);
  }*/
    setSuccess(email);
  }

  validatePassword(password1, password2);

  if (password1Value === "" && password2Value === "") {
    setError(password1, "Prosím vyplňte pole");
    setError(password2, "Prosím vyplňte pole");
  }
};

////////////////////////////////////////search-html////////////////////////////////////////////////////
//přidání do HTML
const addToWebsite = (htmlTag, content, whereToAdd) => {
  const html = document.createElement(htmlTag);
  html.textContent = content;
  whereToAdd.append(html);
};

//new aray from aray
const getUrl = (data) => {
  const notNull = data.filter(
    (element) =>
      element != null && element.show != null && element.show.image != null
  );
  let imgArray = [];
  notNull.forEach((resultUrl) => {
    const image = resultUrl.show.image.medium;
    imgArray.push(image);
  });
  return imgArray;
};

//adding IMG to html
const imgToWebsite = (content, whereToAdd) => {
  const img = document.createElement("img");
  img.src = content;
  img.classList.add("imgClass");
  whereToAdd.append(img);
};

//////////////////////API
const getImg = async (search) => {
  try {
    const response = await fetch(
      "https://api.tvmaze.com/search/shows?q=" + search
    );
    const data = await response.json();

    sectionImg.innerHTML = "";

    let imgArray = getUrl(data);
    imgArray.forEach((imgUrl) => {
      imgToWebsite(imgUrl, sectionImg);
    });
  } catch (error) {
    addToWebsite("p", "data se nepovedla načíst", sectionImg);
  }
};

//html id selection
const select = document.getElementById("movie");

if (select) {
  select.addEventListener("change", (event) => {
    getImg(event.target.value);
  });
}
