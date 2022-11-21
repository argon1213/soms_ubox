/**
 * functions for modals
 */

 function openModal( content_element, clicked_element, fn ) {

    // create the modal element and insert the content.  Give the modal a unique ID so that modals can be opened from within modals ;)
    const el_ID = 'modal'+Math.floor(Math.random()*100000);
    const modal_element = document.createElement('div');
    modal_element.setAttribute('id', el_ID); 
    modal_element.className = 'modal';
    modal_element.appendChild(content_element);

    // add a close button to the modal
    const close_button = document.createElement('div');
    close_button.className = 'close-button';
    modal_element.appendChild(close_button);

    // add and display an overlay (unless one is already there)
    if( document.querySelector('.modal--overlay') === null ){
        addOverlay();
    }

    // display the modal
    document.querySelector('body').appendChild(modal_element);
    modal_element.classList.add('show');

    // attach a close event to the close button
    close_button.addEventListener('click', () => {
        closeModal(el_ID);
    });

    // now that the modal has been built, remove the click event from the element that originally opened the modal
    // and replace it with a simpler event function that will just show the existing modal 

    // clicked_element.removeEventListener('click', fn);
    // clicked_element.addEventListener('click', () => {
    //     reOpenModal( el_ID );
    // });
    
}

function closeModal(el_ID){
    document.getElementById(el_ID).classList.remove('show');
    if( document.querySelector('.modal.show') === null ){
        removeOverlay();
    }
}

function reOpenModal( el_ID ){
    document.getElementById(el_ID).classList.add('show');
    if( document.querySelector('.modal--overlay') === null ){
        addOverlay();
    }
}

function addOverlay(){
    const overlay = document.createElement('div');
    overlay.className = 'modal--overlay';
    document.querySelector('body').appendChild(overlay);
}

function removeOverlay(){
    document.querySelector('.modal--overlay').remove();
}

export {openModal}