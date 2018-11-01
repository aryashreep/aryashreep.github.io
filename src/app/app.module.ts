import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { BlogComponent } from './components/blog/blog.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { DefaultPipe } from './default.pipe';
import { escapeHtmlPipe } from './safe-html.pipe';
import { StripHtmlPipe } from './strip-html.pipe';
import { TruncateTextPipe } from './truncate-text.pipe';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    SidebarComponent,
    FooterComponent,
    BlogComponent,
    DefaultPipe,
    escapeHtmlPipe,
    StripHtmlPipe,
    TruncateTextPipe
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    HttpClientModule,
    DefaultPipe,
    escapeHtmlPipe,
    StripHtmlPipe,
    TruncateTextPipe,
    BlogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
