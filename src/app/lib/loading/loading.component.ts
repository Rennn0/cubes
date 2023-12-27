import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MainService } from '@lib/services/main.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
  animations: [
    trigger('fadeOut', [
      state('void', style({ opacity: 1 })),
      state('*', style({ opacity: 1 })),
      transition(':leave', [
        animate('1000ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class LoadingComponent implements OnInit, AfterViewInit {
  @ViewChild("myCanvas", { static: false }) myCanvas!: ElementRef<HTMLCanvasElement>;
  @Output() closeLoading = new EventEmitter<string>();

  private _context!: CanvasRenderingContext2D;
  private _raf: number | undefined;
  private _colors: string[] = [
    "#1d4ed8", "#ef4444", "#22c55e",
    "#374151", "#0ea5e9", "#e24c4c"
  ];
  private balls: any[] = [];

  title = "random title"
  ballsCount: number = 10;
  ballsRadius: number = 10;
  messages: Message[] = [];
  showIcon: boolean = false;
  projectName = new FormControl("", [Validators.required, Validators.minLength(3)]);
  projectNameIsOk: boolean = false;

  constructor(private _main: MainService) { }


  ngOnInit(): void {
  }

  load(): void {
    const canvas = this.myCanvas.nativeElement;
    if (canvas) {
      this._context = canvas.getContext("2d")!;
      this.createBalls();
      this.draw();
    }
  }


  createBalls(): void {
    for (let i = 0; i < this.ballsCount; i++) {
      const radius = this.ballsRadius;
      const x = Math.random() * (this.myCanvas.nativeElement.width - 2 * radius) + radius;
      const y = Math.random() * (this.myCanvas.nativeElement.height - 2 * radius) + radius;
      const ball = {
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 5, // Random velocity in x direction
        vy: (Math.random() - 0.5) * 5, // Random velocity in y direction
        radius: radius,
        color: this._colors[Math.floor(Math.random() * this._colors.length)],
        draw(ctx: CanvasRenderingContext2D) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.fillStyle = this.color;
          ctx.fill();
        },
        changeColor(newColor: string) {
          this.color = newColor;
        }
      };

      this.balls.push(ball);
    }
  }

  startAnimation(): void {
    this._raf = window.requestAnimationFrame(() => this.draw());
  }

  stopAnimation(): void {
    if (this._raf) {
      window.cancelAnimationFrame(this._raf);
    }
  }

  draw(): void {
    // es kuds utovebs
    this._context.clearRect(0, 0, this.myCanvas.nativeElement.width, this.myCanvas.nativeElement.height);
    //backis feri
    // this._context.fillStyle = "rgba(255, 255, 255, 0.1)";
    // this._context.fillRect(0, 0, this.myCanvas.nativeElement.width, this.myCanvas.nativeElement.height);

    this.balls.forEach((ball, index) => {
      ball.draw(this._context);
      ball.x += (ball.vx) / 3;
      ball.y += (ball.vy) / 3;

      if (ball.y + ball.vy + ball.radius > this.myCanvas.nativeElement.height || ball.y + ball.vy - ball.radius < 0) {
        ball.vy = -ball.vy;
      }
      if (ball.x + ball.vx + ball.radius > this.myCanvas.nativeElement.width || ball.x + ball.vx - ball.radius < 0) {
        ball.vx = -ball.vx;
      }
      // Check collision with other balls
      for (let i = 0; i < this.balls.length; i++) {
        if (i !== index) {
          const otherBall = this.balls[i];
          const dx = otherBall.x - ball.x;
          const dy = otherBall.y - ball.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < ball.radius + otherBall.radius) {
            // Balls collide, adjust velocities
            const angle = Math.atan2(dy, dx);
            const targetX = ball.x + Math.cos(angle) * (ball.radius + otherBall.radius);
            const targetY = ball.y + Math.sin(angle) * (ball.radius + otherBall.radius);

            const ax = (targetX - otherBall.x) * 0.5;
            const ay = (targetY - otherBall.y) * 0.5;

            ball.vx -= ax;
            ball.vy -= ay;

            otherBall.vx += ax;
            otherBall.vy += ay;

            ball.changeColor(this._colors[Math.floor(Math.random() * this._colors.length)]);
            otherBall.changeColor(this._colors[Math.floor(Math.random() * this._colors.length)]);
          }
        }
      }
    });

    this._raf = window.requestAnimationFrame(() => this.draw());
  }

  onEnterKeyPress() {
    this._main.storeFuckingTtitleFOrPreload = this.projectName.value!;
    if (this.projectName.valid && this.projectName.value) {
      this.showIcon = true;
      setTimeout(() => {
        this.showIcon = false;
        // this.closeLoading.emit(this.projectName.value!);
        this.projectNameIsOk = true;

      }, 2000);
    } else if (this.messages.length == 0) {
      this.messages = [{ severity: 'warn', summary: 'Oops', detail: 'At least 3 letters' }];
      setTimeout(() => {
        this.messages = []
      }, 3000);
    }
  }

  onClosePreload() {
    this.closeLoading.emit(this.projectName.value!);
  }

  ngAfterViewInit(): void {
    this.load();
  }
}
