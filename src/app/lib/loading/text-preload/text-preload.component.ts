import { Component, EventEmitter, Input, Output } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MainService } from '@lib/services/main.service';

@Component({
  selector: 'app-text-preload',
  templateUrl: './text-preload.component.html',
  styleUrls: ['./text-preload.component.css'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate('3s ease-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class TextPreloadComponent {
  @Input() projectTitle: string = "";
  @Output() closePreload = new EventEmitter();
  loaded: boolean = false;
  elts: any = {};
  texts: string[] = [
    "Getting", "Ready", "For",
    this._main.storeFuckingTtitleFOrPreload,
    ". . ."
  ];

  frame: any;

  morphTime: number = 1;
  cooldownTime: number = 0.15;

  textIndex: number = this.texts.length - 1;
  time: any = new Date();
  morph: number = 0;
  cooldown: number = this.cooldownTime;

  constructor(private _main: MainService) { }

  ngOnInit() {
    this.loaded = true;
  }

  ngAfterViewInit() {

    this.elts.text1 = document.getElementById("text1");
    this.elts.text2 = document.getElementById("text2");

    this.elts.text1.textContent = this.texts[this.textIndex % this.texts.length];
    this.elts.text2.textContent = this.texts[(this.textIndex + 1) % this.texts.length];
    this.animate();
  }

  doMorph() {
    this.morph -= this.cooldown;
    this.cooldown = 0;

    let fraction = this.morph / this.morphTime;

    if (fraction > 1) {
      this.cooldown = this.cooldownTime;
      fraction = 1;
    }

    this.setMorph(fraction);
  }

  setMorph(fraction: number) {
    this.elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    this.elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    this.elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    this.elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    this.elts.text1.textContent = this.texts[this.textIndex % this.texts.length];
    this.elts.text2.textContent = this.texts[(this.textIndex + 1) % this.texts.length];
    if (this.textIndex % this.texts.length == this.texts.length - 1) {
      this.closePreload.emit();
    }
  }

  doCooldown() {
    this.morph = 0;

    this.elts.text2.style.filter = "";
    this.elts.text2.style.opacity = "100%";

    this.elts.text1.style.filter = "";
    this.elts.text1.style.opacity = "0%";

  }

  animate() {
    this.frame = requestAnimationFrame(this.animate.bind(this));
    let newTime: any = new Date();
    let shouldIncrementIndex = this.cooldown > 0;
    let dt = (newTime - this.time) / 1000;
    this.time = newTime;

    this.cooldown -= dt;

    if (this.cooldown <= 0) {
      if (shouldIncrementIndex) {
        this.textIndex++;

      }
      this.doMorph();
    } else {
      this.doCooldown();
    }
  }
}
