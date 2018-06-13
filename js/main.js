'use strict';

console.log('Starting up');

function init() {
    renderProj();
    renderModal();
}

function renderProj() {
    var strHTMLs = gProjs.map(function (proj) {
        return `
        <div class="col-md-4 col-sm-6 portfolio-item">
            <a class="portfolio-link" data-toggle="modal" href="#portfolioModal" data-id="${proj.id}">
                <div class="portfolio-hover">
                    <div class="portfolio-hover-content">
                        <i class="fa fa-plus fa-3x"></i>
                    </div>
                </div>
                <img class="img-fluid" src="${proj.img}" alt="">
            </a>
            <div class="portfolio-caption">
                <h4>${proj.name}</h4>
                <p class="text-muted">${proj.title}</p>
            </div>
        </div>`
    });
    var strHTML = strHTMLs.join('');
    document.querySelector('.my-portfolio').innerHTML = strHTML;
}

function renderModal() {
    $('#portfolioModal').on('show.bs.modal', function (event) {
        var elProjClicked = $(event.relatedTarget) // Button that triggered the modal
        var projId = elProjClicked.data('id') // Extract info from data-* attributes
        var proj = gProjs.find(function(proj) {
            return proj.id === projId;
        });
        console.log(proj);
        
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var elModal = $(this);
        var strHTML = `Categories: `
        var lablesStrHTMLs = proj.lables.map(function(lable) {
            return `
            <span class="badge badge-success modal-proj-lables">${lable}</span>`
        });

        strHTML += lablesStrHTMLs.join('');

        elModal.find('.modal-proj-name').text(proj.name);
        elModal.find('.modal-proj-desc').text(proj.desc);
        elModal.find('.modal-proj-title').text(proj.title);
        elModal.find('.modal-proj-date').text(proj.publishedAt);
        elModal.find('.proj-lables').html(strHTML);
        elModal.find('.modal-proj-img').attr('src',proj.img2);
        elModal.find('.modal-proj-link').attr('href',proj.url);
    })
}

function onSubmit() {
    // var contactEmail = $('.contact-me-email').val();
    var contactSubject = $('.contact-me-subject').val();
    var contactbody = $('.contact-me-body').val();
    
    window.location.assign(`https://mail.google.com/mail/?view=cm&fs=1&to=itzikit@gmail.com&su=${contactSubject}&body=${contactbody}`);
    
    // var contactEmail = $('.contact-me-email').val('');
    var contactSubject = $('.contact-me-subject').val('');
    var contactbody = $('.contact-me-body').val('');

    
}