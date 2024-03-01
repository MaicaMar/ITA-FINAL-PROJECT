import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, NgFor],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  listProducts: Product[] = [];

  constructor(private _productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts()
  }

  // El código original no es así, pero a mi sin este apaño no me funcionaba
  getProducts() {
    this._productService.getProducts().subscribe(
      (data: any) => {
        if (Array.isArray(data.listProducts)) {
          this.listProducts = data.listProducts;
        } else {
          console.error('El servicio no devolvió un array de productos:', data);
        }
      },
      error => {
        console.error('Error al obtener productos:', error);
      }
    );
  }
  
  
  
  
  
}
