import { CommonModule } from "@angular/common";
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  SecurityContext,
  ViewChild,
} from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
})
export class DialogComponent {

  @Input() isMine: boolean = false;

  constructor() {

  }

  debug(){

  }
}
