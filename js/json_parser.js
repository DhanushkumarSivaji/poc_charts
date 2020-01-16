(function($) {
    "use strict"; // Start of use strict
    $(".overlay").css("display", "block");
    function generateChart(selectedCity) {
        $.getJSON('../data/consolidated_data.json', function(jsonData) {
            var index = 0;
            var buildingPriceRange = {};
            var buildingTypesWithinPriceRange = [];
            var buildingStatusWithinSpecificTypeAndPriceRange = [];
            var buildingTypesRange = {};
            var buildingStatusRange = {};
            var buildingAreaRange = {};
            var buildingTypesWithSpecificStatus = [];
            var buildingPriceRangeWithinSpecificType = [];
            var buildingPriceRangeWithinSpecificTypeAndStatus = [];
            var buildingTypeWithinAreaRange = [];
            var buildingStatus = [];
            var priceRanges = [];
            var buildingTypes = [];
            var areaCategories = [];
            var citiesList = [0];
            var projectCount = 0;
            var totalArea = 0;
    
            // debugger
            $(jsonData).each(function() {
                if($(this)[0] != undefined) {
                    var currentCity = $(this)[0].CITY;
                    if(citiesList.includes(currentCity) == false) {
                        citiesList.push(currentCity);
                    }
                    
                    if (selectedCity == 0 || selectedCity == currentCity) {
                        var currentPriceCategory = $(this)[0].Price_Category.trim();
                        var currentBuildingType = $(this)[0].Apt_type.trim();
                        var currentStatus = $(this)[0].status.trim();
                        var currentAreaCategory = $(this)[0].AreaCategory.trim();

                        projectCount += 1;
                        totalArea += $(this)[0].Area_Number;
                        
                        if (currentBuildingType == "") {
                            currentBuildingType = "Unspecified";
                        }

                        if (currentAreaCategory == 'NO AREA') {
                            currentAreaCategory = "Unspecified";
                        }

                        // debugger
                        if (currentStatus == "") {
                            currentStatus = "Unknown";
                        }
                        else if(currentStatus.search("'19") > 0) {
                            currentStatus = "2019";
                        }
                        else if (currentStatus.search("'20") > 0) {
                            currentStatus = "2020";
                        }
                        else if (currentStatus.search("'21") > 0) {
                            currentStatus = "2021";
                        }
                        else if (currentStatus.search("'22") > 0) {
                            currentStatus = "2022";
                        }
                        else if (currentStatus.search("'23") > 0) {
                            currentStatus = "2023";
                        }
                        else if (currentStatus.search("'24") > 0) {
                            currentStatus = "2024";
                        }
                        else if (currentStatus.search("'25") > 0) {
                            currentStatus = "2025";
                        }
        
                        if (priceRanges.includes(currentPriceCategory) == false) {
                            priceRanges.push(currentPriceCategory);
                        }

                        if (buildingTypes.includes(currentBuildingType) == false) {
                            buildingTypes.push(currentBuildingType);
                        }

                        if(buildingStatus.includes(currentStatus) == false) {
                            buildingStatus.push(currentStatus);
                        }

                        if(areaCategories.includes(currentAreaCategory) == false) {
                            areaCategories.push(currentAreaCategory);
                        }
        
                        if (buildingPriceRange[currentPriceCategory] == undefined) {
                            // Adding the Price Category
                            buildingPriceRange[currentPriceCategory] = { name: currentPriceCategory, y: 1, drilldown: currentPriceCategory}
                        }
                        else {
                            // Already Added, increase count
                            buildingPriceRange[currentPriceCategory].y += 1;
                        }
        
                        if (buildingTypesWithinPriceRange[currentPriceCategory + "|" + currentBuildingType] == undefined) {
                            buildingTypesWithinPriceRange[currentPriceCategory + "|" + currentBuildingType] = 1; 
                        }
                        else {
                            buildingTypesWithinPriceRange[currentPriceCategory + "|" + currentBuildingType] += 1
                        }

                        if (buildingPriceRangeWithinSpecificType[currentBuildingType + "|" + currentPriceCategory] == undefined) {
                            buildingPriceRangeWithinSpecificType[currentBuildingType + "|" + currentPriceCategory] = 1;
                        }
                        else {
                            buildingPriceRangeWithinSpecificType[currentBuildingType + "|" + currentPriceCategory] += 1;
                        }

                        if (buildingStatusWithinSpecificTypeAndPriceRange[currentPriceCategory + "|" + currentBuildingType + "|" + currentStatus ] == undefined) {
                            buildingStatusWithinSpecificTypeAndPriceRange[currentPriceCategory + "|" + currentBuildingType + "|" + currentStatus ] = 1;
                        }
                        else {
                            buildingStatusWithinSpecificTypeAndPriceRange[currentPriceCategory + "|" + currentBuildingType + "|" + currentStatus ] += 1;
                        }

                        if (buildingStatusRange[currentStatus] == undefined) {
                            buildingStatusRange[currentStatus] = { name: currentStatus, y: 1, drilldown: currentStatus };
                        }
                        else {
                            buildingStatusRange[currentStatus].y += 1;
                        }

                        if (buildingTypesWithSpecificStatus[currentStatus + "|" + currentBuildingType] == undefined) {
                            buildingTypesWithSpecificStatus[currentStatus + "|" + currentBuildingType] = 1;
                        }
                        else {
                            buildingTypesWithSpecificStatus[currentStatus + "|" + currentBuildingType] += 1;
                        }

                        if (buildingPriceRangeWithinSpecificTypeAndStatus[currentStatus + "|" + currentBuildingType + "|" + currentPriceCategory] == undefined) {
                            buildingPriceRangeWithinSpecificTypeAndStatus[currentStatus + "|" + currentBuildingType + "|" + currentPriceCategory] = 1;
                        }
                        else {
                            buildingPriceRangeWithinSpecificTypeAndStatus[currentStatus + "|" + currentBuildingType + "|" + currentPriceCategory] += 1;
                        }

                        if (buildingTypesRange[currentBuildingType] == undefined) {
                            buildingTypesRange[currentBuildingType] = {name: currentBuildingType, y: 1, drilldown: currentBuildingType};
                        }
                        else {
                            buildingTypesRange[currentBuildingType].y += 1;
                        }

                        if (buildingAreaRange[currentAreaCategory] == undefined) {
                            buildingAreaRange[currentAreaCategory] = { minPointSize: 10, innerSize: '20%', zMin: 0, name: currentAreaCategory, y: 1, drilldown: currentAreaCategory};
                        } 
                        else {
                            buildingAreaRange[currentAreaCategory].y += 1;
                        }

                        if (buildingTypeWithinAreaRange[currentAreaCategory + "|" + currentBuildingType] == undefined) {
                            buildingTypeWithinAreaRange[currentAreaCategory + "|" + currentBuildingType] = 1;
                        }
                        else {
                            buildingTypeWithinAreaRange[currentAreaCategory + "|" + currentBuildingType] += 1;
                        }
 
                    }
                    index += 1;
                }
            });
            // alert(index);

            if($('#citySelector').find('option').length == 0) {
                var option = '';
                for (var i=0;i<citiesList.length;i++){
                    var cityName;
                    if (citiesList[i] == 0) {
                        cityName = 'All';
                    }
                    else if (citiesList[i] == 5196) {
                        cityName = 'Chennai';
                    }
                    else if (citiesList[i] == 3327) {
                        cityName = 'Bangalore';
                    }
                    else if (citiesList[i] == 6903) {
                        cityName = 'Kolkatta'
                    }
                    else if (citiesList[i] == 4320) {
                        cityName = 'Mumbai'
                    }
                    else if (citiesList[i] == 6915) {
                        cityName = 'Coimbatore'
                    }
                    else if (citiesList[i] == 7233) {
                        cityName = 'Mysore'
                    }
                    else if (citiesList[i] == 3096) {
                        cityName = 'Patna'
                    }
                    else if (citiesList[i] == 2234) {
                        cityName = 'Pune'
                    }

                    option += '<option value="'+ citiesList[i] + '">' + cityName + '</option>';
                }
            }
            
            $('#citySelector').append(option);

            $('#projectsContainer').empty().append('<h2 class="numberCount" id="projectCount"> ' + numberWithCommas(projectCount) + ' nos</h2>')
            $('#areaContainer').empty().append('<h2 class="numberCount" id="totalArea"> ' + numberWithCommas(totalArea) + ' Sq.Ft</h2>')

            $(".overlay").css("display", "none");

            // Pie Chart Preparation
            // debugger;
            var buildingPriceData = [];
            var buildingTypesWithinPriceRangeData = [];
            $(priceRanges).each(function() {
                var price = this;
                var buildingTypesData = [];
                buildingPriceData.push(buildingPriceRange[price]);
                $(buildingTypes).each(function() {
                    var buildingType = this;
                    var buildingStatusUnderSpecificTypeData = [];

                    if (buildingTypesWithinPriceRange[price + "|" + buildingType] != undefined) {
                        buildingTypesData.push({name: buildingType, id: buildingType, y: buildingTypesWithinPriceRange[price + "|" + buildingType], drilldown: (price + "|" + buildingType)})
                    }

                    $(buildingStatus).each(function() {
                        var status = this;
                        if(buildingStatusWithinSpecificTypeAndPriceRange[price + "|" + buildingType + "|" + status] != undefined) {
                            buildingStatusUnderSpecificTypeData.push({name: status, y: buildingStatusWithinSpecificTypeAndPriceRange[price + "|" + buildingType + "|" + status]});
                        }
                    });
                    
                    buildingTypesWithinPriceRangeData.push({ name: 'Availability', id: (price + "|" + buildingType), data: buildingStatusUnderSpecificTypeData})

                });
                // debugger
                buildingTypesWithinPriceRangeData.push({name: price, id: price, data: buildingTypesData})
            });
            createChart(buildingPriceData, buildingTypesWithinPriceRangeData, 'priceRangeContainer', 'pie', 'Price Range', 'Click the slices to view types of buildings and their statuses within each price range.');
            
            // Bar Chart Preparation
            var buildingStatusData = [];
            var buildingTypesWithSpecificStatusData = [];
            $(buildingStatus).each(function() {
                var status = this;
                var buildingTypesData = [];
                buildingStatusData.push(buildingStatusRange[status]);
                $(buildingTypes).each(function() {
                    var buildingType = this;
                    var buildingPriceRangeUnderSpecificStatusData = [];
                    if (buildingTypesWithSpecificStatus[ status + "|" + buildingType] != undefined) {
                        buildingTypesData.push({name: buildingType, id: buildingType, y: buildingTypesWithSpecificStatus[ status + "|" + buildingType], drilldown: (status + "|" + buildingType)})
                    }

                    $(priceRanges).each(function() {
                        var price = this;
                        if(buildingPriceRangeWithinSpecificTypeAndStatus[status + "|" + buildingType + "|" + price] != undefined) {
                            buildingPriceRangeUnderSpecificStatusData.push({name: price, y: buildingPriceRangeWithinSpecificTypeAndStatus[status + "|" + buildingType + "|" + price]});
                        }
                    });

                    buildingTypesWithSpecificStatusData.push({name: 'Price Range', id: (status +"|"+ buildingType), data: buildingPriceRangeUnderSpecificStatusData});

                });
                buildingTypesWithSpecificStatusData.push({name: status, id: status, data: buildingTypesData});
            });
            createChart(buildingStatusData, buildingTypesWithSpecificStatusData, 'buildingStatusContainer', 'column', 'Availability', 'Click the bars to view types of buildings and their price ranges based on availability.');

            // Project Count Preparation
            $("#projectCount").on('click', function(){
                // debugger;
                var buildingTypeData = [];
                var buildingPriceRangeWithinSpecificTypeData = [];
                $(buildingTypes).each(function() {
                    var buildingType = this;
                    var buildingPriceRangeData = [];
                    buildingTypeData.push(buildingTypesRange[buildingType]);
                    $(priceRanges).each(function() {
                        var price = this;    
                        if (buildingPriceRangeWithinSpecificType[ buildingType + "|" + price] != undefined) {
                            buildingPriceRangeData.push([price, buildingPriceRangeWithinSpecificType[ buildingType + "|" + price]])
                        }
                    });
                    // debugger
                    buildingPriceRangeWithinSpecificTypeData.push({name: buildingType, id: buildingType, data: buildingPriceRangeData})
                });
                createChart(buildingTypeData, buildingPriceRangeWithinSpecificTypeData, 'projectsContainer', 'column', 'Buildings', 'Click the types of buildings to see their price ranges' );
            });

            // Total Area Preparation
            $("#totalArea").on('click', function(){
                var buildingAreaData = [];
                var buildingTypeWithinAreaRangeData = [];

                $(areaCategories).each(function() {
                    var areaCategory = this;
                    var buildingTypesRangeData = [];
                    buildingAreaData.push(buildingAreaRange[areaCategory]);
                    $(buildingTypes).each(function() {
                        var buildingType = this;
                        if (buildingTypeWithinAreaRange[areaCategory + "|" + buildingType] != undefined) {
                            buildingTypesRangeData.push([buildingType, buildingTypeWithinAreaRange[areaCategory + "|" + buildingType]]);
                        }
                    });
                    buildingTypeWithinAreaRangeData.push({name: areaCategory, id: areaCategory, data: buildingTypesRangeData});
                });
                createChart(buildingAreaData, buildingTypeWithinAreaRangeData, 'areaContainer', 'pie', 'Area (Sq.Ft) wise Buildings', 'Click the desired Area range to see their building Types' );
            });
        });
    }
  
    // Create the chart
    function createChart(seriesData, drilldownData, container, chartType, title, subtitle) {
        console.log("chartType",chartType)
        console.log("seriesData",JSON.stringify(seriesData))
        console.log('drilldownData',JSON.stringify(drilldownData))
        console.log(title,subtitle)

        Highcharts.chart(container, {
            chart: {
                type: chartType
            },
            title: {
                text: title
            },
            subtitle: {
                text: subtitle
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: (chartType == 'column') ? true : false,
                        format: (chartType == 'column') ? '{point.y}' : ''
                    }
                },
                pie: {
                    showInLegend: true
                }, 
                column: {
                    showInLegend: false
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: 'A Total of <b>{point.y}</b> properties available for <span style="color:{point.color}">{point.name}</span><br/>'
            },
            xAxis: {
                type: "category"
            },
            series: [
                {
                    name: title,
                    colorByPoint: true,
                    data: seriesData
                }
            ],
            drilldown: {
                series: drilldownData
            }
        });   
    }

    function numberWithCommas(x) {
        
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    $(document).on('change', '#citySelector', function(event){
        // debugger
        generateChart($(this).val())
    });

    generateChart(0);

  })(jQuery); // End of use strict
  