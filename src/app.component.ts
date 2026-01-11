import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Stock, SupplyChainIndustry, ClassicCategory } from './data';
import { StockService } from './stock.service';

interface ComparisonItem {
  stock: Stock;
  categoryLabel: string; // e.g. "AI 伺服器 > IP 矽智財"
  mockData: {
    price: number;
    change: number;
    pe: string;
    yield: string;
  };
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
    }
  `]
})
export class AppComponent implements OnInit {
  private stockService = inject(StockService);

  activeTab = signal<'mainstream' | 'classic' | 'comparison'>('mainstream');
  
  // Data signals
  mainstreamData = signal<SupplyChainIndustry[]>([]);
  classicData = signal<ClassicCategory[]>([]);
  
  // Search state
  searchTerm = signal('');

  // Comparison state
  comparisonList = signal<ComparisonItem[]>([]);
  
  // Computed set of selected codes for O(1) lookup in templates
  selectedCodes = computed(() => new Set(this.comparisonList().map(item => item.stock.code)));
  
  comparisonCount = computed(() => this.comparisonList().length);

  // Expansion state for stock details
  expandedStock = signal<string | null>(null);

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.stockService.getMainstreamData().subscribe(data => {
      this.mainstreamData.set(data);
    });

    this.stockService.getClassicData().subscribe(data => {
      this.classicData.set(data);
    });
  }

  setTab(tab: 'mainstream' | 'classic' | 'comparison') {
    this.activeTab.set(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  updateSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm.set(target.value.toLowerCase().trim());
  }

  isMatch(text: string): boolean {
    if (!this.searchTerm()) return false;
    return text.toLowerCase().includes(this.searchTerm());
  }

  hasMatchInGroup(stocks: any[]): boolean {
    if (!this.searchTerm()) return false;
    return stocks.some(s => 
      s.name.includes(this.searchTerm()) || 
      s.code.includes(this.searchTerm()) ||
      (s.note && s.note.includes(this.searchTerm()))
    );
  }

  // Comparison Logic
  toggleComparison(stock: Stock, mainCategory: string, subCategory: string) {
    const currentList = this.comparisonList();
    const existingIndex = currentList.findIndex(item => item.stock.code === stock.code);

    if (existingIndex >= 0) {
      // Remove
      this.comparisonList.update(list => list.filter(i => i.stock.code !== stock.code));
    } else {
      // Add
      if (currentList.length >= 10) {
        alert('最多只能比較 10 檔股票');
        return;
      }
      
      const financials = this.generateMockFinancials(stock.code);

      const newItem: ComparisonItem = {
        stock,
        categoryLabel: `${mainCategory} - ${subCategory}`,
        mockData: financials
      };
      
      this.comparisonList.update(list => [...list, newItem]);
    }
  }

  toggleInfo(code: string, event: Event) {
    event.stopPropagation();
    if (this.expandedStock() === code) {
      this.expandedStock.set(null);
    } else {
      this.expandedStock.set(code);
    }
  }

  isSelected(code: string): boolean {
    return this.selectedCodes().has(code);
  }

  clearComparison() {
    this.comparisonList.set([]);
  }

  removeComparisonItem(code: string) {
    this.comparisonList.update(list => list.filter(i => i.stock.code !== code));
  }

  // Generate deterministic mock data based on stock code
  getMockFinancials(code: string) {
    const seed = parseInt(code) || 9999;
    const price = (seed % 800) + 50 + (seed % 100) / 100;
    const change = ((seed % 20) - 10) / 2; // -5 to +5
    const pe = ((seed % 30) + 10).toFixed(1);
    const yieldRate = ((seed % 60) / 10).toFixed(2);
    const marketCap = Math.floor((seed * 17) % 800) + 20; // 20 - 820 B
    
    return {
      price: parseFloat(price.toFixed(2)),
      change: parseFloat(change.toFixed(2)),
      pe,
      yield: yieldRate,
      marketCap
    };
  }

  private generateMockFinancials(code: string) {
    const data = this.getMockFinancials(code);
    return {
      price: data.price,
      change: data.change,
      pe: data.pe,
      yield: data.yield
    };
  }
}