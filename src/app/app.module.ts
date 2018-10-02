import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { escapeHtmlPipe } from './safe-html.pipe';
import { StripHtmlPipe } from './strip-html.pipe';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { BlogComponent } from './components/blog/blog.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { BlogService } from './service/blog.service';
import { TruncateTextPipe } from './truncate-text.pipe';
import { defaultPipe } from './default.pipe';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    SidebarComponent,
    FooterComponent,
    BlogComponent,
    escapeHtmlPipe,
    StripHtmlPipe,
    TruncateTextPipe,
    defaultPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [BlogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
