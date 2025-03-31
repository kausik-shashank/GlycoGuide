google.charts.load('current', { 'packages': ['corechart'] });

google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    let bloodSugarLevel = null

    fetch('/api/data')
        .then(response => {
            return response.json();
        })
        .then(data => {
            bloodSugarLevel = data.bloodSugar

            console.log(bloodSugarLevel.Monday);
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Category');
            data.addColumn('number', 'Value');
            data.addRows([
                ['Mon', bloodSugarLevel.Monday],
                ['Tue', bloodSugarLevel.Tuesday],
                ['Wed', bloodSugarLevel.Wednesday],
                ['Thu', bloodSugarLevel.Thursday],
                ['Fri', bloodSugarLevel.Friday],
                ['Sat', bloodSugarLevel.Saturday],
                ['Sun', bloodSugarLevel.Sunday]
            ]);

            var options = {
                'title': 'Blood Sugar Level',
                'titleTextStyle': {
                    color: '#e1e1e1',
                    fontSize: 14
                },
                'width': '100%',
                'height': '100%',
                'backgroundColor': 'transparent',
                'colors': ['#e1e1e1'],
                'vAxis': {
                    'gridlines': {
                        'color': '#e1e1e1',
                    },
                    'textStyle': {
                        color: '#e1e1e1'
                    }
                },
                'hAxis': {
                    'textStyle': {
                        color: '#e1e1e1'
                    },
                    'baselineColor': '#e1e1e1',
                    'gridlines': {
                        'color': '#e1e1e1'
                    }
                },
                'legend': 'none'
            };

            var chart = new google.visualization.ColumnChart(document.querySelector('.mid-right-bottom'));
            chart.draw(data, options);

            window.addEventListener('resize', function () {
                chart.draw(data, options);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

}