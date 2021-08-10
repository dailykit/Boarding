var myVar;
if (document.querySelector(".lds-ring")) {
  document.querySelector(".lds-ring").style.display = "none";

  myVar = setTimeout(loaderFunc, 1000);

  function loaderFunc() {
    document.querySelector(".lds-ring").style.display = "block";
  }
}
