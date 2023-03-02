///////////Creación variable mapa/////////// 
var map = L.map('map', {
		zoomControl: false,
		center: [16, -23.5],
		zoom: 9,
		minZoom: 9,
		maxZoom: 13,
	});




///////////Funcionalidades estructura del visor///////////
//Layers on top
map.createPane('límites');
// This pane is above markers but below popups
map.getPane('límites').style.zIndex = 650;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('límites').style.pointerEvents = 'none';
//Labels on top
map.createPane('labels');
// This pane is above markers but below popups
map.getPane('labels').style.zIndex = 800;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('labels').style.pointerEvents = 'none';
//bindTooltip on top
map.createPane('popups');
// el popup aparece al arrastar encima de todo pero debajo del popup que aparece al clicar
map.getPane('popups').style.zIndex = 1000;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('popups').style.pointerEvents = 'none';
//bindPopup on top
map.createPane('popups1');
// aparece por encima de todas las capas
map.getPane('popups1').style.zIndex = 1500;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('popups1').style.pointerEvents = 'none';
//Barra de interacción de capas	tantaas sildebar como grupos de capas
var sidebar = L.control.sidebar('sidebar', { closeButton:true, position: 'left' });
	map.addControl(sidebar);
	sidebar.hide();			
	sidebar.show();
	sidebar.toggle();
var visible = sidebar.isVisible();
var button = new L.Control.Button(L.DomUtil.get('helpbutton'), { toggleButton: 'active', position: 'topleft'});
	button.addTo(map);
	button.on('click', function () {
	 if (button.isToggled()) {
			sidebar.hide();
		} else {
			sidebar.show();
		}
	});
var sidebar2 = L.control.sidebar('sidebar2', { closeButton:true, position: 'right' });
	map.addControl(sidebar2);
	sidebar2.hide();			
	sidebar2.show();
	sidebar2.toggle();
var visible2 = sidebar.isVisible();

//Buscador
var geocoder = L.Control.geocoder({ position: 'topleft',
	//defaultmarkGeocode: false
	}).addTo(map);


///////////Diseño caracteriticas basicas del visor///////////

//Título
var title2 = L.control({position: 'topright'});
	title2.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info2');
	 div.innerHTML +=
	 'VISOR CARTOGRÁFICO<h2>Risco da poboación ante o aumento dos días de  <br> calor extremo polo cambio climático<br> nos concellos de Cabo Verde  ';
	 return div;
	};
	title2.addTo(map);

//Logo Matrix	
var title1 = L.control({position: 'bottomright'});
	title1.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info1');
	 div.innerHTML +=
	 '<a href="https://www.fundacionmatrix.es"><img src="images/composi.png"  width="321px" height="200px" ></img></a>';
	 return div;
	};
	title1.addTo(map);

//Logo CLIMACAVE
var title4 = L.control({position: 'bottomright'});
	title4.onAdd = function (map) {
var div = L.DomUtil.create('div','info4');
	 div.innerHTML +=
	 '<a><img src="images/CLIMACAVE LOGO _transparencia.png" width="135px" height="94px" ></img></a>';
	 return div;
	};
	title4.addTo(map); 



///////////Cartografía de referencia///////////
var Mapa_fondo = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, opacity: 0.4, 
	attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetmap </a>| Map data © 2023 <a href="https://www.fundacionmatrix.es"><strong>@Fundación Matrix 2023</strong></a>',
	}).addTo(map);		
var positron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
    attribution: '',

    }).addTo(map);
var positronLabels = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
    attribution: ' ',
    pane: 'labels'
    }).addTo(map);


var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	opacity: 0.5,
	attribution: ' '
	}).addTo(map);;

var osm2 = new L.TileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	minZoom: 0, 
	maxZoom: 13,
	});

var osm3 = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, opacity: 0.4, 
	attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetmap </a>',
	});


