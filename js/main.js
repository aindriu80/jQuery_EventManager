let apiKey = "Orva4VnKeXJXMJDHyokKB9frc_DxqbSj";
$(document).ready(function() {
  $("#addEventForm").on("submit", function(e) {
    let event = {
      name: $("#name").val(),
      date: $("#date").val(),
      location: $("#location").val(),
      description: $("#description").val()
    };
    // Create Event
    createEvent(event);

    e.preventDefault();
  });
});

// Before Events Page Loads
$(document).on("pagebeforeshow", "#events", function() {
  getEvents();
});

function createEvent(event) {
  console.log(event);
  axios
    .post(
      "https://api.mlab.com/api/1/databases/eventmanager/collections/events?apiKey=" +
        apiKey,
      {
        name: event.name,
        date: event.date,
        location: event.location,
        description: event.description
      }
    )
    .then(function(response) {
      $("#name").val("");
      $("#date").val("");
      $("#location").val("");
      $("#description").val("");

      $.mobile.changePage("#events");
    })
    .catch(function(error) {
      console.log(error);
    });
}

function getEvents() {
  axios
    .get(
      "https://api.mlab.com/api/1/databases/eventmanager/collections/events?apiKey=" +
        apiKey
    )
    .then(function(response) {
      let events = response.data;

      let output = "";
      $.each(events, function(index, event) {
        output += `
          <li>
            <a onclick="eventClicked('${event._id.$oid})" href="#">
                <h2>${event.name}</h2>
            </a>
          </li>
          `;
      });
      $("#eventList")
        .html(output)
        .listview("refresh");
    })
    .catch(function(error) {
      console.log(error);
    });
}
