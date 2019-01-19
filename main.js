// Check if all images are loaded //
$('.container').imagesLoaded({ background: true }, () => {
  $('body').addClass('loaded');
});

// jQuery scroll logic
// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function (event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') ===
        this.pathname.replace(/^\//, '') &&
      location.hostname === this.hostname
    ) {
      // Figure out element to scroll to
      let target = $(this.hash);
      target = target.length ? target : $(`[name=${this.hash.slice(1)}]`);
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate(
          {
            scrollTop: target.offset().top,
          },
          1000,
          () => {
            // Callback after animation - Must change focus!
            const $target = $(target);
            $target.focus();
            if ($target.is(':focus')) {
              // Checking if the target was focused
              return false;
            } else {
              $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            }
          },
        );
      }
    }
  });

// Chatty modal logic
const chattyModal = document.getElementById('chattyModal');
const chattyModalBtn = document.getElementById('chattyModalBtn');
const chattyCloseBtn = document.getElementsByClassName('closeBtn')[1];

chattyModalBtn.onclick = () => {
  chattyModal.style.display = 'block';
};

chattyCloseBtn.onclick = () => {
  chattyModal.style.display = 'none';
};

// RoadieSounds modal logic
const roadieModal = document.getElementById('roadieModal');
const roadieModalBtn = document.getElementById('roadieModalBtn');
const roadieCloseBtn = document.getElementsByClassName('closeBtn')[0];

roadieModalBtn.onclick = () => {
  roadieModal.style.display = 'block';
};

roadieCloseBtn.onclick = () => {
  roadieModal.style.display = 'none';
};

// Schooodle modal logic
const schooodleModal = document.getElementById('schooodleModal');
const schooodleModalBtn = document.getElementById('schooodleModalBtn');
const schooodleCloseBtn = document.getElementsByClassName('closeBtn')[3];

schooodleModalBtn.onclick = () => {
  schooodleModal.style.display = 'block';
};

schooodleCloseBtn.onclick = () => {
  schooodleModal.style.display = 'none';
};

// Jungle modal logic
const jungleModal = document.getElementById('jungleModal');
const jungleModalBtn = document.getElementById('jungleModalBtn');
const jungleCloseBtn = document.getElementsByClassName('closeBtn')[2];

jungleModalBtn.onclick = () => {
  jungleModal.style.display = 'block';
};

jungleCloseBtn.onclick = () => {
  jungleModal.style.display = 'none';
};

// Universal modal close on outside click
document.onclick = (e) => {
  if (
    e.target === chattyModal ||
    e.target === roadieModal ||
    e.target === schooodleModal ||
    e.target === jungleModal
  ) {
    e.target.style.display = 'none';
  }
};

// Serverless AWS Form
(() => {
  const form = document.querySelector('form');
  const success = document.querySelector('success');
  const fail = document.querySelector('error');

  form.onsubmit = (e) => {
    e.preventDefault();

    // Prepare data to send
    const data = {};
    const formElements = Array.from(form);
    formElements.map(input => (data[input.name] = input.value));

    // Log what our lambda function will receive
    console.log(JSON.stringify(data));

    // New HTTP request
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action, true);
    xhr.setRequestHeader('Accept', 'application/json: charset=utf-8');
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    // Send data
    xhr.send(JSON.stringify(data));

    // Callback
    xhr.onloadend = (response) => {
      if (response.target.status === 200) {
        form.reset();
        success.fadeIn(500).show();
        setTimeout(() => {
          success.fadeOut('slow');
        }, 2000);
      } else {
        fail.fadeIn(500).show();
        setTimeout(() => {
          fail.fadeOut('slow');
        }, 2000);
        console.error(JSON.parse(response.target.response).message);
      }
    };
  };
})();
