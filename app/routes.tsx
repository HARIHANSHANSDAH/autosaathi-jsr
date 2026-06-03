import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';

let WebView: any;
if (Platform.OS !== 'web') {
  WebView = require('react-native-webview').WebView;
}

// ── ROUTE DATA ──
const newBaridihToSakchi = {
  "type": "FeatureCollection",
  "features": [
    { "geometry": { "type": "LineString", "coordinates": [ [86.23965,22.79264],[86.23967,22.79261],[86.23968,22.79258],[86.23967,22.79256],[86.23966,22.79253],[86.23964,22.79251],[86.23961,22.7925],[86.23958,22.7925],[86.23955,22.7925],[86.23952,22.79252],[86.2395,22.79254],[86.23949,22.79257],[86.23949,22.79259],[86.2395,22.79262],[86.23952,22.79265],[86.23954,22.79266],[86.23957,22.79267],[86.23961,22.79267],[86.23981,22.79281],[86.24001,22.79298],[86.24016,22.7931],[86.24038,22.79328],[86.24093,22.79371],[86.24098,22.79375],[86.24133,22.79403],[86.24188,22.79445],[86.24191,22.79442] ] } },
    { "geometry": { "type": "LineString", "coordinates": [ [86.24188,22.79445],[86.24192,22.79448],[86.2424,22.79485],[86.24305,22.79535],[86.24332,22.79556],[86.24355,22.79579],[86.24361,22.79585],[86.2436,22.7959],[86.2436,22.79594],[86.24361,22.79597],[86.24281,22.79693],[86.24269,22.7971],[86.24204,22.79778],[86.24196,22.79787],[86.24181,22.79804],[86.24155,22.7983] ] } },
    { "geometry": { "type": "LineString", "coordinates": [ [86.24148,22.79836],[86.24145,22.79838],[86.2411,22.79868],[86.24064,22.79901],[86.24035,22.7992],[86.24022,22.79927],[86.23984,22.79942],[86.23949,22.79955],[86.23934,22.79961],[86.23929,22.79962],[86.23926,22.79963],[86.23909,22.79969],[86.23873,22.79979],[86.23866,22.79981],[86.23826,22.79992],[86.23781,22.80002],[86.23779,22.80003],[86.23771,22.80005],[86.23752,22.80007],[86.23743,22.80009],[86.2372,22.80012],[86.23714,22.80012],[86.23704,22.80013],[86.23694,22.80013] ] } },
    { "geometry": { "type": "LineString", "coordinates": [ [86.23684,22.80013],[86.23675,22.80013],[86.23609,22.80012],[86.23592,22.80011],[86.23544,22.80011],[86.23496,22.8001],[86.23442,22.8001],[86.23389,22.80009],[86.23293,22.80007],[86.23242,22.80006],[86.23201,22.80005],[86.23192,22.80005],[86.23101,22.80003],[86.23021,22.80001],[86.23007,22.80001],[86.2296,22.79999],[86.22955,22.79999],[86.22937,22.79998],[86.22908,22.79997],[86.22812,22.79994],[86.22774,22.79992],[86.22719,22.7999],[86.22652,22.79987],[86.2263,22.79987],[86.22612,22.79987],[86.22581,22.79987],[86.22573,22.79988],[86.22568,22.79988],[86.22539,22.79993],[86.22519,22.79996],[86.22488,22.80001],[86.22475,22.80004],[86.22443,22.80013],[86.22402,22.80029] ] } },
    { "geometry": { "type": "LineString", "coordinates": [ [86.22383,22.8004],[86.22344,22.8006],[86.22325,22.80072],[86.2231,22.80083],[86.22292,22.80098],[86.22281,22.80108],[86.22263,22.80126],[86.22242,22.80151],[86.22222,22.80178],[86.22196,22.80208],[86.22191,22.80215] ] } },
    { "geometry": { "type": "LineString", "coordinates": [ [86.22191,22.80215],[86.22182,22.80226],[86.22181,22.80245],[86.22165,22.80276],[86.22149,22.80294],[86.22134,22.80307],[86.22102,22.80324],[86.22068,22.80337],[86.22053,22.80343],[86.22042,22.80347],[86.2202,22.80356],[86.21998,22.80364],[86.21975,22.80372],[86.21967,22.80375],[86.21954,22.80379],[86.21931,22.80387],[86.21906,22.80395],[86.21902,22.80396],[86.21889,22.80398],[86.21874,22.804],[86.21838,22.80404],[86.21809,22.80406],[86.21748,22.8041],[86.2167,22.80414],[86.21656,22.80414],[86.21621,22.80418] ] } },
    { "geometry": { "type": "LineString", "coordinates": [ [86.21613,22.80419],[86.21597,22.80421],[86.21478,22.80443],[86.21418,22.80452],[86.21345,22.8046],[86.21292,22.8047],[86.21261,22.80476],[86.21245,22.80477],[86.21214,22.80482],[86.21208,22.80483],[86.21203,22.80484],[86.21141,22.8049],[86.21136,22.80488],[86.21131,22.80487],[86.21096,22.80487],[86.21075,22.80487],[86.21068,22.80487],[86.21054,22.80487],[86.21034,22.80488],[86.20989,22.80487],[86.20969,22.80487],[86.20936,22.80487] ] } },
    { "geometry": { "type": "LineString", "coordinates": [ [86.20932,22.80487],[86.20925,22.80488],[86.20858,22.80486],[86.20822,22.80486],[86.20809,22.80486],[86.20797,22.80489],[86.20725,22.80486] ] } },
    { "geometry": { "type": "LineString", "coordinates": [ [86.20725,22.80486],[86.20682,22.80484],[86.20664,22.80482],[86.20658,22.80481],[86.20644,22.80481],[86.20637,22.80477],[86.20632,22.80476],[86.20621,22.80476],[86.20552,22.80475],[86.20499,22.80473],[86.2048,22.80472],[86.20452,22.80473],[86.20443,22.80479],[86.20437,22.80479],[86.20354,22.80481],[86.20311,22.80479] ] } },
  ]
}

