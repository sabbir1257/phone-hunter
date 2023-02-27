const loadPhone = async (searchText, dataLimit) => {
  const URL = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(URL);
  const data = await res.json();
  displayPhone(data.data, dataLimit);
};

const displayPhone = (phones, dataLimit) => {
  const phoneContainer = document.getElementById("phones-container");
  phoneContainer.textContent = '';
  // display 20 phones only
  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }

  const noPhone = document.getElementById("no-found-message");
  // display no phone found
  if (phones.length === 0) {
    noPhone.classList.remove("d-none");
  } else {
    noPhone.classList.add("d-none");
  }
  // display all phons
  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
        <div class="card p-4">
              <img src="${phone.image}" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">${phone.phone_name} </h5>
                <p class="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                </p>
                <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
                <p></p>
              </div>
            </div>
        `;
    phoneContainer.appendChild(phoneDiv);
  });
  // stop spinner or loader
  toggleSpinner(false);
};

const procrssSearch = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    loadPhone(searchText, dataLimit);
}

// handle search button click
document.getElementById("btn-search").addEventListener("click", function () {
  // start loader
  procrssSearch(10);
});

// search input field enter key handler
document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        procrssSearch(10);
    }
});

const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

document.getElementById('btn-show-all').addEventListener('click', function(){
    procrssSearch();
})

const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetail(data.data); 
}

const displayPhoneDetail = phone =>{
    console.log(phone);
    const modalTaitle = document.getElementById('phoneDetailModalLabel');
    modalTaitle.innerText = phone.name;
    const phoneModalImg = document.getElementById('phone-modal-img');
    phoneModalImg.innerHTML = `
    <img src="${phone.image}">
    <p class="mt-2">Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'}</p>
    <p>Display Size: ${phone.mainFeatures.displaySize ? phone.mainFeatures.displaySize : 'No Display Size'}</P>
    <p>Memory Size: ${phone.mainFeatures.memory ? phone.mainFeatures.memory : 'No Memory Size'}</P>
    `
    // const phoneModalDetails = document.getElementById('phone-modal-details');
    // phoneModalDetails.innerHTML = `
    // <p>Release Date: ${phone.releaseDate}</p>
    // `
}


loadPhone('apple');
