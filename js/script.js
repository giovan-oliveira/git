var options = {
    url: function(q) {
        return "https://api.punkapi.com/v2/beers?beer_name=" + q;
    },
    getValue: "name",

    requestDelay: 1000
};

$("#search-input").easyAutocomplete(options);

class BeerAPI {
    constructor() {
        this.apiUrl = 'https://api.punkapi.com/v2/beers'
    }

    searchByName(name, callback) {
        const url = this.apiUrl
        const params = {
            'beer_name': name
        }

        $.getJSON(url, params)
            .done((data) => {
                callback(data)
            })
            .fail((response) => {
                callback(null)
            })
    }
}

class BeerSearch {
    constructor() {
        this.BeerAPI = new BeerAPI()
        this.elements = {
            'form': $('#search-form'),
            'input': $('#search-input'),
            'results': $('#lCervejas')
        }

        this.registerEvents()
    }

    registerEvents() {
        this.elements.form.on('submit', (e) => {
            e.preventDefault()
            const userInput = this.elements.input.val().trim()

            this.BeerAPI.searchByName(
                userInput, (data) => {
                    this.showResults(data)
                }
            )
        })
    }

    showResults(data) {
        this.elements.results.html('')
        if (data.length === 0) {
            this.showError('Esta Cerveja não existe na nossa base de Cervejas!')
        } else {
            $('#error').remove()
            data.forEach((beer) => {
                this.elements.results.append(`
		  <div class="col-lg-4 col-md-6 col-sm-12 mt-4">
			 <div class="card " style="width: 18rem;" button type="button"  data-toggle="modal" data-target="#modalQuickView">

				 <img class="card-img-top smallimg" src="${beer.image_url}">
				  <div class="card-body ">
					  <h5 class="card-title">${beer.name}</h5>
					  <p class="card-text">${beer.description}</p>
                    
                      <!-- Modal: modalQuickView -->
                      <div class="modal fade" id="modalQuickView" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                          <div class="modal-dialog modal-lg" role="document">
                              <div class="modal-content">
                                  <div class="modal-body">

                                  <!-- X PRA FECHAR O POP UP -->

                                  <button type="button" class="close" data-dismiss="modal">
                                     <span>&times;</span>
                                  </button>
                                         
                                  <!--/.X PRA FECHAR O POP UP-->

                                      <div class="row">
                                          <div class="col-lg-5">
                                                   <!--Carousel Wrapper-->
                                             <div id="carousel-thumb" class="carousel slide carousel-fade carousel-thumbnails" data-ride="carousel">
                                                  
                                                   <!--COLOCAR A IMAGEM DA CERVEJA PRINCIPAL-->
                                                  <div class="carousel-inner" role="listbox">
                                                      <div class="carousel-item active">
                                                          <img class="d-block w-100" src="${beer.image_url}">
                                                      </div>
      
                                                  </div>
                                         <!--/.FIM DA CERVEJA PRINCIPAL-->
      
                                             </div>
      
      
                                          <!--/.Carousel Wrapper-->
                                        </div>
                                              <div class="col-lg-7">
                                                  <h2 class="h2-responsive product-name">
                                                      <h3>${beer.name} </h3>
                                                  </h2>
                                                  <h4 class="h4-responsive">
                                                      <span class="green-text">
                                                          <h6>${beer.tagline}</h6>
                                                      </span>
                                                      <span class="grey-text">
                   
                                                      </span>
                                                  </h4>
      
                                                  <!--Accordion wrapper-->
                                                  <div class="accordion md-accordion" id="accordionEx" role="tablist" aria-multiselectable="true">
      
      
      
                                                      <!-- Card body -->
                                                      <div id="collapseOne1" class="collapse show" role="tabpanel" aria-labelledby="headingOne1" data-parent="#accordionEx">
                                                          <div class="card-body">
                                                          ${beer.description}
                                                          </div>
                                                          
                                                      </div>
      
                                                </div>
                                               
      
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
      
                                                      <!-- FIM DO MODAL --> 
                    </div>
                      
			    </div>
		   </div>`)
            })
        }
    }

    showError(message) {
        let alert = $('#error')

        if (alert.length === 0) {
            this.elements.form.before('<div class="alert alert-danger" id="error"></div>')
            alert = $('#error')
        }

        alert.text(message)
    }
}

const beerForm = new BeerSearch()

// Material Select Initialization
$(document).ready(function() {
    $('.mdb-select').materialSelect();
});