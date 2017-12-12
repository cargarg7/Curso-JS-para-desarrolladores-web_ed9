const search = document.getElementById('search');
	
search.addEventListener('click', function(event){ 
    event.preventDefault(); //impide que el click refresque la página, tal como haría por defecto. el event es un parámetro que hace referencia al evento mencionado como primer parámetro del addEventListener, en este caso el 'click'
    let yearOrigin = document.getElementById('start-years').value;
    let yearEnd = document.getElementById('end-years').value;
    let minMagnitude = document.getElementById('magnitudes').value;
		
    getData(yearOrigin,yearEnd,minMagnitude);
});



function getThisYear(){  //extrae el año actual
	let today = new Date(); //devuelve la fecha de hoy
	let thisYear = today.getFullYear(); //extrae el año de today
	
	showYears(thisYear); //llama a la siguiente función
	}

function showYears(upToThisYear){ //muestra en el select los años desde 1990 hasta la actualidad
	
	let allYears = [] //nuevo array donde almacenar los años
	
	for (i=1990; i <= upToThisYear; i++){
		allYears.push(i); //cada iteración llenará el array con un año
	}
	
	allYears.reverse();
    
    let yearSelectOrigin = document.getElementById('start-years');
    
    let yearSelectEnd = document.getElementById('end-years');
	
    allYears.forEach( function(yearInAllYears){ //para cada año del array, añade un option al select
        
        yearSelectOrigin.innerHTML += `<option value="${yearInAllYears}"> ${yearInAllYears} </option>`;
    
    
        yearSelectEnd.innerHTML += `<option value="${yearInAllYears}"> ${yearInAllYears} </option>`
    } );
 	
}

function convertDate(utcSeconds){
    
    var d = new Date(utcSeconds); //crea un objeto con la fecha del evento y lo metemos en una variable
    
    realDate = d.toGMTString(); //convertimos a fecha normal
    
    return realDate;
}


function showMagnitude(){ //muestra las opciones del select de magnitudes
	let magnitudes = [1,2,3,4,5,6,7,8];
	
	let selectMagnitudes = document.getElementById('magnitudes');
	
	magnitudes.forEach( function(magnitudeInMagnitudes){
		selectMagnitudes.innerHTML += `<option value="${magnitudeInMagnitudes}">${magnitudeInMagnitudes}</option>`
	})
}

async function getData(startYear, endYear, magnitude){ //hace la petición y convierte el resultado en json
	let url = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson';
    url += `&minmagnitude=${magnitude}&starttime=${startYear}0101&endtime=${endYear}1231&orderby=time`;
    
    console.log(url);	
	let data = await fetch(url);
	let dataJson = await data.json();
	
    await showData(dataJson);
}

function showData(data){
	
	let eQuakes = data.features;    
    console.log(eQuakes);
    
	placeToShow = document.getElementById('data');
	
	placeToShow.innerHTML = `<h3>Encontrados ${eQuakes.length} terremotos</h3>`
    
    let tenEQuakes = []
    
    for (i = 0; i <= 9; i++){
        
        tenEQuakes.push( eQuakes[i] );
    }
    
    console.log(tenEQuakes);
    
	    
	tenEQuakes.forEach( function(eQuakeInTenEQuakes){
        
        let eqDate = eQuakeInTenEQuakes.properties.time
                
		placeToShow.innerHTML += `
		<ul><li>Fecha: ${ convertDate(eqDate) }</li>
		<li>Localización: ${eQuakeInTenEQuakes.properties.place}</li>
		<li>Magnitud: ${eQuakeInTenEQuakes.properties.mag}</li>
		<li>MMI: ${eQuakeInTenEQuakes.properties.mmi}</li>
		<li><a href="${eQuakeInTenEQuakes.properties.url}">Link al evento</li></ul>
		`
	});
    
    showPages(eQuakes);
}

function showPages(data){
    
    let pages = document.getElementById('num-page');
    pages.innerHTML = 'Página 1';
    
}




getThisYear();
showMagnitude();


