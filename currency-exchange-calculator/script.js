const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("button");
const fromCurrr=document.querySelector(".from select");
const toCurrr=document.querySelector(".to select");
let msg=document.querySelector(".msg");

for(let select of dropdowns){
    for(currCode in countryList){
        // console.log(currCode);
        let newOption = document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);

    });

}
const updateFlag=(element)=>{
    let currCode=element.value;
    console.log(currCode);
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
} 
btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal==="" || amtVal<1){
        amtVal=1;
        amount.value="1";
    }
    console.log(fromCurrr.value);
    const URl=`${BASE_URL}/${fromCurrr.value.toLowerCase()}.min.json`;
   
    let response = await fetch(URl);
    let data=await response.json();
   
    let rate = data[fromCurrr.value.toLowerCase()][toCurrr.value.toLowerCase()];
    console.log(rate);
    msg.innerText=`${amtVal}  ${fromCurrr.value} = ${rate*amtVal}  ${toCurrr.value}`;
});
