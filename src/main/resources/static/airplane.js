// global variables

var airplaneData;
var airplane_id;

$(document).ready(function() {
  getAllAirport();

  airplaneData = $('#airplaneContainer').DataTable({
    ajax: {
      url: 'api/airplanes',
      dataSrc: ''
    },
    columns: [
      { data: 'id' },
      { data: 'name' },
      { data: 'fuel' },
      { data: '' },
      {
        data: null,
        render: function(data, type, row) {
          return '<td><a href="#"><button class="btn btn-danger" airplaneid="' + data.id + '"> Delete </button></a></td>';
        }
      },
      {
        data: null,
        render: function(data, type, row) {
          return '<td> <a href="#"> <button class="btn btn-warning" airplaneid="' + data.id + '"> Update </button></a></td>';
        }
      }
    ]
  });

  getAirplane();

  $('#airplaneContainer').on('click', 'btn.btn.danger', function() {
    airplane_id = $(this).attr('airplaneid');
    console.log(airplane_id);
    // $('#confirm').show();
  });
  $('#add').click(function() {
    var name = $('name').val();
    var fuel = $('fuel').val();

    if (name === '' || fuel === '') {
      alert('Please fill in the data!');
    } else {
      addAirplane();
    }
  });
});

// function to get all airport
function getAllAirport() {
  $.get('api/airports', function(airports) {
    $('#airportName').empty();
    $('#airportName').append('<option></option>');
    for (var i = 0; i < airports.length; i++) {
      var option = document.createElement('option');
      option.text = `${airports[i].name}`;
      option.value = `${airports[i].id}`;
      $('#airportName').append(option);
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
      alert('A Airplane has been Added!', 'success');
      getAirplane();
    },
    error: function() {
      alert('Invalid Input', 'error');
    }
  });
}

// get all airplane function
function getAirplane() {
  airplaneData.ajax.reload();
}
