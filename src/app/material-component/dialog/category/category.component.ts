import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit,EventEmitter, Inject  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { threadId } from 'worker_threads';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  onAddCategor = new EventEmitter();
  onEditCategory = new EventEmitter();
  categoryForm:any = FormGroup;
  dialogAction:any ="Add";
  action:any ="Add";
  responseMessage:any;


  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  private formBuilder:FormBuilder,
  private categoyService:CategoryService,
  private productService:ProductService,
  private dialogRef:MatDialogRef<CategoryComponent>,
  private snackbarService:SnackbarService) { }

  ngOnInit(): void {
      this.categoryForm = this.formBuilder.group({
      name:[null,[Validators.required]]
    });

    if(this.dialogData.action === "Edit"){
      this.dialogAction = "Edit";
      this.action = "Update";
      this.categoryForm.patchValue(this.dialogData.data);
    }
  
  } 

  handleSubmit(){ 
    if(this.dialogAction === "Edit"){
      this.edit();
    }else{
      this.add();
    }
  }

 add(){
    var formData = this.categoryForm.value;
    var data ={
      name:formData.name
    }
    this.categoyService.add(data).subscribe((response:any)=>{
       this.dialogRef.close();
       this.onAddCategor.emit();
       this.responseMessage = response.message;
       this.snackbarService.openSnackBar(this.responseMessage,"success");
    },(error:any)=>{
      this.dialogRef.close();
      if(error.error?.message){
        this.responseMessage = error.error?.message;

      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

  edit(){
    var formData = this.categoryForm.value;
    var data ={
      id:this.dialogData.data.id,
      name:formData.name
    }
    this.categoyService.update(data).subscribe((response:any)=>{
       this.dialogRef.close();
       this.onEditCategory.emit();
       this.responseMessage = response.message;
       this.snackbarService.openSnackBar(this.responseMessage,"success");
    },(error:any)=>{
      this.dialogRef.close();
      if(error.error?.message){
        this.responseMessage = error.error?.message;

      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }
  }

