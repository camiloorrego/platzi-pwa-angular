import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(public afDb: AngularFireDatabase) { }

  public getNotes() {
    return this.afDb.list('/notes/');
  }

  public getNote(id) {
    return this.afDb.object('/notes/' + id);
  }

  public createNote(note): Promise<any> {
    return this.afDb.database.ref('/notes/' + note.id).set(note);
  }

  public editNote(note): Promise<any> {
    return this.afDb.database.ref('/notes/' + note.id).set(note);
  }

  public deleteNote(note): Promise<any> {
    return this.afDb.database.ref('/notes/' + note.id).remove();
  }
}
