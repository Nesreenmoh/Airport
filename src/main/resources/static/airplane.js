// global variables

var airplaneData;
var airplane_id;
var airport_id;

$(document).ready(function() {
  getAllEditAirport();

  airplaneData = $('#airplaneContainer').DataTable({
    ajax: {
      url: 'api/airplanes',
      dataSrc: ''
    },
    columns: [
      { data: 'id' },
      { data: 'name' },
      { data: 'fuel' },
      { data: 'airport.name' },
      {
        data: null,
        render: function(data, type, row) {
          return (
            '<td><a href="#"><button class="btn btn-danger" airplaneid="' +
            data.id +
            '"airportid="' +
            data.airport.id +
            '">Delete</button></a></td>'
          );
        }
      },
      {
        data: null,
        render: function(data, type, row) {
          return (
            '<td><a href="#"><button class="btn btn-info" airplaneid="' +
            data.id +
            '"airportid="' +
            data.airport.id +
            '">Move</button></a></td>'
          );
        }
      },
      {
        data: null,
        render: function(data, type, row) {
          return (
            '<td><a href="#"><button class="btn btn-warning" airplaneid="' +
            data.id +
            '"airportid="' +
            data.airport.id +
            '">Refill</button></a></td>'
          );
        }
      }
    ]
  });

  getAirplane();
  // add event on delete plane button
  $('#airplaneContainer').on('click', '.btn.btn-info', function(e) {
    airplane_id = $(this).attr('airplaneid');
    airport_id = $(this).attr('airportid');
    var airportName = e.target.parentNode.parentElement.parentElement.children[1].innerHTML;
    var fuel = e.target.parentNode.parentElement.parentElement.children[2].innerHTML;
    if (fuel < 2) {
      showAlert('You cannot move, you need to refill first', 'error');
    } else {
      $('#editAirpanetName').val(airportName);
      $('#editAirpanetfuel').val(fuel);
      $('#moveModal').show();
    }
  });

  // add event on move button
  $('#airplaneContainer').on('click', '.btn.btn-danger', function() {
    airplane_id = $(this).attr('airplaneid');
    airport_id = $(this).attr('airportid');
    console.log(airplane_id);
    $('#confirm').show();
  });

  // add event on Refill button
  $('#airplaneContainer').on('click', '.btn.btn-warning', function(e) {
    airplane_id = $(this).attr('airplaneid');
    airport_id = $(this).attr('airportid');
    var name = e.target.parentNode.parentElement.parentElement.children[1].innerHTML;
    var fuel = e.target.parentNode.parentElement.parentElement.children[2].innerHTML;
    refillAirplane(name, fuel);
  });

  $('#add').click(function() {
    var name = $('name').val();
    var fuel = $('fuel').val();
    var airportName = $('#airportName').val();

    if (name === '' || fuel === '' || airportName === '') {
      alert('Please fill in the data!');
    } else {
      addAirplane();
    }
  });
  $('#closeConfirm').click(function() {
    $('#confirm').hide();
  });
  $('#yesBtn').click(function() {
    deleteAirplane();
    $('#confirm').hide();
  });
  $('#closeOK').click(function() {
    $('#error').hide();
  });
  $('#closeError').click(function() {
    $('#error').hide();
  });
  $('.closeBtn').click(function() {
    $('#confirm').hide();
  });
  $('#dismissbtn').click(function() {
    $('#moveModal').hide();
  });
  $('.closeMove').click(function() {
    $('#moveModal').hide();
  });
  $('#move').click(function() {
    moveAirplane();
    $('#moveModal').hide();
  });
});

// define a move function
function moveAirplane() {
  var airplane = {
    id: airplane_id,
    name: $('#editAirpanetName').val(),
    fuel: $('#editAirpanetfuel').val(),
    airport: {
      id: $('#airportEditName').val()
    }
  };

  var jsonObject = JSON.stringify(airplane);
  console.log(jsonObject);
  $.ajax({
    url: 'api/airplanes/' + airplane_id + '/move',
    type: 'PUT',
    data: jsonObject,
    contentType: 'application/json',
    success: function() {
      showAlert('An Airplane moved', 'success');
      $('#moveModal').hide();
      getAirplane();
    },
    error: function() {
      showAlert('Sorry, something went wrong!', 'error');
    }
  });
}

// refill Airplane Function
function refillAirplane(name, fuel) {
  var airplane = {
    id: airplane_id,
    name: name,
    fuel: fuel,
    airport: {
      id: airport_id
    }
  };

  var jsonObject = JSON.stringify(airplane);

  $.ajax({
    url: 'api/airplanes/' + airplane_id + '/refill',
    type: 'PUT',
    data: jsonObject,
    contentType: 'application/json',
    success: function() {
      showAlert('An Airplane is refilled', 'success');
      getAirplane();
    },
    error: function() {
      showAlert('Sorry, something went wrong!', 'error');
    }
  });
}
// function to get all airport

function getAllEditAirport() {
  $.get('api/airports', function(airports) {
    $('airportEditName').empty();
    //$('#airportEditName').append('<option></option>');
    $('#airportName').empty();
    $('#airportName').append('<option></option>');
    for (var i = 0; i < airports.length; i++) {
      $('#airportName').append(new Option(`${airports[i].name}`, `${airports[i].id}`));
      $('#airportEditName').append(new Option(`${airports[i].name}`, `${airports[i].id}`));
    }
  });
}
// add airplane function

function addAirplane() {
  var airplane = {
    name: $('#name').val(),
    fuel: $('#fuel').val(),
    airport: {
      id: $('#airportName').val()
    }
  };
  var jsonObject = JSON.stringify(airplane);
  $.ajax({
    url: 'api/airplanes',
    type: 'POST',
    contentType: 'application/json',
    data: jsonObject,
    success: function() {
      showAlert('A Airplane has been Added!', 'success');
      getAirplane();
    },
    error: function() {
      showAlert('Invalid Input', 'error');
    }
  });
}

// get all airplane function
function getAirplane() {
  airplaneData.ajax.reload();
}

//delete airplane
function deleteAirplane() {
  $.ajax({
    url: 'api/airplanes/' + airplane_id,
    type: 'DELETE',
    success: function() {
      showAlert('An Airplane is Deleted!', 'success');
      getAirplane();
    },
    error: function() {
      showAlert('Sorry, Something wrong went on!', 'error');
    }
  });
}

//show alert function
function showAlert(msg, myclass) {
  if (myclass === 'error') {
    $('.modal-title').html('');
    $('.modal-title').html('Error');
    $('#error').show();
    $('#message').text('');
    $('#message').append(msg);
  } else {
    $('.modal-title').html('');
    $('.modal-title').html('Success');
    $('#message').text('');
    $('#message').append(msg);
    $('#error').show();
  }
}
