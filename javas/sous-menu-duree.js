<script>
  document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll(".dropdownmenu li.has-submenu");

    menuItems.forEach((item) => {
      let submenu = item.querySelector(".sous-menu");

      item.addEventListener("mouseenter", function () {
        submenu.style.display = "block";
      });

      // Utilisez l'événement mouseleave sur le menu principal
      item.addEventListener("mouseleave", function () {
        // Utilisez l'événement mouseenter sur le sous-menu
        submenu.addEventListener("mouseenter", function () {
          submenu.style.display = "block";
        });

        // Utilisez l'événement mouseleave sur le sous-menu pour le cacher
        submenu.addEventListener("mouseleave", function () {
          submenu.style.display = "none";
        });
      });
    });
  });
</script>
