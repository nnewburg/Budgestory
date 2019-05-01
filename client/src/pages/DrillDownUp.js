import Highcharts from 'highcharts';

export const drillDownEvent = (e) => {
    // this.setTitle({text: "New Title"});
    if(!e.originalEvent) {
      return;
    }
    if(!e.target.drilled) { //  e.target is the chart user clicked
      e.target.drilled = 0;
    }
    e.target.drilled ++;
    Highcharts.charts.forEach((chart) => {
      if(!chart.drilled) {
        chart.drilled = 0;
      }
      if(chart !== e.target) {
        chart.drilled++;
        chart.series[0].points[e.point.index].doDrilldown();
      }
    });
}

export const drillUpEvent = (e) => {
    if(Highcharts.targetLevel === e.target.drilled) {
        return;
    }
    Highcharts.targetLevel = e.target.drilled - 1;
    e.target.drilled --;
    Highcharts.charts.forEach((chart) => {
        if(chart !== e.target) {
            chart.drilled--;
            chart.drillUp();
        }
    });
    Highcharts.targetLevel = -1;
}