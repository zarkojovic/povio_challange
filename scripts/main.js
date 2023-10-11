var path = window.location.pathname;

console.log(path);

$(document).ready(function () {
  if (path == "/profile.html") {
    printSolutionItems("6", true);
  } else if (path == "/index.html") {
    printSolutionItems("6");
  }

  $("#advancedSearchSection").hide();
  $("#advancedSearchButton").click(function () {
    $("#advancedSearchSection").slideToggle();
    $("#search-arrow").toggleClass("rotate90");
  });

  ajaxCallback("./data/database.json", function (data) {
    localStorage.setItem("objectsForSolutions", JSON.stringify(data));

    function getDistinctStrings(jsonArray) {
      const distinctStrings = new Set();

      jsonArray.forEach((obj) => {
        obj.tags.forEach((str) => {
          distinctStrings.add(str);
        });
      });

      // Convert the Set to an array if needed
      return Array.from(distinctStrings);
    }
    const uniqueStrings = getDistinctStrings(data);

    var classesArray = [
      "badge-blue",
      "badge-green",
      "badge-red",
      "badge-yellow",
      "badge-orange",
      "badge-purple",
      "badge-pink",
      "badge-teal",
      "badge-cyan",
      "badge-indigo",
      "badge-lime",
      "badge-brown",
      "badge-grey",
      "badge-light-blue",
      "badge-light-green",
      "badge-light-grey",
      "badge-light-purple",
      "badge-light-red",
    ];

    const mergedArray = classesArray.map((className, index) => ({
      class: className,
      title: uniqueStrings[index],
    }));

    localStorage.setItem("categoriesObjects", JSON.stringify(mergedArray));

    // console.log(getLS("categoriesObjects"));
  });

  const categoriesObjects = getLS("categoriesObjects");

  var html = ``;

  categoriesObjects.forEach((el, index) => {
    html += `
    <div class="col-sm-6">
    <div class="form-check">
    <input
      class="form-check-input advancedSearchCheckbox"
      type="checkbox"
      id="item${index}"
      name="items"
      value="${el.title}"
    />
    <label class="form-check-label " for="item${index}">
      ${el.title}
    </label>
  </div>
  </div>
  `;

    $("#selectCategoriesnWrap").html(html);
  });

  html = "";

  function ajaxCallback(url, success) {
    $.ajax({
      url: url,
      type: "GET",
      success: success,
      error: function (msg) {
        console.log(msg);
      },
    });
  }
});

function printSolutionItems(rows = "6", user = false) {
  if (rows != "6" && rows != "4") {
    rows = "6";
  }
  var printItmes = getLS("objectsForSolutions");
  var categoriesObjects = getLS("categoriesObjects");
  if (!user) {
    var searchInput = $("#searchBar").val();
    var startDate = $("#startDate").val();
    var endDate = $("#endDate").val();
    var searchInput = $("#searchBar").val();
    var sortItems = $("#sortItems").val();
    if (searchInput.length > 0) {
      printItmes = printItmes.filter((obj) =>
        obj.title.toLowerCase().includes(searchInput.toLowerCase().trim())
      );
    }

    if (startDate) {
      printItmes = printItmes.filter(
        (obj) => new Date(obj.crated_date) > new Date(startDate)
      );
    }
    if (endDate) {
      printItmes = printItmes.filter(
        (obj) => new Date(obj.crated_date) < new Date(endDate)
      );
    }
    var selectedCategories = [];
    $(".advancedSearchCheckbox").each(function () {
      if ($(this).is(":checked")) {
        selectedCategories.push($(this).val());
      }
    });

    if (selectedCategories.length > 0) {
      printItmes = printItmes.filter((obj) =>
        obj.tags.some((tag) => selectedCategories.includes(tag))
      );
    }

    if (sortItems !== "0") {
      switch (sortItems) {
        case "date_asc":
          printItmes = printItmes.sort(
            (a, b) => new Date(b.crated_date) - new Date(a.crated_date)
          );
          break;
        case "date_desc":
          printItmes = printItmes.sort(
            (a, b) => new Date(a.crated_date) - new Date(b.crated_date)
          );
          break;
        case "top_rated":
          printItmes = printItmes.sort((a, b) => b.rating - a.rating);
          break;
        case "low_rated":
          printItmes = printItmes.sort((a, b) => a.rating - b.rating);
          break;
      }
    }
  } else {
    printItmes = printItmes.filter((el) => el.user == "Michael Bell");
  }

  var html = "";
  printItmes.forEach((el) => {
    // Create a Date object from the string
    var date = new Date(el.crated_date);

    // Format the date as "August 15, 2022"
    var formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    html += `<div class="col-sm-${rows}">
                  <div class="card mb-3 border-0 shadow-sm">
                  <a href="single.html" class="text-decoration-none">
                    <div class="card-body">
                      <h5 class="card-title fw-bold text-dark">${el.title}</h5>
                      <p class="card-text small text-muted">
                        ${
                          el.about.length > 100
                            ? el.about.slice(0, 100) + "..."
                            : el.about
                        }
                      </p>
                      <p>`;

    el.tags.forEach((item) => {
      var filteredArray = categoriesObjects.filter(
        (obj) => obj.title === item
      )[0];
      html += `<span class="me-2 small ${filteredArray.class} p-1 no-wrap fw-bold rounded">${filteredArray.title}</span>`;
    });
    html += `
                      </p>
                      <div class="d-flex justify-content-between">
                        <small class="text-muted">${formattedDate}</small>
                        <small class="primary-color">${el.user} ${el.rating} <iconify-icon inline icon="bx:upvote"></iconify-icon></small>
                      </div>
                    </div>
                    </a>
                  </div>
                </div>`;
  });
  $("#solutionsWrap").html(html);
}

$(document).on("change", "#startDate", printSolutionItems);

$(document).on("change", "#endDate", printSolutionItems);

$(document).on("keyup", ".search-input", printSolutionItems);

$(document).on("change", ".advancedSearchCheckbox", printSolutionItems);

$(document).on("change", "#sortItems", printSolutionItems);

function getLS(name) {
  return JSON.parse(localStorage.getItem(name));
}
