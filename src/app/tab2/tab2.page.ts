import { Component, OnInit, Input } from '@angular/core';

import { Produto } from '../produto';
import { ProdutoService } from '../produto.service';
import { ProdutoDadosService } from '../produto-dados.service';
import { Router } from "@angular/router";

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  produto: Produto;
  key: string = '';

  constructor(
    private produtoService: ProdutoService,
    private produtoDataService: ProdutoDadosService,
    private router: Router,
    private alertController: AlertController,
  ) {
  }

  ngOnInit() {
    this.produto = new Produto();
    this.produtoDataService.currentProduto.subscribe(data => {
      if (data.produto && data.key) {
        this.produto = new Produto();
        this.produto.nome = data.produto.nome;
        this.produto.descricao = data.produto.descricao;
        this.produto.quant = data.produto.quant;
        this.produto.valor = data.produto.valor;
        this.key = data.key;
      }
    })
  }

  onSubmit() {
    if (this.key) {
      this.produtoService.update(this.produto, this.key);
      this.presentAlert("Aviso", "Atualizado com sucesso!");
    } else {
      this.produtoService.insert(this.produto);
      this.presentAlert("Aviso", "Cadastrado com sucesso!");
    }
    this.produto = new Produto();
    this.router.navigate(['tabs/tab3']);


  }
  back() {
    this.router.navigate(['/']);
  }

  async presentAlert(tipo: string, texto: string) {
    const alert = await this.alertController.create({
      header: tipo,
      message: texto,
      buttons: ['Uhu!']
    });

    await alert.present();
  }
}

