/* eslint-disable no-trailing-spaces */
'use strict';
const creatures = [];
function Creature(image_url, title, description, keyword, horns) {
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
}


Creature.prototype.render = function () {
  const photoTemplate = document.getElementById('photo-template').innerHTML;
  const renderedHTML = Mustache.render(photoTemplate, this);
  $('main').append(renderedHTML);

  console.log(renderedHTML);
};

//json part of demo

//retrieving data from an outside source USE for lab
// put in function to empty array and and reload data from page-2json
// create 2 buttons to clear HTML & page and load in dataSet2 

function loadCreatures(dataSet) {
  // clearCreatureData();  TO CREATE!!!!
    // eventlistener onclick <div class="process"><button onclick="process()">Process Template1</button></div>
    // eventlistener onclick <div class="process"><button onclick="process()">Process Template2</button></div>

  $.ajax(dataSet).then(creaturesJSON => {
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

    // clearRenderedHTML(); TO CREATE!!!!

    for (const creature of creatures) {
      creature.render();
    }
  });
}
loadCreatures('/data/page-1.json');

function addSelect(filter) {
  const selectElement = $('select');
  const option = $('<option></option>').text(filter);
  let existance = false;
  selectElement.children().each(function () {
    if (this.text === filter) {
      existance === true;
    }
  });
  if (existance) {
    return;
  }
  selectElement.append(option);
}

document.getElementById('keywordSelect').addEventListener('change', updatePage);
function updatePage() {
  const selectedKeyword = $('#keywordSelect option:selected').text();
  var elements = $('.dataSection');
  for (const element of elements) {
    if ($(element).hasClass(selectedKeyword)) {
      $(element).show();
    }
    else {
      $(element).hide();
    }
  }
}


