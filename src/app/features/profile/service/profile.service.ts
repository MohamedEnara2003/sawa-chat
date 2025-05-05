import { computed, Injectable, signal } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  labels = signal<string[]>(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);
  labelsTwo = signal<string[]>(['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5']);


  profileViewsData = signal<number[]>([0, 25, 50, 75, 50, 125 , 150]);
  profileViewsChartData = computed<ChartConfiguration['data']>(
    () => (
      {
        labels: this.labels(),
        datasets: [
          {
            data: this.profileViewsData(), 
            label: 'Profile Views',
            fill: true,
            borderColor: '#facc15', 
            backgroundColor: 'rgba(250, 204, 21, 0.2)',
            pointBackgroundColor: '#facc15',
            pointBorderColor: '#facc15',
            tension: 0.4
          }
        ]
      }
    )
);

  profileViewsChartOptions = computed<ChartConfiguration['options']>(
  () => (
    {
      responsive: true,
      maintainAspectRatio : false ,
      plugins: {
        title: {
          display: true,
          text: 'My Account Activity',
          color: '#fff',
          font: {
            size: 18,
            weight: 'bold'
          },
          align : 'start' ,
          padding: {
            top: 0,
            bottom: 20
          }
        },
        legend: {
          display: false
        }
      },
    }
  )
);


postChartData = computed<ChartData<'bar'>>(
  () => ( 
    {
      labels: this.labels(),
      datasets: [
        { label: 'Likes', data: [120, 200, 150, 250, 180, 300, 220], backgroundColor: '#facc15' },
        { label: 'Comments', data: [40, 65, 50, 80, 60, 90, 75], backgroundColor: '#38bdf8' },
        { label: 'Shares', data: [10, 25, 20, 30, 22, 40, 28], backgroundColor: '#a78bfa' },
      ]
    }
  )
);
postChartOptions = computed<ChartOptions>(
  () => (
    {
      responsive: true,
      maintainAspectRatio : false ,
      plugins: {
        title: {
          display: true,
          text: 'Post Interactions',
          color: '#fff',
          font: {
            size: 18,
            weight: 'bold'
          },
          align : 'start' ,
          padding: {
            top: 0,
            bottom: 20
          }
        },
      
      },
    }
  )
);

followersGrowthChartData = computed<ChartData<'bar'>>(
  () => ( 
    {
      labels: this.labelsTwo(),
      datasets: [
        {fill: false ,label: 'Followers', data: [2, 10, 20, 30, 50], backgroundColor: '#22c55e' },
        {fill: false ,label: 'Following', data: [1, 10, 20, 30, 5], backgroundColor: '#3b82f6' },
      ]
    }
  )
);
followersGrowthChartOptions = computed<ChartOptions>(
  () => (
    {
      responsive: true,
      maintainAspectRatio : false ,
      plugins: {
        title: {
          display: true,
          text: 'Followers Growth',
          color: '#fff',
          font: {
            size: 18,
            weight: 'bold'
          },
          align : 'start' ,
          padding: {
            top: 0,
            bottom: 20
          }
        },
      
      },
    }
  )
);
}
