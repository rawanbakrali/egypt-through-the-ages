
// ---- icons used for the activity feed + review stars ----
var iconHeart = '<svg viewBox="0 0 24 24"><path d="M12 20.5s-7.5-4.7-7.5-10.2A4.5 4.5 0 0 1 12 6.9a4.5 4.5 0 0 1 7.5 3.4C19.5 15.8 12 20.5 12 20.5z" fill="currentColor"/></svg>';
var iconBookmark = '<svg viewBox="0 0 24 24"><path d="M6 3.5h12v17l-6-3.6-6 3.6v-17z" fill="currentColor"/></svg>';
var iconEye = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>';
var iconCheck = '<svg viewBox="0 0 24 24"><path d="M4 12.5l5 5 11-11" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>';
var iconStarFull = '<svg viewBox="0 0 24 24"><path d="M12 2.5l2.9 6.2 6.7.7-5 4.6 1.4 6.7L12 17.3 5.9 20.7 7.3 14 2.4 9.4l6.7-.7z" fill="currentColor"/></svg>';
var iconStarEmpty = '<svg viewBox="0 0 24 24"><path d="M12 2.5l2.9 6.2 6.7.7-5 4.6 1.4 6.7L12 17.3 5.9 20.7 7.3 14 2.4 9.4l6.7-.7z" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>';

// ---- sample data used for stats / activity feed / reviews (no images needed here) ----
var places = [
  { id: "khafre",     name: "Pyramid of Khafre",  location: "Giza Plateau", category: "Ancient Egypt - Pyramids", status: "favorite",           rating: 5, date: "2025-05-18" },
  { id: "karnak",      name: "Karnak Temple",      location: "Luxor",        category: "Ancient Egypt - Temples",  status: "favorite",           rating: 5, date: "2025-05-16" },
  { id: "rifai",       name: "Al-Rifa'i Mosque",   location: "Cairo",        category: "Islamic Era - Mosques",    status: "wishlist",           rating: 4, date: "2025-05-15" },
  { id: "egmuseum",    name: "Egyptian Museum",    location: "Cairo",        category: "Museums",                  status: "currently-visiting", rating: 0, date: "2025-05-14" },
  { id: "abusimbel",   name: "Abu Simbel Temples", location: "Aswan",        category: "Ancient Egypt - Temples",  status: "wishlist",           rating: 0, date: "2025-05-13" },
  { id: "hanging",     name: "Hanging Church",     location: "Cairo",        category: "Coptic Era - Churches",    status: "favorite",           rating: 4, date: "2025-05-10" },
  { id: "philae",      name: "Philae Temple",      location: "Aswan",        category: "Ancient Egypt - Temples",  status: "wishlist",           rating: 0, date: "2025-05-09" },
  { id: "citadel",     name: "Cairo Citadel",      location: "Cairo",        category: "Islamic Era - Fortresses", status: "visited",            rating: 4, date: "2025-05-08" }
];

var reviews = [
  { placeId: "abusimbel", text: "Absolutely breathtaking. The precision of ancient Egyptian architecture never ceases to amaze me.", time: "2 days ago" },
  { placeId: "rifai", text: "A masterpiece of Islamic architecture. The interior details are stunning.", time: "1 week ago" },
  { placeId: "karnak", text: "Incredible history and atmosphere, especially during sunset.", time: "2 weeks ago" }
];

// current profile info (changes when the Edit Profile form is submitted)
var profile = {
  name: "Nour Hassan",
  handle: "nour.hassan",
  bio: "History lover. Exploring Egypt one era at a time.",
  location: "Cairo, Egypt",
  joined: "May 2025"
};

// current settings for the Lists tab
var currentFilter = "all";
var currentSort = "recent";
var currentView = "grid";

//  small helper functions 

function findPlace(id) {
  for (var i = 0; i < places.length; i++) {
    if (places[i].id === id) {
      return places[i];
    }
  }
  return null;
}

function formatDate(dateString) {
  var d = new Date(dateString);
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
}

function getStatusIcon(status) {
  if (status === "favorite") return iconHeart;
  if (status === "wishlist") return iconBookmark;
  if (status === "visited") return iconCheck;
  return "";
}

function starsHtml(rating) {
  if (rating === 0) {
    return '<span class="no-rating">Not yet rated</span>';
  }
  var html = "";
  for (var i = 1; i <= 5; i++) {
    if (i <= rating) {
      html += '<span class="star is-filled">' + iconStarFull + '</span>';
    } else {
      html += '<span class="star is-empty">' + iconStarEmpty + '</span>';
    }
  }
  return html;
}

