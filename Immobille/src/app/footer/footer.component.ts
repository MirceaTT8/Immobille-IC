import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template:`
  <footer>
            <address>
                <div class="logo">Immobille</div>
                <p class="icons">
                    <i class="fa fa-facebook"></i>
                    <i class="fa fa-instagram"></i>
                    <i class="fa fa-linkedin"></i>
                </p>
                <p class="details">
                    <span>About Us & Contact</span>
                    <span>FAQ</span>
                    <span>Terms And Conditions</span>
                </p>
            </address>
        </footer>

`,
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
