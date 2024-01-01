const droplist = document.querySelectorAll("form select"),
formCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select")
getButton = document.querySelector("form button");

for (let i = 0; i < droplist.length; i ++){
  for(let currency_code in country_list){
    // selecting USD by default a FROM currency and AFN as TO current 
    let selected = i == 0 ? currency_code == "USD" ? "selected" : "" : currency_code == "AED" ? "selected" : "";
//creating option tag with passing currency code as text and value 
    let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
  // inserting option tag inside select tag
    droplist[i].insertAdjacentHTML("beforeend", optionTag);
  }
  droplist[i].addEventListener("change", e =>{
    loadflag(e.target); // calling loadflag with passing target element as an argument
  });
}

function loadflag(element){
  for (let code in country_list){
    if (code == element.value){// if current code of country list is equal to option value
      let imgTag = element.parentElement.querySelector("img");
      // passing  country code of a seleted currency code in a img url
      imgTag.src = `https://flagcdn.com/48x36/${country_list[code].tolowerCase()}.png`;
    }
  }
}
window.addEventListener("load", ()=>{
  getExchangeRate();
});

getButton.addEventListener("click", e =>{
  // e.parentDefault();+

  getExchangeRate();
});

const exchangeIcon = document.querySelector("form .icon");
exchangeIcon.addEventListener("click", ()=>{
  let tempCode = formCurrency.value; // temporary code of FROM drop list
  formCurrency.value = toCurrency.value; // passing TO currency code to FROM current code 
  toCurrency.value = tempCode; // passing temporary currency code to TO currency code
  loadflag(formCurrency); // calling loadingflag with passing select element (fromcurrency) of from 
  loadflag(toCurrency);
  getExchangeRate();
})

function getExchangeRate(){

  const amount = document.querySelector("form input");
  const exchangeRateTxt = document.querySelector("form .exchange-rate");
  let amountVal = amount.value;
  if(amountVal == " " || amountVal == "0"){
    amount.value = "0";
    amountVal = 0;
  }
  exchangeRateTxt.innerText = "Getting exchange rate...";
  console.log(formCurrency.value)
  console.log(toCurrency.value)

  let url = `https://v6.exchangerate-api.com/v6/b0640fb870af2ea76b604bd1/latest/${formCurrency.value}`;
// fetching api response and rturning it with parsing js obj ansd in another thn method reciving  the  
  fetch(url).then(response => response.json()).then(result =>{
    let exchangeRate = result.conversion_rates[toCurrency.value];
    let totalExRate = (amountVal * exchangeRate).toFixed(2);
    exchangeRateTxt.innerText = `${amountVal} ${formCurrency.value} = ${totalExRate} ${toCurrency.value}`;
  }).catch ((err) =>{
    console.log(err)
    exchangeRateTxt.innerText = "something went wrong";
  });
}

