
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
// import { map } from 'rxjs/operators'
@Injectable()
export class PostProvider {
	// server: string = "http://10.0.31.113/MobileApps/server_api/"; // default
	server: string = "http://192.168.1.36/CheckIt/server_api/";
	// if you test in real device "http://10.0.31.113" change use the your IP	
    // server: string = "http://192.199.122.100/IONIC4_CRUD_LOGINREGIS_PHP_MYSQL/server_api/"; 
	// server: string = "http://10.0.31.113:8080/";
	constructor(public http : Http) {

	}

	postData(body, file){
		console.log(body);
		let type = "application/json; charset=UTF-8";
		let headers = new Headers({ 'Content-Type': type });
		let options = new RequestOptions({ headers: headers });

		return this.http.post(this.server + file, JSON.stringify(body), options)
		.map(res => 
			res.json());
		// return this.http.post(this.server + file, JSON.stringify(body), options).pipe(map(res=>res.json()));
		
	}
}