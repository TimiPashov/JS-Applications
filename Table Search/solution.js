import { html, render } from "./node_modules/lit-html/lit-html.js";
import { rowTemplate } from "./tempplate.js";
import { getAllPll } from "./utility.js"; 


const url = 'http://localhost:3030/jsonstore/advanced/table';
const root = document.querySelector('tbody');
const searchBtn = document.querySelector('button');
searchBtn.addEventListener('click', onSearch);

start();

function onSearch(){
   start();
   document.querySelector('input').value = '';
}

async function start() {
   const input = document.querySelector('input').value;
   const people = await getAllPll(url);
   const pplArr = Object.values(people);
   if (input){
      pplArr.forEach(x=>{
         if(Object.values(x).some(x=>x.toLocaleLowerCase().includes(input.toLocaleLowerCase()))){
            x.matched = true;
         }
         return x;
      });
   
   }else{
      pplArr.forEach(x => x.matched = false);
   } 
   render(pplArr.map(x => rowTemplate(x)), root);
}