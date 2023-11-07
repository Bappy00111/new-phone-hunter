const loadedData = (suschText) =>{
    const URL = `https://openapi.programming-hero.com/api/phones?search=${suschText}`
    fetch(URL)
    .then(res => res.json())
    .then(data => displayData(data.data))
}

const displayData = (phones) =>{
    console.log(phones); 
    const PhoneContaienr = document.getElementById('phone-container');
    PhoneContaienr.innerHTML = '';
  
    // phone slice only 20 
    const showAll = document.getElementById('show-all')
    if(phones.length > 10){
        phones = phones.slice(0,10);
        showAll.classList.remove('hidden')
    }else{
        showAll.classList.add('hidden')
    }
    

      //display  no phone founded  
      const noPhoneFound = document.getElementById('no-phone-found');
      if(phones.length === 0){
        noPhoneFound.classList.remove('hidden')
      }else{
        noPhoneFound.classList.add('hidden')
      }

    // display all phones 
    phones.forEach(phone => {
        console.log(phone);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card w-96 bg-base-100 shadow-xl">
        <figure class="px-10 pt-10">
          <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>${phone.brand}</p>
          <div class="card-actions">
          <label onclick="loadPhoneDetel('${phone.slug}')"  for="my_modal_6" class="btn btn-primary">open modal</label>
          </div>
        </div>
      </div>
        `
    PhoneContaienr.appendChild(div);
        
    });

    // stop loader 
    lodder(false)
}

// button  susch filed  

const loaderData = () =>{
  lodder(true)
  const inputeFiled =  document.getElementById('inpute-susch');
  const inputeFiledValue = inputeFiled.value;
  loadedData(inputeFiledValue)
  inputeFiled.value = '';
}

const butonSusch = () =>{
    // start loader 
  // lodder(true)
  // const inputeFiled =  document.getElementById('inpute-susch');
  // const inputeFiledValue = inputeFiled.value;
  // loadedData(inputeFiledValue)
  // inputeFiled.value = '';

  loaderData()
}

// susch inpute filed enter key handler 
document.getElementById('inpute-susch').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    
    loaderData()
  }
});

const lodder = (lodding) =>{
    const loader = document.getElementById('loader');
    if(lodding){
        loader.classList.remove('hidden')
    }else{
        loader.classList.add('hidden')
    }
}



const loadPhoneDetel = (slug) =>{
  const URL = `https://openapi.programming-hero.com/api/phone/${slug}`
  fetch(URL)
  .then(res => res.json())
  .then(data => showPhoneDetel(data.data))
}

const showPhoneDetel = (data) =>{
  console.log(data);
  // const modalContainer = document.getElementById('modal-container')
  const phoneName = document.getElementById('phone-name');
  phoneName.innerText = data.name;
 
  const relaseDate = document.getElementById('reales');
  relaseDate.innerHTML = `
  <p>releaseDate:${data.releaseDate ? data.releaseDate : 'No releaseDate'}
  </p>
  `
  

 
  
}



// loadedData()