//Mapas en formato imagen
//MDT
 var relieve = L.imageOverlay('images/MDT_900_MOD.png',
  imageBounds = [
    [17.2036,-25.3621],
    [17.2032,-22.662],
    [14.7995,-25.3461],
    [14.7991,-22.662]

  ]).addTo(map)


relieve.setOpacity(0.5);


///////////Otras funcionalidades
//minimapa	
var miniMap = new L.Control.MiniMap(osm2, { toggleDisplay: true, position:"bottomright", width:100,height:100,}).addTo(map); 					
//zoomHome
var zoomHome = L.Control.zoomHome({ position: 'topleft', homeCoordinates:[16, -24], zoomHomeTitle:'Posición inicial'}).addTo(map);
//fullscreen						
var fsControl = new L.Control.FullScreen();
	map.addControl(fsControl);
	map.on('enterFullscreen', function(){
	if(window.console) window.console.log('enterFullscreen');
	});
	map.on('exitFullscreen', function(){
	if(window.console) window.console.log('exitFullscreen');
	});
	L.control.scale().addTo(map);

///////////Estilo de las capas especificas del visor///////////



//VARIABLES DEL SHPE
//VARIABLE1 "VULNERABILIDAD"

function getColor11(a) {
	
return a <= 3? '#c0ddaf' :
	a <= 4? '#ffffc6':
	a <= 5? '#fffe27':
	a <= 7? '#f0b63d':
	a <= 9? '#ea2628':
	a <= 10? '#692588':
	
	'#C2523C';

};

function style11(feature) {
	return {
		fillColor: getColor11(feature.properties.vulnerabil),
		weight: 1,
		opacity: 1,
		color: 'black',
		dashArray: '1',
		fillOpacity: 0.7
	};

};

