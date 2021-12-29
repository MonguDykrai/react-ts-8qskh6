/**
 * options.yAxis.seconds.label.formatter —— 自定义轴标签
 * options.yAxis.seconds.label.tickLine
 * options.yAxis.seconds.label.tickCount —— Y轴标签总数
 * options.legend —— 图例
 * options.tooltip.title —— tooltip标题
 * options.tooltip.formatter —— 返回值的格式必须为 { name: 'someName', value: 'someValue' }
 * options.xAxis.grid.line —— x 轴的 grid 网格线条样式
 */

import React, { useState, useEffect } from 'react';
import { DualAxes as AntDualAxes } from '@ant-design/charts';
//  import styles from "./index.less";
import { formatTime, toHHMMSS } from './util';

const radius = [7, 7, 0, 0];

const DualAxes = () => {
  const ySeconds = [
    {
      type: '故障损失',
      seconds: 0,
    },
    {
      type: '设置调节',
      seconds: 500,
    },
    {
      type: '减速损失',
      seconds: 100,
    },
    {
      type: '空转',
      seconds: 2000,
    },
    {
      type: '质量缺陷',
      seconds: 25,
    },
    {
      type: '闲置',
      seconds: 45,
    },
  ];
  const yPercentage = [
    {
      type: '故障损失',
      percentage: 0,
    },
    {
      type: '设置调节',
      percentage: 18.7,
    },
    {
      type: '减速损失',
      percentage: 3.75,
    },
    {
      type: '空转',
      percentage: 74.9,
    },
    {
      type: '质量缺陷',
      percentage: 0.09,
    },
    {
      type: '闲置',
      percentage: 1.69,
    },
  ];
  const config = {
    legend: false, // 关闭图例 https://g2plot.antv.vision/zh/docs/api/plots/column#legend
    data: [ySeconds, yPercentage],
    xField: 'type',
    xAxis: {
      label: {
        // 轴标签
        formatter: (text: string) => {
          return text;
        },
      },
    },
    yField: ['seconds', 'percentage'],
    yAxis: {
      seconds: {
        grid: {
          line: {
            style: {
              stroke: `rgba(151, 151, 151, 0.2)`, // y 轴的 grid 网格线条样式
              lineWidth: 1,
            },
          },
        },
        // tickLine: {
        //   lineWidth: 3,
        //   stroke: 'red',
        // },
        // tickCount: 7, // Y轴标签总数
        label: {
          // 轴标签
          formatter: (text: string) => {
            return toHHMMSS(text);
          },
          style: {
            fill: `rgba(148, 160, 183, 1)`,
          },
        },
      },
      percentage: {
        label: {
          formatter: (text: string) => {
            return `${text}%`;
          },
          style: {
            fill: `rgba(148, 160, 183, 1)`,
          },
        },
      },
    },
    // seriesField: 'seconds', // 干啥用的？=> 不知道
    geometryOptions: [
      {
        geometry: 'column',
        // l 为角度 设为 50 比较接近设计图 原先采用的是 270
        color: `l(50) 0:rgba(0, 162, 255, 1) 1:rgba(0, 204, 210, 1),
         l(50) 0:rgba(3, 236, 192, 1) 1:rgba(89, 136, 255, 1),
         l(50) 0:rgba(59, 185, 155, 1) 1:rgba(89, 136, 255, 1),
         l(50) 0:rgba(89, 136, 255, 1) 1:rgba(112, 213, 230, 1),
         `,
        columnWidthRatio: 0.3, // 一般柱状图宽度占比，0 - 1 范围数值
        // column 样式配置 https://g2plot.antv.vision/zh/docs/api/plots/column#columnstyle
        columnStyle: {
          radius,
        },
        columnBackground: {
          // 柱子的背景样式配置 https://g2plot.antv.vision/zh/docs/api/plots/column#columnbackgroundstyle
          style: {
            fill: 'rgba(255, 255, 255, 0.1)',
            radius,
          },
        },
      },
      {
        geometry: 'line',
        color: `rgba(235, 176, 71, 1)`, // line color
        lineStyle: () => {
          return {
            // fill: `rgba(255, 30, 10, 1)`, // area color
            // opacity: 0.5,
          };
        },
        // smooth: true, // 是否平滑
      },
    ],
    tooltip: {
      title: (v: string) => v, // tooltip 标题
      formatter: (datum: {
        type: string;
        seconds?: number;
        percentage?: number;
      }) => {
        const { seconds, percentage } = datum;
        if (typeof seconds !== 'undefined')
          return { name: '时间', value: formatTime(seconds) };
        return { name: '百分比', value: `${percentage}%` };
      },
    },
  };
  return (
    <div style={{ height: '100%' }}>
      {/* 注释掉 tooltip <AntDualAxes /> 不会警告，不知道为什么 */}
      <AntDualAxes {...config} />
    </div>
  );
};

export default DualAxes;
