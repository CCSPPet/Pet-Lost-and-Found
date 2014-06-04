
(function(){
		
		//var input = $('#input');
		var waitcircle = null ,waitmark = null;
		var MAP;
		var drawingManager;
		var geocoder;
		window.alldata = [];
		var allmark = [];
		function initialize() {
		
		$('#mapaddbutton').click(function(){
			parent.callAddress();
		});
		
		geocoder = new google.maps.Geocoder();
		
        var mapOptions = {
          center: new google.maps.LatLng(25.037525,121.56378199999995),
          zoom: 15,
		  streetViewControl:false,
		  
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map_canvas"),
            mapOptions);
			//google.maps.event.addListener(map, 'click', function(e) {
			//	
			//});
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
		google.maps.event.addListener(drawingManager, 'markercomplete', function(circle) {
			if(waitmark!=null) waitmark.setMap(null);
			waitmark = circle;
			
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
				show(msg);
             },

            error:function(xhr, ajaxOptions, thrownError){ 
                alert(xhr.status); 
                alert(thrownError); 
                }
        });

	  }
	  window.changecolor = function(i,c){
		if(allmark.length>i)
			allmark[i].circle.setOptions({fillColor:c});
	  };
	  window.callAddress = function(){
		var place = document.getElementById('mapadd').value;
		geocoder.geocode({'address':place},function(results,status){
			if(status==google.maps.GeocoderStatus.OK){
				if(waitmark!=null)waitmark.setMap(null);
				waitmark = new google.maps.Marker({
							position: results[0].geometry.location,
							map: MAP
						});
				MAP.panTo(results[0].geometry.location);
			}	
		});
		
	  }
	  window.getposition = function(){
		if(waitmark==null)return "illegal position";
		else return JSON.stringify(waitmark.position);
	  }
	  window.changemode = function(option){
		if(option==0){
			drawingManager.setDrawingMode(null);
			if(waitcircle!=null)waitcircle.setMap(null);
			waitcircle = null;
			if(waitmark!=null)waitmark.setMap(null);
			waitmark = null;
		}
		else if(option==1)
			drawingManager.setDrawingMode(google.maps.drawing.OverlayType.CIRCLE);
		else if(option==2)
			drawingManager.setDrawingMode(google.maps.drawing.OverlayType.MARKER);
	  };
	  clear = function(){
		for(i=0; i<allmark.length; i+=1){
			allmark[i].marker.setMap(null);
			allmark[i].circle.setMap(null);
		}
		allmark = [];
	  }
	  show = function(data){
		clear();
		alldata = data;
		for(i=0; i<data.length; i+=1){	
			placeCircle(new google.maps.LatLng(data[i].map_posk,data[i].map_posA),parseFloat(data[i].map_rad), MAP,data[i].name,alldata[i]);
		}
	  }
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
	  compare = function(x,y){
		return x.dis-y.dis;
	  }
	  rad = function(d) {  
        return d * Math.PI / 180.0;  
       }  
	  getDistance = function (lat1, lng1,lat2,lng2)  
        {  
            var radLat1 = rad(lat1);  
            var radLat2 = rad(lat2);  
			
            var a = radLat1 - radLat2;  
            var b = rad(lng1) - rad(lng2);  
            var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2)  
                    + Math.cos(radLat1)*Math.cos(radLat2)* Math.pow(Math.sin(b / 2), 2))); 
            console.log(rad(lng1), rad(lng2));
			s = s * 6378.137;  
            s = Math.round(s * 10000);  
            s = s / 10000;  
            return s ;   
        }  
	  window.showinfo = function(now){
		allmark[now].infowindow.open(MAP,allmark[now].marker);
		MAP.panTo(allmark[now].marker.position);
	  }
	  window.search = function(tmp){
			console.log(tmp);
			var place;
			var data = [];
			for(i=0;i<tmp.length;i++){
				if(tmp[i].name=="loseplace"){
					place = tmp[i].value;
				}
				else if(tmp[i].value!=""){
					data.push(tmp[i]);
				}
			}
			if(waitmark == null && place == ""){
				alert("請輸入位置");
				return false;
			}
			$.ajax({
				data: data,
				url: "find",
				type:"POST",
				dataType:'json',
				success: function(msg){
					drawingManager.setDrawingMode(null);
					if(waitmark != null){
						var k = waitmark.position.k;
						var A = waitmark.position.A;
						
						for(i=0;i<msg.length;i++){
							msg[i].dis = getDistance(k,A,msg[i].map_posk,msg[i].map_posA);
						}
						for(i=0;i<msg.length;i++){
							msg[i].dis = getDistance(k,A,msg[i].map_posk,msg[i].map_posA);
						}
						msg.sort(compare);
						show(msg);
						console.log(msg);
						MAP.panTo(waitmark.position);
					}
					else if(place!=""){
						geocoder.geocode({'address':place},function(results,status){
							if(status==google.maps.GeocoderStatus.OK){
								var k = results[0].geometry.location.k;
								var A = results[0].geometry.location.A;
								
								for(i=0;i<msg.length;i++){
									msg[i].dis = getDistance(k,A,msg[i].map_posk,msg[i].map_posA);
								}
								msg.sort(compare);
								show(msg);
								console.log(msg);
								MAP.panTo(results[0].geometry.location);
							}
						});
					}
					
				}
			});
			return true;
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
	  function placeCircle(position,radius, map,content,now) {
			//console.log(radius);
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
			google.maps.event.addListener(circle, 'mouseover', function() {
				circle.setOptions({fillColor:'#FFFFFF'});
				now.mouse = true;
			});
			google.maps.event.addListener(circle, 'mouseout', function() {
				circle.setOptions({fillColor:'#000000'});
				now.mouse = false;
			});
			allmark.push({marker:marker,circle:circle,infowindow:infowindow});
			map.panTo(position);
		}
	  

		google.maps.event.addDomListener(window, 'load', initialize);
}());