function popup11(feature, layer) {
	if (feature.properties && feature.properties.vulnerabil) {
		layer.bindTooltip("<div id='custom'>"
		+"<strong>Illa: </strong>"+feature.properties.nom_ilha.toLocaleString()+"<br>"

			+"<strong>Concello: </strong>"+feature.properties.nom_conc.toLocaleString()+"<br>"

			/*	+"<strong>Concello: </strong>"+feature.properties.nom_conc.toLocaleString()+"<br>"

					+"<strong>Nome: </strong>"+feature.properties.Nombre.toLocaleString()+"<br>" */
			             
            	+"<strong>Vulnerabilidade: </strong>"+feature.properties.vulenra_t,
			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};

var geojson11 = L.geoJson(TCR, {
	style: style11,
	onEachFeature: popup11
});



//VARIABLE2 "risco"

function getColor12(a) {
	
return a <= 9? '#ffffbe':

	a <= 15? '#ffffbe':
	a <= 16? '#ffffbe':
	a <= 20? '#ffffbe':
	a <= 21? '#ffffbe':
	a <= 28? '#ffa77f':
	a <= 30? '#ffa77f':
	a <= 35? '#ffa77f':
	a <= 45? '#e60000':
	a <= 50? '#e60000':
	a <= 63? '#e60000':
	a <= 70? '#4c0073':
	a <= 90? '#4c0073':
	a <= 100? '#4c0073':



	
	'#c3ff00';
};
function style12(feature) {
	return {
		fillColor: getColor12(feature.properties.risc_fin),
		weight: 1,
		opacity: 1,
		color: 'black',
		dashArray: '1',
		fillOpacity: 0.7
	};

};
function popup12(feature, layer) {
	if (feature.properties && feature.properties.risc_fin) {
		layer.bindTooltip("<div id='custom'>"
		+"<strong>Illa: </strong>"+feature.properties.nom_ilha.toLocaleString()+"<br>"

			+"<strong>Concello: </strong>"+feature.properties.nom_conc.toLocaleString()+"<br>"

			/*	+"<strong>Concello: </strong>"+feature.properties.nom_conc.toLocaleString()+"<br>"

					+"<strong>Nome: </strong>"+feature.properties.Nombre.toLocaleString()+"<br>" */
			             
            	+"<strong>Risco: </strong>"+feature.properties.risc_fin_t,
			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};

var geojson12 = L.geoJson(TCR, {
	style: style12,
	onEachFeature: popup12
});


//VARIABLE1 "Aumento extremo olas de calor"

function getColor13(a) {
	
return a <= 3? '#ffffdb' :
	a <= 4? '#ffe3bb':
	a <= 5? '#ffb592':
	a <= 7? '#ff7070':
	a <= 9? '#ea2626':
	a <= 10? '#882625':
	
	'#C2523C';

};

function style13(feature) {
	return {
		fillColor: getColor13(feature.properties.aument_ext),
		weight: 1,
		opacity: 1,
		color: 'black',
		dashArray: '1',
		fillOpacity: 0.7
	};

};

function popup13(feature, layer) {
	if (feature.properties && feature.properties.aument_ext) {
		layer.bindTooltip("<div id='custom'>"
		+"<strong>Illa: </strong>"+feature.properties.nom_ilha.toLocaleString()+"<br>"

			+"<strong>Concello: </strong>"+feature.properties.nom_conc.toLocaleString()+"<br>"

			/*	+"<strong>Concello: </strong>"+feature.properties.nom_conc.toLocaleString()+"<br>"

					+"<strong>Nome: </strong>"+feature.properties.Nombre.toLocaleString()+"<br>" */
			             
            	+"<strong>Incremento: </strong>"+feature.properties.aument_e_t,
			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};

var geojson13 = L.geoJson(TCR, {
	style: style13,
	onEachFeature: popup13
});






var mapa13 = L.layerGroup([geojson13])
var mapa12 = L.layerGroup([geojson12])
var mapa11 = L.layerGroup([geojson11]).addTo(map);





//BASE TREE
var baseTree = [
	{ label: "<strong>Limpar mapa", layer: osm3 },
	{
	label: '<strong>Mapas',
	children: [

		{ label: "Vulnerabilidade da poboación", layer: mapa11 },
		{ label: "Aumento de días con calor extremo", layer: mapa13 },	
		{ label: "Risco da poboación", layer: mapa12 },

		
	
	]},
	
];	
	
//OVERLAY TREE	
var overlayTree = {
	label: 'Mapas de referencia',
	children: [
	
		//{ label: "<b>Límites de Comunidades Autónomas", layer: comunidades},
		{ label: "Relevo", layer: relieve},
		{ label: "OpenStreetMap", layer: osm},
		{ label: "Toponimia", layer: positronLabels},

	]
};	

//leyendas
var htmlLegend11 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+ 'Vulnerabilidade da poboación ao quecemento climático'+"<\h3>",
			layer: geojson11,
		image:'<img src="images/LOGO_GEN.png"',
			
			elements: [{

				label:"<h5>"+'<br>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, { 
				label:"<h4>"+  'Clases de vulnerabilidade definidas segundo o tamaño da poboación de personas maiores <br> (≥ 65 anos) e infantil (≤ 4 anos) de 2019, grupos e idade máis susceptibles ó calor extremo<br><br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {

				
		
			    label:"<h1>"+  '&nbsp  Mínima '+"<\h4>",html: '',style: {'background-color': '#c0ddaf','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {	
				label:"<h1>"+  '&nbsp Moi baixa '+"<\h4>",html: '',style: {'background-color': '#ffffc6','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {		
				label:"<h1>"+  '&nbsp Baixa '+"<\h4>",html: '',style: {'background-color': '#fffe27','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {		
				label:"<h1>"+  '&nbsp Moderada '+"<\h4>",html: '',style: {'background-color': '#f0b63d','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {	
				label:"<h1>"+  '&nbsp Alta '+"<\h4>",html: '',style: {'background-color': '#ea2628','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {	
				label:"<h1>"+  '&nbsp Moi alta '+"<\h4>",html: '',style: {'background-color': '#692588','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {		
				
				label: "<h5>" +'<BR><i>Fonte: Elaboración propia (2023) con datos do Instituto Nacional de Meteorologia e Geofísica (INMG) e o Instituto Nacional de Gestão do Territorio (INGT).<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}																
		

			}]

		}],
		collapseSimple: false,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 1, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend11);



var htmlLegend12 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+ 'Risco da poboación polo aumento dos días de calor extremo polo cambio climático'+"<\h3>",
			layer: geojson12,
		image:'<img src="images/LOGO_GEN.png"',
			
			elements: [{

				label:"<h5>"+'<br>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, { 
				label:"<h4>"+  'Clases de risco definidas segundo o aumento de frecuencia de días de calor extremo entre os períodos 1991-2005 e 2006-2020 e a vulnerabilidade da poboación <br><br> Día de calor extremo: día no que a temperatura máxima supera o percentil 95 das temperaturas máximas diarias do período de referencia 1999-2012 <br><br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {

				
		
			    label:"<h1>"+  '&nbsp Baixo '+"<\h4>",html: '',style: {'background-color': '#ffffbe','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {	
				label:"<h1>"+  '&nbsp Moderado '+"<\h4>",html: '',style: {'background-color':'#ffa77f','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {		
				label:"<h1>"+  '&nbsp Alto '+"<\h4>",html: '',style: {'background-color': '#e60000','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {		
				label:"<h1>"+  '&nbsp Extremo '+"<\h4>",html: '',style: {'background-color': '#4c0073','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {			

				label: "<h5>" +'<BR><i>Fonte: Elaboración propia (2023) con datos do Instituto Nacional de Meteorologia e Geofísica (INMG) e o Instituto Nacional de Gestão do Territorio (INGT).<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}																
			




			}]

		}],
		collapseSimple: false,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 1, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend12);


var htmlLegend13 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+ 'Aumento na frecuencia de dias con calor extremo'+"<\h3>",
			layer: geojson13,
		image:'<img src="images/LOGO_GEN.png"',
			
			elements: [{

				label:"<h5>"+'<br>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, { 
				label:"<h4>"+  'Clases definidas no cambio experimentado nos días con calor extremo entre os períodos 1991-2005 e 2006-2020. <br><br> Día de calor extremo: día no que a temperatura máxima supera o percentil 95 das temperaturas máximas diarias do período de referencia 1999-2012 <br><br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {

				
		
			    label:"<h1>"+  '&nbsp Intranscendente '+"<\h4>",html: '',style: {'background-color': '#ffffdb','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {	
				label:"<h1>"+  '&nbsp Leve '+"<\h4>",html: '',style: {'background-color': '#ffe3bb','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {		
				label:"<h1>"+  '&nbsp Moderado '+"<\h4>",html: '',style: {'background-color': '#ffb592','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {		
				label:"<h1>"+  '&nbsp Alto '+"<\h4>",html: '',style: {'background-color': '#ff7070','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {	
				label:"<h1>"+  '&nbsp Moi alto '+"<\h4>",html: '',style: {'background-color': '#ea2626','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {	
				label:"<h1>"+  '&nbsp Extremo '+"<\h4>",html: '',style: {'background-color': '#882625','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {		
				
				label: "<h5>" +'<BR><i>Fonte: Elaboración propia (2023) con datos do Instituto Nacional de Meteorologia e Geofísica (INMG) e o Instituto Nacional de Gestão do Territorio (INGT).<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}																
		


			}]

		}],
		collapseSimple: false,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 1, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend13);





//Visualizar capas
// L.control.layers(baseLayers, overlays,{collapsed:true, position: 'topright',}).addTo(map);
L.control.layers.tree(baseTree, overlayTree,{collapsed:true}).collapseTree(baseTree,overlayTree).addTo(map);

//boton de informacion 
var button2 = new L.Control.Button(L.DomUtil.get('helpbutton2'), { toggleButton: 'active', position: 'topright'});
	button2.addTo(map);
	button2.on('click', function () {
	 if (button2.isToggled()) {
			sidebar2.hide();
		} else {
			sidebar2.show();
		}
	});