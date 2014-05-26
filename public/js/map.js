
(function(){
		
		//var input = $('#input');
		var waitcircle;
		var MAP;
		var drawingManager;
		var geocoder;
		function initialize() {
		geocoder = new google.maps.Geocoder();
		
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
		drawingManager = new google.maps.drawing.DrawingManager({
			drawingControl: false,
			drawingMode: null
			//drawingControlOptions:
			//drawingControlOptions: {
			//	drawingModes: [google.maps.drawing.OverlayType.CIRCLE],
			//}
		});
		google.maps.event.addListener(drawingManager, 'circlecomplete', function(circle) {
			//input.addClass('show');
			if(waitcircle!=null) waitcircle.setMap(null);
			waitcircle = circle;
			
		});
		drawingManager.setMap(map);
		//var input = $('#iframe1').contents.getElementById('inputEmail');
		//var auto = new google.maps.places.Autocomplete(input);
		
		load(map);
      }
	  
	  function load(map){
		$.ajax({
            url: "data",
            type:"GET",
            dataType:'json',
				
            success: function(msg){
				var data = msg;
				for(i=0; i<data.length; i+=1){
					placeCircle(new google.maps.LatLng(data[i].map_posk,data[i].map_posA),parseFloat(data[i].map_rad), map,data[i].name);
				}
             },

            error:function(xhr, ajaxOptions, thrownError){ 
                alert(xhr.status); 
                alert(thrownError); 
                }
        });

	  }
	  window.drawcircle = function(option){
		if(option==0){
			drawingManager.setDrawingMode(null);
			if(waitcircle!=null)waitcircle.setMap(null);
			waitcircle = null;
		}
		else{
			drawingManager.setDrawingMode(google.maps.drawing.OverlayType.CIRCLE);
			
		}
	  };
	  window.setAddress = function(add){
			geocoder.geocode({'address':add},function(results,status){
				if(status==google.maps.GeocoderStatus.OK){
					if(waitcircle!=null)waitcircle.setMap(null);
					waitcircle = new google.maps.Circle({
						center: results[0].geometry.location,
						map: MAP,
						radius: 100
					});
					MAP.panTo(results[0].geometry.location);
				}
			});
	  }
	  window.senddata = function(data){
			//alert("QQQ");
			if(waitcircle != null){
				//data.map_pos = waitcircle.center;
				//data.map_rad = waitcircle.radius;
				data = data+"&map_posk="+waitcircle.center.k+"&map_posA="+waitcircle.center.A+"&map_rad="+waitcircle.radius;
				
				console.log(data);
			}
			
			$.ajax({
				data: data,
				url: "data",
				type:"POST",
				success: function(msg){
					alert(msg);
					if(msg=="SUCCESS"){
						waitcircle.setMap(null);
						waitcircle = null;
						load(MAP);
					}
				}
			});
			
			//var tmp = '<input type="hidden" name="map_pos" value="'+waitcircle.center+'"></input>';
			//var tmp2 = '<input type="hidden" name="map_rad" value="'+waitcircle.radius+'"></input>';
			//$(tmp).appendTo($('#data'));
			//$(tmp2).appendTo($('#data'));
			//return false;
	  };
	  //window.getdata = function(data){
		//	var radius = waitcircle.getRadius();
		//	placeMarker(waitcircle.center,radius, MAP,data);
			//input.removeClass('show');
		//	waitcircle.setMap(null);
		//	waitcircle = null;
	 // };
	  function placeCircle(position,radius, map,content) {
	  console.log(radius);
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
		}

		google.maps.event.addDomListener(window, 'load', initialize);
}());