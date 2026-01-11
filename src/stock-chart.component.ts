import { Component, ElementRef, input, effect, ViewChild, ViewEncapsulation, AfterViewInit, OnDestroy } from '@angular/core';

// d3 is loaded globally in index.html
declare const d3: any;

export interface ChartDataPoint {
  date: Date;
  price: number;
}

@Component({
  selector: 'app-stock-chart',
  standalone: true,
  template: `
    <div class="chart-container w-full h-64 bg-white rounded-lg p-4 relative" #chartContainer></div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
    .tooltip {
      position: absolute;
      text-align: center;
      padding: 8px;
      font-size: 12px;
      background: rgba(15, 23, 42, 0.9);
      color: white;
      border-radius: 4px;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.2s;
      z-index: 10;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      white-space: nowrap;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class StockChartComponent implements AfterViewInit, OnDestroy {
  data = input.required<ChartDataPoint[]>();
  color = input<string>('#10b981'); // default emerald-500
  isUp = input<boolean>(true);

  @ViewChild('chartContainer') private chartContainer!: ElementRef<HTMLDivElement>;
  private resizeObserver?: ResizeObserver;
  private static instanceCounter = 0;
  private readonly instanceId: number;
  private drawTimeoutId?: number;

  constructor() {
    this.instanceId = ++StockChartComponent.instanceCounter;
    
    effect(() => {
      // React to signal changes
      this.data(); 
      this.isUp();
      this.scheduleDraw();
    });
  }

  ngAfterViewInit() {
    // React to size changes
    this.resizeObserver = new ResizeObserver((entries) => {
      // Wrap in requestAnimationFrame or setTimeout to avoid "ResizeObserver loop limit exceeded"
      // Using setTimeout(0) moves it to the next macrotask, safely outside the current loop.
      this.scheduleDraw();
    });
    if (this.chartContainer?.nativeElement) {
      this.resizeObserver.observe(this.chartContainer.nativeElement);
    }
  }

  ngOnDestroy() {
    this.resizeObserver?.disconnect();
    if (this.drawTimeoutId) {
      clearTimeout(this.drawTimeoutId);
    }
  }

  private scheduleDraw() {
    if (this.drawTimeoutId) {
      clearTimeout(this.drawTimeoutId);
    }
    // Use setTimeout to decouple rendering from the ResizeObserver loop
    this.drawTimeoutId = window.setTimeout(() => {
      this.tryDrawChart();
    }, 0);
  }

  private tryDrawChart() {
    const data = this.data();
    if (!this.chartContainer?.nativeElement || !data || data.length === 0) {
      return;
    }
    // Check if d3 is loaded
    if (typeof d3 === 'undefined') {
      console.warn('D3.js not loaded yet');
      return;
    }

    const color = this.isUp() ? '#ef4444' : '#10b981'; // Red for up (Taiwan style), Green for down
    this.drawChart(data, color);
  }

  private drawChart(data: ChartDataPoint[], colorHex: string) {
    const element = this.chartContainer.nativeElement;
    
    // Safety check if element has valid size
    if (element.clientWidth === 0 || element.clientHeight === 0) return;

    // Use d3 to select the specific element to avoid cross-component selection
    const container = d3.select(element);
    container.selectAll('*').remove();

    // Set dimensions
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = element.clientWidth - margin.left - margin.right;
    const height = element.clientHeight - margin.top - margin.bottom;

    const svg = container
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Add scales
    const x = d3.scaleTime()
      .domain(d3.extent(data, (d: any) => d.date))
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([
        d3.min(data, (d: any) => d.price) * 0.99, 
        d3.max(data, (d: any) => d.price) * 1.01
      ])
      .range([height, 0]);

    // Add X axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(Math.max(width / 80, 2)).tickFormat((d: any) => d3.timeFormat('%m/%d')(d)))
      .attr('class', 'text-slate-400 text-xs')
      .select('.domain').attr('stroke', '#e2e8f0');
    
    svg.selectAll('.tick line').attr('stroke', '#e2e8f0');
    svg.selectAll('.tick text').attr('fill', '#94a3b8');

    // Add Y axis
    svg.append('g')
      .call(d3.axisLeft(y).ticks(5))
      .attr('class', 'text-slate-400 text-xs')
      .select('.domain').remove();
    
    svg.selectAll('.tick line').attr('stroke', '#e2e8f0');
    svg.selectAll('.tick text').attr('fill', '#94a3b8');

    // Add Gradient with unique ID per instance
    const gradientId = `area-gradient-${this.instanceId}`;
    const gradient = svg.append('defs')
      .append('linearGradient')
      .attr('id', gradientId)
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '0%').attr('y2', '100%');

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', colorHex)
      .attr('stop-opacity', 0.2);

    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', colorHex)
      .attr('stop-opacity', 0);

    // Add the area
    svg.append('path')
      .datum(data)
      .attr('fill', `url(#${gradientId})`)
      .attr('d', d3.area()
        .x((d: any) => x(d.date))
        .y0(height)
        .y1((d: any) => y(d.price))
        .curve(d3.curveMonotoneX)
      );

    // Add the line
    const path = svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', colorHex)
      .attr('stroke-width', 2)
      .attr('d', d3.line()
        .x((d: any) => x(d.date))
        .y((d: any) => y(d.price))
        .curve(d3.curveMonotoneX)
      );

    // Animation
    if (path.node()) {
        const totalLength = path.node()!.getTotalLength();
        path
        .attr('stroke-dasharray', totalLength + ' ' + totalLength)
        .attr('stroke-dashoffset', totalLength)
        .transition()
        .duration(1000)
        .ease(d3.easeCubicOut)
        .attr('stroke-dashoffset', 0);
    }

    // Tooltip interaction
    const tooltip = container.append('div')
      .attr('class', 'tooltip');

    const focus = svg.append('g')
      .attr('class', 'focus')
      .style('display', 'none');

    focus.append('circle')
      .attr('r', 5)
      .attr('fill', colorHex)
      .attr('stroke', 'white')
      .attr('stroke-width', 2);

    const overlay = svg.append('rect')
      .attr('class', 'overlay')
      .attr('width', width)
      .attr('height', height)
      .style('fill', 'none')
      .style('pointer-events', 'all');

    const bisectDate = d3.bisector((d: ChartDataPoint) => d.date).left;

    overlay
      .on('mouseover', () => { focus.style('display', null); tooltip.style('opacity', 1); })
      .on('mouseout', () => { focus.style('display', 'none'); tooltip.style('opacity', 0); })
      .on('mousemove', (event: any) => {
        // Critical Fix: Explicitly use the overlay node for pointer coordinates
        // This prevents coordinate confusion when multiple charts exist
        const pointer = d3.pointer(event, overlay.node());
        const x0 = x.invert(pointer[0]);
        
        const i = bisectDate(data, x0, 1);
        const d0 = data[i - 1];
        const d1 = data[i];
        
        let d = d0;
        if (d1 && d0) {
            d = x0.getTime() - d0.date.getTime() > d1.date.getTime() - x0.getTime() ? d1 : d0;
        } else if (!d0 && d1) {
            d = d1;
        } else if (d0 && !d1) {
            d = d0;
        }

        if (d) {
            focus.attr('transform', `translate(${x(d.date)},${y(d.price)})`);
            
            // Tooltip positioning
            // Constrain tooltip within the chart width
            let tooltipX = x(d.date) + margin.left;
            const tooltipY = y(d.price) + margin.top - 40;

            // Simple boundary check to prevent tooltip going off-right
            if (tooltipX > width) {
                tooltipX -= 80;
            }
            
            tooltip.html(`
            <div class="font-bold">${d3.timeFormat('%Y/%m/%d')(d.date)}</div>
            <div>${d.price.toFixed(2)}</div>
            `)
            .style('left', `${tooltipX}px`)
            .style('top', `${tooltipY}px`);
        }
      });
  }
}