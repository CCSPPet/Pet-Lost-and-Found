
(function(){
		
		var input = $('#input');
		var waitcircle;
		var MAP;
		function initialize() {
        var mapOptions = {
          center: new google.maps.LatLng(25.037525,121.56378199999995),
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map_canvas"),
            mapOptions);
			google.maps.event.addListener(map, 'click', function(e) {
				
			});
		MAP = map;
		var drawingManager = new google.maps.drawing.DrawingManager({
			//drawingControl: false,
			drawingMode: null,
			drawingControlOptions: {
				drawingModes: [google.maps.drawing.OverlayType.CIRCLE],
			}
		});
		google.maps.event.addListener(drawingManager, 'circlecomplete', function(circle) {
			input.addClass('show');
			waitcircle = circle;
			
		});
		drawingManager.setMap(map);
		load(map);
      }
	  
	  var data=[];
	  function load(map){/*
		data = JSON.parse( localStorage.Mark );
		var infowindow;
		var marker;
		for(i=0; i<data.length; i+=1){
			console.log(data[i].content);
			placeCircle(new google.maps.LatLng(data[i].position.k,data[i].position.A),data[i].radius, map,data[i].content);
		}*/
	  }
	  window.senddata = function(){
			var tmp = '<input type="hidden" name="map_pos" value="'+waitcircle.center+'"></input>';
			var tmp2 = '<input type="hidden" name="map_rad" value="'+waitcircle.radius+'"></input>';
			$(tmp).appendTo($('#data'));
			$(tmp2).appendTo($('#data'));
			//return false;
	  }
	  window.getdata = function(data){
			var radius = waitcircle.getRadius();
			placeMarker(waitcircle.center,radius, MAP,data);
			input.removeClass('show');
			waitcircle.setMap(null);
	  }
	  function save(){
			localStorage.Mark = JSON.stringify(data);  
	  }
	  function placeCircle(position,radius, map,content) {
			var infowindow = new google.maps.InfoWindow({
				content: content
			});
			
			var marker = new google.maps.Marker({
				position: position,
				map: map
				});
			var circle = new google.maps.Circle({
				center: position,
				map: map,
				radius: radius
				});
			google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(map,marker);
			});
			map.panTo(position);
			save();
		}
	  function placeMarker(position,radius, map,content) {
			var infowindow = new google.maps.InfoWindow({
				content: content
			});
			var marker = new google.maps.Marker({
				position: position,
				map: map
				});
			var circle = new google.maps.Circle({
				center: position,
				map: map,
				radius: radius
				});
			data.push({content:content,position: position,radius:radius});
			google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(map,marker);
			});
			map.panTo(position);
			save();
		}

		google.maps.event.addDomListener(window, 'load', initialize);
}());