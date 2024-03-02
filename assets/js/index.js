$("form").submit(function (event) {
    event.preventDefault();
    const searchTerm = $("#superhero").val().trim();
    if (!searchTerm.match(/^\d+$/)) {
      alert("Por favor, ingresa solo números.");
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
        <p class='h3'>Nombre: ${data.name}</p>
        <p>Conexiones: ${data.connections["group-affiliation"]}</p>
        <p>Publicado por: ${data.biography.publisher}</p>
        <p>Ocupación: ${data.work.occupation}</p>
        <p>Primera Aparición: ${data.biography["first-appearance"]} </p>
        <p>Altura: ${data.appearance.height} </p>
        <p>Peso: ${data.appearance.weight}</p>
        <p>Alianzas: ${data.biography.aliases} </p>`
          
        $('#title').text("SuperHero Encontrado")
        $('#imgSuperHero').html($img);
        $("#infoSuperHero").html(dataHero);

        var options = {
          title: {
              text: "Gráfico de columnas con jQuery CanvasJS",
          },
          legend:{
            cursor: "pointer",
            itemclick: explodePie
          },
          data: [{
              type: "doughnut",
              startAngle: 60,
              indexLabelFontSize: 17,
              showInLegend: true,
              indexLabel: "{label} - {y}",
              toolTipContent: "<b>{label}:</b> {y}",
              dataPoints: [
                { y: data.powerstats["combat"], label: "Combat" },
                { y: data.powerstats["durability"], label: "Durability" },
                { y: data.powerstats["intelligence"], label: "Intelligence" },
                { y: data.powerstats["power"], label: "Power"},
                { y: data.powerstats["speed"], label: "Speed"},
                { y: data.powerstats["strength"], label: "Strength"},
              ],
          }],
        };
  
        // Crear una instancia del gráfico y renderizarlo en el contenedor deseado
        var chart = new CanvasJS.Chart("hero-stats", options);
        chart.render();

      }      
      // Si hay un error en la petición
      
    });
});