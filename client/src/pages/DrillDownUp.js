import Highcharts from 'highcharts';

export const drillDownEvent = (e) => {
  if(!e.seriesOptions) {
    console.log("Category Name Not Found!", e);
    return;
  }
  let newTitle = e.seriesOptions.name + ": $";
  let value = 0;
  if(e.seriesOptions.data.length > 0) {
    for(let data of e.seriesOptions.data) {
      value += data.v;
    }
  }    
  
  if(!e.originalEvent) {
    return;
  }
  if(!e.target.drilled) {
    e.target.drilled = 0;
  }
  e.target.drilled ++;
  Highcharts.charts.forEach((chart) => {
    chart.setTitle({text: newTitle + value});
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
  if(!e.seriesOptions) {
    console.log("Category Name Not Found!", e);
    return;
  }
  let newTitle = e.seriesOptions.name + ": $";
  if(e.seriesOptions.name === "Balance"){
    newTitle += "-"
  }
  let value = 0;
  if(e.seriesOptions.data.length > 0) {
    for(let data of e.seriesOptions.data) {
      value += data.v;
    }
  }   
  if(Highcharts.targetLevel === e.target.drilled) {
    return;
  }
  Highcharts.targetLevel = e.target.drilled - 1;
  e.target.drilled --;
  Highcharts.charts.forEach((chart) => {
    chart.setTitle({text: newTitle + value});
    if(chart !== e.target) {
        chart.drilled--;
        chart.drillUp();
    }
  });
  Highcharts.targetLevel = -1;
}