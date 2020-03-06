var airportData;
$(document).ready(function() {
  airportData = $('airplaneContainer').DataTable({
    ajax: {
      url: 'api/airports',
      dataSrc: ''
    },
    columns: [
      { data: 'id' },
      { data: 'name' },
      {
        data: null,
        render: function(data, type, row) {
          return '<td><a href="#"><button class="btn btn-danger" airportid="' + data.id + '"></button></a></td>';
        }
      },
      {
        data: null,
        render: function(data, type, row) {
          return '<td> <a href="#"> <i class="btn btn-warning." airportid="' + data.id + '"></button></a></td>';
        }
      }
    ]
  });
});
