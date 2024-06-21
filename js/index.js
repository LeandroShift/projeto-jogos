const btn = document.querySelector('.btn')
const rts = document.querySelector('.rate-section')
const items = document.querySelectorAll('.item')
const submit =document.querySelector('.submit')
const sucessPopup=document.querySelector('.sucess-popup')
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const selectedItem = document.getElementById('selected-item');



btn.addEventListener('click', () => {
    if (rts.className === "rate-section") {
        rts.classList.add('rate-section-slide')
    }
    else{
        rts.classList.remove('rate-section-slide')
    }
})

items.forEach(item=>{
    item.addEventListener('click',()=>{
        items.forEach(item=>{
            item.classList.remove('active')

        })
        item.classList.add('active')
    })
})


submit.addEventListener('click', ()=>{
    if (sucessPopup.className === "sucess-popup"){
    sucessPopup.classList.add('sucess-popup-slide')
    }
    else{
        sucessPopup.classList.remove('sucess-popup-slide')
    }
})



checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      // Uncheck all other checkboxes
      checkboxes.forEach(cb => {
        if (cb !== this) {
          cb.checked = false;
        }
      });
    });
  });




  function atualizarSelecao() {
    var feedbackSelecionado = [];
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    
    checkboxes.forEach(function(checkbox) {
      var label = checkbox.nextElementSibling.textContent.trim();
      feedbackSelecionado.push(label);
    });
    
    var selecionadosTexto = feedbackSelecionado.length > 0 ? feedbackSelecionado.join(', ') : 'Nenhum item selecionado.';
    document.getElementById('feedback-selecionado').textContent = selecionadosTexto;
  }

  function enviarFormulario() {
    var feedbackSelecionado = [];
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    
    checkboxes.forEach(function(checkbox) {
      feedbackSelecionado.push(checkbox.value);
    });

    alert('Dados selecionados: ' + feedbackSelecionado.join(', '));
    // Aqui você pode fazer algo com os dados selecionados, como enviar via AJAX.
  }


  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      if (this.checked) {
        selectedItem.textContent = `Selecionado: ${this.nextElementSibling.textContent.trim()}`;
      } else {
        selectedItem.textContent = 'Nenhum item selecionado.';
      }
    });
  });