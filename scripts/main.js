$(document).ready(function () {
  $("#advancedSearchSection").hide();
  $("#advancedSearchButton").click(function () {
    $("#advancedSearchSection").slideToggle();
    $("#search-arrow").toggleClass("rotate90");
  });

  $.ajax({
    url: "./data/database.json",
    type: "GET",
    success: function (data) {
      console.log(data);
      var html = ``;
      data.forEach((el) => {
        // Create a Date object from the string
        var date = new Date(el.crated_date);

        // Format the date as "August 15, 2022"
        var formattedDate = date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        html += `<div class="col-sm-6">
                    <div class="card mb-3">
                      <div class="card-body">
                        <h5 class="card-title fw-bold">${el.title}</h5>
                        <p class="card-text small">
                          ${
                            el.about.length > 100
                              ? el.about.slice(0, 100) + "..."
                              : el.about
                          }
                        </p>
                        <p>`;
        el.tags.forEach((item) => {
          html += `<span class="me-2 small secondary-bg text-white p-1 no-wrap fw-bold rounded">${item}</span>`;
        });
        html += `
                        </p>
                        <small>${formattedDate}</small>
                      </div>
                    </div>
                  </div>`;
      });

      $("#solutionsWrap").html(html);
    },
  });
});
