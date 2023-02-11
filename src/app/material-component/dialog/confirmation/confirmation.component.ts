
import { Component, OnInit,EventEmitter,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {


  onEmitStatusChange = new EventEmitter();
  details:any={};

  constructor(@Inject(MAT_DIALOG_DATA) public DialogData:any) { }

  ngOnInit(): void {
    if(this.DialogData){
      this.details = this.DialogData;
    }
  }

  handleChangeAction(){
    this.onEmitStatusChange.emit();
  }

}
