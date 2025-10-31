document.addEventListener('DOMContentLoaded', () => {
  // Handle mobile navigation bar toggling
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll('.navbar-burger'), 0
  );

  if ($navbarBurgers.length > 0) {
    $navbarBurgers.forEach($element => {
      $element.addEventListener('click', () => {
        const $target = document.getElementById($element.dataset.target);

        $element.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }
});