const stationToNewBaridih = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [86.20051969618498,22.770946159427496],[86.20055069172287,22.771094773951745],[86.20067467387679,22.7711519333412],[86.20087924442981,22.771271967981264],[86.20124499178246,22.77180354868746],[86.20156734557503,22.772300832887737],[86.20273897692425,22.774044168086462],[86.20502024307012,22.777210688194614],[86.20575173259243,22.77834809811729],[86.20574553348456,22.778450979532565],[86.20578272813151,22.77852528272814],[86.20590671028424,22.778536713985716],[86.2060120951146,22.778456695163484],[86.20836155692331,22.777936571680286],[86.20940301403164,22.777696514542185],[86.2107020411372,22.77761605208653],[86.2118702588852,22.777616495227264],[86.21527357526696,22.777599349978573],[86.21562692440398,22.77761078131377],[86.21593687978748,22.777685084966848],[86.21655058789793,22.778159490628113],[86.21703411829657,22.778062324641567],[86.21720769331176,22.778022315096692],[86.21733167546563,22.778148059338918],[86.2175672415566,22.778153774983622],[86.21765402906482,22.779051128214277],[86.2178461942118,22.780371433334224],[86.21829253105227,22.783160591679774],[86.2188690480657,22.784040765786955],[86.220437424088,22.786595530939593],[86.2212495064129,22.787481395884754],[86.22188801450335,22.788355826892925],[86.22234674847078,22.789121663824915],[86.22261330919844,22.789698898902515],[86.22290466725849,22.790161826136227],[86.22307824227363,22.79056188544338],[86.22321462264318,22.790750484423697],[86.2236051664259,22.79093336803531],[86.22403910396321,22.790990519112455],[86.22444204596155,22.790939083144323],[86.22514255206681,22.790887645540437],[86.22521694135946,22.790253266752714],[86.22543391012698,22.789773194357252],[86.22626459274079,22.788915916789364],[86.22687830439992,22.78860729598898],[86.22703948119954,22.78860729598898],[86.22718825978467,22.788681593652555],[86.22815532058081,22.789230252073082],[86.22847147450824,22.789424569684314],[86.23043659164085,22.79037328497506],[86.23242632617354,22.79137914500555],[86.23469519958184,22.791916362437405],[86.23480091252225,22.79199660740929],[86.23494349199831,22.79196803208454],[86.23644987516235,22.792316650643016],[86.2376586904495,22.79259096764305],[86.2394626307825,22.7926309729137],[86.2395556173974,22.79267097817258],[86.23966720133558,22.79269955334999],[86.24328097797576,22.7955407169991],[86.24357853514363,22.795809317780524]
        ]
      }
    }
  ]
}

