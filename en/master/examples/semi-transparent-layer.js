var map = new ol.Map({
  layers: [
    new ol.layer.Tile({
      source: new ol.source.MapQuest({layer: 'sat'})
    }),
    new ol.layer.Tile({
      source: new ol.source.TileJSON({
        url: 'http://api.tiles.mapbox.com/v3/mapbox.va-quake-aug.jsonp',
        crossOrigin: 'anonymous'
      })
    })
  ],
  renderer: ol.RendererHints.createFromQueryData(),
  target: 'map',
  view: new ol.View2D({
    center: ol.proj.transform([-77.93255, 37.9555], 'EPSG:4326', 'EPSG:3857'),
    zoom: 5
  })
});