// ---- render functions: these fill in the page with the current data ----

function renderProfile() {
  var initial = profile.name.charAt(0).toUpperCase();
  document.getElementById("avatarInitial").textContent = initial;
  document.getElementById("headerAvatarInitial").textContent = initial;
  document.getElementById("profileName").textContent = profile.name;
  document.getElementById("profileHandle").textContent = "@" + profile.handle;
  document.getElementById("profileBio").textContent = profile.bio;
  document.getElementById("profileLocation").textContent = profile.location;
  document.getElementById("profileJoined").textContent = profile.joined;
}

function renderStats() {
  var visitedCount = 0;
  var favoriteCount = 0;
  var wishlistCount = 0;

  for (var i = 0; i < places.length; i++) {
    var status = places[i].status;
    if (status === "visited" ) visitedCount++;
    if (status === "favorite") favoriteCount++;
    if (status === "wishlist") wishlistCount++;
  }

  document.getElementById("statVisited").textContent = visitedCount;
  document.getElementById("statReviews").textContent = reviews.length;
  document.getElementById("statFavorites").textContent = favoriteCount;
  document.getElementById("statWishlist").textContent = wishlistCount;
}

function renderActivity() {
  // build a simple activity line for each place based on its status
  var feedItems = [];

  for (var i = 0; i < places.length; i++) {
    var p = places[i];
    var text = "";
    if (p.status === "favorite") text = "Added <b>" + p.name + "</b> to Favorites";
    else if (p.status === "wishlist") text = "Added <b>" + p.name + "</b> to Wishlist";
    else if (p.status === "visited") text = "Marked <b>" + p.name + "</b> as visited";

    feedItems.push({ date: p.date, icon: getStatusIcon(p.status), text: text });
  }

  // sort so the most recent date is on top
  feedItems.sort(function (a, b) {
    return b.date.localeCompare(a.date);
  });

  // reviews go at the very top since they only have relative time ("2 days ago")
  for (var j = reviews.length - 1; j >= 0; j--) {
    var r = reviews[j];
    var place = findPlace(r.placeId);
    feedItems.unshift({ date: r.time, icon: iconStarFull, text: "Wrote a review for <b>" + place.name + "</b>" });
  }

  var html = "";
  for (var k = 0; k < feedItems.length; k++) {
    var item = feedItems[k];
    var dateLabel = item.date;
    if (dateLabel.indexOf("-") === 4) { // looks like a yyyy-mm-dd date
      dateLabel = formatDate(item.date);
    }
    html += "<li>";
    html += '<span class="activity-icon">' + item.icon + "</span>";
    html += '<span class="activity-text">' + item.text + "</span>";
    html += '<span class="activity-time">' + dateLabel + "</span>";
    html += "</li>";
  }

  document.getElementById("activityFeed").innerHTML = html;
}

function renderReviews() {
  var html = "";
  for (var i = 0; i < reviews.length; i++) {
    var r = reviews[i];
    var place = findPlace(r.placeId);

    html += '<li class="review-card">';
    html += '<div class="review-card__top">';
    html += "<div>";
    html += '<div class="review-card__place">' + place.name + "</div>";
    html += '<div class="review-card__location">' + place.category + "</div>";
    html += "</div>";
    html += '<div class="review-card__rating">' + starsHtml(place.rating) + "</div>";
    html += "</div>";
    html += '<p class="review-card__text">' + r.text + "</p>";
    html += '<p class="review-card__time">Reviewed ' + r.time + "</p>";
    html += "</li>";
  }
  document.getElementById("reviewFeed").innerHTML = html;
}

