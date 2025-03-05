import Chart, { ChartConfiguration, ChartType } from 'chart.js/auto';
import React, { useEffect, useRef } from 'react';

interface ChartProps {
  type?: ChartType;
  labels: string[];
  datasets: number[];
  title?: string;
}

const ChartComponent: React.FC<ChartProps> = ({ type = 'bar', labels = [], datasets = [], title = '차트' }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    // canvas 요소가 존재하는지 확인
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    // 기존 차트 인스턴스 제거
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // 차트 구성 옵션
    const config: ChartConfiguration = {
      type,
      data: {
        labels,
        datasets: [
          {
            label: title,
            data: datasets,
            backgroundColor: [
              'rgba(75, 192, 192, 0.6)',
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(153, 102, 255, 0.6)',
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        animation: {
          duration: 2000,
          easing: 'easeOutQuart',
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            border: {
              display: false,
            },
            grid: {
              display: false,
            },
            ticks: {
              color: 'transparent',
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: title,
            position: 'bottom',
          },
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
          },
        },
        backgroundColor: 'transparent',
      },
    };

    // 차트 인스턴스 생성
    chartInstanceRef.current = new Chart(ctx, config);

    // 컴포넌트 언마운트 시 차트 제거
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [labels, datasets, type, title]);

  return (
    <div className="w-full max-w-xl mx-auto pr-6">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default ChartComponent;