const stationToSakchi = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [86.20055801429913,22.77098065841325],[86.20055801429913,22.771083605386536],[86.20070492089621,22.771164879257583],[86.20096347650724,22.771349099853268],[86.20119852706233,22.771663357942472],[86.20135718618741,22.77204263398356],[86.2023737808696,22.773510969021345],[86.20382521726742,22.775629455686058],[86.2046595676855,22.776685979835577],[86.20574667650499,22.778322217284355],[86.20574667650499,22.77844683059024],[86.20577018155996,22.778528100076258],[86.20591708815692,22.778528100076258],[86.20601698464304,22.778473920425],[86.20869656794213,22.77785627125182],[86.20970141575759,22.777650392042787],[86.21189128865342,22.777623476356695],[86.21188599784824,22.77796982795134],[86.211452151049,22.780604023342548],[86.21140982461537,22.78100402622792],[86.21160029356264,22.78124792985021],[86.21212937472865,22.781652808050893],[86.21264258272515,22.782140612539607],[86.21448027592356,22.783826679557848],[86.21464428858928,22.78413399308164],[86.214649578072,22.786797337183245],[86.21461783294393,22.78848019274855],[86.21434271086946,22.789206984623775],[86.21369723277098,22.790494713376376],[86.21148531671548,22.7963380691329],[86.21139209875622,22.79640838080597],[86.21136243849622,22.79653728544551],[86.21137091285647,22.796627128000807],[86.20991735940612,22.800649167096296],[86.20971927629165,22.80085133638505],[86.2096202347351,22.800870901138822],[86.20947167239882,22.800936116965232],[86.20594154753411,22.80096872532998],[86.20559490208336,22.800916552684058],[86.20526947982518,22.801001333223738],[86.20512799188612,22.801066548987748],[86.20492283437443,22.801118721574014],[86.2046257097033,22.801138286264475],[86.20431458400469,22.80129770300853],[86.20363544189871,22.80241940735877],[86.20292092780863,22.803378065969852],[86.20273699348837,22.803469366437753],[86.20276529107679,22.803586752664472],[86.20284310944209,22.803651967191314],[86.2027723662739,22.804545401471472]
        ]
      }
    }
  ]
}

// ── ROUTE CONFIG ──
const ROUTES = [
  {
    id: 'new-baridih-sakchi',
    label: 'New Baridih → Sakchi',
    from: 'New Baridih',
    to: 'Sakchi',
    color: '#1B8C5E',
    bg: '#E1F5EE',
    emoji: '🟢',
    fare: '₹15',
    data: newBaridihToSakchi,
  },
  {
    id: 'station-new-baridih',
    label: 'Station → New Baridih',
    from: 'Tatanagar Stn.',
    to: 'New Baridih',
    color: '#6B21A8',
    bg: '#F3E8FF',
    emoji: '🟣',
    fare: '₹20',
    data: stationToNewBaridih,
  },
  {
    id: 'station-sakchi',
    label: 'Station → Sakchi',
    from: 'Tatanagar Stn.',
    to: 'Sakchi',
    color: '#B91C1C',
    bg: '#FEE2E2',
    emoji: '🔴',
    fare: '₹25',
    data: stationToSakchi,
  },
]

const mapHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <style>
    html,body,#map{height:100%;margin:0;padding:0;}
    .leaflet-control-attribution{font-size:8px!important;}
  </style>
</head>
<body>
<div id="map"></div>
<script>
  var map = L.map('map',{zoomControl:true,attributionControl:true})
    .setView([22.7926,86.2396],13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution:'© OpenStreetMap',
    maxZoom:19,
  }).addTo(map);

  var currentLayer = null;
  var markers = [];

  function drawRoute(coordsJson, color) {
    if(currentLayer){ map.removeLayer(currentLayer); }
    markers.forEach(function(m){ map.removeLayer(m); });
    markers = [];

    var coords = JSON.parse(coordsJson);
    if(!coords.length) return;

    currentLayer = L.polyline(coords,{
      color: color,
      weight: 5,
      opacity: 0.9,
      lineJoin: 'round',
      lineCap: 'round',
    }).addTo(map);

    // Start marker
    var startIcon = L.divIcon({
      className:'',
      html:'<div style="background:'+color+';width:14px;height:14px;border-radius:50%;border:2.5px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.4);"></div>',
      iconSize:[14,14],iconAnchor:[7,7],
    });

    // End marker
    var endIcon = L.divIcon({
      className:'',
      html:'<div style="background:'+color+';width:20px;height:20px;border-radius:50%;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;"><div style="width:8px;height:8px;background:#fff;border-radius:50%;"></div></div>',
      iconSize:[20,20],iconAnchor:[10,10],
    });

    var sm = L.marker(coords[0], {icon: startIcon}).addTo(map).bindPopup('Start');
    var em = L.marker(coords[coords.length-1], {icon: endIcon}).addTo(map).bindPopup('End');
    markers.push(sm, em);

    map.fitBounds(L.latLngBounds(coords),{padding:[50,50]});
  }

  // Listen for messages
  document.addEventListener('message', function(e){ handleMsg(e.data); });
  window.addEventListener('message', function(e){ handleMsg(e.data); });

  function handleMsg(data) {
    try {
      var msg = JSON.parse(data);
      if(msg.type === 'DRAW_ROUTE'){
        drawRoute(msg.coords, msg.color);
      }
    } catch(e){}
  }
