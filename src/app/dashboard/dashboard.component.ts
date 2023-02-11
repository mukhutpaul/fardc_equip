import { Component, AfterViewInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from '../services/auth.service';
import { DashboardService } from '../services/dashboard.service';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global-constants';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {

	responseMessage:any;
	data:any;

	ngAfterViewInit() { }

	constructor(private dashboardService:DashboardService,
		private ngxservice:NgxUiLoaderService,
		private snackbarservice:SnackbarService
		) {
		
		this.ngxservice.start();
		this.dashboardData();  
	}
	
	dashboardData(){
        this.dashboardService.getDetails().subscribe((response:any)=>{
			this.ngxservice.stop();
			this.data=response;
		},(error:any)=>{
			this.ngxservice.stop();
			console.log(error);
			if(error.error?.message){
				this.responseMessage = error.error?.message;
			}else{
				this.responseMessage = GlobalConstants.genericError;
			}
			   this.snackbarservice.openSnackBar(this.responseMessage,GlobalConstants.error);
		})
	}
}
