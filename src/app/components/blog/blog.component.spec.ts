import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogComponent } from './blog.component';
import { SidebarComponent } from './../sidebar/sidebar.component';
import { FooterComponent } from './../footer/footer.component';
import { DefaultPipe } from '../../default.pipe';
import { escapeHtmlPipe } from '../../safe-html.pipe';
import { StripHtmlPipe } from '../../strip-html.pipe';
import { TruncateTextPipe } from '../../truncate-text.pipe';
import { BlogService } from '../../service/blog.service';


describe('BlogComponent', () => {
  let component: BlogComponent;
  let fixture: ComponentFixture<BlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogComponent, SidebarComponent, FooterComponent, DefaultPipe, escapeHtmlPipe, StripHtmlPipe, TruncateTextPipe ],
      providers: [BlogService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    let fixture = TestBed.createComponent(BlogComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
