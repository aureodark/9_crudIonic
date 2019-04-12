import { Component } from '@angular/core';

import { Produto } from './../produto';
import { ProdutoService } from '../produto.service';
import { Observable } from 'rxjs';
import { ProdutoDadosService } from '../produto-dados.service'
import { Router } from "@angular/router";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  produtos: Observable<any>;

  constructor(
    private produtoService: ProdutoService,
    private produtoDataService: ProdutoDadosService,
    private router: Router) { }

  ngOnInit() {
    this.produtos = this.produtoService.getAll();
  }

  delete(key:string){
    this.produtoService.delete(key);
  }

  edit(produto: Produto, key: string) {
    this.router.navigate(['tabs/tab2'])
    this.produtoDataService.changeProduto(produto, key);
  }

}
