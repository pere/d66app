var map;
var lat = 1.6;
var lng = -33.4502;

var zoom = 3;

var over_map = true;
var config = {
    dark_on_highlight: true,
    higlight_on_getfeature: true,
    circles_plot_by: 'provinces',
    num_overlays: 0
}
L.TopoJSON = L.GeoJSON.extend({
    addData: function (jsonData) {
        if (jsonData.type === 'Topology') {
            for (key in jsonData.objects) {
                geojson = topojson.feature(jsonData, jsonData.objects[key]);
                L.GeoJSON.prototype.addData.call(this, geojson);
            }
        } else {
            L.GeoJSON.prototype.addData.call(this, jsonData);
        }
    }
});

$ = jQuery;

var all_adm_ids = [];
var all_admin_obj = [];
var arr_adm_names = {}

$(document).ready(function () {

    var water_data = { "data": { "name": "Mali", "path": "gaul0-155-2018.csv", "rows": [{ "c": [{ "v": 1984 }, { "v": 1459.188562017901 }, { "v": 997.5110353325483 }, { "v": 461.6775266853526 }, { "v": 3534.4367682674956 }, { "v": 2612.126692316924 }, { "v": 922.3100759505713 }] }, { "c": [{ "v": 1985 }, { "v": 1137.7289273867411 }, { "v": 673.9634272525743 }, { "v": 463.76550013416676 }, { "v": 5788.003900692251 }, { "v": 758.8698007600179 }, { "v": 5029.134099932233 }] }, { "c": [{ "v": 1986 }, { "v": 1252.3944533558265 }, { "v": 1115.981064583968 }, { "v": 136.41338877185845 }, { "v": 4802.8830658263405 }, { "v": 2867.9489390585286 }, { "v": 1934.934126767812 }] }, { "c": [{ "v": 1987 }, { "v": 1342.0900361931074 }, { "v": 1341.5060429547848 }, { "v": 0.5839932383225281 }, { "v": 3898.589723266716 }, { "v": 3220.0120139607166 }, { "v": 678.5777093059997 }] }, { "c": [{ "v": 1988 }, { "v": 1448.7133537130085 }, { "v": 1448.6684357916474 }, { "v": 0.044917921361047775 }, { "v": 5330.931072945521 }, { "v": 5026.55660184734 }, { "v": 304.37447109818066 }] }, { "c": [{ "v": 1989 }, { "v": 1508.9438078320693 }, { "v": 1296.983056362076 }, { "v": 211.96075146999326 }, { "v": 3961.7386242396797 }, { "v": 2362.458483294208 }, { "v": 1599.280140945472 }] }, { "c": [{ "v": 1990 }, { "v": 1540.3224532627985 }, { "v": 1540.2442777620627 }, { "v": 0.07817550073583227 }, { "v": 4074.3481180027675 }, { "v": 3922.384779014884 }, { "v": 151.9633389878838 }] }, { "c": [{ "v": 1991 }, { "v": 1573.5670192332122 }, { "v": 251.28388626960256 }, { "v": 1322.2831329636097 }, { "v": 9806.824727779756 }, { "v": 371.96568904316877 }, { "v": 9434.859038736588 }] }, { "c": [{ "v": 1992 }, { "v": 1600.0499356931894 }, { "v": 0.0 }, { "v": 1600.0499356931894 }, { "v": 10297.277580280901 }, { "v": 0.0 }, { "v": 10297.277580280901 }] }, { "c": [{ "v": 1993 }, { "v": 1600.0499356931894 }, { "v": 0.0 }, { "v": 1600.0499356931894 }, { "v": 10297.277580280901 }, { "v": 0.0 }, { "v": 10297.277580280901 }] }, { "c": [{ "v": 1994 }, { "v": 1405.5174373800066 }, { "v": 1345.0866645791168 }, { "v": 60.4307728008899 }, { "v": 8143.382057005751 }, { "v": 992.0386765758975 }, { "v": 7151.343380429854 }] }, { "c": [{ "v": 1995 }, { "v": 1383.1789911402757 }, { "v": 1366.5257876105038 }, { "v": 16.653203529771872 }, { "v": 8364.356793819019 }, { "v": 1201.7892003000836 }, { "v": 7162.567593518936 }] }, { "c": [{ "v": 1996 }, { "v": 1602.749219035447 }, { "v": 229.56165320593155 }, { "v": 1373.1875658295153 }, { "v": 9944.323762075734 }, { "v": 610.9520433190868 }, { "v": 9333.371718756647 }] }, { "c": [{ "v": 1997 }, { "v": 1580.7322586632304 }, { "v": 259.42721496283093 }, { "v": 1321.3050437003994 }, { "v": 10020.569806980913 }, { "v": 162.0257955788258 }, { "v": 9858.544011402088 }] }, { "c": [{ "v": 1998 }, { "v": 1535.6645722758926 }, { "v": 1530.4463172765986 }, { "v": 5.218254999293919 }, { "v": 7235.739272275068 }, { "v": 1722.1832877192376 }, { "v": 5513.555984555831 }] }, { "c": [{ "v": 1999 }, { "v": 1599.057143521477 }, { "v": 1597.7542871964563 }, { "v": 1.302856325020776 }, { "v": 7869.719275727179 }, { "v": 6679.7094576569125 }, { "v": 1190.0098180702666 }] }, { "c": [{ "v": 2000 }, { "v": 1557.202249371451 }, { "v": 1557.1868103925997 }, { "v": 0.015438978851307184 }, { "v": 6614.361690796649 }, { "v": 6128.313497200103 }, { "v": 486.0481935965466 }] }, { "c": [{ "v": 2001 }, { "v": 1538.575151721784 }, { "v": 1538.5603532152136 }, { "v": 0.014798506570514292 }, { "v": 6215.246300397588 }, { "v": 5393.221854204225 }, { "v": 822.0244461933634 }] }, { "c": [{ "v": 2002 }, { "v": 1514.4862930156773 }, { "v": 1514.4845684042916 }, { "v": 0.0017246113857254386 }, { "v": 4430.16679629547 }, { "v": 4266.340752591867 }, { "v": 163.82604370360266 }] }, { "c": [{ "v": 2003 }, { "v": 1496.556007649804 }, { "v": 1496.511232587447 }, { "v": 0.04477506235707551 }, { "v": 7256.299249841063 }, { "v": 6502.849945628193 }, { "v": 753.4493042128697 }] }, { "c": [{ "v": 2004 }, { "v": 1560.6997111413248 }, { "v": 1560.6006478003428 }, { "v": 0.09906334098195657 }, { "v": 4368.635535592863 }, { "v": 3948.1837701547556 }, { "v": 420.4517654381074 }] }, { "c": [{ "v": 2005 }, { "v": 1543.2346059643794 }, { "v": 1542.9775310502635 }, { "v": 0.25707491411594674 }, { "v": 4322.267351198117 }, { "v": 3825.9986969431193 }, { "v": 496.26865425499756 }] }, { "c": [{ "v": 2006 }, { "v": 1535.3827988191601 }, { "v": 1535.3827988191601 }, { "v": 0.0 }, { "v": 6198.485954976175 }, { "v": 6059.082162459287 }, { "v": 139.40379251688765 }] }, { "c": [{ "v": 2007 }, { "v": 1490.7021764161632 }, { "v": 1490.700439790949 }, { "v": 0.0017366252141073346 }, { "v": 6157.19573671544 }, { "v": 6009.397166228086 }, { "v": 147.79857048735468 }] }, { "c": [{ "v": 2008 }, { "v": 1488.574507322559 }, { "v": 1488.5632825831308 }, { "v": 0.011224739428143948 }, { "v": 6897.813721359271 }, { "v": 6577.849575662729 }, { "v": 319.9641456965417 }] }, { "c": [{ "v": 2009 }, { "v": 1504.7561937713754 }, { "v": 1504.754480179573 }, { "v": 0.0017135918023996055 }, { "v": 7083.061330452953 }, { "v": 7003.1109793436435 }, { "v": 79.95035110931026 }] }, { "c": [{ "v": 2010 }, { "v": 1500.7465850989329 }, { "v": 1500.7465850989329 }, { "v": 0.0 }, { "v": 7239.577929586907 }, { "v": 6944.053599441155 }, { "v": 295.524330145752 }] }, { "c": [{ "v": 2011 }, { "v": 1562.3976863169107 }, { "v": 1562.3951025141748 }, { "v": 0.0025838027358986437 }, { "v": 6150.823567709959 }, { "v": 6040.408278574279 }, { "v": 110.41528913567943 }] }, { "c": [{ "v": 2012 }, { "v": 1548.7728351370065 }, { "v": 1548.6760942921724 }, { "v": 0.09674084483413026 }, { "v": 6633.604380054268 }, { "v": 5900.429036860101 }, { "v": 733.1753431941669 }] }, { "c": [{ "v": 2013 }, { "v": 1460.9843430820583 }, { "v": 1460.9843430820583 }, { "v": 0.0 }, { "v": 7194.523047225757 }, { "v": 7173.737304009069 }, { "v": 20.78574321668882 }] }, { "c": [{ "v": 2014 }, { "v": 1507.6695368877186 }, { "v": 1507.6695368877186 }, { "v": 0.0 }, { "v": 5808.221946947843 }, { "v": 5791.313041798622 }, { "v": 16.90890514922086 }] }, { "c": [{ "v": 2015 }, { "v": 1466.8327892422267 }, { "v": 1466.823254218284 }, { "v": 0.00953502394258976 }, { "v": 6792.099832852351 }, { "v": 6766.114426560503 }, { "v": 25.98540629184823 }] }, { "c": [{ "v": 2016 }, { "v": 1646.9752353154513 }, { "v": 1646.9752353154513 }, { "v": 0.0 }, { "v": 8825.99340446398 }, { "v": 8821.64494794896 }, { "v": 4.348456515020042 }] }, { "c": [{ "v": 2017 }, { "v": 1588.7975749776901 }, { "v": 1588.7975749776901 }, { "v": 0.0 }, { "v": 5870.358511402323 }, { "v": 5860.553909067635 }, { "v": 9.804602334687402 }] }, { "c": [{ "v": 2018 }, { "v": 1454.0395471485006 }, { "v": 1454.0395471485006 }, { "v": 0.0 }, { "v": 9204.678443426814 }, { "v": 9180.839905176776 }, { "v": 23.83853825003881 }] }] } };
    var query_busy_option = { spinner: "accordion", color: '#ff5722', fontSize: '2rem', text: 'Getting information...', textMargin: '2rem', textPosition: 'bottom', background: '#888686e0' };

    function initmap() {
        // set up the map
        var height = $('#slide-out').height();
        $('#map').height(height)
        map = new L.Map("map", { minZoom: 3, attributionControl: false, zoomControl: false });

        var info = L.control();

        info.onAdd = function (map) {
            this._div = L.DomUtil.create('div', 'info');
            //this.update();
            return this._div;
        };



        info.addTo(map);




        function highlightFeature(e, popup_info) {
            var layer = e.target;

            console.info(popup_info)
            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                layer.bringToFront();
            }
            //info.innerHTML = 
            $('.info').html(popup_info);
            //info.update(popup_info);
        }

        // var elem = document.querySelector('.tabs');
        // var instance = M.Tabs.getInstance(elem);

        // instance.select('reservoirs');

        $('.tabs').tabs();
        $('ul.tabs').tabs("select", "general");

        var toastHTML = '<span>Goal  has been added</span>'


        //  M.toast({ html: toastHTML, classes: 'goal_toast black', outDuration: 350000 });
        var elem = document.querySelector('.sidenav');
        var sidenav_instance = M.Sidenav.init(elem, {
            closeOnClick: false,
            onOpenStart: function () {
                $('.sidenav_container').addClass('s4');



                console.warn('open sidenav')

                if ($('.map_container').hasClass('s12'))
                    $('.map_container').removeClass('s12').addClass('s8');

                map.invalidateSize();
            },
            onOpenEnd: function () {

                $('.sidenav-overlay').remove();
            },
            onCloseStart: function () {
                $('.sidenav_container').removeClass('s4');
                if ($('.map_container').hasClass('s8'))
                    $('.map_container').removeClass('s8').addClass('s12');
                map.invalidateSize()
            },
            inDuration: 350,
            outDuration: 350,
            swipeable: true,
            responsiveThreshold: 1920,
            edge: 'left' //or right
        });
        sidenav_instance.open();
        setTimeout(function () {
            //  sidenav_instance.close();
        }, 1000)

        document
            .querySelector(".sidebar_triggering")
            .addEventListener("click", function () {

                if (sidenav_instance.isOpen) {
                    console.log("Is open: I need to close it");
                    //return false;
                    sidenav_instance.close();
                } else {
                    console.log("Is closed: I need to open it");
                    sidenav_instance.open();
                }
            });



        var CartoDB_DarkMatter = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}{r}.png', {
            //   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
            subdomains: 'abcd',
            zIndex: -2222,
            baselayer: true,
            maxZoom: 19
        });

        CartoDB_DarkMatter.is_base = true;

        var carto_light = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png');
        carto_light.is_base = true;

        map.setView(new L.LatLng(lat, lng), zoom);
        map.addLayer(carto_light);


        map.on('overlayadd', function (eventLayer) {

            $('#map').busyLoad("show", { spinner: "accordion", background: "#101010" });
            console.info(eventLayer)


            Materialize.toast('Layer successfully added', 4000);

        })
        map.on('overlayremove', function (eventLayer) {

            Materialize.toast('Layer successfully added', 4000);


        })

        var baseLayers = {

            'Light': carto_light,
            'Black Layer': CartoDB_DarkMatter


        };

        function successFunction(data) {
            var allRows = data.split(/\r?\n|\r/);
            var arr_fields = ['adm_code', 'adm_name', 'year', 'permanent', 'projectedPermanent', '5yr_Permanent', 'seasonal', 'projectedSeasonal', '5yr_Seasonal'];


            //app_data.entered_data = { ids: [], values: [] }

            allRows.forEach(function (d, i) {
                var this_row_cells = d.split(',');
                var l = this_row_cells.length;

                var pos = all_adm_ids.indexOf(this_row_cells[0]);
                if (pos == -1) {
                    all_adm_ids.push(this_row_cells[0]);
                    arr_adm_names[this_row_cells[1]] = 'null';
                    //arr_adm_obj.push({id:this_row_cells[]})
                    //  arr_adm_names[this_row_cells[1]] = '<span class="autocomplete_adm_id">' + this_row_cells[0] + '</span>'
                    // 'https://placehold.it/250x250';
                    //arr_adm_names[this_row_cells[1]]['adm_code'] = this_row_cells[0];
                    var pos = all_adm_ids.indexOf(this_row_cells[0]);
                    all_admin_obj.push({
                        adm_code: this_row_cells[0],
                        adm_name: this_row_cells[1],
                        all_years: [],
                        all_projected: { sum: 0, avg: 0, data: [] },
                        all_permanent: []

                    })
                    // console.log(pos);
                    // console.info(all_admin_obj[pos])
                }


                for (var i2 = 0; i2 < l; i2++) {
                    //if (i2 > 1) {
                    // if (i2 == 2) {
                    //     console.warn(this_row_cells[2])
                    //     all_admin_obj[pos].all_years.push(this_row_cells[2]);
                    // }
                    switch (i2) {
                        case 2:

                            all_admin_obj[pos].all_years.push(parseInt(this_row_cells[2]));
                            break;
                        case 3:

                            all_admin_obj[pos].all_permanent.push(Number(this_row_cells[3]));
                            break;

                        case 4:
                            all_admin_obj[pos].all_projected.data.push(Number(this_row_cells[4]));

                            //all_admin_obj[pos].all_projected.sum += Number(this_row_cells[4]);

                            break;
                        // case '5': all_admin_obj[pos].all_years.push(this_row_cells[2]):
                        //     break;
                        // case '6': all_admin_obj[pos].all_years.push(this_row_cells[2]):
                        //     break;
                        default:
                            break;
                    }
                    //all_admin_obj[pos].adm_name = 
                }
                //}


            })

            // for (var p in all_admin_obj) {
            //     var _t = all_admin_obj[p];
            //     console.log(_t)
            //     console.warn(_t.all_projected.sum)
            //     _t.all_projected.avg = _t.all_projected.sum / _t.all_years.length;

            // }
            // console.info(all_admin_obj)
        }

        $.ajax({
            url: './data/csv/gaul_level_0.csv',
            dataType: 'text',
        }).done(successFunction).done(function () {
            // var data = all_admin_obj.map(function (d) {
            //     return d.adm_name,
            // })
            $('input.autocomplete').autocomplete({
                data: arr_adm_names,
                onAutocomplete: function (txt) {
                    var adm_name = txt;
                    var just_names = Object.keys(arr_adm_names);
                    //console.info(just_names)

                    var pos = just_names.indexOf(adm_name);

                    topoLayer.eachLayer(function (layer) {
                        console.log(layer.feature.properties.adm_name)
                        console.log(layer)
                        if (layer.feature.properties.adm_name == adm_name) {
                            console.log(layer.feature.properties.adm_name);
                            get_chart(all_admin_obj[pos]);
                            //layer.fire('click');
                            //layer.fire('mouseover');

                            // var _sel = all_admin_obj.filter(function(d) {
                            //     return d.adm_code == prop.adm_code
                            // })[0];
                            // console.info(_sel)

                            var bounds = layer._bounds;
                            var center = bounds.getCenter();
                            console.log(center)
                            //map.fitBounds(bounds)

                            map.flyTo(center, 6)
                            map.fitBounds(bounds);
                            setTimeout(function () {
                                layer.setStyle({ weight: 2 });
                                // layer.properties.popup_info
                                layer._popup.setLatLng([center.lat, center.lng]).openOn(map);
                            }, 500)




                        }
                    })


                }
            });
        });

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }

        var topoLayer = new L.TopoJSON();

        $.getJSON('data/gaul_0.topojson')
            .done(addTopoData)
        
          var url = 'https://geospatial.jrc.ec.europa.eu/geoserver/hotspots/wms?service=WMS';
        var basins06 = L.tileLayer.wms(url, {
            tileSize: 256,
            tiled: true,
            width: 256,
            height: 256
        });

        basins06.setParams({

            // width:null,
            // height:null,
            updateWhenIdle: false,
            //  zoomOffset:-1,
            //part of wmsParams!
            layers: 'hybas_all_level06',
            transparent: true,
            format: 'image/png',

            VERSION: '1.1.0',

            zIndex: 33// Use zIndex to order the tileLayers within the tilePane. The higher number, the upper vertically.
        }).addTo(map);

        function addTopoData(topoData) {


            topoLayer.addData(topoData);
            topoLayer.setStyle({

                weight: 0,
                color: '#dc1c98',
                fillOpacity: .01
            });

            function throttle(fn, threshhold, scope) {
                threshhold || (threshhold = 250);
                var last,
                    deferTimer;
                return function () {
                    var context = scope || this;

                    var now = +new Date,
                        args = arguments;
                    if (last && now < last + threshhold) {
                        // hold on to it
                        clearTimeout(deferTimer);
                        deferTimer = setTimeout(function () {
                            last = now;
                            fn.apply(context, args);
                        }, threshhold);
                    } else {
                        last = now;
                        fn.apply(context, args);
                    }
                };
            }
            $('body').on('mousemove', throttle(function (e) {
                console.warn('mouseomove')
                console.info(e.pageX);
                console.info(e.pageY);
                var p = $('#map').position();
                $('.toast').css({
                    position: 'relative!important',
                    top: p.top + 'px!important',
                    //+ 'px!important',
                    left: p.left + 'px!important'
                    // e.pageY + 'px!important'
                })
            }, 500));
            topoLayer.eachLayer(function (layer) {
                console.log(layer)
                var prop = layer.feature.properties;

                var popup_info = '<span class="adm_name">' + prop.adm_name + '</h4><hr>  <div class="row popup_info"> <div class="col s12"> <span class="badges">' + getRandomInt(-100, 100) + '% </span> <div>Spatial area </div> </div> <div class="col s12"> <span class="badges">' + getRandomInt(-100, 100) + '% </span> <div>Water quality </div> </div> <div class="col s12"> <span class="badges">' + getRandomInt(0, 100) + ' % </span> <div>Water quantity </div> </div> </div>';
                //popup_info += ' <div class="row"> <div class="col s12"> <ul class="collection"> <li class="collection-item"> <div>First test</div><span class="new badge red">-4%</span> </li> <li class="collection-item"> <div>Second </div><span class="new badge blue">+44%</span> </li> </ul> </div> </div>';

                //layer.properties.popup_info = popup_info;
                var popup = L.popup({ 'className': 'getinfo_popup' });


                popup.setContent(popup_info)
                layer.bindPopup(popup);


                layer.on('click', function (e) {
                    var latlng = e.latlng;

                    var _sel = all_admin_obj.filter(function (d) {
                        return d.adm_code == prop.adm_code
                    })[0];
                    console.info(_sel)

                    var bounds = layer._bounds;
                    var center = bounds.getCenter();
                    console.log(center)
                    //map.fitBounds(bounds)

                    //  map.flyTo(center, 6)
                    map.fitBounds(bounds);
                    popup.setLatLng(e.latlng).openOn(map);

                    get_chart(_sel);

                });
                layer.on('mouseout', function (e) {
                    e.target.closePopup();
                    // resetHighlight(e)
                    layer.setStyle({ weight: 0 });
                });
                layer.on('mouseover', throttle(function (e) {

                    highlightFeature(e, popup_info);


                    console.warn('throttling mouseover')
                    layer.setStyle({ weight: 2 });
                }, 200));

                layer.on('mousemove', throttle(function (e) {
                    // console.warn('mouseomove')
                    // console.info(e.pageX);
                    // console.info(e.pagey);

                    var parentOffset = $('#map').offset();
                    //or $(this).offset(); if you really just want the current element's offset
                    console.log(parentOffset.left);
                    //var relY = e.pageY - parentOffset.top;
                    /*
top: 32%;
    right: 71%!important;
                    */

                    popup.setLatLng(e.latlng).openOn(map);
                    console.warn('throttling mousemove')
                }, 10))
            })
            // topoLayer.onEachFeature = function (feature, layer) {

            // }
            topoLayer.addTo(map);

            map.on('popupopen', function (e) {
                console.warn('popup-opening')
                console.log(e)
                //if (e.popup.options.className=='getinfo_popup')
                if (e.popup.options.className == 'circles_popup') {
                    setTimeout(function () {

                    }, 600)
                }
            })


            var transitions = new L.tileLayer("https://storage.googleapis.com/global-surface-water/tiles2018/transitions/{z}/{x}/{y}.png", {
                format: "image/png",
                maxZoom: 18,
                zIndex: 3000,
                errorTileUrl: "https://storage.googleapis.com/global-surface-water/downloads_ancillary/blank.png",
                attribution: "2016 EC JRC/Google"
            }).addTo(map);

            transitions.setZIndex(20000);
        }


        // var overlayLayers = {

        //   'Water transitions': transitions,
        //   'countries': topoLayer
        // };

        // var controls = L.control.orderlayers(baseLayers, overlayLayers, {

        //   collapsed: true
        // }).addTo(map);

        // $('#map').on('hover', function (e) {
        //     console.log('hvoering map');
        //     console.log("mouse location:", e.clientX, e.clientY)
        // })
        function handleMouseMove(event) {
            var eventDoc, doc, body;

            event = event || window.event; // IE-ism

            // If pageX/Y aren't available and clientX/Y are,
            // calculate pageX/Y - logic taken from jQuery.
            // (This is to support old IE)
            if (event.pageX == null && event.clientX != null) {
                eventDoc = (event.target && event.target.ownerDocument) || document;
                doc = eventDoc.documentElement;
                body = eventDoc.body;

                event.pageX = event.clientX +
                    (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
                    (doc && doc.clientLeft || body && body.clientLeft || 0);
                event.pageY = event.clientY +
                    (doc && doc.scrollTop || body && body.scrollTop || 0) -
                    (doc && doc.clientTop || body && body.clientTop || 0);
            }
            return { x: event.pageX, y: event.pageY }

            // Use event.pageX / event.pageY here
        }
        var moved = false
        // window.onmousemove = function(e) {

        //     console.warn(e.target);
        //     if ($(e.target).hasClass('getinfo_popup')) {
        //         alert('over popup')
        //     }
        //     // if ($('.getinfo_popup:visible').length > 0) {
        //     var loc = handleMouseMove();
        //     // console.log(map.mouseEventToLatLng(e))

        //     //  }
        //     // do what you want after mousemove, here

        // }

        // map.on('click', function(e) {
        //     // var latlng = e.latlng; $.get('https://gearth-252319.appspot.com?lat=' + latlng.lat + '&lng=' + latlng.lng, function (info) {
        //     //   console.warn(info)
        //     //   // 
        //     //   //var popup = L.popup({ 'className': 'getinfo_popup' })                        //     .setLatLng([latlng.lat, latlng.lng])                        //     .setContent('test')                        //     .openOn(map);                })                //  http://localhost:8080/?lat=125.6&lng=10.1
        //     // })
        //     get_chart(water_data);
        // })

        function get_chart(data) {
            console.log(data)
            var all_years = data.all_years;
            var all_permanent = data.all_permanent;
            var all_projected = data.all_projected.data;
            $('.highcharts_general').prev().text(data.adm_name)

            $('.highcharts').show();

            var chart = new Highcharts.Chart({
                chart: {
                    type: 'column',
                    zoomType: 'xy',
                    renderTo: $('.highcharts_general')[0],
                    // height:409                             
                },
                title: {
                    //text: 'Only landcover classes with bigger than 1% surface are shown on this graphic'
                    text: 'Water change'
                },
                xAxis: {
                    categories: all_years
                },


                yAxis: {
                    title: {
                        text: null
                    }

                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        pointWidth: 10,
                        dataLabels: {
                            enabled: false,
                            //format: '{point.y:.1f}%'
                        }
                    }
                },

                yAxis: {

                    title: {
                        text: null,
                        align: 'center'
                    }
                },

                tooltip: {
                    shared: true
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'Permanent',
                    color: 'rgba(165,170,217,1)',
                    data: all_permanent,
                    pointPadding: 0.3,
                    pointPlacement: -0.2
                }, {
                    name: 'Projected',
                    color: 'rgba(126,86,134,.9)',
                    data: all_projected,
                    pointPadding: 0.4,
                    pointPlacement: -0.2
                }]
            });
        }
    }
    initmap();





})
