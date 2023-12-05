

const loadData = () => {
  toggleSpinner(true)
  
  fetch(`https://openapi.programming-hero.com/api/ai/tools`)
    .then(res => res.json())
    .then(data => showData(data.data.tools.slice(0,6)))
    
}
const loadData2 = () => {
  const showAll = document.getElementById('show-all');
  showAll.classList.add('d-none')
  fetch(`https://openapi.programming-hero.com/api/ai/tools`)
    .then(res => res.json())
    .then(data => showData(data.data.tools))
}

const sortDataByDate = () => {
  toggleSpinner(true)
  fetch(`https://openapi.programming-hero.com/api/ai/tools`)
    .then(res => res.json())
    .then(data => {
      // Sort the data by date
      const sortedData = data.data.tools.slice().sort((a, b) => new Date(a.published_in) - new Date(b.published_in));
      showData(sortedData);
    });
}


const showData = (datas) => {
  
  
  console.log(datas)
  const gridContainer = document.getElementById('grids')
  gridContainer.innerHTML=''
  
  datas.forEach(data => {
    const contentDiv = document.createElement('div')

    contentDiv.innerHTML = `
        <div class="col">
        <div class="card container">
          <img class="rounded mt-2" src="${data.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title"><b>Features</b></h5>
            
            
                <li>${data.features[0]}</li>
                <li>${data.features[1]}</li>
                <li>${data.features[2]}</li>
                <hr>
                <div class="d-flex justify-content-between">
                     <div>
                         <h5><b>${data.name}</b></h5>
                         <i class="fa-solid fa-calendar-days d-inline"></i>
                         <p class="d-inline ms-2">${data.published_in}</p>
                         

                        
                    </div>
                    <div>
                        <button onclick="loadDetails('${data.id}')" class="rounded-circle mt-2" data-bs-toggle="modal" data-bs-target="#exampleModal" style='background-color:#2C3335'><i class="fa-solid fa-arrow-right" style="color: #dc1818;"></i></button>
                     </div>

                </div>
                
                
            
            
          </div>
        </div>
      </div>

       
        
        
        `;
    gridContainer.appendChild(contentDiv)


  })
  toggleSpinner(false)
  
  



}
loadData()




const loadDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(url);
  const data = await res.json()
  displayDetails(data);

}
const displayDetails = (data) => {
  
  console.log(data)
  const modalBody = document.getElementById('modal-body');
  modalBody.innerHTML = `
  <div class="row row-cols-1 row-cols-md-2 g-4">
    <div class="col">
      <div class="card">
        
        <div class="card-body">
          <h5 class="card-title">${data.data.description}</h5>
          <div class="d-flex justify-content-around mt-4">
        <div class="subscription text-success text-warning fw-bold d-flex align-items-center">
        <div class="mx-auto">
        <p>${data.data.pricing[0].price ? data.data.pricing[0].price : "Free of Cost"}</p>
        <p>${data.data.pricing[0].plan}</p>
    </div>
        </div>
        <div class="subscription text-success text-success fw-bold d-flex align-items-center">
        <div class="mx-auto">
        <p>${data.data.pricing[1].price}</p>
        <p>${data.data.pricing[1].plan}</p>
    </div>
        </div>
        <div class="subscription text-danger fw-bold d-flex align-items-center">
        <div class="ms-2">
        <p>${data.data.pricing[2].price}</p>
        <p>${data.data.pricing[2].plan}</p>
    </div>
    
        </div>
        
    </div>
    <div  class="d-flex justify-content-between mt-4">
    <div id="fi">
    <h5>Integrations</h5>
    </div>
    <div id="features">
    <h5>Features</h5>
        <li>${data.data.features[1].feature_name}</li>
        <li>${data.data.features[2].feature_name}</li>
        <li>${data.data.features[3].feature_name}</li>
       
    </div>
    
    
 </div>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card">
        <div>
        <img src="${data.data.image_link[0]}" class="card-img-top position-relative rounded" alt="...">
        <p id="accuracy" class="position-absolute top-0 end-0 mt-2 rounded text-center">${data.data.accuracy.score ?data.data.accuracy.score : `` }</p>
        </div>
        <div class="card-body">
          <h4 class="card-title text-center">${data.data.input_output_examples[0].input}</h4>
          <p class="card-text text-center">${data.data.input_output_examples[0].output}</p>
        </div>
      </div>
    </div>
   
  </div>

  
  
  `;
  
  const fi = document.getElementById('fi')
  const inte = document.createElement('div');
  data.data.integrations.forEach(data => {
    inte.innerHTML += `
    
        <li>${data}</li>
        
    
    
    
    `;
    fi.appendChild(inte)
  })


  



}
function toggleSpinner(isLoading){
  const loaderSection = document.getElementById('loader');
  if (isLoading) {
      loaderSection.classList.remove('d-none')
  }
  else {
      loaderSection.classList.add('d-none')
  }


}