</script>
</body>
</html>
`

export default function RoutesScreen() {
  const webViewRef = useRef<any>(null)
  const iframeRef  = useRef<any>(null)
  const [activeRoute, setActiveRoute] = useState<typeof ROUTES[0] | null>(null)

  const handleRoutePress = (route: typeof ROUTES[0]) => {
    setActiveRoute(route)

    // Parse GeoJSON coords
    const coords: [number, number][] = []
    route.data.features.forEach((feature: any) => {
      if (feature.geometry?.coordinates) {
        feature.geometry.coordinates.forEach((coord: number[]) => {
          if (typeof coord[0] === 'number') {
            coords.push([coord[1], coord[0]])
          }
        })
      }
    })

    const msg = JSON.stringify({
      type: 'DRAW_ROUTE',
      coords: JSON.stringify(coords),
      color: route.color,
    })

    if (Platform.OS === 'web') {
      iframeRef.current?.contentWindow?.postMessage(msg, '*')
    } else {
      webViewRef.current?.injectJavaScript(`
        window.dispatchEvent(new MessageEvent('message', { data: '${msg.replace(/'/g, "\\'")}' }));
        true;
      `)
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar backgroundColor="#1B8C5E" barStyle="light-content" />

      {/* ── HEADER ── */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🗺️ Route Map</Text>
        <Text style={styles.headerSub}>Tap a route to see it on the map</Text>
      </View>

      {/* ── MAP ── */}
      <View style={styles.mapContainer}>
        {Platform.OS === 'web' ? (
          <iframe
            ref={iframeRef}
            srcDoc={mapHtml}
            style={{ width: '100%', height: '100%', border: 'none' } as any}
            title="route-map"
          />
        ) : (
          <WebView
            ref={webViewRef}
            originWhitelist={['*']}
            source={{ html: mapHtml }}
            style={styles.map}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            mixedContentMode="always"
            cacheEnabled={true}
          />
        )}

        {/* Active route badge */}
        {activeRoute && (
          <View style={[styles.activeBadge, { backgroundColor: activeRoute.color }]}>
            <Text style={styles.activeBadgeText}>
              {activeRoute.emoji} {activeRoute.from} → {activeRoute.to} • {activeRoute.fare}
            </Text>
          </View>
        )}
      </View>

      {/* ── ROUTE BUTTONS ── */}
      <View style={styles.routesPanel}>
        <Text style={styles.panelTitle}>Select Route</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.routesList}
        >
          {ROUTES.map((route) => {
            const isActive = activeRoute?.id === route.id
            return (
              <TouchableOpacity
                key={route.id}
                style={[
                  styles.routeBtn,
                  { borderColor: route.color, backgroundColor: isActive ? route.color : route.bg },
                ]}
                onPress={() => handleRoutePress(route)}
              >
                <Text style={styles.routeBtnEmoji}>{route.emoji}</Text>
                <View>
                  <Text style={[
                    styles.routeBtnLabel,
                    { color: isActive ? '#fff' : route.color },
                  ]}>
                    {route.from}
                  </Text>
                  <Text style={[
                    styles.routeBtnArrow,
                    { color: isActive ? 'rgba(255,255,255,0.8)' : '#888' },
                  ]}>
                    ↓ {route.to}
                  </Text>
                </View>
                <View style={[
                  styles.farePill,
                  { backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : '#fff' },
                ]}>
                  <Text style={[
                    styles.farePillText,
                    { color: isActive ? '#fff' : route.color },
                  ]}>
                    {route.fare}
                  </Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe:          { flex: 1, backgroundColor: '#1B8C5E' },
  header:        { backgroundColor: '#1B8C5E', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 14 },
  headerTitle:   { fontSize: 22, fontWeight: '700', color: '#fff' },
  headerSub:     { fontSize: 12, color: 'rgba(255,255,255,0.70)', marginTop: 4 },

  // Map
  mapContainer:  { flex: 1, position: 'relative' },
  map:           { flex: 1 },

  // Active badge
  activeBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  activeBadgeText: { color: '#fff', fontSize: 13, fontWeight: '600', textAlign: 'center' },

  // Routes panel
  routesPanel:   { backgroundColor: '#fff', paddingTop: 12, paddingBottom: 16, borderTopWidth: 0.5, borderTopColor: '#e8e8e8' },
  panelTitle:    { fontSize: 12, fontWeight: '700', color: '#888', letterSpacing: 0.8, textTransform: 'uppercase', paddingHorizontal: 16, marginBottom: 10 },
  routesList:    { paddingHorizontal: 16, gap: 10 },

  routeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1.5,
    minWidth: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  routeBtnEmoji: { fontSize: 20 },
  routeBtnLabel: { fontSize: 13, fontWeight: '700' },
  routeBtnArrow: { fontSize: 11, marginTop: 1 },
  farePill:      { marginLeft: 'auto', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  farePillText:  { fontSize: 12, fontWeight: '700' },
})