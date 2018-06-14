let apiKey = 'Orva4VnKeXJXMJDHyokKB9frc_DxqbSj'
$(document).ready(function () {
    $('#addEventForm').on('submit', function (e) {
        let event = {
            name: $('#name').val(),
            date: $('#date').val(),
            location: $('#location').val(),
            description: $('#description').val(),
        }
        // Create Event
        createEvent(event);

        e.preventDefault()
    });
});

function createEvent(event) {
    console.log(event);
    axios.post('https://api.mlab.com/api/1/databases/eventmanager/collections/events?apiKey=' + apiKey, {
            name: event.name,
            date: event.date,
            location: event.location,
            description: event.description
        })
        .then(function (response) {
            $('#name').val('');
            $('#date').val('');
            $('#location').val('');
            $('#description').val('');

      $.mobile.changePage('#events');
    })
    .catch(function(error){
      console.log(error);
    });
}