// The Lists tab cards already exist as static HTML (with real <img> tags).
// This function only shows/hides and reorders those existing elements -
// it never builds new markup.
function applyListsFilterSortView() {
  var grid = document.getElementById("listsGrid");
  var cards = Array.prototype.slice.call(grid.querySelectorAll(".place-card"));

  // filter: show/hide existing cards based on the selected pill
  var visibleCount = 0;
  for (var i = 0; i < cards.length; i++) {
    var status = cards[i].getAttribute("data-status");
    var show = currentFilter === "all" || status === currentFilter;
    cards[i].hidden = !show;
    if (show) visibleCount++;
  }

  // sort: reorder the same DOM elements, don't recreate them
  cards.sort(function (a, b) {
    if (currentSort === "name") {
      return a.getAttribute("data-name").localeCompare(b.getAttribute("data-name"));
    } else if (currentSort === "rating") {
      return parseFloat(b.getAttribute("data-rating")) - parseFloat(a.getAttribute("data-rating"));
    } else if (currentSort === "location") {
      return a.getAttribute("data-location").localeCompare(b.getAttribute("data-location"));
    } else {
      return b.getAttribute("data-date").localeCompare(a.getAttribute("data-date"));
    }
  });

  for (var j = 0; j < cards.length; j++) {
    grid.appendChild(cards[j]);
  }

  // grid / list view
  if (currentView === "list") {
    grid.classList.add("is-list");
  } else {
    grid.classList.remove("is-list");
  }

  document.getElementById("listsEmpty").hidden = visibleCount !== 0;
}

function renderEverything() {
  renderProfile();
  renderStats();
  renderActivity();
  renderReviews();
  applyListsFilterSortView();
}

// ---- tab switching ----

function showTab(tabName) {
  var tabs = document.querySelectorAll(".tab");
  for (var i = 0; i < tabs.length; i++) {
    if (tabs[i].getAttribute("data-tab") === tabName) {
      tabs[i].classList.add("is-active");
    } else {
      tabs[i].classList.remove("is-active");
    }
  }

  var panels = document.querySelectorAll(".tab-panel");
  for (var j = 0; j < panels.length; j++) {
    if (panels[j].id === "panel-" + tabName) {
      panels[j].classList.add("is-active");
    } else {
      panels[j].classList.remove("is-active");
    }
  }
}

var tabButtons = document.querySelectorAll(".tab");
for (var t = 0; t < tabButtons.length; t++) {
  tabButtons[t].addEventListener("click", function () {
    showTab(this.getAttribute("data-tab"));
  });
}

// ---- filter pills (Lists tab) ----

var pillButtons = document.querySelectorAll(".pill");
for (var p = 0; p < pillButtons.length; p++) {
  pillButtons[p].addEventListener("click", function () {
    for (var i = 0; i < pillButtons.length; i++) {
      pillButtons[i].classList.remove("is-active");
    }
    this.classList.add("is-active");
    currentFilter = this.getAttribute("data-filter");
    applyListsFilterSortView();
  });
}

// ---- sort dropdown ----

document.getElementById("sortSelect").addEventListener("change", function (e) {
  currentSort = e.target.value;
  applyListsFilterSortView();
});

// ---- grid / list view buttons ----

var viewButtons = document.querySelectorAll(".view-btn");
for (var v = 0; v < viewButtons.length; v++) {
  viewButtons[v].addEventListener("click", function () {
    for (var i = 0; i < viewButtons.length; i++) {
      viewButtons[i].classList.remove("is-active");
    }
    this.classList.add("is-active");
    currentView = this.getAttribute("data-view");
    applyListsFilterSortView();
  });
}

// ---- edit profile modal ----

var modal = document.getElementById("modalBackdrop");

function openModal() {
  document.getElementById("inputName").value = profile.name;
  document.getElementById("inputHandle").value = profile.handle;
  document.getElementById("inputBio").value = profile.bio;
  document.getElementById("inputLocation").value = profile.location;
  modal.hidden = false;
}

function closeModal() {
  modal.hidden = true;
}

document.getElementById("editProfileBtn").addEventListener("click", openModal);
document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("modalCancel").addEventListener("click", closeModal);

modal.addEventListener("click", function (e) {
  if (e.target === modal) {
    closeModal();
  }
});

document.getElementById("editProfileForm").addEventListener("submit", function (e) {
  e.preventDefault();

  var newName = document.getElementById("inputName").value.trim();
  var newHandle = document.getElementById("inputHandle").value.trim();

  if (newName !== "") profile.name = newName;
  if (newHandle !== "") profile.handle = newHandle.replace("@", "");
  profile.bio = document.getElementById("inputBio").value.trim();
  profile.location = document.getElementById("inputLocation").value.trim();

  renderProfile();
  closeModal();
  showToast("Profile updated");
});

// ---- toast message ----

var toastTimer = null;

function showToast(message) {
  var toast = document.getElementById("toast");
  toast.textContent = message;
  toast.hidden = false;

  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () {
    toast.hidden = true;
  }, 2400);
}

// ---- run everything when the page loads ----
renderEverything();
