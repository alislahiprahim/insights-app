import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})


export class userService {

    backendURL = 'http://localhost:8085/api/'

    constructor(private myhttpClient: HttpClient) { }

    register(data) {
        return this.myhttpClient.post(this.backendURL + 'register', data)
    }

    login(data) {

        return this.myhttpClient.post(this.backendURL + 'login', data)

    }

    getToken() {
        return localStorage.getItem('token')
    }

    loggedIn() {
        return !!localStorage.getItem('token')
    }

    logOut() {
        return localStorage.removeItem('token')
    }

    getImages() {
        return this.myhttpClient.get(this.backendURL + 'getImages')
    }

    uploadImage(data) {
        return this.myhttpClient.post(this.backendURL + 'uploadImage', data)
    }
}