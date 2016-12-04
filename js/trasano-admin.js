/*************************************************************************************************************
*
* Project: Trasano-Admin
* author: @rvallinot 
*
**************************************************************************************************************/

/*************************************************************************************************************
* CHARTS functions
**************************************************************************************************************/
/* 
 * Expects: void
 * Returns: Draw claimed services, and status of all services chart
 */
function drawBasicColors() {
    var data = google.visualization.arrayToDataTable([
        ['Servicios', 'Total', { role: 'style' }],
        ['Total', parseInt(localStorage.getItem("numOfServices")), '#2fa4e7'],
        ['Esperando', parseInt(localStorage.getItem("numServicesWaiting")), 'gold'],           
        ['En transito', parseInt(localStorage.getItem("numServicesInTransit")), 'green'],
        ['Reclamados', parseInt(localStorage.getItem("numOfServicesClaimed")), 'red'],
    ]);

    var options = {
        title: 'Estado de los servicios',
        chartArea: {width: '50%'},
        hAxis: {
          title: 'Número de Servicios',
          minValue: 0
        },
        vAxis: {
          title: 'Estados'
        },
        legend: 'none'
    };

    var chart = new google.visualization.BarChart(document.getElementById('chartsDiv'));
    chart.draw(data, options);
}
/* 
 * Expects: void
 * Returns: Draw services status chart
 */
function drawServicesChart() {
    google.charts.load('current', {packages: ['corechart', 'bar']});
    google.charts.setOnLoadCallback(drawBasicColors);
}
/* 
 * Expects: void
 * Returns: Draw claimed services
 */
function drawClaimPieChart() {
    var jsonClaimedServices = JSON.parse(localStorage.getItem("servicesClaimedSorted"));
    var data = google.visualization.arrayToDataTable([
      ['Reclamaciones', 'Número'],
      ['Sin reclamaciones',     jsonClaimedServices[0]],
      ['Reclamados 1 vez',      jsonClaimedServices[1]],
      ['Reclamados 2 veces',  jsonClaimedServices[2]],
      ['Reclamados 3 veces', jsonClaimedServices[3]],
      ['Reclamados 4 o más',    jsonClaimedServices[4]]
    ]);

    var options = {
        title: 'Porcentaje de servicios reclamados',
        width: 900,
        height: 500,
        colors: ['#5cb85c', '#f0d84d', '#f0ad4e', '#d9534f', '#db4df0']
    };

    var chart = new google.visualization.PieChart(document.getElementById('chartsDiv'));

    chart.draw(data, options);
}
/* 
 * Expects: void
 * Returns: Draw claimed services
 */
function drawCancelDonutChart() {
    var jsonCanceledServices = JSON.parse(localStorage.getItem("servicesCanceledSorted"));
    var data = google.visualization.arrayToDataTable([
      ['Reclamaciones', 'Número'],
      ['Vuelta en coche con un familiar',     jsonCanceledServices[5]],
      ['Vuelta en coche con un conocido',      jsonCanceledServices[6]],
      ['Vuelta en taxi',  jsonCanceledServices[7]],
      ['Vuelta en tte público', jsonCanceledServices[8]],
      ['Otros motivos',    jsonCanceledServices[9]]
    ]);

    var options = {
        title: 'Motivo de los servicios cancelados',
        pieHole: 0.4,
        width: 900,
        height: 500,
        colors: ['#5cb85c', '#5bc0de', '#f0ad4e', '#d9534f', '#db4df0']
    };

    var chart = new google.visualization.PieChart(document.getElementById('chartsDiv'));
    chart.draw(data, options);
}
/* 
 * Expects: void
 * Returns: Draw claimed services chart
 */
function drawClaimChart() {
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawClaimPieChart);
}
/* 
 * Expects: void
 * Returns: Draw canceld services chart
 */
function drawCancelChart() {
    google.charts.load("current", {packages:["corechart"]});
      google.charts.setOnLoadCallback(drawCancelDonutChart);
}
/*************************************************************************************************************
* SHOW functions
**************************************************************************************************************/
/* 
 * Expects: void
 * Returns: Print counters info
 */
function printError(message) {
    $("#countersDiv").empty();

    var errorText = "";

    if (message === null || message.length === 0)
    {
        errorText = "Servicio no disponible. Contacte con el Administrador.";
    } else {
        errorText = message;
    }

    $("#countersDiv").append(
        "<div class='alert alert-danger' role='alert'><strong>Error!</strong> " + errorText + "</div>" + 
        "<p><a href='javascript:location.reload();' class='btn btn-primary btn-lg' role='button'>RECARGAR</a></p>");
}
/* 
 * Expects: Name of tab
 * Returns: Print navigation tabs menu
 */
