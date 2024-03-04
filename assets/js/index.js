$("form").submit(function (event) {
    event.preventDefault();
    const searchTerm = $("#superhero").val().trim();
    if (!searchTerm.match(/^\d+$/)) {
      /* alert("Por favor, ingresa solo números."); */
      $("#superhero").tooltip({
        title: "Por favor, ingresa solo números.",
        placement: "top",
        trigger: "manual"
      });
      $("#superhero").tooltip("show");
      // Oculta el tooltip después de un cierto período de tiempo
      setTimeout(function() {
          $("#superhero").tooltip("hide");
      }, 3000);
      return;
    }

    const apiKey = "4905856019427443";
    const apiUrl = `https://superheroapi.com/api.php/${apiKey}/${searchTerm}`;

    // Hacer la petición a la API
    $.ajax({
      type:"GET",
      url:apiUrl,
      dataType:"json",
      success: function(data) {
        console.log(data);
        const $img = $("<img class='img-fluid mx-auto'>");
        $img.attr("src", data.image.url);
        const dataHero =`
        <p class='h3 mb-5 border-bottom'>Nombre: ${data.name}</p>
        <p class="lh-sm">Conexiones: ${data.connections["group-affiliation"]}</p>
        <p class="lh-sm">Publicado por: ${data.biography.publisher}</p>
        <p class="lh-sm">Ocupación: ${data.work.occupation}</p>
        <p class="lh-sm">Primera Aparición: ${data.biography["first-appearance"]} </p>
        <p class="lh-sm">Altura: ${data.appearance.height} </p>
        <p class="lh-sm">Peso: ${data.appearance.weight}</p>
        <p class="lh-sm">Alianzas: ${data.biography.aliases} </p>`
          
        $('#title').text("SuperHero Encontrado")
        $('#imgSuperHero').html($img);
        $("#infoSuperHero").html(dataHero);

        var options = {
          title: {
              text: 'Estadisticas de poder para ' + data.name,
          },
          data: [{
              type: "doughnut",
              startAngle: 60,
              indexLabelFontSize: 17,
              showInLegend: true,
              indexLabel: "{label} - {y}",
              toolTipContent: "<b>{label}:</b> {y}",
              dataPoints: [
                { y: data.powerstats["combat"], legendText: "Combat", label: "Combat" },
                { y: data.powerstats["durability"], legendText: "Durability", label: "Durability" },
                { y: data.powerstats["intelligence"], legendText: "Intelligence", label: "Intelligence" },
                { y: data.powerstats["power"], legendText: "Power", label: "Power"},
                { y: data.powerstats["speed"], legendText: "Speed", label: "Speed"},
                { y: data.powerstats["strength"], legendText: "Strength", label: "Strength"},
              ],
          }],
        };
  
        // Crear una instancia del gráfico y renderizarlo en el contenedor deseado
        var chart = new CanvasJS.Chart("hero-stats", options);
        chart.render();

      },      
      error: function(data) {
        //esta función se activa si ocurrealgún error durante el proceso
        console.log("Ha ocurrido un error");
      
      },
      async: true,
    });
});