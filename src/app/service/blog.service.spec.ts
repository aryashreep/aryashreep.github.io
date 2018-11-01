import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Other imports
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BlogService } from './blog.service'

describe('BlogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [BlogService]
    });
  });

  it('should get users', inject([HttpClientTestingModule, BlogService],
    (httpMock: HttpClientTestingModule, blogService: BlogService) => {
      expect(blogService).toBeTruthy();
    }
  )
);  

});