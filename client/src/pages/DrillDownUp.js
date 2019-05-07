import Highcharts from 'highcharts';

export const drillDownEvent = (e, compare) => {
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
    chart.setTitle({text: newTitle + value.toFixed(2)});
    if(!chart.drilled) {
      chart.drilled = 0;
    }
    if(chart !== e.target) {
      chart.drilled ++;
      if(!compare)
        chart.series[0].points[e.point.index].doDrilldown();
    }
  });
}

export const drillUpEvent = (e, compare) => {
  if(!e.seriesOptions) {
    console.log("Category Name Not Found!", e);
    return;
  }
  let newTitle = e.seriesOptions.name + ": $";
  let value = 0;
  if(e.seriesOptions.name === "Balance"){
    if(e.seriesOptions.data.length > 0) {
      value = e.seriesOptions.data[1].v - e.seriesOptions.data[0].v
    } 
  } else {
    if(e.seriesOptions.data.length > 0) {
      for(let data of e.seriesOptions.data) {
        value += data.v;
      }
    } 
  }
  if(Highcharts.targetLevel === e.target.drilled) {
    return;
  }
  Highcharts.targetLevel = e.target.drilled - 1;
  e.target.drilled --;
  Highcharts.charts.forEach((chart) => {
    chart.setTitle({text: newTitle + value.toFixed(2)});
    if(chart !== e.target) {
        chart.drilled--;
        if(!compare)
          chart.drillUp();
    }
  });
  Highcharts.targetLevel = -1;
}