function printNavigationTabs (active) {
    $("#navigationTabs").empty();
    if (active === "service") {
        $("#navigationTabs").append(
            "<ul class='nav nav-tabs'>" + 
                "<li role='presentation' class='active'><a href='#'>Servicios</a></li>" + 
                "<li role='presentation'><a href='pages/claim.html'>Reclamaciones</a></li>" +
                "<li role='presentation'><a href='pages/cancel.html'>Cancelaciones</a></li>" +
            "</ul>");
    }
    if (active === "claim") {
        $("#navigationTabs").append(
            "<ul class='nav nav-tabs'>" + 
                "<li role='presentation'><a href='../index.html'>Servicios</a></li>" + 
                "<li role='presentation' class='active'><a href='#'>Reclamaciones</a></li>" +
                "<li role='presentation'><a href='cancel.html'>Cancelaciones</a></li>" +
            "</ul>");
    }
    if (active === "cancel") {
        $("#navigationTabs").append(
            "<ul class='nav nav-tabs'>" + 
                "<li role='presentation'><a href='../index.html'>Servicios</a></li>" + 
                "<li role='presentation'><a href='claim.html'>Reclamaciones</a></li>" +
                "<li role='presentation' class='active'><a href='#'>Cancelaciones</a></li>" +
            "</ul>");
    }
}
/* 
 * Expects: void
 * Returns: Print counters info
 */
function printCounters(page) {
    $("#countersDiv").empty();
    if (page === "service") { 
        $("#countersDiv").append(
            "<div class='panel panel-default'>" +
                "<div class='panel-heading'>Servicios</div>" + 
                "<li class='list-group-item' id='numOfServices'>" +
                    "<span class='badge'>" + localStorage.getItem("numOfServices") + "</span>Número de servicios" + 
                "</li>" +
                "<li class='list-group-item' id='numAmbulancesWorking'>" +
                    "<span class='badge'>" + localStorage.getItem("numAmbulancesWorking") + "</span>Ambulancias en servicio" +
                "</li>" +
                "<li class='list-group-item' id='numOfPatients'>" +
                    "<span class='badge'>" + localStorage.getItem("numOfPatients") + "</span>Número de usuarios del servicio" + 
                "</li>" + 
            "</div>");
    }
    if (page === "claim") { 
        $("#countersDiv").append(
            "<div class='panel panel-default'>" +
                "<div class='panel-heading'>Servicios</div>" + 
                "<li class='list-group-item' id='numOfServices'>" +
                    "<span class='badge'>" + localStorage.getItem("numOfServices") + "</span>Número de servicios" + 
                "</li>" +
                "<li class='list-group-item' id='numOfPatients'>" +
                    "<span class='badge'>" + localStorage.getItem("numOfPatients") + "</span>Número de usuarios del servicio" + 
                "</li>" + 
            "</div>" + 
            "<div class='panel panel-warning'>" +
                "<div class='panel-heading'>Reclamaciones</div>" +  
                    "<li class='list-group-item' id='numOfServicesClaimed'>" +
                        "<span class='badge'>" + localStorage.getItem("numOfServicesClaimed") + "</span>Número de servicios reclamados" + 
                    "</li>" + 
            "</div>");
    }
    if (page === "cancel") { 
        $("#countersDiv").append(
            "<div class='panel panel-default'>" +
                "<div class='panel-heading'>Servicios</div>" + 
                "<li class='list-group-item' id='numOfCanceled'>" +
                    "<span class='badge'>" + localStorage.getItem("numOfCanceled") + "</span>Número de servicios cancelados" + 
                "</li>" +
            "</div>" + 
            "<div class='panel panel-danger'>" +
                "<div class='panel-heading'>Cancelaciones</div>" +  
                    "<li class='list-group-item' id='avgNumClaim'>" +
                        "<span class='badge'>" + localStorage.getItem("avgNumClaim") + "</span>Media de reclamaciones en servicios cancelados" + 
                    "</li>" + 
            "</div>");
    }   
}
/* 
 * Expects: void
 * Returns: Create div for chart of services
 */
function emptyChartsDiv () {
    $("#chartsDiv").empty();
}
/*************************************************************************************************************
* MODAL functions
**************************************************************************************************************/
/* 
 * Expects: void
 * Returns: Emtpy trasano Modal header, body and footer
 */
function emptyTrasanoModal() {
    $("#trasanoModalHeader").empty();
    $("#trasanoModalBody").empty();
    $("#trasanoModalFooter").empty();
}
/* 
 * Expects: Error given by Web Service
 * Returns: Show trasano modal for error
 */
