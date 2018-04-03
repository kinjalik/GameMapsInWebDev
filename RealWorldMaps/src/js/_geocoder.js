module.exports = function(map) {

	let popup = bundle_vendor.L.popup();

	function onMapClick(e) {

		let xhr = new XMLHttpRequest();

		let request = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCFl_qX8EFJmRlu8Ix27a6ECSlBBnBCN34&latlng=${e.latlng.lat},${e.latlng.lng}`;

		xhr.open('GET', request, false);
		xhr.send();

		let result = JSON.parse(xhr.responseText).results[0].formatted_address;

		console.log(JSON.parse(xhr.responseText));

	    popup
	        .setLatLng(e.latlng)
	        .setContent(`${result}`)
	        .openOn(map);
	}

	map.on('click', onMapClick);

}

