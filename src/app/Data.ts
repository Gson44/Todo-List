import { Injectable, signal } from "@angular/core";

@Injectable({providedIn: 'root'})
export class Data {
    arraySignal = signal<{ id: number; name: string }[]>([]);
}