function showErrorModal(title, error) {
    $("#trasanoModalHeader").empty();
    $("#trasanoModalBody").empty();
    $("#trasanoModalFooter").empty();

    var errorText = error;

    if (errorText.length === 0)
    {
        errorText = "No se ha podido contactar con el servidor";
    }

    $("#trasanoModalHeader").append("<h4>" + title + "</h4>");

    $("#trasanoModalBody").append("<div class='alert alert-danger' role='alert'>" + 
    "<span class='glyphicon glyphicon-alert' aria-hidden='true'></span> " + 
    "<strong>Error!</strong> " + errorText + ".</div>");

    $("#trasanoModalFooter").append("<button type='button' class='btn btn-primary pull-right' data-dismiss='modal'>" + 
        "CERRAR</button>");

    $('#trasanoMODAL').modal('show'); 
}

/*************************************************************************************************************
* TRASANO-WS CALLS for TRASANO-ADMIN
**************************************************************************************************************/
/* 
 * Expects: void
 * Returns: Statistics of the general services
 */
function getAdminServices() {
    emptyTrasanoModal();
    localStorage.clear();
    printNavigationTabs("service");
    var title = "Servicios -> Error";
    $.ajax({
        type: "post",
        dataType: "json",
        contenType: "charset=utf-8",
        data: {},
        url: "http://trasano.org:8080/admin/service",
        error: function (jqXHR, textStatus, errorThrown){
            console.log("Admin.Services.Error: " + textStatus +  ", throws: " + errorThrown);
            showErrorModal(title, errorThrown);
            printError(errorThrown);
        },
        success: function(data) {
            if (data.error.length === 0) {
                console.log("Admin.Services => ");            
                localStorage.setItem("numAmbulancesWorking", data.numAmbulancesWorking);
                localStorage.setItem("numOfPatients", data.numOfPatients);
                localStorage.setItem("numOfServices", data.numOfServices);
                localStorage.setItem("numOfServicesClaimed", data.numOfServicesClaimed);
                localStorage.setItem("numServicesInTransit", data.numServicesInTransit);
                localStorage.setItem("numServicesWaiting", data.numServicesWaiting);

                printCounters("service");
                emptyChartsDiv();
                drawServicesChart();
            } else {
                showErrorModal(title, error); 
            }
        }
    });                    
}
/* 
 * Expects: void
 * Returns: Statistics of the claimed services
 */
function getAdminClaim() {
    emptyTrasanoModal();
    localStorage.clear();
    printNavigationTabs("claim");
    var title = "Reclamaciones -> Error";
    $.ajax({
        type: "post",
        dataType: "json",
        contenType: "charset=utf-8",
        data: {},
        url: "http://trasano.org:8080/admin/claim",
        error: function (jqXHR, textStatus, errorThrown){
            console.log("Admin-requestServiceLittle.Error: " + textStatus +  ", throws: " + errorThrown);
            showErrorModal(title, errorThrown);
            printError(errorThrown);
        },
        success: function(data) {
            if (data.error.length === 0) {
                console.log("Admin.Claim => ");            
                localStorage.setItem("numAmbulancesWorking", data.numAmbulancesWorking);
                localStorage.setItem("numOfPatients", data.numOfPatients);
                localStorage.setItem("numOfServices", data.numOfServices);
                localStorage.setItem("numOfServicesClaimed", data.numOfServicesClaimed);
                localStorage.setItem("numServicesInTransit", data.numServicesInTransit);
                localStorage.setItem("numServicesWaiting", data.numServicesWaiting);
                localStorage.setItem("servicesMoreClaimed", JSON.stringify(data.servicesMoreClaimed));
                localStorage.setItem("servicesClaimedSorted", JSON.stringify(data.servicesClaimedSorted));

                printCounters("claim");
                emptyChartsDiv();
                drawClaimChart();
            } else {
                showErrorModal(title, error); 
            }
        }
    });                    
}
/* 
 * Expects: void
 * Returns: Statistics of the canceled services
 */
function getAdminCancel() {
    emptyTrasanoModal();
    localStorage.clear();
    printNavigationTabs("cancel");
    var title = "Cancelaciones -> Error";
    $.ajax({
        type: "post",
        dataType: "json",
        contenType: "charset=utf-8",
        data: {},
        url: "http://trasano.org:8080/admin/cancel",
        error: function (jqXHR, textStatus, errorThrown){
            console.log("Admin-requestServiceLittle.Error: " + textStatus +  ", throws: " + errorThrown);
            showErrorModal(title, errorThrown);
            printError(errorThrown);
        },
        success: function(data) {
            if (data.error.length === 0) {
                console.log("Admin.Cancel => ");            
                localStorage.setItem("numOfCanceled", data.numOfCanceled);
                localStorage.setItem("avgNumClaim", data.avgNumClaim);

                localStorage.setItem("servicesCanceledSorted", JSON.stringify(data.servicesCanceledSorted));

                printCounters("cancel");
                emptyChartsDiv();
                drawCancelChart();
            } else {
                showErrorModal(title, error); 
            }
        }
    });                    
}

