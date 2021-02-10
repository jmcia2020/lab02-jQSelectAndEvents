/* eslint-disable no-trailing-spaces */
'use strict';
const creatures = [];
function Creature (image_url, title, description, keyword, horns){
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
}

Creature.prototype.render = function(){
  const template = $('#photo-template').clone().contents();
  template.attr('id', 'photo-template-new');
  template.attr('class', this.keyword);
  const h2 =template.find('h2');
  const image_url = template.find('img');
  const p = template.find('p');

  //Populate the elements
  h2.text(this.title);
  image_url.attr('src', this.image_url);
  p.text(this.description);

  // Add to the page
  $('main').append(template);
};

//json part of demo

//retrieving data from an outside source USE for lab

$.ajax('/data/page-1.json').then(creaturesJSON => {
  creaturesJSON.forEach(properties => {
    const creature = new Creature(
      properties.image_url,
      properties.title,
      properties.description,
      properties.keyword,
      properties.horns);
    addSelect(creature.keyword);
    creatures.push(creature);
  });
  for (const creature of creatures) {
    creature.render();
  }
});


function addSelect(filter) {
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

document.getElementById('keywordSelect').addEventListener('change',updatePage);

function updatePage(){
  const selectedKeyword = $('#keywordSelect option:selected').text();
  var elements = $('[id="photo-template-new"]');
  for( const element of elements){
    if ( $(element).hasClass(selectedKeyword)){
      $(element).show();
    }
    else{
      $(element).hide();
    }
  }
}


