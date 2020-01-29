import { AppService } from './app.service';
import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  categories = ['Trabajo', 'Personal'];
  title = 'my-pwa';
  nota: any = {};
  notas = [];
  constructor(private swUpdate: SwUpdate, public service: AppService, private snackBar: MatSnackBar) {
    this.service.getNotes().valueChanges().subscribe((y) => {
      this.notas = y;
    });
  }

  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        window.location.reload();
      });
    }
  }

  public save() {
    this.nota.id = this.nota.id ? this.nota.id : Date.now();
    this.service.createNote(this.nota).then(() => {
      this.openSnackBar('OK');
      this.nota = {};
    }).catch(e => {
      this.openSnackBar('NOOK');
    });
  }

  public set(i) {
    this.nota = i;
  }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
