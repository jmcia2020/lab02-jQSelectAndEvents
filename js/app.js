//this code by Nathan Hall
/* eslint-disable no-trailing-spaces */
'use strict';
const creatures = [];
function Creature (image_url, title, description, keyword, horns, selected){
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  this.selectorTool = selected; 
}

Creature.prototype.render = function(){
  const $template = $('#photo-template').clone().contents();
  const $h2 =$template.find('h2');
  const $image_url = $template.find('img');
  const $p = $template.find('p');

  //Populate the elements
  $h2.text(this.title);
  $image_url.attr('src', this.image_url);
  $p.text(this.description);

  // Add to the page
  $('main').append($template);
};

//json part of demo

//retrieving data from an outside source USE for lab

$.ajax('/data/page-1.json').then(creaturesJSON => {
  console.log(creaturesJSON);
  creaturesJSON.forEach(properties => {
    const creature = new Creature(
      properties.image_url,
      properties.title,
      properties.description,
      properties.keyword,
      properties.horns);
    addSelect(creature.keyword);
    creatures.push(creature);
    console.log(creature);
  });
  for (const creature of creatures) {
    console.log(creature.title);
    creature.render();
  }
});


function addSelect(filter) {
  // eslint-disable-next-line indent
 const selectElement = $('select');  
  const option = $('<option></option>').text(filter);
  let existance=false;
  selectElement.children().each(function(){
    if (this.text === filter){
      existance === true;
    }  
  });
  if (existance){
    return;
  }
  selectElement.append(option);
}

// function updatePage(){

// }

document.getElementById('keywordSelect').addEventListener('change',updatePage);
function updatePage(){
  const $selected = $('#keywordSelect option:selected').text();
  console.log($selected);
  for (const creature of creatures) {
    console.log(creature.keyword);
    if (creature.keyword !== $selected){
      creature.selectorTool.hide();
    }else{
      creature.selectorTool.show();
    }
  }
}




// const selectorTool = $("select option:selected").text();


