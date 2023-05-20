import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Majestic';
  constructor(public translate: TranslateService){
    this.translate.addLangs(['es','en'])
    this.translate.addLangs(['es'])
    this.translate.setDefaultLang('es')
  }
}
